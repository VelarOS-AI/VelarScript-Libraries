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
  const velarVersion = process.env.VELAR_CLI_VERSION ?? "0.18.0";
  const velarPackage = process.env.VELAR_CLI_PACKAGE;
  const verifyFrozenArtifacts = process.env.VELAR_VERIFY_FROZEN_ARTIFACTS !== "false";
  const dependencies = { "@velarscript/cli": velarPackage ? `file:${resolve(velarPackage)}` : velarVersion };
  const artifacts = [];

  for (const entry of catalog.packages) {
    const result = await run(npmCommand, ["pack", "--ignore-scripts", "--workspace", entry.name, "--pack-destination", packs, "--json"], root);
    const output = JSON.parse(result.stdout);
    // npm 11 在配合 --workspace 使用时，把 JSON 结果从数组改成了按包名
    // 索引的对象；旧版本仍返回数组。这里只统一结果的外层形状，包描述本身
    // 仍由后面的完整性与文件清单检查负责验证。
    const values = Array.isArray(output) ? output : Object.values(output);
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
      for (const required of ["dist/index.js", "dist/index.js.map", "dist/index.veli.json", "dist/velar-library.json"]) {
        assert.ok(files.has(required), `${entry.name} omitted frozen artifact file ${required}`);
      }
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

  if (verifyFrozenArtifacts) {
    // The installed source remains readable, but a frozen-ABI consumer must
    // compile independently from its grammar. Older compatible toolchains
    // intentionally exercise the source fallback instead.
    for (const entry of catalog.packages.filter((item) => item.kind !== "tooling")) {
      const installedRoot = join(consumer, "node_modules", ...entry.name.split("/"));
      const manifestPath = join(installedRoot, "package.json");
      const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
      manifest.velar.requires.language = "0.1";
      await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
      await writeFile(join(installedRoot, manifest.velar.entry), "export def obsolete():\n    with previous_runtime() as value:\n        return value\n", "utf8");
    }
  }
  await writeFile(join(consumer, "velar.json"), `${JSON.stringify({
    formatVersion: 2,
    entry: "main.vel",
    extensions: [],
  }, null, 2)}\n`, "utf8");
  await writeFile(join(consumer, "main.vel"), `
import {deflate, inflate} from "@velarscript-labs/compression"
import {encode, parse} from "@velarscript-labs/msgpack"
import {simplex2} from "@velarscript-labs/noise"
import {selectQuery, sqlColumnEqual, sqlNamedField, sqlTable} from "@velarscript-labs/sql"
import {TextBuffer} from "@velarscript-labs/text-buffer"
import {parseYaml} from "@velarscript-labs/yaml"

type PackedUser:
    id: string
    name: string

type PackedConfiguration:
    port: number

const buffer = TextBuffer("A😀\\nB")
buffer.insert(buffer.size, "!")
const wire = deflate(encode({id: "u-1", name: "Ada"}))
const user = parse(inflate(wire), PackedUser)
const field = simplex2("packed-consumer")
const configuration = PackedConfiguration.parse(parseYaml("port: 3000"))
const packedUserQuery = selectQuery(
    sqlTable("users"),
    [sqlNamedField("id"), sqlNamedField("name")],
    PackedUser,
    where=sqlColumnEqual("id", "u-1"),
    maximumRows=1,
)
print(f"{buffer.size}:{buffer.lineText(1)}:{user.name}:{field(0, 0)}:{configuration.port}:{packedUserQuery.maximumRows}")
`.trimStart(), "utf8");

  const cli = join(consumer, "node_modules", ".bin", velarExecutable);
  await run(cli, ["build", "main.vel", "--out-dir", "dist"], consumer);
  const execution = await run(process.execPath, [join(consumer, "dist", "main.js")], consumer);
  assert.equal(execution.stdout, "5:B!:Ada:0:3000:1\n");

  const nodeConsumer = join(consumer, "node-consumer");
  await mkdir(join(nodeConsumer, "tests"), { recursive: true });
  await writeFile(join(nodeConsumer, "velar.json"), `${JSON.stringify({
    formatVersion: 2,
    entry: "tests/sqlite.test.vel",
    extensions: ["@velarscript/node"],
  }, null, 2)}\n`, "utf8");
  await writeFile(join(nodeConsumer, "tests", "sqlite.test.vel"), `
import {execute, requireOne, trustedSql} from "@velarscript-labs/database"
import {insertCommand, selectQuery, sqlColumnEqual, sqlNamedField, sqlTable} from "@velarscript-labs/sql"
import {openSqlite} from "@velarscript-labs/sqlite"

type PackedUser:
    id: string
    name: string

test "packed SQLite and database packages execute together":
    using database = await openSqlite(":memory:")
    await database.execute(trustedSql("CREATE TABLE users (id TEXT PRIMARY KEY, name TEXT NOT NULL)"))
    const users = sqlTable("users")
    const insertUser = insertCommand(
        users,
        ["id", "name"],
        [["u-2", "Lin"]],
        minimumAffected=1,
        maximumAffected=1,
    )
    const findUser = selectQuery(
        users,
        [sqlNamedField("id"), sqlNamedField("name")],
        PackedUser,
        where=sqlColumnEqual("id", "u-2"),
        maximumRows=1,
    )
    await execute(database.executor(), insertUser)
    const stored = await requireOne(database.executor(), findUser)
    assert stored.name == "Lin" else "Packed SQLite result changed"
`.trimStart(), "utf8");
  await run(cli, ["test"], nodeConsumer);

  const editorKit = await import(pathToFileURL(join(consumer, "node_modules", "@velarscript-labs", "editor-kit", "dist", "index.js")).href);
  assert.equal(editorKit.VelarLanguageService.command, "velar");
  await verifyInstalledLsp(consumer, cli, editorKit.assertVelarProtocolCompatible);

  process.stdout.write(`Verified packed consumers with ${velarPackage ? `local @velarscript/cli (${resolve(velarPackage)})` : `@velarscript/cli@${velarVersion}`}: ${artifacts.join(", ")}.\n`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
