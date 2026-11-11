# Skynet Infrastructure

Infrastructure-as-Code and deployment configuration for the Skynet platform
and the generated websites it deploys.

## Purpose

The `infra/` directory defines:

- The Skynet engine hosting (Vercel / container)
- Generated-site wildcard subdomains (`<site-id>.skynet.app`)
- Databases (Postgres)
- Monitoring (Sentry)
- CI/CD pipelines

## Layout

```
infra/
├─ terraform/           # declarative infrastructure (provider, resources)
├─ ansible/             # configuration management (optional)
└─ README.md
```

## Principles

- Infrastructure is versioned in this repository
- No manual console changes
- No secrets committed — use `{env:VAR}` or platform secret store
- Each environment (dev/staging/prod) has its own values
