/** The machine-readable generation report. `--check` and CI read this shape. */

import type { AppliedDegrade, BoundaryNote, ConstraintNote } from "./lower.js";

export interface ModuleReport {
  readonly specifier: string;
  readonly output: string;
  readonly sourcePackage: string;
  readonly sourceVersion: string | null;
  readonly schemaDigest: string;
  readonly exportedSchemas: number;
  readonly declarations: number;
  readonly degrades: readonly AppliedDegrade[];
  readonly constraints: readonly ConstraintNote[];
  readonly boundaryNotes: readonly BoundaryNote[];
  readonly renamed: readonly { readonly name: string; readonly requested: string }[];
  readonly unusedDegrades: readonly string[];
}

export interface ChannelTableReport {
  readonly output: string;
  readonly enumName: string;
  readonly channels: number;
  readonly bindings: number;
}

export interface FileStatus {
  readonly output: string;
  readonly status: "written" | "unchanged" | "drift" | "missing";
}

export interface GenerationReport {
  readonly tool: string;
  readonly toolVersion: string;
  readonly mode: "generate" | "check";
  readonly zod: { readonly supportedMajor: number; readonly resolved: string; readonly path: string };
  readonly formatted: boolean;
  readonly modules: readonly ModuleReport[];
  readonly channelTables: readonly ChannelTableReport[];
  readonly files: readonly FileStatus[];
  readonly ok: boolean;
}

export function renderReportText(report: GenerationReport): string {
  const lines: string[] = [];
  lines.push(`${report.tool} ${report.toolVersion} (${report.mode})`);
  lines.push(`zod ${report.zod.resolved} (supported major ${report.zod.supportedMajor})`);
  for (const module of report.modules) {
    lines.push("");
    lines.push(`${module.output} <- ${module.sourcePackage}${module.sourceVersion === null ? "" : `@${module.sourceVersion}`} "${module.specifier}"`);
    lines.push(`  ${module.exportedSchemas} exported schemas -> ${module.declarations} declarations`);
    lines.push(`  digest ${module.schemaDigest}`);
    if (module.degrades.length > 0) {
      lines.push(`  ${module.degrades.length} unknown degrade${module.degrades.length === 1 ? "" : "s"}:`);
      for (const degrade of module.degrades) lines.push(`    ${degrade.path} (${degrade.zodType}): ${degrade.reason}`);
    }
    if (module.constraints.length > 0) {
      lines.push(`  ${module.constraints.length} zod refinement${module.constraints.length === 1 ? "" : "s"} the consumer owns:`);
      for (const constraint of module.constraints.slice(0, 20)) {
        lines.push(`    ${constraint.path} (${constraint.zodType}): ${constraint.checks.join(", ")}`);
      }
      if (module.constraints.length > 20) lines.push(`    ... ${module.constraints.length - 20} more`);
    }
    for (const boundary of module.boundaryNotes) {
      lines.push(`  ${boundary.kind} x${boundary.count}: ${boundary.detail}`);
    }
    for (const renamed of module.renamed) {
      lines.push(`  renamed '${renamed.requested}' to '${renamed.name}' to avoid a collision`);
    }
    for (const unused of module.unusedDegrades) {
      lines.push(`  unused degrade '${unused}': the schema no longer needs it`);
    }
  }
  for (const table of report.channelTables) {
    lines.push("");
    lines.push(`${table.output}: ${table.channels} channels, ${table.bindings} type bindings`);
  }
  lines.push("");
  for (const file of report.files) lines.push(`  ${file.status.padEnd(9)} ${file.output}`);
  return `${lines.join("\n")}\n`;
}
