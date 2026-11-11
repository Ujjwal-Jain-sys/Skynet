---
name: Plugins
description: What OpenCode plugins can do, how they load, and how agents invoke their tools and commands
---

# Plugins

Plugins extend OpenCode's behavior: they add tools, hooks, integrations, commands,
agents, and UI. Skynet uses plugins for orchestration, task tracking, notifications,
and guardrails.

## Parts

A plugin is one package with any combination of parts:

| Part | Export | Runs in |
|------|--------|---------|
| Server | `.` or `./server` | OpenCode server (`@opencode/plugin`) |
| TUI | `./tui` | Terminal UI (`@opencode/plugin/tui`) |
| GUI | `./gui-experimental` | OpenCode Desktop (`@opencode/plugin/gui`) |
| RPC | `./rpc` | Typed contract used by other parts/clients |

## Loading

- Direct `.ts`/`.js` files and immediate package directories under
  `.opencode/plugins/` load automatically.
- Other locations must be listed in `opencode.jsonc`:

```jsonc
{ "plugins": ["opencode-acme-plugin", "./plugins/local", "@acme/opencode-plugin"] }
```

- Relative paths resolve from the config file; configured local paths must be
  **directories** (a single file is skipped).
- TUI-only plugins go in `cli.json` instead.
- Disable with a `-` prefix; `*` matches all.

## Managing

```sh
opencode plugin add <pkg>@<version>
opencode plugin list
opencode plugin check
opencode plugin update
opencode plugin remove <pkg>
```

## Using plugin-provided tools

Plugin server tools appear like any other tool and, under Code Mode, are callable via
`tools.<namespace>.<tool>(...)`. Discover them with Code Mode's `search` before use.

## Rules

- Never log or expose secrets from plugin code.
- Keep plugin IDs unique and lowercase.
- Prefer local `.opencode/plugins/` during development.
- See `plugin-authoring` to build one and `plugin-rpc` for typed cross-part methods.
