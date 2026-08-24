# VelarScript Libraries

Officially maintained, optional libraries and adapters for VelarScript.

This repository is deliberately separate from the
[VelarScript main repository](https://github.com/VelarOS-AI/VelarScript). Packages here are
installed explicitly, use independent semantic versions, and never acquire a
`velar/*` Standard-module name or compiler privilege. The VelarScript main
repository does not depend on this repository.

## Packages

| Package | Kind | Status | Purpose |
| --- | --- | --- | --- |
| `@velarscript-labs/database` | source library | experimental | Typed query and command descriptors over bounded executors |
| `@velarscript-labs/sql` | source library | experimental | Safe Vel-style SQL DML builders over structured statements |
| `@velarscript-labs/text-buffer` | source library | stable | Bounded incremental editor text storage |
| `@velarscript-labs/noise` | adapter | experimental | Deterministic simplex noise |
| `@velarscript-labs/msgpack` | adapter | experimental | Bounded MessagePack encoding and validation |
| `@velarscript-labs/compression` | adapter | experimental | Bounded DEFLATE and gzip |
| `@velarscript-labs/editor-kit` | tooling | experimental | Editor-neutral metadata for launching `velar lsp` |
| `@velarscript-labs/yaml` | adapter | experimental | Strict, bounded YAML parsing |
| `@velarscript-labs/sqlite` | adapter | experimental | Worker-isolated SQLite capability for Node applications |

All non-standard packages use the dedicated public npm scope
`@velarscript-labs`. The `@velarscript/*` scope remains reserved for the
language toolchain, Standard owners, and official target frameworks. Install
only what the application uses:

```sh
velar add @velarscript-labs/msgpack@0.1.3
```

```velar
import {encode, parse} from "@velarscript-labs/msgpack"
```

Every Vel-authored package publishes two representations of the same release:
the readable `.vel` source and a frozen Velar library ABI 1 artifact containing
JavaScript, a source map, a portable type interface, and a hash receipt. Current
toolchains load the checked artifact first, so a later Vel language generation
does not need to reparse or rewrite an older library release. The source remains
in the tarball for inspection, debugging, and an explicit source fallback.

The exact machine-readable roster and compatibility status live in
[`catalog.json`](catalog.json).

## Boundary

`velar lsp`, the compiler, diagnostics, formatting, and framework semantics
remain in the project-local VelarScript toolchain. `@velarscript-labs/editor-kit`
contains connection metadata and compatibility checks only; editors continue
to use standard LSP and do not receive a second language implementation.

Project-specific models, UI, product policy, and deployment configuration stay
with their owning application. A new package is admitted only after two real
consumers exist or the same external bridge is already being maintained in
multiple repositories.

## Development

Node.js 24 or newer is required.

```sh
npm install
npm run validate
```

Validation checks every package, regenerates and verifies every frozen artifact,
runs its real dependency tests, packs all public artifacts, installs those
tarballs into a clean consumer, compiles and runs a consumer program without
compiling package source, and imports the packed editor tooling.

Package publication is intentionally not part of `validate`. Commit, push,
tag, npm publication, removal of the legacy `@velarscript/*` packages, and
deprecation remain separately auditable operations.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and the
[Code of Conduct](CODE_OF_CONDUCT.md) before opening a contribution or report.
