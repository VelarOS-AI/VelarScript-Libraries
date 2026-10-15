# @velarscript-labs/yaml

Strict, bounded YAML parsing for VelarScript applications. The package returns
`unknown` deliberately: a reusable parser cannot know an application's data
shape, so callers validate the result with their own runtime type.

```velar
import {parseYaml} from "@velarscript-labs/yaml"

type Settings:
    port: number

const settings = Settings.parse(parseYaml("port: 3000"))
```

`parseYaml` rejects blank input, duplicate keys, documents beyond `maxBytes`,
and alias expansion beyond `maxAliases`. Defaults are 1 MiB and 100 aliases;
the accepted hard ceilings are 64 MiB and 1,000 aliases.

The package owns a generated, pure-ESM parser runtime. Applications do not
need to install `yaml`, and production builds never discover a CommonJS or
host-specific parser branch at runtime.
