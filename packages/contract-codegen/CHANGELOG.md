# Changelog

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
- Add the channel-table artifact: channel-name constants plus `Type<T>`
  bindings, and no transport stub.
- Add golden equivalence fixtures asserting that the generated `Type.parse`
  accepts a payload exactly when the zod schema does, outside the declared
  divergence classes.
