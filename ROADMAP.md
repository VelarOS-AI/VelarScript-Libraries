# Package roadmap

The repository starts with the small, already exercised package set listed in
`catalog.json`. Historical code is migration input, not automatic authority.

- `@velarscript/script-analysis`: restore only when an editor actively consumes
  the bounded local JavaScript/TypeScript analysis surface.
- `@velarscript/sqlite`: redesign before restoration so transactions retain
  their concrete checked query surface and concurrency, capacity, cancellation,
  and cleanup behavior are covered by execution tests.
- `@velarscript/database`: reconsider after at least two consumers establish a
  shared engine-neutral model instead of one application's preferred ORM.
- Deployment-provider packages: admit as integrations under the same package,
  compatibility, and release rules; never hide them in Core build behavior.
- A standalone LSP client: extract only after two editor hosts duplicate the
  transport, cancellation, restart, or coordinate-conversion implementation.
