/** The VelarScript type shapes this generator is allowed to emit. */

export type VelType =
  | { readonly kind: "primitive"; readonly name: "string" | "number" | "bool" | "null" | "unknown" }
  | { readonly kind: "named"; readonly name: string }
  | { readonly kind: "enumMember"; readonly enumName: string; readonly member: string }
  | { readonly kind: "list"; readonly element: VelType }
  | { readonly kind: "map"; readonly value: VelType }
  | { readonly kind: "optional"; readonly inner: VelType }
  | { readonly kind: "union"; readonly options: readonly VelType[] };

export interface RecordField {
  readonly name: string;
  readonly type: VelType;
}

export interface EnumMember {
  readonly name: string;
  /**
   * The runtime wire value when it differs from the member name, otherwise
   * `null`. D102 ruling 1 extends it from a string to a string or a safe
   * integer; an integer is never spelled by the member name, so it is always
   * written out.
   */
  readonly wire: string | number | null;
}

export type Declaration =
  | { readonly kind: "record"; readonly name: string; readonly fields: readonly RecordField[]; readonly doc: readonly string[] }
  | { readonly kind: "enum"; readonly name: string; readonly members: readonly EnumMember[]; readonly doc: readonly string[] }
  | { readonly kind: "alias"; readonly name: string; readonly type: VelType; readonly doc: readonly string[] };

export const PRIMITIVE_STRING: VelType = { kind: "primitive", name: "string" };
export const PRIMITIVE_NUMBER: VelType = { kind: "primitive", name: "number" };
export const PRIMITIVE_BOOL: VelType = { kind: "primitive", name: "bool" };
export const PRIMITIVE_NULL: VelType = { kind: "primitive", name: "null" };
export const PRIMITIVE_UNKNOWN: VelType = { kind: "primitive", name: "unknown" };

/**
 * `T?` is the one canonical nullability shape: wrapping twice is still one `?`.
 *
 * Optionality always survives, because dropping it narrows: a record field
 * accepts an absent key only when it carries `?`, and `unknown` alone does not.
 * `null?` is the one shape the language will not spell — the compiler reads it
 * as redundant (VEL2012) while a plain `null` field still rejects an absent
 * key — so an optional `null` widens to `unknown?`, the narrowest shape that
 * accepts both. `lowerModule` counts that widening.
 */
export function optional(inner: VelType): VelType {
  if (inner.kind === "optional") return inner;
  if (inner.kind === "primitive" && inner.name === "null") return { kind: "optional", inner: PRIMITIVE_UNKNOWN };
  if (inner.kind === "union") {
    const flattened = inner.options.map((option) => (option.kind === "optional" ? option.inner : option));
    return { kind: "optional", inner: { kind: "union", options: flattened } };
  }
  return { kind: "optional", inner };
}

/** Renders one type in a field or alias position. */
export function renderType(type: VelType): string {
  switch (type.kind) {
    case "primitive":
      return type.name;
    case "named":
      return type.name;
    case "enumMember":
      return `${type.enumName}.${type.member}`;
    case "list":
      return `List<${renderType(type.element)}>`;
    case "map":
      return `Record<${renderType(type.value)}>`;
    case "optional":
      return `${renderInner(type.inner)}?`;
    case "union":
      return type.options.map(renderType).join(" | ");
  }
}

function renderInner(type: VelType): string {
  // `A | B?` is not the same statement as `(A | B)?`; the union form is
  // normalized into one trailing marker by `optional`, so a union under `?`
  // is written with parentheses.
  return type.kind === "union" ? `(${renderType(type)})` : renderType(type);
}
