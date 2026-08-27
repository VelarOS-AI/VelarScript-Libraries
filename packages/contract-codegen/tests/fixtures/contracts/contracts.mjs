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
