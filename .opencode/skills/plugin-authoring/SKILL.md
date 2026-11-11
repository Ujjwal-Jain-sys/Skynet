---
name: Plugin Authoring
description: Build an OpenCode plugin that adds tools, hooks, commands, agents, or UI
---

# Plugin Authoring

Use this to create Skynet's own plugins (`skynet-orchestrator`, `skynet-task-tracker`,
`skynet-notifier`, `skynet-guardrails`).

## Minimal server plugin

```ts title=".opencode/plugins/skynet-task-tracker/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "skynet-task-tracker",
  async setup(ctx) {
    // Register tools, hooks, commands, and agents using the ctx capabilities
    // exposed by the @opencode/plugin SDK.
  },
})
```

## Package layout (published plugin)

```json title="package.json"
{
  "name": "opencode-skynet-task-tracker",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./tui": "./src/tui.tsx",
    "./rpc": "./src/rpc.ts"
  },
  "files": ["src"],
  "dependencies": { "@opencode/plugin": "latest" }
}
```

## Local loading

- Put the plugin under `.opencode/plugins/<name>/` for automatic discovery, or
- List its directory in `opencode.jsonc` `plugins`.

A local directory with `package.json` `name` + `exports` loads through them.
Without them, OpenCode looks for `server` (else `index`), `tui`, and `rpc` files at
the root with `.ts`, `.tsx`, or `.js`.

## Reload

Config changes reload automatically. For unwatched local dependencies:

```sh
opencode service restart
```

## Rules

- One concern per plugin; keep IDs lowercase and unique.
- Never hardcode secrets.
- Export `./rpc` when other parts or clients need the contract without the
  implementation (see `plugin-rpc`).
- Fetch the full plugin guide at https://opencode.ai/docs/build/plugins before
  relying on specific `ctx` capabilities; do not guess hook names.
