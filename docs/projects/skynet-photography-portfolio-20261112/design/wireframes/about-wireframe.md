# Wireframe — About (/about)

Serves: US-05 (Read photographer's about page, Must), FR-007, NFR-001, NFR-002
Status: review | Owner: ux-architect | Updated: 2026-11-12T17:00:00Z
Aesthetic: dark minimal gallery (wireframe is low-fidelity; no colors/fonts)

## Desktop (1024px+)

```
+-----------------------------------------------------------------------+
| [Logo]        Gallery   About   Contact        [Menu ☰]               |
+-----------------------------------------------------------------------+
|                                                                       |
|  About                                                                |  ← H1
|                                                                       |
|  [PORTRAIT]           Photographer biography                          |
|  [alt: Portrait of …]    paragraph text                               |
|                         multiple paragraphs                           |
|                                                                       |
|                                                                       |
|  [Contact me →]                                                       |  ← CTA to /contact
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  Home   Gallery   About   Contact    |  © Photographer name          |
+-----------------------------------------------------------------------+
```

**Content blocks:** header, page heading (H1: About), portrait image with alt text, biography text, contact CTA button → /contact, footer.

**Dynamic regions:** portrait image + alt, biography text bind to content (content-writer).

**Interactions:**
- Contact CTA: click or keyboard Enter/Space → /contact.

**Responsive:** portrait and biography stack vertically on mobile; side-by-side on desktop/tablet.

**WCAG 2.2 AA annotations:**
- H1 heading — 1.3.1, 2.4.6
- Portrait image alt text — 1.1.1
- Biography semantic paragraphs — 1.3.1
- CTA button visible focus, target size ≥ 24×24px — 2.4.7, 2.5.5, 2.5.8
- Link purpose clear ("Contact me") — 2.4.4
- Contrast ≥ 4.5:1 — 1.4.3
- Reflow at 320px — 1.4.10
- Keyboard operability — 2.1.1

---

## Mobile (375px)

```
+-----------------------+
| [Logo]       [☰ Menu] |
+-----------------------+
|                       |
|    About              |
|                       |
+-----------------------+
|                       |
|  [PORTRAIT]           |
|  [alt text]           |
|                       |
+-----------------------+
|                       |
|  Biography text       |
|  (stacked)            |
|                       |
+-----------------------+
|                       |
|  [Contact me →]       |
|                       |
+-----------------------+
|                       |
|  Nav | © Photographer |
|                       |
+-----------------------+
```

**Responsive behavior:** single column; portrait full-width or constrained; biography below; CTA full-width.

---

## Component-spec expectations for UI Design

- `Header`, `Footer` (shared).
- `Portrait`: image with alt text.
- `Biography`: rich text paragraph(s).
- `Button` (CTA): default/hover/focus/active/disabled.
- Tokens: spacing, max-width for text, image sizing.
