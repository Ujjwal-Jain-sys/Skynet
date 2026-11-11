---
name: Structured Data
description: Add schema.org markup so search engines understand the content
---

# Structured Data

Owned by `seo-specialist` with `frontend`.

## Common types

- `Organization` — home page.
- `WebSite` + `SearchAction` — site-wide.
- `BreadcrumbList` — nested pages.
- `Article` / `BlogPosting` — content pages.
- `Product` + `Offer` — commerce.
- `LocalBusiness` — local services.
- `FAQPage` — FAQ sections.

## Workflow

1. Choose types per page from its content.
2. Emit JSON-LD in the page head.
3. Validate with the Rich Results test.
4. Keep markup consistent with visible content.

## Rules

- Never mark up content that is not visible.
- JSON-LD preferred over microdata.
- One primary entity per page.
- Keep it accurate; misleading markup risks penalties.
