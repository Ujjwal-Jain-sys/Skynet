---
name: Regression Testing
description: Ensure new changes do not break existing behavior
---

# Regression Testing

Owned by `qa-tester`.

## Workflow

1. Maintain a regression suite of previously fixed bugs and core flows.
2. Run it on every release candidate.
3. Re-test any area touched by a change.
4. Track a stable baseline of passing tests.

## Rules

- Every fixed bug adds a regression test.
- The suite grows over time but stays fast enough for CI.
- A regression failure blocks the release.
- Record the baseline in `reports/qa.md`.

## Priorities

1. Auth and payments.
2. Primary conversion flow.
3. Data integrity.
4. Recently changed areas.
