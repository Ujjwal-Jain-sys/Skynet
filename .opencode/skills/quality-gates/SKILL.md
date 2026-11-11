---
name: Quality Gates
description: Definition of done per department and the review loop that must pass before deploy
---

# Quality Gates

No phase advances until its gate passes. Gates are checked by the master, and where
relevant by `qa-tester`, `security-auditor`, and `seo-specialist`.

## Definition of done by department

| Department | Gate |
|-----------|------|
| requirements-analysis | Requirements are testable; every user story has acceptance criteria |
| product-strategist | MVP scope is explicit; out-of-scope is listed |
| ux-architect | Sitemap + flows cover every requirement; WCAG notes included |
| ui-design | Design tokens defined; component specs match wireframes |
| database-architect | Schema is normalized; migrations are reversible |
| backend | APIs match the contract; auth enforced; errors handled |
| frontend | Matches design tokens; responsive; no console errors |
| content-writer | Copy matches brand voice; no placeholder text |
| seo-specialist | Metadata, structured data, and Core Web Vitals targets met |
| qa-tester | Test plan executed; no open P0/P1 bugs |
| security-auditor | No high/critical findings; secrets out of source |
| devops | Build + deploy reproducible; monitoring wired |
| project-manager | `status.md` current; risks and blockers logged |

## Review loop

1. Owner marks artifact `status: review`.
2. Reviewer checks the gate and either approves or returns findings.
3. On rejection, the master re-delegates with specific findings.
4. Maximum 3 rounds, then escalate to the user.

## Deploy gate

Deployment is blocked until `qa.md`, `security.md`, and `seo.md` are all
`approved` and `status.md` shows no open P0 blockers.
