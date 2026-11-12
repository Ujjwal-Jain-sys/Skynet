# Wireframe — Category Gallery (/gallery/[category])

Serves: US-02 / US-07 (Should — V1), FR-002, FR-006, FR-015, NFR-001, NFR-002
Status: review | Owner: ux-architect | Updated: 2026-11-12T17:00:00Z
Aesthetic: dark minimal gallery (wireframe is low-fidelity; no colors/fonts)
Note: dynamic page; [category] = mountains | forests | water | skies (exact set confirmed by database-architect)

## Desktop (1024px+)

```
+-----------------------------------------------------------------------+
| [Logo]        Gallery   About   Contact        [Menu ☰]               |
+-----------------------------------------------------------------------+
| Home > Gallery > Mountains                                            |
+-----------------------------------------------------------------------+
|                                                                       |
|  Mountains                                                            |
|  Landscape photography from high ranges                               |
|                                                                       |
|  [Mountains] [Forests] [Water] [Skies] [All]   ← filter pills         |
|                                                                       |
+-----------------------------------------------------------------------+
|  [img] [img] [img] [img] [img] [img]                                  |
|  [img] [img] [img] [img] [img] [img]   ← filtered grid (≤24/page)     |
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  [← Prev] 1 2 [Next →]                                               |
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  Home   Gallery   About   Contact    |  © Photographer name          |
+-----------------------------------------------------------------------+
```

**Content blocks:** header, breadcrumb (Home > Gallery > [Category]), category title (H1), optional category description, filter pills, filtered paginated thumbnail grid, pagination, footer.

**Dynamic regions:** category title/description and photo list bind to data; active filter pill reflected in URL.

**Empty state (category with no photos):**
```
+-----------------------------------------------------------------------+
|  Mountains                                                            |
|                                                                       |
|      No photos in this category yet.                                  |
|                                                                       |
|      [Clear filter →]    [Return to gallery →]                        |
|                                                                       |
+-----------------------------------------------------------------------+
```

**Interactions:**
- Filter pills: same as gallery overview; selecting a different category updates grid and URL.
- Thumbnails → /photo/[slug].
- Pagination → next page within same category.

**Responsive:** same grid/column behavior as gallery overview.

**WCAG 2.2 AA annotations:**
- Breadcrumb reflects current category — 2.4.8
- H1 = category name — 1.3.1, 2.4.6
- Active filter pill: aria-pressed="true", aria-current equivalent — 4.1.2, 1.3.1
- Empty state announced to screen readers — 4.1.3 (live region) or focus management
- "Clear filter" link returns to /gallery — 2.4.4
- All other annotations as gallery overview (focus, target size, contrast, reflow, alt text).

---

## Mobile (375px)

```
+-----------------------+
| [Logo]       [☰ Menu] |
+-----------------------+
| Home > Gallery        |
|     > Mountains       |
+-----------------------+
|                       |
|    Mountains          |
|                       |
|  [Mountains][Forests] |
|  [Water][Skies][All]  |
|                       |
+-----------------------+
|  [img] [img]          |
|  [img] [img]          |  ← 2-col filtered grid
|                       |
+-----------------------+
|  [← Prev] 1 [Next →]  |
|                       |
+-----------------------+
|                       |
|  Nav | © Photographer |
|                       |
+-----------------------+
```

---

## Component-spec expectations for UI Design

- Reuses `Header`, `Footer`, `Breadcrumb`, `FilterPill`, `PhotoGrid`, `PhotoCard`, `Pagination`, `EmptyState`.
- `CategoryHeader`: H1 + optional description paragraph.
- Tokens: same as gallery overview.
