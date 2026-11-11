---
name: Design Tokens
description: Define the single source of truth for design values as machine-readable tokens
---

# Design Tokens

Owned by `ui-design`. Output: `docs/projects/<id>/design/design-tokens.json`.

## Categories

- **color** — semantic roles
- **space** — spacing scale
- **font** — families, sizes, weights, line-heights
- **radius**
- **shadow**
- **breakpoint**

## Format

```json
{
  "color": {
    "bg": "#ffffff",
    "text": "#111827",
    "primary": "#4f46e5"
  },
  "space": { "1": "0.25rem", "2": "0.5rem", "4": "1rem" },
  "font": { "body": "1rem", "h1": "2.5rem" },
  "radius": { "md": "0.5rem" }
}
```

## Rules

- One file, one source of truth.
- Frontend maps tokens to Tailwind theme variables; never hardcode values.
- Changing a token must update every use automatically.
- Keep names semantic (`primary`), not literal (`purple`).
