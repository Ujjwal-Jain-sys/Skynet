# Skynet — Agent Orchestration Protocol

This file governs how the Skynet master agent and its 15 department subagents work together. It lives at the project root and is the single source of truth for the orchestration protocol.

## Execution order

1. **Phase S — Skills** (complete): 78 skills in `.opencode/skills/`
2. **Phase A — Agent config** (this file + `.opencode/agents/`): master + 15 department agents
3. **Phase T — Tooling**: `opencode.jsonc` (models, permissions, MCP servers, plugins)
4. **Phase B — Build the website builder** (`engine/`, `web/`, `templates/`, `infra/`)

## Master → department routing

The `skynet-master` agent (mode `primary`) owns intake and delegation. It must never implement a department's output itself.

1. Capture the user's brief verbatim at `docs/projects/<project-id>/brief.md`.
2. Ask at most 5 clarifying questions; on "just build it", infer defaults into `assumptions.md`.
3. **Capability Review** — After requirements-analysis, present the user with options to add tools, MCPs, plugins, skills, or capabilities that would improve the project. Auto-install where possible; otherwise provide detailed manual steps. Proceed only after user confirmation.
4. For each department, write a delegation brief using the `task-delegation` skill, then launch with the `subagent` tool and the agent's exact id.
5. Respect the hard dependency order below; run independent departments in parallel.
6. **Continuous Monitoring** — catcher + reporter monitor all department outputs on-demand. When issues are found, reporter delivers them to the master, who re-delegates the responsible department.
7. After each phase, sync with `project-manager` and update `status.md`.
8. Check each department's gate using the `quality-gates` skill before advancing.
9. Deploy gate: `qa.md`, `security.md`, and `seo.md` all `approved`; `status.md` has no open P0 blockers.

## Hard dependency order

```
requirements-analysis
   → [CAPABILITY REVIEW — user chooses tools/MCPs/plugins/skills]
   → product-strategist → ux-architect → ui-design
      → (database-architect → backend) → frontend
      → content-writer
      → (qa-tester, security-auditor, seo-specialist)  [parallel]
      → project-manager
   → (catcher + reporter monitor continuously on-demand)
   → master reassigns departments on issues
   → devops (deploy)
```

## QA Bug Flow

```
qa-tester finds bug/error
   → writes log to monitoring/catcher-logs/
   → reporter reads log → writes monitoring report
   → reporter → master agent (via monitoring-reports/ + status.md)
   → master reopens task → responsible department fixes
   → catcher re-verifies fix
```

## Artifact layout (`docs/projects/<id>/`)

All departments exchange work as files here. No hidden state: if it is not in the project folder, it did not happen.

```
brief.md               # verbatim user brief (master)
assumptions.md         # inferred defaults (master)
requirements.md        # requirements-analysis
user-stories.md        # requirements-analysis
sitemap.md             # requirements-analysis (initial) / ux-architect (refined)
business-plan.md       # product-strategist
mvp-scope.md           # product-strategist
roadmap.md             # product-strategist
user-flows.md          # ux-architect
design/
  wireframes/          # ux-architect
  design-tokens.json   # ui-design
  component-specs.md   # ui-design
data/
  data-model.md        # database-architect
  schema.sql           # database-architect
code/                  # frontend + backend
content/
  brand-voice.md       # content-writer
  pages/               # content-writer
reports/
  qa.md                # qa-tester
  security.md          # security-auditor
  seo.md               # seo-specialist
  monitoring-reports/  # reporter (catcher + qa-tester findings → master)
monitoring/
  catcher-logs/        # catcher (raw observations → reporter)
status.md              # project-manager
```

## Agent file format (`.opencode/agents/<id>.md`)

YAML frontmatter with `description`, `mode` (`primary` for master, `subagent` for departments), `model`, `permissions`; body is the system prompt.

## Department agent ids

`skynet-master`, `requirements-analysis`, `product-strategist`, `ux-architect`,
`ui-design`, `frontend`, `backend`, `database-architect`, `devops`, `qa-tester`,
`security-auditor`, `seo-specialist`, `content-writer`, `project-manager`,
`catcher`, `reporter`.

## Skills referenced

Meta: `orchestration-protocol`, `task-delegation`, `artifact-handoff`, `quality-gates`.
MCP: `mcp-context7`, `mcp-playwright`, `mcp-postgres`, `mcp-sentry`.
Plugin authoring: `plugin-authoring`, `plugin-rpc`.