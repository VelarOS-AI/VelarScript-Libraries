/**
 * Generated source goes through the consuming project's own `velar format`.
 * The formatter is never bundled here: formatting is compiler semantics, and a
 * labs tooling package does not carry a second copy of it.
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, parse } from "node:path";

export class FormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FormatError";
  }
}

/** Walks up from `start` looking for a project-local `velar` executable. */
export function resolveVelarExecutable(start: string, command: string): string {
  const executable = process.platform === "win32" ? `${command}.cmd` : command;
  let directory = start;
  for (;;) {
    const candidate = join(directory, "node_modules", ".bin", executable);
    if (existsSync(candidate)) return candidate;
    const parent = dirname(directory);
    if (parent === directory || parent === parse(directory).root) return command;
    directory = parent;
  }
}

export interface FormatOptions {
  /** Directory the executable search starts from. */
  readonly projectRoot: string;
  readonly command: string;
}

/** Formats one file in place and reports what the toolchain said when it fails. */
export function formatFile(file: string, options: FormatOptions): void {
  const executable = resolveVelarExecutable(options.projectRoot, options.command);
  const result = spawnSync(executable, ["format", file], { encoding: "utf8" });
  if (result.error !== undefined) {
    throw new FormatError(
      `cannot run '${executable} format': ${result.error.message}. Install the project's VelarScript toolchain, `
        + "or set \"velarFormat\": false in the manifest.",
    );
  }
  if (result.status !== 0) {
    throw new FormatError(
      `'${executable} format ${file}' failed (${String(result.status)})\n${result.stdout ?? ""}${result.stderr ?? ""}`,
    );
  }
}
