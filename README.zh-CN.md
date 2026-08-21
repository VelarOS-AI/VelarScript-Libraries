# VelarScript Libraries

这是 VelarScript 官方维护的可选库与外部适配器仓库。

它与 [VelarScript Core](https://github.com/VelarOS-AI/VelarScript) 物理独立：
这里的包必须显式安装、独立版本化，不获得 `velar/*` 标准库名字或编译器特权，
Core 也不会反向依赖本仓库。

首批包含：

- `@velarscript/text-buffer`：有界增量文本缓冲；
- `@velarscript/noise`：确定性 simplex noise 适配器；
- `@velarscript/msgpack`：有界 MessagePack 编解码；
- `@velarscript/compression`：有界 DEFLATE/gzip；
- `@velarscript/editor-kit`：编辑器接入 `velar lsp` 的中立元数据与兼容检查。

安装与普通 npm/VelarScript 包完全一致：

```sh
velar add @velarscript/msgpack
```

```velar
import {encode, parse} from "@velarscript/msgpack"
```

`velar lsp` 服务端、编译器语义、诊断、格式化和框架能力仍由项目本地工具链
提供。`editor-kit` 不携带第二份语言实现。

开发要求 Node.js 24 或更高版本：

```sh
npm install
npm run validate
```

提交、推送、打标签、npm 发布与 deprecate 仍是彼此独立的授权边界。

提交代码或问题前，请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)、
[SECURITY.md](SECURITY.md) 与 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。
