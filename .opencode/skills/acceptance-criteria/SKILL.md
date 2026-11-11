---
name: Acceptance Criteria
description: Write testable Given/When/Then acceptance criteria for every user story
---

# Acceptance Criteria

Every user story must have acceptance criteria that `qa-tester` can execute.

## Format

```
Given <context>
When <action>
Then <observable outcome>
```

## Guidelines

- Cover the happy path first, then edge cases and errors.
- Make outcomes observable (visible text, HTTP status, redirect, DB row).
- One behavior per scenario; avoid "and" chains where possible.
- Include accessibility and performance where relevant.

## Example

```
Given a visitor on /contact
When they submit the form with a valid email and message
Then a success message appears and the message is stored

Given the same form
When the email is invalid
Then an inline validation error appears and no request is sent
```

## Rules

- No criteria, no story — send it back to `requirements-analysis`.
- Criteria are the contract QA tests against.
