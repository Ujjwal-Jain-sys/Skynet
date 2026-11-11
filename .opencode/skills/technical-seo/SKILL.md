---
name: Technical SEO
description: Ensure the site is crawlable, indexable, and fast
---

# Technical SEO

Owned by `seo-specialist` with `devops`/`frontend`.

## Checklist

- **robots.txt** — allow crawling; block only what should not be indexed.
- **sitemap.xml** — generated, lists all indexable pages.
- **Canonicals** — every page declares its preferred URL.
- **Status codes** — 200 for pages; proper 301 redirects; 404 for missing.
- **HTTPS** — everywhere; no mixed content.
- **Mobile-friendly** — responsive, no intrusive interstitials.
- **Structured data** — see `structured-data`.
- **Performance** — see `core-web-vitals`.
- **Internationalization** — hreflang if multi-language.

## Rules

- No accidental `noindex` in production.
- Redirect chains are at most one hop.
- URLs are stable; use redirects when they change.
- Verify with a crawler before launch.
