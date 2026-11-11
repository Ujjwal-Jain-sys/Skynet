---
name: Environment Management
description: Manage configuration and secrets across environments
---

# Environment Management

Owned by `devops`, enforced with `security-auditor`.

## Rules

- **Config** (non-secret) may be committed with sane defaults.
- **Secrets** live only in the platform secret store or env vars; never in the repo.
- Reference secrets in OpenCode config as `{env:NAME}`.
- Each environment has its own values; no sharing of production secrets with dev.
- `.env.example` documents required variables with placeholder values.

## Workflow

1. List every required variable and its purpose.
2. Provide `.env.example`.
3. Set real values per environment in the platform.
4. Validate presence at startup; fail fast if missing.

## Rules

- Rotate secrets on exposure or staff change.
- Least-privilege credentials per service.
- Never echo secrets in logs or build output.
- Commit `.gitignore` entries for `.env*` (except the example).
