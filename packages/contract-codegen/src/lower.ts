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
import { NameRegistry, enumMemberName, isVelarIdentifier, pascalCase, stripSuffix } from "./naming.js";
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

function isStrictObject(schema: ZodSchema): boolean {
  const catchall = def(schema)["catchall"];
  return isZodSchema(catchall) && zodType(catchall) === "never";
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

function checkNames(schema: ZodSchema): string[] {
  const checks = def(schema)["checks"];
  if (!Array.isArray(checks)) return [];
  return checks.map((check: unknown) => {
    const core = (check as { _zod?: { def?: { check?: unknown } } })?._zod?.def?.check;
    return typeof core === "string" ? core : "check";
  });
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

  function refuse(path: string, schema: ZodSchema, reason: string): void {
    if (unmapped.some((shape) => shape.path === path)) return;
    unmapped.push({ path, zodType: zodType(schema), reason });
  }

  function remember(schema: ZodSchema, path: string): void {
    if (!canonicalPath.has(schema)) canonicalPath.set(schema, path);
  }

  function pathOf(schema: ZodSchema, reaching: string): string {
    return canonicalPath.get(schema) ?? reaching;
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

  for (const entry of exports) {
    const name = `${options.prefix}${pascalCase(stripSuffix(entry.name, options.stripSuffix))}`;
    exportNames.set(entry.name, declare(entry.schema, entry.name, name));
  }

  function discover(schema: ZodSchema, path: string, hint: string): void {
    remember(schema, path);
    if (discovered.has(schema)) return;
    discovered.add(schema);
    const canonical = canonicalPath.get(schema) ?? path;
    if (degradeByPath.has(canonical)) return;
    const type = zodType(schema);
    if (TRANSPARENT.has(type)) {
      const inner = innerOf(schema);
      if (inner !== null) discover(inner, canonical, hint);
      return;
    }
    switch (type) {
      case "literal":
        if (literalValues(schema).every((value) => typeof value === "string")) {
          declare(schema, canonical, `${options.prefix}${hint}`);
        }
        return;
      case "enum":
        declare(schema, canonical, `${options.prefix}${hint}`);
        return;
      case "object": {
        const name = declare(schema, canonical, `${options.prefix}${hint}`);
        discoverFields(schema, canonical, childHint(name));
        return;
      }
      case "array": {
        const element = def(schema)["element"];
        if (isZodSchema(element)) discover(element, `${canonical}[]`, `${hint}Item`);
        return;
      }
      case "record": {
        const value = def(schema)["valueType"];
        if (isZodSchema(value)) discover(value, `${canonical}{}`, `${hint}Value`);
        return;
      }
      case "union": {
        const arms = optionsOf(schema);
        if (arms === null) return;
        const discriminator = def(schema)["discriminator"];
        if (typeof discriminator === "string") {
          discoverDiscriminated(schema, canonical, hint, discriminator, arms);
          return;
        }
        arms.forEach((option, index) => discover(option, `${canonical}|${index}`, `${hint}Option${index}`));
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

  function discoverFields(schema: ZodSchema, path: string, hint: string): void {
    const tag = caseTags.get(schema);
    for (const [key, value] of Object.entries(shapeOf(schema))) {
      if (tag !== undefined && key === tag.discriminator) continue;
      discover(value, `${path}.${key}`, `${hint}${pascalCase(key)}`);
    }
  }

  function discoverDiscriminated(
    schema: ZodSchema,
    path: string,
    hint: string,
    discriminator: string,
    cases: readonly ZodSchema[],
  ): void {
    const unionName = declare(schema, path, `${options.prefix}${hint}`);
    const caseHint = childHint(unionName);
    const enumName = registry.claim(`${unionName}Tag`);
    const members: EnumMember[] = [];
    const memberNames = new NameRegistry();
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
        refuse(canonical, option, `case declares no string literal '${discriminator}' discriminator`);
        usable = false;
        return;
      }
      const values = literalValues(tagSchema);
      if (values.length !== 1 || typeof values[0] !== "string") {
        refuse(`${canonical}.${discriminator}`, tagSchema, "a discriminator must be exactly one string literal");
        usable = false;
        return;
      }
      const wire = values[0];
      const base = enumMemberName(wire);
      if (base === null) {
        refuse(`${canonical}.${discriminator}`, tagSchema, `tag '${wire}' has no VelarScript identifier form`);
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
      const caseName = declare(option, canonical, `${options.prefix}${caseHint}${pascalCase(wire)}`);
      discovered.add(option);
      discoverFields(option, canonical, childHint(caseName));
    });
    if (!usable) return;
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

  function reference(schema: ZodSchema, reaching: string): VelType {
    const path = pathOf(schema, reaching);
    const degrade = degradeByPath.get(path);
    if (degrade !== undefined) {
      usedDegrades.add(path);
      if (!applied.some((entry) => entry.path === path)) {
        applied.push({ path, reason: degrade.reason, zodType: describeType(schema) });
      }
      return PRIMITIVE_UNKNOWN;
    }
    const type = zodType(schema);
    if (TRANSPARENT.has(type)) {
      const inner = innerOf(schema);
      if (inner === null) {
        refuse(path, schema, "wrapper declares no inner schema");
        return PRIMITIVE_UNKNOWN;
      }
      if (type === "optional") note("optional-accepts-null", path);
      if (type === "nullable") note("nullable-accepts-absent", path);
      const lowered = reference(inner, path);
      return type === "optional" || type === "nullable" ? optional(lowered) : lowered;
    }
    const name = declaredName.get(schema);
    if (name !== undefined) return { kind: "named", name };
    return structure(schema, path);
  }

  function structure(schema: ZodSchema, path: string): VelType {
    const type = zodType(schema);
    const checks = checkNames(schema);
    if (checks.length > 0 && !constraints.some((entry) => entry.path === path)) {
      constraints.push({ path, zodType: type, checks });
    }
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
      case "literal":
        refuse(
          path,
          schema,
          `literal values ${JSON.stringify(literalValues(schema))} are not all strings; VelarScript enums are `
            + "string-backed and the language has no numeric or boolean singleton type",
        );
        return PRIMITIVE_UNKNOWN;
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
      case "lazy":
        refuse(path, schema, "self-referential schemas are not lowered by this generator");
        return PRIMITIVE_UNKNOWN;
      default:
        refuse(path, schema, "no entry in the closed type-mapping table");
        return PRIMITIVE_UNKNOWN;
    }
  }

  function isRecordLike(schema: ZodSchema): boolean {
    const type = zodType(schema);
    if (TRANSPARENT.has(type)) {
      const inner = innerOf(schema);
      return inner === null ? false : isRecordLike(inner);
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
    const seen = new Set<string>();
    for (const wire of wires) {
      if (typeof wire !== "string") {
        refuse(path, schema, `value ${JSON.stringify(wire)} is not a string; VelarScript enums are string-backed`);
        return null;
      }
      if (seen.has(wire)) continue;
      seen.add(wire);
      const base = enumMemberName(wire);
      if (base === null) {
        refuse(path, schema, `value '${wire}' has no VelarScript identifier form`);
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
    const degrade = degradeByPath.get(path);
    if (degrade !== undefined) {
      // An exported schema the table refuses outright still keeps its name, so
      // the consuming module's import list does not silently lose an export.
      usedDegrades.add(path);
      if (!applied.some((entry) => entry.path === path)) {
        applied.push({ path, reason: degrade.reason, zodType: describeType(schema) });
      }
      return { kind: "alias", name, type: PRIMITIVE_UNKNOWN, doc: [`Degraded to unknown: ${path}.`] };
    }
    const type = zodType(schema);
    if (TRANSPARENT.has(type)) {
      const inner = innerOf(schema);
      if (inner === null) {
        refuse(path, schema, "wrapper declares no inner schema");
        return null;
      }
      if (type === "optional") note("optional-accepts-null", path);
      if (type === "nullable") note("nullable-accepts-absent", path);
      const lowered = reference(inner, path);
      return {
        kind: "alias",
        name,
        type: type === "optional" || type === "nullable" ? optional(lowered) : lowered,
        doc: [`Alias of ${path}.`],
      };
    }
    switch (type) {
      case "enum":
      case "literal":
        return enumDeclaration(schema, name, path);
      case "object": {
        if (!isStrictObject(schema)) {
          refuse(
            path,
            schema,
            def(schema)["catchall"] === undefined
              ? "z.object() strips unknown keys instead of rejecting them; declare z.strictObject() or degrade this path"
              : "a catchall object is not a fixed record shape",
          );
          return null;
        }
        const entries = Object.entries(shapeOf(schema));
        if (entries.length === 0) {
          refuse(path, schema, "VelarScript has no zero-field record declaration");
          return null;
        }
        note("strict-unknown-keys", path);
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
};

/** Exposed so a report renderer states a boundary widening in one wording. */
export function boundaryDetail(kind: string): string {
  return BOUNDARY_DETAIL[kind] ?? kind;
}
