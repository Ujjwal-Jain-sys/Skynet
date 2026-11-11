---
name: OWASP Top 10
description: Check the application against the OWASP Top 10 risks
---

# OWASP Top 10

Owned by `security-auditor`. Findings go to `docs/projects/<id>/reports/security.md`.

## Checklist

1. **Broken access control** — server-side checks on every request; no IDOR.
2. **Cryptographic failures** — TLS everywhere; strong hashing; no secrets in code.
3. **Injection** — parameterized queries; validate/sanitize input; escape output.
4. **Insecure design** — threat-model the primary flows.
5. **Security misconfiguration** — least privilege; secure headers; no debug in prod.
6. **Vulnerable components** — scan dependencies (see `dependency-scanning`).
7. **Auth failures** — rate limiting, strong sessions, MFA where needed.
8. **Data integrity failures** — validate deserialization; signed updates.
9. **Logging failures** — log security events; never log secrets.
10. **SSRF** — allow-list outbound requests.

## Rules

- No high/critical finding may remain open at deploy.
- Every finding has severity, evidence, and remediation.
- Re-test after fixes.
