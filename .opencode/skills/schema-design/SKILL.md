---
name: Schema Design
description: Convert the data model into a concrete, constrained schema
---

# Schema Design

Owned by `database-architect`. Output: `docs/projects/<id>/data/schema.sql`.

## Workflow

1. Translate each entity into a table.
2. Choose types deliberately (uuid vs serial, text vs varchar, timestamptz).
3. Add primary keys, foreign keys, and `NOT NULL` where required.
4. Add unique constraints and check constraints.
5. Add indexes for known query patterns.
6. Add `created_at` / `updated_at` timestamps.

## Rules

- Use `timestamptz` for time.
- Prefer `uuid` for public-facing ids; never expose sequential ids.
- Enforce integrity in the database, not only in code.
- Document every table and non-obvious column.
- No nullable column without a reason.
