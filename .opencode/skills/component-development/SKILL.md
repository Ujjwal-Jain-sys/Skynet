---
name: Component Development
description: Build UI components that match the component specs and design tokens
---

# Component Development

Owned by `frontend`. Implements `design/component-specs.md`.

## Workflow

1. Read the component spec and design tokens.
2. Build the component with typed props and all specified states.
3. Ensure accessibility: semantic markup, keyboard support, ARIA where needed.
4. Add responsive behavior per the spec.
5. Write a minimal usage example and, where valuable, a test.

## Rules

- Use tokens/variables, never hardcoded colors or spacing.
- Implement every state: default, hover, focus, active, disabled, loading, error.
- Components are presentational; data comes from props or the API layer.
- Reuse before creating; extend the library, do not fork it.
- No `any`; type all props.
