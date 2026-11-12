# Assumptions & Decisions — no-code-website-builder

Source: user brief + clarifying-question answers (2026-11-12).

## Captured brief (verbatim)
See `brief.md`.

## Decisions (from clarifying questions)

| Decision | Value |
| --- | --- |
| Brand / site name | Skynet |
| Hosting model | Publish & host on the platform (incl. custom domains) |
| User accounts | Yes — sign up / log in, save and return to projects |
| Visual style / personality | Interactive, award-winning, professional |
| Themes | Light / Dark / Default (system theme) |
| MVP scope | Landing page first (market the builder); full no-code builder tool post-MVP |
| Target audience | Vibe-coders, newbie-tech students, non-technical people |
| Core promise | Build websites without writing a single line of code |
| Architecture reference | /home/Ujjwal/Projects/OpenCode/Skynet/ (this repo — agent orchestration protocol) |
| Human-made, not AI-made | Site should look handcrafted, not templated/AI-generated |
| Use relevant skills / @find-skills | Leverage skills to improve quality and "human" feel |

## Inferred defaults
- Primary page for MVP: landing/home page marketing the no-code builder
- Auth provider: to be determined in capability review (Clerk / Better Auth / etc. candidates)
- Publishing/hosting: Vercel deployment (devops department), custom domains via Vercel Domains
- Theme implementation: CSS variables + next-themes, system-theme default
- No AI-generated copy placeholder; content-writer to produce human-sounding copy

## Open items (capability review)
Database, payments, email, analytics, auth, SEO tooling, and any skills/MCPs/plugins to be confirmed in the Capability Review phase before product-strategist begins.
