/**
 * The closed type-mapping table. A shape outside it is refused with its schema
 * path named; the manifest may exempt one path at a time to an `unknown`
 * degrade, and every exemption is reported.
 */

import {
  PRIMITIVE_BOOL,
  PRIMITIVE_NULL,
  PRIMITIVE_NUMBER,
  PRIMITIVE_STRING,
  PRIMITIVE_UNKNOWN,
  optional,
  type Declaration,
  type EnumMember,
  type RecordField,
  type VelType,
} from "./ir.js";
import type { DegradeEntry } from "./manifest.js";
import { NameRegistry, isVelarIdentifier, pascalCase, stripSuffix, wireMemberName } from "./naming.js";
import { isZodSchema, type ZodSchema } from "./zod-runtime.js";

export interface UnmappedShape {
  readonly path: string;
  readonly zodType: string;
  readonly reason: string;
}

export interface AppliedDegrade {
  readonly path: string;
  readonly reason: string;
  readonly zodType: string;
}

export interface ConstraintNote {
  readonly path: string;
  readonly zodType: string;
  readonly checks: readonly string[];
}

export interface BoundaryNote {
  readonly kind: string;
  readonly detail: string;
  readonly count: number;
  readonly samplePaths: readonly string[];
}

export interface LowerResult {
  readonly declarations: readonly Declaration[];
  /** Export name -> generated declaration name, for the channel table and report. */
  readonly exportNames: ReadonlyMap<string, string>;
  readonly degrades: readonly AppliedDegrade[];
  readonly constraints: readonly ConstraintNote[];
  readonly boundaryNotes: readonly BoundaryNote[];
  readonly unusedDegrades: readonly string[];
  readonly renamed: readonly { readonly name: string; readonly requested: string }[];
}

export class MappingError extends Error {
  readonly shapes: readonly UnmappedShape[];

  constructor(shapes: readonly UnmappedShape[], specifier: string) {
    const lines = shapes.map((shape) => `  ${shape.path}\n      ${shape.zodType}: ${shape.reason}`);
    super(
      `${shapes.length} schema shape${shapes.length === 1 ? "" : "s"} in '${specifier}' fall outside the closed `
        + `type-mapping table:\n${lines.join("\n")}\n`
        + "Add each path above to the module's \"unknownDegrade\" list with a reason to accept `unknown` there.",
    );
    this.name = "MappingError";
    this.shapes = shapes;
  }
}

interface CaseTag {
  readonly enumName: string;
  readonly member: string;
  readonly discriminator: string;
}

interface NamedNode {
  readonly schema: ZodSchema;
  readonly name: string;
  readonly path: string;
}

const TRANSPARENT: ReadonlySet<string> = new Set(["optional", "nullable", "readonly", "nonoptional"]);

/**
 * A self-referential schema reaches a fixed point through object identity, but
 * a shape getter that rebuilds its schemas on every read never does. The cap
 * turns that into a diagnostic instead of a stack overflow.
 */
const MAX_SCHEMA_DEPTH = 200;

function def(schema: ZodSchema): Record<string, unknown> {
  return schema._def as unknown as Record<string, unknown>;
}

function zodType(schema: ZodSchema): string {
  return schema._def.type;
}

function shapeOf(schema: ZodSchema): Record<string, ZodSchema> {
  const shape = def(schema)["shape"];
  return (typeof shape === "object" && shape !== null ? shape : {}) as Record<string, ZodSchema>;
}

/**
 * How an object schema answers a key it does not declare. D102 ruling 2 makes
 * surplus-field stripping the permanent semantics of a VelarScript record, so
 * the three answers stand in three different relations to it:
 *
 * | zod | surplus key | Vel record `parse` | relation |
 * | --- | --- | --- | --- |
 * | `z.object` | strips it | strips it | equivalent, sample for sample |
 * | `z.strictObject` | rejects the value | strips it | widened; counted |
 * | `z.looseObject`, `.catchall(T)` | keeps it in the parsed value | strips it | the parsed value differs |
 *
 * Only the third loses data a consumer could read, so only it is refused.
 */
function surplusKeys(schema: ZodSchema): "strip" | "reject" | "keep" {
  const catchall = def(schema)["catchall"];
  if (catchall === undefined) return "strip";
  return isZodSchema(catchall) && zodType(catchall) === "never" ? "reject" : "keep";
}

function literalValues(schema: ZodSchema): readonly unknown[] {
  const values = def(schema)["values"];
  return Array.isArray(values) ? values : [];
}

function enumWireValues(schema: ZodSchema): readonly unknown[] {
  const entries = def(schema)["entries"];
  if (typeof entries !== "object" || entries === null) return [];
  return Object.values(entries as Record<string, unknown>);
}

/**
 * D102 ruling 1: an enum member's wire value is a string or a safe integer.
 * Nothing else backs a member — a boolean, a fractional number, a bigint, and
 * `null` all have to be named rather than guessed at.
 */
type WireValue = string | number;

function isWireValue(value: unknown): value is WireValue {
  return typeof value === "string" || (typeof value === "number" && Number.isSafeInteger(value));
}

/** Says what a value is, without `JSON.stringify`, which throws on a bigint. */
function describeValue(value: unknown): string {
  if (typeof value === "bigint") return `the bigint ${value.toString(10)}n`;
  if (typeof value === "boolean") return `the boolean ${String(value)}`;
  if (value === null) return "null";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return `${String(value)}, which is not a finite number`;
    if (!Number.isInteger(value)) return `${String(value)}, which is not a whole number`;
    return `${String(value)}, which is outside the safe integer range`;
  }
  if (typeof value === "undefined") return "undefined";
  return `a ${typeof value}`;
}

/**
 * Says why a tuple has no VelarScript type, and why the near miss is refused
 * rather than applied.
 *
 * A tuple is a fixed-length heterogeneous sequence. VelarScript's positional
 * collection is `List<T>` — one element type, any length — and the language has
 * nothing else that holds values by position: a record holds them by name.
 * So a tuple's two claims, its arity and its per-position types, have no Vel
 * spelling at all.
 *
 * The near miss is `List<A | B>`, and this table refuses it. Every divergence
 * the table declares is a widening on one nameable dimension that is *inherent*
 * to a mapping — a record is the only thing an object can become, so
 * `z.strictObject`'s surplus-key widening is forced rather than chosen. A list
 * is not the only thing a tuple could become; it is a substitution, and it
 * diverges on two dimensions at once: the list accepts an empty value, a
 * reordered one, and a longer one, none of which the tuple accepts. Arity and
 * order are the whole content of a positional contract, so a type that drops
 * both would describe the wire incorrectly while reading as though it described
 * it — which is worse for a consumer than being told the shape has no type.
 *
 * Both exits are named, because a refusal that names none is a dead end:
 * exempting the path accepts the position as `unknown` (right where the shape
 * is built rather than parsed), and on the contract side a wire tuple is
 * usually a record with its field names left out, which maps exactly.
 */
function tupleRefusal(schema: ZodSchema): string {
  const items = def(schema)["items"];
  const count = Array.isArray(items) ? items.length : 0;
  const fixed = `${String(count)} element${count === 1 ? "" : "s"}`;
  // The rest form is not fixed-length, and saying it was would be the one
  // inaccuracy a reader could check against their own schema.
  const shape = isZodSchema(def(schema)["rest"])
    ? `a tuple of ${fixed} and a rest element is a positional shape`
    : `a tuple of ${fixed} is a fixed-length positional shape`;
  return `${shape}, and VelarScript's positional collection is `
    + "List<T> — one element type, any length — so no Vel type carries this tuple's arity or its per-position "
    + "types. Widening it to a List of the element union is refused rather than applied: that List also accepts "
    + "an empty value, a reordered one, and a longer one, and every divergence this table declares is a widening "
    + "inherent to a mapping rather than a substitution of one shape for another. On the contract side, a wire "
    + "tuple is usually a record with its field names left out, and z.object() maps exactly";
}

/** Names the one rule every wire value has to satisfy, in one wording. */
function wireValueRefusal(value: unknown): string {
  const rule = "a VelarScript enum member's wire value is a string or a safe integer (D102 ruling 1)";
  // D102 extended wire values from strings to integers and stopped there. A
  // boolean or null singleton is not a shape the language declines to spell; it
  // is one nothing has ruled on, and saying so is the accurate refusal.
  const unruled = typeof value === "boolean" || value === null
    ? ", and no ruling extends it to a boolean or a null singleton"
    : "";
  return `${describeValue(value)} cannot back an enum member: ${rule}${unruled}`;
}

/**
 * zod 4 writes a chained constraint into `_def.checks`, but a top-level format
 * schema — `z.email()`, `z.uuid()`, `z.url()`, `z.iso.*()`, `z.int()` — carries
 * its constraint on `_def.format` / `_def.check` and leaves `_def.checks`
 * empty. Both are read, and both name the specific format rather than the
 * generic `string_format` wrapper, so the two spellings report identically.
 */
function checkNames(schema: ZodSchema): string[] {
  const names: string[] = [];
  const own = def(schema);
  const format = own["format"];
  const check = own["check"];
  if (typeof format === "string") names.push(format);
  else if (typeof check === "string") names.push(check);
  const checks = own["checks"];
  if (Array.isArray(checks)) {
    for (const entry of checks) {
      const core = (entry as { _zod?: { def?: { check?: unknown; format?: unknown } } })?._zod?.def;
      const named = typeof core?.format === "string" ? core.format : core?.check;
      names.push(typeof named === "string" ? named : "check");
    }
  }
  return names;
}

/** Names the shape a degrade actually covers: `optional pipe`, not just `optional`. */
function describeType(schema: ZodSchema): string {
  const parts: string[] = [];
  let current: ZodSchema | null = schema;
  while (current !== null && TRANSPARENT.has(zodType(current))) {
    parts.push(zodType(current));
    current = innerOf(current);
  }
  if (current !== null) parts.push(zodType(current));
  return parts.join(" ");
}

function innerOf(schema: ZodSchema): ZodSchema | null {
  const inner = def(schema)["innerType"];
  return isZodSchema(inner) ? inner : null;
}

/** `z.lazy` and getter-backed shapes are how zod writes a self-referential type. */
function resolveLazy(schema: ZodSchema): ZodSchema | null {
  const getter = def(schema)["getter"];
  if (typeof getter !== "function") return null;
  try {
    const resolved = (getter as () => unknown)();
    return isZodSchema(resolved) ? resolved : null;
  } catch {
    return null;
  }
}

/**
 * An exported `z.lazy()` stands for the schema it resolves to, so the export
 * name is claimed for that schema rather than for the wrapper. Naming the
 * wrapper would spend the export's name and leave the record it wraps renamed.
 * A wrapper that resolves to nothing keeps itself, and is refused by name.
 */
function lazyTarget(schema: ZodSchema): ZodSchema {
  let current = schema;
  for (let step = 0; step < MAX_SCHEMA_DEPTH && zodType(current) === "lazy"; step += 1) {
    const resolved = resolveLazy(current);
    if (resolved === null) return current;
    current = resolved;
  }
  return current;
}

/**
 * Whether a wrapper chain leaves the value writable as `T?`. `.nonoptional()`
 * removes exactly the optionality it wraps, so an `optional` under it
 * contributes nothing; a `nullable` still does.
 */
function chainNullable(schema: ZodSchema): boolean {
  let current: ZodSchema | null = schema;
  let stripOptional = false;
  while (current !== null && TRANSPARENT.has(zodType(current))) {
    const type = zodType(current);
    if (type === "nullable") return true;
    if (type === "nonoptional") stripOptional = true;
    else if (type === "optional" && !stripOptional) return true;
    current = innerOf(current);
  }
  return false;
}

function optionsOf(schema: ZodSchema): readonly ZodSchema[] | null {
  const options = def(schema)["options"];
  return Array.isArray(options) ? (options as ZodSchema[]) : null;
}

export interface LowerOptions {
  readonly stripSuffix: string;
  readonly prefix: string;
  readonly degrades: readonly DegradeEntry[];
}

export function lowerModule(
  exports: readonly { readonly name: string; readonly schema: ZodSchema }[],
  options: LowerOptions,
  specifier: string,
): LowerResult {
  const registry = new NameRegistry();
  const declaredName = new Map<ZodSchema, string>();
  const canonicalPath = new Map<ZodSchema, string>();
  const named: NamedNode[] = [];
  const caseTags = new Map<ZodSchema, CaseTag>();
  const tagEnums: Declaration[] = [];
  /** Unions whose cases were already refused; lowering them again only repeats it. */
  const brokenUnions = new Set<ZodSchema>();
  const degradeByPath = new Map(options.degrades.map((entry) => [entry.path, entry]));
  const usedDegrades = new Set<string>();
  const applied: AppliedDegrade[] = [];
  const constraints: ConstraintNote[] = [];
  const unmapped: UnmappedShape[] = [];
  const exportNames = new Map<string, string>();
  const counters = new Map<string, { count: number; paths: string[] }>();
  const discovered = new Set<ZodSchema>();

  function note(kind: string, path: string): void {
    let entry = counters.get(kind);
    if (entry === undefined) {
      entry = { count: 0, paths: [] };
      counters.set(kind, entry);
    }
    entry.count += 1;
    if (entry.paths.length < 5) entry.paths.push(path);
  }

  // Two shapes can be refused at one path — a wrapper and what it wraps share
  // it — so only an identical repeat of the same refusal is collapsed.
  function refuse(path: string, schema: ZodSchema, reason: string): void {
    const type = zodType(schema);
    if (unmapped.some((shape) => shape.path === path && shape.zodType === type && shape.reason === reason)) return;
    unmapped.push({ path, zodType: type, reason });
  }

  function remember(schema: ZodSchema, path: string): void {
    if (!canonicalPath.has(schema)) canonicalPath.set(schema, path);
  }

  function declare(schema: ZodSchema, path: string, requested: string): string {
    const existing = declaredName.get(schema);
    if (existing !== undefined) return existing;
    remember(schema, path);
    const name = registry.claim(requested);
    declaredName.set(schema, name);
    named.push({ schema, name, path: canonicalPath.get(schema) ?? path });
    return name;
  }

  // ── Pass 1: names, canonical paths, discriminated-union tags ──────────────
  //
  // Naming runs before lowering so a record that is both an export and a union
  // case reads under its exported name, whichever path reaches it first.

  // A `z.lazy()` export stands for the schema it resolves to, so it claims that
  // schema's name — but only after every direct export has claimed one, or an
  // alias would take the name of the record it merely points at.
  const declaredExports = new Map<string, string>();
  for (const pass of [false, true]) {
    for (const entry of exports) {
      if ((zodType(entry.schema) === "lazy") !== pass) continue;
      const name = `${options.prefix}${pascalCase(stripSuffix(entry.name, options.stripSuffix))}`;
      declaredExports.set(entry.name, declare(lazyTarget(entry.schema), entry.name, name));
    }
  }
  for (const entry of exports) exportNames.set(entry.name, declaredExports.get(entry.name)!);

  function discover(schema: ZodSchema, path: string, hint: string, depth = 0): void {
    // An exemption covers the path that declares it and nothing else, so a
    // schema reached through that path is neither walked nor named there. The
    // same schema reached anywhere else is still walked, and answers at its own
    // path rather than borrowing this one's exemption.
    if (degradeByPath.has(path)) return;
    remember(schema, path);
    if (discovered.has(schema)) return;
    discovered.add(schema);
    const canonical = canonicalPath.get(schema) ?? path;
    if (depth > MAX_SCHEMA_DEPTH) {
      refuse(canonical, schema, `nesting exceeds ${MAX_SCHEMA_DEPTH} levels; a shape schema that rebuilds itself on every read cannot be walked`);
      return;
    }
    const type = zodType(schema);
    if (TRANSPARENT.has(type)) {
      const inner = innerOf(schema);
      if (inner !== null) discover(inner, canonical, hint, depth + 1);
      return;
    }
    switch (type) {
      case "literal":
        if (literalValues(schema).every(isWireValue)) {
          declare(schema, canonical, `${options.prefix}${hint}`);
        }
        return;
      case "enum":
        declare(schema, canonical, `${options.prefix}${hint}`);
        return;
      case "object": {
        const name = declare(schema, canonical, `${options.prefix}${hint}`);
        discoverFields(schema, canonical, childHint(name), depth);
        return;
      }
      case "array": {
        const element = def(schema)["element"];
        if (isZodSchema(element)) discover(element, `${canonical}[]`, `${hint}Item`, depth + 1);
        return;
      }
      case "record": {
        const value = def(schema)["valueType"];
        if (isZodSchema(value)) discover(value, `${canonical}{}`, `${hint}Value`, depth + 1);
        return;
      }
      case "union": {
        const arms = optionsOf(schema);
        if (arms === null) return;
        const discriminator = def(schema)["discriminator"];
        if (typeof discriminator === "string") {
          discoverDiscriminated(schema, canonical, hint, discriminator, arms, depth);
          return;
        }
        arms.forEach((option, index) => discover(option, `${canonical}|${index}`, `${hint}Option${index}`, depth + 1));
        return;
      }
      case "lazy": {
        const resolved = resolveLazy(schema);
        if (resolved === null) {
          refuse(canonical, schema, "z.lazy() did not resolve to a schema");
          return;
        }
        discover(resolved, canonical, hint, depth + 1);
        return;
      }
      default:
        return;
    }
  }

  /**
   * A node that already carries a declared name lends that name to its
   * children, so a nested shape reads under the declaration a reader sees
   * rather than under whichever path happened to reach it first.
   */
  function childHint(name: string): string {
    return options.prefix.length > 0 && name.startsWith(options.prefix) ? name.slice(options.prefix.length) : name;
  }

  function discoverFields(schema: ZodSchema, path: string, hint: string, depth: number): void {
    const tag = caseTags.get(schema);
    for (const [key, value] of Object.entries(shapeOf(schema))) {
      if (tag !== undefined && key === tag.discriminator) continue;
      discover(value, `${path}.${key}`, `${hint}${pascalCase(key)}`, depth + 1);
    }
  }

  function discoverDiscriminated(
    schema: ZodSchema,
    path: string,
    hint: string,
    discriminator: string,
    cases: readonly ZodSchema[],
    depth: number,
  ): void {
    const unionName = declare(schema, path, `${options.prefix}${hint}`);
    const caseHint = childHint(unionName);
    const enumName = registry.claim(`${unionName}Tag`);
    const members: EnumMember[] = [];
    const memberNames = new NameRegistry();
    // Keyed on the value itself, so `"2"` and `2` stay two wire values — which
    // is the language's own rule: neither parses as the other.
    const wires = new Set<WireValue>();
    let usable = true;
    cases.forEach((option, index) => {
      const casePath = `${path}|${index}`;
      remember(option, casePath);
      const canonical = canonicalPath.get(option) ?? casePath;
      if (zodType(option) !== "object") {
        refuse(canonical, option, "a discriminated-union case must be an object schema");
        usable = false;
        return;
      }
      const tagSchema = shapeOf(option)[discriminator];
      if (tagSchema === undefined || zodType(tagSchema) !== "literal") {
        refuse(canonical, option, `case declares no literal '${discriminator}' discriminator`);
        usable = false;
        return;
      }
      const values = literalValues(tagSchema);
      if (values.length !== 1) {
        refuse(`${canonical}.${discriminator}`, tagSchema, "a discriminator must be exactly one literal value");
        usable = false;
        return;
      }
      if (!isWireValue(values[0])) {
        refuse(`${canonical}.${discriminator}`, tagSchema, `a discriminator names one enum member, and ${wireValueRefusal(values[0])}`);
        usable = false;
        return;
      }
      const wire = values[0];
      // zod defers this to the first parse, where it throws. Two cases behind
      // one tag would emit two enum members carrying the same runtime value,
      // and neither the tag nor the union would narrow.
      if (wires.has(wire)) {
        refuse(
          `${canonical}.${discriminator}`,
          tagSchema,
          `discriminator value ${JSON.stringify(wire)} is declared by more than one case of this union, `
            + "so the tag names no single case",
        );
        usable = false;
        return;
      }
      wires.add(wire);
      const base = wireMemberName(wire);
      if (base === null) {
        refuse(`${canonical}.${discriminator}`, tagSchema, `tag ${JSON.stringify(wire)} has no VelarScript identifier form`);
        usable = false;
        return;
      }
      const existing = caseTags.get(option);
      if (existing !== undefined && existing.enumName !== enumName) {
        refuse(
          canonical,
          option,
          `case record is shared with discriminated union '${existing.enumName}'; one record cannot carry two tag enums`,
        );
        usable = false;
        return;
      }
      const member = memberNames.claim(base);
      members.push({ name: member, wire: member === wire ? null : wire });
      caseTags.set(option, { enumName, member, discriminator });
      // A string tag names its case after the wire spelling; an integer has no
      // readable spelling of its own, so the case reads under the member name
      // the reader will actually see (`FrameValue2`, not `Frame2`).
      const caseSuffix = typeof wire === "string" ? pascalCase(wire) : pascalCase(base);
      const caseName = declare(option, canonical, `${options.prefix}${caseHint}${caseSuffix}`);
      discovered.add(option);
      discoverFields(option, canonical, childHint(caseName), depth + 1);
    });
    if (!usable) {
      brokenUnions.add(schema);
      return;
    }
    tagEnums.push({
      kind: "enum",
      name: enumName,
      members,
      doc: [`Discriminator '${discriminator}' of ${unionName}.`],
    });
  }

  for (const entry of exports) {
    discover(entry.schema, entry.name, stripSuffix(entry.name, options.stripSuffix));
  }

  // ── Pass 2: bodies ────────────────────────────────────────────────────────
  //
  // Every path here is the path that reaches the position being lowered, not
  // the canonical path of the schema that sits in it. An exemption and a
  // refusal are both statements about a position, and a schema object shared by
  // two records occupies two of them.

  // A declaration whose own path is exempted stands for `unknown`. Handing that
  // name to another position would spend one declared exemption on a second
  // path, so every other reference to it is refused where it appears.
  const exemptedDeclarations = new Map<ZodSchema, string>();
  for (const node of named) {
    if (degradeByPath.has(node.path)) exemptedDeclarations.set(node.schema, node.path);
  }

  function applyDegrade(path: string, schema: ZodSchema, degrade: DegradeEntry): VelType {
    usedDegrades.add(path);
    if (!applied.some((entry) => entry.path === path)) {
      applied.push({ path, reason: degrade.reason, zodType: describeType(schema) });
    }
    // The exemption opens the value, not the key. A wrapper chain that lets the
    // sender leave the key out has to keep saying so, or the generated record
    // demands a key zod accepts as absent.
    return chainNullable(schema) ? optional(PRIMITIVE_UNKNOWN) : PRIMITIVE_UNKNOWN;
  }

  /** `T?` over a `null` is the one shape VelarScript cannot spell; it is counted. */
  function optionalOf(lowered: VelType, path: string): VelType {
    if (lowered.kind === "primitive" && lowered.name === "null") note("optional-null-widened-to-unknown", path);
    return optional(lowered);
  }

  function reference(schema: ZodSchema, path: string, stripOptional = false): VelType {
    const degrade = degradeByPath.get(path);
    if (degrade !== undefined) return applyDegrade(path, schema, degrade);
    const type = zodType(schema);
    if (TRANSPARENT.has(type)) {
      const inner = innerOf(schema);
      if (inner === null) {
        refuse(path, schema, "wrapper declares no inner schema");
        return PRIMITIVE_UNKNOWN;
      }
      // `.nonoptional()` takes back exactly the optionality it wraps. Carrying
      // the inner `?` outward would accept an absent key that zod rejects.
      if (type === "nonoptional") return reference(inner, path, true);
      if (type === "optional" && stripOptional) return reference(inner, path, true);
      if (type === "optional") note("optional-accepts-null", path);
      if (type === "nullable") note("nullable-accepts-absent", path);
      const lowered = reference(inner, path, stripOptional);
      return type === "optional" || type === "nullable" ? optionalOf(lowered, path) : lowered;
    }
    if (type === "lazy") {
      const resolved = resolveLazy(schema);
      if (resolved === null) {
        refuse(path, schema, "z.lazy() did not resolve to a schema");
        return PRIMITIVE_UNKNOWN;
      }
      return reference(resolved, path, stripOptional);
    }
    const exempted = exemptedDeclarations.get(schema);
    if (exempted !== undefined) {
      refuse(
        path,
        schema,
        `this schema is exempted to unknown at '${exempted}', and an exemption covers only the path that declares it; `
          + `add '${path}' to "unknownDegrade" with its own reason to accept unknown here too`,
      );
      return PRIMITIVE_UNKNOWN;
    }
    const name = declaredName.get(schema);
    if (name !== undefined) return { kind: "named", name };
    return structure(schema, path);
  }

  // One schema carries one set of refinements however many positions hold it,
  // so the note is recorded once, under the path the walk first read it at.
  const checked = new Set<ZodSchema>();

  function recordChecks(schema: ZodSchema, path: string): void {
    const checks = checkNames(schema);
    if (checks.length === 0) return;
    if (checked.has(schema)) return;
    checked.add(schema);
    constraints.push({ path: canonicalPath.get(schema) ?? path, zodType: zodType(schema), checks });
  }

  function structure(schema: ZodSchema, path: string): VelType {
    const type = zodType(schema);
    recordChecks(schema, path);
    switch (type) {
      case "string":
        return PRIMITIVE_STRING;
      case "number":
        return PRIMITIVE_NUMBER;
      case "boolean":
        return PRIMITIVE_BOOL;
      case "null":
        return PRIMITIVE_NULL;
      case "undefined":
        // Interop normalizes an absent JavaScript value to `null`.
        note("undefined-normalized-to-null", path);
        return PRIMITIVE_NULL;
      case "unknown":
        return PRIMITIVE_UNKNOWN;
      case "array": {
        const element = def(schema)["element"];
        if (!isZodSchema(element)) {
          refuse(path, schema, "array declares no element schema");
          return PRIMITIVE_UNKNOWN;
        }
        return { kind: "list", element: reference(element, `${path}[]`) };
      }
      case "record": {
        const key = def(schema)["keyType"];
        const value = def(schema)["valueType"];
        if (!isZodSchema(key) || zodType(key) !== "string") {
          refuse(
            path,
            schema,
            `Record<T> takes plain string keys; this record's key schema is `
              + `'${isZodSchema(key) ? zodType(key) : "missing"}'`,
          );
          return PRIMITIVE_UNKNOWN;
        }
        if (!isZodSchema(value)) {
          refuse(path, schema, "record declares no value schema");
          return PRIMITIVE_UNKNOWN;
        }
        return { kind: "map", value: reference(value, `${path}{}`) };
      }
      case "union": {
        const arms = optionsOf(schema);
        if (arms === null) {
          refuse(path, schema, "union declares no options");
          return PRIMITIVE_UNKNOWN;
        }
        if (arms.some((option) => isRecordLike(option))) {
          refuse(path, schema, "a record union without a discriminator has no checked narrowing in VelarScript");
          return PRIMITIVE_UNKNOWN;
        }
        const united = flattenUnion(arms.map((option, index) => reference(option, `${path}|${index}`)));
        // A union carrying `z.null()` becomes `T?`, and a `T?` field accepts an
        // absent key that the union alone would refuse.
        if (united.kind === "optional") note("nullable-accepts-absent", path);
        return united;
      }
      case "object":
        refuse(path, schema, "object shape was not registered during naming");
        return PRIMITIVE_UNKNOWN;
      case "literal": {
        // Naming declared every literal whose values are all wire values, so a
        // literal that reaches here carries at least one that is not.
        const offending = literalValues(schema).find((value) => !isWireValue(value));
        refuse(path, schema, wireValueRefusal(offending));
        return PRIMITIVE_UNKNOWN;
      }
      case "any":
        refuse(path, schema, "z.any() opts out of validation; declare z.unknown() or degrade this path explicitly");
        return PRIMITIVE_UNKNOWN;
      case "never":
        refuse(path, schema, "z.never() accepts nothing and has no VelarScript type");
        return PRIMITIVE_UNKNOWN;
      case "default":
      case "prefault":
        refuse(path, schema, "a default value changes the parsed result, so the accepted wire shape is not the Vel type");
        return PRIMITIVE_UNKNOWN;
      case "catch":
        refuse(path, schema, "a catch fallback turns a rejection into a value, which is not a type");
        return PRIMITIVE_UNKNOWN;
      case "pipe":
      case "transform":
        refuse(path, schema, "transform and effect schemas parse to a different value than they accept");
        return PRIMITIVE_UNKNOWN;
      case "date":
        refuse(path, schema, "z.date() is a host Date instance, not JSON wire data");
        return PRIMITIVE_UNKNOWN;
      case "tuple":
        refuse(path, schema, tupleRefusal(schema));
        return PRIMITIVE_UNKNOWN;
      default:
        refuse(path, schema, "no entry in the closed type-mapping table");
        return PRIMITIVE_UNKNOWN;
    }
  }

  function isRecordLike(schema: ZodSchema, depth = 0): boolean {
    if (depth > MAX_SCHEMA_DEPTH) return false;
    const type = zodType(schema);
    if (TRANSPARENT.has(type)) {
      const inner = innerOf(schema);
      return inner === null ? false : isRecordLike(inner, depth + 1);
    }
    // A self-referential arm is written `z.lazy(() => Record)`, and it is as
    // much a record as the one spelled out.
    if (type === "lazy") {
      const resolved = resolveLazy(schema);
      return resolved === null ? false : isRecordLike(resolved, depth + 1);
    }
    return type === "object" || type === "union";
  }

  function flattenUnion(arms: readonly VelType[]): VelType {
    let nullable = false;
    const flat: VelType[] = [];
    const seen = new Set<string>();
    const push = (type: VelType): void => {
      const key = JSON.stringify(type);
      if (seen.has(key)) return;
      seen.add(key);
      flat.push(type);
    };
    for (const arm of arms) {
      let inner = arm;
      if (inner.kind === "optional") {
        nullable = true;
        inner = inner.inner;
      }
      if (inner.kind === "primitive" && inner.name === "null") {
        nullable = true;
        continue;
      }
      if (inner.kind === "union") {
        for (const nested of inner.options) push(nested);
        continue;
      }
      push(inner);
    }
    if (flat.length === 0) return PRIMITIVE_NULL;
    const union: VelType = flat.length === 1 ? flat[0]! : { kind: "union", options: flat };
    return nullable ? optional(union) : union;
  }

  function enumDeclaration(schema: ZodSchema, name: string, path: string): Declaration | null {
    const wires = zodType(schema) === "enum" ? enumWireValues(schema) : literalValues(schema);
    const members: EnumMember[] = [];
    const memberNames = new NameRegistry();
    // Value identity across the two wire kinds, which is the language's rule:
    // a `Set` separates the string `"2"` from the number `2`, and both may
    // stand in one enum because neither parses as the other.
    const seen = new Set<WireValue>();
    for (const wire of wires) {
      if (!isWireValue(wire)) {
        refuse(path, schema, wireValueRefusal(wire));
        return null;
      }
      if (seen.has(wire)) continue;
      seen.add(wire);
      const base = wireMemberName(wire);
      if (base === null) {
        refuse(path, schema, `value ${JSON.stringify(wire)} has no VelarScript identifier form`);
        return null;
      }
      const member = memberNames.claim(base);
      members.push({ name: member, wire: member === wire ? null : wire });
    }
    if (members.length === 0) {
      refuse(path, schema, "an enum needs at least one member");
      return null;
    }
    return { kind: "enum", name, members, doc: [`Wire values of ${path}.`] };
  }

  function bodyOf(node: NamedNode): Declaration | null {
    const { schema, name, path } = node;
    // A refinement on a record or an enum is as much the consumer's business as
    // one on a string, and a named node never reaches `structure`.
    recordChecks(schema, path);
    const degrade = degradeByPath.get(path);
    if (degrade !== undefined) {
      // An exported schema the table refuses outright still keeps its name, so
      // the consuming module's import list does not silently lose an export.
      return {
        kind: "alias",
        name,
        type: applyDegrade(path, schema, degrade),
        doc: [`Degraded to unknown: ${path}.`],
      };
    }
    const type = zodType(schema);
    // A wrapper and a `z.lazy()` both stand for what they hold; `reference`
    // reads either one, and refuses in its own words when it cannot.
    if (TRANSPARENT.has(type) || type === "lazy") {
      return { kind: "alias", name, type: reference(schema, path), doc: [`Alias of ${path}.`] };
    }
    switch (type) {
      case "enum":
      case "literal":
        return enumDeclaration(schema, name, path);
      case "object": {
        const surplus = surplusKeys(schema);
        if (surplus === "keep") {
          refuse(
            path,
            schema,
            "a catchall object keeps its surplus keys in the parsed value, which a fixed record shape cannot carry",
          );
          return null;
        }
        const entries = Object.entries(shapeOf(schema));
        if (entries.length === 0) {
          refuse(path, schema, "VelarScript has no zero-field record declaration");
          return null;
        }
        // A plain `z.object` strips a surplus key and so does the record, so
        // there is no widening here to report. Only `z.strictObject`, which
        // rejects the whole value, is wider on the Vel side.
        if (surplus === "reject") note("strict-unknown-keys", path);
        const tag = caseTags.get(schema);
        const fields: RecordField[] = [];
        for (const [key, value] of entries) {
          if (!isVelarIdentifier(key)) {
            refuse(`${path}.${key}`, value, `field name '${key}' is not a VelarScript identifier`);
            continue;
          }
          if (tag !== undefined && key === tag.discriminator) {
            fields.push({ name: key, type: { kind: "enumMember", enumName: tag.enumName, member: tag.member } });
            continue;
          }
          fields.push({ name: key, type: reference(value, `${path}.${key}`) });
        }
        if (fields.length !== entries.length) return null;
        return { kind: "record", name, fields, doc: [`Record shape of ${path}.`] };
      }
      case "union": {
        const arms = optionsOf(schema);
        if (arms === null) {
          refuse(path, schema, "union declares no options");
          return null;
        }
        const discriminator = def(schema)["discriminator"];
        if (typeof discriminator === "string") {
          // Naming already said what is wrong with this union's cases; lowering
          // them would only add a second diagnostic for the same fault.
          if (brokenUnions.has(schema)) return null;
          return {
            kind: "alias",
            name,
            type: { kind: "union", options: arms.map((option, index) => reference(option, `${path}|${index}`)) },
            doc: [`Discriminated union of ${path} on '${discriminator}'.`],
          };
        }
        const lowered = structure(schema, path);
        return { kind: "alias", name, type: lowered, doc: [`Union of ${path}.`] };
      }
      default:
        return { kind: "alias", name, type: structure(schema, path), doc: [`Alias of ${path}.`] };
    }
  }

  const bodies = new Map<string, Declaration>();
  for (const node of named) {
    const declaration = bodyOf(node);
    if (declaration !== null) bodies.set(declaration.name, declaration);
  }
  for (const declaration of tagEnums) bodies.set(declaration.name, declaration);

  if (unmapped.length > 0) {
    unmapped.sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));
    throw new MappingError(unmapped, specifier);
  }

  // A schema that is reachable only through a refused or degraded path leaves a
  // declaration nothing references. Emitting it would be noise, so the export
  // set is the reachability root.
  const roots = [...exportNames.values()];
  const kept = new Set<string>();
  const queue = [...roots];
  while (queue.length > 0) {
    const name = queue.pop()!;
    if (kept.has(name)) continue;
    kept.add(name);
    const declaration = bodies.get(name);
    if (declaration === undefined) continue;
    for (const referenced of referencedNames(declaration)) queue.push(referenced);
  }

  const declarations = [...bodies.values()]
    .filter((declaration) => kept.has(declaration.name))
    .sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));

  const boundaryNotes: BoundaryNote[] = [...counters.entries()]
    .map(([kind, entry]) => ({ kind, detail: boundaryDetail(kind), count: entry.count, samplePaths: entry.paths }))
    .sort((left, right) => (left.kind < right.kind ? -1 : 1));

  constraints.sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));
  applied.sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));

  return {
    declarations,
    exportNames,
    degrades: applied,
    constraints,
    boundaryNotes,
    unusedDegrades: options.degrades.map((entry) => entry.path).filter((path) => !usedDegrades.has(path)),
    renamed: registry.collisions,
  };
}

function referencedNames(declaration: Declaration): string[] {
  const found: string[] = [];
  const visit = (type: VelType): void => {
    switch (type.kind) {
      case "named":
        found.push(type.name);
        return;
      case "enumMember":
        found.push(type.enumName);
        return;
      case "list":
        visit(type.element);
        return;
      case "map":
        visit(type.value);
        return;
      case "optional":
        visit(type.inner);
        return;
      case "union":
        for (const option of type.options) visit(option);
        return;
      default:
        return;
    }
  };
  if (declaration.kind === "record") for (const field of declaration.fields) visit(field.type);
  if (declaration.kind === "alias") visit(declaration.type);
  return found;
}

const BOUNDARY_DETAIL: Readonly<Record<string, string>> = {
  "strict-unknown-keys":
    "z.strictObject rejects an unknown key; a VelarScript record accepts the value and drops the key. The generated "
    + "type is wider than the zod schema for surplus fields.",
  "optional-accepts-null":
    "z.optional() rejects an explicit null; `T?` accepts it. This is the declared undefined-to-null interop "
    + "normalization.",
  "nullable-accepts-absent":
    "z.nullable(), and any union carrying z.null(), rejects an absent key; a `T?` field accepts it. This is the "
    + "declared undefined-to-null interop normalization.",
  "undefined-normalized-to-null":
    "z.undefined() accepts a present key holding undefined; `null` accepts a present key holding null. JSON "
    + "transport cannot carry undefined, so the two agree on every wire payload.",
  "optional-null-widened-to-unknown":
    "An optional or nullable z.null() accepts an absent key, and VelarScript writes no `null?`: a `null` field "
    + "rejects an absent key, and the compiler reads `null?` as redundant. The position is widened to `unknown?`, "
    + "which accepts an absent key as required and any value besides null as well.",
};

/** Exposed so a report renderer states a boundary widening in one wording. */
export function boundaryDetail(kind: string): string {
  return BOUNDARY_DETAIL[kind] ?? kind;
}
