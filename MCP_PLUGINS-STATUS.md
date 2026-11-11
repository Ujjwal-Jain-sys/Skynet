# MCP Servers & Plugins — Status & Requirements

## Current status (no Node.js installed)

| Component | Status | Reason |
|-----------|--------|--------|
| `context7` MCP | ✅ Enabled | Remote server, no Node.js needed |
| `playwright` MCP | ⏸️ Disabled | Requires `npx` (Node.js/npm) |
| `postgres` MCP | ⏸️ Disabled | Requires `npx` (Node.js/npm) + `DATABASE_URL` |
| `sentry` MCP | ⏸️ Disabled | Requires OAuth sign-in |
| `skynet-orchestrator` plugin | ⏸️ Disabled | Requires `@opencode/plugin` SDK (npm) |
| `skynet-task-tracker` plugin | ⏸️ Disabled | Requires `@opencode/plugin` SDK (npm) |
| `skynet-notifier` plugin | ⏸️ Disabled | Requires `@opencode/plugin` SDK (npm) |
| `skynet-guardrails` plugin | ⏸️ Disabled | Requires `@opencode/plugin` SDK (npm) |

## To enable everything

1. **Install Node.js** (includes npm and npx):
   ```bash
   # Example using a package manager; choose your preferred method
   sudo apt install nodejs npm        # Debian/Ubuntu
   # or download from https://nodejs.org/
   ```

2. **Install plugin dependencies** (from the Skynet project root):
   ```bash
   cd .opencode/plugins/skynet-orchestrator && npm install
   cd ../skynet-task-tracker && npm install
   cd ../skynet-notifier && npm install
   cd ../skynet-guardrails && npm install
   ```

3. **Enable disabled components** in `opencode.jsonc`:
   - Remove `"disabled": true` from playwright, postgres, sentry servers
   - Remove the `-` prefix from the 4 plugin entries
   - Run `opencode service restart` (or reload config)

4. **Sentry**: also requires a Sentry account and OAuth sign-in via `/mcps` — only enable if you have one.

## What works without Node.js

- All **79 skills** in `.opencode/skills/`
- All **14 agents** in `.opencode/agents/` (master + 13 departments)
- All **3 commands** in `.opencode/commands/` (`/skynet-build`, `/skynet-status`, `/skynet-deploy`)
- `context7` MCP server (remote docs lookup)
- `AGENTS.md` orchestration protocol
- Phase B product foundation (`engine/`, `web/`, `templates/`, `infra/`)
