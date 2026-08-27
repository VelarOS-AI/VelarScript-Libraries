#!/usr/bin/env node

/**
 * `velar-contract-codegen generate <manifest>` writes the declarations;
 * `--check` regenerates into memory and compares byte for byte, so CI fails on
 * a contract that moved without its generated types.
 */

import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { DriftError, run } from "./generate.js";
import { MappingError } from "./lower.js";
import { ManifestError } from "./manifest.js";
import { renderReportText, type GenerationReport } from "./report.js";
import { ZodVersionError } from "./zod-runtime.js";

const USAGE = `Usage:
  velar-contract-codegen generate <manifest.json> [--check] [--json] [--report <file>]

  --check          Regenerate in memory and compare byte for byte; never writes.
  --json           Print the machine-readable report to stdout instead of text.
  --report <file>  Also write the machine-readable report to <file>.
`;

function toolVersion(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const manifest = JSON.parse(readFileSync(join(here, "..", "package.json"), "utf8")) as { version?: unknown };
  return typeof manifest.version === "string" ? manifest.version : "0.0.0";
}

interface Parsed {
  readonly manifest: string;
  readonly check: boolean;
  readonly json: boolean;
  readonly reportFile: string | null;
}

function parseArguments(argv: readonly string[]): Parsed {
  if (argv[0] !== "generate") throw new Error(`unknown command '${String(argv[0] ?? "")}'`);
  let manifest: string | null = null;
  let check = false;
  let json = false;
  let reportFile: string | null = null;
  for (let index = 1; index < argv.length; index += 1) {
    const argument = argv[index]!;
    if (argument === "--check") check = true;
    else if (argument === "--json") json = true;
    else if (argument === "--report") {
      const value = argv[index + 1];
      if (value === undefined) throw new Error("--report needs a file path");
      reportFile = value;
      index += 1;
    } else if (argument.startsWith("-")) throw new Error(`unknown option '${argument}'`);
    else if (manifest === null) manifest = argument;
    else throw new Error(`unexpected argument '${argument}'`);
  }
  if (manifest === null) throw new Error("generate needs a manifest path");
  return { manifest, check, json, reportFile };
}

function emit(report: GenerationReport, parsed: Parsed): void {
  if (parsed.reportFile !== null) writeFileSync(parsed.reportFile, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  process.stdout.write(parsed.json ? `${JSON.stringify(report, null, 2)}\n` : renderReportText(report));
}

export async function main(argv: readonly string[]): Promise<number> {
  let parsed: Parsed;
  try {
    parsed = parseArguments(argv);
  } catch (error) {
    process.stderr.write(`${(error as Error).message}\n\n${USAGE}`);
    return 2;
  }
  try {
    const report = await run({
      manifestPath: parsed.manifest,
      mode: parsed.check ? "check" : "generate",
      toolVersion: toolVersion(),
    });
    emit(report, parsed);
    return 0;
  } catch (error) {
    if (error instanceof DriftError) {
      emit(error.report, parsed);
      process.stderr.write(`${error.message}\nRun without --check to regenerate.\n`);
      return 1;
    }
    if (error instanceof MappingError || error instanceof ManifestError || error instanceof ZodVersionError) {
      process.stderr.write(`${error.message}\n`);
      return 1;
    }
    process.stderr.write(`${(error as Error).stack ?? String(error)}\n`);
    return 1;
  }
}

/**
 * npm installs a bin as a link, so `process.argv[1]` is the link and
 * `import.meta.url` is the file it points at. Comparing the two without
 * resolving both would leave the installed executable doing nothing.
 */
function invokedDirectly(): boolean {
  const entry = process.argv[1];
  if (entry === undefined) return false;
  try {
    return realpathSync(entry) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return pathToFileURL(entry).href === import.meta.url;
  }
}

if (invokedDirectly()) {
  process.exitCode = await main(process.argv.slice(2));
}
