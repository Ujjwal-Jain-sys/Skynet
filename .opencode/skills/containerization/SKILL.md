---
name: Containerization
description: Package services reproducibly with containers
---

# Containerization

Owned by `devops`.

## Rules

- Multi-stage builds: build stage + slim runtime stage.
- Pin base image versions; avoid `latest`.
- Run as a non-root user.
- Keep images small; copy only what is needed.
- Use `.dockerignore` to exclude secrets and junk.

## Workflow

1. Write a Dockerfile per deployable service.
2. Build and run locally; verify parity with CI.
3. Scan the image for vulnerabilities (see `dependency-scanning`).
4. Tag images with the commit SHA, not just `latest`.

## Rules

- No secrets baked into images; inject at runtime via env.
- Healthcheck endpoint for every long-running service.
- Document exposed ports and required env vars.
