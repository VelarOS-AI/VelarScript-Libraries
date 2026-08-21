# Security policy

Security fixes are supported for the latest published version of each package
that is not marked `deprecated` in `catalog.json`.

Do not disclose a suspected vulnerability in a public issue. Use GitHub's
private vulnerability reporting for this repository and include the affected
package and version, impact, reproduction, and any known mitigation. The
maintainers will acknowledge the report, validate the affected range, prepare a
coordinated fix, and credit the reporter unless anonymity is requested.

Package limits and validation do not make untrusted native dependencies safe by
themselves. Reports about an upstream dependency should identify both the
upstream advisory and the reachable VelarScript package surface.
