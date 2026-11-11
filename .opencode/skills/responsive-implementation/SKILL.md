---
name: Responsive Implementation
description: Implement layouts that work across all breakpoints
---

# Responsive Implementation

Owned by `frontend`. Implements `responsive-layout` specs.

## Workflow

1. Build mobile-first; layer breakpoint styles up.
2. Use the project's breakpoints and the spacing tokens.
3. Verify with real content at 320px, 768px, 1024px, 1440px.
4. Check that images and media scale (`max-width: 100%`, `srcset`).
5. Test touch targets and hover-only interactions.

## Rules

- No horizontal scrolling at any width.
- Use CSS grid/flex over fixed positioning.
- Respect reduced-motion preferences.
- Prefer fluid units; avoid pixel-perfect assumptions.
- Verify with the browser (see `mcp-playwright`) before marking done.
