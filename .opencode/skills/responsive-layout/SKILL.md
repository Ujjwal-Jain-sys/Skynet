---
name: Responsive Layout
description: Define how the layout adapts across mobile, tablet, and desktop
---

# Responsive Layout

Owned by `ui-design`, implemented by `frontend`.

## Breakpoints

Use a mobile-first scale (align with Tailwind defaults unless the brand needs custom):

| Name | Min width |
|------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

## Workflow

1. Design mobile first, then layer up.
2. Define the grid/columns per breakpoint.
3. Specify how each component reflows (stack, wrap, hide, reorder).
4. Test at 320px, 768px, 1024px, and 1440px.

## Rules

- No horizontal scroll at any width.
- Tap targets ≥ 44px on touch.
- Content, not just layout, adapts (shorter copy on mobile where sensible).
- Use relative units (`rem`, `%`) over fixed pixels.
