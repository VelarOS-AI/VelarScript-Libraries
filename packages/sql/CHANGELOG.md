# Changelog

## 0.1.3 — 2026-08-27

- Rebuild the frozen library artifact with VelarScript 0.18 and depend on
  Database 0.3.3.

## 0.1.2 — 2026-08-25

- Rebuild the frozen library artifact with VelarScript 0.15, require the 0.15
  language generation, and depend on Database 0.3.2.

## 0.1.1 — 2026-08-24

- Require VelarScript language generation 0.14, verify distribution with CLI
  0.14.2, and depend on the matching Database 0.3.1 compatibility release.

## 0.1.0 — 2026-08-24

- Add Velar-style SELECT, join, insert, update, and delete builders over opaque
  structured database statements.
- Add checked ANSI identifier quoting, bound predicates, tuple membership,
  ordering, pagination, typed query construction, and affected-row commands.
- Add named-column selection and bound comparison shorthands for common cases.
- Require explicit predicates for updates and deletes, with `sqlAllRows()` as
  the searchable opt-in for intentional whole-table writes.
