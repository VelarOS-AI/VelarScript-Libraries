# Changelog

## 0.1.5 — 2026-08-27

- Rebuild the frozen library artifact with VelarScript 0.18 and require the
  0.18 language generation.

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
- Verify the source fallback with VelarScript 0.14 and extend its declared
  compatible language range through the 0.14 generation.

## 0.1.1 — 2026-08-23

- Publish the companion package as `@velarscript-labs/compression`, outside the
  Standard/toolchain scope.
- Move ownership to the independent VelarScript Libraries repository.
- Add package-local binary round-trip, output-bound, and packed-consumer gates.
- Size the decompression input chunk from `maxBytes` once instead of from the
  bytes produced so far. A tight budget previously floored the chunk at one
  byte, so a 64 MiB input became roughly 67 million synchronous pushes; the
  chunk is now `ceil(maxBytes / 1032)` clamped to 256 bytes through 64 KiB.
  The deliberate trade is a transient output overshoot of one chunk times 1032
  before `maxBytes` aborts the stream — about `maxBytes`, and 258 KiB for any
  smaller budget, which is exactly what the previous 256-byte chunk ceiling
  already allowed at a wide budget. The README states the bound.
- Reject a decompression stream that consumes more than 1 MiB of input without
  producing at least one output byte for every 64 input bytes. The threshold
  sits far above any legitimate stream — DEFLATE never expands its input by
  more than a fraction of a percent, and even a sync-flush-heavy stream stays
  well under 64 input bytes per output byte — while a zero-yield stream of
  empty stored blocks now aborts after roughly 1 MiB instead of after the
  whole input. A gzip member whose header metadata alone exceeds 1 MiB fails
  the same bound rather than decoding; the previous code accepted such a
  member only after seconds to minutes of one-byte pushes — an 8 MiB comment
  field took 158 seconds — so the README documents the header as consumed
  input.

Version 0.1.0 was published from the VelarScript Core repository.
