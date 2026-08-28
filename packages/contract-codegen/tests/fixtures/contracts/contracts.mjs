// One zod contract module per row of the closed mapping table. This stands in
// for a real contract package's compiled output: the generator loads it and
// walks the exported schema objects, exactly as it walks a published package.

import { z } from "zod";

// string / number / boolean / null
export const PrimitivesSchema = z.strictObject({
  name: z.string(),
  count: z.number(),
  enabled: z.boolean(),
  nothing: z.null(),
});

// z.undefined() has no JSON spelling; it is kept apart so the rest of the
// fixture stays reachable from a real wire payload.
export const UndefinedFieldSchema = z.strictObject({
  present: z.string(),
  absent: z.undefined(),
});

// optional / nullable / nullish
export const OptionalitySchema = z.strictObject({
  required: z.string(),
  optional: z.string().optional(),
  nullable: z.string().nullable(),
  nullish: z.string().nullish(),
});

// z.enum, including wire values no VelarScript identifier can spell
export const HookEventSchema = z.enum([
  "session:start",
  "turn-context:assemble",
  "sub-agent:dispatch",
  "prompt:compose",
]);

// z.enum whose readable names collide with VelarScript keywords and with the
// enum's own reserved runtime surface
export const ReservedWordsSchema = z.enum(["type", "class", "is", "parse", "values", "match", "1st"]);

// literal string union
export const TrustLevelSchema = z.literal(["bundled-official", "marketplace-signed", "local-dev"]);

// single string literal
export const KindSchema = z.literal("velaros-mod");

// array / record(string, V) / unknown
export const CollectionsSchema = z.strictObject({
  tags: z.array(z.string()),
  headers: z.record(z.string(), z.string()),
  metadata: z.record(z.string(), z.unknown()),
  opaque: z.unknown(),
});

// primitive union, including one that collapses to `T?`
export const UnionsSchema = z.strictObject({
  scalar: z.union([z.string(), z.number()]),
  maybeScalar: z.union([z.string(), z.number(), z.null()]),
  listOrText: z.union([z.string(), z.array(z.string())]),
});

// nested and shared record shapes
export const AuthorSchema = z.strictObject({
  id: z.string(),
  displayName: z.string().min(1),
});

export const ArticleSchema = z.strictObject({
  slug: z.string(),
  author: AuthorSchema,
  reviewers: z.array(AuthorSchema),
  nested: z.strictObject({ depth: z.number(), label: z.string().optional() }),
});

// discriminated union with wire-value tags, exported cases, and an anonymous case
export const StreamReasoningSchema = z.strictObject({
  type: z.literal("reasoning"),
  id: z.string(),
  text: z.string(),
});

export const StreamToolCallSchema = z.strictObject({
  type: z.literal("tool-call"),
  toolCallId: z.string(),
  args: z.record(z.string(), z.unknown()),
});

export const StreamEventSchema = z.discriminatedUnion("type", [
  StreamReasoningSchema,
  StreamToolCallSchema,
  z.strictObject({ type: z.literal("end") }),
  z.strictObject({ type: z.literal("error"), message: z.string() }),
]);

// a discriminated union reached only through a field
export const EnvelopeSchema = z.strictObject({
  sourceSessionId: z.string(),
  event: StreamEventSchema,
  sequence: z.number().optional(),
});

// a top-level alias over a wrapper
export const MaybeAuthorSchema = AuthorSchema.nullish();

// self-referential: VelarScript records may name themselves, so `z.lazy` is
// lowered rather than refused
export const TreeSchema = z.strictObject({
  label: z.string(),
  children: z.array(z.lazy(() => TreeSchema)),
});

// a refinement on a record, which no VelarScript type carries
export const RefinedRangeSchema = z
  .strictObject({ from: z.number(), to: z.number() })
  .refine((value) => value.from <= value.to, "from must not exceed to");

// optionality over the two shapes VelarScript writes without a `?` of their
// own. Dropping the `?` here would demand a key zod lets the sender omit, so
// `unknown` keeps it and `null` widens to `unknown?` to keep it.
export const OpaqueOptionalitySchema = z.strictObject({
  opaque: z.unknown().optional(),
  nothing: z.null().optional(),
  present: z.string(),
});

// .nonoptional() takes back exactly the optionality it wraps: the key is
// required again, and the generated field must say so.
export const NonOptionalSchema = z.strictObject({
  reinstated: z.string().optional().nonoptional(),
  plain: z.string().optional(),
});

// zod 4 keeps a top-level format's constraint off `_def.checks`. The type is
// still `string` or `number`; the constraint is reported, not carried.
export const FormatsSchema = z.strictObject({
  mail: z.email(),
  when: z.iso.datetime(),
  count: z.int(),
});

// A plain z.object strips a surplus key, and so does a VelarScript record
// (D102 ruling 2), so the two agree on every payload and the mapping reports no
// widening here. The surplus-key samples in samples.json are the evidence.
export const PlainRecordSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
});

// A plain object nested inside a strict one: the widening count follows the
// shape that actually widens, not the record that contains it.
export const MixedStrictnessSchema = z.strictObject({
  strict: z.strictObject({ value: z.string() }),
  plain: z.object({ value: z.string() }),
});

// D102 ruling 1: an integer literal is a single-member enum carrying a numeric
// wire value, which is how a wire protocol pins its version.
export const RegistryVersionSchema = z.literal(1);

// The same literal inside the record that pins it, which is the shape a real
// contract writes.
export const RegistrySnapshotSchema = z.object({
  version: z.literal(1),
  folders: z.array(z.string()),
});

// An integer discriminator: the tag enum carries the numbers, and each case
// narrows through its own member.
export const ProtocolFrameSchema = z.discriminatedUnion("version", [
  z.strictObject({ version: z.literal(1), payload: z.string() }),
  z.strictObject({ version: z.literal(2), payload: z.string(), trace: z.string().optional() }),
]);

// One enum may carry both wire kinds: they are unique by value identity, and
// neither parses as the other.
export const MixedTagSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("named"), name: z.string() }),
  z.strictObject({ kind: z.literal(7), code: z.number() }),
]);

// z.enum over an integer-valued object reads its values the same way.
export const PrioritySchema = z.enum({ Low: 1, High: 2 });

// Outside the closed table on purpose: the fixture manifest degrades this
// path, so the golden output carries an `unknown` field with a recorded reason.
// The shape is mappable now — an exemption is the consumer's decision to read a
// position as opaque data, not only an escape from a shape the table refuses.
export const DegradedSchema = z.strictObject({
  protocolVersion: z.literal(2),
  payload: z.string(),
});

// A wire tuple, and the other kind of exemption: this one is an escape from a
// shape the table refuses outright. VelarScript's positional collection is
// List<T> — one element type, any length — so no Vel type carries the pair's
// arity or its per-position types, and the table refuses the List-of-the-union
// substitution rather than applying it. The exemption is what a real contract
// reaches for when the tuple is what a consumer *builds* rather than what it
// parses; VelarOS-Desktop's `config:set` request is the live example. The golden
// samples record exactly what the exemption stops checking.
export const ConfigWriteSchema = z.strictObject({
  channel: z.string(),
  entry: z.tuple([z.enum(["chat", "system"]), z.strictObject({ enabled: z.boolean() })]),
});
