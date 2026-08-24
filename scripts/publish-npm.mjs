#!/usr/bin/env node

import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const run = promisify(execFile);
const dryRun = process.argv.includes("--dry-run");
const catalog = JSON.parse(await readFile(join(root, "catalog.json"), "utf8"));

async function npm(args) {
  return run(npmCommand, args, { cwd: root, maxBuffer: 10 * 1024 * 1024 });
}

async function registryHasVersion(name, version) {
  const packagePath = encodeURIComponent(name);
  const versionPath = encodeURIComponent(version);
  const response = await fetch(
    `https://registry.npmjs.org/${packagePath}/${versionPath}?fresh=${String(Date.now())}`,
    { headers: { accept: "application/json", "cache-control": "no-cache" } },
  );
  if (response.status === 404) return false;
  if (!response.ok) throw new Error(`Registry lookup failed for ${name}@${version}: ${response.status}`);
  const manifest = await response.json();
  return manifest.name === name && manifest.version === version;
}

const releases = [];
for (const entry of catalog.packages) {
  const manifest = JSON.parse(await readFile(join(root, entry.path, "package.json"), "utf8"));
  if (manifest.private === true) continue;
  if (manifest.name !== entry.name) throw new Error(`Catalog mismatch for ${entry.path}`);
  const dependencies = Object.entries(manifest.dependencies ?? {})
    .filter(([name]) => name.startsWith("@velarscript-labs/"))
    .map(([name, version]) => ({ name, version }));
  releases.push({ name: manifest.name, version: manifest.version, dependencies });
}

const failures = [];
for (const release of releases) {
  const identity = `${release.name}@${release.version}`;
  if (await registryHasVersion(release.name, release.version)) {
    console.log(`skip ${identity}`);
    continue;
  }
  if (dryRun) {
    console.log(`publish ${identity}`);
    continue;
  }

  const missingDependencies = [];
  for (const dependency of release.dependencies) {
    if (!await registryHasVersion(dependency.name, dependency.version)) {
      missingDependencies.push(`${dependency.name}@${dependency.version}`);
    }
  }
  if (missingDependencies.length > 0) {
    const message = `dependencies are not published: ${missingDependencies.join(", ")}`;
    console.error(`blocked ${identity}: ${message}`);
    failures.push(`${identity} (${message})`);
    continue;
  }

  let result;
  try {
    result = await npm([
      "publish",
      "--workspace",
      release.name,
      "--access",
      "public",
      "--provenance",
      "--tag",
      "latest",
      "--ignore-scripts",
    ]);
  } catch (error) {
    if (String(error.stderr).includes("cannot publish over the previously published versions")) {
      console.log(`skip ${identity}`);
      continue;
    }
    process.stdout.write(error.stdout ?? "");
    process.stderr.write(error.stderr ?? "");
    failures.push(identity);
    continue;
  }
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
}

if (failures.length > 0) {
  throw new Error(`npm publication did not complete for: ${failures.join(", ")}`);
}
