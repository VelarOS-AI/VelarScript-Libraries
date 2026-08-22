# Package roadmap

The repository starts with the small, already exercised package set listed in
`catalog.json`. Historical code is migration input, not automatic authority.

- `@velarscript/script-analysis`: restore only when an editor actively consumes
  the bounded local JavaScript/TypeScript analysis surface. One verified defect
  from the previous implementation is waiting in
  [docs/restoration-findings.md](docs/restoration-findings.md): re-lexing with
  no preceding-token context, so one typed space turns the rest of a line into a
  regex literal and rename silently drops occurrences.
- `@velarscript/sqlite`: redesign before restoration so transactions retain
  their concrete checked query surface and concurrency, capacity, cancellation,
  and cleanup behavior are covered by execution tests. Seven verified defects
  from the previous implementation are in
  [docs/restoration-findings.md](docs/restoration-findings.md), and two of them
  are why this entry says redesign rather than restore: an auto-rollback wedged
  the connection permanently, and a stream consumer deadlocked the connection it
  was streaming from. Neither is reachable by coding the same design more
  carefully.
- `@velarscript/database`: reconsider after at least two consumers establish a
  shared engine-neutral model instead of one application's preferred ORM. Three
  verified defects are in [docs/restoration-findings.md](docs/restoration-findings.md);
  the contract declaring bounds no adapter could meet is the one that argues
  most directly for waiting on real consumers.
- Deployment-provider packages: admit as integrations under the same package,
  compatibility, and release rules; never hide them in Core build behavior.
- A standalone LSP client: extract only after two editor hosts duplicate the
  transport, cancellation, restart, or coordinate-conversion implementation.

Findings carried over from the implementations that predate this repository are
collected in [docs/restoration-findings.md](docs/restoration-findings.md). They
are a starting test suite for whoever rebuilds one of these, not a backlog:
nothing there is scheduled, because none of those packages exists here yet.
