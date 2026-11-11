---
name: Sitemap Planning
description: Define the page inventory and hierarchy for the site
---

# Sitemap Planning

Owned by `requirements-analysis` (initial) and refined by `ux-architect`.
Output: `docs/projects/<id>/sitemap.md`.

## Workflow

1. Derive pages from requirements and user stories.
2. Group pages into sections; define parent/child hierarchy.
3. Mark each page: purpose, primary call-to-action, key content blocks.
4. Flag pages needing dynamic data (from the data model).

## Output format

```markdown
---
owner: requirements-analysis
phase: requirements
status: draft
updated: <ISO date>
---
# Sitemap

- / (Home) — hero, value prop, CTA
- /about
- /services
  - /services/<slug>
- /contact — form
- 404
```

## Rules

- Every requirement must map to at least one page.
- Keep the MVP sitemap small; defer nice-to-have pages to the roadmap.
- Mark authentication-gated pages explicitly.
