---
name: Artifact Handoff
description: Standard file format and location for passing work between Skynet departments
---

# Artifact Handoff

All departments exchange work as files under `docs/projects/<project-id>/`.
There is no hidden state: if it is not in the project folder, it did not happen.

## Layout

```
docs/projects/<id>/
├─ brief.md               # verbatim user brief
├─ assumptions.md         # inferred defaults
├─ requirements.md        # requirements-analysis
├─ user-stories.md        # requirements-analysis
├─ business-plan.md       # product-strategist
├─ mvp-scope.md           # product-strategist
├─ sitemap.md             # ux-architect
├─ user-flows.md          # ux-architect
├─ design/
│  ├─ wireframes/         # ux-architect
│  ├─ design-tokens.json  # ui-design
│  └─ component-specs.md  # ui-design
├─ data/
│  ├─ data-model.md       # database-architect
│  └─ schema.sql          # database-architect
├─ code/                  # frontend + backend
├─ content/               # content-writer
│  ├─ brand-voice.md
│  └─ pages/
├─ reports/
│  ├─ qa.md               # qa-tester
│  ├─ security.md         # security-auditor
│  └─ seo.md              # seo-specialist
└─ status.md              # project-manager
```

## Rules

1. Every artifact starts with frontmatter:
   ```yaml
   ---
   owner: <agent-id>
   phase: <phase>
   status: draft | review | approved
   updated: <ISO date>
   ---
   ```
2. Downstream departments **read** upstream artifacts; they do not edit them.
3. To change an upstream artifact, raise a change request in `status.md` and let
   the master re-route it to the owner.
4. Keep one artifact per concern; do not merge unrelated outputs.
