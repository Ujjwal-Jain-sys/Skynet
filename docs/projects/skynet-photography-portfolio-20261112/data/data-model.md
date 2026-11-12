---
owner: database-architect
phase: database
status: review
updated: 2026-11-12T00:00:00Z
---

# Data Model — skynet-photography-portfolio-20261112

Entity-relationship model for a landscape & nature photography portfolio site with a contact form.
Built from `requirements.md`, `user-stories.md`, `mvp-scope.md`, and `assumptions.md`.

## Domain scope (in scope)

| Entity | Traces to | Purpose |
|--------|-----------|---------|
| `galleries` | FR-015, US-07 | Photo categories (e.g. Mountains, Forests, Water, Skies). Category filtering is post-MVP (should), but the entity is modeled now so the schema is ready for V1. |
| `photos` | FR-002..FR-005, FR-016, US-02..US-04 | The portfolio photos: metadata, image/thumbnail storage URLs, caption, location, date taken, publish flag, sort order. |
| `contact_inquiries` | FR-008..FR-014, US-06, NFR-005, NFR-006 | Contact-form submissions: name, email, message, honeypot spam field, lifecycle status. |

## Out of scope (explicitly excluded)

- No e-commerce tables (no orders, products, print sales, checkout).
- No user-account tables (no users, authentication, registration, profiles, roles).
- No CMS tables (photos are managed by the development team, not uploaded via admin UI).
- No comments, likes, or social-login tables.

## Entity: galleries

Photo categories/galleries. One gallery contains many photos.

| Attribute | Type | Nullable | Key/Constraint | Notes |
|-----------|------|----------|----------------|-------|
| `id` | uuid | NO | PK (surrogate) | Public-facing id; `gen_random_uuid()`. Never expose sequential ids. |
| `name` | text | NO | UNIQUE | Human-readable category name, e.g. "Mountains". |
| `slug` | text | NO | UNIQUE | URL-friendly key for category links. |
| `description` | text | YES | — | Optional category description. |
| `created_at` | timestamptz | NO | DEFAULT `now()` | Row creation time. |
| `updated_at` | timestamptz | NO | DEFAULT `now()` | Row last-update time (DB trigger maintains it). |

## Entity: photos

The portfolio photos. Each photo belongs to at most one gallery.

| Attribute | Type | Nullable | Key/Constraint | Notes |
|-----------|------|----------|----------------|-------|
| `id` | uuid | NO | PK (surrogate) | Public-facing id; `gen_random_uuid()`. |
| `gallery_id` | uuid | YES | FK → `galleries(id)` | Nullable: photos may be uncategorized (category filtering is post-MVP). `ON DELETE SET NULL` so deleting a gallery never deletes photos. |
| `title` | text | NO | — | Photo title. |
| `slug` | text | NO | UNIQUE | URL key for `/photo/[slug]`. |
| `caption` | text | YES | — | Photo caption shown on detail page (FR-016). |
| `location` | text | YES | — | Location metadata (FR-016). |
| `date_taken` | timestamptz | YES | — | Date the photo was taken (FR-016). |
| `image_url` | text | NO | — | Full-size image storage path/URL (served optimized per breakpoint, NFR-004). |
| `thumbnail_url` | text | NO | — | Thumbnail storage path/URL for the grid (lazy-loaded, FR-006). |
| `width` | integer | YES | — | Image width in pixels (responsive serving). |
| `height` | integer | YES | — | Image height in pixels (responsive serving). |
| `is_published` | boolean | NO | DEFAULT `true` | Whether the photo appears in the public gallery. |
| `sort_order` | integer | NO | DEFAULT `0` | Display ordering within a gallery. |
| `created_at` | timestamptz | NO | DEFAULT `now()` | Row creation time. |
| `updated_at` | timestamptz | NO | DEFAULT `now()` | Row last-update time (DB trigger maintains it). |

## Entity: contact_inquiries

Contact-form submissions. Standalone entity (no relationships).

| Attribute | Type | Nullable | Key/Constraint | Notes |
|-----------|------|----------|----------------|-------|
| `id` | uuid | NO | PK (surrogate) | Public-facing id; `gen_random_uuid()`. |
| `name` | text | NO | — | Visitor's name (validated present, FR-009). |
| `email` | text | NO | — | Visitor's email (validated syntactically, FR-010). Never exposed in client-side source (NFR-006); handled server-side only. |
| `message` | text | NO | — | Inquiry message (validated present, FR-009). |
| `honeypot` | text | YES | — | Spam-protection honeypot field (NFR-005). Left empty by humans; filled by bots. |
| `status` | text | NO | DEFAULT `'new'` | CHECK constraint: `new`, `read`, `replied`, `archived`. Inquiry lifecycle managed by the photographer. |
| `created_at` | timestamptz | NO | DEFAULT `now()` | Submission time. |
| `updated_at` | timestamptz | NO | DEFAULT `now()` | Row last-update time (DB trigger maintains it). |

## Relationships & cardinality

```mermaid
erDiagram
    GALLERIES ||--o{ PHOTOS : "contains"
    PHOTOS }o--|| GALLERIES : "belongs to (at most one)"
    CONTACT_INQUIRIES : standalone (no relationships)
```

- `galleries` 1:N `photos` — one gallery contains many photos; each photo belongs to zero or one gallery.
- `contact_inquiries` has no relationships to other entities.

## Keys

- Surrogate `uuid` primary keys on all tables (public-facing; never sequential ids).
- Natural/business keys: `galleries.slug` (unique), `photos.slug` (unique). These are the lookup keys used by Next.js routes (`/gallery/[slug]`, `/photo/[slug]`).
- `contact_inquiries.email` is intentionally NOT unique — a visitor may submit multiple inquiries.

## Constraints & integrity (enforced in the database)

- `NOT NULL` on every required attribute; no nullable column without a documented reason.
- `UNIQUE` on `galleries.slug`, `galleries.name`, `photos.slug`.
- `CHECK` on `contact_inquiries.status` ∈ {`new`, `read`, `replied`, `archived`}.
- `FOREIGN KEY` `photos.gallery_id → galleries.id` with `ON DELETE SET NULL`.
- `DEFAULT now()` on all `created_at` / `updated_at` columns.
- `timestamptz` used for all time values (no `timestamp without time zone`).

## Indexes (for known query patterns)

- `photos(gallery_id)` — category filtering / gallery scoped listings (FR-015, US-07).
- `photos(is_published, sort_order)` — published gallery listing ordered for display.
- `photos(created_at DESC)` — pagination by recency (US-02).
- `contact_inquiries(created_at DESC)` — newest inquiries first (photographer inbox).
- `contact_inquiries(status)` — filter inquiries by lifecycle status.
- Unique constraints on slugs/name automatically backed by unique indexes.

## Assumptions & open questions

- Launch gallery is < 50 photos; pagination-ready (≤ 24 per page, FR-002) but schema scales beyond that.
- Exact category names/counts deferred to ux-architect; schema supports adding categories via INSERT only.
- Exact spam-protection provider (turnstile vs reCAPTCHA vs honeypot) open; `honeypot` column covers the baseline honeypot approach.
- Photos are managed by the dev team (seed data via migrations/scripts), so no admin/upload tables are modeled.
- `updated_at` is maintained by a database trigger (`set_updated_at`) so it stays correct regardless of which service writes the row.

## Normalization

The model is in 3NF: every non-key attribute depends on the key, the whole key, and nothing but the key. No transitive dependencies. No many-to-many relationships exist in MVP, so no join tables are required.
