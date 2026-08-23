# @velarscript/database

A small functional data-operation layer for VelarScript database drivers.
It sits between a driver such as `@velarscript/sqlite` and application stores.

This package is not an ORM. It has no models, repositories, entity tracking,
relations, schema inference, query builder, or migration language. Applications
author parameterized statements and name their contracts with `query(...)` and
`command(...)`; the package validates result rows and enforces per-operation
row bounds.

```velar
import {command, execute, query, requireOne} from "@velarscript/database"

type User:
    id: number
    name: string

const insertUser = command(
    "INSERT INTO users (id, name) VALUES (?, ?)",
    minimumAffected=1,
    maximumAffected=1,
)
const findUser = query("SELECT id, name FROM users WHERE id = ?", User, maximumRows=1)

await execute(executor, insertUser, [1, "Ada"])
const user = await requireOne(executor, findUser, [1])
```

Drivers expose `DatabaseExecutor` values for connections and transactions. The
driver remains the sole owner of queues, transactions, cancellation, streaming,
and cleanup; this package never pretends those capabilities are portable when
they are not.
