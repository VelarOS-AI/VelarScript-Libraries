#!/usr/bin/env node

import { access, readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const repositoryURL = "git+https://github.com/VelarOS-AI/VelarScript-Libraries.git";
const packageKinds = new Set(["source-library", "adapter", "tooling", "integration"]);
const packageStatuses = new Set(["experimental", "stable", "deprecated"]);
const targets = new Set(["core", "node", "web", "desktop"]);
const toolchainPackages = new Set([
  "@velarscript/compiler",
  "@velarscript/node",
  "@velarscript/web",
  "@velarscript/desktop",
  "@velarscript/cli",
  "create-velar",
]);

function fail(message) {
  throw new Error(message);
}

async function json(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function exists(path, message) {
  try {
    await access(path);
  } catch {
    fail(message);
  }
}

function dependencyEntries(manifest) {
  return ["dependencies", "optionalDependencies", "peerDependencies"]
    .flatMap((field) => Object.entries(manifest[field] ?? {}).map(([name, version]) => ({ field, name, version })));
}

const catalog = await json(join(root, "catalog.json"));
if (catalog?.formatVersion !== 1 || !Array.isArray(catalog.packages)) fail("catalog.json must use formatVersion 1 with a package list");

const directoryEntries = await readdir(join(root, "packages"), { withFileTypes: true });
const directories = directoryEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
const catalogPaths = catalog.packages.map((entry) => entry.path).sort();
const expectedPaths = directories.map((name) => `packages/${name}`);
if (JSON.stringify(catalogPaths) !== JSON.stringify(expectedPaths)) {
  fail(`catalog/package directory mismatch\ncatalog: ${catalogPaths.join(", ")}\ndirectories: ${expectedPaths.join(", ")}`);
}

const names = new Set();
for (const entry of catalog.packages) {
  if (!entry || typeof entry !== "object") fail("catalog package entries must be objects");
  if (typeof entry.name !== "string" || !entry.name.startsWith("@velarscript/") || entry.name === "@velarscript/library") {
    fail(`invalid companion package name '${String(entry.name)}'`);
  }
  if (names.has(entry.name)) fail(`duplicate catalog package '${entry.name}'`);
  names.add(entry.name);
  if (!packageKinds.has(entry.kind)) fail(`${entry.name} has invalid kind '${String(entry.kind)}'`);
  if (!packageStatuses.has(entry.status)) fail(`${entry.name} has invalid status '${String(entry.status)}'`);
  if (typeof entry.supportedVelarScript !== "string" || entry.supportedVelarScript.length === 0) {
    fail(`${entry.name} must declare its supported VelarScript range`);
  }
  if (!Array.isArray(entry.targets) || entry.targets.some((target) => !targets.has(target)) || new Set(entry.targets).size !== entry.targets.length) {
    fail(`${entry.name} has invalid or duplicate targets`);
  }

  const packageRoot = resolve(root, entry.path);
  if (relative(root, packageRoot).startsWith("..") || dirname(packageRoot) !== join(root, "packages")) {
    fail(`${entry.name} must live directly under packages/*`);
  }
  const manifest = await json(join(packageRoot, "package.json"));
  if (manifest.name !== entry.name) fail(`${entry.path} manifest name does not match the catalog`);
  if (manifest.private === true) fail(`${entry.name} is unexpectedly private`);
  if (typeof manifest.version !== "string" || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u.test(manifest.version)) {
    fail(`${entry.name} has an invalid semantic version`);
  }
  if (manifest.license !== "Apache-2.0") fail(`${entry.name} must use Apache-2.0`);
  if (manifest.publishConfig?.access !== "public") fail(`${entry.name} must publish with public access`);
  if (manifest.repository?.url !== repositoryURL || manifest.repository?.directory !== entry.path) {
    fail(`${entry.name} repository metadata must point to ${entry.path}`);
  }
  if (!Array.isArray(manifest.files) || !manifest.files.includes("README.md")
    || !manifest.files.includes("CHANGELOG.md") || !manifest.files.includes("LICENSE")) {
    fail(`${entry.name} must explicitly pack README.md, CHANGELOG.md, and LICENSE`);
  }
  await exists(join(packageRoot, "README.md"), `${entry.name} is missing README.md`);
  await exists(join(packageRoot, "CHANGELOG.md"), `${entry.name} is missing CHANGELOG.md`);
  await exists(join(packageRoot, "LICENSE"), `${entry.name} is missing LICENSE`);

  for (const dependency of dependencyEntries(manifest)) {
    if (typeof dependency.version !== "string" || /^(?:file|link|workspace):/u.test(dependency.version) || dependency.version.includes("../")) {
      fail(`${entry.name} ${dependency.field} '${dependency.name}' must use a registry version`);
    }
    if (dependency.field !== "peerDependencies" && toolchainPackages.has(dependency.name)) {
      fail(`${entry.name} cannot take a production dependency on toolchain package '${dependency.name}'`);
    }
  }

  if (entry.kind === "tooling" || entry.kind === "integration") {
    if (manifest.velar !== undefined) fail(`${entry.name} tooling/integration packages must use ordinary npm exports`);
    if (!manifest.exports) fail(`${entry.name} must declare npm exports`);
    continue;
  }

  const velar = manifest.velar;
  if (!velar || typeof velar.entry !== "string") fail(`${entry.name} must declare velar.entry`);
  if (JSON.stringify(velar.targets) !== JSON.stringify(entry.targets)) fail(`${entry.name} target declarations drift from catalog.json`);
  if (!velar.requires || !Array.isArray(velar.requires.capabilities)) fail(`${entry.name} must declare velar.requires.capabilities`);
  await exists(join(packageRoot, velar.entry), `${entry.name} velar.entry does not exist`);
  await exists(join(packageRoot, "velar.json"), `${entry.name} is missing its check/test project manifest`);
}

process.stdout.write(`Validated ${catalog.packages.length} companion package contracts.\n`);
