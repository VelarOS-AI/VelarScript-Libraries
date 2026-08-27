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

/** What `spawnSync` is asked to run, decided per platform rather than per host. */
export interface SpawnPlan {
  readonly command: string;
  readonly args: readonly string[];
  readonly shell: boolean;
}

/**
 * `cmd.exe` reads a bare `"` as a quoting toggle, so a value carrying one
 * cannot be passed through the shell intact. Refusing beats running half a
 * command line.
 */
function quoteForShell(value: string): string {
  if (value.includes('"')) {
    throw new FormatError(`cannot pass '${value}' to the Windows shell: a double quote has no escape in cmd.exe`);
  }
  return `"${value}"`;
}

/**
 * npm installs the Windows entry point as `velar.cmd`, a batch script rather
 * than an executable. Since Node 20.12 `spawn` refuses to run one without a
 * shell (EINVAL), so a `.cmd` goes through the shell with every argument
 * quoted, and every other platform keeps the direct, shell-free call.
 */
export function velarSpawnPlan(
  executable: string,
  args: readonly string[],
  platform: string = process.platform,
): SpawnPlan {
  if (platform === "win32" && /\.(?:cmd|bat)$/iu.test(executable)) {
    return { command: quoteForShell(executable), args: args.map(quoteForShell), shell: true };
  }
  return { command: executable, args: [...args], shell: false };
}

/** Formats one file in place and reports what the toolchain said when it fails. */
export function formatFile(file: string, options: FormatOptions): void {
  const executable = resolveVelarExecutable(options.projectRoot, options.command);
  const plan = velarSpawnPlan(executable, ["format", file]);
  const result = spawnSync(plan.command, [...plan.args], { encoding: "utf8", shell: plan.shell });
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
