/**
 * `@velarscript-labs/contract-codegen` turns a foreign package's zod wire
 * contracts into checked VelarScript declarations. It reads loaded schema
 * objects, never TypeScript source, and refuses any shape outside its closed
 * mapping table rather than guessing one.
 */

export { renderChannelTable, renderHeader, renderModule } from "./emit.js";
export type { ChannelConstant, ChannelTypeBinding, HeaderFields } from "./emit.js";
export { formatFile, FormatError, resolveVelarExecutable, velarSpawnPlan } from "./format.js";
export type { FormatOptions, SpawnPlan } from "./format.js";
export { DriftError, run, TOOL_NAME } from "./generate.js";
export type { RunOptions } from "./generate.js";
export { optional, renderType } from "./ir.js";
export type { Declaration, EnumMember, RecordField, VelType } from "./ir.js";
export { boundaryDetail, lowerModule, MappingError } from "./lower.js";
export type {
  AppliedDegrade,
  BoundaryNote,
  ConstraintNote,
  LowerOptions,
  LowerResult,
  UnmappedShape,
} from "./lower.js";
export { ManifestError, parseManifest } from "./manifest.js";
export type {
  ChannelBinding,
  ChannelTableEntry,
  DegradeEntry,
  Manifest,
  ModuleEntry,
  NamingRules,
} from "./manifest.js";
export { camelCase, enumMemberName, isVelarIdentifier, NameRegistry, pascalCase, stripSuffix } from "./naming.js";
export { renderReportText } from "./report.js";
export type { ChannelTableReport, FileStatus, GenerationReport, ModuleReport } from "./report.js";
export {
  assertSupportedZod,
  collectExports,
  isZodSchema,
  looksLikeLegacyZod,
  owningPackage,
  REFERENCE_ZOD_VERSION,
  resolveZod,
  SUPPORTED_ZOD_MAJOR,
  ZodVersionError,
} from "./zod-runtime.js";
export type { ExportedSchema, LoadedModule, ZodResolution, ZodSchema } from "./zod-runtime.js";
