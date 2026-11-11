---
name: Task Delegation
description: How to write a complete handoff brief when the master assigns work to a department subagent
---

# Task Delegation

Every delegation from the master to a department must include the fields below.
Missing fields cause rework.

## Brief template

- **Objective** — one sentence describing the outcome.
- **Context** — project id + links to upstream artifacts.
- **Inputs** — exact files or decisions the department may rely on.
- **Constraints** — stack, budget, brand, deadlines, non-negotiables.
- **Deliverable** — exact artifact path(s) and format.
- **Acceptance criteria** — how the master will judge success.
- **Dependencies** — what must exist first; what this unblocks.

## Dependency ordering

- Respect the hard order in `orchestration-protocol`.
- Run independent departments concurrently.
- Never start a department whose inputs do not exist yet.

## Rework loop

1. Review the delivered artifact against the acceptance criteria.
2. If it fails, re-delegate with a diff: what is wrong, what "done" looks like.
3. Cap at 3 rounds; after that, escalate to the user with options.

## Anti-patterns

- Vague goals ("make it nice").
- Delegating without artifact paths.
- Doing the work yourself instead of delegating.
- Starting frontend before the API and schema are agreed.
