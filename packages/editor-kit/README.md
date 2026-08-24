# @velarscript-labs/editor-kit

Editor-neutral metadata for connecting an editor to the project-local
`velar lsp` server.

The package exports the VelarScript language contribution, fallback keyword
roster, protocol-version reader, and compatibility assertion. Its `node`
subpath resolves the nearest project-local `node_modules/.bin/velar` without
implementing an LSP transport.

The initial compatibility window accepts protocol 4 from the published 0.12.1
toolchain and protocol 5 from the current toolchain line. Hosts still inspect
server capabilities instead of assuming that every supported version exposes
the same optional feature set.

```ts
import {
  VelarLanguageService,
  assertVelarProtocolCompatible,
} from "@velarscript-labs/editor-kit"
import {resolveVelarExecutable} from "@velarscript-labs/editor-kit/node"

const executable = resolveVelarExecutable(projectRoot)
// Launch: executable + VelarLanguageService.args
// After initialize: assertVelarProtocolCompatible(result)
```

Diagnostics, completion, hover, rename, formatting, semantic tokens, and
framework semantics remain owned by the installed VelarScript toolchain.
