---
name: User Flow Design
description: Map the steps users take to complete key tasks
---

# User Flow Design

Owned by `ux-architect`. Output: `docs/projects/<id>/user-flows.md`.

## Workflow

1. Identify the primary conversion action from `mvp-scope.md`.
2. Map the happy-path flow as ordered steps (entry → goal).
3. Add decision points and branches.
4. Add error and empty states.
5. Note where data is collected or created (feeds the data model).

## Format

```
Landing → Pricing → Signup form → Verify email → Dashboard
                          └─ error: invalid email → inline message
```

## Rules

- Every Must story has a flow.
- Flows show screens/states, not visuals.
- Flag flows that need authentication or payments (security review).
- Keep the primary flow as short as possible.
