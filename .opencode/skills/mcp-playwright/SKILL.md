---
name: MCP Playwright
description: Drive a real browser to test user flows, capture screenshots, and verify visual output
---

# MCP Playwright

Use Playwright to exercise the generated site in a real browser.

## When to use

- QA: end-to-end flows (signup, checkout, form submission).
- UI design: capture screenshots for visual review.
- SEO: verify rendered metadata and Core Web Vitals.

## Configuration

```jsonc
{
  "mcp": {
    "servers": {
      "playwright": { "type": "local", "command": ["npx", "-y", "@playwright/mcp"] }
    }
  }
}
```

## Usage

1. Discover tools with Code Mode `search` (namespace `playwright`).
2. Open the preview URL, interact with elements by accessible role/name.
3. Capture screenshots into `docs/projects/<id>/reports/` or `design/`.
4. Record failures with steps to reproduce for `qa-tester`.

## Rules

- Always test against the preview URL, never a localhost-only guess.
- Prefer accessible selectors (role, label) over brittle CSS.
- Attach a screenshot to every reported bug.
