# @velarscript-labs/sqlite

An injection-resistant, bounded asynchronous SQLite capability for VelarScript
Node applications, backed by Node's built-in SQLite driver on one owned Worker.

The API accepts only structured `DatabaseStatement` values from
`@velarscript-labs/database`. Runtime values remain separate from SQL grammar,
then Node's `SQLTagStore` binds them into cached prepared statements. Every SQL
shape is parsed as exactly one SQLite statement before native execution.

```velar
import {sqlConcat, sqlParameter, sqlTuple, trustedSql} from "@velarscript-labs/database"
import {SqliteTransaction, openSqlite} from "@velarscript-labs/sqlite"

type User:
    id: number
    name: string

using database = await openSqlite("app.sqlite")
await database.execute(trustedSql(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL)",
))

async def create(transaction: SqliteTransaction) -> User:
    await transaction.execute(sqlConcat([
        trustedSql("INSERT INTO users (id, name) VALUES "),
        sqlTuple([1, "Ada"]),
    ]))
    return (await transaction.one(sqlConcat([
        trustedSql("SELECT id, name FROM users WHERE id = "),
        sqlParameter(1),
    ]), User))!

const user = await database.transaction(create)
```

Use `sqliteLiteral` only where SQLite grammar does not accept a bound value,
such as a schema default or PRAGMA assignment. It safely quotes strings and
validates finite numbers. Ordinary reads and writes use `sqlParameter`,
`sqlTuple`, or `sqlRows`.

Use `sqliteIdentifier` when a table or column name must be selected at runtime.
It quotes the complete value as one SQLite identifier; it never treats the
value as SQL grammar.

## Security and bounds

- SQL fragments cannot contain raw `?` placeholders. Every runtime value is
  bound by `SQLTagStore`; it is never interpolated into SQL text.
- A SQLite-grammar parser rejects invalid SQL, multiple statements, and trailing
  statements before native execution.
- Defensive mode, foreign keys, safe-integer reads, strict named-parameter
  handling, and disabled extension loading are enforced on every connection.
- SQLite `ATTACH`/`DETACH` and `load_extension` are denied by the authorizer;
  the run-time attach limit is also zero.
- SQL length, value length, columns, expression depth, compound selects, VM
  operations, function arguments, variables, LIKE patterns, and trigger depth
  have explicit connection limits.
- One Worker owns one SQLite connection; all connection operations are queued
  and serialized.
- `queueCapacity` bounds admitted operations. Default 64, maximum 1,024.
- `statementCacheCapacity` bounds the prepared-statement LRU. Default 128,
  maximum 1,024.
- One statement accepts at most 999 parameters and 1 MiB of SQL text.
- `maxRows` defaults to 10,000 and is capped at 1,000,000.
- `maxResultBytes` defaults to 64 MiB and is capped at 128 MiB. It also bounds
  parameter bytes for one operation and SQLite value length.
- Numbers must be finite; integer parameters and results must fit JavaScript's
  safe integer range. BLOB values use `Bytes`.
- A transaction callback is the exclusive connection owner. Use the supplied
  `SqliteTransaction`; calling the connection from that callback fails with
  `SqliteConcurrencyError` instead of waiting on itself.
- The callback commits on success and rolls back on failure. Transactions do
  not expose manual commit/rollback handles.
- `close` is idempotent, joins concurrent callers, drains admitted work, rolls
  back an active transaction, closes the driver, and waits for the Worker.

This package still does not own models, repositories, schema inference, an ORM,
or application migrations. Those remain application data and policy.
