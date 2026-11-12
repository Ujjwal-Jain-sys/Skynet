# 🚀 Skynet

> Build and deploy a website just by describing it — no coding required.

Skynet is a team of AI agents that takes your plain-language idea and turns it into a live, production-ready website. You say what you want, and the agents handle everything: research, planning, design, content, code, testing, security, SEO, and deployment.

No coding. No design tools. No server setup.

---

## ✨ What Skynet does for you

| You do this | Skynet's agents do the rest |
|-------------|----------------------------|
| Describe your site in plain words ("a bakery website with online ordering") | Research, plan, design, build, test, secure, and deploy |
| Review a preview and ask for changes | Rewrite content, adjust layouts, fix bugs |
| Click "Launch" | Deploy to a real web address with SSL |

---

## 🧠 How it works

Skynet is an **orchestrated multi-agent system**. When you submit a brief, a master agent breaks it into workstreams and hands each one to a specialist department:

1. **You share your idea** — type a short description of the website you want.
2. **Requirements & strategy** — the project is analyzed, scoped, and planned.
3. **Design & UX** — user flows, wireframes, and visual design are created.
4. **Build** — frontend and backend code is written, content is authored, and the database is modeled.
5. **Quality gates** — QA, security, and SEO specialists review and approve the work.
6. **Deploy** — once all gates pass, your site goes live.

Each department hands off to the next like a well-organized team, and nothing is considered done until it passes review.

---

## 🛠️ Tech stack

### Platform
- **OpenCode V2** — AI agent orchestration framework
- **Node.js 20+** — runtime for engine and web

### Backend (engine/)
- **TypeScript** (strict)
- **Express** — HTTP API
- **Zod** — runtime validation
- **Vitest** — testing
- **ESLint** — linting
- **tsx** — TypeScript execution

### Frontend (web/)
- **Next.js 14** (App Router, React 18)
- **Tailwind CSS** — styling
- **Clerk** — authentication
- **Neon (serverless Postgres)** — database
- **Resend** — email
- **Lucide React** — icons

### Infrastructure & Deployment
- **Vercel** — frontend hosting
- **Render** — engine API hosting
- **Terraform / Ansible** — infrastructure as code (`infra/`)
- **GitHub Actions** — CI/CD

### AI & Tooling
- **MCP servers**: Context7 (docs), Playwright (browser automation), Postgres (database), Sentry (error tracking)
- **OpenCode plugins**: orchestrator, task-tracker, notifier, guardrails
- **Skills**: 78+ agent skills for design, motion, 3D, GSAP, SEO, and more

---

## 📁 Project structure

```
Skynet/
├─ README.md              # this file
├─ AGENTS.md              # how the AI agent team works together
├─ skynet.json            # OpenCode project config
├─ opencode.jsonc         # OpenCode models, permissions, MCP, plugins
├─ .env.example           # copy to .env and fill in your values
├─ engine/                # orchestration backend (Node/TS/Express)
├─ web/                   # user-facing UI (Next.js + Tailwind)
├─ templates/             # ready-made website designs
├─ infra/                 # Terraform + Ansible IaC
├─ .opencode/             # OpenCode agents, commands, plugins
├─ .agents/               # project-local Lean 10 skills
└─ docs/projects/         # per-project artifacts (briefs, designs, reports)
```

---

## 🚀 Quick start

### 1. Clone the repo

```bash
git clone git@github.com:Ujjwal-Jain-sys/Skynet.git
cd Skynet
```

### 2. Install Node.js (LTS)

Skynet requires **Node.js 20 or higher**. If you don't have it:

```bash
# Using nvm (recommended)
nvm install 20
nvm use 20

# Or on Fedora
sudo dnf install nodejs npm
```

Verify:

```bash
node --version   # v20.x.x or higher
npm --version
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Then edit `.env` and add your values:

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/skynet

# AI / MCP keys (get these from the respective providers)
CONTEXT7_API_KEY=your_context7_api_key
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Skynet
SKYNET_SECRET=generate_a_random_string_here
NODE_ENV=development
```

> ⚠️ Never commit real secrets. `.env` is gitignored — only `.env.example` is tracked.

### 4. Start the engine (backend)

```bash
cd engine
npm install
npm run dev
```

The engine API runs at `http://localhost:3001`.

### 5. Start the web UI (frontend)

In a new terminal:

```bash
cd web
npm install
npm run dev
```

The UI runs at `http://localhost:3000`.

### 6. Build a website

Open the UI at `http://localhost:3000`, describe the website you want, and watch Skynet's agents build it.

Or use the OpenCode commands directly:

```bash
# Tell Skynet what kind of website you want
/skynet-build "a portfolio site for my photography with a contact form"

# Check on progress
/skynet-status

# Launch when everything is ready
/skynet-deploy
```

---

## 📦 Available commands

| Command | What it does |
|---------|-------------|
| `/skynet-build` | Start a new website project from a brief |
| `/skynet-status` | Check project progress and status |
| `/skynet-deploy` | Deploy an approved project to production |

---

## 🤝 How to contribute

We welcome contributions from everyone — whether you're fixing a typo, adding a feature, or improving documentation.

### 1. Fork and clone

```bash
git clone git@github.com:Ujjwal-Jain-sys/Skynet.git
cd Skynet
git checkout -b your-feature-name
```

### 2. Make your changes

- Follow the existing code style in each package
- Run `npm run lint` and `npm run typecheck` in `engine/` and `web/`
- Add or update tests where applicable
- Keep secrets out of commits (use `.env.example`, not `.env`)

### 3. Commit and push

```bash
git add .
git commit -m "feat: your descriptive message"
git push origin your-feature-name
```

### 4. Open a Pull Request

Open a PR against `main` and describe what you changed and why. A maintainer will review it with you.

### Ways to help

- 🐛 **Bug reports** — open an issue with steps to reproduce
- 📖 **Documentation** — improve this README, agent docs, or guides
- 🎨 **Design** — refine templates, wireframes, or design tokens
- 🔧 **Code** — fix issues in `engine/`, `web/`, or OpenCode plugins
- 🧪 **Testing** — add unit, integration, or E2E tests
- 🚀 **Deployment** — improve CI/CD, Terraform, or Ansible configs

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 💬 Need help?

- Open an [issue](https://github.com/Ujjwal-Jain-sys/Skynet/issues) for bugs or feature requests
- Start a [discussion](https://github.com/Ujjwal-Jain-sys/Skynet/discussions) for questions
- Check `AGENTS.md` for how the agent orchestration protocol works

---

> **Built with OpenCode** · Maintained by the Skynet team · 🚀 Describe it. Build it. Launch it.