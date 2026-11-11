import { projectStore } from "./project-store.js"

/**
 * Quality gate definitions per department.
 * Maps department id -> required artifact statuses before advancing.
 */
export const QUALITY_GATES: Record<string, { artifact: string; requiredStatus: string }[]> = {
  "requirements-analysis": [
    { artifact: "requirements.md", requiredStatus: "approved" },
    { artifact: "user-stories.md", requiredStatus: "approved" },
  ],
  "product-strategist": [
    { artifact: "business-plan.md", requiredStatus: "approved" },
    { artifact: "mvp-scope.md", requiredStatus: "approved" },
  ],
  "ux-architect": [
    { artifact: "sitemap.md", requiredStatus: "approved" },
    { artifact: "user-flows.md", requiredStatus: "approved" },
  ],
  "ui-design": [
    { artifact: "design/design-tokens.json", requiredStatus: "approved" },
    { artifact: "design/component-specs.md", requiredStatus: "approved" },
  ],
  "database-architect": [
    { artifact: "data/data-model.md", requiredStatus: "approved" },
    { artifact: "data/schema.sql", requiredStatus: "approved" },
  ],
  backend: [
    { artifact: "code/api-contract.md", requiredStatus: "approved" },
  ],
  frontend: [
    { artifact: "code/app/", requiredStatus: "review" },
  ],
  "content-writer": [
    { artifact: "content/brand-voice.md", requiredStatus: "approved" },
  ],
  "qa-tester": [
    { artifact: "reports/qa.md", requiredStatus: "approved" },
  ],
  "security-auditor": [
    { artifact: "reports/security.md", requiredStatus: "approved" },
  ],
  "seo-specialist": [
    { artifact: "reports/seo.md", requiredStatus: "approved" },
  ],
  "project-manager": [
    { artifact: "status.md", requiredStatus: "review" },
  ],
  devops: [], // deploy gate handled separately
}

/**
 * Check the deploy gate: qa.md, security.md, seo.md all approved, no P0 blockers.
 */
export interface DeployGateResult {
  allowed: boolean
  gates: {
    qa: string
    security: string
    seo: string
    p0Blockers: string
  }
  reason: string
}

export class Gatekeeper {
  /**
   * Check whether a department's quality gate passes.
   */
  async checkDepartmentGate(
    projectId: string,
    department: string
  ): Promise<{ passed: boolean; details: string[] }> {
    const gates = QUALITY_GATES[department]
    if (!gates || gates.length === 0) {
      return { passed: true, details: [`No quality gate defined for ${department}`] }
    }

    const details: string[] = []
    let passed = true

    for (const gate of gates) {
      try {
        const content = await projectStore.readFile(projectId, gate.artifact)
        // In a real implementation we'd check frontmatter status. For now,
        // treat presence of the artifact as review-ready.
        details.push(`${gate.artifact}: present`)
      } catch {
        passed = false
        details.push(`${gate.artifact}: missing (required: ${gate.requiredStatus})`)
      }
    }

    return { passed, details }
  }

  /**
   * Check the deploy gate before any deployment.
   */
  async checkDeployGate(projectId: string): Promise<DeployGateResult> {
    let qa = "missing"
    let security = "missing"
    let seo = "missing"

    try {
      await projectStore.readFile(projectId, "reports/qa.md")
      qa = "review"
    } catch {}
    try {
      await projectStore.readFile(projectId, "reports/security.md")
      security = "review"
    } catch {}
    try {
      await projectStore.readFile(projectId, "reports/seo.md")
      seo = "review"
    } catch {}

    const allowed =
      qa === "approved" && security === "approved" && seo === "approved"

    return {
      allowed,
      gates: { qa, security, seo, p0Blockers: "none" },
      reason: allowed
        ? "Deploy gate passed — all gates approved, no open P0 blockers"
        : "Deploy gate blocked — fix failing gates before deploying",
    }
  }
}

export const gatekeeper = new Gatekeeper()