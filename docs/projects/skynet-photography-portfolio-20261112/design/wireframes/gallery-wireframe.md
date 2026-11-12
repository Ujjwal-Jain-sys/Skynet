# Wireframe — Gallery Overview (/gallery)

Serves: US-02 (Browse paginated thumbnail grid, Must), US-07 (Filter by category, Should), FR-002, FR-006, FR-015, NFR-001, NFR-002, NFR-003, NFR-004
Status: review | Owner: ux-architect | Updated: 2026-11-12T17:00:00Z
Aesthetic: dark minimal gallery (wireframe is low-fidelity; no colors/fonts)

## Desktop (1024px+)

```
+-----------------------------------------------------------------------+
| [Logo]        Gallery   About   Contact        [Menu ☰]               |
+-----------------------------------------------------------------------+
| Home > Gallery                                                        |
+-----------------------------------------------------------------------+
|                                                                       |
|  Gallery                                                              |
|                                                                       |
|  [Mountains] [Forests] [Water] [Skies] [All]   ← category filter pills|
|  (progressive enhancement; JS-enhanced, works without JS)            |
|                                                                       |
+-----------------------------------------------------------------------+
|  [img] [img] [img] [img] [img] [img]                                  |
|  [img] [img] [img] [img] [img] [img]        ← thumbnail grid (≤24)   |
|  [img] [img] [img] [img] [img] [img]   each: lazy-load, alt text      |
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  [← Prev] 1 2 3 4 5 [Next →]      ← pagination controls              |
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  Home   Gallery   About   Contact    |  © Photographer name          |
+-----------------------------------------------------------------------+
```

**Content blocks:** header, breadcrumb, page heading (H1: Gallery), category filter pills, paginated thumbnail grid (≤24 photos per page), pagination controls, footer.

**Dynamic regions:** thumbnail grid binds to photo list (database-architect); category filter pills bind to category list; pagination binds to total page count.

**Interactions:**
- Thumbnail: click or keyboard Enter/Space → /photo/[slug] for that photo; focus moves to photo detail page.
- Filter pill: click/keyboard → filters grid; URL updates to /gallery/[category] (Should, V1).
- Pagination: prev/next/page numbers; focus returns to top of grid or first thumbnail after page change.
- Lazy loading: images outside viewport not loaded until near viewport (loading="lazy", IntersectionObserver fallback).

**Responsive:** 2–3 columns mobile, 4–6 columns tablet, 6 columns+ desktop.

**Empty state (no photos):**
```
+-----------------------------------------------------------------------+
|  Gallery                                                              |
|                                                                       |
|      The gallery is empty. Check back soon.                           |
|                                                                       |
|      [Return home →]                                                  |
|                                                                       |
+-----------------------------------------------------------------------+
```

**WCAG 2.2 AA annotations:**
- Breadcrumb with aria-label="Breadcrumb" — 2.4.8
- H1 heading — 1.3.1, 2.4.6
- Filter pills as buttons (role="button", aria-pressed) — 4.1.2, 1.3.1 (or native `<button>`)
- Thumbnails as links wrapping images; image alt text — 1.1.1, 4.1.2
- Focus visible on thumbnails, pills, pagination — 2.4.7
- Keyboard traversal of grid (Tab/arrow optional) — 2.1.1
- Target size ≥ 24×24px on thumbnails and pills — 2.5.5, 2.5.8
- Pagination labels clear ("Previous page", "Page 2 of 5", "Next page") — 2.4.4
- Contrast ≥ 4.5:1 — 1.4.3
- Reflow at 320px — 1.4.10
- Lazy-loaded images retain alt text — 1.1.1

---

## Mobile (375px)

```
+-----------------------+
| [Logo]       [☰ Menu] |
+-----------------------+
| Home > Gallery        |
+-----------------------+
|                       |
|    Gallery            |
|                       |
|  [Mountains][Forests] |
|  [Water][Skies][All]  |
|                       |
+-----------------------+
|  [img] [img]          |
|  [img] [img]          |  ← 2-col grid, lazy-loaded
|  [img] [img]          |
|                       |
+-----------------------+
|  [← Prev] 1 2 [Next →]|
|                       |
+-----------------------+
|                       |
|  Nav | © Photographer |
|                       |
+-----------------------+
```

**Responsive behavior:** single-column category pills wrap; 2-column thumbnail grid; pagination compact; header hamburger drawer.

---

## Component-spec expectations for UI Design

- `Header`, `Footer` (shared with home).
- `Breadcrumb`: list of links with aria-label.
- `FilterPill`: button with pressed state; group with role="group" aria-label="Filter by category".
- `PhotoGrid`: grid container; `PhotoCard` = link + lazy image + alt.
- `Pagination`: prev/next + page number buttons, aria-label="Pagination", current page aria-current="page".
- `EmptyState`: heading + link.
- Tokens: grid breakpoints, gap, thumbnail aspect ratio.
