# @velarscript/yaml

Strict, bounded YAML parsing for VelarScript applications. The package returns
`unknown` deliberately: a reusable parser cannot know an application's data
shape, so callers validate the result with their own runtime type.

```velar
import {parseYaml} from "@velarscript/yaml"

type Settings:
    port: number

const settings = Settings.parse(parseYaml("port: 3000"))
```

`parseYaml` rejects blank input, duplicate keys, documents beyond `maxBytes`,
and alias expansion beyond `maxAliases`. Defaults are 1 MiB and 100 aliases;
the accepted hard ceilings are 64 MiB and 1,000 aliases.
