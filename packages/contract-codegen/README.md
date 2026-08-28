# @velarscript-labs/contract-codegen

Generates checked VelarScript type declarations from a foreign package's
[zod](https://zod.dev) wire contracts, so a VelarScript application can consume
a TypeScript service's protocol through `Type.parse` instead of `unknown`.

This is a Node tooling package. It contains no compiler semantics, claims no
`velar/*` module name, and takes no production dependency on the VelarScript
toolchain: formatting is delegated to the consuming project's own
`velar format`. Its one production dependency is `esbuild`, which only the
[bundle loader](#reaching-a-bundler-compiled-package) uses.

## How it reads a contract

The generator **loads** the contract package's compiled JavaScript and walks the
exported zod schema objects through `_def`. It does not parse TypeScript. A zod
schema is data, and reading the data is more reliable than reading the syntax
that produced it.

Schema internals differ between zod majors, so the supported major is stated and
enforced: **zod 4** (developed against `zod@4.4.3`). A contract package that
resolves another major is refused with both versions named, and nothing is
written.

### Which VelarScript the output needs

A contract that pins an integer wire value — `z.literal(1)`, `z.literal(2)` —
generates an enum member carrying that number, which is D102 ruling 1 and landed
in the language in **`v0.21.0`**. That is the published release the package's own
`check` and `test` scripts run against, and the generation the catalog states.
Output that contains no integer literal is unaffected and still checks on
`0.19.x`.

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
| `loader` | How the contract modules are reached: `{"kind": "node"}` (default) imports them as they sit, `{"kind": "bundle"}` bundles them first. See below. |
| `velarFormat` | Run the emitted source through `velar format`. Defaults to `true`. |
| `velarCommand` | Executable name for that step. Defaults to `velar`, searched upward from the output directory, then on `PATH`. |
| `modules[].exports` | `"all"` walks every exported zod schema; a list walks exactly those. |
| `modules[].unknownDegrade` | Per-path exemptions, each with a reason. See below. |
| `channelTables[]` | The second artifact. Either inline `channels`, or a runtime `source` export shaped `{channel: {request?, response?, event?}}`. |

## Reaching a bundler-compiled package

The generator imports the contract package's compiled JavaScript. A package
compiled for Node ESM imports cleanly. A package compiled under TypeScript's
`moduleResolution: "bundler"` does not: its emitted relative specifiers carry no
extension (`from "./channels"`), and Node's ESM resolver does not complete them,
so a bare import answers `ERR_MODULE_NOT_FOUND` for a file that is sitting right
there. Bundler resolution is the majority form in a real TypeScript monorepo, so
this is the tool's own answer rather than a recipe each consumer re-derives:

```json
"loader": { "kind": "bundle", "external": ["@scope/native-addon"] }
```

The declared modules are bundled — together, in one build — to self-contained
ESM in a temporary directory, imported from there, and the temporary tree is
removed. Nothing is written near the contract package.

- **`zod` is always external**, whether or not `external` names it. This
  generator introspects the schema objects the *target's own zod* built; a
  second copy inside the bundle would build objects it cannot recognize. An
  external module is not omitted but pinned: the bundle imports it by the
  absolute path the target resolves it to.
- **One build, not one per module.** The channel table matches a runtime schema
  to a generated declaration by object identity, so a schema shared by two
  entry points has to stay one object.
- **The header still names the real package.** The bundle is a copy in a
  temporary directory; the owning-package walk is given the target's own path.
- Add a name to `external` for anything that must not be bundled — a native
  addon, or a dependency the consumer wants resolved at run time.

Without the option, the failure is named rather than raw: the diagnostic says
what bundler-emitted specifiers are, and points at this loader.

## Commands

```sh
velar-contract-codegen generate contracts.json            # write
velar-contract-codegen generate contracts.json --check    # regenerate in memory, compare byte for byte
velar-contract-codegen generate contracts.json --json     # machine-readable report on stdout
velar-contract-codegen generate contracts.json --report generation.json
```

`--check` never writes and exits non-zero on drift, so a CI job fails when a
contract moves without its generated types. **`--check` and `--report <file>`
are refused together**, with exit status 2: `--report` is a write, and a gate
that writes into the tree it is checking is not a check. Check mode's
machine-readable answer is `--json`, on stdout, which writes nothing.

Output is deterministic: declarations are sorted by name, fields keep their wire
order, and the header records the tool version, the source package and version,
and a digest of the source schemas.

The header's `Source:` line names the package that **authored** the contract.
That answer comes from the nearest named `package.json` at or above the loaded
file, and the walk stops at `resolveFrom`: a manifest above that directory
belongs to the project that asked for the generation, and naming it would
credit the consumer with writing its own wire contract. When no package owns the
file, the line carries the specifier and no author — which is true — and a
project that knows better says so with `modules[].versionFrom`.

`velar format` is a safety net rather than a load-bearing step. The emitter's own
output is already canonical — a test asserts that `velar format --check` accepts
it unformatted — so `"velarFormat": false` in a project without a toolchain on
`PATH` still produces formatted source.

## The closed type-mapping table

| zod | VelarScript |
| --- | --- |
| `string` / `number` / `boolean` / `null` | `string` / `number` / `bool` / `null` |
| `undefined` | `null` (undefined-to-null interop normalization) |
| `unknown` | `unknown` |
| `optional` / `nullable` / `nullish` | `T?` |
| `nonoptional` | the optionality it wraps is taken back: the key is required again |
| `array` | `List<T>` |
| `record(string, V)` | `Record<V>` |
| `enum`, `literal`, literal union | `enum`, with a wire value for any member no identifier can spell. A wire value is a string or a safe integer (D102 ruling 1); an integer member reads `value2 = 2`, a negative one `valueMinus2 = -2` |
| `object` | record `type`. Both strip a surplus key, so the two agree on every payload |
| `strictObject` | record `type`, plus one counted `strict-unknown-keys` widening |
| `lazy` and other self-references | a record that names itself; VelarScript records are recursive |
| `discriminatedUnion` | tag `enum` + one record per case + a union alias |
| union of primitives, lists, and aliases | VelarScript union |

Anything else is **fail-closed**: generation stops and names the schema path and
the reason. That covers catchall objects (`z.looseObject`, `.catchall(T)`: they
keep a surplus key in the parsed value, which a fixed record shape cannot
carry), `transform`/`pipe`/effects, `default`, `catch`, `z.date`, `z.any`,
tuples, intersections, zero-field records, non-string record keys, record unions
with no discriminator, field names that are not VelarScript identifiers, and any
literal whose value is not a string or a safe integer — a boolean, `null`, a
fraction, a bigint, or an integer past `Number.MAX_SAFE_INTEGER`, each named for
what it is.

### Surplus keys, and why `z.object` is the exact one

A VelarScript record drops what its type does not declare, permanently: that is
[D102](https://github.com/VelarOS-AI/VelarScript) ruling 2 — *the type is the
contract, and data outside the contract does not exist for the program*. So the
three zod spellings stand in three different relations to it:

| zod | a surplus key | Vel record `parse` | relation |
| --- | --- | --- | --- |
| `z.object` | stripped | stripped | equivalent, sample for sample |
| `z.strictObject` | the value is rejected | stripped | widened; counted as `strict-unknown-keys` |
| `z.looseObject`, `.catchall(T)` | kept in the parsed value | stripped | the parsed value differs; refused |

Only the third loses information a consumer could have read, so only it is
refused. The equivalence fixtures carry surplus-key payloads on both sides of
the first row.

To accept one of those as opaque data, exempt its path:

```json
"unknownDegrade": [{ "path": "RunTurnRequestSchema.options", "reason": "forwarded to the agent untouched" }]
```

The field becomes `unknown` — or `unknown?`, when the zod schema at that path
lets the sender leave the key out — and the degrade appears in the generation
report with its path and reason. A degrade that no longer matches anything is
also reported, so an exemption cannot outlive the schema that needed it.

An exemption covers **the path it names and no other**. One schema object
standing in two records occupies two positions, and each is a decision the
consumer makes for itself: exempting the first leaves the second refused, by its
own path, until it is exempted too.

### Tuples, and why the near miss is refused

A tuple is a fixed-length heterogeneous sequence, and VelarScript has no such
type. Its positional collection is `List<T>` — one element type, any length —
and the only other thing that holds values in fixed slots is a record, which
holds them by name. Both of a tuple's claims, its arity and its per-position
types, are unspellable.

The near miss is `List<A | B>`, and this table refuses it rather than applying
it. Every divergence the generator declares is a widening on one nameable
dimension that is *inherent* to the mapping: a record is the only thing an object
can become, so `z.strictObject`'s surplus-key widening is forced rather than
chosen. A list is not the only thing a tuple could become — it is a substitution
— and it diverges on two dimensions at once, because the list also accepts an
empty value, a reordered one, and a longer one. Arity and order are the whole
content of a positional contract, so a generated type that drops both would
describe the wire incorrectly while reading as though it described it, which is
worse for a consumer than being told the shape has no type.

The refusal therefore names what the language lacks, and names both exits:

- **Exempt the path**, when the tuple is what a consumer *builds* rather than
  what it parses. A write-side request payload crosses as `unknown` either way.
  The fixture carries this route end to end, and its golden samples record
  exactly what the exemption stops checking — a reordered pair, a short one, and
  a long one all reach the wire.
- **Change the contract**, since a wire tuple is usually a record with its field
  names left out. `z.object({ key: …, value: … })` maps exactly, and reads
  better at every consumer.

## What the report says out loud

Two kinds of information cannot cross into a VelarScript type, so both are
reported rather than silently dropped:

- **zod refinements.** `min_length`, `regex`, `email`, `safeint`, and a
  `.refine()` on a whole record are predicates on a value, not a shape. They are
  listed per path; the consumer owns them. A zod 4 top-level format schema
  (`z.email()`, `z.iso.datetime()`, `z.int()`) keeps its constraint on
  `_def.format` rather than `_def.checks`, and reads the same as its chained
  spelling here.
- **Boundary widenings.** Four are inherent to the mapping:
  - `strict-unknown-keys` — `z.strictObject` rejects a surplus key; a
    VelarScript record accepts the value and drops the key.
  - `optional-accepts-null` — `z.optional()` rejects an explicit `null`; `T?`
    accepts it.
  - `nullable-accepts-absent` — `z.nullable()`, and any union carrying
    `z.null()`, rejects an absent key; a `T?` field accepts it.
  - `optional-null-widened-to-unknown` — an optional `z.null()` accepts an
    absent key, and the language writes no `null?`, so the position becomes
    `unknown?` rather than losing its optionality.

  The middle two are the undefined-to-null normalization this generator is
  specified to apply. All four are counted, explained, and locked by the
  equivalence fixtures. Optionality itself is never dropped: every declared
  divergence is a widening, and a lost `?` would be a narrowing.

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

## Real-target acceptance

The package is accepted against real shipped contracts, not only its own
fixtures. `tests/real-targets/` holds the committed run over
`@velaros-ai/agent`'s `./protocol` and `@velaros-ai/kernel`'s
`./contracts/protocol`, with the manifests, the generated `.vel`, the
generation reports, a minimal Vel project that `velar check` passes on, and
equivalence samples over real payloads.

| Target | Exported schemas | Declarations | Degrades | Refinements reported |
| --- | --- | --- | --- | --- |
| `@velaros-ai/agent` `./protocol` | 92 | 108 | 52 | 48 |
| `@velaros-ai/kernel` `./contracts/protocol` | 56 | 76 | 13 | 77 |

D102 ruling 1 took 21 exemptions off the agent's list and 15 off the kernel's:
every one of them was an integer protocol-version literal, and each is now a
pinned enum member the generated type checks. Version pinning is the anti-drift
mechanism of these protocols, so it is the part that most needed to survive the
crossing.

Every degrade names a path and a reason; the reports list them in full. The
committed reports carry no machine path and no record of whether the run that
made them had to write, so a regeneration on another machine reproduces them
byte for byte — a test asserts exactly that. See
[`tests/real-targets/README.md`](tests/real-targets/README.md) for how the
schemas are reached without installing the authenticated packages.

## Limits

- Schemas are read from a module loaded once per process. The CLI is one-shot;
  calling `run()` repeatedly in a long-lived process will not see a contract file
  edited in the meantime.
- The generator reads the compiled JavaScript of the contract package, so that
  package has to be built or installed first — and has to be *importable*: for
  a package compiled under bundler resolution, see the bundle loader above.
- One production dependency, `esbuild`, and only the bundle loader loads it.
