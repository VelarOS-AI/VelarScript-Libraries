import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import test from "node:test";

import {
  DIVERGENCE_CLASSES,
  FIXTURES,
  readSamples,
  runVelSweep,
  velarExecutable,
} from "./support/equivalence.mjs";

const PROJECT = join(FIXTURES, "vel");
const samples = readSamples(join(FIXTURES, "samples.json"));

function velar(args) {
  return spawnSync(velarExecutable(), args, { encoding: "utf8" });
}

test("the generated project passes `velar check`", () => {
  const result = velar(["check", PROJECT]);
  assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
  assert.match(result.stdout, /Checked \d+ modules/u);
});

test("the generated declarations behave as their fixture tests describe", () => {
  const result = velar(["test", PROJECT]);
  assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
  assert.match(result.stdout, /0 failed/u);
});

// `z.undefined()` accepts a key holding undefined, and JSON cannot write one,
// so no wire payload satisfies it. The exception is named rather than hidden.
const NOT_JSON_SATISFIABLE = new Set(["UndefinedField"]);

test("the sample set covers every mapping shape with positive and negative payloads", () => {
  assert.ok(samples.length >= 50, `only ${samples.length} samples`);
  const bySchema = new Map();
  for (const sample of samples) {
    const entry = bySchema.get(sample.schema) ?? { zodAccept: 0, velAccept: 0, velRefuse: 0 };
    if (sample.zod) entry.zodAccept += 1;
    if (sample.vel) entry.velAccept += 1;
    else entry.velRefuse += 1;
    bySchema.set(sample.schema, entry);
  }
  for (const [schema, counts] of bySchema) {
    assert.ok(counts.velAccept > 0, `${schema} has no payload the generated type accepts`);
    assert.ok(counts.velRefuse > 0, `${schema} has no payload the generated type refuses`);
    if (NOT_JSON_SATISFIABLE.has(schema)) assert.equal(counts.zodAccept, 0, `${schema} is satisfiable after all`);
    else assert.ok(counts.zodAccept > 0, `${schema} has no payload zod accepts`);
  }
  for (const schema of ["Primitives", "Optionality", "HookEvent", "Collections", "Unions", "Article", "StreamEvent"]) {
    assert.ok(bySchema.has(schema), `${schema} is not covered`);
  }
});

test("zod answers exactly what each sample records", async () => {
  const contracts = await import(join(FIXTURES, "contracts", "contracts.mjs"));
  for (const [index, sample] of samples.entries()) {
    const schema = contracts[sample.zodExport];
    assert.ok(schema !== undefined, `sample ${index}: '${sample.zodExport}' is not exported`);
    const actual = schema.safeParse(sample.payload).success;
    assert.equal(actual, sample.zod, `sample ${index} (${sample.zodExport}, ${sample.why}) zod outcome`);
  }
});

test("generated Type.parse answers exactly what each sample records", () => {
  const sweep = runVelSweep({
    projectDirectory: PROJECT,
    imports: { default: "../generated/contracts.vel" },
    samples,
  });
  assert.equal(sweep.status, 0, `${sweep.output}\n---- driver ----\n${sweep.driver}`);
  assert.match(sweep.output, /0 failed/u);
  // Every sample becomes one named test, plus the committed fixture tests.
  const passed = Number(/(\d+) passed/u.exec(sweep.output)?.[1] ?? "0");
  assert.ok(passed >= samples.length, `${passed} tests ran for ${samples.length} samples`);
});

test("zod acceptance and VelarScript acceptance agree except in the declared divergence classes", () => {
  const observed = new Set();
  for (const [index, sample] of samples.entries()) {
    const label = `sample ${index} (${sample.zodExport}, ${sample.why})`;
    if (sample.divergence === undefined) {
      assert.equal(sample.vel, sample.zod, `${label} must agree or declare a divergence class`);
      continue;
    }
    assert.ok(DIVERGENCE_CLASSES.has(sample.divergence), `${label} names an unknown class '${sample.divergence}'`);
    assert.notEqual(sample.vel, sample.zod, `${label} declares a divergence but both sides agree`);
    assert.equal(sample.vel, true, `${label}: every declared divergence is a widening, never a narrowing`);
    observed.add(sample.divergence);
  }
  // Each declared class must be exercised, or the list is a claim without evidence.
  assert.deepEqual([...observed].sort(), [...DIVERGENCE_CLASSES].sort());
});
