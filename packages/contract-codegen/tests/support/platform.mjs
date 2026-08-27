// Locates a VelarOS-Platform checkout for the real-target acceptance.
//
// The platform packages publish to GitHub Packages behind authentication, so
// the acceptance reads a local checkout's own build output instead: the same
// compiled JavaScript a consumer would install, without touching that
// repository. When no checkout is present the platform-dependent assertions
// skip, and the committed artifacts still carry the whole run.

import { existsSync, mkdtempSync, rmSync, symlinkSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";

import { PACKAGE_ROOT } from "./equivalence.mjs";

export const REAL_TARGETS = join(PACKAGE_ROOT, "tests", "real-targets");

/** Each entry is `[manifest basename, package directory, compiled entry]`. */
export const TARGETS = [
  ["agent.manifest.json", "packages/agent", "dist/protocol/index.js"],
  ["kernel.manifest.json", "packages/kernel", "dist/contracts/protocol/index.js"],
];

export function platformRoot() {
  const declared = process.env["VELAROS_PLATFORM_ROOT"];
  const candidate = declared !== undefined && declared.length > 0
    ? resolve(declared)
    : resolve(PACKAGE_ROOT, "..", "..", "..", "VelarOS-Platform");
  return existsSync(candidate) ? candidate : null;
}

/** Present only when every target's compiled entry has been built locally. */
export function platformBuilt(root) {
  return root !== null && TARGETS.every(([, directory, entry]) => existsSync(join(root, directory, entry)));
}

export function platformSkipReason() {
  const root = platformRoot();
  if (root === null) return "no VelarOS-Platform checkout (set VELAROS_PLATFORM_ROOT)";
  if (!platformBuilt(root)) return `VelarOS-Platform at ${root} has no built dist (run its build first)`;
  return null;
}

/**
 * Materializes the `platform/<name>` links the committed manifests declare, so
 * the manifests stay free of machine-specific paths.
 */
export function linkPlatform(label, root) {
  const temporary = mkdtempSync(join(tmpdir(), `contract-codegen-${label}-`));
  mkdirSync(join(temporary, "platform"), { recursive: true });
  symlinkSync(join(root, "packages", "agent"), join(temporary, "platform", "agent"), "dir");
  symlinkSync(join(root, "packages", "kernel"), join(temporary, "platform", "kernel"), "dir");
  mkdirSync(join(temporary, "generated"), { recursive: true });
  for (const [manifest] of TARGETS) {
    writeFileSync(join(temporary, manifest), readFileSync(join(REAL_TARGETS, manifest), "utf8"), "utf8");
  }
  return { directory: temporary, dispose: () => rmSync(temporary, { recursive: true, force: true }) };
}

export function relativeToPackage(path) {
  return relative(PACKAGE_ROOT, path);
}
