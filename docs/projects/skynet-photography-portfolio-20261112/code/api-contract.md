# API Contract — Contact Form

Project: skynet-photography-portfolio-20261112
Owner: backend
Phase: backend
Status: review
Updated: 2026-11-12T00:00:00Z

This contract is published before Frontend integrates. It describes the
contact-form endpoint implemented in `code/app/api/contact/route.ts`.

## Base path

All endpoints are under `/api` (Next.js App Router API routes). No `/v1/`
prefix yet; a version bump is required for any breaking change.

---

## POST /api/contact

Submit a contact form inquiry.

**Auth:** None (showcase site; no user accounts, no auth tables/endpoints).

**Rate limiting:** Rate-limited at the service layer:
*   Per-IP: max 5 submissions per minute (sliding window), enforced before
    body parsing so malformed/oversized payloads are rejected without parsing
    untrusted input.
*   Per-email: max 3 submissions per minute (sliding window), enforced after
    validation so a single email cannot flood the form.
*   Limit exceeded returns `429 Too Many Requests` with error code
    `rate_limited` (see `code/lib/rate-limit.ts`, `code/app/api/contact/route.ts`).

**Content-Type:** `application/json`

### Request

| Field     | Type   | Required | Constraints                         | Notes                                  |
|-----------|--------|----------|-------------------------------------|----------------------------------------|
| name      | string | Yes      | 1–100 chars, trimmed                | Visitor's name (FR-009)                |
| email     | string | Yes      | valid email, ≤254 chars, lowercased | Syntactically valid (FR-010)           |
| message   | string | Yes      | 1–5000 chars, trimmed               | Inquiry message (FR-009)               |
| honeypot  | string | No       | must be empty for humans            | Spam protection (NFR-005); filled→bot |

Example:
```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "message": "I love your mountain work. Are you available for commissions?",
  "honeypot": ""
}
```

### Responses

#### 201 Created — inquiry accepted
Body:
```json
{
  "ok": true,
  "message": "Thank you for your message. I'll get back to you soon.",
  "inquiryId": "<uuid>"
}
```
The inquiry is stored in `contact_inquiries` (status `new`) and an owner
notification email is queued (FR-011). A 201 means both persistence and
mail were attempted.

#### 202 Accepted — spam discarded (honeypot)
Body:
```json
{
  "ok": true,
  "message": "Thank you for your message."
}
```
Returned when the honeypot field is non-empty (bot signal). No inquiry is
stored and no mail is sent. The generic success shape avoids tipping off
bots (NFR-005).

#### 400 Bad Request — validation failure
Body (consistent error shape):
```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid contact form submission.",
    "details": [
      { "path": "email", "message": "Please enter a valid email address." }
    ]
  }
}
```
Client should render inline errors and not submit (FR-012).

#### 400 Bad Request — invalid JSON body
Body:
```json
{
  "error": {
    "code": "invalid_input",
    "message": "Request body must be valid JSON."
  }
}
```

#### 429 Too Many Requests — rate limited
Body:
```json
{
  "error": {
    "code": "rate_limited",
    "message": "Too many contact submissions. Please try again later.",
    "correlationId": "<uuid>"
  }
}
```
Returned when the per-IP or per-email rate limit is exceeded. No inquiry is
stored and no mail is sent.

#### 502 Bad Gateway — owner notification failed
Body:
```json
{
  "error": {
    "code": "email_provider_error",
    "message": "Failed to send owner notification."
  }
}
```
Returned only if persistence succeeded but mail could not be sent. The
inquiry is already stored.

#### 500 Internal Server Error — unexpected failure
Body:
```json
{
  "error": {
    "code": "internal_error",
    "message": "An unexpected error occurred. Please try again later."
  }
}
```
No stack traces or internals are leaked to the client. Full detail is in
server logs with the `X-Correlation-Id` value.

### Response header

`X-Correlation-Id: <uuid>` — set on every response for end-to-end tracing.

---

## Data model (source of truth)

`docs/projects/skynet-photography-portfolio-20261112/data/schema.sql`
(migration 003), table `public.contact_inquiries`:

| Column     | Type            | Notes                            |
|------------|-----------------|----------------------------------|
| id         | uuid PK         | gen_random_uuid(); public-facing |
| name       | text NOT NULL   | Visitor's name                   |
| email      | text NOT NULL   | Visitor's email; server-side only (NFR-006) |
| message    | text NOT NULL   | Inquiry message                  |
| honeypot   | text nullable   | Spam-protection field            |
| status     | text NOT NULL   | CHECK: new/read/replied/archived; default 'new' |
| created_at | timestamptz NOT NULL | Submission time             |
| updated_at | timestamptz NOT NULL | DB-maintained via trigger   |

---

## Out of scope

- No auth tables or endpoints (no users, login, registration).
- No e-commerce/checkout/print sales.
- No admin/CMS UI for inquiries (status managed directly in DB by owner).

## Security flags (for Security Auditor review)

- Contact-form email handling (FR-011) — credentials via env vars only.
- Spam protection baseline = honeypot (NFR-005); turnstile/reCAPTCHA deferred.
- Visitor email must never appear in client-side source (NFR-006); handled
  server-side only in `route.ts` → `db.ts` → `email.ts`.
