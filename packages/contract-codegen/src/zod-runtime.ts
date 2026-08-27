/**
 * zod is data, so this generator introspects loaded schema objects instead of
 * parsing TypeScript. That only works against one internal layout, so the
 * supported major version is stated, checked, and refused out loud.
 */

import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path";

/**
 * The zod major version this generator understands, matching the VelarOS
 * platform pin (`zod@4.4.3` in its lockfile). zod 4 moved every schema's
 * internals to `_def.type`; zod 3 used `_def.typeName`, so the walker cannot
 * read both.
 */
export const SUPPORTED_ZOD_MAJOR = 4;

/** The exact platform pin this generator was developed and tested against. */
export const REFERENCE_ZOD_VERSION = "4.4.3";

export class ZodVersionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ZodVersionError";
  }
}

export interface ZodResolution {
  readonly version: string;
  readonly major: number;
  readonly path: string;
}

export function resolveZod(resolveFrom: string): ZodResolution {
  const require = createRequire(join(resolveFrom, "noop.js"));
  let manifestPath: string;
  try {
    manifestPath = require.resolve("zod/package.json");
  } catch {
    try {
      // Some publishers do not export `package.json`; fall back to the entry.
      const entry = require.resolve("zod");
      const marker = `${"node_modules"}/zod/`;
      const index = entry.lastIndexOf(marker);
      if (index < 0) throw new Error("not a node_modules layout");
      manifestPath = `${entry.slice(0, index + marker.length)}package.json`;
    } catch {
      throw new ZodVersionError(
        `cannot resolve 'zod' from ${resolveFrom}; the contract package's own zod install is what this generator introspects`,
      );
    }
  }
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as { version?: unknown };
  const version = typeof manifest.version === "string" ? manifest.version : "unknown";
  const major = Number.parseInt(version.split(".")[0] ?? "", 10);
  return { version, major: Number.isNaN(major) ? -1 : major, path: manifestPath };
}

export function assertSupportedZod(resolution: ZodResolution): void {
  if (resolution.major === SUPPORTED_ZOD_MAJOR) return;
  throw new ZodVersionError(
    `unsupported zod major version: @velarscript-labs/contract-codegen introspects zod ${SUPPORTED_ZOD_MAJOR}.x `
      + `(developed against ${REFERENCE_ZOD_VERSION}), and the contract package resolves zod ${resolution.version} `
      + `from ${resolution.path}. Schema internals differ between majors, so no output is produced.`,
  );
}

/** The subset of a zod schema this generator reads. */
export interface ZodSchema {
  readonly _def: ZodDef;
}

export interface ZodDef {
  readonly type: string;
  readonly [key: string]: unknown;
}

export function isZodSchema(value: unknown): value is ZodSchema {
  if (typeof value !== "object" || value === null) return false;
  const def = (value as { _def?: unknown })._def;
  if (typeof def !== "object" || def === null) return false;
  return typeof (def as { type?: unknown }).type === "string";
}

/** A zod 3 schema carries `_def.typeName`; naming it beats a shapeless failure. */
export function looksLikeLegacyZod(value: unknown): boolean {
  if (typeof value !== "object" || value === null) return false;
  const def = (value as { _def?: unknown })._def;
  if (typeof def !== "object" || def === null) return false;
  return typeof (def as { typeName?: unknown }).typeName === "string"
    && typeof (def as { type?: unknown }).type !== "string";
}

export interface LoadedModule {
  readonly exports: Record<string, unknown>;
  /**
   * Absolute path of the contract file, as the target package holds it. A
   * bundled load imports a copy, and the copy is not what the header names.
   */
  readonly file: string;
}

export class ModuleLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ModuleLoadError";
  }
}

/** Where a specifier lands, without loading it. */
export function resolveModule(specifier: string, resolveFrom: string): string {
  const require = createRequire(join(resolveFrom, "noop.js"));
  try {
    return require.resolve(specifier);
  } catch (error) {
    throw new ModuleLoadError(
      `cannot resolve module '${specifier}' from ${resolveFrom}: ${(error as Error).message}`,
    );
  }
}

/**
 * Imports a resolved file as bare Node ESM, and turns the one failure this
 * reliably produces into a sentence that names its cause. A package compiled
 * under TypeScript's `moduleResolution: "bundler"` emits extensionless relative
 * specifiers, which Node's ESM resolver does not complete; `ERR_MODULE_NOT_FOUND`
 * on its own sends the reader looking for a missing file that is right there.
 */
export async function importModule(file: string, specifier: string): Promise<Record<string, unknown>> {
  try {
    return (await import(pathToFileURL(file).href)) as Record<string, unknown>;
  } catch (error) {
    const failure = error as NodeJS.ErrnoException;
    if (failure.code !== "ERR_MODULE_NOT_FOUND") throw error;
    throw new ModuleLoadError(
      `'${specifier}' resolved to ${file}, and importing it as Node ESM failed: ${failure.message}\n`
        + "A package compiled with TypeScript's `moduleResolution: \"bundler\"` emits extensionless relative "
        + "specifiers (`from \"./channels\"`), which Node's ESM resolver does not complete — the file it names "
        + "exists, but only a bundler will find it. Declare `\"loader\": {\"kind\": \"bundle\"}` in the manifest "
        + "to bundle this module to self-contained ESM first, with zod left external.",
    );
  }
}

export async function loadModule(specifier: string, resolveFrom: string): Promise<LoadedModule> {
  const resolved = resolveModule(specifier, resolveFrom);
  return { exports: await importModule(resolved, specifier), file: resolved };
}

export interface PackageIdentity {
  readonly name: string;
  readonly version: string | null;
}

function namedManifest(path: string): PackageIdentity | null {
  let manifest: { name?: unknown; version?: unknown };
  try {
    manifest = JSON.parse(readFileSync(path, "utf8")) as { name?: unknown; version?: unknown };
  } catch {
    // No manifest here, or one no reader can parse: neither is an answer.
    return null;
  }
  // A manifest with no name is the `{"type": "module"}` marker a compiled
  // `dist/` carries. It declares a module format, not a package boundary, so
  // the walk goes past it rather than stopping on nothing.
  if (typeof manifest.name !== "string") return null;
  return { name: manifest.name, version: typeof manifest.version === "string" ? manifest.version : null };
}

function inside(root: string, directory: string): boolean {
  const path = relative(root, directory);
  return path === "" || (!path.startsWith("..") && !isAbsolute(path));
}

/**
 * The package that owns a loaded file: the nearest named `package.json` at or
 * above it. The generated header's source line exists to say who authored the
 * contract, so an answer that is not that package is worse than no answer.
 *
 * Two things bound the walk, and the first is the one that matters:
 *
 * - `resolutionRoot` is the manifest's own `resolveFrom` — the directory the
 *   consuming project declared as where contracts are resolved. A manifest
 *   found *above* it belongs to the project that asked for the generation, not
 *   to the package that wrote the contract, and crediting the consumer with
 *   authoring its own wire contract is the one thing the source line exists to
 *   deny. The bound applies only when the loaded file is inside that root: a
 *   package reached through an install or a link resolves into its own tree,
 *   about which the caller's root says nothing.
 * - A `node_modules` directory ends the walk too. A file below one but inside
 *   no named package has no package to name, and climbing out of the install
 *   reaches whichever project happens to host it.
 *
 * `null` is a real answer: the header then names the specifier and no author.
 */
export function owningPackage(file: string, resolutionRoot?: string): PackageIdentity | null {
  const root = resolutionRoot === undefined ? null : resolve(resolutionRoot);
  let directory = dirname(resolve(file));
  const bounded = root !== null && inside(root, directory);
  for (;;) {
    const owner = namedManifest(join(directory, "package.json"));
    if (owner !== null) return owner;
    if (bounded && directory === root) return null;
    if (basename(directory) === "node_modules") return null;
    const parent = dirname(directory);
    if (parent === directory) return null;
    directory = parent;
  }
}

export interface ExportedSchema {
  readonly name: string;
  readonly schema: ZodSchema;
}

export function collectExports(
  module: Record<string, unknown>,
  wanted: "all" | readonly string[],
  specifier: string,
): ExportedSchema[] {
  if (wanted === "all") {
    const found: ExportedSchema[] = [];
    for (const name of Object.keys(module).sort()) {
      const value = module[name];
      if (isZodSchema(value)) found.push({ name, schema: value });
      else if (looksLikeLegacyZod(value)) {
        throw new ZodVersionError(
          `'${specifier}' export '${name}' is a zod 3 schema (\`_def.typeName\`); this generator introspects `
            + `zod ${SUPPORTED_ZOD_MAJOR}.x internals (\`_def.type\`) only`,
        );
      }
    }
    if (found.length === 0) throw new Error(`'${specifier}' exports no zod schemas`);
    return found;
  }
  return wanted.map((name) => {
    const value = module[name];
    if (looksLikeLegacyZod(value)) {
      throw new ZodVersionError(
        `'${specifier}' export '${name}' is a zod 3 schema (\`_def.typeName\`); this generator introspects `
          + `zod ${SUPPORTED_ZOD_MAJOR}.x internals (\`_def.type\`) only`,
      );
    }
    if (!isZodSchema(value)) throw new Error(`'${specifier}' has no exported zod schema named '${name}'`);
    return { name, schema: value };
  });
}

/** Reads the version of the package a specifier belongs to, for the generated header. */
export function readPackageVersion(packageName: string, resolveFrom: string): string | null {
  const require = createRequire(join(resolveFrom, "noop.js"));
  try {
    const manifestPath = require.resolve(`${packageName}/package.json`);
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as { version?: unknown };
    return typeof manifest.version === "string" ? manifest.version : null;
  } catch {
    // A package that does not export `package.json` is common; walk up from the
    // resolved entry instead of guessing a version.
    try {
      const entry = require.resolve(packageName);
      const marker = `${"node_modules"}/${packageName}/`;
      const index = entry.lastIndexOf(marker);
      if (index < 0) return null;
      const manifest = JSON.parse(
        readFileSync(`${entry.slice(0, index + marker.length)}package.json`, "utf8"),
      ) as { version?: unknown };
      return typeof manifest.version === "string" ? manifest.version : null;
    } catch {
      return null;
    }
  }
}

/** `@scope/name/sub` and `name/sub` both belong to their package root. */
export function packageOf(specifier: string): string | null {
  if (specifier.startsWith(".") || specifier.startsWith("/")) return null;
  const parts = specifier.split("/");
  if (specifier.startsWith("@")) return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : null;
  return parts[0] ?? null;
}
