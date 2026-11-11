---
name: MCP Context7
description: Fetch current, version-accurate library and framework documentation before writing code
---

# MCP Context7

Use Context7 to pull up-to-date docs for libraries and frameworks instead of relying
on training data.

## When to use

- Before scaffolding a framework (Next.js, React, Prisma, Tailwind).
- When an API may have changed since the model's training cutoff.
- When resolving a version-specific bug.

## Configuration

```jsonc
{
  "mcp": {
    "servers": {
      "context7": { "type": "remote", "url": "https://mcp.context7.com/mcp" }
    }
  }
}
```

Add a header credential only if required:

```jsonc
{ "headers": { "CONTEXT7_API_KEY": "{env:CONTEXT7_API_KEY}" } }
```

## Usage

1. Discover tools with Code Mode `search` (namespace `context7`).
2. Resolve the library id, then fetch the relevant docs page.
3. Cite the version you used in the artifact (`docs/projects/<id>/code/`).

## Rules

- Prefer Context7 over memory for anything version-sensitive.
- Record the library version in the artifact so builds are reproducible.
