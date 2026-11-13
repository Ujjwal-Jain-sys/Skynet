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
<img src="https://img.shields.io/badge/OpenCode_V2-1A1A1A?style=for-the-badge" alt="OpenCode V2" height="28" />
<img src="https://img.shields.io/badge/Node.js_20+-339933?style=for-the-badge&logo=nodedotjson&logoColor=white" alt="Node.js 20+" height="28" />

- **OpenCode V2** — Agent orchestration framework. It runs the master + 15 department subagents that decompose your brief into workstreams, delegate them, and monitor quality gates.
- **Node.js 20+** — Runtime for both the engine backend and the web UI. Chosen for its mature TypeScript ecosystem, fast startup, and wide hosting support (Vercel, Render, etc.).

### Backend (`engine/`)
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" height="28" />
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" height="28" />
<img src="https://img.shields.io/badge/Zod-3E68B6?style=for-the-badge" alt="Zod" height="28" />
<img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" height="28" />
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" height="28" />
<img src="https://img.shields.io/badge/tsx-1F2937?style=for-the-badge" alt="tsx" height="28" />

- **TypeScript** — Type-safe backend code. Prevents runtime bugs when passing project artifacts between departments and makes the orchestration logic easier to refactor.
- **Express** — Lightweight HTTP API for the engine. Simple, well-documented, and easy to deploy on Render or any Node host.
- **Zod** — Runtime validation for project briefs, delegation payloads, and API requests. Catches malformed input before it reaches the agents.
- **Vitest** — Unit and integration tests for the engine. Fast, TypeScript-native, and matches the tooling used across the repo.
- **ESLint** — Linting to keep backend code consistent across contributors.
- **tsx** — TypeScript execution for development (`tsx watch`) without a separate compile step.

### Frontend (`web/`)
<img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 14" height="28" />
<img src="https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" height="28" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" height="28" />
<img src="https://img.shields.io/badge/Better_Auth-000000?style=for-the-badge&logo=auth0&logoColor=white" alt="Better Auth" height="28" />
<img src="https://img.shields.io/badge/Neon-08B26D?style=for-the-badge&logo=neon&logoColor=white" alt="Neon Postgres" height="28" />
<img src="https://img.shields.io/badge/Resend-FF4B37?style=for-the-badge" alt="Resend" height="28" />
<img src="https://img.shields.io/badge/Lucide_React-000000?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide React" height="28" />

- **Next.js 14 (App Router)** — The user-facing UI. Server components keep the initial page load fast, and the App Router gives us clean routes for projects, previews, and API endpoints.
- **React 18** — Component framework for the UI. Concurrent features keep the interface responsive while agents work in the background.
- **Tailwind CSS** — Utility-first styling. Lets us build a clean, non-technical-user-friendly interface quickly without managing a separate CSS file per component.
- **Better Auth** — Authentication. Self-hosted on Neon Postgres; handles sign-in, sessions, MFA, password reset, and user management. No external account verification needed.
- **Neon (serverless Postgres)** — Database for project artifacts, user data, and deployment records. Serverless means it scales to zero and pairs well with Vercel.
- **Resend** — Transactional email for notifications (deploy complete, approval requests, etc.).
- **Lucide React** — Consistent, lightweight icon set for the UI.

### Infrastructure & Deployment
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" height="28" />
<img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" height="28" />
<img src="https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white" alt="Terraform" height="28" />
<img src="https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white" alt="Ansible" height="28" />
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" height="28" />

- **Vercel** — Frontend hosting for `web/`. Zero-config deploys, automatic previews for every PR, and edge delivery for fast page loads.
- **Render** — Engine API hosting for `engine/`. Managed Node hosting with automatic deploys and health checks.
- **Terraform** — Infrastructure as code for cloud resources (databases, networking). Declarative and version-controlled.
- **Ansible** — Configuration management and provisioning for the engine environment.
- **GitHub Actions** — CI/CD pipeline that runs lint, typecheck, and tests on every push and PR.

### AI & Tooling
- **MCP servers**: Context7 (docs lookup), Playwright (browser automation), Postgres (database access), Sentry (error tracking) — give the agents external capabilities without hardcoding integrations.
- **OpenCode plugins**: orchestrator, task-tracker, notifier, guardrails — extend the master agent with delegation, status tracking, notifications, and quality guardrails.
- **Skills**: 78+ agent skills for design, motion, 3D, GSAP, SEO, and more — specialized capabilities that departments load on demand.

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

Skynet requires **Node.js 20 or higher**. Choose your platform below:

<details>
<summary>🪟 Windows</summary>

**Option A: nvm-windows (recommended)**

1. Download and install [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
2. Open PowerShell or Git Bash as Administrator
3. Run:

```powershell
nvm install 20
nvm use 20
nvm alias default 20
```

**Option B: winget**

```powershell
winget install OpenJS.NodeJS
```

> ⚠️ If PowerShell blocks scripts, run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`<br>
> Use Git Bash if you prefer Unix-style commands (`cp`, `cd`, etc.)

</details>

<details>
<summary>🐧 Linux (Fedora, Ubuntu, Debian, etc.)</summary>

**Option A: nvm (recommended — no sudo needed)**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc   # or ~/.zshrc

nvm install 20
nvm use 20
nvm alias default 20
```

**Option B: Distro package manager**

```bash
# Fedora
sudo dnf install nodejs npm

# Ubuntu / Debian
sudo apt update && sudo apt install nodejs npm
```

> ⚠️ Do not use `sudo npm install` — it causes permission issues. nvm installs Node in your home directory.

</details>

<details>
<summary>🍎 macOS</summary>

**Option A: nvm (recommended)**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc   # or ~/.bash_profile

nvm install 20
nvm use 20
nvm alias default 20
```

**Option B: Homebrew**

```bash
brew install node
```

> ⚠️ On Apple Silicon (M1/M2/M3), Node runs natively via ARM64. If you hit native module errors, install Xcode command line tools: `xcode-select --install`

</details>

Verify on any platform:

```bash
node --version   # v20.x.x or higher
npm --version
```

### 3. Set up environment variables

<details>
<summary>🪟 Windows (PowerShell)</summary>

```powershell
Copy-Item .env.example .env
```

Then edit `.env` with Notepad or VS Code and add your values.

</details>

<details>
<summary>🐧 Linux / 🍎 macOS</summary>

```bash
cp .env.example .env
```

Then edit `.env` with your editor (vim, nano, VS Code, etc.) and add your values.

</details>

Edit `.env` and add your values:

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