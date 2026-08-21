import { existsSync } from "node:fs";
import { isAbsolute, dirname, join, resolve } from "node:path";

export interface ResolveVelarExecutableOptions {
  readonly command?: string;
  readonly platform?: NodeJS.Platform;
}

export function velarExecutableCandidates(
  projectRoot: string,
  options: ResolveVelarExecutableOptions = {},
): readonly string[] {
  if (projectRoot.length === 0) throw new TypeError("projectRoot must not be empty");
  const command = options.command ?? "velar";
  if (command.length === 0) throw new TypeError("command must not be empty");
  if (isAbsolute(command) || command.includes("/") || command.includes("\\")) {
    return Object.freeze([command]);
  }
  const executable = (options.platform ?? process.platform) === "win32" ? `${command}.cmd` : command;
  const candidates: string[] = [];
  let current = resolve(projectRoot);
  while (true) {
    candidates.push(join(current, "node_modules", ".bin", executable));
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return Object.freeze(candidates);
}

export function resolveVelarExecutable(
  projectRoot: string,
  options: ResolveVelarExecutableOptions = {},
): string {
  const command = options.command ?? "velar";
  const candidate = velarExecutableCandidates(projectRoot, options).find((value) => existsSync(value));
  return candidate ?? command;
}
