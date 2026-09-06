import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

const artifactPath = fileURLToPath(new URL("../dist/index.js", import.meta.url));
const generatedRuntimePath = fileURLToPath(new URL("../src/generated/runtime.vel", import.meta.url));

test("the frozen artifact closes the generated MessagePack runtime", async () => {
  const artifact = await readFile(artifactPath, "utf8");
  assert.doesNotMatch(artifact, /\bfrom\s*["']msgpackr(?:\/[^"']*)?["']/u);
  assert.doesNotMatch(artifact, /\bcreateRequire\b/u);
  assert.doesNotMatch(artifact, /globalThis\s*\[[^\]]+\]/u);
});

test("the generated runtime uses a closed typed-array constructor dispatch", async () => {
  const runtime = await readFile(generatedRuntimePath, "utf8");
  assert.match(runtime, /Int8Array/u);
  assert.match(runtime, /BigUint64Array/u);
  assert.doesNotMatch(runtime, /globalThis\s*\[[^\]]+\]/u);
  assert.doesNotMatch(runtime, /\b(?:import|export)\b[^\n]*\bfrom\s*["']msgpackr/u);
});
