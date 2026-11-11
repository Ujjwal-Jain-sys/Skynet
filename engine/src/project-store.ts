import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises"
import { join } from "node:path"
import { existsSync } from "node:fs"
import { z } from "zod"

export const ProjectStatusSchema = z.enum([
  "todo",
  "in_progress",
  "review",
  "blocked",
  "done",
])

export type ProjectStatus = z.infer<typeof ProjectStatusSchema>

export interface ProjectArtifact {
  path: string
  owner: string
  phase: string
  status: ProjectStatus
  updated: string
}

export interface ProjectState {
  id: string
  brief: string
  assumptions?: string
  status: ProjectStatus
  currentPhase: string
  completedPhases: string[]
  artifacts: ProjectArtifact[]
  createdAt: string
  updatedAt: string
}

/**
 * ProjectStore persists all project artifacts under docs/projects/<id>/.
 * This is the single source of truth — no hidden state.
 */
export class ProjectStore {
  private readonly baseDir: string

  constructor(baseDir = "docs/projects") {
    this.baseDir = baseDir
  }

  private projectDir(id: string): string {
    return join(this.baseDir, id)
  }

  private artifactPath(id: string, relativePath: string): string {
    return join(this.projectDir(id), relativePath)
  }

  async init(projectId: string, brief: string): Promise<ProjectState> {
    const dir = this.projectDir(projectId)
    if (existsSync(dir)) {
      throw new Error(`Project ${projectId} already exists`)
    }
    await mkdir(dir, { recursive: true })

    const now = new Date().toISOString()
    const state: ProjectState = {
      id: projectId,
      brief,
      status: "todo",
      currentPhase: "intake",
      completedPhases: [],
      artifacts: [],
      createdAt: now,
      updatedAt: now,
    }

    await this.writeFile(projectId, "brief.md", brief)
    await this.writeState(projectId, state)
    return state
  }

  async getState(projectId: string): Promise<ProjectState | null> {
    try {
      const raw = await readFile(this.artifactPath(projectId, "status.json"), "utf8")
      return JSON.parse(raw) as ProjectState
    } catch {
      return null
    }
  }

  async updateState(
    projectId: string,
    patch: Partial<Omit<ProjectState, "id">>
  ): Promise<ProjectState> {
    const existing = await this.getState(projectId)
    if (!existing) {
      throw new Error(`Project ${projectId} not found`)
    }
    const updated: ProjectState = {
      ...existing,
      ...patch,
      updatedAt: new Date().toISOString(),
    }
    await this.writeState(projectId, updated)
    return updated
  }

  async writeFile(
    projectId: string,
    relativePath: string,
    content: string
  ): Promise<void> {
    const fullPath = this.artifactPath(projectId, relativePath)
    await mkdir(join(fullPath, ".."), { recursive: true })
    await writeFile(fullPath, content, "utf8")
  }

  async readFile(projectId: string, relativePath: string): Promise<string> {
    return readFile(this.artifactPath(projectId, relativePath), "utf8")
  }

  async listArtifacts(projectId: string): Promise<ProjectArtifact[]> {
    const state = await this.getState(projectId)
    if (!state) return []
    return state.artifacts
  }

  async addArtifact(
    projectId: string,
    artifact: Omit<ProjectArtifact, "path">
  ): Promise<void> {
    const state = await this.getState(projectId)
    if (!state) {
      throw new Error(`Project ${projectId} not found`)
    }
    const entry: ProjectArtifact = {
      ...artifact,
      path: join(this.baseDir, projectId, artifact.path.replace(/^\//, "")),
    }
    // Replace existing artifact with same path
    const existingIndex = state.artifacts.findIndex(
      (a) => a.path === entry.path
    )
    if (existingIndex >= 0) {
      state.artifacts[existingIndex] = entry
    } else {
      state.artifacts.push(entry)
    }
    await this.writeState(projectId, {
      ...state,
      artifacts: state.artifacts,
      updatedAt: new Date().toISOString(),
    })
  }

  private async writeState(projectId: string, state: ProjectState): Promise<void> {
    await this.writeFile(projectId, "status.json", JSON.stringify(state, null, 2))
  }

  async projectExists(projectId: string): Promise<boolean> {
    const state = await this.getState(projectId)
    return state !== null
  }

  async listProjects(): Promise<string[]> {
    if (!existsSync(this.baseDir)) return []
    const entries = await readdir(this.baseDir, { withFileTypes: true })
    return entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort()
  }
}

export const projectStore = new ProjectStore()