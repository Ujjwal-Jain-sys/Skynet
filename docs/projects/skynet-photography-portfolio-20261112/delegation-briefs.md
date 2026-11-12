# Delegation Briefs — skynet-photography-portfolio-20261112

Prepared by skynet-master. Ready to delegate once the subagent depth limit is resolved.
Each brief follows the `task-delegation` skill template.

---

## 1. requirements-analysis

**Objective** — Produce testable requirements, prioritized user stories with acceptance criteria, and an initial sitemap for a landscape & nature photography portfolio site with a contact form.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts:
- docs/projects/skynet-photography-portfolio-20261112/brief.md
- docs/projects/skynet-photography-portfolio-20261112/assumptions.md

**Inputs** — brief.md (verbatim), assumptions.md (clarified answers)

**Constraints** — Stack: Next.js (App Router) + TypeScript + Tailwind CSS. Showcase only — no e-commerce, no user accounts, no checkout. One persistent contact form. Responsive, mobile-first. Keyboard-accessible gallery and contact form.

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/requirements.md
- docs/projects/skynet-photography-portfolio-20261112/user-stories.md
- docs/projects/skynet-photography-portfolio-20261112/sitemap.md

All with YAML frontmatter: owner: requirements-analysis, phase: requirements, status: review, updated: <ISO date>.

**Acceptance criteria** — Requirements are testable. Every user story has Given/When/Then acceptance criteria. Sitemap lists: home, gallery overview, individual gallery, photo detail, about, contact. Contact form requirements include fields, validation, submission. Image/gallery requirements cover lazy loading, thumbnail grid, lightbox view. Out-of-scope explicitly listed (e-commerce, user accounts, CMS, WebGL canvas).

**Dependencies** — Inputs exist. Unblocks: product-strategist.

---

## 2. product-strategist

**Objective** — Convert requirements into a business plan, explicit MVP scope, monetization strategy, and roadmap.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts:
- requirements.md, user-stories.md, sitemap.md

**Inputs** — requirements.md, user-stories.md, sitemap.md, assumptions.md

**Constraints** — Showcase-only MVP (no e-commerce). Landscape & nature photography niche. Contact form for inquiries. Default deploy target.

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/business-plan.md
- docs/projects/skynet-photography-portfolio-20261112/mvp-scope.md
- docs/projects/skynet-photography-portfolio-20261112/roadmap.md

Frontmatter: owner: product-strategist, phase: product, status: review.

**Acceptance criteria** — MVP scope is explicit; out-of-scope is listed. Roadmap sequences phases from MVP to future releases. Business model documented.

**Dependencies** — Requires requirements.md, user-stories.md, sitemap.md. Unblocks: ux-architect.

---

## 3. ux-architect

**Objective** — Design user experience: user flows, refined sitemap, wireframes, WCAG notes.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts:
- requirements.md, user-stories.md, sitemap.md, business-plan.md, mvp-scope.md

**Inputs** — requirements.md, user-stories.md, sitemap.md (initial), business-plan.md, mvp-scope.md

**Constraints** — WCAG 2.2 AA considerations. Dark minimal gallery suits landscape photography. One persistent contact form. Responsive across mobile/tablet/desktop.

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/sitemap.md (refined)
- docs/projects/skynet-photography-portfolio-20261112/user-flows.md
- docs/projects/skynet-photography-portfolio-20261112/design/wireframes/

Frontmatter: owner: ux-architect, phase: ux, status: review.

**Acceptance criteria** — Sitemap + flows cover every requirement. WCAG notes included. Wireframes for every page in sitemap.

**Dependencies** — Requires product-strategist outputs. Unblocks: ui-design.

---

## 4. ui-design

**Objective** — Create visual design: design tokens, component specs matched to brand and audience.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts:
- user-flows.md, wireframes/, sitemap.md (refined)

**Inputs** — user-flows.md, design/wireframes/, sitemap.md, assumptions.md (visual style: designer's choice, dark minimal)

**Constraints** — Dark minimal gallery aesthetic. Design tokens as machine-readable JSON. Component specs match wireframes. Accessible color palette and type scale.

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/design/design-tokens.json
- docs/projects/skynet-photography-portfolio-20261112/design/component-specs.md

Frontmatter: owner: ui-design, phase: ui, status: review.

**Acceptance criteria** — Design tokens defined. Component specs match wireframes. Color/typography accessible.

**Dependencies** — Requires ux-architect outputs. Unblocks: ui-design (self), frontend, content-writer.

---

## 5. database-architect (parallel with backend)

**Objective** — Design & structure the database: data model, schema, migrations.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts:
- requirements.md, user-stories.md, assumptions.md

**Inputs** — requirements.md, user-stories.md

**Constraints** — Showcase-only data model: photos, galleries, contact inquiries. No e-commerce tables. No user accounts. Normalized schema. Reversible migrations.

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/data/data-model.md
- docs/projects/skynet-photography-portfolio-20261112/data/schema.sql

Frontmatter: owner: database-architect, phase: database, status: review.

**Acceptance criteria** — Schema is normalized. Migrations are reversible. Photo/gallery/contact-inquiry entities defined.

**Dependencies** — Requires requirements.md. Unblocks: backend.

---

## 6. backend (parallel with database-architect after UI settled)

**Objective** — Implement backend: API design, auth (none needed for showcase), business logic, error handling, contact form submission.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts:
- data/schema.sql, data/data-model.md, requirements.md

**Inputs** — schema.sql, data-model.md, requirements.md

**Constraints** — Next.js App Router API routes. Contact form submission endpoint. Input validation and sanitization. Error handling. No auth required for showcase. Spam protection on contact form.

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/code/ (backend portion)

Frontmatter per file: owner: backend, phase: backend, status: review.

**Acceptance criteria** — APIs match the contract. Errors handled consistently. Contact form submission works. Input validated at every boundary.

**Dependencies** — Requires database-architect outputs. Unblocks: frontend.

---

## 7. frontend

**Objective** — Frontend implementation: Next.js App Router, TypeScript, Tailwind components, responsive layout, image gallery, contact form.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts:
- design/design-tokens.json, design/component-specs.md, backend API contract

**Inputs** — design-tokens.json, component-specs.md, backend API contract, schema.sql

**Constraints** — Matches design tokens. Responsive (mobile/tablet/desktop). No console errors. Optimized images with lazy loading. Lightbox view for photos. Contact form integrated with backend API.

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/code/ (frontend portion)

Frontmatter per file: owner: frontend, phase: frontend, status: review.

**Acceptance criteria** — Matches design tokens. Responsive across breakpoints. No console errors. Image gallery with lazy loading and lightbox. Contact form functional.

**Dependencies** — Requires backend + ui-design outputs. Unblocks: content-writer, qa-tester.

---

## 8. content-writer

**Objective** — Generate website content: brand voice, page copy, UX writing.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts:
- design/design-tokens.json, design/component-specs.md, user-flows.md, assumptions.md

**Inputs** — design-tokens.json, component-specs.md, user-flows.md, assumptions.md

**Constraints** — Landscape & nature photography brand voice. No placeholder text. Copy matches brand voice. Contact form UX copy (labels, errors, success states).

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/content/brand-voice.md
- docs/projects/skynet-photography-portfolio-20261112/content/pages/

Frontmatter: owner: content-writer, phase: content, status: review.

**Acceptance criteria** — Copy matches brand voice. No placeholder text. All pages have copy. UX writing for forms, buttons, errors, empty states.

**Dependencies** — Requires ui-design outputs. Unblocks: qa-tester, seo-specialist.

---

## 9. qa-tester (parallel with security & SEO)

**Objective** — Test robust functioning: test planning, unit/integration/e2e tests, bug reporting.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts:
- All artifacts from requirements through content, code/

**Inputs** — All project artifacts, code/

**Constraints** — Test plan executed. No open P0/P1 bugs. Contact form submission tested. Gallery navigation tested. Responsive breakpoints tested. Keyboard navigation tested.

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/reports/qa.md

Frontmatter: owner: qa-tester, phase: qa, status: review.

**Acceptance criteria** — Test plan executed. No open P0/P1 bugs. All critical user flows pass.

**Dependencies** — Requires frontend + content-writer outputs. Unblocks: deploy gate (with security + seo).

---

## 10. security-auditor (parallel with QA & SEO)

**Objective** — Security checks: OWASP Top 10, dependency scanning, secrets management, input validation, auth hardening.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts:
- code/, schema.sql, all artifacts

**Inputs** — code/, schema.sql, requirements.md

**Constraints** — No high/critical findings. Secrets out of source. Input validation at every boundary. Contact form protected against spam/XSS/CSRF.

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/reports/security.md

Frontmatter: owner: security-auditor, phase: security, status: review.

**Acceptance criteria** — No high/critical findings. Secrets out of source. OWASP Top 10 checked.

**Dependencies** — Requires code/ and schema.sql. Unblocks: deploy gate (with QA + SEO).

---

## 11. seo-specialist (parallel with QA & security)

**Objective** — Website ranking and SEO: keywords, on-page, technical SEO, structured data, Core Web Vitals.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts:
- content/pages/, sitemap.md, all artifacts

**Inputs** — content/pages/, sitemap.md, design-tokens.json

**Constraints** — Landscape & nature photography keywords. Metadata on all pages. Structured data (schema.org). Core Web Vitals targets (LCP ~2.5s desktop / ~3s mobile). Technical SEO: crawlable, indexable, fast.

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/reports/seo.md

Frontmatter: owner: seo-specialist, phase: seo, status: review.

**Acceptance criteria** — Metadata, structured data, and Core Web Vitals targets met. Site crawlable and indexable.

**Dependencies** — Requires content-writer outputs. Unblocks: deploy gate (with QA + security).

---

## 12. project-manager

**Objective** — Track progress, update status.md, log risks and blockers, report status.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts: all project artifacts.

**Inputs** — All department artifacts and status updates.

**Constraints** — status.md current. Risks and blockers logged. No open P0 blockers for deploy.

**Deliverable** —
- docs/projects/skynet-photography-portfolio-20261112/status.md (updated)

Frontmatter: owner: project-manager, phase: project-management, status: review.

**Acceptance criteria** — status.md current. Risks and blockers logged. No open P0 blockers.

**Dependencies** — Requires all department outputs. Unblocks: devops.

---

## 13. devops (deploy gate)

**Objective** — Deployment and infrastructure: build, deploy, CI/CD, monitoring.

**Context** — Project id: skynet-photography-portfolio-20261112. Upstream artifacts: all approved artifacts.

**Inputs** — All approved artifacts, code/, reports/qa.md, reports/security.md, reports/seo.md

**Constraints** — Deploy gate: qa.md, security.md, seo.md all `approved`. status.md shows no open P0 blockers. Build + deploy reproducible. Monitoring wired.

**Deliverable** — Deployed website at default target (Vercel/Render).

**Acceptance criteria** — Build + deploy reproducible. Monitoring wired. Site live and accessible.

**Dependencies** — Requires all departments approved. Deploy gate: QA + security + SEO all approved, no P0 blockers.

---

## Deploy Gate Checklist

- [ ] qa.md status: approved
- [ ] security.md status: approved
- [ ] seo.md status: approved
- [ ] status.md: no open P0 blockers
- [ ] All department artifacts frontmatter status: approved
