/**
 * Reaching the contract package's compiled JavaScript.
 *
 * The generator introspects loaded schema objects, so the compiled form has to
 * be importable. A package compiled for Node ESM is; a package compiled under
 * TypeScript's `moduleResolution: "bundler"` is not, because its emitted
 * relative specifiers carry no extension and Node's resolver does not complete
 * them. Bundler resolution is the majority form in a real TypeScript monorepo,
 * so the `"bundle"` loader is the tool's own answer rather than a recipe each
 * consumer re-derives outside it.
 *
 * Every entry is bundled in **one** esbuild build with code splitting on. Two
 * separate bundles would hold two copies of a shared schema object, and the
 * channel table matches a runtime schema to a generated declaration by object
 * identity — so separate builds would break a table whose source module is not
 * the types module, silently and for a reason no diagnostic could name.
 */

import { mkdtempSync, realpathSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import type { LoaderOptions } from "./manifest.js";
import { importModule, ModuleLoadError, resolveModule, type LoadedModule } from "./zod-runtime.js";

export interface ModuleLoader {
  /** Declares every specifier the run will load, before the first one. */
  prepare(specifiers: readonly string[]): Promise<void>;
  load(specifier: string): Promise<LoadedModule>;
  dispose(): void;
}

export function createLoader(options: LoaderOptions, resolveFrom: string): ModuleLoader {
  return options.kind === "bundle" ? new BundleLoader(options, resolveFrom) : new NodeLoader(resolveFrom);
}

class NodeLoader implements ModuleLoader {
  readonly #resolveFrom: string;

  constructor(resolveFrom: string) {
    this.#resolveFrom = resolveFrom;
  }

  async prepare(): Promise<void> {
    // Nothing to build: the compiled files are imported where they sit.
  }

  async load(specifier: string): Promise<LoadedModule> {
    const file = resolveModule(specifier, this.#resolveFrom);
    return { exports: await importModule(file, specifier), file };
  }

  dispose(): void {
    // No temporary state.
  }
}

interface EsbuildModule {
  readonly build: (options: Record<string, unknown>) => Promise<{
    readonly metafile?: { readonly outputs: Record<string, { readonly entryPoint?: string }> };
  }>;
}

class BundleLoader implements ModuleLoader {
  readonly #options: LoaderOptions;
  readonly #resolveFrom: string;
  /** Original resolved entry -> the self-contained module built from it. */
  readonly #built = new Map<string, string>();
  #directory: string | null = null;

  constructor(options: LoaderOptions, resolveFrom: string) {
    this.#options = options;
    this.#resolveFrom = resolveFrom;
  }

  async prepare(specifiers: readonly string[]): Promise<void> {
    const entries = [...new Set(specifiers.map((specifier) => resolveModule(specifier, this.#resolveFrom)))];
    if (entries.length === 0) return;
    const esbuild = await loadEsbuild();
    const directory = mkdtempSync(join(tmpdir(), "velar-contract-codegen-bundle-"));
    this.#directory = directory;
    // Every path in the metafile is relative to this directory, so the run is
    // free of wherever the caller happened to invoke the tool from. It is the
    // real path because module resolution answers in real paths, and the two
    // have to name one file for the entry-point map to line up.
    const base = realPath(this.#resolveFrom);
    let result;
    try {
      result = await esbuild.build({
        absWorkingDir: base,
        entryPoints: entries,
        outdir: directory,
        // Flattened with a hash: two contract modules both named `index.js`
        // are one output path otherwise, and esbuild refuses that.
        entryNames: "[name]-[hash]",
        chunkNames: "chunk-[hash]",
        bundle: true,
        splitting: true,
        format: "esm",
        platform: "node",
        target: `node${process.versions.node.split(".")[0]!}`,
        logLevel: "silent",
        metafile: true,
        plugins: [externalPlugin(this.#options.external)],
      });
    } catch (error) {
      throw new ModuleLoadError(
        `the bundle loader could not build ${entries.join(", ")}:\n${describeBuildFailure(error)}`,
      );
    }
    for (const [output, description] of Object.entries(result.metafile?.outputs ?? {})) {
      if (description.entryPoint === undefined) continue;
      this.#built.set(resolve(base, description.entryPoint), resolve(base, output));
    }
    const missing = entries.filter((entry) => !this.#built.has(entry));
    if (missing.length > 0) {
      throw new ModuleLoadError(
        `the bundle loader produced no output for ${missing.join(", ")}; nothing was generated`,
      );
    }
  }

  async load(specifier: string): Promise<LoadedModule> {
    const file = resolveModule(specifier, this.#resolveFrom);
    const bundled = this.#built.get(file);
    if (bundled === undefined) {
      throw new ModuleLoadError(
        `'${specifier}' was not declared to the bundle loader before it was loaded; this is a generator fault`,
      );
    }
    // The header names the package that wrote the contract, and the copy in a
    // temporary directory is not that package: the original path is what the
    // owning-package walk is given.
    return { exports: await importModule(bundled, specifier), file };
  }

  dispose(): void {
    if (this.#directory === null) return;
    rmSync(this.#directory, { recursive: true, force: true });
    this.#directory = null;
  }
}

/** A directory that has not been created yet is still its own best answer. */
function realPath(directory: string): string {
  try {
    return realpathSync(directory);
  } catch {
    return directory;
  }
}

/** esbuild reports a build failure as an aggregate; the messages are the answer. */
function describeBuildFailure(error: unknown): string {
  const messages = (error as { errors?: readonly { text?: unknown; location?: { file?: unknown } }[] }).errors;
  if (!Array.isArray(messages) || messages.length === 0) return String((error as Error).message ?? error);
  return messages
    .map((message) => {
      const where = typeof message.location?.file === "string" ? ` (${message.location.file})` : "";
      return `  ${String(message.text)}${where}`;
    })
    .join("\n");
}

async function loadEsbuild(): Promise<EsbuildModule> {
  try {
    return (await import("esbuild")) as unknown as EsbuildModule;
  } catch (error) {
    throw new ModuleLoadError(
      `the bundle loader needs esbuild, which this install does not resolve: ${(error as Error).message}`,
    );
  }
}

/**
 * An external module is not omitted, it is pinned: the bundle imports it by the
 * absolute path the *target* resolves it to. That is the whole point for zod —
 * the generator reads the schema objects the target's own zod built, and a copy
 * resolved from a temporary directory would be a different library.
 */
function externalPlugin(external: readonly string[]): Record<string, unknown> {
  return {
    name: "velar-contract-codegen-external",
    setup(build: { onResolve: (filter: { filter: RegExp }, callback: (args: {
      path: string;
      kind: string;
      resolveDir: string;
    }) => unknown) => void }): void {
      // Bare specifiers only. esbuild compiles this filter with Go's regexp,
      // which rejects the `u` flag JavaScript sources usually carry.
      // eslint-disable-next-line require-unicode-regexp
      build.onResolve({ filter: /^[^./]/ }, (args) => {
        if (args.kind === "entry-point") return null;
        if (!external.some((name) => args.path === name || args.path.startsWith(`${name}/`))) return null;
        try {
          const resolved = createRequire(join(args.resolveDir, "noop.js")).resolve(args.path);
          return { path: pathToFileURL(resolved).href, external: true };
        } catch (error) {
          return {
            errors: [{
              text: `cannot resolve the external module '${args.path}' from ${args.resolveDir}: `
                + `${(error as Error).message}`,
            }],
          };
        }
      });
    },
  };
}
