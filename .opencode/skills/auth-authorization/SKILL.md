---
name: Auth and Authorization
description: Implement authentication and access control correctly
---

# Auth and Authorization

Owned by `backend`, reviewed by `security-auditor`.

## Authentication

- Prefer a vetted library (e.g., better-auth / NextAuth) over custom auth.
- Hash passwords with a modern algorithm (argon2/bcrypt); never store plaintext.
- Sessions: httpOnly, secure, sameSite cookies; rotate on login.
- Support email verification and password reset.

## Authorization

- Deny by default; grant explicitly.
- Enforce on the server for every request, not just in the UI.
- Model roles/permissions in the data layer.
- Check ownership on every resource access (prevent IDOR).

## Workflow

1. Define roles and permissions from requirements.
2. Implement auth flows and session handling.
3. Add server-side guards to every protected endpoint.
4. Hand to `security-auditor` for review.

## Rules

- Never roll your own crypto.
- No secrets or tokens in URLs or logs.
- Rate-limit auth endpoints.
