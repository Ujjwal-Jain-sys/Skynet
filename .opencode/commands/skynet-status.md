---
description: Check the current status of a Skynet project
agent: project-manager
model: opencode/nemotron-3.5-super-vl-free
---

# /skynet-status

Report the current status of a Skynet website project in plain language.

Usage: `/skynet-status <project-id>`

## What happens

The `project-manager` agent reads `docs/projects/<project-id>/status.md` and reports:

- Overall status: on track / at risk / blocked
- Completed phases since last report
- In-progress work with owners
- Blocked items (item, blocker, needed action, owner)
- Next critical-path steps
- Decisions needed from the user (as simple A vs B choices)

## Output

A concise, user-facing status update — no internal agent names or file paths, outcomes not activities. Links to visible artifacts (preview links, screenshots) where available.

$ARGUMENTS