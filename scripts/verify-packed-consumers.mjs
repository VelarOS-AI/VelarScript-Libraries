#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
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

const repositoryManifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const currentCompiler = repositoryManifest.devDependencies["@velarscript/cli"];

async function toolchainDependencies(version) {
  const dependencies = {"@velarscript/cli": version};
  const candidate = process.env.VELAR_CANDIDATE_ROOT;
  if (candidate && version === currentCompiler) {
    const packages = join(resolve(candidate), "packages");
    for (const name of await readdir(packages)) {
      const directory = join(packages, name);
      const manifest = JSON.parse(await readFile(join(directory, "package.json"), "utf8"));
      if (!manifest.name.startsWith("@velarscript/") && manifest.name !== "create-velar") continue;
      assert.equal(manifest.version, version, "candidate official packages must match the selected compiler");
      dependencies[manifest.name] = `file:${directory}`;
    }
  }
  return dependencies;
}

async function verifyCompilerGroups(temporary, artifacts, verifyFrozenArtifacts) {
  const groups = new Map();
  for (const artifact of artifacts) {
    if (artifact.entry.kind === "tooling") continue;
    const receipt = JSON.parse(await readFile(join(root, artifact.entry.path, "dist/velar-library.json"), "utf8"));
    const compiler = receipt.compilerVersion;
    assert.match(compiler, /^\d+\.\d+\.\d+$/u);
    const manifest = JSON.parse(await readFile(join(root, artifact.entry.path, "package.json"), "utf8"));
    assert.equal(manifest.devDependencies?.["@velarscript/cli"] ?? currentCompiler, compiler,
      `${artifact.entry.name}: package validation CLI must match its frozen receipt`);
    if (!groups.has(compiler)) groups.set(compiler, []);
    groups.get(compiler).push(artifact);
  }
  for (const [compiler, group] of groups) {
    const consumer = join(temporary, `consumer-${compiler}`);
    await mkdir(join(consumer, "tests"), {recursive: true});
    const dependencies = await toolchainDependencies(compiler);
    for (const artifact of group) dependencies[artifact.entry.name] = `file:${artifact.path}`;
    await writeFile(join(consumer, "package.json"), JSON.stringify({private: true, type: "module", dependencies}, null, 2));
    await run(npmCommand, ["install", "--ignore-scripts", "--install-links", "--no-audit", "--no-fund"], consumer);
    const configuration = {formatVersion: 2, entry: "main.vel", extensions: []};
    for (const artifact of group) {
      const producer = join(root, artifact.entry.path);
      const config = JSON.parse(await readFile(join(producer, "velar.json"), "utf8"));
      if (config.kind) configuration.kind = config.kind;
      if (config.surfaces) configuration.surfaces = {...configuration.surfaces, ...config.surfaces};
      configuration.extensions = [...new Set([...configuration.extensions, ...config.extensions])];
      const installed = join(consumer, "node_modules", artifact.entry.name);
      const manifest = JSON.parse(await readFile(join(installed, "package.json"), "utf8"));
      if (verifyFrozenArtifacts) await writeFile(join(installed, manifest.velar.entry), "obsolete source cannot be parsed by this compiler\n");
      const tests = (await readdir(join(producer, "tests"), {recursive: true})).filter((name) => name.endsWith(".test.vel"));
      assert.ok(tests.length > 0, `${artifact.entry.name} must exercise its packed API`);
      for (const name of tests) {
        const source = await readFile(join(producer, "tests", name), "utf8");
        const target = join(consumer, "tests", artifact.entry.name.split("/").at(-1), name);
        await mkdir(resolve(target, ".."), {recursive: true});
        await writeFile(target, source.replaceAll('"../src/index.vel"', JSON.stringify(artifact.entry.name)));
      }
    }
    await writeFile(join(consumer, "velar.json"), JSON.stringify(configuration, null, 2));
    await writeFile(join(consumer, "main.vel"), "const ready = true\n");
    const cli = join(consumer, "node_modules", ".bin", velarExecutable);
    process.stdout.write((await run(cli, ["test"], consumer)).stdout);
    process.stdout.write(`Verified packed package tests with @velarscript/cli@${compiler}: ${group.map((item) => item.entry.name).join(", ")}\n`);
  }
}

const catalog = JSON.parse(await readFile(join(root, "catalog.json"), "utf8"));
const temporary = await mkdtemp(join(tmpdir(), "velarscript-libraries-packed-"));
try {
  const packs = join(temporary, "packs");
  const consumer = join(temporary, "consumer");
  await mkdir(packs, { recursive: true });
  await mkdir(consumer, { recursive: true });
  const smokeReceipt = JSON.parse(await readFile(join(root, "packages/compression/dist/velar-library.json"), "utf8"));
  const velarVersion = process.env.VELAR_CLI_VERSION ?? smokeReceipt.compilerVersion;
  const velarPackage = process.env.VELAR_CLI_PACKAGE;
  const verifyFrozenArtifacts = process.env.VELAR_VERIFY_FROZEN_ARTIFACTS !== "false";
  const dependencies = await toolchainDependencies(velarVersion);
  if (velarPackage) dependencies["@velarscript/cli"] = `file:${resolve(velarPackage)}`;
  const artifacts = [];
  const packedPackages = [];

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
    packedPackages.push({entry, path});
  }

  await verifyCompilerGroups(temporary, packedPackages, verifyFrozenArtifacts);

  await writeFile(join(consumer, "package.json"), `${JSON.stringify({
    name: "velarscript-libraries-packed-consumer",
    private: true,
    type: "module",
    dependencies,
  }, null, 2)}\n`, "utf8");
  await run(npmCommand, ["install", "--ignore-scripts", "--install-links", "--no-audit", "--no-fund"], consumer);

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
print(f"{buffer.size}:{buffer.lineText(1)}:{user.name}:{field(0, 0)}:{configuration.port}")
`.trimStart(), "utf8");

  const cli = join(consumer, "node_modules", ".bin", velarExecutable);
  await run(cli, ["build", "."], consumer);
  const execution = await run(process.execPath, [join(consumer, "dist", "main.js")], consumer);
  assert.equal(execution.stdout, "5:B!:Ada:0:3000\n", "legacy compiler cross-library smoke");
  process.stdout.write(`Verified legacy cross-library smoke with @velarscript/cli@${velarVersion}.\n`);


  const nodeConsumer = join(consumer, "node-consumer");
  await mkdir(join(nodeConsumer, "tests"), { recursive: true });
  await writeFile(join(nodeConsumer, "package.json"), JSON.stringify({
    private: true, type: "module", dependencies: {...dependencies, ...await toolchainDependencies(currentCompiler)},
  }, null, 2));
  await run(npmCommand, ["install", "--ignore-scripts", "--install-links", "--no-audit", "--no-fund"], nodeConsumer);
  const nodeCli = join(nodeConsumer, "node_modules", ".bin", velarExecutable);
  const sqliteConfiguration = JSON.parse(await readFile(join(root, "packages/sqlite/velar.json"), "utf8"));
  await writeFile(join(nodeConsumer, "velar.json"), `${JSON.stringify({
    ...sqliteConfiguration,
    entry: "tests/sqlite.test.vel",
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
  await writeFile(join(nodeConsumer, "sql-query.vel"), `import {selectQuery, sqlColumnEqual, sqlNamedField, sqlTable} from "@velarscript-labs/sql"

type PackedUser:
    id: string
    name: string

const packedUserQuery = selectQuery(
    sqlTable("users"),
    [sqlNamedField("id"), sqlNamedField("name")],
    PackedUser,
    where=sqlColumnEqual("id", "u-1"),
    maximumRows=1,
)
print(packedUserQuery.maximumRows)
`);
  await run(nodeCli, ["build", "sql-query.vel", "--out-dir", "query-dist"], nodeConsumer);
  const queryExecution = await run(process.execPath, [join(nodeConsumer, "query-dist", "sql-query.js")], nodeConsumer);
  assert.equal(queryExecution.stdout, "1\n", "current SQL maximumRows smoke");
  process.stdout.write(`Verified SQL maximumRows smoke with @velarscript/cli@${currentCompiler}.\n`);
  process.stdout.write((await run(nodeCli, ["test"], nodeConsumer)).stdout);

  const editorKit = await import(pathToFileURL(join(consumer, "node_modules", "@velarscript-labs", "editor-kit", "dist", "index.js")).href);
  assert.equal(editorKit.VelarLanguageService.command, "velar");
  await verifyInstalledLsp(nodeConsumer, nodeCli, editorKit.assertVelarProtocolCompatible);

  process.stdout.write(`Verified receipt compiler groups, Core integration with ${velarPackage ? `local @velarscript/cli (${resolve(velarPackage)})` : `@velarscript/cli@${velarVersion}`}, and SQL/SQLite/LSP with @velarscript/cli@${currentCompiler}: ${artifacts.join(", ")}.\n`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
