---
name: Monitoring and Logging
description: Observe the system in production and catch problems early
---

# Monitoring and Logging

Owned by `devops`. Uses `mcp-sentry` for error tracking.

## What to monitor

- **Availability** — uptime and health checks.
- **Errors** — exceptions and 5xx rates.
- **Latency** — p50/p95/p99 response times.
- **Saturation** — CPU, memory, DB connections.
- **Business** — signups, builds completed, deploys.

## Logging

- Structured (JSON), with a correlation id per request.
- Levels: error, warn, info, debug.
- Never log secrets, tokens, or full PII.

## Workflow

1. Instrument the app with error tracking and metrics.
2. Define alerts with thresholds and owners.
3. Verify signals after each deploy.
4. Feed real errors back to `qa-tester` and `backend`.

## Rules

- No alert without an action.
- Redact sensitive data before logging.
- Keep logs queryable and retained per policy.
