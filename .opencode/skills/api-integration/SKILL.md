---
name: API Integration
description: Connect the frontend to backend APIs safely and consistently
---

# API Integration

Owned by `frontend`, depends on `backend`'s contract.

## Workflow

1. Read the API contract from `backend` (`docs/projects/<id>/code/`).
2. Create a typed API client in `lib/`.
3. Handle loading, success, empty, and error states for every call.
4. Validate inputs on the client; never trust the client for security.
5. Surface errors in the UI with actionable messages.

## Rules

- One client module per backend service; no scattered `fetch` calls.
- Types come from the contract, not hand-written duplicates.
- Never expose secrets or server-only keys to the browser.
- Use environment variables for base URLs.
- Respect rate limits and add retries only for idempotent calls.
