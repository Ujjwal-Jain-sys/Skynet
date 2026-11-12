---
owner: skynet-master
phase: intake
status: approved
updated: 2026-11-12T15:08:00Z
---

# Assumptions — skynet-photography-portfolio-20261112

These defaults were inferred from the user's clarifying answers. The user did not say "just build it," so all answers were captured explicitly.

## Clarifying answers

| Question | Answer |
|----------|--------|
| Photography niche | Landscape & nature |
| Gallery size at launch | Not sure yet → assume modest, scalable start (~under 50 photos, pagination ready) |
| Sell prints/downloads? | Showcase only — contact form for inquiries, no checkout |
| Visual style | Surprise me / designer's choice → dark minimal gallery (suits landscape photography) |
| Domain & hosting | Not sure → use default deploy target |

## Technical assumptions (inferred by master)

- Stack: Next.js (App Router) + TypeScript + Tailwind CSS (per repo plan)
- One persistent WebGL canvas optional; not required for a photography portfolio
- Responsive: mobile-first, works on tablet and desktop
- Contact form: email notification to owner, spam protection (honeypot + reCAPTCHA or turnstile)
- Image handling: optimized gallery with lazy loading, thumbnail grids, lightbox view
- No e-commerce, no user accounts, no CMS required for MVP
- Deploy target: default platform (Vercel or Render), free tier acceptable
- Domain: to be added later; deploy on a default subdomain for now

## Non-assumptions (deferred to departments)

- Exact color palette & typography → ui-design
- Exact image counts & gallery categories → requirements-analysis / ux-architect
- Contact form fields & validation → requirements-analysis / backend
