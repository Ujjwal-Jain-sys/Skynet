---
name: Accessibility WCAG
description: Ensure the site meets WCAG 2.2 AA for inclusive use
---

# Accessibility WCAG

Owned by `ux-architect`, verified by `qa-tester` and `security-auditor`.

## Checklist (WCAG 2.2 AA essentials)

- **Perceivable** — text alternatives for images; contrast ≥ 4.5:1 (3:1 for large
  text); captions for media; content reflows at 320px.
- **Operable** — full keyboard access; visible focus; no keyboard traps; target size
  ≥ 24×24px; no motion-only interactions.
- **Understandable** — clear labels; consistent navigation; helpful error messages;
  no unexpected context changes.
- **Robust** — semantic HTML; ARIA only when needed; works with assistive tech.

## Workflow

1. Annotate wireframes with accessibility requirements.
2. Specify focus order and landmarks.
3. QA runs automated (axe) plus manual keyboard and screen-reader checks.

## Rules

- Accessibility is a requirement, not a nice-to-have.
- Prefer native elements over ARIA.
- Record violations in `reports/qa.md` with severity.
