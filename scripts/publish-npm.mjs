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

async function registryVersion(identity) {
  try {
    const { stdout } = await npm(["view", identity, "version", "--json", "--prefer-online"]);
    return JSON.parse(stdout);
  } catch (error) {
    if (String(error.stderr).includes("E404")) return null;
    throw error;
  }
}

const releases = [];
for (const entry of catalog.packages) {
  const manifest = JSON.parse(await readFile(join(root, entry.path, "package.json"), "utf8"));
  if (manifest.private === true) continue;
  if (manifest.name !== entry.name) throw new Error(`Catalog mismatch for ${entry.path}`);
  releases.push({ name: manifest.name, version: manifest.version });
}

for (const release of releases) {
  const identity = `${release.name}@${release.version}`;
  if ((await registryVersion(identity)) === release.version) {
    console.log(`skip ${identity}`);
    continue;
  }
  if (dryRun) {
    console.log(`publish ${identity}`);
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
    throw error;
  }
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
}
