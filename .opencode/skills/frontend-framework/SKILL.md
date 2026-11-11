---
name: Frontend Framework
description: Scaffold and structure the frontend using the agreed framework and conventions
---

# Frontend Framework

Owned by `frontend`. Target stack: Next.js (App Router) + React + TypeScript.

## Workflow

1. Confirm the framework version with `mcp-context7` before scaffolding.
2. Create the app with a strict TypeScript config.
3. Establish folder conventions:
   ```
   app/            # routes (App Router)
   components/     # shared UI
   lib/            # utilities, clients
   styles/         # global + tokens
   public/         # static assets
   ```
4. Wire the design tokens into the Tailwind theme.
5. Add linting and formatting.

## Rules

- Prefer server components unless interactivity requires a client component.
- Mark client components explicitly and keep them leaf-level.
- No business logic in components; call the backend API.
- Record the framework version in the project artifacts.
