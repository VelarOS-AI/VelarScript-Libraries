# Package roadmap

The repository starts with the small, already exercised package set listed in
`catalog.json`. Historical code is migration input, not automatic authority.

- `@velarscript/script-analysis`: restore only when an editor actively consumes
  the bounded local JavaScript/TypeScript analysis surface. One verified defect
  from the previous implementation is waiting in
  [docs/restoration-findings.md](docs/restoration-findings.md): re-lexing with
  no preceding-token context, so one typed space turns the rest of a line into a
  regex literal and rename silently drops occurrences.
- `@velarscript-labs/sqlite` 0.2 is a fresh Worker-isolated implementation rather
  than a restoration. One connection serializes admitted work, a transaction
  callback owns its scoped handle, reentrant connection use fails immediately,
  and close rolls back through Node's real `isTransaction` state. It deliberately
  omits the old prepared-statement, streaming, migration-model, and ORM surfaces.
  The seven historical defects in
  [docs/restoration-findings.md](docs/restoration-findings.md) remain regression
  and admission evidence for any future expansion.
- `@velarscript-labs/database` 0.2 is the small engine-neutral layer established by
  the SQLite and OpenVoxel consumers: named parameterized commands, typed
  queries, affected-row invariants, per-operation row bounds, and a three-function
  executor. It is not an ORM and will not grow entity tracking, relations,
  inferred schemas, a query builder, or a portable migration language without
  separate multi-consumer evidence.
- `@velarscript-labs/contract-codegen` 0.1 generates VelarScript declarations
  from a foreign package's zod wire contracts. It deliberately stops at types:
  no transport stub, because the envelope shape, retries, and timeouts are the
  consuming product's protocol. A template for those is a separate proposal that
  needs a real consumer first. Its type-mapping table is closed on purpose — a
  new row is admitted by a contract that needs it, not by symmetry with zod.
- Deployment-provider packages: admit as integrations under the same package,
  compatibility, and release rules; never hide them in Core build behavior.
- A standalone LSP client: extract only after two editor hosts duplicate the
  transport, cancellation, restart, or coordinate-conversion implementation.

Findings carried over from implementations that predate this repository are
collected in [docs/restoration-findings.md](docs/restoration-findings.md). They
remain design constraints and regression evidence, not a promise to restore the
old APIs.
