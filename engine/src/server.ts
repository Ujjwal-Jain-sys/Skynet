import express from "express"
import cors from "cors"
import { z } from "zod"
import { projectStore, ProjectStatusSchema } from "./project-store.js"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "skynet-engine", timestamp: new Date().toISOString() })
})

// List all projects
app.get("/projects", async (_req, res) => {
  try {
    const ids = await projectStore.listProjects()
    res.json({ projects: ids, count: ids.length })
  } catch (err) {
    res.status(500).json({ error: "Failed to list projects", detail: String(err) })
  }
})

// Create a project from a brief
const CreateProjectSchema = z.object({
  brief: z.string().min(10, "Brief must be at least 10 characters"),
  projectId: z.string().min(1).optional(),
})

app.post("/projects", async (req, res) => {
  try {
    const { brief, projectId } = CreateProjectSchema.parse(req.body)
    const id = projectId || `skynet-${Date.now()}`
    const state = await projectStore.init(id, brief)
    res.status(201).json({
      projectId: id,
      status: state.status,
      currentPhase: state.currentPhase,
      createdAt: state.createdAt,
      message: "Project created. Use /skynet-build to start orchestration.",
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid request", issues: err.issues })
    } else {
      res.status(409).json({ error: String(err) })
    }
  }
})

// Get project status
app.get("/projects/:id/status", async (req, res) => {
  try {
    const state = await projectStore.getState(req.params.id)
    if (!state) {
      res.status(404).json({ error: "Project not found" })
      return
    }
    res.json({
      projectId: state.id,
      status: state.status,
      currentPhase: state.currentPhase,
      completedPhases: state.completedPhases,
      artifactCount: state.artifacts.length,
      updatedAt: state.updatedAt,
    })
  } catch (err) {
    res.status(500).json({ error: "Failed to get status", detail: String(err) })
  }
})

// List artifacts for a project
app.get("/projects/:id/artifacts", async (req, res) => {
  try {
    const artifacts = await projectStore.listArtifacts(req.params.id)
    res.json({ projectId: req.params.id, artifacts })
  } catch (err) {
    res.status(500).json({ error: "Failed to list artifacts", detail: String(err) })
  }
})

// Delegate a workstream to a department
const DelegateSchema = z.object({
  department: z.string().min(1),
  brief: z.string().min(1),
})

app.post("/projects/:id/delegate/:department", async (req, res) => {
  try {
    const { department } = req.params
    const { brief } = DelegateSchema.parse(req.body)
    const state = await projectStore.getState(req.params.id)
    if (!state) {
      res.status(404).json({ error: "Project not found" })
      return
    }

    await projectStore.addArtifact(req.params.id, {
      path: `delegations/${department}.md`,
      owner: "skynet-master",
      phase: state.currentPhase,
      status: "review",
      updated: new Date().toISOString(),
    })

    res.json({
      projectId: req.params.id,
      department,
      status: "delegated",
      message: `Delegated ${department} workstream. Launch via OpenCode subagent.`,
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid request", issues: err.issues })
    } else {
      res.status(500).json({ error: "Delegation failed", detail: String(err) })
    }
  }
})

// Deploy gate check
app.get("/projects/:id/deploy-gate", async (req, res) => {
  try {
    const state = await projectStore.getState(req.params.id)
    if (!state) {
      res.status(404).json({ error: "Project not found" })
      return
    }

    const artifacts = await projectStore.listArtifacts(req.params.id)
    const qa = artifacts.find((a) => a.path.includes("reports/qa.md"))
    const security = artifacts.find((a) => a.path.includes("reports/security.md"))
    const seo = artifacts.find((a) => a.path.includes("reports/seo.md"))

    const gates = {
      qa: qa?.status ?? "missing",
      security: security?.status ?? "missing",
      seo: seo?.status ?? "missing",
      p0Blockers: "none", // would be checked against status.md
    }

    const deployAllowed =
      gates.qa === "approved" &&
      gates.security === "approved" &&
      gates.seo === "approved" &&
      gates.p0Blockers === "none"

    res.json({
      projectId: req.params.id,
      deployAllowed,
      gates,
      reason: deployAllowed
        ? "Deploy gate passed"
        : "Deploy gate blocked — fix failing gates before deploying",
    })
  } catch (err) {
    res.status(500).json({ error: "Deploy gate check failed", detail: String(err) })
  }
})

app.listen(PORT, () => {
  console.log(`Skynet engine listening on http://localhost:${PORT}`)
})

export default app