/**
 * The generated header records a digest of the source schemas, so a contract
 * change is visible in the diff even when the emitted types happen to match.
 * The digest reads the zod structure only; renaming rules do not move it.
 *
 * Reading that structure means reading where zod 4 actually keeps it. A schema
 * holds its definition on `_def`, but a check instance — what `.min(5)`,
 * `.regex(…)`, and `.refine(…)` produce — has no own enumerable property at
 * all: its definition lives on `_zod.def`. Walking `Object.keys` alone made
 * every check canonicalize to `{}`, which is exactly the change class this
 * digest exists to catch.
 */

import { createHash } from "node:crypto";

import { isZodSchema, type ZodSchema } from "./zod-runtime.js";

/**
 * Deep enough that no realistic contract is truncated: one level of record
 * nesting costs three or four steps here (schema, `_def`, `shape`, field), so
 * 512 covers roughly 130 nested records, while 64 stopped seeing changes at
 * about 20. The cap is a diagnostic against a shape getter that rebuilds
 * itself forever, not a budget.
 */
const MAX_DEPTH = 512;

interface CheckLike {
  readonly _zod?: { readonly def?: unknown };
}

/**
 * zod hides a check's message behind a zero-argument thunk. Calling it is how
 * the message reaches the digest at all; anything that takes an argument is a
 * caller-supplied formatter and is left alone.
 */
function messageOf(value: unknown): unknown {
  if (typeof value !== "function" || value.length > 0) return undefined;
  try {
    const message = (value as () => unknown)();
    return typeof message === "string" || typeof message === "number" || typeof message === "boolean"
      ? message
      : undefined;
  } catch {
    return undefined;
  }
}

function canonical(value: unknown, path: Set<object>, depth: number): unknown {
  if (depth > MAX_DEPTH) return { depthLimit: true };
  // A predicate is part of the contract even though its text is all that can be
  // read of it: `.refine(v => v.a > 1)` and `.refine(v => v.a > 5)` differ here.
  if (typeof value === "function") return { function: String(value) };
  if (typeof value === "bigint") return { bigint: value.toString() };
  if (typeof value === "symbol") return { symbol: value.description ?? "" };
  if (typeof value === "undefined") return { undefined: true };
  if (typeof value !== "object" || value === null) return value;
  if (value instanceof RegExp) return { regexp: value.source, flags: value.flags };
  if (value instanceof Date) return { date: value.getTime() };
  if (path.has(value)) return { cycle: true };
  // The guard tracks the ancestors of the node being read, so it is added on
  // the way down and taken off on the way back up rather than copied per node.
  path.add(value);
  try {
    if (Array.isArray(value)) return value.map((item) => canonical(item, path, depth + 1));
    if (isZodSchema(value)) {
      const def = (value as ZodSchema)._def as unknown as Record<string, unknown>;
      return { zod: canonical(def, path, depth + 1) };
    }
    const source = value as Record<string, unknown>;
    const fields: [string, unknown][] = Object.keys(source)
      .sort()
      .map((key) => [key, canonical(source[key], path, depth + 1)]);
    const message = messageOf(source["error"]);
    if (message !== undefined) fields.push(["error()", message]);
    const definition = (value as CheckLike)._zod?.def;
    if (typeof definition === "object" && definition !== null) {
      fields.push(["_zod.def", canonical(definition, path, depth + 1)]);
    }
    return Object.fromEntries(fields);
  } finally {
    path.delete(value);
  }
}

export function schemaDigest(exports: readonly { readonly name: string; readonly schema: ZodSchema }[]): string {
  const body = exports.map((entry) => [entry.name, canonical(entry.schema, new Set(), 0)]);
  const hash = createHash("sha256").update(JSON.stringify(body), "utf8").digest("hex");
  return `sha256-${hash}`;
}
