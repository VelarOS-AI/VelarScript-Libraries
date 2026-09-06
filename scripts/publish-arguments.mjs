export function parsePublishArguments(arguments_, knownPackageNames) {
  const knownPackages = new Set(knownPackageNames);
  const packageNames = [];
  const selectedPackages = new Set();
  let dryRun = false;

  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];

    if (argument === "--dry-run") {
      dryRun = true;
      continue;
    }

    if (argument !== "--package") {
      throw new Error(`Unknown publish argument: ${argument}`);
    }

    const packageName = arguments_[index + 1];
    if (packageName === undefined || packageName.length === 0 || packageName.startsWith("--")) {
      throw new Error("--package requires an exact catalog package name");
    }
    index += 1;

    if (!knownPackages.has(packageName)) {
      throw new Error(`Unknown catalog package: ${packageName}`);
    }
    if (selectedPackages.has(packageName)) {
      throw new Error(`Duplicate package selection: ${packageName}`);
    }

    selectedPackages.add(packageName);
    packageNames.push(packageName);
  }

  return {
    dryRun,
    packageNames: packageNames.length === 0 ? null : packageNames,
  };
}

export function selectCatalogPackages(catalogPackages, packageNames) {
  if (packageNames === null) return catalogPackages;
  const selectedPackages = new Set(packageNames);
  return catalogPackages.filter((entry) => selectedPackages.has(entry.name));
}
