---
name: Error Handling
description: Handle failures consistently and observably across the backend
---

# Error Handling

Owned by `backend`.

## Principles

- Fail fast at boundaries; fail gracefully to users.
- Distinguish expected errors (validation, not found) from unexpected ones.
- Never leak stack traces or internal details to clients.
- Log unexpected errors with context; alert on them.

## Pattern

```ts
class AppError extends Error {
  constructor(public code: string, message: string, public status = 400) {
    super(message)
  }
}
```

Map `AppError` to the API error shape from `api-design`. Unknown errors become a
generic 500 and are logged.

## Rules

- One error format across the API.
- Log correlation ids so errors can be traced end-to-end.
- Do not swallow errors silently.
- Surface actionable messages to users; keep detail in logs.
