---
name: MCP Postgres
description: Inspect and validate the project database schema and data during design and testing
---

# MCP Postgres

Use the Postgres MCP server so the Database Architect and Backend can inspect the
live schema and data.

## When to use

- Verifying a migration applied correctly.
- Inspecting tables, columns, indexes, and constraints.
- Confirming seed data for QA.

## Configuration

```jsonc
{
  "mcp": {
    "servers": {
      "postgres": {
        "type": "local",
        "command": ["npx", "-y", "@modelcontextprotocol/server-postgres"],
        "environment": { "DATABASE_URL": "{env:DATABASE_URL}" }
      }
    }
  }
}
```

> Never put a real connection string in the config file; use `{env:DATABASE_URL}`.

## Usage

1. Discover tools with Code Mode `search` (namespace `postgres`).
2. Inspect the schema before writing queries or migrations.
3. Treat results as read-only evidence; make changes through migrations, not ad-hoc SQL.

## Rules

- Read-only inspection by default.
- No destructive statements without explicit user approval.
- Record schema facts in `data/data-model.md`.
