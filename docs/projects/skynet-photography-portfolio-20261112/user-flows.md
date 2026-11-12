---
owner: ux-architect
phase: ux
status: review
updated: 2026-11-12T17:00:00Z
---

# User Flows — skynet-photography-portfolio-20261112

Happy-path flows, decision branches, and error/empty states for every Must user
story. Primary conversion action (per mvp-scope.md / business-plan.md): contact
form submission on /contact (name, email, message → owner email notification).

Conventions: screens/states only (no visuals). `→` = navigation/action. `[...]` = decision branch. Error/empty states flagged.

---

## Flow 1 — View home page (US-01, Must)

Entry → Home page (/) renders hero + value proposition + CTA to gallery
→ Visitor activates gallery CTA (click or keyboard Enter/Space)
→ Gallery overview (/gallery) loads, focus moves to first thumbnail
Goal: visitor enters the gallery.

Decision branches:
- Visitor does not engage CTA → may scroll to featured photo / intro, or navigate to About/Contact via header.

Accessibility note: CTA button reachable by keyboard, visible focus indicator (NFR-001).

---

## Flow 2 — Browse paginated thumbnail grid (US-02, Must)

Entry → Gallery overview (/gallery) loads
→ Thumbnail grid renders (≤24 photos initial page), images lazy-load as they approach viewport
→ [More photos exist?] Yes → pagination control present (prev/next/page numbers)
→ Visitor activates pagination → page N loads, focus returns to top of grid or first thumbnail
→ Visitor clicks/activates a thumbnail → Flow 3 (photo detail)

Decision branches:
- [Category filters applied?] (US-07, Should — V1) → grid updates to show only photos in selected category; URL updates to /gallery/[category]; clearing filter returns to all photos.
- [No photos in category / empty page] → empty state: message "No photos in this category yet" with link to clear filter / return to gallery.

Error/empty states:
- Empty gallery (no photos): message "The gallery is empty. Check back soon." with CTA to home.
- Image fails to load: placeholder block with alt text, graceful degradation.
- Pagination out of range: clamp to last valid page, no error page.

Accessibility note: grid operable by keyboard (Tab into thumbnails, Enter/Space to open); focus visible (FR-013, NFR-001).

---

## Flow 3 — Open photo in detail / lightbox view (US-03, Must)

Entry → Gallery overview (/gallery) or category gallery (/gallery/[category])
→ Visitor clicks or keyboard-activates a photo thumbnail
→ Photo detail page (/photo/[slug]) loads
→ Photo displays enlarged in lightbox-style view
→ Caption and location/date metadata visible (if present)
Goal: visitor views the photo in detail.

Decision branches:
- [Metadata absent] → caption/metadata block omitted; no empty placeholder.
- [Share control present?] (US-08, Could — deferred) → share action offered for current photo.

Accessibility note: thumbnail activation keyboard-operable; photo detail has semantic heading, alt text on image (FR-013, NFR-001).

---

## Flow 4 — Navigate photos within lightbox (US-04, Must)

Entry → Photo detail page (/photo/[slug]) in lightbox view
→ Visitor activates Next control → next photo in sequence displays
→ Visitor activates Previous control → previous photo in sequence displays
→ Visitor activates Close control (or presses Escape) → lightbox closes, focus returns to triggering thumbnail on gallery overview
Goal: visitor browses adjacent photos and returns to gallery.

Decision branches:
- [First photo] → Previous control disabled/hidden.
- [Last photo] → Next control disabled/hidden.

Error/empty states:
- Next/Prev target fails to load: retain current photo, show inline message "Unable to load next photo."

Accessibility note: Next/Prev/Close keyboard-operable, visible focus, Escape closes (FR-005, FR-013, NFR-001). Focus returns to triggering thumbnail on close (US-04 AC).

---

## Flow 5 — Read photographer's about page (US-05, Must)

Entry → Visitor navigates to /about (header nav link)
→ About page loads: biography text + portrait image
→ Visitor activates contact CTA (optional) → Flow 6
Goal: visitor learns who created the work.

Accessibility note: portrait image has alt text; biography uses semantic headings; keyboard operable (NFR-001, NFR-002).

---

## Flow 6 — Submit contact form inquiry (US-06, Must) — PRIMARY CONVERSION

Entry → Contact page (/contact) loads
→ Contact form present: Name, Email, Message fields, each with associated label; submit button
→ Visitor completes fields (keyboard or mouse)
→ Visitor activates Submit
→ [Validation passes?] No → inline validation error on offending field(s), focus moves to first invalid field, form not submitted
  - Name empty → error "Name is required"
  - Email missing or syntactically invalid → error "Please enter a valid email address"
  - Message empty → error "Message is required"
→ [Validation passes?] Yes → form submits
  - [Email service succeeds?] → success message displayed, form fields cleared, owner email notification sent with form data
  - [Email service fails?] → inline error message "Unable to send your message. Please try again.", form data retained for retry
Goal: visitor submits inquiry; owner receives email notification.

Decision branches:
- Visitor tabs through form → focus moves Name → Email → Message → Submit in logical order; each field, validation message, and submit button keyboard-operable.
- Spam protection (NFR-005, Should — V1): honeypot/turnstile check runs on submit; flagged submissions blocked before email notification.

Error/empty states:
- Empty form submit → inline errors on all required fields.
- Invalid email → inline error on email field.
- Service failure → inline error, data retained.
- Success → success message replaces form (or appears above it), fields cleared.

Accessibility note: form fully keyboard-operable; visible focus; error messages associated with fields via aria-describedb / native validation; success message announced to screen readers (FR-014, NFR-001). No visitor email addresses exposed in client-side source (NFR-006). Flag email handling + spam protection for Security Auditor review.

---

## Flow 7 — Recover from 404 (not a user story, required page)

Entry → Visitor reaches /404 (mistyped URL or broken link)
→ Error message displayed: "Page not found"
→ Links: Return home (/), Go to gallery (/gallery)
Goal: visitor recovers to a working page within 1 click.

---

## Flow summary table

| Flow | Story | Priority | Entry | Goal | Error/empty states |
|------|-------|----------|-------|------|-------------------|
| 1 | US-01 | Must | / | Enter gallery | — |
| 2 | US-02 | Must | /gallery | Browse photos | empty gallery, image load fail, pagination range |
| 3 | US-03 | Must | /gallery or /gallery/[cat] | View photo detail | missing metadata |
| 4 | US-04 | Must | /photo/[slug] | Browse next/prev, close | first/last photo bounds, load fail |
| 5 | US-05 | Must | /about | Read biography | — |
| 6 | US-06 | Must | /contact | Submit inquiry | validation errors, service failure, success |
| 7 | — | Required | /404 | Recover to home/gallery | — |

## Security flags (for security-auditor)

- Flow 6 sends form data (name, email, message) to owner email (FR-011). No payments involved. Flag contact-form email handling and spam protection.
- NFR-006: visitor email addresses must not be exposed in client-side source.

## Handoffs

- Primary conversion action → UI Design: contact form on /contact with validation, success/error states.
- Refined sitemap → UI Design and SEO Specialist.
