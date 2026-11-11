---
name: Data Modeling
description: Turn requirements into an entity-relationship model
---

# Data Modeling

Owned by `database-architect`. Output: `docs/projects/<id>/data/data-model.md`.

## Workflow

1. Extract entities from user stories (nouns that persist).
2. Define attributes and their types.
3. Define relationships and cardinality (1:1, 1:N, N:M).
4. Identify natural vs surrogate keys.
5. Note constraints, uniqueness, and lifecycle (soft delete?).

## Output

- An entity list with attributes.
- An ER description (text or mermaid).
- A list of assumptions and open questions.

## Rules

- Model the domain, not the UI.
- Every entity traces to a requirement.
- Resolve many-to-many with join tables.
- Keep it normalized to 3NF unless a measured reason exists otherwise.
