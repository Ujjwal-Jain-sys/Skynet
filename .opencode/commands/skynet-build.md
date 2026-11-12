---
description: Start a full Skynet website build from a user brief
agent: skynet-master
model: opencode/nemotron-3.5-super-vl-free
subagent: true
---

# /skynet-build

Kick off a complete website build for a non-technical user's plain-language brief.

Usage: `/skynet-build <brief>` or `/skynet-build` (then paste the brief).

## What happens

1. The `skynet-master` agent captures the brief verbatim into `docs/projects/<project-id>/brief.md`.
2. Asks at most 5 clarifying questions (or infers defaults if the user says "just build it").
3. **Capability Review** — After requirements-analysis, the master presents options to add tools, MCPs, plugins, skills, or capabilities that would improve the project. Auto-installs where possible; otherwise provides detailed manual steps. User must confirm before proceeding.
4. Decomposes the brief into department workstreams and delegates each to its subagent:
   `requirements-analysis → [capability review] → product-strategist → ux-architect → ui-design → (database-architect → backend) → frontend → content-writer → (qa-tester, security-auditor, seo-specialist) → project-manager → devops`.
5. **Continuous Monitoring** — `catcher` scans department outputs on-demand; `reporter` delivers findings to the master; master re-delegates departments to fix issues.
6. Runs quality gates after each phase; blocks deploy until QA, security, and SEO are approved with no open P0 blockers.
7. Hands approved work to `devops` for deployment.

## Outputs

All artifacts land under `docs/projects/<project-id>/`:
- `brief.md`, `assumptions.md`, `status.md` (master/project-manager)
- `requirements.md`, `user-stories.md`, `sitemap.md` (requirements-analysis)
- `business-plan.md`, `mvp-scope.md`, `roadmap.md` (product-strategist)
- `user-flows.md`, `design/wireframes/` (ux-architect)
- `design/design-tokens.json`, `design/component-specs.md` (ui-design)
- `data/data-model.md`, `data/schema.sql` (database-architect)
- `code/` (frontend + backend)
- `content/brand-voice.md`, `content/pages/` (content-writer)
- `reports/qa.md`, `reports/security.md`, `reports/seo.md` (qa/security/seo)
- `reports/monitoring-reports/` (reporter — catcher + qa-tester findings → master)
- `monitoring/catcher-logs/` (catcher — raw observations → reporter)

$ARGUMENTS