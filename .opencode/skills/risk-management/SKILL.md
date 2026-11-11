---
name: Risk Management
description: Identify, track, and mitigate project risks
---

# Risk Management

Owned by `project-manager`. Recorded in `status.md`.

## Workflow

1. Identify risks across scope, tech, time, cost, and quality.
2. Rate each: likelihood × impact (low/medium/high).
3. Define a mitigation or contingency per risk.
4. Assign an owner and a review date.
5. Escalate high risks to the master and user.

## Categories

- **Scope** — creeping requirements.
- **Technical** — unknown integrations, performance.
- **Cost** — model/token spend on long agent runs.
- **Quality** — insufficient testing.
- **Security** — exposed secrets, auth gaps.

## Rules

- Every risk has an owner.
- Re-assess at each phase gate.
- Escalate anything that could block the deploy gate.
