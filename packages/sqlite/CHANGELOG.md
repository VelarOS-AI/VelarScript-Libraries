# Changelog

## 0.2.2 — 2026-08-24

- Publish the readable `.vel` source together with frozen Node-targeted Velar
  library ABI 1 JavaScript, source map, portable type interface, and integrity
  receipt. Consumers execute the artifact without reparsing the source on later
  language generations.
- Depend on the matching Database ABI-artifact release.

## 0.2.1 — 2026-08-24

- Verify the adapter with VelarScript 0.14, extend the declared compatible
  language range through the 0.14 generation, and pin the matching Database
  compatibility release.

## 0.2.0 — 2026-08-23

- Publish the companion package as `@velarscript-labs/sqlite`, outside the
  Standard/toolchain scope.
- Replace the historical ORM-shaped adapter with a parameterized SQL capability.
- Add a bounded Worker queue, runtime-typed rows, automatic transaction scope,
  reentrancy rejection, safe-integer handling, and idempotent cleanup.

Version 0.1.0 was published from the VelarScript main repository and is not the
implementation restored here.
