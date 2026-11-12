# Wireframe — Home (/)

Serves: US-01 (View the home page, Must), FR-001, NFR-001, NFR-002, NFR-003
Status: review | Owner: ux-architect | Updated: 2026-11-12T17:00:00Z
Aesthetic: dark minimal gallery (wireframe is low-fidelity; no colors/fonts)

## Desktop (1024px+)

```
+-----------------------------------------------------------------------+
| [Logo]        Gallery   About   Contact        [Menu ☰]               |
|  (skip to content link above header, keyboard-first)                  |
+-----------------------------------------------------------------------+
|                                                                       |
|                    [HERO]                                             |
|                                                                       |
|  "Landscape & nature photography"      [Enter gallery →]              |
|  Value proposition line                                              |
|                                                                       |
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|             Featured photo (hero image, lazy-loaded)                  |
|             [alt: descriptive caption]                                |
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  Brief intro paragraph about the photographer and the work            |
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  Home   Gallery   About   Contact    |  © Photographer name          |
+-----------------------------------------------------------------------+
```

**Content blocks:** header (logo + primary nav + skip link), hero (value proposition + primary CTA button → /gallery), featured photo block, intro text, footer.

**Interactions:**
- CTA button: click or keyboard Enter/Space → navigate to /gallery, focus moves to gallery overview.
- Skip-to-content link: first keyboard focusable element, visually hidden until focused.
- All nav links keyboard-operable, visible focus.

**Responsive:** stacks vertically on mobile; hero CTA full-width on mobile.

**WCAG 2.2 AA annotations:**
- Skip-to-content link (bypass blocks) — 2.4.1
- Logo text alternative — 1.1.1
- Heading hierarchy: H1 (value proposition) — 1.3.1, 2.4.6
- Link purpose clear from text — 2.4.4
- Focus visible on all interactive elements — 2.4.7
- Target size ≥ 24×24px for CTA and nav — 2.5.5, 2.5.8
- Contrast ≥ 4.5:1 on text (dark bg, light text) — 1.4.3
- Reflow at 320px equivalent — 1.4.10

---

## Mobile (375px)

```
+-----------------------+
| [Logo]       [☰ Menu] |
+-----------------------+
|                       |
|      [HERO]           |
|                       |
| "Landscape & nature"  |
|  value prop           |
|  [Enter gallery →]    |
|                       |
+-----------------------+
|                       |
|  Featured photo       |
|  [alt text]           |
|                       |
+-----------------------+
|                       |
|  Intro paragraph      |
|                       |
+-----------------------+
|                       |
|  Nav links (drawer)   |
|  © Photographer       |
|                       |
+-----------------------+
```

**Responsive behavior:** hamburger opens drawer with same nav links; hero CTA spans full width; featured photo scales to fit viewport width.

---

## Component-spec expectations for UI Design

- `Header` component: logo link, primary nav (Gallery/About/Contact), mobile hamburger drawer, skip-to-content link.
- `Button` (primary CTA): default/hover/focus/active/disabled states; visible focus ring.
- `Hero` block: headline, subhead, CTA button.
- `FeaturedPhoto`: lazy-loaded image with alt text.
- `Footer`: nav links, copyright text.
- Tokens: spacing, radius, breakpoints (mobile/tablet/desktop).
