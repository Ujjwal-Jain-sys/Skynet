---
name: Cloud Deployment
description: Deploy the app and generated sites reliably
---

# Cloud Deployment

Owned by `devops`. Default: Vercel for the app, subdomains for generated sites.

## Environments

- **Preview** — per pull request.
- **Staging** — pre-production mirror.
- **Production** — live.

## Workflow

1. Configure the platform project and environment variables per environment.
2. Connect the repository for automatic deploys.
3. Set up domains and TLS for the app and generated-site wildcard.
4. Verify a deploy with a smoke test.
5. Document the deploy and rollback procedure.

## Rules

- Never deploy straight to production without passing the deploy gate.
- Environment variables are set per environment, never committed.
- Every deploy is reversible within minutes.
- Monitor after deploy (see `monitoring-logging`).

## Generated sites

- Build each user site into a static/SSR output.
- Serve under `https://<site-id>.skynet.app`.
- Isolate build output per project.
