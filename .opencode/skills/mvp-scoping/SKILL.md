---
name: MVP Scoping
description: Draw a hard line around what is in and out of the first release
---

# MVP Scoping

Owned by `product-strategist`. Output: `docs/projects/<id>/mvp-scope.md`.

## Method

Classify every story with MoSCoW:

- **Must** — MVP cannot ship without it.
- **Should** — important but deferrable.
- **Could** — nice to have.
- **Won't (this time)** — explicitly out of scope.

## Rules

- The MVP is the set of **Must** stories and nothing else.
- List the **Won't** items explicitly so scope creep is visible.
- Every Must item must trace to a requirement and a page.
- If Must items exceed a reasonable first build, negotiate down with the master.

## Output format

```markdown
---
owner: product-strategist
phase: product
status: draft
updated: <ISO date>
---
# MVP Scope

## In scope (Must)
## Out of scope (Won't, this time)
## Assumptions
```
