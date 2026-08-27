/**
 * Orchestration: load the contract package, walk its zod exports, emit sorted
 * VelarScript declarations, run them through `velar format`, and either write
 * the result or compare it byte for byte.
 */

import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve, sep } from "node:path";

import { schemaDigest } from "./digest.js";
import {
  renderChannelTable,
  renderModule,
  type ChannelConstant,
  type ChannelTypeBinding,
  type HeaderFields,
} from "./emit.js";
import { formatFile } from "./format.js";
import { createLoader, type ModuleLoader } from "./loader.js";
import { lowerModule } from "./lower.js";
import { parseManifest, type ChannelTableEntry, type Manifest } from "./manifest.js";
import { camelCase, enumMemberName, NameRegistry } from "./naming.js";
import type { ChannelTableReport, FileStatus, GenerationReport, ModuleReport } from "./report.js";
import {
  assertSupportedZod,
  collectExports,
  isZodSchema,
  packageOf,
  owningPackage,
  readPackageVersion,
  resolveZod,
  SUPPORTED_ZOD_MAJOR,
  type ZodSchema,
} from "./zod-runtime.js";

export const TOOL_NAME = "@velarscript-labs/contract-codegen";

function posixPath(path: string): string {
  return path.split(sep).join("/");
}

/**
 * A generated file imports its sibling by where it sits, not by its name: a
 * table written to `channels/agent.vel` referring to `types/contracts.vel` has
 * to say `../types/contracts.vel`. Both names are relative to the output
 * directory, so the import is the path between them.
 */
function relativeImport(from: string, to: string): string {
  const path = posixPath(relative(dirname(from), to));
  return path.startsWith(".") ? path : `./${path}`;
}

export interface RunOptions {
  readonly manifestPath: string;
  readonly mode: "generate" | "check";
  readonly toolVersion: string;
}

interface RenderedFile {
  readonly output: string;
  readonly absolute: string;
  readonly text: string;
}

export class DriftError extends Error {
  readonly files: readonly FileStatus[];
  readonly report: GenerationReport;

  constructor(files: readonly FileStatus[], report: GenerationReport) {
    const lines = files.map((file) => `  ${file.status}: ${file.output}`);
    super(`generated contract output is out of date:\n${lines.join("\n")}`);
    this.name = "DriftError";
    this.files = files;
    this.report = report;
  }
}

export async function run(options: RunOptions): Promise<GenerationReport> {
  const manifestPath = resolve(options.manifestPath);
  const manifestDirectory = dirname(manifestPath);
  const manifest: Manifest = parseManifest(JSON.parse(readFileSync(manifestPath, "utf8")));
  const resolveFrom = resolve(manifestDirectory, manifest.resolveFrom);
  const outputDirectory = resolve(manifestDirectory, manifest.outputDirectory);

  const zod = resolveZod(resolveFrom);
  assertSupportedZod(zod);
  // The header must not depend on the directory the tool was invoked from, or
  // `--check` would drift for a caller who ran it from somewhere else.
  const manifestLabel = posixPath(relative(outputDirectory, manifestPath)) || basename(manifestPath);

  const moduleReports: ModuleReport[] = [];
  const channelReports: ChannelTableReport[] = [];
  const rendered: RenderedFile[] = [];
  const exportNamesByOutput = new Map<string, ReadonlyMap<string, string>>();
  const schemaNamesByOutput = new Map<string, ReadonlyMap<ZodSchema, string>>();

  // Every module the run will load is named before the first one is: a loader
  // that bundles has to build them together, or a schema object shared by two
  // of them arrives as two objects and the channel table stops recognizing it.
  const loader = createLoader(manifest.loader, resolveFrom);
  try {
  await loader.prepare([
    ...manifest.modules.map((entry) => entry.specifier),
    ...manifest.channelTables.flatMap((table) => (table.source === undefined ? [] : [table.source.specifier])),
  ]);

  for (const entry of manifest.modules) {
    const module = await loader.load(entry.specifier);
    const exports = collectExports(module.exports, entry.exports, entry.specifier);
    const lowered = lowerModule(
      exports,
      { stripSuffix: manifest.naming.stripSuffix, prefix: manifest.naming.prefix, degrades: entry.unknownDegrade },
      entry.specifier,
    );
    // A relative specifier names no package, so the manifest that owns the
    // loaded file is what the header records — bounded by `resolveFrom`, or the
    // walk climbs out of the contract's tree and credits this project with
    // authoring its own wire contract.
    const owner = owningPackage(module.file, resolveFrom);
    const declared = entry.versionFrom ?? packageOf(entry.specifier);
    const sourcePackage = declared ?? owner?.name ?? entry.specifier;
    const header: HeaderFields = {
      toolName: TOOL_NAME,
      toolVersion: options.toolVersion,
      sourcePackage,
      sourceVersion: declared === null || declared === undefined
        ? owner?.version ?? null
        : readPackageVersion(declared, resolveFrom) ?? (owner?.name === declared ? owner.version : null),
      specifier: entry.specifier,
      schemaDigest: schemaDigest(exports),
      manifestPath: manifestLabel,
    };
    rendered.push({
      output: entry.output,
      absolute: join(outputDirectory, entry.output),
      text: renderModule(header, lowered.declarations),
    });
    exportNamesByOutput.set(entry.output, lowered.exportNames);
    const bySchema = new Map<ZodSchema, string>();
    for (const exported of exports) {
      const name = lowered.exportNames.get(exported.name);
      if (name !== undefined) bySchema.set(exported.schema, name);
    }
    schemaNamesByOutput.set(entry.output, bySchema);
    moduleReports.push({
      specifier: entry.specifier,
      output: entry.output,
      sourcePackage,
      sourceVersion: header.sourceVersion,
      schemaDigest: header.schemaDigest,
      exportedSchemas: exports.length,
      declarations: lowered.declarations.length,
      degrades: lowered.degrades,
      constraints: lowered.constraints,
      boundaryNotes: lowered.boundaryNotes,
      renamed: lowered.renamed,
      unusedDegrades: lowered.unusedDegrades,
    });
  }

  for (const table of manifest.channelTables) {
    const built = await buildChannelTable(table, {
      loader,
      resolveFrom,
      manifestPath,
      outputDirectory,
      manifestLabel,
      toolVersion: options.toolVersion,
      exportNames: exportNamesByOutput.get(table.typesOutput)!,
      schemaNames: schemaNamesByOutput.get(table.typesOutput)!,
      typesSpecifier: manifest.modules.find((module) => module.output === table.typesOutput)!.specifier,
    });
    rendered.push(built.file);
    channelReports.push(built.report);
  }
  } finally {
    // The bundle loader's temporary tree has done its work: every module is
    // imported and its schema objects are in memory.
    loader.dispose();
  }

  // Formatting is a step that can fail, and it fails per file. Rendering and
  // formatting the whole tree before the first write is what keeps a failure
  // from leaving half a generation behind.
  const formatted = rendered.map((file) => ({
    output: file.output,
    absolute: file.absolute,
    text: manifest.velarFormat
      ? formatThroughToolchain(file.text, basename(file.output), {
          projectRoot: outputDirectory,
          command: manifest.velarCommand,
        })
      : file.text,
  }));

  // `status` says what was on disk, identically in both modes, so a committed
  // report is the same file whether or not the run had to write it.
  const files: FileStatus[] = formatted.map((file) => {
    const current = readIfPresent(file.absolute);
    return {
      output: file.output,
      status: current === null ? "missing" : current === file.text ? "unchanged" : "drift",
      written: false,
    };
  });
  if (options.mode === "generate") {
    for (const [index, file] of formatted.entries()) {
      if (files[index]!.status === "unchanged") continue;
      mkdirSync(dirname(file.absolute), { recursive: true });
      writeFileSync(file.absolute, file.text, "utf8");
      files[index] = { ...files[index]!, written: true };
    }
  }

  const ok = options.mode === "generate" || files.every((file) => file.status === "unchanged");
  const report: GenerationReport = {
    tool: TOOL_NAME,
    toolVersion: options.toolVersion,
    mode: options.mode,
    // The install's absolute path is a property of the machine, not of the
    // generation, and a committed report has to read the same on every one.
    zod: { supportedMajor: SUPPORTED_ZOD_MAJOR, resolved: zod.version, resolvedFrom: manifest.resolveFrom },
    formatted: manifest.velarFormat,
    modules: moduleReports,
    channelTables: channelReports,
    files,
    ok,
  };
  if (!ok) throw new DriftError(files.filter((file) => file.status !== "unchanged"), report);
  return report;
}

function readIfPresent(file: string): string | null {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

/**
 * Formatting happens on a copy in a temporary directory: `--check` must never
 * touch the output tree, and generate stays a single write per file.
 */
function formatThroughToolchain(
  text: string,
  name: string,
  options: { readonly projectRoot: string; readonly command: string },
): string {
  const directory = mkdtempSync(join(tmpdir(), "velar-contract-codegen-"));
  try {
    const file = join(directory, name);
    writeFileSync(file, text, "utf8");
    formatFile(file, options);
    return readFileSync(file, "utf8");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

interface ChannelContext {
  readonly loader: ModuleLoader;
  readonly resolveFrom: string;
  readonly manifestPath: string;
  readonly manifestLabel: string;
  readonly outputDirectory: string;
  readonly toolVersion: string;
  readonly exportNames: ReadonlyMap<string, string>;
  readonly schemaNames: ReadonlyMap<ZodSchema, string>;
  readonly typesSpecifier: string;
}

interface ChannelRow {
  readonly name: string;
  readonly request?: string;
  readonly response?: string;
  readonly event?: string;
}

async function buildChannelTable(
  table: ChannelTableEntry,
  context: ChannelContext,
): Promise<{ readonly file: RenderedFile; readonly report: ChannelTableReport }> {
  const rows = table.channels !== undefined
    ? table.channels.map((channel) => ({
        name: channel.name,
        ...(channel.request === undefined ? {} : { request: resolveTypeName(channel.request, context, table) }),
        ...(channel.response === undefined ? {} : { response: resolveTypeName(channel.response, context, table) }),
        ...(channel.event === undefined ? {} : { event: resolveTypeName(channel.event, context, table) }),
      }))
    : await readRuntimeChannels(table, context);

  const sorted = [...rows].sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
  const memberNames = new NameRegistry();
  const constantNames = new NameRegistry();
  const constants: ChannelConstant[] = [];
  const bindings: ChannelTypeBinding[] = [];
  for (const row of sorted) {
    const base = enumMemberName(row.name);
    if (base === null) {
      throw new Error(`channel '${row.name}' has no VelarScript identifier form for '${table.output}'`);
    }
    const member = memberNames.claim(base);
    constants.push({ member, wire: row.name });
    for (const role of ["request", "response", "event"] as const) {
      const type = row[role];
      if (type === undefined) continue;
      bindings.push({
        constant: constantNames.claim(`${camelCase(member)}${role.charAt(0).toUpperCase()}${role.slice(1)}`),
        type,
        channel: row.name,
        role,
      });
    }
  }

  const typesImport = relativeImport(table.output, table.typesOutput);
  const sourcePackage = table.source === undefined
    ? `${basename(context.manifestPath)} channel table`
    : `${packageOf(table.source.specifier) ?? table.source.specifier} '${table.source.export}'`;
  const header: HeaderFields = {
    toolName: TOOL_NAME,
    toolVersion: context.toolVersion,
    sourcePackage,
    sourceVersion: table.source === undefined
      ? null
      : readPackageVersion(packageOf(table.source.specifier) ?? table.source.specifier, context.resolveFrom),
    specifier: sourcePackage,
    schemaDigest: channelDigest(sorted),
    manifestPath: context.manifestLabel,
  };
  return {
    file: {
      output: table.output,
      absolute: join(context.outputDirectory, table.output),
      text: renderChannelTable(header, table.enumName, typesImport, constants, bindings),
    },
    report: { output: table.output, enumName: table.enumName, channels: constants.length, bindings: bindings.length },
  };
}

function resolveTypeName(exportName: string, context: ChannelContext, table: ChannelTableEntry): string {
  const name = context.exportNames.get(exportName);
  if (name === undefined) {
    throw new Error(
      `channel table '${table.output}' references '${exportName}', which '${table.typesOutput}' does not generate`,
    );
  }
  return name;
}

async function readRuntimeChannels(table: ChannelTableEntry, context: ChannelContext): Promise<ChannelRow[]> {
  const source = table.source!;
  const module = await context.loader.load(source.specifier);
  const value = module.exports[source.export];
  if (typeof value !== "object" || value === null) {
    throw new Error(`'${source.specifier}' export '${source.export}' is not a channel map object`);
  }
  // `Object.entries` reads a Map, a Set, and an array as empty or as indices
  // rather than as channels, and an empty answer would emit an enum with no
  // members. The shape is named instead of quietly producing one.
  if (value instanceof Map || value instanceof Set || Array.isArray(value)) {
    throw new Error(
      `'${source.specifier}' export '${source.export}' is a ${value instanceof Map ? "Map" : value instanceof Set ? "Set" : "array"}; `
        + "a channel table reads a plain object whose keys are the channel names",
    );
  }
  const rows: ChannelRow[] = [];
  for (const [channel, contract] of Object.entries(value as Record<string, unknown>)) {
    if (typeof contract !== "object" || contract === null) {
      throw new Error(`channel '${channel}' in '${source.export}' is not a {request, response, event} object`);
    }
    const row: Record<string, string> = {};
    for (const role of ["request", "response", "event"] as const) {
      const schema = (contract as Record<string, unknown>)[role];
      if (schema === undefined || schema === null) continue;
      if (!isZodSchema(schema)) {
        throw new Error(`channel '${channel}' ${role} in '${source.export}' is not a zod schema`);
      }
      const name = context.schemaNames.get(schema);
      if (name === undefined) {
        throw new Error(
          `channel '${channel}' ${role} is a schema '${table.typesOutput}' does not export; add it to that module's `
            + "exports so the table can reference a generated type",
        );
      }
      row[role] = name;
    }
    if (Object.keys(row).length === 0) {
      throw new Error(`channel '${channel}' in '${source.export}' binds no request, response, or event schema`);
    }
    rows.push({ name: channel, ...row });
  }
  if (rows.length === 0) {
    throw new Error(`'${source.specifier}' export '${source.export}' declares no channels for '${table.output}'`);
  }
  return rows;
}

function channelDigest(rows: readonly ChannelRow[]): string {
  const body = rows.map((row) => [row.name, row.request ?? null, row.response ?? null, row.event ?? null]);
  return `sha256-${createHash("sha256").update(JSON.stringify(body), "utf8").digest("hex")}`;
}
