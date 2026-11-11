---
name: Bug Reporting
description: Report bugs with enough detail to reproduce and fix
---

# Bug Reporting

Owned by `qa-tester`. Recorded in `docs/projects/<id>/reports/qa.md`.

## Template

- **Title** — concise summary.
- **Severity** — P0 (blocker) / P1 (major) / P2 (minor) / P3 (cosmetic).
- **Environment** — URL, browser, viewport, build/commit.
- **Steps to reproduce** — numbered, minimal.
- **Expected** — what should happen.
- **Actual** — what happens.
- **Evidence** — screenshot, console log, request/response.
- **Suspected owner** — frontend / backend / db / devops.

## Rules

- Reproducible steps are mandatory.
- One bug per report.
- No PII or secrets in evidence.
- P0/P1 block deploy until fixed and retested.
- Link the fix commit when resolved.
