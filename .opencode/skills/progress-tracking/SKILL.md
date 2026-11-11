---
name: Progress Tracking
description: Track task and phase status across all departments
---

# Progress Tracking

Owned by `project-manager`. Output: `docs/projects/<id>/status.md`.

## Workflow

1. Maintain a task list from the master's plan.
2. For each task track: owner, phase, status, blockers, artifact link.
3. Update after every phase or delegation completes.
4. Report the critical path and any slippage.

## Status values

`todo` · `in_progress` · `review` · `blocked` · `done`

## Output

```markdown
| Task | Owner | Phase | Status | Artifact | Blocker |
|------|-------|-------|--------|----------|---------|
```

## Rules

- `status.md` is always current; stale status is a failure.
- Blocked items name the blocker and the owner who must resolve it.
- The master reads this to decide what to do next.
