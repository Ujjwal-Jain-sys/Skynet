---
owner: product-strategist
phase: product
status: review
updated: 2026-11-12T16:00:00Z
---
# MVP Scope — skynet-photography-portfolio-20261112

MoSCoW classification of every user story from user-stories.md. The MVP is the set of **Must** stories and nothing else. MVP input (walking skeleton): US-01, US-02, US-03, US-04, US-05, US-06.

## In scope (Must) — ships in the first release

| Item | Story | Traces to requirement | Page(s) | Estimate |
|------|-------|----------------------|---------|----------|
| Home page: hero with value proposition + CTA to gallery | US-01 | FR-001, NFR-001, NFR-002 | / | S |
| Paginated thumbnail grid (≤24 photos/page), lazy loading | US-02 | FR-002, FR-006, NFR-003, NFR-004 | /gallery | M |
| Photo detail page: lightbox-style enlarged view + caption/metadata | US-03 | FR-003, FR-004, FR-016 | /photo/[slug] | M |
| Lightbox next / previous / close + Escape to close | US-04 | FR-005, NFR-001 | /photo/[slug] | S |
| About page: photographer biography + portrait image | US-05 | FR-007, NFR-001, NFR-002 | /about | S |
| Contact form: name, email, message; validation; owner email notification; success/error states | US-06 | FR-008…FR-014, NFR-001, NFR-005 | /contact | M |
| WCAG 2.2 AA on all public pages | — | NFR-001 | All pages | — |
| Responsive, mobile-first (mobile, tablet, desktop) | — | NFR-002 | All pages | — |
| LCP <2.5s desktop / <3s mobile on home page | — | NFR-003 | / | — |
| Optimized, correctly sized gallery images per breakpoint | — | NFR-004 | /gallery, /photo/[slug] | — |

The MVP is shippable on its own: Home → Gallery → Photo detail → About → Contact works end to end with no dependency on any later phase.

## Out of scope (Won't, this time)

- Category filtering on gallery overview (US-07, FR-015) — Should → V1.
- Photo share action (US-08, FR-017) — Could → Later.
- E-commerce / checkout / print purchase flow (requirements.md Out of scope).
- User accounts, authentication, or registration.
- CMS for photo uploads (photos managed by dev team).
- Persistent WebGL / Three.js canvas.
- User comments, likes, or social login.
- Print fulfillment or downloadable high-res files.
- Contact-form spam protection beyond honeypot baseline (NFR-005 is Should → V1).
- Custom domain (default subdomain at launch).

## Security flag
- Contact form sends an email notification to the site owner containing form data (FR-011). No payments are involved in the MVP. Flag contact-form email handling and spam protection for Security Auditor review; visitor email addresses must not be exposed in client-side source (NFR-006).

## Assumptions
- Launch gallery ~<50 photos, pagination ready (assumptions.md).
- Deploy on default platform free tier; custom domain later.
- Exact spam-protection provider and photo categories to be confirmed (open questions in requirements.md).
