# @velarscript/sqlite

A bounded asynchronous SQLite capability for VelarScript Node applications,
backed by Node's built-in SQLite driver on one owned Worker thread.

The API deliberately stops at parameterized SQL. It does not provide models,
repositories, schema inference, an ORM, or application migrations. Those are
application data and policy, not a reusable driver concern.

```velar
import {SqliteTransaction, openSqlite} from "@velarscript/sqlite"

type User:
    id: number
    name: string

using database = await openSqlite("app.sqlite")
await database.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL)")

async def create(transaction: SqliteTransaction) -> User:
    await transaction.execute("INSERT INTO users (id, name) VALUES (?, ?)", [1, "Ada"])
    return (await transaction.one("SELECT id, name FROM users WHERE id = ?", User, [1]))!

const user = await database.transaction(create)
```

## Bounds and concurrency

- One Worker owns one SQLite connection; all connection operations are queued
  and serialized.
- `queueCapacity` bounds admitted operations. Default 64, maximum 1,024.
- One statement accepts at most 999 parameters and 1 MiB of SQL text.
- `maxRows` defaults to 10,000 and is capped at 1,000,000.
- `maxResultBytes` defaults to 64 MiB and is capped at 128 MiB. It also bounds
  parameter bytes for one operation.
- Numbers must be finite; integer parameters and results must fit JavaScript's
  safe integer range. BLOB values use `Bytes`.
- A transaction callback is the exclusive connection owner. Use the supplied
  `SqliteTransaction`; calling the connection from that callback fails with
  `SqliteConcurrencyError` instead of waiting on itself.
- The callback commits on success and rolls back on failure. Transactions do
  not expose manual commit/rollback handles.
- `close` is idempotent, joins concurrent callers, drains admitted work, rolls
  back an active transaction, closes the driver, and waits for the Worker.

Cancellation and streaming are intentionally absent from version 0.2. They
will not be claimed until their cleanup and backpressure contracts are proven.
