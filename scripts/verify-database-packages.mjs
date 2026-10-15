#!/usr/bin/env node
import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {createHash} from "node:crypto";
import {mkdir, mkdtemp, readFile, rm, symlink, writeFile} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const packages = ["database", "sql", "sqlite"];
const temporary = await mkdtemp(join(tmpdir(), "velar-database-packages-"));
async function run(command, args, cwd) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, args, {cwd, stdio: ["ignore", "pipe", "pipe"]});
    let output = "";
    child.stdout.on("data", (chunk) => { output += chunk; });
    child.stderr.on("data", (chunk) => { output += chunk; });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolveRun(output) : reject(new Error(`${command} ${args.join(" ")} failed (${code})\n${output}`)));
  });
}
try {
  const packs = join(temporary, "packs"), consumer = join(temporary, "consumer");
  await mkdir(packs); await mkdir(consumer);
  const dependencies = {};
  for (const name of packages) {
    const packed = JSON.parse(await run("npm", ["pack", "--ignore-scripts", "--workspace", `@velarscript-labs/${name}`, "--pack-destination", packs, "--json"], root));
    const entries = Array.isArray(packed) ? packed : Object.values(packed);
    assert.equal(entries.length, 1);
    const artifact = entries[0], path = join(packs, artifact.filename);
    assert.equal(`sha512-${createHash("sha512").update(await readFile(path)).digest("base64")}`, artifact.integrity);
    dependencies[`@velarscript-labs/${name}`] = `file:${path}`;
  }
  const candidate = process.env.VELAR_CANDIDATE_ROOT;
  if (!candidate) {
    const manifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
    const toolchainVersion = manifest.devDependencies["@velarscript/cli"];
    dependencies["@velarscript/cli"] = toolchainVersion;
    dependencies["@velarscript/node"] = toolchainVersion;
  }
  await writeFile(join(consumer, "package.json"), JSON.stringify({name: "velar-database-packed-consumer", private: true, type: "module", dependencies}, null, 2));
  await run("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund"], consumer);
  if (candidate) {
    await mkdir(join(consumer, "node_modules/@velarscript"), {recursive: true});
    await mkdir(join(consumer, "node_modules/.bin"), {recursive: true});
    for (const name of ["cli", "compiler", "core", "node"]) await symlink(join(resolve(candidate), "packages", name), join(consumer, "node_modules/@velarscript", name), "dir");
    await symlink(join(resolve(candidate), "packages/cli/dist/cli.js"), join(consumer, "node_modules/.bin/velar"));
  }
  for (const name of packages) {
    const installed = join(consumer, "node_modules/@velarscript-labs", name);
    const manifest = JSON.parse(await readFile(join(installed, "package.json"), "utf8"));
    // Authenticate frozen artifacts independently of the producer's source grammar.
    await writeFile(join(installed, manifest.velar.entry), "obsolete source cannot be parsed by this compiler\n");
    const original = await readFile(join(root, "packages", name, "tests", `${name}.test.vel`), "utf8");
    await writeFile(join(consumer, `${name}.test.vel`), original.replaceAll('"../src/index.vel"', JSON.stringify(`@velarscript-labs/${name}`)));
  }
  await writeFile(join(consumer, "velar.json"), JSON.stringify({formatVersion: 2, kind: "library", entry: "main.vel", extensions: ["@velarscript/node"], surfaces: {core: "0.10", node: "0.17"}}, null, 2));
  await writeFile(join(consumer, "main.vel"), "const ready = true\n");
  await writeFile(join(consumer, "runtime-validator.test.vel"), `import {DatabaseParameterStyle, trustedSql} from "@velarscript-labs/database"

extern js\`
    export function corrupt(value) { value.statement = {}; return null; }
\`:
    export def corrupt(value: unknown) -> null

let current = true ? {statement: trustedSql("SELECT 1")} : null

def read() -> string:
    if current == null: return "none"
    return current.statement.render(DatabaseParameterStyle.questionMark).text

test "frozen private implementation types retain structural narrowing validation":
    assert read() == "SELECT 1" else "Published value changed"
    corrupt(current)
    let rejected = false
    try:
        read()
    catch error:
        rejected = error is NarrowingError
    assert rejected else "Private class validator did not reject a forged implementation"
`);
  const cli = join(consumer, "node_modules/.bin/velar");
  process.stdout.write(await run(cli, ["check"], consumer));
  process.stdout.write(await run(cli, ["test"], consumer));
  console.log("Authenticated database/sql/sqlite tarballs passed their tests and private Runtime Type mutation check with unreadable source grammar.");
} finally {
  await rm(temporary, {recursive: true, force: true});
}
