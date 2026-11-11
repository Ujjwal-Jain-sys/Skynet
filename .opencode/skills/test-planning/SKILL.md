---
name: Test Planning
description: Define what to test, how, and the exit criteria
---

# Test Planning

Owned by `qa-tester`. Output: `docs/projects/<id>/reports/qa.md`.

## Workflow

1. Read requirements, acceptance criteria, and user flows.
2. Build a test matrix: each requirement/story → test cases.
3. Assign levels: unit, integration, e2e, manual.
4. Define environments and data.
5. State exit criteria (e.g., all P0/P1 pass, coverage threshold met).

## Coverage priorities

1. Primary conversion flow.
2. Authentication and authorization.
3. Data integrity (create/update/delete).
4. Error and edge cases.
5. Accessibility and responsiveness.

## Rules

- Every Must story has at least one test.
- Tests are deterministic and independent.
- Record results with evidence (logs, screenshots).
- Block deploy on open P0/P1 bugs.
