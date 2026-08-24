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

- Verify the adapter with VelarScript 0.14 and extend the declared compatible
  language range through the 0.14 generation.

## 0.1.1 — 2026-08-23

- Publish the companion package as `@velarscript-labs/msgpack`, outside the
  Standard/toolchain scope.
- Move ownership to the independent VelarScript Libraries repository.
- Add package-local typed round-trip and packed-consumer gates.
- Bound structural nesting at 512 levels. `decode` now walks the document's
  type bytes before decoding, so hostile nesting fails with the adapter's
  `AssertionError` instead of a raw `RangeError: Maximum call stack size
  exceeded` from `msgpackr`'s recursive decoder; a truncated document and the
  reserved type byte `0xC1` fail the same way. 512 is far above any realistic
  document — the deepest shapes seen in practice nest tens of levels — while
  staying two orders of magnitude below the stack depth that overflows. The
  walk skips payloads instead of reading them, and costs about a third of what
  decoding the same document costs.
- Require the nesting walk to reach the end of the document, and limit
  extension types to `0x00` and `0xFF`. The first version of the walk stopped
  as soon as the top-level value ended, which `msgpackr` does not do: its
  handlers for the `Set`, `Error`, `RegExp`, structured-clone and
  bundled-string extensions resume reading at the bytes after the extension
  payload. A three-byte header followed by 200,000 nested arrays therefore
  passed the walk and still overflowed the decoder's stack. Both conditions
  close that, and the second also settles what `decode` may answer with: the
  values `encode` refuses to write are no longer values `decode` can produce.
  A document written by `msgpackr` with `structuredClone`, `bundleStrings`, or
  a shared `structures` table is rejected rather than decoded; the default
  packer, which this adapter uses, writes none of those.
- Reject values `encode` cannot round-trip instead of letting the decoder
  change them: a `Map` (decodes as a record), a `Set` (decodes as a List), and
  the record key `__proto__` (silently renamed to `__proto_`). The check walks
  the whole value to the same 512-level limit, so a container nested inside a
  record is rejected too, and a reference cycle fails as excessive nesting.

Version 0.1.0 was published from the VelarScript Core repository.
