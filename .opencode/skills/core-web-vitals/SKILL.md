---
name: Core Web Vitals
description: Meet LCP, INP, and CLS performance targets
---

# Core Web Vitals

Owned by `seo-specialist` with `frontend`/`devops`.

## Targets (75th percentile)

- **LCP** (Largest Contentful Paint) — ≤ 2.5s.
- **INP** (Interaction to Next Paint) — ≤ 200ms.
- **CLS** (Cumulative Layout Shift) — ≤ 0.1.

## How to hit them

- **LCP** — optimize the hero image (modern format, correct size, priority load);
  minimize render-blocking resources; use CDN caching.
- **INP** — keep JS light; split bundles; avoid long tasks; defer non-critical work.
- **CLS** — reserve space for media/ads; avoid layout-shifting injections; set
  dimensions on images.

## Workflow

1. Measure with Lighthouse/field data before optimizing.
2. Fix the biggest contributor first.
3. Re-measure; verify on mobile.
4. Track in `reports/seo.md`.

## Rules

- Performance is a requirement, not a follow-up.
- Test on a throttled mobile profile.
