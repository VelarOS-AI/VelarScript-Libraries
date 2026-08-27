import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { run } from "../dist/index.js";
import { DIVERGENCE_CLASSES, FIXTURES, readSamples, runVelSweep, velarExecutable } from "./support/equivalence.mjs";
import { REAL_TARGETS, TARGETS, linkPlatform, platformRoot, platformSkipReason } from "./support/platform.mjs";

const samples = readSamples(join(REAL_TARGETS, "samples.json"));
const REPORTS = { "agent.manifest.json": "agent.report.json", "kernel.manifest.json": "kernel.report.json" };

function committedReport(manifest) {
  return JSON.parse(readFileSync(join(REAL_TARGETS, REPORTS[manifest]), "utf8"));
}

function velar(args) {
  return spawnSync(velarExecutable(), args, { encoding: "utf8" });
}

test("the platform's generated contracts pass `velar check`", () => {
  const result = velar(["check", REAL_TARGETS]);
  assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
  assert.match(result.stdout, /Checked \d+ modules/u);
});

test("the platform's generated contracts narrow the way their tests describe", () => {
  const result = velar(["test", REAL_TARGETS]);
  assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
  assert.match(result.stdout, /0 failed/u);
});

test("both real targets are covered with positive and negative payloads", () => {
  const byModule = new Map();
  for (const sample of samples) {
    assert.ok(sample.module === "agent" || sample.module === "kernel", `unknown module '${sample.module}'`);
    const entry = byModule.get(sample.module) ?? { accept: 0, refuse: 0, schemas: new Set() };
    entry.schemas.add(sample.schema);
    if (sample.vel) entry.accept += 1;
    else entry.refuse += 1;
    byModule.set(sample.module, entry);
  }
  for (const module of ["agent", "kernel"]) {
    const entry = byModule.get(module);
    assert.ok(entry !== undefined, `${module} has no samples`);
    assert.ok(entry.accept > 0 && entry.refuse > 0, `${module} needs accepted and refused payloads`);
    assert.ok(entry.schemas.size >= 5, `${module} covers only ${entry.schemas.size} schemas`);
  }
});

test("the generated platform types answer exactly what each sample records", () => {
  const sweep = runVelSweep({
    projectDirectory: REAL_TARGETS,
    imports: {
      agent: "../generated/agent-protocol.vel",
      kernel: "../generated/kernel-protocol.vel",
    },
    samples,
  });
  assert.equal(sweep.status, 0, `${sweep.output}\n---- driver ----\n${sweep.driver}`);
  assert.match(sweep.output, /0 failed/u);
});

test("every declared divergence class is exercised by the fixture or the real targets", () => {
  const observed = new Set();
  for (const sample of [...readSamples(join(FIXTURES, "samples.json")), ...samples]) {
    if (sample.divergence === undefined) continue;
    assert.ok(DIVERGENCE_CLASSES.has(sample.divergence), `unknown class '${sample.divergence}'`);
    observed.add(sample.divergence);
  }
  assert.deepEqual([...observed].sort(), [...DIVERGENCE_CLASSES].sort());
});

test("the committed reports state what each target degraded", () => {
  const agent = committedReport("agent.manifest.json").modules[0];
  const kernel = committedReport("kernel.manifest.json").modules[0];
  assert.equal(agent.sourcePackage, "@velaros-ai/agent");
  assert.equal(kernel.sourcePackage, "@velaros-ai/kernel");
  assert.equal(agent.exportedSchemas, 92);
  assert.equal(kernel.exportedSchemas, 56);
  assert.equal(agent.degrades.length, 44);
  assert.equal(kernel.degrades.length, 24);
  for (const module of [agent, kernel]) {
    assert.deepEqual(module.unusedDegrades, [], `${module.sourcePackage} carries a stale exemption`);
    for (const degrade of module.degrades) assert.ok(degrade.reason.length > 20, degrade.path);
    assert.ok(module.constraints.length > 0, `${module.sourcePackage} reports no refinements`);
    assert.ok(module.boundaryNotes.some((note) => note.kind === "strict-unknown-keys"));
  }
});

const skip = platformSkipReason();

test("zod answers exactly what each real sample records", { skip: skip ?? false }, async () => {
  const root = platformRoot();
  const modules = {
    agent: await import(join(root, "packages", "agent", "dist", "protocol", "index.js")),
    kernel: await import(join(root, "packages", "kernel", "dist", "contracts", "protocol", "index.js")),
  };
  for (const [index, sample] of samples.entries()) {
    const schema = modules[sample.module][sample.zodExport];
    assert.ok(schema !== undefined, `sample ${index}: '${sample.zodExport}' is not exported`);
    const actual = schema.safeParse(sample.payload).success;
    assert.equal(actual, sample.zod, `sample ${index} (${sample.zodExport}, ${sample.why})`);
  }
});

test("real zod acceptance and VelarScript acceptance agree outside the declared classes", { skip: skip ?? false }, () => {
  for (const [index, sample] of samples.entries()) {
    const label = `sample ${index} (${sample.zodExport}, ${sample.why})`;
    if (sample.divergence === undefined) {
      assert.equal(sample.vel, sample.zod, `${label} must agree or declare a divergence class`);
      continue;
    }
    assert.ok(DIVERGENCE_CLASSES.has(sample.divergence), `${label} names an unknown class`);
    assert.notEqual(sample.vel, sample.zod, `${label} declares a divergence but both sides agree`);
    assert.equal(sample.vel, true, `${label}: every declared divergence is a widening`);
  }
});

test("regenerating from the platform reproduces the committed output byte for byte", { skip: skip ?? false }, async () => {
  const root = platformRoot();
  const linked = linkPlatform("real", root);
  try {
    for (const [manifest] of TARGETS) {
      const report = await run({
        manifestPath: join(linked.directory, manifest),
        mode: "generate",
        toolVersion: JSON.parse(readFileSync(join(REAL_TARGETS, "..", "..", "package.json"), "utf8")).version,
      });
      for (const file of report.files) {
        const produced = readFileSync(join(linked.directory, "generated", file.output), "utf8");
        const committed = readFileSync(join(REAL_TARGETS, "generated", file.output), "utf8");
        assert.equal(produced, committed, `${file.output} drifted from the committed artifact`);
      }
      const stored = committedReport(manifest);
      const [produced] = report.modules;
      const [expected] = stored.modules;
      assert.equal(produced.schemaDigest, expected.schemaDigest, `${manifest} schema digest`);
      assert.equal(produced.exportedSchemas, expected.exportedSchemas);
      assert.equal(produced.declarations, expected.declarations);
      assert.deepEqual(produced.degrades, expected.degrades);
      assert.deepEqual(produced.constraints, expected.constraints);
      assert.deepEqual(produced.boundaryNotes, expected.boundaryNotes);
      assert.equal(produced.sourceVersion, expected.sourceVersion, `${manifest} source package version`);
      assert.equal(stored.zod.resolved, report.zod.resolved, `${manifest} zod version`);
    }
  } finally {
    linked.dispose();
  }
});
