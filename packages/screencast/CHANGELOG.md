# Changelog

## 0.1.0 — 2026-08-27

- First release. `attach(canvas, options)` owns one canvas element and draws an
  encoded frame stream onto it; `submitFrame`, `geometry`, `stats`,
  `watchErrors`, and `release` are the whole surface.
- Keep-latest decoding: one frame decodes at a time and at most one further
  frame waits behind it, so a producer faster than the decoder replaces the
  waiting frame instead of accumulating a backlog.
- The backing store follows the element's content box times the pixel ratio,
  and each frame is drawn proportionally letterboxed inside it. `geometry()`
  reports that rectangle in backing-store pixels together with the scale and
  the pixel ratio, which is what a consumer needs to map a pointer position
  back into frame coordinates.
- Decode failures and frames whose real size disagrees with their declared size
  enter a bounded pull error stream instead of stopping the surface. A reader
  that falls behind loses the oldest records and is told how many.
- A canvas has one surface and the error stream has one reader; a second
  attachment and a second concurrent pull are both refused by name.
- Built against the VelarScript 0.19 language generation.
