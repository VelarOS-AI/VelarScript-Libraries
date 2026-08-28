// Every shape the closed mapping table refuses. Each export exists so a test
// can assert the diagnostic names the schema path and the reason.

import { z } from "zod";

// a catchall object keeps its surplus keys in the parsed value; a record cannot
export const LooseSchema = z.looseObject({ id: z.string() });

// the same, written as an explicit catchall
export const CatchallSchema = z.object({ id: z.string() }).catchall(z.string());

// transform / effect
export const TransformedSchema = z.strictObject({ id: z.string().transform((value) => value.trim()) });

// default value
export const DefaultedSchema = z.strictObject({ mode: z.string().default("blocking") });

// catch fallback
export const CaughtSchema = z.strictObject({ mode: z.string().catch("blocking") });

// D102 ruling 1 extends a wire value to a string or a safe integer and no
// further: a boolean singleton is not a shape the language has, and no ruling
// covers one.
export const BooleanLiteralSchema = z.strictObject({ enabled: z.literal(true) });

// a fractional literal is not an integer wire value
export const FractionalLiteralSchema = z.strictObject({ ratio: z.literal(1.5) });

// beyond Number.MAX_SAFE_INTEGER, where equality stops distinguishing values
export const UnsafeIntegerLiteralSchema = z.strictObject({ id: z.literal(9007199254740993) });

// a null singleton is not an enum member either
export const NullLiteralSchema = z.strictObject({ nothing: z.literal(null) });

// a boolean discriminator names no enum member
export const BooleanTagSchema = z.discriminatedUnion("ok", [
  z.strictObject({ ok: z.literal(true), value: z.string() }),
  z.strictObject({ ok: z.literal(false), message: z.string() }),
]);

// host Date
export const DatedSchema = z.strictObject({ at: z.date() });

// record union without a discriminator
export const UndiscriminatedSchema = z.union([
  z.strictObject({ kind: z.string(), a: z.string() }),
  z.strictObject({ kind: z.string(), b: z.string() }),
]);

// zero-field record
export const EmptySchema = z.strictObject({});

// non-string record key
export const NumericKeySchema = z.record(z.number(), z.string());

// a field name no VelarScript identifier can spell
export const OddFieldSchema = z.strictObject({ "content-type": z.string() });

// z.any() opts out of validation
export const AnySchema = z.strictObject({ payload: z.any() });

// A tuple: a fixed-length positional shape. VelarScript's positional collection
// is List<T> — one element type, any length — so nothing in the language carries
// the arity or the per-position types, and the near miss (a List of the element
// union) is refused rather than applied because it drops both at once.
export const TupleSchema = z.tuple([z.string(), z.number()]);

// The same refusal for the rest form, which is not even fixed-length.
export const RestTupleSchema = z.tuple([z.string()], z.number());

// And for the empty tuple, whose one accepted value is [].
export const EmptyTupleSchema = z.tuple([]);

// intersection
export const IntersectionSchema = z.intersection(
  z.strictObject({ a: z.string() }),
  z.strictObject({ b: z.string() }),
);
