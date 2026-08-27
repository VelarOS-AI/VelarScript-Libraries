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

// numeric literal: VelarScript enums are string-backed
export const NumericLiteralSchema = z.strictObject({ protocolVersion: z.literal(2) });

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

// tuple
export const TupleSchema = z.tuple([z.string(), z.number()]);

// intersection
export const IntersectionSchema = z.intersection(
  z.strictObject({ a: z.string() }),
  z.strictObject({ b: z.string() }),
);
