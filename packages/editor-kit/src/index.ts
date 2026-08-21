export const VELAR_LANGUAGE_SERVER_PROTOCOL_VERSION = 5;
export const VELAR_SUPPORTED_LANGUAGE_SERVER_PROTOCOL_VERSIONS = Object.freeze([4, 5] as const);

export const VELAR_LANGUAGE_KEYWORDS = Object.freeze([
  "abstract", "and", "as", "assert", "async", "await", "break", "catch",
  "case", "class", "const", "continue", "constructor", "def", "else", "enum",
  "export", "extends", "extern", "false", "finally", "for", "from", "get",
  "if", "import", "in", "is", "js", "let", "match", "module", "not", "null",
  "or", "override", "pass", "private", "readonly", "return", "static", "super",
  "test", "throw", "true", "try", "type", "unsafe", "using", "while",
] as const);

export interface VelarLanguageServiceDescriptor {
  readonly id: "velarscript";
  readonly label: "VelarScript";
  readonly packageName: "@velarscript/cli";
  readonly command: "velar";
  readonly args: readonly ["lsp"];
  readonly documentLanguageId: "velar";
  readonly extensions: readonly ["vel"];
  readonly languages: readonly ["velar", "velarscript"];
  readonly projectMarkers: readonly ["velar.json"];
  readonly protocol: {
    readonly capabilityPath: readonly ["capabilities", "experimental", "velar", "protocolVersion"];
    readonly version: number;
    readonly supportedVersions: readonly number[];
  };
  readonly commands: readonly string[];
}

export const VelarLanguageService: VelarLanguageServiceDescriptor = Object.freeze({
  id: "velarscript",
  label: "VelarScript",
  packageName: "@velarscript/cli",
  command: "velar",
  args: Object.freeze(["lsp"] as const),
  documentLanguageId: "velar",
  extensions: Object.freeze(["vel"] as const),
  languages: Object.freeze(["velar", "velarscript"] as const),
  projectMarkers: Object.freeze(["velar.json"] as const),
  protocol: Object.freeze({
    capabilityPath: Object.freeze(["capabilities", "experimental", "velar", "protocolVersion"] as const),
    version: VELAR_LANGUAGE_SERVER_PROTOCOL_VERSION,
    supportedVersions: VELAR_SUPPORTED_LANGUAGE_SERVER_PROTOCOL_VERSIONS,
  }),
  commands: Object.freeze([
    "check", "format", "fix", "dev", "test", "test --browser", "build",
    "verify", "preview", "verify-deployment",
  ]),
});

function objectValue(value: unknown): Readonly<Record<string, unknown>> | null {
  return typeof value === "object" && value !== null
    ? value as Readonly<Record<string, unknown>>
    : null;
}

export function readVelarProtocolVersion(initializeResult: unknown): number | null {
  let current: unknown = initializeResult;
  for (const segment of VelarLanguageService.protocol.capabilityPath) {
    const object = objectValue(current);
    if (!object) return null;
    current = object[segment];
  }
  return Number.isSafeInteger(current) && (current as number) >= 1 ? current as number : null;
}

export function assertVelarProtocolCompatible(initializeResult: unknown): void {
  const received = readVelarProtocolVersion(initializeResult);
  if (received === null || !VELAR_SUPPORTED_LANGUAGE_SERVER_PROTOCOL_VERSIONS.includes(received as 4 | 5)) {
    const label = received === null ? "missing" : String(received);
    throw new RangeError(
      `VelarScript language server protocol ${label} is incompatible; supported versions are ${VELAR_SUPPORTED_LANGUAGE_SERVER_PROTOCOL_VERSIONS.join(", ")}`,
    );
  }
}
