---
name: Auth Hardening
description: Harden authentication and session handling against common attacks
---

# Auth Hardening

Owned by `security-auditor`, implemented by `backend`.

## Checklist

- Passwords hashed with argon2/bcrypt; strong password policy.
- Rate-limit login, signup, and password reset.
- Sessions: httpOnly, secure, sameSite; rotate on privilege change.
- CSRF protection on state-changing requests.
- Account lockout / exponential backoff on repeated failures.
- Email verification before sensitive actions.
- Secure password reset (single-use, expiring tokens).
- MFA available for privileged accounts.

## Rules

- Never reveal whether an email exists on login/reset.
- No credentials in URLs.
- Log auth events without logging secrets.
- Re-test after any auth change (see `regression-testing`).
