---
name: Migrations
description: Evolve the schema safely with reversible, reviewable migrations
---

# Migrations

Owned by `database-architect` and `backend`.

## Rules

- Every schema change is a migration file, never an ad-hoc statement.
- Migrations are ordered, immutable once applied, and reversible where feasible.
- One logical change per migration.
- Test migrations against a copy of production-shaped data.

## Safe-change patterns

| Change | Approach |
|--------|----------|
| Add column | Add nullable or with default; backfill separately |
| Rename column | Add new → backfill → switch → drop old (multi-step) |
| Drop column | Stop using → deploy → drop later |
| Add NOT NULL | Backfill first, then add constraint |

## Workflow

1. Write the migration and its rollback.
2. Apply to a scratch database; verify with `mcp-postgres`.
3. Note any lock/performance impact.
4. Hand to `devops` for release sequencing.

## Rules

- Never edit an applied migration.
- No destructive migration without a backup and approval.
