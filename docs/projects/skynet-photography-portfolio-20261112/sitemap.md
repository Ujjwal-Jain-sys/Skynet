---
owner: ux-architect
phase: ux
status: review
updated: 2026-11-12T17:00:00Z
---

# Sitemap — skynet-photography-portfolio-20261112 (refined)

Refined page inventory, hierarchy, navigation, and URL structure for the
landscape & nature photography portfolio (showcase only; contact form for
inquiries; no checkout). Organized by visitor mental model (browse → discover
→ inquire), not by org structure.

## Visual style note

Dark minimal gallery: near-black backgrounds, generous whitespace, typography
and imagery carry the brand. Wireframes are low-fidelity (no colors/fonts).

## Page inventory

| Path | Purpose | Primary CTA | Key content blocks | Dynamic? | Auth-gated? | Serves stories |
|------|---------|-------------|--------------------|----------|-------------|----------------|
| / | Home — introduce the photographer and portfolio | Enter gallery | Header (logo + nav), hero with value proposition + CTA, featured photo block, brief intro, footer | No | No | US-01 |
| /gallery | Gallery overview — browse all photos | Open a photo | Header, breadcrumb, category filter pills (progressive enhancement), paginated thumbnail grid (≤24/page), pagination controls, footer | Yes (photo list) | No | US-02, US-07 |
| /gallery/[category] | Category gallery — browse photos in one category | Open a photo | Header, breadcrumb (Home > Gallery > [Category]), category title + description, filtered paginated thumbnail grid, pagination controls, footer | Yes (photo list) | No | US-02, US-07 |
| /photo/[slug] | Photo detail — view a single photo enlarged | Next / Prev photo, Close | Header, breadcrumb (Home > Gallery > [Category] > Photo), lightbox-style enlarged photo, caption, location/date metadata, share option (deferred/Could), next/prev/close controls, footer | Yes (single photo) | No | US-03, US-04, US-08 |
| /about | About — learn about the photographer | Contact | Header, biography text, portrait image, contact CTA, footer | No | No | US-05 |
| /contact | Contact — submit an inquiry | Submit form | Header, contact form (name, email, message), inline validation messages, success/error states, footer | No | No | US-06 |
| /404 | Not found — recovered navigation | Return home | Header, error message, link to home, link to gallery, footer | No | No | — |

## Hierarchy

```
Home (/)
├── Gallery overview (/gallery)
│   └── Category gallery (/gallery/[category])   [dynamic]
└── Photo detail (/photo/[slug])                 [dynamic]
├── About (/about)
├── Contact (/contact)
└── 404 (/404)
```

## Navigation

### Global header (all pages)
- Logo / photographer name (links to /)
- Primary nav (max 5 items): Gallery, About, Contact
- Mobile: hamburger menu reveals same links in a drawer

### Footer (all pages)
- Links: Home, Gallery, About, Contact
- Photographer credit / copyright line

### Local navigation
- Breadcrumbs on /gallery/[category] and /photo/[slug]: Home > Gallery > [Category] > [Photo title]
- Pagination controls on /gallery and /gallery/[category] (prev / next / page numbers)
- Next / Prev / Close controls on /photo/[slug]

## URL structure

- Lowercase, hyphenated, descriptive, no trailing slashes except root.
- `/gallery` — gallery overview
- `/gallery/<category-slug>` — category-filtered gallery (e.g., `/gallery/mountains`, `/gallery/forests`, `/gallery/water`, `/gallery/skies`)
- `/photo/<photo-slug>` — individual photo detail (e.g., `/photo/moonlit-ridge`)
- Category list (for filters and breadcrumbs): mountains, forests, water, skies (exact set confirmed by database-architect; open question in requirements.md)

## Three-click rule

Every page reachable within 3 clicks of home:
- /gallery: 1 click (header nav)
- /gallery/[category]: 2 clicks (nav → gallery → filter pill)
- /photo/[slug]: 2 clicks (nav → gallery → thumbnail)
- /about: 1 click (header nav)
- /contact: 1 click (header nav or about-page CTA)
- /404: reached via mistyped URL; links back to home (1 click)

## Requirement-to-page mapping

| Requirement | Page(s) |
|-------------|---------|
| FR-001 home hero + CTA | / |
| FR-002 paginated thumbnail grid | /gallery |
| FR-003 click thumbnail → photo detail | /gallery → /photo/[slug] |
| FR-004 lightbox enlarged view | /photo/[slug] |
| FR-005 lightbox next/prev/close + Escape | /photo/[slug] |
| FR-006 lazy loading images | /gallery, /gallery/[category], /photo/[slug] |
| FR-007 about page | /about |
| FR-008–FR-014 contact form | /contact |
| FR-015 category filters | /gallery |
| FR-016 caption + metadata | /photo/[slug] |
| FR-017 share option | /photo/[slug] (Could — deferred) |
| NFR-001 WCAG 2.2 AA | All pages |
| NFR-002 responsive mobile/tablet/desktop | All pages |
| NFR-003 LCP targets | / |
| NFR-004 optimized images | /gallery, /gallery/[category], /photo/[slug] |
| NFR-005 spam protection | /contact |
| NFR-006 no visitor emails in client source | /contact |

## Notes for downstream departments

- Dynamic pages: /gallery/[category] and /photo/[slug] require data from the data model (database-architect).
- No authentication-gated pages in MVP (no accounts/login).
- /404 included for completeness; copy to be provided by content-writer.
- Hand refined sitemap to `ui-design` and `seo-specialist`.
