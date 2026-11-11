---
name: ORM Usage
description: Use the ORM safely, with a clear boundary between app and SQL
---

# ORM Usage

Owned by `database-architect` and `backend`. Default: Prisma (or Drizzle).

## Rules

- One schema file is the source of truth for models.
- Generated migrations, not hand-written DDL (unless the ORM cannot express it).
- Keep ORM calls in the data-access layer, not in routes or components.
- Use transactions for multi-step writes.
- Select only needed fields; avoid loading relations you do not use.

## Workflow

1. Define models and relations in the schema.
2. Generate a migration and review it.
3. Write typed queries in repositories.
4. Add indexes via the schema, not raw SQL.

## Rules

- Never interpolate untrusted input into raw SQL.
- Parameterize everything.
- Prefer the ORM's query builder over `$queryRaw`; when raw is needed, document why.
