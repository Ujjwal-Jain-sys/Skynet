# Delegation Brief — requirements-analysis

**Project id:** no-code-website-builder
**Department:** requirements-analysis
**Objective:** Turn the user's plain-language brief into testable requirements, prioritized user stories with acceptance criteria, and an initial sitemap.

## Context
- Brief: `docs/projects/no-code-website-builder/brief.md`
- Assumptions/decisions: `docs/projects/no-code-website-builder/assumptions.md`
- Architecture reference: `/home/Ujjwal/Projects/OpenCode/Skynet/` (this repo — the Skynet agent orchestration protocol itself is the model for how agents collaborate on this site)

## Inputs
- brief.md (verbatim user brief)
- assumptions.md (brand, hosting, auth, theme, MVP scope, audience)

## Constraints
- Target audience: vibe-coders, newbie-tech students, non-technical people
- Core promise: build websites without writing a single line of code
- Look: human-made, not AI-generated; avoid templated defaults
- Themes: light / dark / default (system theme)
- MVP scope: landing page first (market the builder); full builder tool post-MVP
- Auth: yes (sign up / log in, save and return to projects)
- Hosting: publish & host on platform with custom domains
- Stack reference: this repo uses Next.js + TypeScript + Tailwind (see AGENTS.md / opencode.jsonc)

## Deliverables (exact paths)
- `docs/projects/no-code-website-builder/requirements.md` — testable requirements
- `docs/projects/no-code-website-builder/user-stories.md` — prioritized user stories with acceptance criteria
- `docs/projects/no-code-website-builder/sitemap.md` — initial page inventory & hierarchy

## Acceptance criteria (quality gate)
- Requirements are testable
- Every user story has acceptance criteria (Given/When/Then)
- Sitemap covers every requirement
- Output written to the exact paths above; no placeholder/TBD sections

## Dependencies
- Must exist first: brief.md, assumptions.md ✓ (both exist)
- This unblocks: capability review → product-strategist

Launch as agent id `requirements-analysis`.
