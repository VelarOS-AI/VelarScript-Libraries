# VelarScript Libraries Agent Guide

This repository owns officially maintained, optional VelarScript libraries and
adapters. It does not own the language, Standard API, official target
frameworks, or `velar lsp` server.

- Every public package lives under `packages/*`, is independently versioned,
  and must remain installable from the public `@velarscript-labs` npm scope
  without a checkout of VelarScript Core. The `@velarscript/*` scope is reserved
  for the language toolchain and official Standard/target owners.
- Never introduce a `velar/*` alias, compiler privilege, hidden CLI asset,
  repository-relative Core import, or synchronized toolchain release version.
- A source package declares `velar.entry`, `velar.targets`, and
  `velar.requires.capabilities`. A JavaScript/TypeScript tooling package uses
  ordinary npm exports and must not duplicate compiler semantics.
- Keep external bridges narrow and checked. Validate untrusted results before
  they leave the adapter and document applicable memory, result, queue,
  concurrency, cancellation, and cleanup bounds.
- `@velarscript-labs/editor-kit` owns only editor connection metadata and helpers.
  Grammar, types, diagnostics, formatting, completion, and Web semantics stay
  in the installed VelarScript toolchain reached through standard LSP.
- Resolve every advisory printed by `velar check`: change the spelling or add
  one applicable `// velar-allow <CODE>: <reason>` suppression.
- Run the narrow package checks first, then `npm run validate`. Validation must
  exercise packed tarballs in an isolated consumer before a package is ready
  for release.
- Preserve unrelated work. Commit, push, tag, npm publication, removal, and
  deprecation are separate authorization boundaries.
