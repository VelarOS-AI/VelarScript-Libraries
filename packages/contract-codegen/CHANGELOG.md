# Changelog

## Unreleased

- Load a bundler-compiled contract package, with a new manifest-level
  `"loader": {"kind": "bundle"}`. A package compiled under TypeScript's
  `moduleResolution: "bundler"` emits extensionless relative specifiers that
  Node's ESM resolver does not complete, and bundler resolution is the majority
  form in a real TypeScript monorepo — every consumer was hand-rolling a
  pre-bundle outside the tool. The loader bundles the declared modules to
  self-contained ESM in a temporary directory and imports them from there:
  `zod` is always external and pinned to the path the target resolves it to,
  because this generator introspects the objects the target's own zod built;
  all entries are built together so a schema shared by two of them stays one
  object for the channel table to recognize; and the generated header still
  names the real package rather than the temporary copy. `esbuild` becomes the
  package's one production dependency, loaded only by this loader.
- Name the failure the bundle loader answers, when it is not in use: a bare
  `ERR_MODULE_NOT_FOUND` sent the reader looking for a file that was sitting
  right there. The refusal now says what a bundler-emitted specifier is and
  points at the loader.
- Stop the owning-package walk inside the contract's own tree. It climbed past
  every directory without a manifest until it found one, which for a contract
  bundled into the consuming project reached that project's `package.json` and
  wrote the consumer's name into the generated header as the contract's author —
  the one claim that line exists to deny. The walk now stops at the manifest's
  `resolveFrom`, and answers `null` rather than naming the caller; a manifest
  carrying no `name` (the `{"type": "module"}` marker in a compiled `dist/`) is
  passed over rather than treated as a boundary, and a file below `node_modules`
  but inside no package names none. The package's own fixture was reproducing
  the bug: its header credited this generator with authoring its own fixture.
- Refuse `--check` together with `--report <file>`. `--check` is documented to
  write nothing, and honouring `--report` had it write into the very tree the
  gate was checking. Check mode's machine-readable answer is `--json`, on
  stdout; the refusal says so and exits 2.
- Map an integer literal to an enum member carrying that number, which is D102
  ruling 1 §4. `z.literal(1)` becomes a single-member enum; an integer
  discriminator becomes a member of its union's tag enum; `z.enum({Low: 1})`
  reads the same way; and one enum may carry both wire kinds, unique by value
  identity, because the string `"2"` and the number `2` do not parse as each
  other. A negative value keeps its own member name (`valueMinus2`) so `-2` and
  `2` cannot collapse onto one. Boolean and `null` literals stay refused — no
  ruling covers them — and the stale "VelarScript enums are string-backed"
  wording is gone from every diagnostic, replaced by one that names the value
  and the rule it fell outside of.
- The two real targets lost 36 exemptions to that mapping: the agent's 73
  degrades become 52 and the kernel's 28 become 13, every dropped one an integer
  protocol-version literal that is now a pinned enum member.
- Output containing an integer wire value needs a VelarScript newer than
  `v0.20.1`, which no published release is yet; the package's own checks run
  against a sibling checkout through a `file:` devDependency, and the catalog
  states the range as `>0.20.1` rather than a version that cannot compile it.
- Accept a plain `z.object`. D102 ruling 2 makes surplus-field stripping the
  permanent semantics of a VelarScript record, which is exactly what `z.object`
  does — the two agree on every payload — while `z.strictObject` is the spelling
  that widens. The generator had it backwards: it refused the equivalent one and
  accepted the wider one. A plain object now lowers like a strict one and
  reports no `strict-unknown-keys` widening, because there is none. A catchall
  object (`z.looseObject`, `.catchall(T)`) stays refused, with its reason
  restated: it keeps the surplus key in the parsed value, which a fixed record
  shape cannot carry.
- Keep every claimed name distinct: the collision counter could hand a second
  claimant a name an earlier one already took, collapsing two declarations and
  emitting duplicate enum member names.
- Read a schema at the path that reaches it. An `unknownDegrade` exemption now
  covers only the path it declares; the same schema object standing in another
  record is refused there, by that path, instead of being opened silently.
- Lower an exported `z.lazy()` to the schema it resolves to, and resolve `lazy`
  when deciding whether a union arm is a record.
- Refuse a discriminated union that gives one discriminator value to two cases.
- Keep optionality wherever it is widened: `.nonoptional()` takes back the
  optionality it wraps, `z.unknown().optional()` becomes `unknown?`, and an
  optional `z.null()` becomes `unknown?` (the language writes no `null?`) under
  a new counted `optional-null-widened-to-unknown` class. An exempted position
  whose zod schema accepts an absent key lowers to `unknown?`, not `unknown`.
- Report the constraint on a zod 4 top-level format schema (`z.email()`,
  `z.uuid()`, `z.iso.*()`, `z.int()`), which lives on `_def.format` rather than
  `_def.checks`, and name the specific format in both spellings.
- Digest the definition zod actually holds: a check instance keeps it on
  `_zod.def` with no own enumerable key, so bound, pattern, predicate, and
  message changes were all invisible. Raise the walk depth from 64 to 512.
- Make the generation report machine-independent: `zod.path` becomes
  `zod.resolvedFrom` (the manifest's own `resolveFrom`), and `files[].status`
  reports what was on disk in both modes, with a separate `written` flag.
- Render and format the whole tree before writing any of it, so a formatter
  failure cannot leave a half-regenerated tree behind.
- Import the types module by the path between the two outputs, so a channel
  table in a subdirectory resolves.
- Refuse a channel table with no channels, and a runtime channel source that is
  a `Map`, a `Set`, or an array, instead of emitting a member-less enum.
- Run `velar.cmd` through the shell on Windows, which `spawn` has required
  since Node 20.12.

## 0.1.0 — 2026-08-27

- Publish the companion package as `@velarscript-labs/contract-codegen`, outside
  the Standard/toolchain scope.
- Generate VelarScript declarations from a contract package's zod schemas by
  runtime `_def` introspection; refuse a zod major other than 4 and name both
  versions.
- Add the JSON manifest input: module specifiers, export selection, output
  directory, naming rules, and per-path `unknown` degrade exemptions.
- Add the `velar-contract-codegen generate` CLI with a byte-comparing `--check`
  mode and a machine-readable generation report.
- Emit deterministic, name-sorted declarations through the consuming project's
  own `velar format`, with a header recording the tool version, source package
  version, and a digest of the source schemas.
- Map discriminated unions to a tag enum, one record per case, and a union
  alias; map non-identifier enum values through the member wire-value mechanism.
- Fail closed outside the mapping table with the schema path and the reason;
  report refinements and the three boundary widenings instead of dropping them.
- Lower `z.lazy` and other self-referential schemas to a record that names
  itself, which VelarScript records support.
- Add the channel-table artifact: channel-name constants plus `Type<T>`
  bindings, and no transport stub.
- Add golden equivalence fixtures asserting that the generated `Type.parse`
  accepts a payload exactly when the zod schema does, outside the declared
  divergence classes.
