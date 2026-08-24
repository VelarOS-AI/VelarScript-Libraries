# @velarscript-labs/database

An injection-resistant functional data-operation layer for VelarScript database
drivers. It sits between a driver such as `@velarscript-labs/sqlite` and
application-owned stores.

This package is not an ORM. It has no models, repositories, entity tracking,
relations, schema inference, query builder, or migration language. Applications
own their SQL grammar and result contracts; this package keeps every runtime
value structurally separate from that grammar and validates result rows.

```velar
import {command, execute, query, requireOne, sqlConcat, sqlParameter, sqlTuple, trustedSql, trustedSqlTemplate} from "@velarscript-labs/database"

type User:
    id: number
    name: string

def insertUser(id: number, name: string):
    return command(sqlConcat([
        trustedSql("INSERT INTO users (id, name) VALUES "),
        sqlTuple([id, name]),
    ]), minimumAffected=1, maximumAffected=1)

def findUser(id: number):
    return query(sqlConcat([
        trustedSql("SELECT id, name FROM users WHERE id = "),
        sqlParameter(id),
    ]), User, maximumRows=1)

await execute(executor, insertUser(1, "Ada"))
const user = await requireOne(executor, findUser(1))
```

`trustedSql(...)` is the only raw grammar boundary. Its argument must be
application-owned source text, never request, configuration, or persisted data.
Runtime values go through `sqlParameter`, `sqlTuple`, `sqlRows`, or the explicit
`trustedSqlTemplate(fragments, values)` equivalent of a safe template tag;
drivers then render their own placeholder dialect and bind those values.

Drivers expose `DatabaseExecutor` values for connections and transactions. The
driver remains the sole owner of rendering, queues, transactions, cancellation,
streaming, and cleanup; this package never pretends those capabilities are
portable when they are not.
