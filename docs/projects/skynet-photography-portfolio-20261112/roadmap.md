---
owner: product-strategist
phase: product
status: review
updated: 2026-11-12T16:00:00Z
---
# Roadmap — skynet-photography-portfolio-20261112

Sequence: MVP → V1 → Later. MVP is shippable on its own; no phase depends on a later phase.

## Phase 0 — MVP (now)

**Scope:** All Must items from mvp-scope.md: home hero + CTA; paginated lazy-loaded thumbnail gallery; photo detail lightbox with next/prev/close; about page; contact form with validation, owner email notification, and success/error states; all Must NFRs (WCAG 2.2 AA, responsive, LCP targets, optimized images).

**Exit criteria:**
- US-01…US-06 acceptance criteria all pass.
- LCP <2.5s desktop / <3s mobile on the home page.
- WCAG 2.2 AA keyboard operability on gallery navigation and contact form.
- Contact form submits successfully and the owner receives an email notification.
- Site deployed on the default subdomain and publicly reachable.

**Risks / unknowns:** exact photo count and categories; spam-protection provider decision.

## Phase 1 — V1 (polish + discovery)

**Scope:** US-07 category filtering (FR-015); caption / location / date metadata polish (FR-016); contact-form spam protection (NFR-005, honeypot + turnstile/reCAPTCHA); NFR-006 (no visitor emails in client-side source); SEO foundation (page titles, meta descriptions, sitemap.xml, structured data); basic analytics capturing contact-form submissions.

**Exit criteria:**
- Category filters update the grid and clear correctly.
- Spam protection active on the contact form.
- SEO metadata and sitemap on all public pages.
- Analytics records the primary conversion action (contact-form submission).

## Phase 2 — Later (growth)

**Scope:** US-08 photo share action (FR-017); print-inquiry lead capture; blog/journal section; custom domain with SSL; email newsletter signup; performance monitoring.

**Exit criteria:**
- Share control works on photo detail pages.
- Custom domain live with SSL.
- Optional revenue experiments validated (checkout remains out of scope unless explicitly re-scoped).

## Handoffs
- Primary conversion action → UX Architect: contact form submission on /contact.
- Keyword/intent mapping → SEO Specialist: feeds Phase 1 SEO foundation.
