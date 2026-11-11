---
name: Unit and Integration Tests
description: Write fast, focused tests for logic and boundaries
---

# Unit and Integration Tests

Owned by `qa-tester` with `frontend`/`backend`.

## Unit tests

- Target pure logic and business rules.
- One behavior per test; descriptive names.
- Fast, no network, no database.
- Mock only at the edges.

## Integration tests

- Exercise real boundaries: API + database, component + API.
- Use a disposable test database, seeded deterministically.
- Verify status codes, persisted state, and side effects.

## Workflow

1. Write tests alongside the code (or before, for risky logic).
2. Cover happy path, edge cases, and errors.
3. Keep the suite fast enough to run in CI on every commit.

## Rules

- No flaky tests; fix or remove them.
- Do not test implementation details.
- Reset state between tests.
- A failing test blocks the pipeline.
