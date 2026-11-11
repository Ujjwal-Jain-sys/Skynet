# Skynet Web — Non-Technical User UI

A Next.js (App Router) + Tailwind CSS frontend where non-technical users describe
a website in plain language and watch Skynet's AI agents build and deploy it.

## Purpose

The `web/` package is the user-facing application. It:

1. Provides a simple form for users to enter their website brief
2. Shows real-time project status (plain language, no jargon)
3. Displays preview links and screenshots as agents complete work
4. Lets users approve or request changes before deploy

## Layout

```
web/
├─ src/
│  ├─ app/              # Next.js App Router routes
│  │  ├─ page.tsx       # homepage — brief entry form
│  │  ├─ projects/      # project list + detail views
│  │  └─ api/           # API routes to engine
│  ├─ components/       # reusable UI components
│  └─ lib/              # utilities, API client
├─ public/              # static assets
├─ next.config.js
├─ tailwind.config.js
└─ package.json
```

## Getting started

```bash
cd web
npm install
npm run dev
```

The UI connects to the Skynet engine at `http://localhost:3001` (configured via
`NEXT_PUBLIC_ENGINE_URL`).

## Design principles (for non-technical users)

- Plain language only — no "deploy", "CI/CD", or "artifact" in UI copy
- Show outcomes, not activities ("Your homepage is ready" not "ui-design completed")
- One clear action per screen
- Preview links and screenshots where available
- Decisions offered as simple A vs B choices
