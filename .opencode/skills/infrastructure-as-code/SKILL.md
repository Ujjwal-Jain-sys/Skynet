---
name: Infrastructure as Code
description: Define infrastructure declaratively and reviewably
---

# Infrastructure as Code

Owned by `devops`.

## Principles

- Infrastructure is versioned in the repository.
- No manual console changes; if it matters, it is code.
- Changes are reviewed like application code.
- State is stored remotely and locked.

## Workflow

1. Choose a tool (Terraform/Pulumi) and commit it under `infra/`.
2. Define environments (dev/staging/prod) with shared modules.
3. Plan before apply; review the diff.
4. Document resources and their purpose.

## Rules

- Never commit state files or secrets.
- Keep modules small and reusable.
- Tag resources for cost tracking.
- Every change has a rollback plan.
