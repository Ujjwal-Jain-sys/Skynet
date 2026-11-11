---
name: MCP Sentry
description: Read and monitor production errors and releases for deployed Skynet sites
---

# MCP Sentry

Use Sentry so DevOps and the master can see real production errors after deploy.

## When to use

- Post-deploy health checks.
- Triaging a reported bug against real error data.
- Confirming a fix stopped an error.

## Configuration

```jsonc
{
  "mcp": {
    "servers": {
      "sentry": { "type": "remote", "url": "https://mcp.sentry.dev/mcp" }
    }
  }
}
```

Remote servers use OAuth by default. The user signs in via `/mcps`.

## Usage

1. Discover tools with Code Mode `search` (namespace `sentry`).
2. Search for existing issues before creating new ones (the server instructs this).
3. Link issues to the project in `reports/`.

## Rules

- Never paste secrets or full user data from error payloads into artifacts.
- Record only the issue id, title, and impact.
