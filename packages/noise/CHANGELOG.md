# Changelog

## 0.1.4 — 2026-08-24

- Correct the supported VelarScript language generation to 0.14 and verify the
  published source and frozen artifact with CLI 0.14.2.

## 0.1.3 — 2026-08-24

- Publish the readable `.vel` source together with frozen Velar library ABI 1
  JavaScript, source map, portable type interface, and integrity receipt.
  Consumers execute the artifact without reparsing the source on later language
  generations.

## 0.1.2 — 2026-08-24

- Support VelarScript language generation 0.14 while retaining 0.13
  compatibility.

## 0.1.1 — 2026-08-23

- Publish the companion package as `@velarscript-labs/noise`, outside the
  Standard/toolchain scope.
- Move ownership to the independent VelarScript Libraries repository.
- Add package-local deterministic, finite-coordinate, and packed-consumer gates.

Version 0.1.0 was published from the VelarScript Core repository.
