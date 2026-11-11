# Skynet

Multi-agent AI system that lets non-technical people build and deploy websites by
describing them in plain language.

Built on **OpenCode V2** primitives: a master orchestrator agent routes work to
department subagents, each backed by reusable skills, MCP servers, and plugins.

## Execution order

1. **Phase S — Skills** (current)
2. **Phase A — Agent config**
3. **Phase T — Tooling** (MCP servers + plugins)
4. **Phase B — Build the website builder**

## Layout

```
Skynet/
├─ README.md
├─ opencode.jsonc            # Phase T
├─ AGENTS.md                 # Phase A
├─ .opencode/
│  ├─ agents/                # Phase A — master + 13 department agents
│  ├─ skills/                # Phase S — this phase
│  ├─ plugins/               # Phase T
│  └─ commands/              # Phase A
├─ docs/projects/            # agent-produced artifacts per project
├─ engine/                   # Phase B — orchestration service
├─ web/                      # Phase B — non-tech-user UI
├─ templates/                # Phase B
└─ infra/                    # Phase B
```

## Skills

Skills live in `.opencode/skills/<skill-id>/SKILL.md` and are loaded on demand by
agents via the `skill` tool. See `docs/` and the plan for the full inventory.
