# @velarscript-labs/compression

An independently versioned, bounded DEFLATE and gzip adapter backed by
`fflate`. Decompression requires or applies a hard output limit and never
allocates an unbounded result.

```velar
import {gzip, gunzip} from "@velarscript-labs/compression"

const archived = gzip(payload)
const payload = gunzip(archived, 8 * 1024 * 1024)
```

## Decompression bounds

`inflate` and `gunzip` feed the compressed input in fixed-size chunks. The
chunk is sized once from `maxBytes` — `ceil(maxBytes / 1032)` clamped to 256
bytes through 64 KiB — and never from the output produced so far, so a tight
budget cannot degrade the feed to one byte per push. `maxBytes` itself is
enforced in the decoder's output callback, so the decoder can buffer
`maxBytes` plus one input chunk expanded at the DEFLATE maximum ratio — one
chunk times 1032, which is about `maxBytes` again and never less than 258
KiB — before the limit aborts the stream.

A stream that consumes input without producing output is rejected. Past the
first 1 MiB of input, decompression requires at least one output byte for
every 64 input bytes and otherwise fails with an assertion error, so a hostile
zero-yield stream stops after roughly 1 MiB instead of being read to the end.
A gzip member's header counts as consumed input, so a member carrying more
than 1 MiB of header metadata — an `FNAME` or `FCOMMENT` field far larger than
any real archive writes — is rejected by that bound instead of decoded.

HTTP response compression remains an internal concern of the Node server; this
package is the explicit standalone codec API.
