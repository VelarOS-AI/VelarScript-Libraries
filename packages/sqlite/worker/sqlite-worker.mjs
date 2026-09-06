import { Buffer } from "node:buffer";
import { DatabaseSync, constants } from "node:sqlite";
import { isMainThread, parentPort, workerData } from "node:worker_threads";

import { parseStmt } from "sqlite3-parser";

if (isMainThread || parentPort === null) throw new Error("SQLite runtime must execute inside its owned Worker");

let database = null;
let statements = null;
let closed = false;
let initialized = false;

function failure(message, code, operation, retryable = false) {
  const error = new Error(message);
  error.code = code;
  error.operation = operation;
  error.retryable = retryable;
  return error;
}

function errorData(error, operation) {
  const message = error instanceof Error ? error.message : String(error);
  const rawCode = error && typeof error === "object" ? error.errstr ?? error.code ?? null : null;
  const code = rawCode == null ? null : String(rawCode);
  const upper = code == null ? "" : code.toUpperCase();
  return {
    message,
    sqliteCode: code,
    operation: error && typeof error.operation === "string" ? error.operation : operation,
    retryable: error && error.retryable === true || upper.includes("BUSY") || upper.includes("LOCKED"),
  };
}

function parameter(value, budget) {
  if (value === null) return null;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string") {
    budget.value += Buffer.byteLength(value, "utf8");
    return value;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw failure("SQLite number parameters must be finite", "SQLITE_INPUT", "params");
    if (Number.isInteger(value) && !Number.isSafeInteger(value)) throw failure("SQLite integer parameters must be safe integers", "SQLITE_INPUT", "params");
    budget.value += 8;
    return value;
  }
  if (value instanceof Uint8Array) {
    budget.value += value.byteLength;
    return value;
  }
  throw failure("SQLite parameters support only null, bool, string, finite number, and Bytes", "SQLITE_INPUT", "params");
}

function parameters(value) {
  if (!Array.isArray(value) || value.length > 999) throw failure("SQLite parameters must be a List with at most 999 values", "SQLITE_INPUT", "params");
  const budget = { value: 0 };
  const output = value.map((item) => parameter(item, budget));
  if (budget.value > workerData.maxResultBytes) throw failure("SQLite parameters exceed the connection byte limit", "SQLITE_INPUT", "params");
  return output;
}

function statementParts(rawFragments, rawParameters, operation) {
  if (!Array.isArray(rawFragments) || rawFragments.length !== rawParameters.length + 1 || rawFragments.length > 1000) {
    throw failure("SQLite statements require exactly one more SQL fragment than bound parameters", "SQLITE_INPUT", operation);
  }
  let sourceBytes = 0;
  const fragments = rawFragments.map((fragment) => {
    if (typeof fragment !== "string" || fragment.includes("\0") || fragment.includes("?")) {
      throw failure("SQLite SQL fragments must be text without NUL or raw parameter placeholders", "SQLITE_INPUT", operation);
    }
    sourceBytes += Buffer.byteLength(fragment, "utf8");
    return fragment;
  });
  if (sourceBytes === 0 || sourceBytes > 1024 * 1024) throw failure("SQLite SQL must be non-empty text no longer than 1 MiB", "SQLITE_INPUT", operation);
  const bound = parameters(rawParameters);
  const source = fragments.join("?");
  const parsed = parseStmt(source);
  if (parsed.status !== "ok") {
    const message = parsed.errors.length === 0 ? "invalid statement" : parsed.errors[0].message;
    throw failure("SQLite requires exactly one valid statement: " + message, "SQLITE_INPUT", operation);
  }
  return { fragments, bound };
}

function count(value, label) {
  const number = typeof value === "bigint" ? Number(value) : value;
  if (!Number.isSafeInteger(number) || number < 0) throw failure(label + " is outside VelarScript's safe integer range", "SQLITE_INTEGER_RANGE", "result");
  return number;
}

function resultValue(value, budget, field) {
  if (value === null) return null;
  if (typeof value === "string") {
    budget.value += Buffer.byteLength(value, "utf8");
    return value;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw failure("SQLite returned a non-finite number in " + field, "SQLITE_RESULT", "result");
    budget.value += 8;
    return value;
  }
  if (typeof value === "bigint") {
    const number = Number(value);
    if (!Number.isSafeInteger(number)) throw failure("SQLite returned an integer outside VelarScript's safe range in " + field, "SQLITE_INTEGER_RANGE", "result");
    budget.value += 8;
    return number;
  }
  if (value instanceof Uint8Array) {
    budget.value += value.byteLength;
    return value;
  }
  throw failure("SQLite returned an unsupported value in " + field, "SQLITE_RESULT", "result");
}

function resultRow(value, budget) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw failure("SQLite returned a non-record row", "SQLITE_RESULT", "result");
  const output = Object.create(null);
  for (const key of Object.keys(value)) {
    budget.value += Buffer.byteLength(key, "utf8");
    output[key] = resultValue(value[key], budget, key);
    if (budget.value > workerData.maxResultBytes) throw failure("SQLite result exceeds the connection byte limit", "SQLITE_RESULT_LIMIT", "result");
  }
  return output;
}

function execute(message) {
  const statement = statementParts(message.fragments, message.params, "execute");
  const result = statements.run(statement.fragments, ...statement.bound);
  return count(result.changes, "SQLite affected row count");
}

function one(message) {
  const statement = statementParts(message.fragments, message.params, "one");
  const row = statements.get(statement.fragments, ...statement.bound);
  if (row === undefined) return null;
  return resultRow(row, { value: 0 });
}

function all(message) {
  const statement = statementParts(message.fragments, message.params, "all");
  const rows = [];
  const budget = { value: 0 };
  for (const row of statements.iterate(statement.fragments, ...statement.bound)) {
    if (rows.length >= workerData.maxRows) throw failure("SQLite result exceeds the connection row limit", "SQLITE_ROW_LIMIT", "all");
    rows.push(resultRow(row, budget));
  }
  return rows;
}

function dispatch(message) {
  if (closed) throw failure("SQLite connection is closed", "SQLITE_CLOSED", message.operation);
  if (message.operation === "execute") return execute(message);
  if (message.operation === "one") return one(message);
  if (message.operation === "all") return all(message);
  if (message.operation === "begin") {
    if (database.isTransaction) throw failure("SQLite transaction is already active", "SQLITE_TRANSACTION", "begin", true);
    database.exec("BEGIN IMMEDIATE");
    return null;
  }
  if (message.operation === "commit") {
    if (!database.isTransaction) throw failure("SQLite transaction is not active", "SQLITE_TRANSACTION", "commit");
    database.exec("COMMIT");
    return null;
  }
  if (message.operation === "rollback") {
    if (database.isTransaction) database.exec("ROLLBACK");
    return null;
  }
  if (message.operation === "close") {
    let closeError = null;
    try {
      if (database.isTransaction) database.exec("ROLLBACK");
    } catch (error) {
      closeError = error;
    }
    try {
      database.close();
    } catch (error) {
      if (closeError === null) closeError = error;
    }
    closed = true;
    if (closeError !== null) throw closeError;
    return null;
  }
  throw failure("Unknown SQLite operation", "SQLITE_PROTOCOL", String(message.operation));
}

try {
  database = new DatabaseSync(workerData.path, {
    timeout: workerData.busyTimeoutMilliseconds,
    readOnly: workerData.readOnly,
    enableForeignKeyConstraints: true,
    enableDoubleQuotedStringLiterals: false,
    allowExtension: false,
    readBigInts: true,
    allowBareNamedParameters: false,
    allowUnknownNamedParameters: false,
    defensive: true,
    limits: {
      length: workerData.maxResultBytes,
      sqlLength: 1024 * 1024,
      column: 2000,
      exprDepth: 1000,
      compoundSelect: 500,
      vdbeOp: 250000,
      functionArg: 1000,
      attach: 0,
      likePatternLength: 50000,
      variableNumber: 999,
      triggerDepth: 100,
    },
  });
  database.enableDefensive(true);
  database.enableLoadExtension(false);
  database.setAuthorizer((actionCode, arg1, arg2) => {
    if (actionCode === constants.SQLITE_ATTACH || actionCode === constants.SQLITE_DETACH) return constants.SQLITE_DENY;
    if (actionCode === constants.SQLITE_FUNCTION && typeof arg2 === "string" && arg2.toLowerCase() === "load_extension") return constants.SQLITE_DENY;
    return constants.SQLITE_OK;
  });
  statements = database.createTagStore(workerData.statementCacheCapacity);
  if (workerData.journalMode !== null) database.exec("PRAGMA journal_mode = " + workerData.journalMode.toUpperCase());
  initialized = true;
  parentPort.postMessage({ kind: "ready" });
} catch (error) {
  const initializationError = errorData(error, "open");
  try {
    if (database?.isTransaction === true) database.exec("ROLLBACK");
  } catch {
    // Initialization failure reporting must survive best-effort rollback.
  }
  try {
    database?.close();
  } catch {
    // The original initialization error remains the useful failure.
  }
  closed = true;
  try {
    parentPort.postMessage({ kind: "ready", error: initializationError });
  } finally {
    parentPort.close();
  }
}

if (initialized) {
  parentPort.on("message", (message) => {
    let response;
    try {
      const value = dispatch(message);
      response = { kind: "response", id: message.id, value };
    } catch (error) {
      response = { kind: "response", id: message.id, error: errorData(error, message.operation) };
    }
    try {
      parentPort.postMessage(response);
    } finally {
      if (message.operation === "close") parentPort.close();
    }
  });
}
