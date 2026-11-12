import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "skynet-orchestrator",
  setup(ctx) {
    ctx.tool.transform((editor) => {
      editor.add({
        name: "skynet_decompose_brief",
        description: "Decompose a user brief into department workstreams with dependency order",
        input: {
          type: "object",
          properties: {
            brief: { type: "string", description: "The user's plain-language website brief" },
            projectId: { type: "string", description: "Project id for artifact storage" }
          },
          required: ["brief", "projectId"]
        },
        execute(input) {
          const { brief, projectId } = input
          return {
            output: {
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
        }
      })

      editor.add({
        name: "skynet_delegate",
        description: "Delegate a workstream to a department subagent",
        input: {
          type: "object",
          properties: {
            department: { type: "string", description: "Department agent id" },
            brief: { type: "string", description: "Delegation brief for the department" },
            projectId: { type: "string", description: "Project id" }
          },
          required: ["department", "brief", "projectId"]
        },
        execute(input) {
          const { department, brief, projectId } = input
          return {
            output: {
              delegatedTo: department,
              projectId,
              status: "delegated",
              note: "Launch via subagent tool with the department's exact agent id"
            }
          }
        }
      })
    })
  }
})
