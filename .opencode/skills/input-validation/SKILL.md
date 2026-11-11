---
name: Input Validation
description: Validate and sanitize all untrusted input at every boundary
---

# Input Validation

Owned by `security-auditor` and `backend`.

## Principles

- Validate on the server; client validation is UX only.
- Allow-list (accept known-good) over deny-list.
- Validate type, format, length, and range.
- Reject early with a clear, non-leaky error.

## Where to validate

- API request bodies, query params, path params.
- Form submissions and file uploads.
- Webhook payloads (after signature verification).
- Anything rendered into HTML (escape output).

## Rules

- Use a schema validator (e.g., Zod) shared with types.
- Parameterize all database queries.
- Escape all output; never `dangerouslySetInnerHTML` with user data.
- Limit upload size and type; store outside the web root.
- Rate-limit and size-limit every public endpoint.
