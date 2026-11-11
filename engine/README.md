# Skynet — Website Builder Engine

The orchestration service that powers Skynet: a multi-agent system that lets
non-technical users build and deploy websites by describing them in plain language.

## Purpose

The `engine/` package is the backend orchestration service. It:

1. Receives a user's plain-language brief
2. Decomposes it into department workstreams (requirements → product → UX → UI → frontend/backend → content → QA/security/SEO → deploy)
3. Delegates each workstream to a Skynet department subagent via OpenCode
4. Collects artifacts from `docs/projects/<project-id>/`
5. Runs quality gates before each phase advance
6. Hands approved work to DevOps for deployment

## Layout

```
engine/
├─ src/
│  ├─ orchestrator.ts   # master orchestration loop
│  ├─ delegator.ts      # department delegation + handoff briefs
│  ├─ gatekeeper.ts     # quality-gate checks per phase
│  ├─ project-store.ts  # read/write project artifacts
│  └─ server.ts         # HTTP API entry point
├─ tests/               # unit + integration tests
└─ package.json
```

## Tech stack

- Node.js + TypeScript (strict)
- OpenCode V2 subagents for department execution
- Express/Fastify HTTP API
- Validation via Zod

## Getting started

```bash
cd engine
npm install
npm run dev
```

The engine exposes a REST API at `http://localhost:3001`:

- `POST /projects` — create a project from a brief
- `GET /projects/:id/status` — project status
- `POST /projects/:id/delegate/:department` — delegate a workstream
- `GET /projects/:id/artifacts` — list collected artifacts
- `POST /projects/:id/deploy` — deploy (after deploy gate passes)

## Security

No secrets in source. All configuration via environment variables:
`DATABASE_URL`, `OPENAI_API_KEY`, `SKYNET_SECRET`, etc.
See `.env.example` at the project root.
