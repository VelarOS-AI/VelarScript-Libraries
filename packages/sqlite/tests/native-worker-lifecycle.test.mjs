import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const velarSource = await readFile(new URL("../src/index.vel", import.meta.url), "utf8");
const bridgeMarker = "extern js`";
const bridgeStart = velarSource.indexOf(bridgeMarker);
assert.notEqual(bridgeStart, -1, "SQLite source omitted its native bridge");
const bridgeBodyStart = bridgeStart + bridgeMarker.length;
const bridgeEnd = velarSource.indexOf("\n`:", bridgeBodyStart);
assert.notEqual(bridgeEnd, -1, "SQLite native bridge is unterminated");
const bridge = await import(`data:text/javascript;charset=utf-8,${encodeURIComponent(velarSource.slice(bridgeBodyStart, bridgeEnd))}`);

function workerSource(body) {
  return `
    import { parentPort } from "node:worker_threads";
    ${body}
  `;
}

async function rejectsSoon(promise, validate) {
  let timer;
  try {
    await assert.rejects(Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("SQLite lifecycle operation timed out")), 2_000);
      }),
    ]), validate);
  } finally {
    clearTimeout(timer);
  }
}

test("native bridge rejects a code-zero Worker exit before readiness", async () => {
  await rejectsSoon(
    bridge.openNativeSqlite(":memory:", {}, workerSource("parentPort.close();")),
    (error) => error?.sqliteCode === "SQLITE_WORKER" && /unexpectedly with code 0/u.test(error.message),
  );
});

test("native bridge rejects pending work when a ready Worker exits with code zero", async () => {
  const database = await bridge.openNativeSqlite(":memory:", {}, workerSource(`
    parentPort.postMessage({ kind: "ready" });
    parentPort.once("message", () => parentPort.close());
  `));
  await rejectsSoon(
    database.execute(["SELECT 1"], []),
    (error) => error?.sqliteCode === "SQLITE_WORKER" && /unexpectedly with code 0/u.test(error.message),
  );
});

test("native bridge terminates and waits for a failed initialization Worker", async () => {
  const started = performance.now();
  await rejectsSoon(
    bridge.openNativeSqlite(":memory:", {}, workerSource(`
      parentPort.postMessage({
        kind: "ready",
        error: { message: "synthetic initialization failure", sqliteCode: "SQLITE_OPEN", operation: "open", retryable: false },
      });
      setInterval(() => {}, 1_000);
    `)),
    (error) => error?.sqliteCode === "SQLITE_OPEN" && error.message === "synthetic initialization failure",
  );
  assert.ok(performance.now() - started < 1_000, "openNativeSqlite hung after the Worker reported failed initialization");
});

test("native bridge treats an acknowledged close as the only normal code-zero exit", async () => {
  const database = await bridge.openNativeSqlite(":memory:", {}, workerSource(`
    parentPort.postMessage({ kind: "ready" });
    parentPort.once("message", (message) => {
      parentPort.postMessage({ kind: "response", id: message.id, value: null });
      parentPort.close();
    });
  `));
  await database.close();
});
