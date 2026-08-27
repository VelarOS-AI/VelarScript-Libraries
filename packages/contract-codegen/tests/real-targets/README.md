# Real-target acceptance

This directory holds the acceptance run against real, shipped wire contracts:
`@velaros-ai/agent`'s `./protocol` (92 exported zod schemas) and
`@velaros-ai/kernel`'s `./contracts/protocol` (56). Everything here is committed
output, so the acceptance keeps its value on a machine with no platform
checkout.

The generated declarations carry integer enum wire values (D102 ruling 1), so
`velar check` and `velar test` over this directory need a VelarScript newer than
`v0.20.1` — the package's `file:` devDependency on a sibling checkout is what
supplies it until the next release.

| File | What it is |
| --- | --- |
| `agent.manifest.json`, `kernel.manifest.json` | The generator input, including every `unknownDegrade` exemption with its reason. |
| `generated/*.vel` | The committed generated declarations and channel tables. |
| `agent.report.json`, `kernel.report.json` | The machine-readable generation reports: degrades, refinements, boundary widenings, schema digests. |
| `samples.json` | Equivalence samples over real payloads, with the answer zod gives and the answer the generated type gives. |
| `velar.json`, `main.vel`, `tests/real.test.vel` | A minimal Vel project that consumes the generated types; `velar check` and `velar test` run on it in the package's own `check` and `test` scripts. |

## Where the schemas come from

The platform packages publish to GitHub Packages behind authentication, so the
acceptance does not install them. It reads a **local VelarOS-Platform
checkout's own build output** — the same compiled JavaScript a consumer would
install — and never writes to that repository. `tests/support/platform.mjs`
finds the checkout at `../../../VelarOS-Platform` relative to this repository,
or at `VELAROS_PLATFORM_ROOT`, and materializes the `platform/agent` and
`platform/kernel` links the manifests declare inside a temporary directory, so
no machine-specific path enters a committed file.

When no built checkout is present, the tests that need the real zod schemas
skip and the rest still run: `velar check`, `velar test`, and the full
equivalence sweep against the committed generated declarations.
