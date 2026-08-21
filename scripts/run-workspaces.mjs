#!/usr/bin/env node

import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const [script, ...extra] = process.argv.slice(2);
if (!script || extra.length > 0) throw new Error("Usage: run-workspaces.mjs <script>");

const catalog = JSON.parse(await readFile(join(root, "catalog.json"), "utf8"));

function run(args) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(npmCommand, args, { cwd: root, stdio: "inherit" });
    child.once("error", rejectRun);
    child.once("exit", (code) => {
      if (code === 0) resolveRun();
      else rejectRun(new Error(`${npmCommand} ${args.join(" ")} failed (${String(code)})`));
    });
  });
}

for (const entry of catalog.packages) {
  const manifest = JSON.parse(await readFile(join(root, entry.path, "package.json"), "utf8"));
  if (typeof manifest.scripts?.[script] !== "string") continue;
  await run(["run", script, "--workspace", entry.name]);
}
