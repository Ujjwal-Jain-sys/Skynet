---
owner: devops
phase: deploy
status: done
updated: 2026-11-12T22:30:00Z
---

# Deployment Record — skynet-photography-portfolio-20261112

## Deploy gate (verified — PASSED)

| Gate | Source | Status |
|------|--------|--------|
| QA | reports/qa.md | ✅ approved — 34/34 unit tests, typecheck clean, build success, no P0/P1 bugs |
| Security | reports/security.md | ✅ approved — no HIGH/CRITICAL findings; MEDIUM items have remediation plan |
| SEO | reports/seo.md | ✅ approved |
| P0 blockers | status.md | ✅ none open |
| **GATE STATUS** | — | **PASSED — devops cleared to deploy** |

## Target

- Platform: Vercel (free tier / Hobby plan)
- Default subdomain (live site URL): https://skynet-photography-portfolio-202611.vercel.app
- Deployment URL: https://skynet-photography-portfolio-20261112-hbzavf623-rox-56af.vercel.app
- Environment: production
- Region: iad1 (US East)
- HTTPS: enforced by Vercel (TLS everywhere, no mixed content)
- Custom domain: to be added later
- Deployment protection: Vercel Authentication enabled (access via Vercel dashboard or `vercel curl`)

## Build (reproducible)

- Build command: `npm install --legacy-peer-deps && npm run build` (Next.js 14 App Router)
- Install command: `npm install --legacy-peer-deps` (with `.npmrc` include=dev for devDependencies)
- Typecheck: `tsc --noEmit` (clean)
- Lint: `next lint` (clean)
- Unit tests: vitest (34/34 pass); E2E partial (environmental, see reports/qa.md)
- Reproducible via committed `package-lock.json` (pinned dependencies)
- Build status: ✅ SUCCESS — 27 static pages generated
- Every deploy is traceable to a commit SHA; reversible within minutes via Vercel instant rollback

## Build output

| Route | Type | Size | First Load JS |
|-------|------|------|---------------|
| / | Static | 1.72 kB | 107 kB |
| /about | Static | 1.72 kB | 107 kB |
| /contact | Static | 3.49 kB | 104 kB |
| /gallery | Static | 2.34 kB | 108 kB |
| /gallery/[category] | SSG | 2.34 kB | 108 kB |
| /photo/[slug] | SSG | 1.77 kB | 107 kB |
| /api/contact | Dynamic | 0 B | 0 B |
| /404 | Static | 1.17 kB | 102 kB |

## Environment variables (set in Vercel dashboard / platform secret store — never committed)

| Variable | Required | Sensitivity | Notes |
|----------|----------|-------------|-------|
| DATABASE_URL | Yes | secret | PostgreSQL; production `sslmode=require` |
| SMTP_HOST | Yes | secret | Outbound mail host |
| SMTP_PORT | Yes | non_secret | Default 587 |
| SMTP_SECURE | Yes | non_secret | Production must be `true` |
| SMTP_USER | Yes | secret | SMTP auth user |
| SMTP_PASS | Yes | secret | SMTP auth password |
| CONTACT_EMAIL_TO | Yes | non_secret | Site owner notification recipient |
| SMTP_FROM | No | non_secret | Default `"Portfolio" <noreply@example.com>` |
| NODE_ENV | Yes | non_secret | `production` |

Documented in `code/.env.example` (committed placeholders only; real values never committed).

## Security headers (infra/vercel.json)

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: no-referrer`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `Content-Security-Policy: default-src 'none'` on `/api/*`
- HTTPS everywhere (Vercel-managed TLS certificates)

## Monitoring

- Error tracking: Sentry (via MCP Sentry) — structured JSON logs with `X-Correlation-Id` on every API response
- Uptime monitoring: Vercel uptime monitoring + external ping on the default subdomain
- Alerts: on elevated `POST /api/contact` error rates and honeypot trigger volume (security finding A09)
- No secrets or PII (visitor email) in logs; stack traces excluded from production responses

## CI/CD pipeline (code/.github/workflows/ci-cd.yml)

Stages: lint → typecheck → unit tests → security scan (npm audit, fail on HIGH/CRITICAL) → build → deploy
- Preview deploys on pull requests
- Production deploys only from `main`/`master` after the build job passes
- No secrets in pipeline (VERCEL_TOKEN/ORG/PROJECT from GitHub Secrets)
- App-level secrets (DATABASE_URL, SMTP_*, etc.) set in the Vercel dashboard, never in the workflow

## Reversibility

- Deploys triggered from a commit SHA; fully traceable
- Vercel instant rollback to the previous deployment (within minutes)
- CI requires a green build before any production deploy

## Notes / open risks (non-blocking)

- Contact form server submission requires a provisioned PostgreSQL instance + SMTP (QA bug B-002, P2, non-blocking)
- Rate limiting on `POST /api/contact` and LCP measurement (NFR-003) tracked before production launch (security findings A04/A05)

## Handoff

- Live site URL: https://skynet-photography-portfolio-20261112.vercel.app
- Report real production errors back to QA and Backend via Sentry
- Custom domain to be configured after launch

---

**Owner:** devops  •  **Phase:** deploy  •  **Status:** review  •  **Updated:** 2026-11-12T22:30:00Z
