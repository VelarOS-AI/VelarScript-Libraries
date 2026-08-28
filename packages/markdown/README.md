# @velarscript-labs/markdown

An independently versioned markdown adapter for VelarScript. It keeps
`markdown-it` behind a checked `.vel` source facade and answers with a closed
block and inline tree of ordinary Vel data.

**It parses; it never renders.** That boundary is the point of the package:

- **No HTML interpretation.** Raw HTML arrives as opaque text in an
  `html` block or an `html` inline, exactly as the source wrote it. The adapter
  never parses, sanitizes, strips, escapes, or executes it. Whether that text is
  injected, shown literally, or dropped is the consumer's sandbox policy.
- **No link policy.** An `href`, a `src`, and a reference destination are carried
  byte for byte, including a `javascript:` scheme, a relative `../` path, and an
  empty destination. Nothing is filtered, percent-encoded, punycoded, resolved,
  or judged. `markdown-it`'s own link validator and URL normalizer are turned
  off for exactly this reason. A link records whether markdown built it out of
  the link text itself, so a consumer can treat an autolink differently from a
  destination an author wrote.
- **No syntax highlighting.** A code block carries its language and its info
  string; a highlighter is the consumer's.
- **No math and no diagrams.** A fence whose language is `mermaid`, `math`, or
  anything else is a fenced code block here, carried whole and never executed.
- **No rendering of any kind.** There is no HTML output, no DOM, and no string
  of markup anywhere in this package.

```velar
import {MarkdownBlockKind, parseMarkdown} from "@velarscript-labs/markdown"

const answer = parseMarkdown("## Findings\n\nA **bounded** parse.\n")
for block in answer.blocks:
    if block.kind == MarkdownBlockKind.heading: print(f"h{block.level}")
```

## The vocabulary

Both vocabularies are closed. A construct outside them is carried as one of
these kinds or is not produced at all; nothing arrives untyped.

**Blocks** — `paragraph`, `heading` (level 1–6, from both `#` and an underline),
`code` (fenced or indented, with `language` and `meta` from the info string),
`blockquote`, `list` (`ordered`, `start`, `tight`, `items`), `table`
(`alignments`, one `head` row, `rows`), `thematicBreak`, `html`.

**Inlines** — `text`, `strong`, `emphasis`, `strikethrough`, `code`, `link`
(`href`, `title`, `autolink`, `children`), `image` (`src`, `alt`, `title`),
`softBreak`, `hardBreak`, `html`.

A document also carries the whole link reference definition table, because a
definition at the end of a document resolves a `[shortcut]` at its start.

The enabled grammar is CommonMark plus GFM tables and strikethrough — the
`markdown-it` `default` preset — with `linkify` on so a bare URL in running text
becomes a link. Nothing else is enabled: **task list items** (`- [ ] todo`) and
**footnotes** (`[^1]`) are not part of the vocabulary, and their source text
arrives as ordinary text. `typographer` and `breaks` are off, so no text is
rewritten on the way through.

## Streaming

Conversation markdown arrives one fragment at a time, and re-parsing is cheap
next to re-rendering a whole transcript on every fragment. `reparseMarkdown`
parses the new text once and reports how much of the previous render still
stands:

```velar
import {MarkdownDocument, reparseMarkdown} from "@velarscript-labs/markdown"

let shown: MarkdownDocument? = null

def onFragment(text: string):
    const step = reparseMarkdown(shown, text)
    // Blocks before `step.stableBlocks` are unchanged; render from there on.
    shown = step.document
```

The claim is deliberately narrow, and it is the rule the product's own renderer
already uses: **when the new text extends the old one and the reference
definition table is unchanged, every block before the previous document's last
block is byte-identical in source and parses identically.**

The last block is never claimed, because markdown lets a trailing construct
reach backwards over text it already covers:

- an open fence swallows everything that follows it;
- an underline turns the paragraph above it into a heading;
- a delimiter row turns the line above it into a table;
- a list absorbs a later item across a blank line;
- a lazy line extends the quote above it.

A change anywhere in the reference definition table — a new label, or the same
label resolving one character further — withdraws every claim, because those
definitions resolve across the whole document and can turn plain text in the
first block into a link. `reason` says which of those cases applied.

The contract is tested rather than asserted: a real-shaped assistant answer and
six documents built to break it are replayed one character at a time, and at
every one of those prefixes the reparse must agree with a cold parse of the same
text and every block it called stable must really be unchanged.

## Bounds

- A source over 2 MiB of UTF-8 is refused: *Markdown source cannot exceed
  2 MiB*.
- A block or inline nested deeper than 32 levels is refused: *Markdown nesting
  cannot exceed 32 levels*. `markdown-it`'s own limit stops the token stream
  above that, so a document of a thousand nested quotes fails with this
  adapter's `AssertionError` rather than arriving as a wall of tokens.
- Everything else is total: an unclosed fence, an unterminated HTML block, a
  half-written table, and an empty document are ordinary answers, not failures.
  Any prefix of any document parses.

The whole tree is validated against the declared types before it leaves the
adapter, so a shape outside the closed vocabulary cannot reach a consumer.

This package is not a `velar/*` Standard module and is not released as part of
the language toolchain.
