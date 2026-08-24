# @velarscript-labs/sql

A Velar-style, injection-resistant SQL DML builder over
`@velarscript-labs/database`. It removes repetitive identifier quoting and
statement assembly for common selects, joins, inserts, updates, and deletes
without becoming an ORM.

```velar
import {all, execute} from "@velarscript-labs/database"
import {insertCommand, selectQuery, sqlColumnEqual, sqlNamedField, sqlTable} from "@velarscript-labs/sql"

type User:
    id: string
    name: string

const users = sqlTable("users")
await execute(executor, insertCommand(
    users,
    ["id", "name"],
    [["u-1", "Ada"]],
    minimumAffected=1,
    maximumAffected=1,
))

const operation = selectQuery(
    users,
    [sqlNamedField("id"), sqlNamedField("name")],
    User,
    where=sqlColumnEqual("id", "u-1"),
    limit=1,
    maximumRows=1,
)
const rows = await all(executor, operation)
```

## Safety and ownership

- Table, schema, column, alias, and qualifier names are individually checked,
  ANSI-quoted, and never treated as already-authored SQL.
- Runtime values are always carried as bound parameters through the structured
  `DatabaseStatement` contract.
- Updates and deletes require a predicate. An intentional whole-table write is
  visible in review as `sqlAllRows()`.
- Empty `IN` lists match no rows, empty `sqlAnd` matches all rows, and empty
  `sqlOr` matches no rows, so dynamic filters do not require placeholder text.
- Result validation, affected-row bounds, transactions, concurrency, and
  cleanup remain owned by `@velarscript-labs/database` and the selected driver.

This package implements a conservative common DML subset for ANSI-quoted
dialects with `LIMIT`/`OFFSET`, including SQLite and PostgreSQL. It does not own
schemas, migrations, models, repositories, relations, entity tracking, PRAGMA,
DDL, `ON CONFLICT`, full-text syntax, or other dialect-specific grammar. Other
dialects can keep using the engine-neutral `DatabaseStatement` layer until they
have an explicit dialect package.
