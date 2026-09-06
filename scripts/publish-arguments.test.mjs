import assert from "node:assert/strict";
import test from "node:test";

import {
  parsePublishArguments,
  selectCatalogPackages,
} from "./publish-arguments.mjs";

const packages = [
  "@velarscript-labs/msgpack",
  "@velarscript-labs/sqlite",
];

test("keeps the default all-package behavior", () => {
  assert.deepEqual(parsePublishArguments([], packages), {
    dryRun: false,
    packageNames: null,
  });
});

test("accepts an explicit repeated package allowlist", () => {
  assert.deepEqual(
    parsePublishArguments([
      "--package",
      "@velarscript-labs/msgpack",
      "--dry-run",
      "--package",
      "@velarscript-labs/sqlite",
    ], packages),
    {
      dryRun: true,
      packageNames: [
        "@velarscript-labs/msgpack",
        "@velarscript-labs/sqlite",
      ],
    },
  );
});

test("filters the catalog to the exact allowlist in catalog order", () => {
  const catalog = [
    { name: "@velarscript-labs/sqlite" },
    { name: "@velarscript-labs/msgpack" },
  ];

  assert.deepEqual(
    selectCatalogPackages(catalog, ["@velarscript-labs/msgpack"]),
    [{ name: "@velarscript-labs/msgpack" }],
  );
  assert.equal(selectCatalogPackages(catalog, null), catalog);
});

test("rejects an unknown package", () => {
  assert.throws(
    () => parsePublishArguments([
      "--package",
      "@velarscript-labs/unknown",
    ], packages),
    /Unknown catalog package: @velarscript-labs\/unknown/,
  );
});

test("rejects a duplicate package", () => {
  assert.throws(
    () => parsePublishArguments([
      "--package",
      "@velarscript-labs/msgpack",
      "--package",
      "@velarscript-labs/msgpack",
    ], packages),
    /Duplicate package selection: @velarscript-labs\/msgpack/,
  );
});

test("rejects a package option without a value", () => {
  assert.throws(
    () => parsePublishArguments(["--package"], packages),
    /--package requires an exact catalog package name/,
  );
  assert.throws(
    () => parsePublishArguments(["--package", ""], packages),
    /--package requires an exact catalog package name/,
  );
  assert.throws(
    () => parsePublishArguments(["--package", "--dry-run"], packages),
    /--package requires an exact catalog package name/,
  );
});

test("rejects unsupported argument forms", () => {
  assert.throws(
    () => parsePublishArguments([
      "--package=@velarscript-labs/msgpack",
    ], packages),
    /Unknown publish argument/,
  );
  assert.throws(
    () => parsePublishArguments(["--latest"], packages),
    /Unknown publish argument/,
  );
});
