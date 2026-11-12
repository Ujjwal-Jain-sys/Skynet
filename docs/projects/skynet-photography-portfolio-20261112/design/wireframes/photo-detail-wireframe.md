# Wireframe — Photo Detail (/photo/[slug])

Serves: US-03 (Open photo detail, Must), US-04 (Navigate within lightbox, Must), US-08 (Share, Could — deferred), FR-003, FR-004, FR-005, FR-006, FR-016, FR-017, NFR-001, NFR-002, NFR-004
Status: review | Owner: ux-architect | Updated: 2026-11-12T17:00:00Z
Aesthetic: dark minimal gallery (wireframe is low-fidelity; no colors/fonts)
Note: dynamic page; [slug] = photo slug (e.g., moonlit-ridge)

## Desktop (1024px+)

```
+-----------------------------------------------------------------------+
| [Logo]        Gallery   About   Contact        [Menu ☰]               |
+-----------------------------------------------------------------------+
| Home > Gallery > Mountains > Moonlit Ridge                            |
+-----------------------------------------------------------------------+
|                                                                       |
|  [Close ×]  [← Prev]  [Next →]      ← lightbox controls              |
|  (Escape also closes)                                                 |
+-----------------------------------------------------------------------+
|                                                                       |
|             [ENLARGED PHOTO]                                          |
|             [alt: descriptive caption]                                |
|             lazy-loaded, optimized per breakpoint                     |
+-----------------------------------------------------------------------+
|                                                                       |
|  Moonlit Ridge                                                        |  ← caption (H2)
|                                                                       |
|  Location: Rocky Mountains  |  Date: October 2026  |  [Share →]      |  ← metadata + share (Could)
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  Home   Gallery   About   Contact    |  © Photographer name          |
+-----------------------------------------------------------------------+
```

**Content blocks:** header, breadcrumb, lightbox controls (Close ×, Prev ←, Next →), enlarged photo (lazy-loaded, optimized), caption (H2), location/date metadata, share option (Could — deferred to V1+), footer.

**Dynamic regions:** photo image + alt, caption, location, date, prev/next photo slugs bind to data; first/last photo disables Prev/Next.

**Interactions:**
- Close × or Escape: close lightbox, return focus to triggering thumbnail on gallery overview.
- Prev ←: load previous photo in sequence (disabled on first).
- Next →: load next photo in sequence (disabled on last).
- Share → (Could): sharing option for current photo.

**Responsive:** on mobile, controls stack below/above image; swipe gestures optional (not required; must not be motion-only — must have button alternatives).

**Empty/error state (photo fails to load):**
```
+-----------------------------------------------------------------------+
|  Home > Gallery > Mountains > Moonlit Ridge                           |
+-----------------------------------------------------------------------+
|                                                                       |
|  [Close ×]  [← Prev]  [Next →]                                        |
+-----------------------------------------------------------------------+
|                                                                       |
|      [placeholder block]                                              |
|      Unable to load this photo.                                       |
|                                                                       |
+-----------------------------------------------------------------------+
```

**WCAG 2.2 AA annotations:**
- Lightbox controls as native `<button>` elements — 4.1.2, 2.1.1
- Close + Escape to close — 2.1.1, 2.4.7 (visible focus)
- Prev/Next disabled state: aria-disabled="true" — 4.1.2
- Photo alt text descriptive — 1.1.1
- Caption as H2, associated with image — 1.3.1, 2.4.6
- Metadata as list or plain text with labels — 1.3.1
- Focus returns to triggering thumbnail on close — 2.4.3 (focus order), US-04 AC
- Target size ≥ 24×24px on Close/Prev/Next/Share — 2.5.5, 2.5.8
- Contrast ≥ 4.5:1 — 1.4.3
- Reflow at 320px — 1.4.10
- Swipe (if added) must not be the only way to navigate — 2.5.1

---

## Mobile (375px)

```
+-----------------------+
| [Logo]       [☰ Menu] |
+-----------------------+
| Home > Gallery        |
|     > Moonlit Ridge   |
+-----------------------+
|                       |
|  [Close ×]            |
|  [← Prev] [Next →]    |
|                       |
+-----------------------+
|                       |
|  [ENLARGED PHOTO]     |
|  [alt text]           |  ← full-width, lazy-loaded
|                       |
+-----------------------+
|                       |
|  Moonlit Ridge        |
|                       |
|  Rocky Mountains      |
|  October 2026         |
|  [Share →]            |
|                       |
+-----------------------+
|                       |
|  Nav | © Photographer |
|                       |
+-----------------------+
```

**Responsive behavior:** photo scales to full viewport width; controls stacked above image; caption and metadata below; share button full-width.

---

## Component-spec expectations for UI Design

- `Header`, `Footer`, `Breadcrumb` (shared).
- `LightboxControls`: Close / Prev / Next buttons, visible focus, disabled states.
- `PhotoImage`: lazy-loaded, optimized srcset/sizes, alt text.
- `Caption`: H2.
- `PhotoMetadata`: location + date labels/values.
- `ShareButton` (Could): deferred.
- Tokens: image max-width, control spacing, breakpoint behavior.
