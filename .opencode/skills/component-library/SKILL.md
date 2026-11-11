---
name: Component Library
description: Specify reusable UI components and their states for consistent implementation
---

# Component Library

Owned by `ui-design`. Output: `docs/projects/<id>/design/component-specs.md`.

## Per component, specify

- **Name and purpose**
- **Anatomy** — parts and slots
- **Props/variants** — size, tone, state
- **States** — default, hover, focus, active, disabled, loading, error
- **Accessibility** — role, keyboard behavior, ARIA
- **Responsive** — behavior per breakpoint
- **Token usage** — which tokens apply

## Baseline components

`Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Card`, `Nav`, `Footer`, `Modal`,
`Alert`, `Badge`, `Form`.

## Rules

- Prefer the project's component library (e.g., shadcn/ui) and extend, not fork.
- Every component used in a wireframe is specified.
- Specs are contracts for `frontend`; deviations need a change request.
