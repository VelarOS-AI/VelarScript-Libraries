/**
 * zod is data, so this generator introspects loaded schema objects instead of
 * parsing TypeScript. That only works against one internal layout, so the
 * supported major version is stated, checked, and refused out loud.
 */

import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

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
  /** Absolute path of the file that was loaded. */
  readonly file: string;
}

export async function loadModule(specifier: string, resolveFrom: string): Promise<LoadedModule> {
  const require = createRequire(join(resolveFrom, "noop.js"));
  let resolved: string;
  try {
    resolved = require.resolve(specifier);
  } catch (error) {
    throw new Error(
      `cannot resolve module '${specifier}' from ${resolveFrom}: ${(error as Error).message}`,
    );
  }
  return { exports: (await import(pathToFileURL(resolved).href)) as Record<string, unknown>, file: resolved };
}

/**
 * Walks up from a loaded file to the package that owns it. A relative
 * specifier has no package name to look up, and guessing one would put a
 * fiction in the generated header.
 */
export function owningPackage(file: string): { readonly name: string; readonly version: string | null } | null {
  let directory = dirname(file);
  for (;;) {
    try {
      const manifest = JSON.parse(readFileSync(join(directory, "package.json"), "utf8")) as {
        name?: unknown;
        version?: unknown;
      };
      if (typeof manifest.name === "string") {
        return { name: manifest.name, version: typeof manifest.version === "string" ? manifest.version : null };
      }
    } catch {
      // Keep walking: a directory without a manifest is not an answer.
    }
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
