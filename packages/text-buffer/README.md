# @velarscript-labs/text-buffer

A pure VelarScript incremental text buffer for editor and document tooling.
It is an independently versioned source library, not a member of the
VelarScript compiler/runtime toolchain release.

Install it from the public `@velarscript-labs` npm scope, then import its public
source entry by package name:

```velar
import {TextBuffer, TextHistory} from "@velarscript-labs/text-buffer"
```

The package uses Unicode code-point positions, an immutable AVL rope, atomic
multi-edit transactions, and bounded undo/redo history.

## Line model

`lineCount`, `lineStart`, `lineText`, `positionAt`, `offsetAt`, and `lineSlice`
take their model from `Text.lineStarts`, which is what they are built on.

On the supported VelarScript 0.13 line, `Text.lines` and `Text.lineStarts` end a
line at `\r\n`, a lone `\r`, or `\n`. The buffer reads that model rather than
implementing a second one, so editor positions and compiler diagnostics agree
on line boundaries.

Within that model a `\r\n` pair is one terminator: `lineText` drops the `\r`
that precedes a terminating `\n`, and `positionAt` canonicalizes the offset
between `\r` and `\n` to the position immediately before the pair. A trailing
lone `\r` is also a terminator and therefore creates a final empty line.

## Unpaired surrogates

The buffer addresses text by Unicode code-point offset and its rope caches an
additive length per node, so every stored code point must stay one code point
after a split or a join. An unpaired surrogate cannot: a high half and a low
half stored separately merge into a single code point when two leaves join.
The constructor and every `inserted` string therefore replace each unpaired
surrogate with U+FFFD. Text that arrives from a JavaScript boundary carrying an
unpaired surrogate does not round-trip byte-for-byte; well-formed surrogate
pairs are never touched.

## History bounds and recovery

`TextHistory` keeps at most `maxEntries` undo entries totalling at most
`maxBytes`, evicting the oldest first. It never evicts the entry it is pushing,
so one edit larger than the whole budget is still undoable on its own.

An open group is accounted against the same budget on every `apply`, but it is
not itself evictable: dropping a group's steps would make `cancel` unable to
revert them. A group also retains the undo state `begin` captured, so that
`cancel` can restore it. Peak retention while a group is open is therefore the
budget plus the group's own steps plus that captured state; `commit` and
`cancel` both release the extra, and the budget applies to whatever survives.

`cancel` restores both the document and the history to what `begin` found,
including a redo stack an earlier `undo` had filled and any entry the group's
bytes displaced. Only `commit` starts a new branch, and only when the group
recorded at least one edit.

Any edit applied to the buffer by someone other than the history detaches it:
`isAttached`, `canUndo`, and `canRedo` all report `false`, and `apply`, `undo`,
`redo`, `begin`, `commit`, and `cancel` all throw. `clear` is the recovery. It
drops the history, abandons an active group without reverting its edits, and
re-adopts the buffer's current revision, so it is the one method that works
while detached and the one that works while a group is open.
