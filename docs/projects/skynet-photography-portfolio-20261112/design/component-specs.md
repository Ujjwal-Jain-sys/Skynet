---
owner: ui-design
phase: ui
status: review
updated: 2026-11-12T18:00:00Z
---

# Component Specs — skynet-photography-portfolio-20261112

**Source of truth:** `design/design-tokens.json` — never hardcode values; map every style to a token.
**Aesthetic:** Dark minimal gallery (near-black background, generous whitespace, typography and imagery carry the brand).
**Stack:** Next.js App Router + TypeScript + Tailwind CSS. Prefer shadcn/ui primitives; extend, do not fork.
**Accessibility:** WCAG 2.2 AA. Contrast ≥ 4.5:1 body text (≥ 3:1 large text / UI borders). No color alone for meaning. Visible focus ring on all interactive elements. Target size ≥ 24×24 px (44 px preferred on touch).

Each spec below is a contract for `frontend`. Deviations require a change request.

---

## 1. Header

**Purpose:** Global navigation on every page. Logo link, primary nav (Gallery / About / Contact), skip-to-content link, mobile hamburger drawer.

**Used in:** all 7 wireframes (Home, Gallery, Category, Photo detail, About, Contact, 404).

**Anatomy / slots:**
- `skipLink` — visually hidden until focus, first keyboard-focusable element.
- `brand` — logo / photographer name, links to `/`.
- `nav` — list of links: Gallery, About, Contact (max 5 items).
- `menuButton` — hamburger, mobile only, toggles drawer.
- `drawer` — mobile panel containing same nav links.

**Variants:** none (layout only).

**States:**
- `default` — links text `text`, hover `text-muted`→`text`.
- `focus` — visible focus ring: `focus-ring` color, 2px offset, `radius: md`.
- `active` — slight scale down (98%).
- `current` (active page) — text `text`, underline or weight `semibold`.
- `disabled` — n/a (nav links are not disabled).

**Accessibility:**
- Skip link: first focusable, visually hidden until keyboard focus (WCAG 2.4.1).
- Logo: text alternative (WCAG 1.1.1).
- Nav: `<nav>` landmark, `<ul>`/`<li>` list, links keyboard-operable, visible focus (2.4.7).
- Hamburger: `<button>` with `aria-expanded`, `aria-controls="nav-drawer"`, `aria-label="Open menu"`.
- Drawer: `role="dialog"`/`aria-modal` when open, focus trapped, Escape closes, focus returns to hamburger on close.
- Target size ≥ 24×24 px on links and hamburger (2.5.5 / 2.5.8).

**Responsive:**
- Desktop: horizontal nav, no hamburger.
- Mobile (`< lg`): hamburger + drawer, drawer slides over content, header height `layout.headerHeight`.
- No horizontal scroll at 320px (1.4.10).

**Token usage:** `color.bg`, `color.text`, `color.text-muted`, `color.border`, `color.focus-ring`, `space.*`, `radius.md`, `font.button`, `zIndex.sticky`, `layout.headerHeight`.

---

## 2. Button

**Purpose:** Primary CTAs ("Enter gallery", "Contact me", "Return home", "Submit inquiry") and secondary actions. Primary variant uses light background on dark page; text is `text-on-primary`.

**Used in:** Home (CTA), About (Contact CTA), Contact (submit), 404 (recovery links), Gallery empty state, Lightbox controls.

**Anatomy / slots:**
- `container` — `<button>`.
- `label` — text.
- `icon` — optional leading/trailing arrow.
- `spinner` — loading state (optional).

**Variants:**
- `primary` — bg `primary`, text `text-on-primary`.
- `secondary` — transparent bg, text `text`, border `border`.
- `ghost` — transparent, text `text-muted`, hover text `text`.
- `danger` — text `error`.

**States:**
- `default` — base variant styling.
- `hover` — primary: bg `surface-hover` / opacity 0.9; secondary/ghost: text `text`, bg `surface`.
- `focus` — focus ring `focus-ring`, 2px, offset 2px, `radius.md`.
- `active` — scale 98%, bg `surface-hover`.
- `disabled` — opacity 0.4, `pointer-events: none`, cursor not-allowed.
- `loading` — spinner inside, text hidden, disabled.
- `error` — n/a on button; form-level error shown separately (see ErrorMessage).

**Accessibility:**
- Native `<button>`, visible focus ring (2.4.7).
- Target size ≥ 44×44 px on touch (2.5.5 / 2.5.8); min 24×24 px.
- Loading state announced via `aria-busy="true"`.
- No color alone: disabled state combines opacity + `pointer-events` + cursor.

**Responsive:**
- Mobile: primary CTA full width (wireframe: hero CTA spans full width on mobile).
- Desktop: auto width, padding `space.4` `space.8`.

**Token usage:** `color.primary`, `color.text-on-primary`, `color.text`, `color.text-muted`, `color.border`, `color.surface-hover`, `color.focus-ring`, `color.error`, `space.*`, `radius.md`, `font.button`, `transition.base`.

---

## 3. Hero

**Purpose:** Home page headline + value proposition + primary CTA. One clear focal point.

**Used in:** Home wireframe (desktop + mobile).

**Anatomy / slots:**
- `eyebrow` — optional small label (h6).
- `heading` — H1, value proposition.
- `subheading` — short line below heading.
- `cta` — primary Button → /gallery.
- `background` — none (dark bg lets featured photo carry imagery below).

**Variants:** none.

**States:** `default` only (static content block). CTA button follows Button states.

**Accessibility:**
- H1 heading hierarchy (1.3.1, 2.4.6).
- Link purpose clear from text ("Enter gallery") (2.4.4).
- Contrast ≥ 4.5:1 heading/subheading on `bg` (1.4.3).
- CTA focus visible (2.4.7).

**Responsive:**
- Desktop: centered, max width `layout.contentMaxWidth`.
- Mobile (`< lg`): stacked, CTA full width, heading scales down (`h1` still 5xl but tighter line height), measures shorten.
- Reflow at 320px (1.4.10).

**Token usage:** `color.bg`, `color.text`, `color.text-muted`, `type.h1`, `type.body`, `space.*`, `radius.md`, `layout.contentMaxWidth`.

---

## 4. FeaturedPhoto / PhotoImage

**Purpose:** Lazy-loaded, optimized photograph with descriptive alt text. Carries the visual weight of the gallery.

**Used in:** Home (featured photo), Gallery/Category (thumbnails via PhotoCard), Photo detail (enlarged photo).

**Anatomy / slots:**
- `wrapper` — aspect-ratio container (`layout.galleryAspectRatio` for thumbnails; 1:1 or fill for detail).
- `image` — `` with `loading="lazy"`, `srcset`/`sizes`, descriptive `alt`.
- `placeholder` — solid block (`surface`) shown if image fails; alt text retained.

**Variants:** `thumbnail` (grid), `featured` (home), `detail` (lightbox, full width).

**States:**
- `default` — image displays.
- `loading` — skeleton/shimmer `surface-hover`, no content shift.
- `error` — `placeholder` block with alt text; graceful degradation, no broken image icon.
- `focus` — wrapper focus ring when thumbnail is a link (see PhotoCard).

**Accessibility:**
- Descriptive `alt` on every image (1.1.1); no `alt` only when decorative (none here).
- Lazy-loaded images retain alt text (wireframe WCAG note).
- No color alone for load state.

**Responsive:**
- `srcset`/`sizes` per breakpoint; image scales to fit container.
- Mobile: full viewport width; desktop: grid cells.
- `loading="lazy"` + IntersectionObserver fallback.

**Token usage:** `color.bg`, `color.surface`, `color.surface-hover`, `radius.md`, `layout.galleryAspectRatio`, `space.*`, `shadow.sm`.

---

## 5. PhotoGrid

**Purpose:** Paginated thumbnail grid (≤ 24 photos per page). Drives the gallery browse experience.

**Used in:** Gallery (/gallery), Category (/gallery/[category]).

**Anatomy / slots:**
- `container` — grid.
- `items` — PhotoCard entries.
- `empty` — EmptyState when no photos (see EmptyState).

**Variants:** none (layout only).

**States:**
- `default` — grid of PhotoCards.
- `empty` — EmptyState rendered ("The gallery is empty. Check back soon." + "Return home" CTA).
- `loading` — skeleton cards while fetching.

**Accessibility:**
- Grid operable by keyboard: Tab into thumbnails, Enter/Space to open photo detail (2.1.1).
- Focus visible on each PhotoCard link (2.4.7).
- Each thumbnail wraps an image with alt text (1.1.1, 4.1.2).
- Target size ≥ 24×24 px per thumbnail (2.5.5 / 2.5.8).

**Responsive:**
- Mobile (`< sm`): 2 columns.
- Tablet (`sm`–`lg`): 4 columns.
- Desktop (`≥ lg`): 6 columns.
- Gap `space.4` (mobile) → `space.6` (desktop).
- No horizontal scroll; cards shrink to fit.

**Token usage:** `space.*`, `radius.md`, `color.surface`, `shadow.sm`, `layout.galleryAspectRatio`, `breakpoint.*`.

---

## 6. PhotoCard

**Purpose:** Single thumbnail: link wrapping lazy image, navigates to `/photo/[slug]`.

**Used in:** PhotoGrid (gallery & category).

**Anatomy / slots:**
- `link` — `<a href="/photo/[slug]">`.
- `image` — FeaturedPhoto (thumbnail variant).
- `overlay` — optional focus/hover ring.

**Variants:** none.

**States:**
- `default` — image at full opacity, subtle border `border`.
- `hover` — image slight scale (1.02), border `border-focus`.
- `focus` — focus ring `focus-ring` around card, `radius.md` (2.4.7).
- `active` — scale 0.98 on click.
- `disabled` — n/a.

**Accessibility:**
- Thumbnail as link wrapping image; image alt text (1.1.1).
- Focus visible on card (2.4.7).
- Link purpose clear (leads to photo detail) (2.4.4).
- Target size ≥ 24×24 px (2.5.5 / 2.5.8).
- Keyboard: Tab into card, Enter/Space activates (2.1.1).

**Responsive:**
- Card fills grid cell; aspect ratio maintained.
- Image lazy-loaded.

**Token usage:** `color.border`, `color.border-focus`, `color.focus-ring`, `radius.md`, `shadow.sm`, `layout.galleryAspectRatio`, `space.*`.

---

## 7. Pagination

**Purpose:** Prev / Next + page number controls on gallery pages. Focus returns to top of grid / first thumbnail after page change.

**Used in:** Gallery, Category.

**Anatomy / slots:**
- `container` — `<nav aria-label="Pagination">`.
- `prev` — button "← Previous page" (disabled/hidden on first page).
- `pages` — page number buttons, current page `aria-current="page"`.
- `next` — button "Next page →" (disabled/hidden on last page).

**Variants:** none.

**States:**
- `default` — page buttons text `text-muted`, current page `text` + underline/weight.
- `hover` — page buttons text `text`, bg `surface`.
- `focus` — focus ring `focus-ring`, `radius.md`.
- `active` — current page styled distinct.
- `disabled` — Prev on first page / Next on last: `aria-disabled="true"`, opacity 0.4, `pointer-events: none`. (Wireframe: disabled/hidden at bounds.)

**Accessibility:**
- `aria-label="Pagination"` on nav (2.4.4).
- Clear labels: "Previous page", "Page 2 of 5", "Next page" (2.4.4).
- `aria-current="page"` on current (4.1.2).
- `aria-disabled="true"` on disabled Prev/Next (4.1.2).
- Visible focus on all buttons (2.4.7).
- Target size ≥ 24×24 px (2.5.5 / 2.5.8).
- Focus returns to top of grid / first thumbnail after page change (user flow).

**Responsive:**
- Mobile: compact ("← Prev 1 2 [Next →]").
- Desktop: full spread ("← Prev 1 2 3 4 5 [Next →]").
- Wrap gracefully; no horizontal scroll.

**Token usage:** `color.text`, `color.text-muted`, `color.border`, `color.focus-ring`, `color.surface`, `radius.md`, `space.*`, `font.caption`, `font.button`, `zIndex.base`.

---

## 8. FilterPill

**Purpose:** Category filter buttons (Mountains / Forests / Water / Skies / All). Progressive enhancement; works without JS; URL updates to `/gallery/[category]`.

**Used in:** Gallery, Category.

**Anatomy / slots:**
- `group` — container `role="group"`, `aria-label="Filter by category"`.
- `pill` — `<button>` per category, `aria-pressed`.

**Variants:** `all` (default active), category names.

**States:**
- `default` — text `text-muted`, border `border`, bg transparent.
- `hover` — text `text`, border `border-focus`.
- `focus` — focus ring `focus-ring`, `radius.full`.
- `active` (pressed) — `aria-pressed="true"`, bg `surface`, text `text`, border `border-focus`.
- `disabled` — n/a.

**Accessibility:**
- Pills as native `<button>` with `aria-pressed` (4.1.2, 1.3.1).
- Group `role="group"`, `aria-label="Filter by category"` (1.3.1).
- Active pill reflected in URL; screen-reader announcement of filter change (4.1.3 / live region optional).
- Visible focus (2.4.7).
- Target size ≥ 24×24 px (2.5.5 / 2.5.8).
- No color alone for active state (combines bg + border + text).

**Responsive:**
- Mobile: pills wrap, 2 rows (wireframe: [Mountains][Forests] / [Water][Skies][All]).
- Desktop: single row.
- Gap `space.2` between pills.

**Token usage:** `color.border`, `color.border-focus`, `color.text`, `color.text-muted`, `color.surface`, `color.focus-ring`, `radius.full`, `space.*`, `font.label`.

---

## 9. Breadcrumb

**Purpose:** Location indicator: Home > Gallery [> Category > Photo]. `aria-label="Breadcrumb"`.

**Used in:** Gallery, Category, Photo detail, (not Home/Contact/404).

**Anatomy / slots:**
- `container` — `<nav aria-label="Breadcrumb">`.
- `items` — links separated by `>` (or chevron).
- `current` — final item, `aria-current="page"`, not a link.

**Variants:** none.

**States:** `default` only (static navigation). Last item `aria-current="page"`.

**Accessibility:**
- `aria-label="Breadcrumb"` (2.4.8).
- Reflects current category/photo (wireframe WCAG).
- Links keyboard-operable, visible focus (2.4.7).
- Current page non-link with `aria-current="page"` (4.1.2).

**Responsive:**
- Mobile: wraps, shorter labels if needed (wireframe shows stacked breadcrumb).
- Desktop: single line.
- No horizontal scroll (1.4.10).

**Token usage:** `color.text-muted`, `color.text`, `color.border`, `space.*`, `font.caption`, `font.label`.

---

## 10. EmptyState

**Purpose:** Shown when gallery has no photos or a category has no photos. Heading + link(s).

**Used in:** Gallery (empty), Category (empty).

**Anatomy / slots:**
- `heading` — H2/H3 message ("The gallery is empty. Check back soon." / "No photos in this category yet.").
- `links` — one or two links/buttons ("Return home →", "Clear filter →").

**Variants:** `gallery` (one link), `category` (two links).

**States:** `default` only.

**Accessibility:**
- Empty state announced to screen readers (live region or focus management) (4.1.3).
- Heading semantic (1.3.1, 2.4.6).
- Links purpose clear (2.4.4), visible focus (2.4.7).
- Contrast ≥ 4.5:1 message text on `bg` (1.4.3).

**Responsive:**
- Centered, max width `layout.contentMaxWidth`.
- Mobile: stacked links; desktop: inline links for category variant.

**Token usage:** `color.text`, `color.text-muted`, `type.h3`, `type.body`, `space.*`, `layout.contentMaxWidth`.

---

## 11. LightboxControls

**Purpose:** Close ×, Prev ←, Next → on photo detail page. Escape also closes. Focus returns to triggering thumbnail on close.

**Used in:** Photo detail (/photo/[slug]).

**Anatomy / slots:**
- `close` — button "Close ×".
- `prev` — button "← Previous" (`aria-disabled` on first).
- `next` — button "Next →" (`aria-disabled` on last).
- `container` — positioned above image (desktop) / stacked above image (mobile).

**Variants:** none.

**States:**
- `default` — text `text`, bg transparent, visible hover ring.
- `hover` — text `text`, bg `surface-hover`.
- `focus` — focus ring `focus-ring`, `radius.sm` (2.4.7).
- `active` — scale 0.98.
- `disabled` — Prev on first / Next on last: `aria-disabled="true"`, opacity 0.4, `pointer-events: none`.

**Accessibility:**
- Native `<button>` elements (4.1.2, 2.1.1).
- Close + Escape to close (2.1.1).
- `aria-disabled="true"` on bounded Prev/Next (4.1.2).
- Visible focus (2.4.7).
- Focus returns to triggering thumbnail on close (2.4.3, US-04 AC).
- Target size ≥ 24×24 px (2.5.5 / 2.5.8).
- Swipe (if added) must not be the only navigation — buttons always present (2.5.1).
- No color alone for disabled (opacity + aria-disabled + pointer-events).

**Responsive:**
- Desktop: controls in one row above image.
- Mobile (`< lg`): Close on top row, Prev/Next stacked or row below (wireframe: Close × above, [← Prev][Next →] row).
- Swipe optional; never motion-only.

**Token usage:** `color.text`, `color.surface-hover`, `color.focus-ring`, `color.border`, `radius.sm`, `space.*`, `font.button`, `shadow.md`, `zIndex.lightbox`, `transition.fast`.

---

## 12. Caption

**Purpose:** Photo title as H2, associated with the image.

**Used in:** Photo detail.

**Anatomy / slots:**
- `heading` — `<h2>` caption text.

**Variants:** none.

**States:** `default` only.

**Accessibility:**
- Caption as H2 associated with image (1.3.1, 2.4.6).
- Contrast ≥ 4.5:1 (1.4.3).

**Responsive:**
- Desktop: below image, left-aligned or centered.
- Mobile: full width, centered, scales down.

**Token usage:** `color.text`, `type.h2`, `space.*`.

---

## 13. PhotoMetadata

**Purpose:** Location + date labels/values below caption.

**Used in:** Photo detail.

**Anatomy / slots:**
- `item` — label + value pairs (Location:, Date:).
- `separator` — optional.

**Variants:** none.

**States:** `default` only. Omitted entirely if metadata absent (wireframe: no empty placeholder).

**Accessibility:**
- Metadata as list or labeled plain text (1.3.1).
- Labels `text-muted`, values `text`; contrast ≥ 4.5:1 for values.
- No color alone for label vs value (use labels textually).

**Responsive:**
- Desktop: inline row "Location: … | Date: …".
- Mobile: stacked lines.

**Token usage:** `color.text`, `color.text-muted`, `type.caption`, `type.label`, `space.*`.

---

## 14. ShareButton (deferred / Could)

**Purpose:** Share option for current photo (US-08, deferred to V1+).

**Used in:** Photo detail (deferred).

**Anatomy / slots:**
- `button` — `<button>` "Share →".

**States:**
- `default`, `hover`, `focus` (focus ring `focus-ring`), `active`, `disabled`.

**Accessibility:**
- Native button, visible focus (2.4.7).
- Target size ≥ 24×24 px.
- Label clear (2.4.4).

**Token usage:** `color.text`, `color.border`, `color.focus-ring`, `radius.md`, `space.*`, `font.button`.

---

## 15. Form

**Purpose:** Contact form wrapper (Name, Email, Message, Submit). Primary conversion (US-06).

**Used in:** Contact (/contact).

**Anatomy / slots:**
- `container` — `<form>`.
- `fields` — FormField entries (Name, Email, Message).
- `submit` — Button (submit variant).
- `formError` — form-level ErrorMessage (service failure).
- `honeypot` — HoneypotField (hidden, V1).

**Variants:** none.

**States:**
- `default` — empty form.
- `submitting` — submit button `loading` state, `aria-busy="true"`.
- `success` — form replaced by SuccessMessage (wireframe: success message + "Return to gallery" link).
- `error` — form-level ErrorMessage displayed, field data retained.

**Accessibility:**
- Logical tab order: Name → Email → Message → Submit (FR-014).
- Form fields each with visible `<label>` via `for`/`id` (1.3.1, 3.3.2).
- Form-level error announced (4.1.3).
- No visitor email addresses in client source (NFR-006 — server-side send).
- Honeypot hidden from AT (`aria-hidden`, `tabindex="-1`) (V1).

**Responsive:**
- Mobile: single column, full-width inputs.
- Desktop: single column, constrained width (`layout.contentMaxWidth`).

**Token usage:** `color.bg`, `color.border`, `color.error`, `color.focus-ring`, `space.*`, `radius.md`, `layout.contentMaxWidth`, `shadow.sm`.

---

## 16. FormField

**Purpose:** Label + input/textarea + inline error + optional assistive text.

**Used in:** Form (Name, Email, Message).

**Anatomy / slots:**
- `label` — `<label for="...">` visible, required indicator.
- `control` — `<input>` or `<textarea>`.
- `error` — ErrorMessage (`aria-describedby` on control).
- `assistive` — optional hint text.

**Variants:** `text`, `email`, `textarea`.

**States:**
- `default` — border `border`, text `text`, label `text-muted`.
- `focus` — border `border-focus`, focus ring `focus-ring`, `radius.md` (2.4.7).
- `error` — border `error`, text `error`, ErrorMessage shown inline, `aria-invalid="true"`.
- `disabled` — opacity 0.4, `pointer-events: none`, border `border`.
- `empty` — initial state (no styling change).
- `loading` — n/a on field.

**Accessibility:**
- Visible `<label>` associated via `for`/`id` (1.3.1, 3.3.2).
- Email: `type="email"` native validation (3.3.2).
- Required: `required` attribute (3.3.2).
- Inline error associated via `aria-describedby` → error id (4.1.2, 3.3.1).
- Error identifies field and describes fix (3.3.1, 3.3.3): "Name is required", "Please enter a valid email address", "Message is required".
- Focus moves to first invalid field on submit (2.4.3, 3.3.3).
- Contrast ≥ 4.5:1 labels, inputs, errors (1.4.3).
- `aria-invalid="true"` on invalid field (4.1.2).

**Responsive:**
- Label above input; input/textarea full width.
- Mobile: full viewport width minus padding.
- Reflow at 320px (1.4.10).

**Token usage:** `color.border`, `color.border-focus`, `color.error`, `color.text`, `color.text-muted`, `color.focus-ring`, `radius.md`, `space.*`, `type.label`, `type.caption`, `type.body`, `transition.fast`.

---

## 17. Input

**Purpose:** Text / email single-line input.

**Used in:** FormField (Name, Email).

**Anatomy / slots:**
- `control` — `<input type="text|email">`.
- `innerText` — entered value.

**Variants:** `text`, `email`.

**States:** (same as FormField control) `default`, `focus`, `error`, `disabled`, `empty`.

**Accessibility:**
- Native input semantics; `type="email"` for email (3.3.2).
- `required` where applicable (3.3.2).
- Visible focus ring (2.4.7).
- Target size: input height ≥ 44 px on touch (use min height `space.10` = 40px? need ≥44 → set min height 2.75rem/44px). Let me specify min height 44px.
- Contrast ≥ 4.5:1 text on input bg `bg` (1.4.3).

**Responsive:**
- Full width; height ≥ 44 px touch target.
- Font size 16px on mobile to prevent iOS zoom (base `type.body`).

**Token usage:** `color.bg`, `color.border`, `color.border-focus`, `color.error`, `color.text`, `color.focus-ring`, `radius.md`, `space.*`, `type.body`, `transition.fast`.

---

## 18. Textarea

**Purpose:** Multi-line Message field.

**Used in:** FormField (Message).

**Anatomy / slots:**
- `control` — `<textarea>`.
- `innerText` — entered value.

**Variants:** none.

**States:** `default`, `focus`, `error`, `disabled`, `empty`.

**Accessibility:**
- Native textarea; `required` (3.3.2).
- Visible focus ring (2.4.7).
- Target size ≥ 44 px touch (height ≥ 44 px, min rows).
- Contrast ≥ 4.5:1 (1.4.3).

**Responsive:**
- Full width; min height ~3 rows; resize vertical only or none.
- Mobile: full width.

**Token usage:** `color.bg`, `color.border`, `color.border-focus`, `color.error`, `color.text`, `color.focus-ring`, `radius.md`, `space.*`, `type.body`, `transition.fast`.

---

## 19. ErrorMessage

**Purpose:** Inline validation error text associated with a field via `aria-describedby`; form-level error for service failure.

**Used in:** FormField, Form.

**Anatomy / slots:**
- `text` — error message string.
- `icon` — optional (not required; no color alone).

**Variants:** `inline` (field), `form-level` (service failure).

**States:** `default` (hidden), `visible` (shown).

**Accessibility:**
- Associated via `aria-describedby` on control (4.1.2, 3.3.1).
- Message identifies field + describes fix (3.3.1, 3.3.3).
- Form-level error announced (4.1.3).
- Color `error` used only as state indicator; message text carries meaning (no color alone).
- Contrast ≥ 4.5:1 (1.4.3).

**Responsive:**
- Full width below control; wraps.
- Mobile: full width.

**Token usage:** `color.error`, `type.caption`, `space.*`.

---

## 20. SuccessMessage

**Purpose:** Shown on successful form submission, replaces form (wireframe: "✓ Thanks — your message has been sent." + "Return to gallery →").

**Used in:** Contact success state.

**Anatomy / slots:**
- `icon` — check mark (decorative, `aria-hidden`).
- `heading` — success message.
- `body` — optional follow-up line.
- `cta` — Button "Return to gallery →".

**Variants:** none.

**States:** `visible` (replaces form).

**Accessibility:**
- Announced to screen readers (`aria-live="polite"` or focus moved to message) (4.1.3).
- Focus moved to success message or CTA.
- Link purpose clear ("Return to gallery") (2.4.4).
- Contrast ≥ 4.5:1 (1.4.3).
- Form fields cleared on success.

**Responsive:**
- Centered, max width `layout.contentMaxWidth`.
- CTA full width on mobile.

**Token usage:** `color.text`, `color.success`, `color.text-muted`, `type.h2`, `type.body`, `space.*`, `layout.contentMaxWidth`.

---

## 21. HoneypotField (V1)

**Purpose:** Hidden spam-protection input. Not visible to users or assistive tech.

**Used in:** Contact form (NFR-005, V1).

**Anatomy / slots:**
- `control` — `<input type="text">` hidden.

**States:** `hidden` (always).

**Accessibility:**
- `aria-hidden="true"`, `tabindex="-1"` (hidden from AT) (4.1.2).
- Label hidden visually and from AT if present.

**Token usage:** n/a (not rendered visually).

---

## 22. Footer

**Purpose:** Site-wide footer: nav links + photographer credit/copyright.

**Used in:** all 7 wireframes.

**Anatomy / slots:**
- `nav` — links: Home, Gallery, About, Contact.
- `credit` — photographer name + copyright line.

**Variants:** none.

**States:** `default` only.

**Accessibility:**
- `<footer>` landmark.
- Links keyboard-operable, visible focus (2.4.7).
- Link purpose clear (2.4.4).
- Contrast ≥ 4.5:1 (1.4.3).

**Responsive:**
- Desktop: links row + credit inline.
- Mobile (`< lg`): stacked, links full width or stacked.
- Hamburger drawer shares same links (no duplication of function).

**Token usage:** `color.bg`, `color.text`, `color.text-muted`, `color.border`, `space.*`, `radius.md`, `type.caption`, `font.caption`, `layout.footerHeight`.

---

## 23. Portrait

**Purpose:** Photographer portrait image with descriptive alt text on About page.

**Used in:** About.

**Anatomy / slots:**
- `image` — `` with descriptive alt ("Portrait of …").
- `wrapper` — aspect-ratio container.

**Variants:** none.

**States:**
- `default` — image displays.
- `error` — placeholder block with alt text (graceful degradation).

**Accessibility:**
- Descriptive `alt` (1.1.1).
- Contrast n/a (image); wrapper border `border` optional.

**Responsive:**
- Desktop: side-by-side with biography.
- Mobile: stacked, full width or constrained (wireframe: portrait full-width or constrained).
- `loading="lazy"`.

**Token usage:** `color.bg`, `color.surface`, `radius.md`, `shadow.sm`, `space.*`.

---

## 24. Biography

**Purpose:** Photographer biography rich text on About page.

**Used in:** About.

**Anatomy / slots:**
- `paragraphs` — `<p>` semantic paragraphs.

**Variants:** none.

**States:** `default` only.

**Accessibility:**
- Semantic paragraphs (1.3.1).
- Contrast ≥ 4.5:1 body text (1.4.3).
- Measure 45–75 chars (`type.body.measure`) for readability.

**Responsive:**
- Desktop: max width `layout.contentMaxWidth`, next to portrait.
- Mobile: stacked below portrait, full width.

**Token usage:** `color.text`, `type.body`, `space.*`, `layout.contentMaxWidth`.

---

## 25. ErrorPage

**Purpose:** 404 page: H1 + message + recovery links (Return home / Go to gallery).

**Used in:** 404 (/404).

**Anatomy / slots:**
- `heading` — H1 "Page not found".
- `message` — short plain-language message ("The page you're looking for doesn't exist.").
- `links` — two recovery links.

**Variants:** none.

**States:** `default` only.

**Accessibility:**
- H1 heading (1.3.1, 2.4.6).
- Message clear, no jargon (3.3.1 spirit).
- Links purpose clear (2.4.4), visible focus (2.4.7).
- Target size ≥ 24×24 px (2.5.5 / 2.5.8).
- Contrast ≥ 4.5:1 (1.4.3).
- Keyboard operability (2.1.1).

**Responsive:**
- Single column, centered.
- Mobile: links stacked/full width.
- Reflow at 320px (1.4.10).

**Token usage:** `color.text`, `color.text-muted`, `type.h1`, `type.body`, `space.*`, `layout.contentMaxWidth`.

---

## Cross-cutting rules

- **Tokens only:** All spacing, color, typography, radius, shadow, z-index, and transition values must reference `design/design-tokens.json`. No hardcoded hex/px/rem values in components.
- **Focus visible:** Every interactive element shows a `focus-ring` outline on keyboard focus (WCAG 2.4.7).
- **No color alone:** State (error, active, disabled, pressed) is always conveyed by color + another channel (border, opacity, text, `aria-*`).
- **Target size:** ≥ 24×24 px minimum; ≥ 44×44 px preferred on touch (WCAG 2.5.5 / 2.5.8).
- **Contrast:** Body text ≥ 4.5:1 against `bg`/`surface`; large text and UI borders ≥ 3:1 (WCAG 1.4.3 / 1.4.11). Verified pairs: `text`/`text-muted` on `bg` ≈ 19:1 / 7.8:1; `border` on `bg` ≈ 3.1:1.
- **Responsive:** Mobile-first breakpoints `sm`/`md`/`lg`/`xl`; no horizontal scroll at 320px; tap targets ≥ 44 px; relative units (`rem`, `%`, `ch`) preferred over fixed px.
