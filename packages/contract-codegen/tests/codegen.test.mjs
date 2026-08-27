import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import {
  DriftError,
  MappingError,
  ManifestError,
  NameRegistry,
  REFERENCE_ZOD_VERSION,
  SUPPORTED_ZOD_MAJOR,
  ZodVersionError,
  assertSupportedZod,
  enumMemberName,
  isVelarIdentifier,
  lowerModule,
  optional,
  parseManifest,
  renderType,
  resolveZod,
  run,
} from "../dist/index.js";
import { FIXTURES, PACKAGE_ROOT, copyFixtures } from "./support/equivalence.mjs";

const MANIFEST = join(FIXTURES, "manifest.json");
const GENERATED = join(FIXTURES, "vel", "generated");
const FIXTURE_DEGRADES = JSON.parse(readFileSync(MANIFEST, "utf8")).modules[0].unknownDegrade;

async function lowerFixture(moduleFile, options = {}) {
  const module = await import(join(FIXTURES, "contracts", moduleFile));
  const names = options.exports ?? Object.keys(module).filter((name) => module[name]?._def).sort();
  const exports = names.map((name) => ({ name, schema: module[name] }));
  const degrades = options.degrades ?? (moduleFile === "contracts.mjs" ? FIXTURE_DEGRADES : []);
  return lowerModule(
    exports,
    { stripSuffix: "Schema", prefix: options.prefix ?? "", degrades },
    moduleFile,
  );
}

test("the manifest refuses everything it cannot act on", () => {
  assert.throws(() => parseManifest({ formatVersion: 2 }), ManifestError);
  assert.throws(() => parseManifest({ formatVersion: 1, outputDirectory: "out" }), /modules/u);
  assert.throws(
    () => parseManifest({ formatVersion: 1, outputDirectory: "/etc", modules: [{ specifier: "x", output: "a.vel" }] }),
    /relative path/u,
  );
  assert.throws(
    () => parseManifest({ formatVersion: 1, outputDirectory: "out", modules: [{ specifier: "x", output: "a.js" }] }),
    /\.vel file/u,
  );
  assert.throws(
    () =>
      parseManifest({
        formatVersion: 1,
        outputDirectory: "out",
        modules: [
          { specifier: "x", output: "a.vel" },
          { specifier: "y", output: "a.vel" },
        ],
      }),
    /duplicate output/u,
  );
  assert.throws(
    () =>
      parseManifest({
        formatVersion: 1,
        outputDirectory: "out",
        modules: [{ specifier: "x", output: "a.vel", unknownDegrade: [{ path: "A" }] }],
      }),
    /reason/u,
  );
  assert.throws(
    () =>
      parseManifest({
        formatVersion: 1,
        outputDirectory: "out",
        modules: [{ specifier: "x", output: "a.vel" }],
        channelTables: [{ output: "c.vel", enumName: "C", typesOutput: "missing.vel", channels: [] }],
      }),
    /generated module output/u,
  );
  assert.throws(
    () =>
      parseManifest({
        formatVersion: 1,
        outputDirectory: "out",
        modules: [{ specifier: "x", output: "a.vel" }],
        channelTables: [
          { output: "c.vel", enumName: "C", typesOutput: "a.vel", channels: [{ name: "n" }] },
        ],
      }),
    /at least one of request, response, or event/u,
  );
});

test("the manifest fills in its documented defaults", () => {
  const manifest = parseManifest({
    formatVersion: 1,
    outputDirectory: "generated",
    modules: [{ specifier: "@scope/pkg/protocol", output: "protocol.vel" }],
  });
  assert.equal(manifest.resolveFrom, ".");
  assert.equal(manifest.naming.stripSuffix, "Schema");
  assert.equal(manifest.naming.prefix, "");
  assert.equal(manifest.velarFormat, true);
  assert.equal(manifest.velarCommand, "velar");
  assert.equal(manifest.modules[0].exports, "all");
  assert.deepEqual(manifest.modules[0].unknownDegrade, []);
});

test("the supported zod major is stated and a mismatch names both versions", () => {
  assert.equal(SUPPORTED_ZOD_MAJOR, 4);
  assert.equal(REFERENCE_ZOD_VERSION, "4.4.3");
  const resolved = resolveZod(join(FIXTURES, "contracts"));
  assert.equal(resolved.major, SUPPORTED_ZOD_MAJOR);
  assert.doesNotThrow(() => assertSupportedZod(resolved));
  assert.throws(
    () => assertSupportedZod({ version: "3.24.1", major: 3, path: "/somewhere/zod/package.json" }),
    (error) =>
      error instanceof ZodVersionError
      && /zod 4\.x/u.test(error.message)
      && /4\.4\.3/u.test(error.message)
      && /zod 3\.24\.1/u.test(error.message),
  );
});

test("names avoid VelarScript keywords and the enum's reserved surface", () => {
  assert.equal(enumMemberName("session:start"), "sessionStart");
  assert.equal(enumMemberName("type"), "typeValue");
  assert.equal(enumMemberName("parse"), "parseValue");
  assert.equal(enumMemberName("values"), "valuesValue");
  assert.equal(enumMemberName("pass"), "passValue");
  assert.equal(enumMemberName("1st"), "value1st");
  assert.equal(enumMemberName("---"), null);
  assert.ok(isVelarIdentifier("toolCall"));
  assert.ok(!isVelarIdentifier("tool-call"));
  const registry = new NameRegistry();
  assert.equal(registry.claim("Event"), "Event");
  assert.equal(registry.claim("Event"), "Event2");
  assert.equal(registry.claim("Event"), "Event3");
  assert.deepEqual(registry.collisions.map((entry) => entry.name), ["Event2", "Event3"]);
});

test("`T?` is the one canonical nullability shape", () => {
  const string = { kind: "primitive", name: "string" };
  const number = { kind: "primitive", name: "number" };
  assert.equal(renderType(optional(string)), "string?");
  assert.equal(renderType(optional(optional(string))), "string?");
  assert.equal(renderType(optional({ kind: "union", options: [string, number] })), "(string | number)?");
  assert.equal(renderType(optional({ kind: "primitive", name: "unknown" })), "unknown");
  assert.equal(renderType({ kind: "list", element: optional(string) }), "List<string?>");
  assert.equal(renderType({ kind: "map", value: string }), "Record<string>");
  assert.equal(renderType({ kind: "enumMember", enumName: "Tag", member: "toolCall" }), "Tag.toolCall");
});

test("every row of the closed mapping table lowers to its declared VelarScript shape", async () => {
  const result = await lowerFixture("contracts.mjs");
  const byName = new Map(result.declarations.map((declaration) => [declaration.name, declaration]));

  const primitives = byName.get("Primitives");
  assert.deepEqual(
    primitives.fields.map((field) => `${field.name}: ${renderType(field.type)}`),
    ["name: string", "count: number", "enabled: bool", "nothing: null"],
  );
  assert.equal(renderType(byName.get("UndefinedField").fields[1].type), "null");

  assert.deepEqual(
    byName.get("Optionality").fields.map((field) => `${field.name}: ${renderType(field.type)}`),
    ["required: string", "optional: string?", "nullable: string?", "nullish: string?"],
  );

  assert.deepEqual(
    byName.get("HookEvent").members.map((member) => [member.name, member.wire]),
    [
      ["sessionStart", "session:start"],
      ["turnContextAssemble", "turn-context:assemble"],
      ["subAgentDispatch", "sub-agent:dispatch"],
      ["promptCompose", "prompt:compose"],
    ],
  );
  assert.deepEqual(byName.get("Kind").members, [{ name: "velarosMod", wire: "velaros-mod" }]);
  assert.equal(byName.get("TrustLevel").members.length, 3);

  assert.deepEqual(
    byName.get("Collections").fields.map((field) => renderType(field.type)),
    ["List<string>", "Record<string>", "Record<unknown>", "unknown"],
  );
  assert.deepEqual(
    byName.get("Unions").fields.map((field) => renderType(field.type)),
    ["string | number", "(string | number)?", "string | List<string>"],
  );

  assert.equal(renderType(byName.get("Article").fields[1].type), "Author");
  assert.equal(renderType(byName.get("Article").fields[2].type), "List<Author>");
  assert.equal(renderType(byName.get("Article").fields[3].type), "ArticleNested");
  assert.equal(byName.get("MaybeAuthor").kind, "alias");
  assert.equal(renderType(byName.get("MaybeAuthor").type), "Author?");

  // A discriminated union becomes a tag enum, one record per case, and an alias.
  assert.equal(renderType(byName.get("StreamEvent").type), "StreamReasoning | StreamToolCall | StreamEventEnd | StreamEventError");
  assert.deepEqual(
    byName.get("StreamEventTag").members.map((member) => [member.name, member.wire]),
    [["reasoning", null], ["toolCall", "tool-call"], ["end", null], ["error", null]],
  );
  assert.equal(renderType(byName.get("StreamReasoning").fields[0].type), "StreamEventTag.reasoning");
  assert.equal(renderType(byName.get("StreamToolCall").fields[0].type), "StreamEventTag.toolCall");
  assert.equal(renderType(byName.get("StreamEventEnd").fields[0].type), "StreamEventTag.end");

  // The manifest exemption keeps the export and opens exactly one field.
  assert.deepEqual(
    byName.get("Degraded").fields.map((field) => `${field.name}: ${renderType(field.type)}`),
    ["protocolVersion: unknown", "payload: string"],
  );
  assert.deepEqual(result.degrades.map((degrade) => degrade.path), ["DegradedSchema.protocolVersion"]);
});

test("a shape outside the table is refused with its schema path and reason", async () => {
  const cases = [
    ["NonStrictSchema", /strips unknown keys/u],
    ["LooseSchema", /catchall object/u],
    ["TransformedSchema", /transform and effect schemas/u],
    ["DefaultedSchema", /default value changes the parsed result/u],
    ["CaughtSchema", /catch fallback/u],
    ["NumericLiteralSchema", /no numeric or boolean singleton type/u],
    ["DatedSchema", /host Date instance/u],
    ["UndiscriminatedSchema", /without a discriminator/u],
    ["EmptySchema", /zero-field record/u],
    ["RecursiveSchema", /self-referential/u],
    ["NumericKeySchema", /plain string keys/u],
    ["OddFieldSchema", /not a VelarScript identifier/u],
    ["AnySchema", /z\.any\(\) opts out/u],
    ["TupleSchema", /closed type-mapping table/u],
    ["IntersectionSchema", /closed type-mapping table/u],
  ];
  for (const [name, reason] of cases) {
    await assert.rejects(
      async () => lowerFixture("refused.mjs", { exports: [name] }),
      (error) => {
        assert.ok(error instanceof MappingError, `${name} produced ${error}`);
        assert.match(error.message, reason, name);
        assert.ok(error.shapes.every((shape) => shape.path.startsWith(name)), `${name}: ${JSON.stringify(error.shapes)}`);
        return true;
      },
      name,
    );
  }
});

test("a per-path degrade is honoured, reported, and reported again when it goes stale", async () => {
  const degraded = await lowerFixture("refused.mjs", {
    exports: ["TransformedSchema"],
    degrades: [
      { path: "TransformedSchema.id", reason: "the shell reads the untrimmed wire value" },
      { path: "TransformedSchema.gone", reason: "left over from an older contract" },
    ],
  });
  const record = degraded.declarations.find((declaration) => declaration.name === "Transformed");
  assert.equal(renderType(record.fields[0].type), "unknown");
  assert.deepEqual(degraded.degrades, [
    { path: "TransformedSchema.id", reason: "the shell reads the untrimmed wire value", zodType: "pipe" },
  ]);
  assert.deepEqual(degraded.unusedDegrades, ["TransformedSchema.gone"]);
});

test("boundary widenings are counted rather than left silent", async () => {
  const result = await lowerFixture("contracts.mjs");
  const byKind = new Map(result.boundaryNotes.map((note) => [note.kind, note]));
  assert.ok(byKind.get("strict-unknown-keys").count >= 10);
  assert.ok(byKind.get("optional-accepts-null").count >= 3);
  assert.ok(byKind.get("nullable-accepts-absent").count >= 3);
  assert.equal(byKind.get("undefined-normalized-to-null").count, 1);
  for (const note of result.boundaryNotes) assert.ok(note.detail.length > 40, note.kind);
  assert.deepEqual(
    result.constraints.map((constraint) => `${constraint.path}:${constraint.checks.join(",")}`),
    ["AuthorSchema.displayName:min_length"],
  );
});

test("a name prefix applies to every declaration", async () => {
  const result = await lowerFixture("contracts.mjs", { prefix: "Wire", exports: ["ArticleSchema"] });
  // Only `ArticleSchema` is exported here, so every nested shape is named from
  // the path that reaches it rather than from an export.
  const names = result.declarations.map((declaration) => declaration.name).sort();
  assert.deepEqual(names, ["WireArticle", "WireArticleAuthor", "WireArticleNested"]);
  const article = result.declarations.find((entry) => entry.name === "WireArticle");
  assert.equal(renderType(article.fields[1].type), "WireArticleAuthor");
  assert.equal(renderType(article.fields[2].type), "List<WireArticleAuthor>");
});

test("generate is byte-stable and --check reports drift instead of writing", async () => {
  const first = readFileSync(join(GENERATED, "contracts.vel"), "utf8");
  const report = await run({ manifestPath: MANIFEST, mode: "generate", toolVersion: "0.1.0" });
  assert.ok(report.ok);
  assert.deepEqual(report.files.map((file) => file.status), ["unchanged", "unchanged"]);
  assert.equal(readFileSync(join(GENERATED, "contracts.vel"), "utf8"), first);

  const checked = await run({ manifestPath: MANIFEST, mode: "check", toolVersion: "0.1.0" });
  assert.ok(checked.ok);
  assert.equal(checked.mode, "check");
  assert.equal(checked.modules[0].exportedSchemas, 17);
  assert.match(checked.modules[0].schemaDigest, /^sha256-[0-9a-f]{64}$/u);
  assert.equal(checked.channelTables[0].channels, 3);
  assert.equal(checked.channelTables[0].bindings, 4);

  const temporary = copyFixtures("drift");
  try {
    const driftedFile = join(temporary, "vel", "generated", "contracts.vel");
    writeFileSync(driftedFile, `${first}\n// stale\n`, "utf8");
    await assert.rejects(
      () => run({ manifestPath: join(temporary, "manifest.json"), mode: "check", toolVersion: "0.1.0" }),
      (error) => {
        assert.ok(error instanceof DriftError);
        assert.deepEqual(error.files, [{ output: "contracts.vel", status: "drift" }]);
        return true;
      },
    );
    // --check never writes.
    assert.equal(readFileSync(driftedFile, "utf8"), `${first}\n// stale\n`);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test("the generated header records the tool, the source, and the schema digest", () => {
  const lines = readFileSync(join(GENERATED, "contracts.vel"), "utf8").split("\n");
  assert.match(lines[0], /^\/\/ Generated by @velarscript-labs\/contract-codegen \d+\.\d+\.\d+\. Do not edit\.$/u);
  assert.match(lines[1], /^\/\/ Source: /u);
  assert.match(lines[2], /^\/\/ Schema digest: sha256-[0-9a-f]{64}$/u);
  assert.match(lines[3], /^\/\/ Regenerate: velar-contract-codegen generate /u);
});

test("the digest moves when the source schema moves and not when naming does", async () => {
  // Two copies, because a module already imported in this process keeps its
  // first-loaded shape: the generator is a one-shot CLI, not a watcher.
  const unchanged = copyFixtures("digest-a");
  const edited = copyFixtures("digest-b");
  try {
    const baseline = await run({ manifestPath: join(unchanged, "manifest.json"), mode: "generate", toolVersion: "0.1.0" });

    const renamedManifest = join(unchanged, "renamed.json");
    const manifest = JSON.parse(readFileSync(join(unchanged, "manifest.json"), "utf8"));
    manifest.naming.prefix = "Wire";
    manifest.channelTables = [];
    manifest.outputDirectory = "./vel/renamed";
    writeFileSync(renamedManifest, JSON.stringify(manifest, null, 2), "utf8");
    const renamed = await run({ manifestPath: renamedManifest, mode: "generate", toolVersion: "0.1.0" });
    assert.equal(renamed.modules[0].schemaDigest, baseline.modules[0].schemaDigest);

    const contracts = join(edited, "contracts", "contracts.mjs");
    writeFileSync(
      contracts,
      `${readFileSync(contracts, "utf8")}\nexport const AddedSchema = z.strictObject({ added: z.string() });\n`,
      "utf8",
    );
    const changed = await run({ manifestPath: join(edited, "manifest.json"), mode: "generate", toolVersion: "0.1.0" });
    assert.equal(changed.modules[0].exportedSchemas, baseline.modules[0].exportedSchemas + 1);
    assert.notEqual(changed.modules[0].schemaDigest, baseline.modules[0].schemaDigest);
  } finally {
    rmSync(unchanged, { recursive: true, force: true });
    rmSync(edited, { recursive: true, force: true });
  }
});

test("the CLI exits 0 on a clean check and 1 on drift", () => {
  const cli = join(PACKAGE_ROOT, "dist", "cli.js");
  const clean = execFileSync(process.execPath, [cli, "generate", MANIFEST, "--check", "--json"], { encoding: "utf8" });
  const report = JSON.parse(clean);
  assert.equal(report.ok, true);
  assert.equal(report.mode, "check");

  const temporary = copyFixtures("cli");
  try {
    rmSync(join(temporary, "vel", "generated", "channels.vel"));
    const result = execFileSync(
      process.execPath,
      [cli, "generate", join(temporary, "manifest.json"), "--check"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
    assert.fail(`expected a non-zero exit, got:\n${result}`);
  } catch (error) {
    assert.equal(error.status, 1);
    assert.match(String(error.stdout), /missing {3}channels\.vel/u);
    assert.match(String(error.stderr), /out of date/u);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
