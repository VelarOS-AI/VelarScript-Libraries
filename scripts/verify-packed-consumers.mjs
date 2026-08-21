#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const velarExecutable = process.platform === "win32" ? "velar.cmd" : "velar";

function run(command, args, cwd, options = {}) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { cwd, stdio: options.stdio ?? ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk) => { stdout += chunk.toString("utf8"); });
    child.stderr?.on("data", (chunk) => { stderr += chunk.toString("utf8"); });
    child.once("error", rejectRun);
    child.once("exit", (code) => {
      if (code !== 0) rejectRun(new Error(`${command} ${args.join(" ")} failed (${String(code)})\n${stdout}\n${stderr}`));
      else resolveRun({ stdout, stderr });
    });
  });
}

function frame(message) {
  const body = Buffer.from(JSON.stringify(message), "utf8");
  return Buffer.concat([Buffer.from(`Content-Length: ${body.byteLength}\r\n\r\n`, "ascii"), body]);
}

function lspReader(stream) {
  let buffer = Buffer.alloc(0);
  const pending = [];
  const messages = [];
  const settle = () => {
    while (pending.length > 0 && messages.length > 0) pending.shift().resolve(messages.shift());
  };
  stream.on("data", (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
    while (true) {
      const marker = buffer.indexOf("\r\n\r\n");
      if (marker < 0) break;
      const header = buffer.subarray(0, marker).toString("ascii");
      const match = /^Content-Length:\s*(\d+)$/imu.exec(header);
      if (!match) throw new Error(`Invalid LSP header: ${header}`);
      const length = Number(match[1]);
      if (buffer.byteLength < marker + 4 + length) break;
      messages.push(JSON.parse(buffer.subarray(marker + 4, marker + 4 + length).toString("utf8")));
      buffer = buffer.subarray(marker + 4 + length);
    }
    settle();
  });
  return () => new Promise((resolveMessage, rejectMessage) => {
    const timeout = setTimeout(() => rejectMessage(new Error("Timed out waiting for the installed LSP server")), 10_000);
    pending.push({
      resolve: (value) => { clearTimeout(timeout); resolveMessage(value); },
    });
    settle();
  });
}

async function verifyInstalledLsp(consumer, cli, assertCompatible) {
  const child = spawn(cli, ["lsp"], { cwd: consumer, stdio: ["pipe", "pipe", "pipe"] });
  let stderr = "";
  child.stderr.on("data", (chunk) => { stderr += chunk.toString("utf8"); });
  const nextMessage = lspReader(child.stdout);
  try {
    child.stdin.write(frame({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: { processId: null, rootUri: pathToFileURL(consumer).href, capabilities: {} },
    }));
    const initialized = await nextMessage();
    assert.equal(initialized.id, 1);
    assertCompatible(initialized.result);
    child.stdin.write(frame({ jsonrpc: "2.0", id: 2, method: "shutdown", params: null }));
    const shutdown = await nextMessage();
    assert.equal(shutdown.id, 2);
    child.stdin.write(frame({ jsonrpc: "2.0", method: "exit", params: null }));
    child.stdin.end();
    const code = await new Promise((resolveExit, rejectExit) => {
      const timeout = setTimeout(() => rejectExit(new Error("Installed LSP server did not exit")), 10_000);
      child.once("exit", (value) => { clearTimeout(timeout); resolveExit(value); });
      child.once("error", rejectExit);
    });
    assert.equal(code, 0, stderr);
  } finally {
    if (child.exitCode === null) child.kill();
  }
}

const catalog = JSON.parse(await readFile(join(root, "catalog.json"), "utf8"));
const temporary = await mkdtemp(join(tmpdir(), "velarscript-libraries-packed-"));
try {
  const packs = join(temporary, "packs");
  const consumer = join(temporary, "consumer");
  await mkdir(packs, { recursive: true });
  await mkdir(consumer, { recursive: true });
  const velarVersion = process.env.VELAR_CLI_VERSION ?? "0.12.1";
  const dependencies = { "@velarscript/cli": velarVersion };
  const artifacts = [];

  for (const entry of catalog.packages) {
    const result = await run(npmCommand, ["pack", "--ignore-scripts", "--workspace", entry.name, "--pack-destination", packs, "--json"], root);
    const values = JSON.parse(result.stdout);
    assert.equal(values.length, 1, `npm pack returned an unexpected result for ${entry.name}`);
    const artifact = values[0];
    const path = join(packs, artifact.filename);
    const body = await readFile(path);
    assert.equal(basename(path), artifact.filename);
    assert.equal(createHash("sha512").update(body).digest("base64"), artifact.integrity.replace(/^sha512-/u, ""));
    const files = new Set(artifact.files.map((file) => file.path));
    for (const required of ["package.json", "README.md", "CHANGELOG.md", "LICENSE"]) assert.ok(files.has(required), `${entry.name} omitted ${required}`);
    if (entry.kind === "tooling") {
      assert.ok(files.has("dist/index.js") && files.has("dist/index.d.ts"), `${entry.name} omitted its compiled root export`);
    } else {
      const manifest = JSON.parse(await readFile(join(root, entry.path, "package.json"), "utf8"));
      assert.ok(files.has(manifest.velar.entry), `${entry.name} omitted velar.entry`);
    }
    dependencies[entry.name] = `file:${path}`;
    artifacts.push(`${entry.name}@${artifact.version}`);
  }

  await writeFile(join(consumer, "package.json"), `${JSON.stringify({
    name: "velarscript-libraries-packed-consumer",
    private: true,
    type: "module",
    dependencies,
  }, null, 2)}\n`, "utf8");
  await run(npmCommand, ["install", "--ignore-scripts", "--no-audit", "--no-fund"], consumer);
  await writeFile(join(consumer, "velar.json"), `${JSON.stringify({
    formatVersion: 2,
    entry: "main.vel",
    extensions: [],
  }, null, 2)}\n`, "utf8");
  await writeFile(join(consumer, "main.vel"), `
import {deflate, inflate} from "@velarscript/compression"
import {encode, parse} from "@velarscript/msgpack"
import {simplex2} from "@velarscript/noise"
import {TextBuffer} from "@velarscript/text-buffer"

type PackedUser:
    id: string
    name: string

const buffer = TextBuffer("A😀\\nB")
buffer.insert(buffer.size, "!")
const wire = deflate(encode({id: "u-1", name: "Ada"}))
const user = parse(inflate(wire), PackedUser)
const field = simplex2("packed-consumer")
print(f"{buffer.size}:{buffer.lineText(1)}:{user.name}:{field(0, 0)}")
`.trimStart(), "utf8");

  const cli = join(consumer, "node_modules", ".bin", velarExecutable);
  await run(cli, ["build", "main.vel", "--out-dir", "dist"], consumer);
  const execution = await run(process.execPath, [join(consumer, "dist", "main.js")], consumer);
  assert.equal(execution.stdout, "5:B!:Ada:0\n");

  const editorKit = await import(pathToFileURL(join(consumer, "node_modules", "@velarscript", "editor-kit", "dist", "index.js")).href);
  assert.equal(editorKit.VelarLanguageService.command, "velar");
  await verifyInstalledLsp(consumer, cli, editorKit.assertVelarProtocolCompatible);

  process.stdout.write(`Verified packed consumers with @velarscript/cli@${velarVersion}: ${artifacts.join(", ")}.\n`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
