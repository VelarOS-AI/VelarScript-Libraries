/**
 * The generator's only input is a JSON manifest that lives in the consuming
 * project. It names the modules to load, the exports to walk, the output
 * directory, and the naming rules. Nothing is inferred from the file system.
 */

export interface DegradeEntry {
  /** Canonical schema path, exactly as a fail-closed diagnostic prints it. */
  readonly path: string;
  /** Why the consumer accepts an `unknown` field here. Required: a degrade is a decision. */
  readonly reason: string;
}

export interface ModuleEntry {
  /** Module specifier resolved from `resolveFrom`. */
  readonly specifier: string;
  /** Output file name, relative to `outputDirectory`. */
  readonly output: string;
  /** `"all"` walks every exported zod schema; a list walks exactly those exports. */
  readonly exports: "all" | readonly string[];
  /** Package whose version is recorded in the generated header. Defaults to the specifier's package. */
  readonly versionFrom?: string;
  /** Per-path exemptions that degrade an unmappable schema to `unknown`. */
  readonly unknownDegrade: readonly DegradeEntry[];
}

export interface ChannelBinding {
  /** Wire channel name. */
  readonly name: string;
  readonly request?: string;
  readonly response?: string;
  readonly event?: string;
}

export interface ChannelTableEntry {
  readonly output: string;
  /** Vel enum name for the channel constants. */
  readonly enumName: string;
  /** Output file of the module that declares the referenced types. */
  readonly typesOutput: string;
  /** Inline channel bindings, or a runtime export holding the same shape. */
  readonly channels?: readonly ChannelBinding[];
  readonly source?: { readonly specifier: string; readonly export: string };
}

/**
 * How the contract package's compiled JavaScript is reached.
 *
 * `"node"` imports it as it sits, which is what a package compiled for Node
 * ESM supports. A package compiled under TypeScript's `moduleResolution:
 * "bundler"` emits extensionless relative specifiers (`from "./channels"`) that
 * Node's resolver does not complete, and bundler resolution is the majority
 * form in a real TypeScript monorepo — so `"bundle"` is the tool's own answer
 * rather than a recipe every consumer re-derives: the one target module is
 * bundled to self-contained ESM first, with `zod` left external.
 */
export interface LoaderOptions {
  readonly kind: "node" | "bundle";
  /**
   * Module names kept out of the bundle and imported from the target's own
   * install. `zod` is always one of them: this generator introspects the
   * schema objects the target built, and a second copy of zod inside the
   * bundle would be a different set of them.
   */
  readonly external: readonly string[];
}

export const ALWAYS_EXTERNAL = "zod";

export interface NamingRules {
  /** Suffix stripped from an exported schema name. */
  readonly stripSuffix: string;
  /** Prefix added to every generated declaration name. */
  readonly prefix: string;
}

export interface Manifest {
  readonly formatVersion: 1;
  /** Directory that resolves module specifiers and the target's `zod`, relative to the manifest. */
  readonly resolveFrom: string;
  /** Output directory, relative to the manifest. */
  readonly outputDirectory: string;
  readonly naming: NamingRules;
  /** How the contract modules are loaded. Defaults to bare Node ESM. */
  readonly loader: LoaderOptions;
  /** Run `velar format` over each emitted file. */
  readonly velarFormat: boolean;
  /** Executable used for formatting. Resolved from the output project, then `PATH`. */
  readonly velarCommand: string;
  readonly modules: readonly ModuleEntry[];
  readonly channelTables: readonly ChannelTableEntry[];
}

export class ManifestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ManifestError";
  }
}

function fail(path: string, message: string): never {
  throw new ManifestError(`${path}: ${message}`);
}

function object(value: unknown, path: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) fail(path, "must be an object");
  return value as Record<string, unknown>;
}

function string(value: unknown, path: string): string {
  if (typeof value !== "string" || value.length === 0) fail(path, "must be a non-empty string");
  return value;
}

function optionalString(value: unknown, path: string, fallback: string): string {
  if (value === undefined) return fallback;
  if (typeof value !== "string") fail(path, "must be a string");
  return value;
}

function boolean(value: unknown, path: string, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  if (typeof value !== "boolean") fail(path, "must be a boolean");
  return value;
}

function array(value: unknown, path: string): readonly unknown[] {
  if (!Array.isArray(value)) fail(path, "must be an array");
  return value;
}

function relativePath(value: unknown, path: string): string {
  const text = string(value, path);
  if (text.startsWith("/") || /^[A-Za-z]:[\\/]/u.test(text)) fail(path, "must be a relative path");
  return text;
}

function outputName(value: unknown, path: string): string {
  const text = relativePath(value, path);
  if (!text.endsWith(".vel")) fail(path, "must name a .vel file");
  if (text.includes("..")) fail(path, "must not escape the output directory");
  return text;
}

function readDegrades(value: unknown, path: string): DegradeEntry[] {
  if (value === undefined) return [];
  const entries = array(value, path).map((entry, index) => {
    const item = object(entry, `${path}[${index}]`);
    return {
      path: string(item["path"], `${path}[${index}].path`),
      reason: string(item["reason"], `${path}[${index}].reason`),
    };
  });
  const seen = new Set<string>();
  for (const entry of entries) {
    if (seen.has(entry.path)) fail(path, `duplicate degrade path '${entry.path}'`);
    seen.add(entry.path);
  }
  return entries;
}

function readChannels(value: unknown, path: string): ChannelBinding[] {
  const entries = array(value, path);
  // A table with no channels emits an enum with no members, which is not
  // VelarScript. The manifest is where that is still a sentence to correct.
  if (entries.length === 0) fail(path, "must declare at least one channel");
  return entries.map((entry, index) => {
    const item = object(entry, `${path}[${index}]`);
    const binding: ChannelBinding = {
      name: string(item["name"], `${path}[${index}].name`),
      ...(item["request"] === undefined ? {} : { request: string(item["request"], `${path}[${index}].request`) }),
      ...(item["response"] === undefined ? {} : { response: string(item["response"], `${path}[${index}].response`) }),
      ...(item["event"] === undefined ? {} : { event: string(item["event"], `${path}[${index}].event`) }),
    };
    if (binding.request === undefined && binding.response === undefined && binding.event === undefined) {
      fail(`${path}[${index}]`, "must bind at least one of request, response, or event");
    }
    return binding;
  });
}

function readLoader(value: unknown, path: string): LoaderOptions {
  if (value === undefined) return { kind: "node", external: [ALWAYS_EXTERNAL] };
  const item = object(value, path);
  const kind = optionalString(item["kind"], `${path}.kind`, "node");
  if (kind !== "node" && kind !== "bundle") fail(`${path}.kind`, 'must be "node" or "bundle"');
  const declared = item["external"] === undefined
    ? []
    : array(item["external"], `${path}.external`).map((name, at) => string(name, `${path}.external[${at}]`));
  // Naming externals for a loader that bundles nothing would read as a
  // configured fact that changes nothing.
  if (kind === "node" && declared.length > 0) {
    fail(`${path}.external`, 'only applies to the "bundle" loader, which is what leaves a module out');
  }
  return { kind, external: [...new Set([ALWAYS_EXTERNAL, ...declared])] };
}

export function parseManifest(raw: unknown): Manifest {
  const root = object(raw, "manifest");
  if (root["formatVersion"] !== 1) fail("manifest.formatVersion", "must be 1");

  const modulesRaw = array(root["modules"], "manifest.modules");
  if (modulesRaw.length === 0) fail("manifest.modules", "must declare at least one module");
  const modules = modulesRaw.map((entry, index) => {
    const path = `manifest.modules[${index}]`;
    const item = object(entry, path);
    const exportsValue = item["exports"];
    let exports: "all" | readonly string[];
    if (exportsValue === undefined || exportsValue === "all") exports = "all";
    else {
      const list = array(exportsValue, `${path}.exports`).map((name, at) => string(name, `${path}.exports[${at}]`));
      if (list.length === 0) fail(`${path}.exports`, "must not be empty; use \"all\" to walk every zod export");
      if (new Set(list).size !== list.length) fail(`${path}.exports`, "must not repeat an export");
      exports = list;
    }
    const module: ModuleEntry = {
      specifier: string(item["specifier"], `${path}.specifier`),
      output: outputName(item["output"], `${path}.output`),
      exports,
      unknownDegrade: readDegrades(item["unknownDegrade"], `${path}.unknownDegrade`),
      ...(item["versionFrom"] === undefined ? {} : { versionFrom: string(item["versionFrom"], `${path}.versionFrom`) }),
    };
    return module;
  });
  const outputs = new Set<string>();
  for (const module of modules) {
    if (outputs.has(module.output)) fail("manifest.modules", `duplicate output '${module.output}'`);
    outputs.add(module.output);
  }

  const namingRaw = object(root["naming"] ?? {}, "manifest.naming");
  const naming: NamingRules = {
    stripSuffix: optionalString(namingRaw["stripSuffix"], "manifest.naming.stripSuffix", "Schema"),
    prefix: optionalString(namingRaw["prefix"], "manifest.naming.prefix", ""),
  };

  const channelTables = (root["channelTables"] === undefined ? [] : array(root["channelTables"], "manifest.channelTables"))
    .map((entry, index) => {
      const path = `manifest.channelTables[${index}]`;
      const item = object(entry, path);
      const hasInline = item["channels"] !== undefined;
      const hasSource = item["source"] !== undefined;
      if (hasInline === hasSource) fail(path, "must declare exactly one of 'channels' or 'source'");
      const typesOutput = outputName(item["typesOutput"], `${path}.typesOutput`);
      if (!outputs.has(typesOutput)) fail(`${path}.typesOutput`, `must name a generated module output; known outputs: ${[...outputs].join(", ")}`);
      const table: ChannelTableEntry = {
        output: outputName(item["output"], `${path}.output`),
        enumName: string(item["enumName"], `${path}.enumName`),
        typesOutput,
        ...(hasInline ? { channels: readChannels(item["channels"], `${path}.channels`) } : {}),
        ...(hasSource
          ? {
              source: {
                specifier: string(object(item["source"], `${path}.source`)["specifier"], `${path}.source.specifier`),
                export: string(object(item["source"], `${path}.source`)["export"], `${path}.source.export`),
              },
            }
          : {}),
      };
      if (table.output === table.typesOutput) fail(`${path}.output`, "must differ from typesOutput");
      if (outputs.has(table.output)) fail(`${path}.output`, `duplicate output '${table.output}'`);
      outputs.add(table.output);
      return table;
    });

  return {
    formatVersion: 1,
    resolveFrom: relativePath(root["resolveFrom"] ?? ".", "manifest.resolveFrom"),
    outputDirectory: relativePath(root["outputDirectory"], "manifest.outputDirectory"),
    naming,
    loader: readLoader(root["loader"], "manifest.loader"),
    velarFormat: boolean(root["velarFormat"], "manifest.velarFormat", true),
    velarCommand: optionalString(root["velarCommand"], "manifest.velarCommand", "velar"),
    modules,
    channelTables,
  };
}
