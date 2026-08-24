#!/usr/bin/env node

import { access, readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const repositoryURL = "git+https://github.com/VelarOS-AI/VelarScript-Libraries.git";
const companionScope = "@velarscript-labs";
const packageKinds = new Set(["source-library", "adapter", "tooling", "integration"]);
const packageStatuses = new Set(["experimental", "stable", "deprecated"]);
const targets = new Set(["core", "node", "web", "desktop"]);
const toolchainPackages = new Set([
  "@velarscript/compiler",
  "@velarscript/core",
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

function sha256(body) {
  return createHash("sha256").update(body).digest("hex");
}

function stringLeaves(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (value !== null && typeof value === "object") return Object.values(value).flatMap(stringLeaves);
  return [];
}

const catalog = await json(join(root, "catalog.json"));
if (catalog?.formatVersion !== 2 || !Array.isArray(catalog.packages)) fail("catalog.json must use formatVersion 2 with a package list");
if (catalog.distribution?.kind !== "npm-registry"
  || catalog.distribution.scope !== companionScope
  || catalog.distribution.access !== "public") {
  fail(`catalog.json must declare public npm registry distribution under ${companionScope}`);
}

const directoryEntries = await readdir(join(root, "packages"), { withFileTypes: true });
const directories = directoryEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
const catalogPaths = catalog.packages.map((entry) => entry.path).sort();
const expectedPaths = directories.map((name) => `packages/${name}`);
if (JSON.stringify(catalogPaths) !== JSON.stringify(expectedPaths)) {
  fail(`catalog/package directory mismatch\ncatalog: ${catalogPaths.join(", ")}\ndirectories: ${expectedPaths.join(", ")}`);
}

const names = new Set();
const manifests = new Map();
for (const entry of catalog.packages) {
  if (typeof entry?.name === "string" && typeof entry?.path === "string") {
    manifests.set(entry.name, await json(join(root, entry.path, "package.json")));
  }
}
for (const entry of catalog.packages) {
  if (!entry || typeof entry !== "object") fail("catalog package entries must be objects");
  if (typeof entry.name !== "string" || !entry.name.startsWith(`${companionScope}/`)) {
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
  const manifest = manifests.get(entry.name);
  if (manifest.name !== entry.name) fail(`${entry.path} manifest name does not match the catalog`);
  if (manifest.private === true) fail(`${entry.name} cannot be private because it is a public registry package`);
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
    if (typeof dependency.version !== "string"
      || /^(?:file|link|workspace|git|https?):/u.test(dependency.version)
      || dependency.version.includes("../")) {
      fail(`${entry.name} ${dependency.field} '${dependency.name}' must use an npm registry version`);
    }
    if (dependency.field !== "peerDependencies" && toolchainPackages.has(dependency.name)) {
      fail(`${entry.name} cannot take a production dependency on toolchain package '${dependency.name}'`);
    }
    const companion = manifests.get(dependency.name);
    if (companion !== undefined && dependency.version !== companion.version) {
      fail(`${entry.name} ${dependency.field} '${dependency.name}' must pin ${companion.version}`);
    }
  }

  if (entry.kind === "tooling" || entry.kind === "integration") {
    if (manifest.velar !== undefined) fail(`${entry.name} tooling/integration packages must use ordinary JavaScript exports`);
    if (!manifest.exports) fail(`${entry.name} must declare package exports`);
    continue;
  }

  const velar = manifest.velar;
  if (!velar || typeof velar.entry !== "string") fail(`${entry.name} must declare velar.entry`);
  if (JSON.stringify(velar.targets) !== JSON.stringify(entry.targets)) fail(`${entry.name} target declarations drift from catalog.json`);
  if (!velar.requires || !Array.isArray(velar.requires.capabilities)) fail(`${entry.name} must declare velar.requires.capabilities`);
  await exists(join(packageRoot, velar.entry), `${entry.name} velar.entry does not exist`);
  await exists(join(packageRoot, "velar.json"), `${entry.name} is missing its check/test project manifest`);
  if (!manifest.files.includes(velar.entry) || !manifest.files.includes("dist")) {
    fail(`${entry.name} must publish its exact velar.entry and frozen dist directory`);
  }
  if (manifest.scripts?.build !== "velar build-library") fail(`${entry.name} build script must run velar build-library`);
  const artifactEntries = velar.artifacts !== null && typeof velar.artifacts === "object" && !Array.isArray(velar.artifacts)
    ? Object.entries(velar.artifacts)
    : [];
  if (artifactEntries.length !== 1 || !["core", "node"].includes(artifactEntries[0]?.[0]) || typeof artifactEntries[0]?.[1] !== "string") {
    fail(`${entry.name} must declare exactly one core or node Velar ABI artifact`);
  }
  const [artifactTarget, artifactRelativePath] = artifactEntries[0];
  if (artifactTarget === "node" && velar.targets.some((target) => target !== "node")) {
    fail(`${entry.name} cannot expose a Node artifact to a non-Node target`);
  }
  const rootExportTargets = stringLeaves(
    manifest.exports !== null && typeof manifest.exports === "object" && !Array.isArray(manifest.exports)
      ? manifest.exports["."]
      : manifest.exports,
  );
  const expectedExport = `./${dirname(artifactRelativePath)}/index.js`;
  if (rootExportTargets.length === 0 || rootExportTargets.some((target) => target !== expectedExport)) {
    fail(`${entry.name} root npm export must point at '${expectedExport}'`);
  }
  const receiptPath = join(packageRoot, artifactRelativePath);
  const receipt = await json(receiptPath);
  if (receipt.kind !== "velar-library-artifact" || receipt.formatVersion !== 1 || receipt.abiVersion !== 1) {
    fail(`${entry.name} artifact receipt must use Velar library ABI 1`);
  }
  if (receipt.package?.name !== entry.name || receipt.package?.version !== manifest.version
    || receipt.target !== artifactTarget || receipt.sourceEntry !== velar.entry) {
    fail(`${entry.name} artifact receipt identity does not match package.json`);
  }
  const receiptRoot = dirname(receiptPath);
  for (const field of ["javascript", "sourceMap", "interface"]) {
    const relativePath = receipt.entry?.[field];
    const expectedHash = receipt.entry?.sha256?.[field];
    if (typeof relativePath !== "string" || typeof expectedHash !== "string") fail(`${entry.name} artifact receipt is missing entry.${field}`);
    const body = await readFile(join(receiptRoot, relativePath));
    if (sha256(body) !== expectedHash) fail(`${entry.name} artifact ${field} hash does not match its receipt`);
  }
  const sourceReceipt = receipt.sources?.find((source) => source.path === velar.entry);
  if (!sourceReceipt || sha256(await readFile(join(packageRoot, velar.entry))) !== sourceReceipt.sha256) {
    fail(`${entry.name} artifact receipt is stale for ${velar.entry}`);
  }
}

process.stdout.write(`Validated ${catalog.packages.length} companion package contracts.\n`);
