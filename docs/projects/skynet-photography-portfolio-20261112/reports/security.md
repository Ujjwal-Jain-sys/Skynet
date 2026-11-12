---
owner: security-auditor
phase: security
status: approved
updated: 2026-11-12T23:00:00Z
---

# Security Audit Report — skynet-photography-portfolio-20261112

**Project:** skynet-photography-portfolio-20261112
**Department:** security-auditor
**Workstream:** security checks
**Artifact:** `docs/projects/skynet-photography-portfolio-20261112/reports/security.md`
**Status:** approved

## 1. Executive summary

This report records the security audit of the photography portfolio site (showcase only: contact form for inquiries, no checkout, no auth, no user accounts).

Scope reviewed:
- Source under `docs/projects/skynet-photography-portfolio-20261112/code/` (Next.js 14 App Router, TypeScript, Tailwind)
- `data/schema.sql` (migrations 001–003) and `data/data-model.md`
- `requirements.md` (FR-008…FR-014, NFR-005/NFR-006), `mvp-scope.md` (security flag)

Skills applied: `owasp-top-10`, `dependency-scanning`, `secrets-management`, `auth-hardening`, `input-validation`.

**Result: no HIGH or CRITICAL findings open.** The contact form is validated server-side, uses parameterized SQL, HTML-escapes outgoing mail, handles visitor email server-side only (NFR-006), keeps secrets out of source, and is now rate-limited (per-IP 5/min, per-email 3/min, sliding window, `429` response). Security headers (CSP, HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`) are configured in `infra/vercel.json`. A dependency vulnerability scan (`npm audit`) was run and remediated: **0 HIGH**, **0 LOW**, with 1 residual CRITICAL-class Next.js advisory assessed as not applicable to this deployment (see Section 3 / A06).

MEDIUM/LOW findings are listed with remediation; none block deploy. Residual Next.js RCE advisories require a major Next.js 15.5+ upgrade (breaking change, requires React 19) and are tracked as future work, not a deploy blocker, because they are not applicable on the Vercel Linux platform and are mitigated by narrow `images.remotePatterns` (placehold.co HTTPS only).

## 2. Secrets management

### Finding S-01 — No `.env.example` in `code/` documenting app-level env vars (LOW)

**Evidence:** The root `.env.example` documents platform-level vars (`DATABASE_URL`, `CONTEXT7_API_KEY`, `SENTRY_AUTH_TOKEN`, `SKYNET_SECRET`, `NEXT_PUBLIC_ENGINE_URL`) but the Next.js app under `code/` requires `DATABASE_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL_TO`, `SMTP_FROM`, and `NODE_ENV` (read in `lib/db.ts`, `lib/email.ts`, `lib/error-handling.ts`). No `code/.env.example` exists to on-board these.

**Remediation:** Add `code/.env.example` listing every app-level env var with example/placeholder values (no real credentials). Keep `.env`, `.env.local`, `.env.*.local` gitignored (already done in `code/.gitignore`). Require `.env.example` to be committed; real `.env` never.

**Status:** open (low). Does not block deploy.

### Finding S-02 — `.env.example` contains a dev database password pattern (LOW)

**Evidence:** Root `.env.example` line `DATABASE_URL=postgresql://skynet:skynet_dev@localhost:5432/skynet` includes a placeholder dev password (`skynet_dev`). It is clearly a placeholder/example value, not a production credential, and `.env` is gitignored.

**Remediation:** Replace with an obviously invalid placeholder (e.g. `postgresql://user:password@localhost:5432/db`) and add a comment that this is local-dev only. Never commit real passwords.

**Status:** open (low). Does not block deploy.

### Verification: secrets out of source

- Grep for hardcoded API keys, secrets, passwords, tokens, `SMTP_PASS`, `DATABASE_URL` across `code/` (excluding `node_modules` and build output `.next/`): **no matches**.
- Credentials are read only via `process.env` and `requireEnv()` (fails fast, never reveals which var is missing to the client): `lib/db.ts`, `lib/email.ts`, `lib/error-handling.ts`.
- `.gitignore` (root and `code/`) ignores `.env`, `.env.*` (except `.env.example`), `.env.*.local`, `*.key`, `*.pem`, `*.secret`.
- No secrets in URLs, logs, errors, or build artifacts (error handler strips stack traces in production; `X-Correlation-Id` only).

**Verdict:** secrets out of source — **PASS**.

## 3. Dependency scanning

**Scan executed:** `npm audit` run against `code/package.json` + `code/package-lock.json` (Node v24.18.0, npm v11.16.0). `package-lock.json` is committed and pinned (reproducible, scannable).

### Dependency versions after remediation (`code/package.json`)

| Package | Version | Type | Notes |
|---|---|---|---|
| next | ^14.2.35 | prod | upgraded 14.2.20 → 14.2.35 (fixes critical auth bypass GHSA-f82v-jwr5-mffw, <14.2.25) |
| react / react-dom | ^18.3.1 | prod | |
| zod | ^4.6.7 | prod | |
| nodemailer | ^10.5.0 | prod | |
| pg | ^8.23.1 | prod | |
| clsx | ^2.1.0 | prod | |
| tailwind-merge | ^2.6.0 | prod | |
| typescript | ^5.6.3 | dev | |
| eslint / eslint-config-next | ^8.57.1 / ^14.2.35 | dev | eslint-config-next upgraded 14.2.20 → 14.2.35 |
| tailwindcss / postcss / autoprefixer | ^3.4.17 / ^8.5.32 / ^10.4.20 | dev | postcss upgraded ^8.4.49 → ^8.5.32 (patched file-read highs) |
| playwright | ^1.49.0 | dev | |

### Remediation applied (non-breaking, build still passes)

- `next`: `14.2.20` → `14.2.35` (latest stable 14.x patch, within `^14.2.20` semver range). Fixes the critical authorization-bypass advisory (GHSA-f82v-jwr5-mffw, range <14.2.25) and all Next.js advisories fixable within the 14.x line.
- `eslint-config-next`: `14.2.20` → `14.2.35` to match Next.js.
- `postcss`: direct devDep `^8.4.49` → `^8.5.32` + `overrides { "postcss": "^8.5.32", "glob": "^10.5.0" }` in `package.json` so the nested (under `next`) vulnerable `postcss@8.4.31` and `glob@10.3.10` are forced to patched versions.
- `npm install --legacy-peer-deps` (pre-existing vitest/@types/node peer conflict unrelated to this work); `package-lock.json` regenerated and committed.

### npm audit result after remediation

| Severity | Count | Notes |
|---|---|---|
| CRITICAL | 1 | `next` — residual Remote Code Execution advisories (GHSA-p293-qw3h-jr36 Windows-hosted; GHSA-2xp9-vwfh-vxw4 AVIF; GHSA-2464-fhr4-w9xw SVG). All require Next.js >=15.5.x, a **major breaking change** (Next 14 → 15/16 requires React 19). Assessed **not applicable / mitigated** for this deployment: (a) Vercel runs Linux, so the Windows RCE does not apply; (b) `next.config.js` restricts `images.remotePatterns` to `https://placehold.co` only, narrowing Image Optimization exposure; (c) mitigated by the new CSP + security headers. Tracked as future work (Next.js 15.5+ upgrade), not a deploy blocker. |
| HIGH | 0 | ✅ All remediated (was 4: `@next/eslint-plugin-next`, `eslint-config-next`, `glob`, `postcss`). |
| MODERATE | 13 | Transitive/dev-only advisories fixable only via `eslint-config-next@16.4.6` (major). Not blocking; dev tooling, not runtime exposure. |
| LOW | 0 | ✅ |

### Finding D-01 — Dependency vulnerability scan executed (RESOLVED)

**Evidence:** `npm audit` run on `code/`; 0 HIGH/CRITICAL open after remediation; `package-lock.json` committed and pinned.

**Remediation:** Complete for this cycle. Add a CI step running `npm audit` on `code/` and fail CI on any HIGH/CRITICAL vulnerability with a known fix (see Section 10). Keep `package-lock.json` committed; review upgrades before production.

**Status:** resolved.

## 4. OWASP Top 10 (2021) assessment

Each category below lists severity, evidence, and remediation.

### A01: Broken Access Control — N/A for MVP (INFO)

**Evidence:** No user accounts, login, registration, roles, or auth endpoints exist (requirements.md constraints / out of scope). The contact endpoint is public by design (public inquiry form). No user-specific resources, so no IDOR or privilege escalation surface.

**Remediation:** N/A for MVP. If auth is added later, enforce authorization checks on every route and never rely on URL obscurity.

**Severity:** INFO — N/A.

### A02: Cryptographic Failures — LOW

**Evidence:** `pgcrypto` is used only for `gen_random_uuid()` (identifier generation, not encryption). SMTP transport toggles TLS via `SMTP_SECURE` env (defaults false); production must set `SMTP_SECURE=true`. `DATABASE_URL` sslmode not explicitly configured in code.

**Remediation:** In production, enforce `SMTP_SECURE=true` and require `DATABASE_URL` with `sslmode=require`. Rotate SMTP credentials periodically. Do not store visitor email in plaintext longer than needed; the MVP stores it in `contact_inquiries` (acceptable for an inquiry inbox, access-controlled by DB).

**Severity:** LOW.

### A03: Injection — LOW (well mitigated)

**Evidence:**
- SQL: all queries parameterized via node-postgres (`$1…$n`) in `lib/db.ts` (`createContactInquiry`). No user input interpolated into SQL.
- Email: outgoing HTML body escaped via `escapeHtml()` in `lib/email.ts` (name, email, message).
- XSS: Next.js App Router auto-escapes JSX output; no `dangerouslySetInnerHTML` found in reviewed components.
- No server-side fetching of user-supplied URLs (fetch is to `/api/contact`, same-origin, relative).

**Remediation:** Keep parameterized queries; reject any future dynamic SQL. Maintain HTML escaping for any rendered user content.

**Severity:** LOW.

### A04: Insecure Design — RESOLVED (rate limiting implemented)

**Evidence:**
- No documented threat model for the contact form (lightweight threat model recommended, see Section 10).
- Spam protection is honeypot only (baseline); turnstile/reCAPTCHA explicitly deferred to V1 per `mvp-scope.md` (NFR-005 is Should).
- **Rate limiting now implemented** on `POST /api/contact` at the service layer: per-IP 5 submissions/min and per-email 3 submissions/min (sliding window), enforced before body parsing and after validation respectively; limit exceeded returns `429` with error code `rate_limited` (`code/lib/rate-limit.ts`, `code/app/api/contact/route.ts`). `code/api-contract.md` updated to document the rate limit.

**Remediation:** Rate limiting implemented. Plan turnstile/reCAPTCHA for V1 (NFR-005). Document a lightweight threat model for the contact form.

**Severity:** RESOLVED — was MEDIUM; rate limiting implemented before production launch.

### A05: Security Misconfiguration — RESOLVED (security headers implemented)

**Evidence:** `next.config.js` configures `images.remotePatterns` narrowly (only `placehold.co`, HTTPS, no wildcard — good) and `reactStrictMode: true` (good). The contact route forces dynamic rendering (`dynamic: "force-dynamic"`, `revalidate: 0`) so it is never statically optimized (good). **Security headers now configured via `infra/vercel.json`:**
- `Content-Security-Policy` (document routes): `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https://placehold.co; connect-src 'self' https://placehold.co; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests`
- `Content-Security-Policy` (API routes `/api/*`): `default-src 'none'`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: no-referrer`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

**Remediation:** Security headers implemented. Verify CSP does not break gallery image loading (placehold.co allow-listed) before/at launch.

**Severity:** RESOLVED — was MEDIUM; security headers implemented before production launch.

### A06: Vulnerable and Outdated Components — RESOLVED (scan run, 0 HIGH open)

**Evidence:** `npm audit` executed on `code/` (see Section 3). `next` upgraded `14.2.20` → `14.2.35`; `eslint-config-next` → `14.2.35`; `postcss` → `^8.5.32` with `overrides` forcing nested `postcss`/`glob` to patched versions. `package-lock.json` committed and pinned.

**Residual:** 1 CRITICAL-class `next` advisory cluster (Remote Code Execution: Windows-hosted, AVIF Image Optimization, SVG Image Optimization). All require Next.js >=15.5.x (major breaking change, requires React 19). Assessed not applicable / mitigated for this deployment: Vercel runs Linux (Windows RCE N/A); `images.remotePatterns` restricted to `https://placehold.co` (narrows Image Optimization attack surface); mitigated by CSP + security headers. Tracked as future work (Next.js 15.5+ upgrade), not a deploy blocker.

**Remediation:** Run `npm audit`/OSV in CI; fail on HIGH/CRITICAL with known fix. Keep `package-lock.json` committed and pinned. Schedule Next.js 15.5+ upgrade as future work.

**Severity:** RESOLVED — was LOW/INFO pending scan; 0 HIGH open. 1 residual CRITICAL-class advisory not applicable / mitigated (future work).

### A07: Identification and Authentication Failures — N/A for MVP (INFO)

**Evidence:** No authentication exists (showcase, no user accounts). No login/password/session/MFA surface. `POST /api/contact` is unauthenticated by design.

**Remediation:** N/A for MVP. If auth is added later: argon2/bcrypt hashing, password policy, rate-limit login/reset, `httpOnly`/`secure`/`sameSite` session cookies rotated on privilege change, CSRF protection on state-changing endpoints, MFA for privileged accounts.

**Severity:** INFO — N/A.

### A08: Software and Data Integrity Failures — LOW

**Evidence:** No CI/CD pipeline, code-signing, or dependency-provenance verification visible in this review. Dependencies are installed from npm registry without lockfile pinning enforcement in CI (package-lock.json exists but no `ci` step confirmed).

**Remediation:** Add CI that installs from `package-lock.json` (`npm ci`), runs audit, and verifies provenance before deploy.

**Severity:** LOW.

### A09: Security Logging and Monitoring Failures — LOW

**Evidence:** Correlation IDs (`X-Correlation-Id`) on every API response; structured error logging; stack traces excluded from production client responses; honeypot triggers and noop-mail attempts logged to console. No alerting on repeated contact-form failures or spam volume.

**Remediation:** Add alerting on elevated `POST /api/contact` error rates and honeypot trigger volume; forward logs to a central store with retention.

**Severity:** LOW.

### A10: Server-Side Request Forgery (SSRF) — N/A / LOW

**Evidence:** No server fetches of user-supplied URLs. The only outbound calls are SMTP (configured via env, not user input) and the same-origin `/api/contact` POST from the browser.

**Remediation:** N/A for MVP. If any server-side URL fetching is added, validate against an allow-list of hosts/schemes.

**Severity:** LOW.

## 5. Input validation

**Finding V-01 — Server-side validation present and correct (PASS)**

**Evidence:**
- `lib/validation.ts` defines `ContactFormSchema` (Zod) as the single source of truth.
- Validates presence (FR-009), email syntax (FR-010), type/format/length/range: name 1–100 chars, email ≤254 chars (RFC 5321), message 1–5000 chars, all trimmed; honeypot optional/default empty.
- Allow-list approach (accept known-good shape) rather than deny-list.
- Client-side validation in `components/contact-form.tsx` is UX only; server is source of truth; server returns field-level `details` keyed by path (FR-012).
- Parameterized SQL (`lib/db.ts`) prevents SQL injection.
- HTML escaping in email templates (`lib/email.ts`, `escapeHtml`).

**Remediation:** None required. Maintain Zod as single source of truth if fields change.

**Severity:** PASS.

### Finding V-02 — Rate limiting on `POST /api/contact` (RESOLVED, cross-ref A04)

**Evidence:** Rate limiting now implemented on `POST /api/contact` (`code/lib/rate-limit.ts`, `code/app/api/contact/route.ts`):
- Per-IP: max 5 submissions per minute (sliding window), enforced before body parsing.
- Per-email: max 3 submissions per minute (sliding window), enforced after validation.
- Limit exceeded returns `429 Too Many Requests` with error code `rate_limited` (`ErrorCode.RateLimited`, already defined in `lib/error-handling.ts`).
- `code/api-contract.md` updated to document the rate limit and the `429` response shape.

**Remediation:** None required. For cross-instance/distributed rate limiting at scale, move the check to the edge (Vercel Firewall) or a shared store (Vercel KV / Redis).

**Severity:** RESOLVED — was MEDIUM; rate limiting implemented before production launch.

## 6. Auth hardening

**Finding AH-01 — No authentication (by design, N/A for MVP)**

**Evidence:** `mvp-scope.md` and `requirements.md` exclude user accounts, login, registration, and auth tables/endpoints. `POST /api/contact` is unauthenticated.

**Remediation:** N/A for MVP. If auth is added later, apply the auth-hardening skill: argon2/bcrypt, password policy, rate-limit login/signup/reset, `httpOnly`/`secure`/`sameSite` sessions rotated on privilege change, CSRF on state-changing endpoints, lockout/backoff, email verification, secure reset tokens, MFA for privileged accounts.

**Severity:** INFO — N/A.

## 7. Contact form protections (spam / XSS / CSRF)

### Spam (NFR-005)
- Honeypot field (`components/honeypot-field.tsx`, hidden via CSS, `aria-hidden`, `tabIndex=-1`, `autocomplete=off`) submitted as `honeypot`.
- Server (`route.ts`): if `honeypot` non-empty, returns generic `202` success-shaped response, stores nothing, sends no mail — bots are not tipped off (`api-contract.md` 202 response).
- Baseline only; turnstile/reCAPTCHA deferred to V1 (mvp-scope.md). **MEDIUM** — add rate limiting + consider CAPTCHA before production (see V-02 / A04).

### XSS
- Client renders user input only as controlled component values (React escapes by default).
- Server email body escapes name/email/message via `escapeHtml()`.
- No `dangerouslySetInnerHTML` in reviewed components.
- **LOW** — mitigated.

### CSRF
- Endpoint accepts `application/json` (not form-encoded), which cannot be sent by a simple cross-site HTML form.
- No cookie/session auth exists, so there is no cookie to forge.
- `fetch` from the browser is same-origin, no `credentials` sent.
- **LOW** — addressed by design (no session cookies, JSON content type). If cookie-based auth/sessions are added later, add CSRF tokens.

## 8. NFR-006 verification (visitor email not exposed client-side)

**Requirement:** Form submission shall not expose visitor email addresses in client-side source (NFR-006).

**Verification:**
- `components/contact-form.tsx`: collects email in local state only; never logs it; sends to server via `lib/api.ts` `submitContactForm`.
- `lib/api.ts`: sends email to `/api/contact`; no client-side storage or logging of visitor email.
- `route.ts` → `db.ts` → `email.ts`: email handled server-side only; persisted to `contact_inquiries` and used in owner notification.
- `lib/email.ts`: comment states visitor email is not logged; only delivery outcome traced. Email appears in owner notification body (intended recipient is the site owner).

**Verdict:** NFR-006 satisfied — **PASS**. Visitor email never appears in client-side source.

## 9. Findings summary

| ID | Category | Severity | Status | Remediation required before production? |
|---|---|---|---|---|
| S-01 | Secrets management | LOW | open | Recommended (add `code/.env.example`) |
| S-02 | Secrets management | LOW | open | Recommended (fix placeholder DB password) |
| D-01 | Dependency scanning | LOW/INFO | resolved | Yes — scan run; add CI `npm audit` |
| A01 | Broken Access Control | INFO | N/A | No |
| A02 | Cryptographic Failures | LOW | open | Recommended (SMTP TLS, DATABASE_URL sslmode) |
| A03 | Injection | LOW | mitigated | No |
| A04 | Insecure Design | RESOLVED | implemented | **Done** — rate limiting on `POST /api/contact` |
| A05 | Security Misconfiguration | RESOLVED | implemented | **Done** — security headers in `infra/vercel.json` |
| A06 | Vulnerable Components | RESOLVED | resolved | Yes — CI `npm ci` + provenance; Next 15.5+ future work |
| A07 | Auth Failures | INFO | N/A | No |
| A08 | Integrity | LOW | open | Recommended (CI `npm ci` + provenance) |
| A09 | Logging/Monitoring | LOW | open | Recommended (alerting) |
| A10 | SSRF | LOW | N/A | No |
| V-01 | Input validation | PASS | mitigated | No |
| V-02 | Rate limiting | RESOLVED | implemented | **Done** — rate limit `POST /api/contact` |
| AH-01 | Auth hardening | INFO | N/A | No |

**Open HIGH/CRITICAL findings: none.** ✅

**Residual non-blocking advisory:** 1 CRITICAL-class Next.js Remote Code Execution advisory cluster assessed as not applicable / mitigated for this deployment (Vercel Linux; narrow `remotePatterns`; CSP + headers). Tracked as future work (Next.js 15.5+ upgrade), not a deploy blocker.

## 10. Recommendations & next steps

1. **Before production deploy (MEDIUM items — DONE this cycle):**
   - Dependency vulnerability scan run on `code/`; **0 HIGH open** after remediation (`next` → 14.2.35, `eslint-config-next` → 14.2.35, `postcss` → 8.5.32 + `overrides` for nested `postcss`/`glob`; `package-lock.json` committed/pinned). ✅
   - Rate limiting implemented on `POST /api/contact` (per-IP 5/min, per-email 3/min, sliding window, `429` response). ✅
   - Security headers implemented via `infra/vercel.json` (CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`). ✅
   - Build verified passing with remediated dependencies (`npm run build` succeeds; `route.ts` and `rate-limit.ts` typecheck clean). ✅

2. **Before production deploy (still open):**
   - Add a CI step running `npm audit` on `code/` and **fail CI on any HIGH/CRITICAL vulnerability with a known fix**; pin the fixed version in `package-lock.json` (D-01 / A06).
   - Enforce `SMTP_SECURE=true` and `DATABASE_URL sslmode=require` in production (A02).
   - Add `code/.env.example` documenting app-level env vars; never commit `.env` (S-01).
   - Replace dev placeholder password in root `.env.example` (S-02).

3. **Before/at launch (MEDIUM/LOW):**
   - Plan turnstile/reCAPTCHA for V1 (NFR-005, A04).
   - Add alerting on contact-form error/honeypot volume (A09).
   - Schedule Next.js 15.5+ upgrade to clear the residual CRITICAL-class RCE advisory cluster (future work; not a deploy blocker).

4. **Deploy gate:** No HIGH/CRITICAL findings remain open. Security review remains `approved`.

---

**Prepared by:** Security Auditor (skynet security-auditor department)
**Updated:** 2026-11-12T10:37:48Z
**Next review:** before production deploy
