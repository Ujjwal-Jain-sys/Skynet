import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "skynet-orchestrator",
  async setup(ctx) {
    // Register the master-orchestration capability: decompose a brief into
    // department workstreams and track delegation state.
    ctx.registerTool({
      name: "skynet_decompose_brief",
      description: "Decompose a user brief into department workstreams with dependency order",
      parameters: {
        type: "object",
        properties: {
          brief: { type: "string", description: "The user's plain-language website brief" },
          projectId: { type: "string", description: "Project id for artifact storage" }
        },
        required: ["brief", "projectId"]
      },
      async execute({ brief, projectId }) {
        return {
          projectId,
          workstreams: [
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
          ],
          dependencyOrder:
            "requirements-analysis → product-strategist → ux-architect → ui-design → " +
            "(database-architect → backend) → frontend → content-writer → " +
            "(qa-tester, security-auditor, seo-specialist) → project-manager → devops"
        }
      }
    })

    ctx.registerTool({
      name: "skynet_delegate",
      description: "Delegate a workstream to a department subagent",
      parameters: {
        type: "object",
        properties: {
          department: { type: "string", description: "Department agent id" },
          brief: { type: "string", description: "Delegation brief for the department" },
          projectId: { type: "string", description: "Project id" }
        },
        required: ["department", "brief", "projectId"]
      },
      async execute({ department, brief, projectId }) {
        return {
          delegatedTo: department,
          projectId,
          status: "delegated",
          note: "Launch via subagent tool with the department's exact agent id"
        }
      }
    })
  }
})