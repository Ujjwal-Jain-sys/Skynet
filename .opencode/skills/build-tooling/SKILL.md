---
name: Build Tooling
description: Configure builds, bundling, and developer tooling for the frontend
---

# Build Tooling

Owned by `frontend`, supported by `devops`.

## Baseline

- TypeScript strict mode.
- Linting (ESLint) and formatting (Prettier).
- A single `build` script that produces a deployable output.
- Environment variables validated at startup.

## Workflow

1. Keep the default framework tooling unless there is a measured need.
2. Add scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `test`.
3. Ensure the build fails on type or lint errors in CI.
4. Keep the bundle small; analyze if it grows.

## Rules

- Reproducible builds: lockfile committed, exact versions pinned.
- No secrets in build output.
- Build must run in CI exactly as it does locally.
- Document any non-default tooling in `README`.
