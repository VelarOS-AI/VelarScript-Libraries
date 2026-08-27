/**
 * The generated header records a digest of the source schemas, so a contract
 * change is visible in the diff even when the emitted types happen to match.
 * The digest reads the zod structure only; renaming rules do not move it.
 */

import { createHash } from "node:crypto";

import { isZodSchema, type ZodSchema } from "./zod-runtime.js";

const MAX_DEPTH = 64;

function canonical(value: unknown, path: Set<object>, depth: number): unknown {
  if (depth > MAX_DEPTH) return { depthLimit: true };
  if (typeof value === "function") return { function: true };
  if (typeof value === "bigint") return { bigint: value.toString() };
  if (typeof value === "symbol") return { symbol: value.description ?? "" };
  if (typeof value === "undefined") return { undefined: true };
  if (typeof value !== "object" || value === null) return value;
  if (path.has(value)) return { cycle: true };
  const next = new Set(path);
  next.add(value);
  if (Array.isArray(value)) return value.map((item) => canonical(item, next, depth + 1));
  if (isZodSchema(value)) {
    const def = (value as ZodSchema)._def as unknown as Record<string, unknown>;
    return { zod: canonical(def, next, depth + 1) };
  }
  const source = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(source)
      .sort()
      .map((key) => [key, canonical(source[key], next, depth + 1)]),
  );
}

export function schemaDigest(exports: readonly { readonly name: string; readonly schema: ZodSchema }[]): string {
  const body = exports.map((entry) => [entry.name, canonical(entry.schema, new Set(), 0)]);
  const hash = createHash("sha256").update(JSON.stringify(body), "utf8").digest("hex");
  return `sha256-${hash}`;
}
