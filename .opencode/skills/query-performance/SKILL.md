---
name: Query Performance
description: Keep database queries fast as data grows
---

# Query Performance

Owned by `database-architect` and `backend`.

## Workflow

1. Identify the hot queries from the requirements and user flows.
2. Inspect plans with `EXPLAIN ANALYZE`.
3. Add targeted indexes for filters, joins, and sort orders.
4. Eliminate N+1 queries (batch/join instead).
5. Select only needed columns; paginate large results.

## Rules

- Index based on real query patterns, not guesswork.
- Composite index column order matches the query.
- Avoid `SELECT *` in application code.
- Cap result sets; use keyset pagination for large tables.
- Re-measure after every change; document the before/after.

## Warning signs

- Sequential scans on large tables.
- Missing indexes on foreign keys.
- Sorting large sets without an index.
