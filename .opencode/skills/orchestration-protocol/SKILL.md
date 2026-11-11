---
name: Orchestration Protocol
description: How the Skynet master agent decomposes a user brief and routes work to department subagents
---

# Orchestration Protocol

Use this when acting as the Skynet master agent (`skynet-master`).

## Intake

1. Capture the user's brief verbatim into `docs/projects/<project-id>/brief.md`.
2. Ask at most 5 clarifying questions. If the user says "just build it", infer
   reasonable defaults and record them in `assumptions.md`.
3. Create the project folder and initialize `status.md`.

## Decompose

Break the brief into workstreams that map to departments:

`requirements` · `product` · `UX` · `UI` · `database` · `backend` · `frontend` ·
`content` · `SEO` · `QA` · `security` · `devops`.

## Order

Respect the hard dependency order:

```
requirements → product → UX → UI → (database → backend) → frontend
            → QA / security / SEO → deploy
```

Run independent departments in parallel (for example, `content`, `database`, and
`backend` may run together once UI is settled).

## Delegate

For every handoff, write a delegation brief using the `task-delegation` skill, then
launch the department with the `subagent` tool using its exact agent ID.

## Sync with the Project Manager

After each phase, ask `project-manager` for status and update `status.md`.
Escalate blockers by re-delegating to the owning department.

## Integrate and deliver

1. Collect artifacts from `docs/projects/<id>/`.
2. Resolve conflicts (design vs. implementation, SEO vs. content).
3. Run quality gates (`quality-gates` skill).
4. Hand to `devops` for deployment.

## Rules

- Never do a department's work yourself; delegate.
- Always record decisions and assumptions in the project folder.
- Re-route rather than patch when a department's output fails review.
