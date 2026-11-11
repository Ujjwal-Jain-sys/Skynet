---
name: Dependency Scanning
description: Find and remediate vulnerable dependencies and images
---

# Dependency Scanning

Owned by `security-auditor` and `devops`.

## Workflow

1. Run the ecosystem audit in CI (`npm audit`, `pnpm audit`, OSV scanner).
2. Scan container images (Trivy/Grype).
3. Triage findings by severity and exploitability.
4. Update or replace vulnerable packages.
5. Pin versions and commit lockfiles.

## Rules

- Fail CI on high/critical with a known fix.
- No unknown/unmaintained dependencies for core functionality.
- Review transitive dependencies for critical paths.
- Record the audit result in `reports/security.md`.

## Ongoing

- Enable Dependabot/Renovate for automated updates.
- Re-scan on every release.
