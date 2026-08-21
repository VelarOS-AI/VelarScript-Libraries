# Changelog

## 0.10.6 — Unreleased

- Move ownership to the independent VelarScript Libraries repository.
- Add package-local format, check, execution, and packed-consumer gates.
- Replace every unpaired surrogate with U+FFFD in the `TextBuffer` constructor
  and in every inserted string. A join of two leaves could otherwise merge two
  surrogate halves into one code point and desynchronize `size`, `byteSize`,
  `slice`, and `text` for every offset after the seam. Text carrying an
  unpaired surrogate no longer round-trips byte-for-byte.
- Keep a trailing carriage return on the final line of `lineText`, where it is
  content rather than a terminator. `offsetAt` previously rejected the position
  `positionAt` had just produced for such a document.
- Bound an `offsetAt` column against the cached line metrics instead of
  materializing the whole line, restoring the O(log n) cost the rope exists for.
- Never evict the undo entry currently being pushed, so one edit larger than
  `maxBytes` no longer erases the whole history along with itself, and apply the
  byte budget to every edit inside an open group rather than only at `commit`.
  `TextHistory.cancel` restores the entries an open group's bytes displaced, so
  an abandoned composition costs no history it never earned.
- Exempt `TextHistory.clear` from the attachment check and from the active-group
  check, and let it re-adopt the buffer's current revision, which is the recovery
  its documentation promises. It now abandons an active group without reverting
  its edits, so a history detached during a composition is recoverable too. Add
  an `isAttached` getter, and report `canUndo` and `canRedo` as `false` while the
  history is detached.
- Preserve the redo stack across `TextHistory.cancel`. A cancelled group now
  clears redo only at `commit`, where the group actually becomes a new branch.
- Document the LF-only line model, the unpaired-surrogate normalization, and
  what an open group retains beyond the advertised byte budget.

Version 0.10.5 and earlier were published from the VelarScript Core repository.
