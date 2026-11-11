---
name: Requirements Elicitation
description: Turn a non-technical user's plain-language idea into a clear, testable requirements document
---

# Requirements Elicitation

Owned by `requirements-analysis`. Output: `docs/projects/<id>/requirements.md`.

## Workflow

1. Read `brief.md` verbatim.
2. Identify gaps and ask at most 5 high-value questions:
   - Who is the site for? (audience)
   - What is the single most important action a visitor should take?
   - What content already exists (text, images, brand)?
   - Any must-have integrations (payments, booking, forms, CMS)?
   - What does success look like?
3. If the user declines to answer, infer sensible defaults and record them in
   `assumptions.md`.
4. Classify every requirement as **functional** or **non-functional**.
5. Assign a priority: `must` / `should` / `could`.

## Output format

```markdown
---
owner: requirements-analysis
phase: requirements
status: draft
updated: <ISO date>
---
# Requirements — <project>

## Audience
## Goals & success metrics
## Functional requirements
- FR1 (must) — ...
## Non-functional requirements
- NFR1 — performance, accessibility, security, SEO
## Constraints
## Open questions
```

## Rules

- Requirements must be testable; if you cannot test it, rewrite it.
- No design or technology choices here — that is other departments' work.
- Every requirement gets an id so downstream artifacts can reference it.
