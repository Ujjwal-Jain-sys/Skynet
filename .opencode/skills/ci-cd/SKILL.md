---
name: CI CD
description: Automate build, test, and deploy pipelines
---

# CI CD

Owned by `devops`.

## Pipeline stages

1. **Install** — deterministic (lockfile, cached).
2. **Lint & typecheck**.
3. **Test** — unit, integration, e2e.
4. **Build**.
5. **Security scan** (see `dependency-scanning`).
6. **Deploy** — to preview on PRs, to production on main.

## Rules

- CI must fail on lint, type, or test errors.
- No secrets in the pipeline definition; use the platform's secret store.
- Deploys are reproducible and reversible (keep the previous artifact).
- Production deploy requires the deploy gate from `quality-gates`.
- Every deploy is traceable to a commit.

## Workflow

1. Define the pipeline in version control.
2. Add branch protection requiring CI to pass.
3. Add preview environments for PRs.
4. Document rollback steps.
