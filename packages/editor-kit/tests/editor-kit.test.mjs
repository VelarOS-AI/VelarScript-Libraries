import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  VELAR_LANGUAGE_SERVER_PROTOCOL_VERSION,
  VELAR_SUPPORTED_LANGUAGE_SERVER_PROTOCOL_VERSIONS,
  VelarLanguageService,
  assertVelarProtocolCompatible,
  readVelarProtocolVersion,
} from "../dist/index.js";
import { resolveVelarExecutable, velarExecutableCandidates } from "../dist/node.js";

test("the editor contribution describes the project-local standard LSP server", () => {
  assert.equal(VelarLanguageService.command, "velar");
  assert.deepEqual(VelarLanguageService.args, ["lsp"]);
  assert.deepEqual(VelarLanguageService.projectMarkers, ["velar.json"]);
  assert.equal(VelarLanguageService.protocol.version, VELAR_LANGUAGE_SERVER_PROTOCOL_VERSION);
  assert.deepEqual(VelarLanguageService.protocol.supportedVersions, [4, 5]);
  assert.deepEqual(VELAR_SUPPORTED_LANGUAGE_SERVER_PROTOCOL_VERSIONS, [4, 5]);
});

test("protocol compatibility is read from the server-owned initialize result", () => {
  const result = {
    capabilities: { experimental: { velar: { protocolVersion: VELAR_LANGUAGE_SERVER_PROTOCOL_VERSION } } },
  };
  assert.equal(readVelarProtocolVersion(result), VELAR_LANGUAGE_SERVER_PROTOCOL_VERSION);
  assert.doesNotThrow(() => assertVelarProtocolCompatible(result));
  assert.doesNotThrow(() => assertVelarProtocolCompatible({
    capabilities: { experimental: { velar: { protocolVersion: 4 } } },
  }));
  assert.throws(() => assertVelarProtocolCompatible({ capabilities: {} }), /protocol missing/u);
  assert.throws(
    () => assertVelarProtocolCompatible({ capabilities: { experimental: { velar: { protocolVersion: 3 } } } }),
    /protocol 3 is incompatible/u,
  );
});

test("the nearest project-local Velar executable wins", async () => {
  const root = await mkdtemp(join(tmpdir(), "velar-editor-kit-"));
  const project = join(root, "workspace", "project");
  const bin = join(root, "workspace", "node_modules", ".bin");
  await mkdir(project, { recursive: true });
  await mkdir(bin, { recursive: true });
  const executable = join(bin, process.platform === "win32" ? "velar.cmd" : "velar");
  await writeFile(executable, "", "utf8");
  assert.ok(velarExecutableCandidates(project).includes(executable));
  assert.equal(resolveVelarExecutable(project), executable);
  assert.equal(resolveVelarExecutable(project, { command: "custom-velar" }), "custom-velar");
});
