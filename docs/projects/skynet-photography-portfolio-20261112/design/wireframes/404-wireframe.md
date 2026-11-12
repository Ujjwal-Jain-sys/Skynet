# Wireframe — 404 (/404)

Serves: required recovery page (not a user story), NFR-001, NFR-002
Status: review | Owner: ux-architect | Updated: 2026-11-12T17:00:00Z
Aesthetic: dark minimal gallery (wireframe is low-fidelity; no colors/fonts)
Note: copy to be provided by content-writer

## Desktop (1024px+)

```
+-----------------------------------------------------------------------+
| [Logo]        Gallery   About   Contact        [Menu ☰]               |
+-----------------------------------------------------------------------+
|                                                                       |
|  Page not found                                                       |  ← H1
|                                                                       |
|  The page you're looking for doesn't exist.                           |
|                                                                       |
|  [Return home →]      [Go to gallery →]                               |
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  Home   Gallery   About   Contact    |  © Photographer name          |
+-----------------------------------------------------------------------+
```

**Content blocks:** header, H1 (Page not found), short error message, two recovery links (home, gallery), footer.

**Interactions:**
- Return home → / ; Go to gallery → /gallery. Both keyboard-operable, visible focus.

**Responsive:** single column centered on mobile.

**WCAG 2.2 AA annotations:**
- H1 heading — 1.3.1, 2.4.6
- Error message clear, no technical jargon — 3.3.1 (error prevention/help spirit)
- Links purpose clear ("Return home", "Go to gallery") — 2.4.4
- Visible focus on links — 2.4.7
- Target size ≥ 24×24px — 2.5.5, 2.5.8
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
|  Page not found       |
|                       |
|  The page you're      |
|  looking for doesn't  |
|  exist.               |
|                       |
|  [Return home →]      |
|  [Go to gallery →]    |
|                       |
+-----------------------+
|                       |
|  Nav | © Photographer |
|                       |
+-----------------------+
```

**Responsive behavior:** single column; links full-width or stacked; header hamburger drawer.

---

## Component-spec expectations for UI Design

- `Header`, `Footer` (shared).
- `ErrorPage`: H1 + message + recovery links.
- Tokens: spacing, max-width for content.
