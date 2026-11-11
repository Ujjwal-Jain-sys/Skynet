---
name: Wireframing
description: Produce low-fidelity layouts for every page before visual design
---

# Wireframing

Owned by `ux-architect`. Output: `docs/projects/<id>/design/wireframes/`.

## Workflow

1. One wireframe per page/state in the sitemap.
2. Show layout, hierarchy, and content blocks — not colors or fonts.
3. Annotate interactions, responsive behavior, and states (loading/empty/error).
4. Mark dynamic regions that bind to data.

## Format

Use ASCII or simple markdown boxes so they render in plain text:

```
+-----------------------------------+
| Logo        Nav        [CTA]      |
+-----------------------------------+
|            H1 headline            |
|            subhead                |
|            [Primary CTA]          |
+-----------------------------------+
|  3 feature cards                  |
+-----------------------------------+
```

## Rules

- Low fidelity only; resist visual styling.
- Every wireframe references the user story it serves.
- Include mobile and desktop layouts for key pages.
- Hand off to `ui-design` with component-spec expectations.
