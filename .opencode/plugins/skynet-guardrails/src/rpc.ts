// RPC contract for skynet-guardrails
export interface SkynetGuardrailsRPC {
  checkDependency: {
    input: {
      department: string
      completed: string[]
    }
    output: {
      allowed: boolean
      department: string
      prerequisites: string[]
      missing: string[]
      reason: string
    }
  }
  checkDeployGate: {
    input: {
      projectId: string
      qaStatus: string
      securityStatus: string
      seoStatus: string
      p0Blockers: string
    }
    output: {
      projectId: string
      deployAllowed: boolean
      gates: {
        qa: string
        security: string
        seo: string
        p0Blockers: string
      }
      reason: string
    }
  }
  enforceNoDirectWork: {
    input: {
      actor: string
      department: string
    }
    output: {
      allowed: boolean
      rule: string
      actor: string
      department: string
      action: string
    }
  }
}