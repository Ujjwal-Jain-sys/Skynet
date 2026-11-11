---
name: E2E Browser Testing
description: Verify real user flows in a browser with Playwright
---

# E2E Browser Testing

Owned by `qa-tester`. Uses `mcp-playwright`.

## Workflow

1. Pick the critical flows from `user-flows.md`.
2. Script each flow: navigate, interact, assert.
3. Use accessible selectors (role, label, text) over CSS.
4. Assert visible outcomes, not internal state.
5. Capture a screenshot on failure.

## Rules

- Test against the deployed preview URL, not a mock.
- Keep e2e tests few and high-value (they are slow).
- Make them deterministic: seed data, fixed viewport, wait for network idle.
- Cover mobile viewport for the primary flow.

## What to cover

- Primary conversion flow.
- Auth: signup, login, logout, protected route.
- Forms: validation, success, error.
- Navigation and 404.
