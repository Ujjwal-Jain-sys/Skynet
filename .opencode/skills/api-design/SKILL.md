---
name: API Design
description: Design consistent, versioned, well-documented HTTP APIs
---

# API Design

Owned by `backend`. Output: the API contract in `docs/projects/<id>/code/`.

## Conventions

- **Style** — REST by default; GraphQL only when justified.
- **Naming** — plural nouns (`/orders`), kebab-case in paths.
- **Methods** — GET (read), POST (create), PUT/PATCH (update), DELETE (remove).
- **Status codes** — 200/201/204, 400, 401, 403, 404, 409, 422, 500.
- **Errors** — consistent shape:
  ```json
  { "error": { "code": "validation_error", "message": "...", "details": [] } }
  ```
- **Pagination** — cursor or page/limit; document it.
- **Versioning** — prefix (`/v1/`) when breaking changes are expected.

## Workflow

1. Derive resources from the data model.
2. Define endpoints, request/response schemas, and auth requirements.
3. Publish the contract before frontend integrates.
4. Validate all input; never trust the client.

## Rules

- Every endpoint documents auth, validation, and error cases.
- No breaking changes without a version bump.
- Idempotency for retryable writes.
