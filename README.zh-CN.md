# VelarScript Libraries

这是 VelarScript 官方维护的可选库与外部适配器仓库。

它与 [VelarScript 主仓库](https://github.com/VelarOS-AI/VelarScript) 物理独立：
这里的包必须显式安装、独立版本化，不获得 `velar/*` 标准库名字或编译器特权，
主仓库也不会反向依赖本仓库。

当前包含：

- `@velarscript-labs/database`：数据库无关的函数式命令、查询与有界执行器；
- `@velarscript-labs/text-buffer`：有界增量文本缓冲；
- `@velarscript-labs/noise`：确定性 simplex noise 适配器；
- `@velarscript-labs/msgpack`：有界 MessagePack 编解码；
- `@velarscript-labs/compression`：有界 DEFLATE/gzip；
- `@velarscript-labs/editor-kit`：编辑器接入 `velar lsp` 的中立元数据与兼容检查；
- `@velarscript-labs/yaml`：严格、有界的 YAML 解析边界；
- `@velarscript-labs/sqlite`：Node Worker 隔离、串行化且有界的 SQLite 能力。

全部非标准包统一使用公开 npm scope `@velarscript-labs`；`@velarscript/*` 只保留
语言工具链、标准能力所有者和官方目标框架。只安装应用实际使用的包：

```sh
velar add @velarscript-labs/msgpack@0.1.1
```

```velar
import {encode, parse} from "@velarscript-labs/msgpack"
```

`velar lsp` 服务端、编译器语义、诊断、格式化和框架能力仍由项目本地工具链
提供。`editor-kit` 不携带第二份语言实现。

产品模型、业务规则、数据库表结构、迁移 SQL 和部署配置必须留在所属应用。
`database` 不提供 ORM、实体追踪、关系映射、schema 推导、查询构造器或迁移语言；
`sqlite` 只负责连接、事务、并发、边界和清理。应用通过普通函数声明自己的操作，
并在结果刚离开驱动时完成 runtime type 校验。

开发要求 Node.js 24 或更高版本：

```sh
npm install
npm run validate
```

验证会检查全部包、运行真实依赖测试、打包公开产物，并在干净消费者中安装和执行
这些 tarball。仓库当前统一面向 VelarScript `>=0.13 <0.14`。

发布不属于 `validate`。提交、推送、打标签、npm 发布、从旧 `@velarscript/*`
命名空间移除非标准包与 deprecate 仍是可分别审计的操作。

提交代码或问题前，请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)、
[SECURITY.md](SECURITY.md) 与 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。
