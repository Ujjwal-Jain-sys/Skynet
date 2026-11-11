import { projectStore } from "./project-store.js"
import { DelegationSchema, parseDepartmentId, DEPENDENCY_ORDER } from "./orchestrator.js"
import { z } from "zod"

/**
 * The Delegator writes complete delegation briefs using the task-delegation skill
 * template and records them as artifacts for the master to launch via subagent.
 */
export class Delegator {
  /**
   * Build a delegation brief markdown for a department.
   */
  buildDelegationBrief(input: {
    projectId: string
    department: string
    objective: string
    context?: string
    inputs?: string[]
    constraints?: string[]
    deliverable?: string[]
    acceptanceCriteria?: string[]
    dependencies?: string[]
  }): string {
    const {
      projectId,
      department,
      objective,
      context = "No upstream context recorded yet.",
      inputs = [],
      constraints = [],
      deliverable = [],
      acceptanceCriteria = [],
      dependencies = [],
    } = input

    const lines: string[] = []
    lines.push(`# Delegation Brief — ${department}`)
    lines.push(`Project: ${projectId}`)
    lines.push(`Department: ${department}`)
    lines.push(`Objective: ${objective}`)
    lines.push("")
    lines.push("## Context")
    lines.push(context)
    lines.push("")
    lines.push("## Inputs")
    lines.push(inputs.length ? inputs.join("\n- ") : "- None")
    lines.push("")
    lines.push("## Constraints")
    lines.push(constraints.length ? constraints.join("\n- ") : "- None")
    lines.push("")
    lines.push("## Deliverable")
    lines.push(deliverable.length ? deliverable.join("\n- ") : "- TBD")
    lines.push("")
    lines.push("## Acceptance Criteria")
    lines.push(acceptanceCriteria.length ? acceptanceCriteria.join("\n- ") : "- TBD")
    lines.push("")
    lines.push("## Dependencies")
    lines.push(dependencies.length ? dependencies.join("\n- ") : "- None")
    lines.push("")
    return lines.join("\n")
  }

  /**
   * Validate and normalize a delegation input.
   */
  validate(input: unknown): { ok: true; data: z.infer<typeof DelegationSchema> } | { ok: false; errors: z.ZodIssue[] } {
    const result = DelegationSchema.safeParse(input)
    if (!result.success) {
      return { ok: false, errors: result.error.issues }
    }
    return { ok: true, data: result.data }
  }

  /**
   * Record a delegation as an artifact under the project folder.
   */
  async recordDelegation(
    projectId: string,
    department: string,
    briefMarkdown: string
  ): Promise<void> {
    const deptId = parseDepartmentId(department)
    if (!deptId) {
      throw new Error(`Unknown department: ${department}`)
    }
    await projectStore.addArtifact(projectId, {
      path: `delegations/${deptId}.md`,
      owner: "skynet-master",
      phase: "delegation",
      status: "review",
      updated: new Date().toISOString(),
    })
    // The actual markdown content is written by the caller via projectStore.writeFile
  }
}

export const delegator = new Delegator()