---
description: Deploy an approved Skynet project to production
agent: devops
model: opencode/nemotron-3.5-super-vl-free
subagent: true
---

# /skynet-deploy

Deploy an approved Skynet website project to production.

Usage: `/skynet-deploy <project-id>`

## Preconditions (deploy gate)

Deployment proceeds only when all of the following are true:

- `reports/qa.md` is `approved` — no open P0/P1 bugs
- `reports/security.md` is `approved` — no high/critical findings
- `reports/seo.md` is `approved` — Core Web Vitals targets met
- `status.md` shows no open P0 blockers

If any gate fails, the command reports the missing items and stops.

## What happens

The `devops` agent:

1. Verifies the deploy gate with the master/project-manager.
2. Runs the CI/CD pipeline (lint, typecheck, test, build, security scan).
3. Builds the site into a static/SSR output under `code/`.
4. Deploys to `https://<project-id>.skynet.app` (preview on PRs, production on main).
5. Sets environment variables per environment (never committed).
6. Runs a smoke test after deploy.
7. Wires monitoring (Sentry via MCP Sentry) and alerts.
8. Documents rollback steps.

## Output

Deploy confirmation with the live URL, rollback procedure, and monitoring dashboard link. Any failure is reported with steps to reproduce and the owning department.

$ARGUMENTS