---
name: State Management
description: Manage client and server state predictably
---

# State Management

Owned by `frontend`.

## Rules of thumb

- **Server state** — fetch via the framework's data layer (server components / data
  fetching); cache with the framework's cache, not global stores.
- **URL state** — filters, tabs, pagination belong in the URL.
- **Local UI state** — `useState`/`useReducer` within the component.
- **Cross-tree client state** — a small store (e.g., Zustand/Context) only when truly
  needed.

## Anti-patterns

- Duplicating server data in a global store.
- Prop-drilling more than two levels.
- Global state for something only one component uses.

## Workflow

1. Classify the state (server / URL / local / shared).
2. Use the simplest tool that fits.
3. Document the choice in the code with a brief comment.

## Rules

- No state library until a concrete need appears.
- Derive values instead of storing them.
