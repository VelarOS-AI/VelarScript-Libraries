/**
 * Naming is the part of generation a reader notices first, so it is decided by
 * explicit rules rather than by walk order. Every name here is a pure function
 * of the canonical schema path plus a deterministic collision counter.
 */

/**
 * VelarScript source keywords. A generated declaration name is PascalCase and
 * therefore cannot collide, but an enum member name is camelCase and can.
 */
const VELAR_KEYWORDS: ReadonlySet<string> = new Set([
  "abstract", "and", "as", "assert", "async", "await", "break", "catch",
  "case", "class", "const", "continue", "constructor", "def", "else", "enum",
  "export", "extends", "extern", "false", "finally", "for", "from", "get",
  "if", "import", "in", "is", "js", "let", "match", "module", "not", "null",
  "or", "override", "pass", "private", "readonly", "return", "static", "super",
  "test", "throw", "true", "try", "type", "unsafe", "using", "while",
]);

/** `is`, `parse`, and `values` are the enum's reserved runtime surface. */
const ENUM_RESERVED: ReadonlySet<string> = new Set(["is", "parse", "values", "pass"]);

const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/u;

export function isVelarIdentifier(text: string): boolean {
  return IDENTIFIER.test(text);
}

export function isReservedEnumMember(name: string): boolean {
  return VELAR_KEYWORDS.has(name) || ENUM_RESERVED.has(name);
}

function words(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/gu, "$1 $2")
    .split(/[^A-Za-z0-9]+/u)
    .filter((part) => part.length > 0);
}

export function pascalCase(text: string): string {
  const parts = words(text);
  if (parts.length === 0) return "";
  return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}

export function camelCase(text: string): string {
  const pascal = pascalCase(text);
  if (pascal.length === 0) return "";
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/**
 * Turns one wire string into an enum member name. Returns `null` when the wire
 * string carries no letters or digits at all, which no readable name can
 * represent honestly.
 */
export function enumMemberName(wire: string): string | null {
  let name = camelCase(wire);
  if (name.length === 0) return null;
  if (/^[0-9]/u.test(name)) name = `value${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  if (isReservedEnumMember(name)) name = `${name}Value`;
  return isVelarIdentifier(name) ? name : null;
}

/** Deterministic collision resolution: the second claimant gets `2`, the third `3`. */
export class NameRegistry {
  readonly #taken = new Map<string, number>();
  readonly #collisions: { readonly name: string; readonly requested: string }[] = [];

  claim(requested: string): string {
    const existing = this.#taken.get(requested);
    if (existing === undefined) {
      this.#taken.set(requested, 1);
      return requested;
    }
    // The counter is per requested name, but the answer has to be free of every
    // name already handed out: with `Event2` claimed first, a second `Event`
    // must not be answered with `Event2` and collapse the two declarations.
    let next = existing + 1;
    while (this.#taken.has(`${requested}${next}`)) next += 1;
    const name = `${requested}${next}`;
    this.#taken.set(requested, next);
    this.#taken.set(name, 1);
    this.#collisions.push({ name, requested });
    return name;
  }

  has(name: string): boolean {
    return this.#taken.has(name);
  }

  get collisions(): readonly { readonly name: string; readonly requested: string }[] {
    return this.#collisions;
  }
}

export function stripSuffix(name: string, suffix: string): string {
  if (suffix.length > 0 && name.length > suffix.length && name.endsWith(suffix)) {
    return name.slice(0, -suffix.length);
  }
  return name;
}
