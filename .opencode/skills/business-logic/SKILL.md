---
name: Business Logic
description: Implement domain rules cleanly and testably, separate from transport
---

# Business Logic

Owned by `backend`.

## Structure

- **Routes/handlers** — parse input, call services, shape responses. No rules here.
- **Services** — business rules, transactions, orchestration.
- **Data access** — repositories/ORM calls only.

## Workflow

1. Turn each requirement into a service function with a clear contract.
2. Validate input at the boundary.
3. Keep functions pure where possible; isolate side effects.
4. Write unit tests for every rule (see `unit-integration-tests`).

## Rules

- No HTTP or framework types in the domain layer.
- Transactions for multi-step writes.
- Fail with typed, meaningful errors.
- One rule, one place.
