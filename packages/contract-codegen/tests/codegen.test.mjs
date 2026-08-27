import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { z } from "zod";

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
  velarSpawnPlan,
} from "../dist/index.js";
import { schemaDigest } from "../dist/digest.js";
import { FIXTURES, PACKAGE_ROOT, copyFixtures, velarExecutable } from "./support/equivalence.mjs";

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

/** Lowers schemas built in the test itself, for shapes no committed fixture holds. */
function lowerInline(exports, degrades = []) {
  return lowerModule(
    Object.entries(exports).map(([name, schema]) => ({ name, schema })),
    { stripSuffix: "Schema", prefix: "", degrades },
    "inline",
  );
}

function fieldsOf(result, name) {
  const declaration = result.declarations.find((entry) => entry.name === name);
  assert.ok(declaration !== undefined, `no declaration named '${name}' in ${result.declarations.map((d) => d.name)}`);
  return declaration.fields.map((field) => `${field.name}: ${renderType(field.type)}`);
}

function refusalOf(build) {
  try {
    build();
  } catch (error) {
    assert.ok(error instanceof MappingError, String(error));
    return error.shapes;
  }
  return assert.fail("expected the closed table to refuse this shape");
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

test("a contract package on another zod major is refused before anything is written", async () => {
  const temporary = mkdtempSync(join(tmpdir(), "contract-codegen-zod3-"));
  try {
    mkdirSync(join(temporary, "contracts", "node_modules", "zod"), { recursive: true });
    mkdirSync(join(temporary, "out"), { recursive: true });
    writeFileSync(
      join(temporary, "contracts", "node_modules", "zod", "package.json"),
      JSON.stringify({ name: "zod", version: "3.24.1", main: "index.js" }),
      "utf8",
    );
    writeFileSync(join(temporary, "contracts", "node_modules", "zod", "index.js"), "module.exports = {};\n", "utf8");
    // A zod 3 schema carries `_def.typeName`, which the walker cannot read.
    writeFileSync(
      join(temporary, "contracts", "contracts.mjs"),
      "export const UserSchema = { _def: { typeName: \"ZodObject\" } };\n",
      "utf8",
    );
    writeFileSync(
      join(temporary, "manifest.json"),
      JSON.stringify({
        formatVersion: 1,
        resolveFrom: "./contracts",
        outputDirectory: "./out",
        velarFormat: false,
        modules: [{ specifier: "./contracts.mjs", output: "user.vel", exports: "all" }],
      }),
      "utf8",
    );
    await assert.rejects(
      () => run({ manifestPath: join(temporary, "manifest.json"), mode: "generate", toolVersion: "0.1.0" }),
      (error) => {
        assert.ok(error instanceof ZodVersionError, String(error));
        assert.match(error.message, /zod 4\.x/u);
        assert.match(error.message, /zod 3\.24\.1/u);
        return true;
      },
    );
    assert.deepEqual(readdirSync(join(temporary, "out")), [], "a refused run must write nothing");
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
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

test("a claimed name is never handed to a second claimant", () => {
  // The counter belongs to the requested name, but the answer has to clear
  // every name already given out, or two declarations collapse into one.
  const registry = new NameRegistry();
  assert.equal(registry.claim("Event2"), "Event2");
  assert.equal(registry.claim("Event"), "Event");
  assert.equal(registry.claim("Event"), "Event3");
  assert.equal(registry.claim("Event"), "Event4");
  assert.equal(registry.claim("Event2"), "Event22");

  // The same counter names enum members, where a collision is a wire value
  // silently answering to another one's name.
  const result = lowerInline({ CollidingSchema: z.enum(["a2", "a", "A"]) });
  const members = result.declarations.find((entry) => entry.name === "Colliding").members;
  assert.deepEqual(members.map((member) => member.name), ["a2", "a", "a3"]);
  assert.equal(new Set(members.map((member) => member.name)).size, members.length);
  assert.deepEqual(members.map((member) => member.wire ?? member.name), ["a2", "a", "A"]);
});

test("an exported z.lazy names the schema it resolves to", async () => {
  // A contract whose root is the self-reference: the export must lower to the
  // record, not burn its name on the wrapper and refuse it.
  const NodeSchema = z.strictObject({
    label: z.string(),
    children: z.array(z.lazy(() => LazyNodeSchema)),
  });
  const LazyNodeSchema = z.lazy(() => NodeSchema);
  const result = lowerInline({ LazyNodeSchema });
  assert.deepEqual(result.renamed, [], "the wrapper must not spend a second name");
  assert.deepEqual(result.declarations.map((entry) => entry.name), ["LazyNode"]);
  assert.deepEqual(fieldsOf(result, "LazyNode"), ["label: string", "children: List<LazyNode>"]);
  assert.equal(result.exportNames.get("LazyNodeSchema"), "LazyNode");

  // A lazy alias beside the export it points at defers to it.
  const both = lowerInline({ AliasSchema: z.lazy(() => NodeSchema), NodeSchema });
  assert.deepEqual(both.declarations.map((entry) => entry.name), ["Node"]);
  assert.equal(both.exportNames.get("AliasSchema"), "Node");
  assert.equal(both.exportNames.get("NodeSchema"), "Node");

  // A getter that answers with no schema is named in the refusal.
  const shapes = refusalOf(() => lowerInline({ BrokenSchema: z.lazy(() => undefined) }));
  assert.deepEqual(shapes.map((shape) => [shape.path, shape.zodType]), [["BrokenSchema", "lazy"]]);
  assert.match(shapes[0].reason, /z\.lazy\(\) did not resolve to a schema/u);
});

test("an exemption covers the path that declares it and no other", async () => {
  // One schema object in two records is two positions. Exempting one must not
  // open the other, and the other has to be refused where a reader can see it.
  const shared = z.date();
  const OneSchema = z.strictObject({ x: shared });
  const TwoSchema = z.strictObject({ y: shared });
  const shapes = refusalOf(() =>
    lowerInline({ OneSchema, TwoSchema }, [{ path: "OneSchema.x", reason: "the shell reads the timestamp itself" }]),
  );
  assert.deepEqual(shapes.map((shape) => shape.path), ["TwoSchema.y"]);

  const both = lowerInline({ OneSchema, TwoSchema }, [
    { path: "OneSchema.x", reason: "the shell reads the timestamp itself" },
    { path: "TwoSchema.y", reason: "the shell reads the timestamp itself" },
  ]);
  assert.deepEqual(both.degrades.map((degrade) => degrade.path), ["OneSchema.x", "TwoSchema.y"]);
  assert.deepEqual(fieldsOf(both, "One"), ["x: unknown"]);
  assert.deepEqual(fieldsOf(both, "Two"), ["y: unknown"]);

  // An exempted export is `unknown` under its own name; borrowing that name
  // elsewhere would spend one declared exemption on a second path.
  const OpaqueSchema = z.strictObject({ at: z.date() });
  const HolderSchema = z.strictObject({ opaque: OpaqueSchema });
  const borrowed = refusalOf(() =>
    lowerInline({ HolderSchema, OpaqueSchema }, [{ path: "OpaqueSchema", reason: "the shell parses this envelope itself" }]),
  );
  assert.deepEqual(borrowed.map((shape) => shape.path), ["HolderSchema.opaque"]);
  assert.match(borrowed[0].reason, /exempted to unknown at 'OpaqueSchema'/u);
});

test("two cases behind one discriminator value are refused", () => {
  // zod defers this to the first parse, where it throws; introspection alone
  // would emit two enum members carrying the same runtime string.
  const AmbiguousSchema = z.discriminatedUnion("type", [
    z.strictObject({ type: z.literal("end"), a: z.string() }),
    z.strictObject({ type: z.literal("end"), b: z.string() }),
  ]);
  const shapes = refusalOf(() => lowerInline({ AmbiguousSchema }));
  assert.deepEqual(shapes.map((shape) => shape.path), ["AmbiguousSchema|1.type"]);
  assert.match(shapes[0].reason, /declared by more than one case/u);

  // Distinct values still lower, and every member name stays distinct.
  const FineSchema = z.discriminatedUnion("type", [
    z.strictObject({ type: z.literal("end"), a: z.string() }),
    z.strictObject({ type: z.literal("End"), b: z.string() }),
  ]);
  const members = lowerInline({ FineSchema }).declarations.find((entry) => entry.kind === "enum").members;
  assert.equal(new Set(members.map((member) => member.name)).size, 2);
  assert.deepEqual(members.map((member) => member.wire ?? member.name), ["end", "End"]);
});

test("`.nonoptional()` takes back the optionality it wraps", () => {
  const NonOptionalSchema = z.strictObject({
    reinstated: z.string().optional().nonoptional(),
    stillNullable: z.string().nullable().nonoptional(),
    plain: z.string().optional(),
  });
  const result = lowerInline({ NonOptionalSchema });
  assert.deepEqual(fieldsOf(result, "NonOptional"), [
    "reinstated: string",
    "stillNullable: string?",
    "plain: string?",
  ]);
  // zod is the arbiter: the generated field says exactly what zod requires.
  assert.equal(NonOptionalSchema.safeParse({ stillNullable: null }).success, false);
  assert.equal(NonOptionalSchema.safeParse({ reinstated: "a", stillNullable: null }).success, true);
  // `.nonoptional()` removes no divergence it did not create.
  const kinds = new Map(result.boundaryNotes.map((note) => [note.kind, note.count]));
  assert.equal(kinds.get("optional-accepts-null"), 1, "only the still-optional field diverges");
  assert.equal(kinds.get("nullable-accepts-absent"), 1);
});

test("optionality survives the shapes VelarScript writes without a `?`", () => {
  // Dropping it would narrow: zod accepts the key left out and the generated
  // record would demand it. Every declared divergence is a widening.
  assert.equal(renderType(optional({ kind: "primitive", name: "unknown" })), "unknown?");
  assert.equal(renderType(optional({ kind: "primitive", name: "null" })), "unknown?");

  const OpaqueSchema = z.strictObject({ opaque: z.unknown().optional(), nothing: z.null().optional() });
  const result = lowerInline({ OpaqueSchema });
  assert.deepEqual(fieldsOf(result, "Opaque"), ["opaque: unknown?", "nothing: unknown?"]);
  assert.equal(OpaqueSchema.safeParse({}).success, true, "zod accepts both keys left out");
  const widened = result.boundaryNotes.find((note) => note.kind === "optional-null-widened-to-unknown");
  assert.ok(widened !== undefined && widened.count === 1, "the null widening is counted, not silent");
  assert.ok(widened.detail.length > 40);

  // An exemption opens the value, not the key: a wrapper that accepts an
  // absent key has to keep saying so.
  const DegradedSchema = z.strictObject({ maybe: z.date().optional(), always: z.date() });
  const degraded = lowerInline({ DegradedSchema }, [
    { path: "DegradedSchema.maybe", reason: "the shell reads the timestamp itself" },
    { path: "DegradedSchema.always", reason: "the shell reads the timestamp itself" },
  ]);
  assert.deepEqual(fieldsOf(degraded, "Degraded"), ["maybe: unknown?", "always: unknown"]);
});

test("a top-level zod 4 format reports its constraint like the chained form", () => {
  // `z.email()` keeps its constraint on `_def.format`, not `_def.checks`.
  const FormatsSchema = z.strictObject({
    mail: z.email(),
    id: z.uuid(),
    link: z.url(),
    when: z.iso.datetime(),
    day: z.iso.date(),
    count: z.int(),
    chained: z.string().email(),
    least: z.string().min(1),
  });
  const result = lowerInline({ FormatsSchema });
  assert.deepEqual(fieldsOf(result, "Formats"), [
    "mail: string",
    "id: string",
    "link: string",
    "when: string",
    "day: string",
    "count: number",
    "chained: string",
    "least: string",
  ]);
  assert.deepEqual(
    result.constraints.map((entry) => `${entry.path}:${entry.checks.join(",")}`),
    [
      "FormatsSchema.chained:email",
      "FormatsSchema.count:safeint",
      "FormatsSchema.day:date",
      "FormatsSchema.id:uuid",
      "FormatsSchema.least:min_length",
      "FormatsSchema.link:url",
      "FormatsSchema.mail:email",
      "FormatsSchema.when:datetime",
    ],
    "a top-level format and its chained spelling read the same",
  );
});

test("a record union without a discriminator is refused through z.lazy too", () => {
  const arms = [
    z.strictObject({ kind: z.string(), a: z.string() }),
    z.strictObject({ kind: z.string(), b: z.string() }),
  ];
  for (const [label, schema] of [
    ["bare", z.union(arms)],
    ["lazy", z.union(arms.map((arm) => z.lazy(() => arm)))],
  ]) {
    const shapes = refusalOf(() => lowerInline({ UndiscriminatedSchema: schema }));
    assert.deepEqual(shapes.map((shape) => shape.path), ["UndiscriminatedSchema"], label);
    assert.match(shapes[0].reason, /without a discriminator/u, label);
  }
});

test("the digest reads the definition zod actually holds", () => {
  // A check instance has no own enumerable property: its definition lives on
  // `_zod.def`, which is exactly where the change classes live.
  const digestOf = (schema) => schemaDigest([{ name: "S", schema }]);
  assert.notEqual(
    digestOf(z.strictObject({ a: z.string().min(1) })),
    digestOf(z.strictObject({ a: z.string().min(5) })),
    "a bound change must move the digest",
  );
  assert.notEqual(
    digestOf(z.strictObject({ a: z.string().regex(/^a$/u) })),
    digestOf(z.strictObject({ a: z.string().regex(/^b$/u) })),
    "a pattern change must move the digest",
  );
  assert.notEqual(
    digestOf(z.strictObject({ a: z.string() }).refine(() => true, "one")),
    digestOf(z.strictObject({ a: z.string() }).refine(() => true, "two")),
    "a refinement message change must move the digest",
  );
  assert.notEqual(
    digestOf(z.strictObject({ a: z.number() }).refine((value) => value.a > 1)),
    digestOf(z.strictObject({ a: z.number() }).refine((value) => value.a > 5)),
    "a refinement predicate change must move the digest",
  );
  assert.equal(
    digestOf(z.strictObject({ a: z.string().min(1) })),
    digestOf(z.strictObject({ a: z.string().min(1) })),
    "the same contract twice is one digest",
  );

  // Depth: the walk costs several steps per record, so the old 64 stopped
  // seeing changes about twenty records down.
  const nest = (levels, leaf) => {
    let schema = z.strictObject({ leaf });
    for (let level = 0; level < levels; level += 1) schema = z.strictObject({ next: schema });
    return schema;
  };
  for (const levels of [20, 40, 100]) {
    assert.notEqual(
      digestOf(nest(levels, z.string())),
      digestOf(nest(levels, z.number())),
      `a change ${levels} records down must move the digest`,
    );
  }
});

test("`T?` is the one canonical nullability shape", () => {
  const string = { kind: "primitive", name: "string" };
  const number = { kind: "primitive", name: "number" };
  assert.equal(renderType(optional(string)), "string?");
  assert.equal(renderType(optional(optional(string))), "string?");
  assert.equal(renderType(optional({ kind: "union", options: [string, number] })), "(string | number)?");
  // `unknown` is not already optional — a record field carrying it demands the
  // key — and `null?` is the one shape the language refuses, so it widens.
  assert.equal(renderType(optional({ kind: "primitive", name: "unknown" })), "unknown?");
  assert.equal(renderType(optional({ kind: "primitive", name: "null" })), "unknown?");
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

  // A record may name itself, so `z.lazy` is lowered rather than refused.
  assert.deepEqual(
    byName.get("Tree").fields.map((field) => `${field.name}: ${renderType(field.type)}`),
    ["label: string", "children: List<Tree>"],
  );

  // A plain z.object lowers exactly like a strict one: D102 ruling 2 makes the
  // record's surplus-key answer the same as z.object's.
  assert.deepEqual(
    byName.get("PlainRecord").fields.map((field) => `${field.name}: ${renderType(field.type)}`),
    ["id: string", "label: string?"],
  );
  assert.deepEqual(
    byName.get("MixedStrictness").fields.map((field) => `${field.name}: ${renderType(field.type)}`),
    ["strict: MixedStrictnessStrict", "plain: MixedStrictnessPlain"],
  );

  // The manifest exemption keeps the export and opens exactly one field.
  assert.deepEqual(
    byName.get("Degraded").fields.map((field) => `${field.name}: ${renderType(field.type)}`),
    ["protocolVersion: unknown", "payload: string"],
  );
  assert.deepEqual(result.degrades.map((degrade) => degrade.path), ["DegradedSchema.protocolVersion"]);
});

test("a plain z.object is an equivalence, not a widening", async () => {
  // Under D102 ruling 2 a VelarScript record strips a surplus key, which is
  // what z.object does and what z.strictObject refuses to do. The generator
  // accepts both and counts the widening only where one exists.
  const contracts = await import(join(FIXTURES, "contracts", "contracts.mjs"));
  assert.deepEqual(contracts.PlainRecordSchema.parse({ id: "p-1", extra: 1 }), { id: "p-1" });
  assert.equal(contracts.PrimitivesSchema.safeParse({
    name: "n", count: 1, enabled: true, nothing: null, extra: 1,
  }).success, false);

  const plain = lowerInline({ PlainSchema: z.object({ id: z.string() }) });
  assert.deepEqual(fieldsOf(plain, "Plain"), ["id: string"]);
  assert.deepEqual(plain.boundaryNotes.map((note) => note.kind), []);

  const strict = lowerInline({ StrictSchema: z.strictObject({ id: z.string() }) });
  assert.deepEqual(fieldsOf(strict, "Strict"), ["id: string"]);
  assert.deepEqual(
    strict.boundaryNotes.map((note) => [note.kind, note.count, note.samplePaths]),
    [["strict-unknown-keys", 1, ["StrictSchema"]]],
  );

  // The count follows the shape that widens, not the record that holds it.
  const mixed = await lowerFixture("contracts.mjs");
  const widened = mixed.boundaryNotes.find((note) => note.kind === "strict-unknown-keys");
  assert.ok(!widened.samplePaths.includes("MixedStrictnessSchema.plain"), widened.samplePaths.join(", "));

  // A catchall keeps the surplus key in the parsed value, which no fixed record
  // shape can carry, so it stays refused with its own words.
  const refusal = refusalOf(() => lowerInline({ LooseSchema: z.looseObject({ id: z.string() }) }));
  assert.match(refusal[0].reason, /keeps its surplus keys in the parsed value/u);
});

test("an integer literal is an enum member carrying its number", async () => {
  const result = await lowerFixture("contracts.mjs");
  const byName = new Map(result.declarations.map((declaration) => [declaration.name, declaration]));

  // A standalone integer literal is a one-member enum; the number is never the
  // member name, so it is always written out.
  assert.deepEqual(byName.get("RegistryVersion").members, [{ name: "value1", wire: 1 }]);
  assert.deepEqual(byName.get("Priority").members, [{ name: "value1", wire: 1 }, { name: "value2", wire: 2 }]);
  assert.equal(renderType(byName.get("RegistrySnapshot").fields[0].type), "RegistrySnapshotVersion");

  // An integer discriminator is a member of the union's tag enum, and each case
  // narrows through it.
  assert.deepEqual(
    byName.get("ProtocolFrameTag").members,
    [{ name: "value1", wire: 1 }, { name: "value2", wire: 2 }],
  );
  assert.equal(renderType(byName.get("ProtocolFrame").type), "ProtocolFrameValue1 | ProtocolFrameValue2");
  assert.equal(renderType(byName.get("ProtocolFrameValue2").fields[0].type), "ProtocolFrameTag.value2");

  // One enum carries both wire kinds: they are unique by value identity, and
  // the string "7" is not the number 7.
  assert.deepEqual(byName.get("MixedTagTag").members, [{ name: "named", wire: null }, { name: "value7", wire: 7 }]);
  const mixed = lowerInline({
    BothSchema: z.literal(["2", 2]),
  });
  assert.deepEqual(
    mixed.declarations.find((declaration) => declaration.name === "Both").members,
    [{ name: "value2", wire: "2" }, { name: "value22", wire: 2 }],
  );

  // A negative wire value keeps its own name: routing it through the string
  // spelling would land -1 and 1 on one member and lose one of them.
  const signed = lowerInline({ SignedSchema: z.literal([-1, 0, 1]) });
  assert.deepEqual(
    signed.declarations.find((declaration) => declaration.name === "Signed").members,
    [{ name: "valueMinus1", wire: -1 }, { name: "value0", wire: 0 }, { name: "value1", wire: 1 }],
  );

  // Two cases behind one integer tag is the same fault as two behind one string.
  const collided = refusalOf(() => lowerInline({
    ClashSchema: z.discriminatedUnion("v", [
      z.strictObject({ v: z.literal(1), a: z.string() }),
      z.strictObject({ v: z.literal(1), b: z.string() }),
    ]),
  }));
  assert.match(collided[0].reason, /discriminator value 1 is declared by more than one case/u);
});

test("a shape outside the table is refused with its schema path and reason", async () => {
  const cases = [
    ["LooseSchema", /keeps its surplus keys/u],
    ["CatchallSchema", /keeps its surplus keys/u],
    ["TransformedSchema", /transform and effect schemas/u],
    ["DefaultedSchema", /default value changes the parsed result/u],
    ["CaughtSchema", /catch fallback/u],
    // D102 ruling 1 stops at a string or a safe integer, so each of these says
    // which side of that line it fell on.
    ["BooleanLiteralSchema", /the boolean true cannot back a VelarScript enum member/u],
    ["FractionalLiteralSchema", /1\.5, which is not a whole number/u],
    ["UnsafeIntegerLiteralSchema", /outside the safe integer range/u],
    ["NullLiteralSchema", /null cannot back a VelarScript enum member/u],
    ["BooleanTagSchema", /a discriminator names one enum member, and the boolean true/u],
    ["DatedSchema", /host Date instance/u],
    ["UndiscriminatedSchema", /without a discriminator/u],
    ["EmptySchema", /zero-field record/u],
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
  // A refinement on a record is reported too, not only one on a primitive, and
  // a zod 4 top-level format names the format rather than nothing at all.
  assert.deepEqual(
    result.constraints.map((constraint) => `${constraint.path}:${constraint.checks.join(",")}`),
    [
      "AuthorSchema.displayName:min_length",
      "FormatsSchema.count:safeint",
      "FormatsSchema.mail:email",
      "FormatsSchema.when:datetime",
      "RefinedRangeSchema:custom",
    ],
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
  assert.deepEqual(report.files.map((file) => file.written), [false, false]);
  assert.equal(readFileSync(join(GENERATED, "contracts.vel"), "utf8"), first);

  const checked = await run({ manifestPath: MANIFEST, mode: "check", toolVersion: "0.1.0" });
  assert.ok(checked.ok);
  assert.equal(checked.mode, "check");
  // Both modes answer the same question about the tree, so a committed report
  // does not depend on whether the run that made it had to write.
  assert.deepEqual(checked.files, report.files);
  assert.equal(checked.modules[0].exportedSchemas, 29);
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
        assert.deepEqual(error.files, [{ output: "contracts.vel", status: "drift", written: false }]);
        return true;
      },
    );
    // --check never writes.
    assert.equal(readFileSync(driftedFile, "utf8"), `${first}\n// stale\n`);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test("the emitter's own output is already `velar format` canonical", () => {
  // `velar format` is a safety net, not a load-bearing step: a consumer who
  // sets "velarFormat": false must still get formatted source.
  const temporary = copyFixtures("unformatted");
  try {
    const manifestPath = join(temporary, "unformatted.json");
    const manifest = JSON.parse(readFileSync(join(temporary, "manifest.json"), "utf8"));
    manifest.velarFormat = false;
    manifest.outputDirectory = "./vel/unformatted";
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
    execFileSync(process.execPath, [join(PACKAGE_ROOT, "dist", "cli.js"), "generate", manifestPath], { encoding: "utf8" });
    for (const output of ["contracts.vel", "channels.vel"]) {
      const file = join(temporary, "vel", "unformatted", output);
      const result = execFileSync(velarExecutable(), ["format", "--check", file], { encoding: "utf8" });
      assert.match(result, /is formatted/u, `${output} needed reformatting`);
    }
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

test("a channel table imports its types from where they sit", () => {
  // Both outputs are named relative to the output directory, so a table in a
  // subdirectory has to reach its types by the path between them.
  const temporary = copyFixtures("nested");
  try {
    const manifest = JSON.parse(readFileSync(join(temporary, "manifest.json"), "utf8"));
    manifest.outputDirectory = "./nested";
    manifest.modules[0].output = "types/contracts.vel";
    manifest.channelTables[0].output = "channels/table.vel";
    manifest.channelTables[0].typesOutput = "types/contracts.vel";
    const manifestPath = join(temporary, "nested.json");
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
    mkdirSync(join(temporary, "nested"), { recursive: true });
    writeFileSync(
      join(temporary, "nested", "velar.json"),
      JSON.stringify({ formatVersion: 2, entry: "main.vel", extensions: [] }, null, 2),
      "utf8",
    );
    writeFileSync(
      join(temporary, "nested", "main.vel"),
      'import {FixtureChannel} from "./channels/table.vel"\n\nprint(str(FixtureChannel.modKind))\n',
      "utf8",
    );
    execFileSync(process.execPath, [join(PACKAGE_ROOT, "dist", "cli.js"), "generate", manifestPath], { encoding: "utf8" });
    const table = readFileSync(join(temporary, "nested", "channels", "table.vel"), "utf8");
    assert.match(table, /^import \{[^}]+\} from "\.\.\/types\/contracts\.vel"$/mu);
    // The import has to resolve, not merely look right.
    const checked = execFileSync(velarExecutable(), ["check", join(temporary, "nested")], { encoding: "utf8" });
    assert.match(checked, /Checked \d+ modules/u);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test("a formatter failure leaves the generated tree as it was", { skip: process.platform === "win32" }, async () => {
  // Formatting fails per file. Writing as each one is formatted would leave a
  // half-regenerated tree behind, which is worse than an unchanged one.
  const temporary = copyFixtures("format-failure");
  try {
    const formatter = join(temporary, "fake-velar");
    writeFileSync(
      formatter,
      '#!/bin/sh\ncase "$2" in *channels.vel) echo "boom" >&2; exit 3;; esac\nexit 0\n',
      "utf8",
    );
    chmodSync(formatter, 0o755);
    const manifest = JSON.parse(readFileSync(join(temporary, "manifest.json"), "utf8"));
    manifest.velarCommand = formatter;
    const manifestPath = join(temporary, "failing.json");
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

    const generated = join(temporary, "vel", "generated");
    const before = ["contracts.vel", "channels.vel"].map((name) => readFileSync(join(generated, name), "utf8"));
    // Make the module file stale, so a run that wrote file by file would
    // rewrite it before the channel table failed.
    writeFileSync(join(generated, "contracts.vel"), "// stale\n", "utf8");

    await assert.rejects(
      () => run({ manifestPath, mode: "generate", toolVersion: "0.1.0" }),
      (error) => {
        assert.equal(error.name, "FormatError");
        assert.match(error.message, /boom/u);
        return true;
      },
    );
    assert.equal(readFileSync(join(generated, "contracts.vel"), "utf8"), "// stale\n", "nothing may be written");
    assert.equal(readFileSync(join(generated, "channels.vel"), "utf8"), before[1]);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test("a channel table with no channels is refused before anything is emitted", async () => {
  // A member-less enum is not VelarScript, so an empty table is a manifest
  // error rather than a file the consuming project fails to compile.
  assert.throws(
    () =>
      parseManifest({
        formatVersion: 1,
        outputDirectory: "out",
        modules: [{ specifier: "x", output: "a.vel" }],
        channelTables: [{ output: "c.vel", enumName: "C", typesOutput: "a.vel", channels: [] }],
      }),
    /at least one channel/u,
  );

  const temporary = copyFixtures("runtime-channels");
  try {
    writeFileSync(
      join(temporary, "contracts", "runtime.mjs"),
      [
        'import { z } from "zod";',
        "export const PingSchema = z.strictObject({ id: z.string() });",
        'export const MAPPED = new Map([["ping", { request: PingSchema }]]);',
        "export const EMPTY = {};",
        "",
      ].join("\n"),
      "utf8",
    );
    const base = {
      formatVersion: 1,
      resolveFrom: "./contracts",
      outputDirectory: "./vel/runtime",
      velarFormat: false,
      modules: [{ specifier: "./runtime.mjs", output: "runtime.vel", exports: ["PingSchema"] }],
    };
    for (const [exportName, reason] of [["MAPPED", /is a Map/u], ["EMPTY", /declares no channels/u]]) {
      const manifestPath = join(temporary, `${exportName}.json`);
      writeFileSync(
        manifestPath,
        JSON.stringify({
          ...base,
          channelTables: [
            {
              output: "runtime-channels.vel",
              enumName: "RuntimeChannel",
              typesOutput: "runtime.vel",
              source: { specifier: "./runtime.mjs", export: exportName },
            },
          ],
        }),
        "utf8",
      );
      await assert.rejects(() => run({ manifestPath, mode: "generate", toolVersion: "0.1.0" }), reason, exportName);
    }
    assert.throws(() => readdirSync(join(temporary, "vel", "runtime")), "a refused table must write nothing");
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test("the formatter is spawned the way each platform can run it", () => {
  // npm installs the Windows entry point as a batch script, which `spawn` has
  // refused to run without a shell since Node 20.12.
  const posix = velarSpawnPlan("/project/node_modules/.bin/velar", ["format", "/tmp/a.vel"], "darwin");
  assert.deepEqual(posix, {
    command: "/project/node_modules/.bin/velar",
    args: ["format", "/tmp/a.vel"],
    shell: false,
  });
  assert.deepEqual(velarSpawnPlan("velar", ["format", "a.vel"], "linux").shell, false);

  const windows = velarSpawnPlan("C:\\p\\node_modules\\.bin\\velar.cmd", ["format", "C:\\tmp\\a b.vel"], "win32");
  assert.deepEqual(windows, {
    command: '"C:\\p\\node_modules\\.bin\\velar.cmd"',
    args: ['"format"', '"C:\\tmp\\a b.vel"'],
    shell: true,
  });
  assert.equal(velarSpawnPlan("C:\\p\\velar.BAT", ["format"], "win32").shell, true);
  // A bare executable on Windows is still spawned directly.
  assert.equal(velarSpawnPlan("C:\\p\\velar.exe", ["format"], "win32").shell, false);
  // cmd.exe has no escape for a quote, so a path carrying one is refused.
  assert.throws(() => velarSpawnPlan('C:\\p\\ve"lar.cmd', [], "win32"), /double quote/u);
});

test("the report names the zod install without naming the machine", async () => {
  const report = await run({ manifestPath: MANIFEST, mode: "check", toolVersion: "0.1.0" });
  assert.equal(report.zod.resolvedFrom, "./contracts");
  assert.equal(report.zod.resolved, REFERENCE_ZOD_VERSION);
  const text = JSON.stringify(report);
  for (const machinePath of [PACKAGE_ROOT, tmpdir(), process.cwd()]) {
    assert.ok(!text.includes(machinePath), `the report carries the machine path ${machinePath}`);
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
