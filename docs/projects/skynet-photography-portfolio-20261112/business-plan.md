---
owner: product-strategist
phase: product
status: review
updated: 2026-11-12T16:00:00Z
---
# Business Plan — skynet-photography-portfolio-20261112

One-page Business Model Canvas for a landscape & nature photography portfolio site (showcase only; contact form for inquiries; no checkout). Every block ties to requirements.md / user-stories.md.

## 1. Customer segments
- Primary: the photographer (site owner) — needs a professional showcase that converts visitor interest into inquiries via the contact form (commissions / print sales handled offline).
- Secondary (visitors): art buyers & collectors, photo editors, casual browsers of landscape & nature photography.
(Source: requirements.md Audience; user-stories backbone Home → Gallery → Photo detail → About → Contact.)

## 2. Value proposition
- A dark-minimal gallery that lets visitors browse landscape & nature photography quickly (lazy-loaded, paginated, lightbox detail views with caption/metadata) and convert interest into a direct inquiry via a simple contact form.
- Showcase only: no e-commerce distractions; the site's job is to present the work and generate leads.
(Ties to FR-001…FR-016, NFR-001…NFR-004.)

## 3. Channels
- Organic search (SEO on gallery/photo pages), social media links from the photographer's profiles, direct URL, word of mouth.
- Home page hero CTA → gallery overview (FR-001).
- Photo detail pages are linkable; share action deferred (FR-017, Could).

## 4. Customer relationships
- Self-service browsing; no accounts, no login (constraint).
- Relationship starts when a visitor submits the contact form; owner replies by email offline.
- No CMS in MVP; photos managed by the development team (constraint).

## 5. Revenue streams (business model)
- Primary model: lead generation — the contact form is the monetization mechanism. Inquiries convert to offline photography commissions / print sales; no money changes hands on the site.
- No e-commerce, no subscriptions, no advertising in MVP (constraint).
- Future options (not MVP): print-inquiry leads, downloadable high-res lead capture, affiliate print-lab referrals.

## 6. Key resources
- Curated landscape & nature photo collection (~<50 photos at launch, pagination-ready, scalable).
- Next.js (App Router) + TypeScript + Tailwind site, dark-minimal gallery design.
- Contact form + email notification to the site owner.
- Hosting on default platform free tier (Vercel or Render); default subdomain at launch.

## 7. Key activities
- Photo curation and optimization (sizing, formats, lazy loading per NFR-004).
- Gallery maintenance (pagination, category metadata).
- Responding to contact-form inquiries.
- SEO and performance upkeep (LCP targets NFR-003).

## 8. Key partners
- Hosting platform (default deploy target; custom domain later).
- Email service / serverless form handler for owner notifications.
- Domain registrar (future custom domain).

## 9. Cost structure
- Development time (one-time build).
- Hosting: free tier acceptable at launch.
- Domain: deferred to post-MVP.
- Email service: free/low tier at launch.

## Competitive positioning (summary)
- Direct competitors: photographer portfolio builders (Squarespace, Format, Pixpa, Wix Photography) and generic gallery tools.
- Differentiation: custom dark-minimal gallery, no platform transaction fees, no e-commerce bloat, fast LCP (<2.5s desktop / <3s mobile), lead-generation-only model.
- Gap to exploit: most portfolio builders bundle e-commerce and subscriptions; this site is lighter, faster, and inquiry-focused.
- Aspirational references: single-photographer portfolio sites with strong editorial dark galleries.

## Assumptions needing validation
- Launch photo count (~<50) — confirm with data model / database-architect.
- Exact category list (mountains, forests, water, skies) — deferred to ux-architect.
- Spam protection provider (honeypot vs turnstile vs reCAPTCHA) — open question in requirements.md.
- Deploy domain (default subdomain now; custom domain later).

## Handoffs
- Primary conversion action → UX Architect: contact form submission on /contact (name, email, message → owner email notification).
- Keyword/intent mapping → SEO Specialist: landscape/nature photography portfolio queries, print-inquiry intent, photographer brand terms.
