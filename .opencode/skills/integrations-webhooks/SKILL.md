---
name: Integrations and Webhooks
description: Connect to third-party services and handle inbound webhooks safely
---

# Integrations and Webhooks

Owned by `backend`.

## Outbound integrations

- Wrap each third party in an adapter behind an interface.
- Store credentials in environment variables (`{env:NAME}`).
- Set timeouts and bounded retries with backoff.
- Handle partial failure gracefully; never block the request path on a slow vendor.

## Inbound webhooks

1. Verify the signature/secret before trusting the payload.
2. Make handlers idempotent (dedupe by event id).
3. Respond quickly (2xx) and process heavy work asynchronously.
4. Log event ids, not payload secrets.

## Rules

- Never hardcode keys or tokens.
- Every integration documents its failure modes.
- Test webhook handling with replayed and duplicate events.
