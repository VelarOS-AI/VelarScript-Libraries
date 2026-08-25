# Changelog

## 0.1.4 — 2026-08-25

- Rebuild the frozen library artifact with VelarScript 0.15 and require the
  0.15 language generation.

## 0.1.3 — 2026-08-24

- Correct the supported VelarScript language generation to 0.14 and verify the
  published source and frozen artifact with CLI 0.14.2.

## 0.1.2 — 2026-08-24

- Publish the readable `.vel` source together with frozen Velar library ABI 1
  JavaScript, source map, portable type interface, and integrity receipt.
  Consumers execute the artifact without reparsing the source on later language
  generations.

## 0.1.1 — 2026-08-24

- Verify the adapter with VelarScript 0.14 and extend the declared compatible
  language range through the 0.14 generation.

## 0.1.0 — 2026-08-23

- Publish the companion package as `@velarscript-labs/yaml`, outside the
  Standard/toolchain scope.
- Add strict, size-bounded YAML parsing with duplicate-key and alias limits.
