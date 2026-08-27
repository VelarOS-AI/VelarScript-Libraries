# @velarscript-labs/contract-codegen

Generates checked VelarScript type declarations from a foreign package's
[zod](https://zod.dev) wire contracts, so a VelarScript application can consume
a TypeScript service's protocol through `Type.parse` instead of `unknown`.

This is a Node tooling package. It contains no compiler semantics, claims no
`velar/*` module name, and takes no production dependency on the VelarScript
toolchain: formatting is delegated to the consuming project's own
`velar format`.

## How it reads a contract

The generator **loads** the contract package's compiled JavaScript and walks the
exported zod schema objects through `_def`. It does not parse TypeScript. A zod
schema is data, and reading the data is more reliable than reading the syntax
that produced it.

Schema internals differ between zod majors, so the supported major is stated and
enforced: **zod 4** (developed against `zod@4.4.3`). A contract package that
resolves another major is refused with both versions named, and nothing is
written.

## Install

```sh
npm install --save-dev @velarscript-labs/contract-codegen
```

## Manifest

The only input is a JSON manifest in the consuming project.

```json
{
  "formatVersion": 1,
  "resolveFrom": "./node_modules/@example/agent",
  "outputDirectory": "./src/generated",
  "naming": { "stripSuffix": "Schema", "prefix": "" },
  "velarFormat": true,
  "modules": [
    {
      "specifier": "@example/agent/protocol",
      "output": "agent-protocol.vel",
      "exports": "all",
      "unknownDegrade": [
        { "path": "AgentModManifestSchema.contributes", "reason": "the shell forwards mod manifests untouched" }
      ]
    }
  ],
  "channelTables": [
    {
      "output": "agent-channels.vel",
      "enumName": "AgentChannel",
      "typesOutput": "agent-protocol.vel",
      "channels": [{ "name": "chat:send", "request": "SendRequestSchema", "response": "SendResultSchema" }]
    }
  ]
}
```

| Field | Meaning |
| --- | --- |
| `resolveFrom` | Directory that resolves module specifiers **and the target's own `zod`**. Relative to the manifest. |
| `outputDirectory` | Where the `.vel` files are written. Relative to the manifest. |
| `naming.stripSuffix` | Suffix removed from an exported schema name (`SendRequestSchema` → `SendRequest`). Defaults to `Schema`. |
| `naming.prefix` | Prefix added to every generated declaration. |
| `velarFormat` | Run the emitted source through `velar format`. Defaults to `true`. |
| `velarCommand` | Executable name for that step. Defaults to `velar`, searched upward from the output directory, then on `PATH`. |
| `modules[].exports` | `"all"` walks every exported zod schema; a list walks exactly those. |
| `modules[].unknownDegrade` | Per-path exemptions, each with a reason. See below. |
| `channelTables[]` | The second artifact. Either inline `channels`, or a runtime `source` export shaped `{channel: {request?, response?, event?}}`. |

## Commands

```sh
velar-contract-codegen generate contracts.json            # write
velar-contract-codegen generate contracts.json --check    # regenerate in memory, compare byte for byte
velar-contract-codegen generate contracts.json --json     # machine-readable report on stdout
velar-contract-codegen generate contracts.json --report generation.json
```

`--check` never writes and exits non-zero on drift, so a CI job fails when a
contract moves without its generated types. Output is deterministic: declarations
are sorted by name, fields keep their wire order, and the header records the tool
version, the source package and version, and a digest of the source schemas.

## The closed type-mapping table

| zod | VelarScript |
| --- | --- |
| `string` / `number` / `boolean` / `null` | `string` / `number` / `bool` / `null` |
| `undefined` | `null` (undefined-to-null interop normalization) |
| `unknown` | `unknown` |
| `optional` / `nullable` / `nullish` | `T?` |
| `array` | `List<T>` |
| `record(string, V)` | `Record<V>` |
| `enum`, string `literal`, string literal union | `enum`, with a wire value for any member no identifier can spell |
| `strictObject` | record `type` |
| `discriminatedUnion` | tag `enum` + one record per case + a union alias |
| union of primitives, lists, and aliases | VelarScript union |

Anything else is **fail-closed**: generation stops and names the schema path and
the reason. That covers non-strict `z.object` (it strips unknown keys rather than
rejecting them), catchall objects, `transform`/`pipe`/effects, `default`,
`catch`, `z.date`, `z.any`, tuples, intersections, numeric and boolean literals,
`z.lazy` and other self-referential shapes, zero-field records, non-string record
keys, record unions with no discriminator, and field names that are not
VelarScript identifiers.

To accept one of those as opaque data, exempt its path:

```json
"unknownDegrade": [{ "path": "RunTurnRequestSchema.options", "reason": "forwarded to the agent untouched" }]
```

The field becomes `unknown`, and the degrade appears in the generation report
with its path and reason. A degrade that no longer matches anything is also
reported, so an exemption cannot outlive the schema that needed it.

## What the report says out loud

Two kinds of information cannot cross into a VelarScript type, so both are
reported rather than silently dropped:

- **zod refinements.** `min_length`, `regex`, `int`, and friends are predicates on
  a value, not a shape. They are listed per path; the consumer owns them.
- **Boundary widenings.** Three are inherent to the mapping:
  - `strict-unknown-keys` — `z.strictObject` rejects a surplus key; a
    VelarScript record accepts the value and drops the key.
  - `optional-accepts-null` — `z.optional()` rejects an explicit `null`; `T?`
    accepts it.
  - `nullable-accepts-absent` — `z.nullable()`, and any union carrying
    `z.null()`, rejects an absent key; a `T?` field accepts it.

  The last two are the undefined-to-null normalization this generator is
  specified to apply. All three are counted, explained, and locked by the
  equivalence fixtures.

Every other payload is accepted by the generated type exactly when the zod schema
accepts it. The fixture suite asserts that biconditional over positive and
negative samples for every row of the table, and asserts that each declared
widening class is actually exercised.

## The channel table

For a `{channel name → request/response type}` map, the generator emits a second
artifact: one enum of channel names carrying their wire strings, plus one
exported `Type<T>` constant per bound role.

```velar
export enum AgentChannel:
    chatSend = "chat:send"

export const chatSendRequest: Type<SendRequest> = SendRequest
export const chatSendResponse: Type<SendResult> = SendResult
```

It deliberately generates **no transport stub**. The envelope shape, retries, and
timeouts are the product's protocol, not a labs package's business.

## Limits

- Schemas are read from a module loaded once per process. The CLI is one-shot;
  calling `run()` repeatedly in a long-lived process will not see a contract file
  edited in the meantime.
- The generator reads the compiled JavaScript of the contract package, so that
  package has to be built or installed first.
