# Changelog

## 0.1.0 — 2026-08-28

- First release. `parseMarkdown(source)` answers with a closed block and inline
  tree of Vel data, and `reparseMarkdown(previous, source)` adds the streaming
  stable-prefix contract. The package parses and never renders.
- Closed vocabularies: eight block kinds and ten inline kinds, validated against
  their declared types before the tree leaves the adapter.
- Raw HTML is carried opaque, in an `html` block or an `html` inline, and is
  never parsed, sanitized, or executed here.
- Link destinations are carried byte for byte. `markdown-it`'s own link
  validator and URL normalizer are turned off, so a `javascript:` scheme, a
  relative path, and a non-ASCII host all reach the consumer as written. A link
  records whether markdown built it out of the link text itself.
- `reparseMarkdown` claims every block before the previous document's last one,
  and withdraws the whole claim when the text was rewritten or when any part of
  the link reference definition table changed.
- Bounds: 2 MiB of source and 32 levels of nesting, each refused by name.
- CommonMark plus GFM tables, strikethrough, and task list items, with `linkify`
  on. A list item carries `checked` — `true`, `false`, or `null` for an item
  that is not a task item — and the marker leaves the item's text, because the
  marker is the checkbox. Footnotes stay outside the vocabulary and arrive as
  ordinary text; the README records what would reopen that.
- Built against the VelarScript 0.21 language generation.
