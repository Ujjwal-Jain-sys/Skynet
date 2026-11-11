---
name: MCP Servers
description: Configure and use Model Context Protocol servers in OpenCode — tools, resources, auth, and permissions
---

# MCP Servers

MCP servers expose tools, prompts, resources, and instructions to agents. MCP tools
consume model context, so add only the servers a task needs.

## Configuration

Servers live under `mcp.servers` (V2). Never place server names directly under `mcp`.

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "context7": { "type": "remote", "url": "https://mcp.context7.com/mcp" },
      "playwright": { "type": "local", "command": ["npx", "-y", "@playwright/mcp"] }
    }
  }
}
```

- **Local** servers run a command over stdio. Fields: `command` (required), `cwd`,
  `environment`, `disabled`, `timeout`.
- **Remote** servers use Streamable HTTP. Fields: `url` (required), `headers`,
  `oauth`, `disabled`, `timeout`.
- Use `disabled: true` to keep a server configured without connecting.

## Secrets

Never write secrets into configuration. Use environment substitution:

```jsonc
{ "headers": { "CONTEXT7_API_KEY": "{env:CONTEXT7_API_KEY}" } }
```

## Auth

Remote servers use OAuth by default. If a server needs sign-in, the user runs
`/mcps`, selects it, and completes authorization in the browser. Set `oauth: false`
only when the server uses an API key/header credential exclusively.

## Using tools

Under Code Mode (default), tools are grouped by normalized server name and called as:

```
tools.context7.resolve_library_id({ ... })
```

Tool names are normalized to `<server>_<tool>` (characters other than letters,
digits, `_`, and `-` become `_`). MCP prompts become commands: `<server>:<prompt>`.

Use Code Mode's `search` to discover a server's tools before calling them; do not
guess tool names.

## Resources

Read server resources with the built-in tools:

- `list_mcp_resources` (permission action `opencode_list_mcp_resources`)
- `read_mcp_resource` (permission action `opencode_read_mcp_resource`, resource
  `<server>:<uri>`)

## Permissions

Hide or deny tools without disconnecting the server:

```jsonc
{ "permissions": [ { "action": "context7_*", "resource": "*", "effect": "deny" } ] }
```

## Management

```sh
opencode mcp add <name> --url <url>
opencode mcp add <name> -- <command> ...
opencode mcp list
opencode mcp logout <name>
```

## Rules

- Prefer the CLI (`opencode mcp add`) so unrelated config is preserved.
- Keep server names short and unique after normalization.
- Only enable servers the current department needs.
