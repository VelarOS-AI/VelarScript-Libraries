# Contributing

Start from the ownership question: a package belongs here only when it is
project-neutral and either has two real consumers or removes an already
duplicated external bridge. General usefulness by itself is not admission.

Every package must:

- have one public package identity and an independent semantic version;
- declare its status and compatibility in `catalog.json`;
- declare `velar.entry`, targets, and capabilities when it distributes `.vel`
  source;
- keep native or npm interop inside one checked adapter boundary;
- document applicable limits and failure behavior;
- pass source checks, real dependency execution, tarball inspection, and the
  isolated packed-consumer gate.

Use `experimental` until the public API and limits have been exercised by a
real consumer. Moving to `stable`, publishing under `@velarscript-labs`,
removing a legacy npm package, or deprecating a version is a maintainer decision
and a separately auditable operation.
