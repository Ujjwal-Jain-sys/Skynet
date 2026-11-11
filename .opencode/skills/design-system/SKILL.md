---
name: Design System
description: Define the shared visual language and rules the whole site follows
---

# Design System

Owned by `ux-architect` and `ui-design`. Output feeds `design-tokens.json` and
`component-specs.md`.

## Components

1. **Foundations** — color, typography, spacing, radius, elevation, motion.
2. **Tokens** — named values (see `design-tokens` skill).
3. **Components** — button, input, card, nav, form, footer, modal.
4. **Patterns** — forms, lists, empty states, errors.
5. **Guidelines** — do/don't, usage rules.

## Workflow

1. Derive foundations from the brand and audience.
2. Define tokens once; reuse everywhere.
3. Specify each component with states: default, hover, focus, active, disabled,
   loading, error.
4. Document usage rules per component.

## Rules

- Single source of truth: tokens, not hardcoded values.
- Every component used in a wireframe must be specified.
- Hand off as `component-specs.md` for `frontend`.
