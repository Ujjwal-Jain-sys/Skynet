import { Plugin } from "@opencode/plugin"

// Hard dependency order enforced by guardrails
const DEPENDENCY_ORDER = [
  "requirements-analysis",
  "product-strategist",
  "ux-architect",
  "ui-design",
  "database-architect",
  "backend",
  "frontend",
  "content-writer",
  "qa-tester",
  "security-auditor",
  "seo-specialist",
  "project-manager",
  "devops"
]

export default Plugin.define({
  id: "skynet-guardrails",
  setup(ctx) {
    ctx.tool.transform((editor) => {
      editor.add({
        name: "skynet_check_dependency",
        description: "Check whether a department can start given completed departments",
        input: {
          type: "object",
          properties: {
            department: { type: "string", description: "Department agent id to check" },
            completed: {
              type: "array",
              items: { type: "string" },
              description: "List of already-completed department ids"
            }
          },
          required: ["department", "completed"]
        },
        execute(input) {
          const { department, completed } = input
          const index = DEPENDENCY_ORDER.indexOf(department)
          if (index === -1) {
            return { output: { allowed: false, reason: `Unknown department: ${department}` } }
          }
          const prereqs = DEPENDENCY_ORDER.slice(0, index)
          const missing = prereqs.filter(p => !completed.includes(p))
          return {
            output: {
              allowed: missing.length === 0,
              department,
              prerequisites: prereqs,
              missing,
              reason:
                missing.length === 0
                  ? "All prerequisites complete"
                  : `Missing prerequisites: ${missing.join(", ")}`
            }
          }
        }
      })

      editor.add({
        name: "skynet_check_deploy_gate",
        description: "Check whether a project passes the deploy gate",
        input: {
          type: "object",
          properties: {
            projectId: { type: "string", description: "Project id" },
            qaStatus: { type: "string", description: "qa.md status" },
            securityStatus: { type: "string", description: "security.md status" },
            seoStatus: { type: "string", description: "seo.md status" },
            p0Blockers: { type: "string", description: "Open P0 blocker count or 'none'" }
          },
          required: ["projectId", "qaStatus", "securityStatus", "seoStatus", "p0Blockers"]
        },
        execute(input) {
          const { projectId, qaStatus, securityStatus, seoStatus, p0Blockers } = input
          const passed =
            qaStatus === "approved" &&
            securityStatus === "approved" &&
            seoStatus === "approved" &&
            p0Blockers === "none"
          return {
            output: {
              projectId,
              deployAllowed: passed,
              gates: { qa: qaStatus, security: securityStatus, seo: seoStatus, p0Blockers },
              reason:
                passed
                  ? "Deploy gate passed — all gates approved, no open P0 blockers"
                  : "Deploy gate blocked — fix failing gates before deploying"
            }
          }
        }
      })

      editor.add({
        name: "skynet_enforce_no_direct_work",
        description: "Remind the master not to do a department's work directly",
        input: {
          type: "object",
          properties: {
            actor: { type: "string", description: "Agent id attempting the work" },
            department: { type: "string", description: "Department whose work is being done" }
          },
          required: ["actor", "department"]
        },
        execute(input) {
          const { actor, department } = input
          return {
            output: {
              allowed: false,
              rule: "Never do a department's work yourself — always delegate via subagent",
              actor,
              department,
              action: `Use task-delegation skill + subagent tool for ${department}`
            }
          }
        }
      })
    })
  }
})
