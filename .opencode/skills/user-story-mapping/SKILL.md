---
name: User Story Mapping
description: Convert requirements into prioritized user stories with acceptance criteria
---

# User Story Mapping

Owned by `requirements-analysis`. Output: `docs/projects/<id>/user-stories.md`.

## Format

```
As a <role>, I want <capability>, so that <benefit>.
```

Each story carries:
- **id** — `US-<n>`
- **links** — requirement ids it satisfies
- **priority** — must / should / could
- **acceptance criteria** — see `acceptance-criteria` skill
- **estimate** — S / M / L

## Story map

Lay stories along two axes:
- **Backbone (horizontal):** the sequence of user activities.
- **Depth (vertical):** must-have first, then should, then could.

The top row of the backbone plus all `must` stories is the walking skeleton (MVP input
for `product-strategist`).

## Rules

- One capability per story.
- No implementation detail.
- Every story traces to at least one requirement.
