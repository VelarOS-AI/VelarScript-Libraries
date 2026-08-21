# @velarscript/msgpack

An independently versioned MessagePack adapter for VelarScript. It keeps
`msgpackr` behind a checked `.vel` source facade and enforces a 64 MiB encoded
and decoded data boundary.

```velar
import {encode, parse} from "@velarscript/msgpack"

const bytes = encode({name: "Ada"})
const user = parse(bytes, User)
```

## Bounds

- `encode` and `decode` reject any value or document larger than 64 MiB.
- Structural nesting is limited to 512 levels on both sides. `decode` walks the
  type bytes of the document before `msgpackr` sees them, so a hostile document
  fails with the adapter's own `AssertionError` instead of overflowing the
  decoder's stack. A truncated document fails the same way.
- The walk accounts for every byte of the document. Bytes left over after the
  value ends are rejected, because that is exactly where a hostile producer
  hides a payload the scan never reaches and the decoder still reads.
- `decode` accepts the standard MessagePack format. The type byte `0xC1`, which
  the format reserves and never assigns, is rejected rather than read as
  `msgpackr`'s private bundled-string extension.
- Extension types are limited to `0x00`, the absent value, and `0xFF`, the
  standard timestamp — the two `msgpackr` reads from the extension payload
  alone. Its other extensions, which decode to a `Set`, an `Error`, a `RegExp`,
  a structured-clone reference, or a bundled string, resume decoding at the
  bytes that follow the payload instead, so an extension header three bytes
  long can carry a document of any depth behind it. A document that uses one is
  rejected.

## Supported values

Records, Lists, `Bytes`, strings, numbers, booleans, and `null` round-trip
faithfully. `encode` walks the whole value, to the same 512-level limit, and
rejects what MessagePack would otherwise decode back as something else:

- `Map` and `Set`, which decode as a record and as a List. Convert a `Map` to a
  record or to a List of entries, and a `Set` to a List.
- The record key `__proto__`, which `msgpackr`'s prototype-pollution guard
  silently renames to `__proto_` on decode, quietly losing the value.

Rejection happens at any depth, not only at the top level. `decode` answers with
the same domain: the extension bound above keeps it from returning a `Set`, an
`Error`, or a `RegExp` that `encode` would have refused to write.

This package is not a `velar/*` Standard module and is not released as part of
the language toolchain.
