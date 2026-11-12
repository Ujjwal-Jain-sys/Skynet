import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "skynet-notifier",
  setup(ctx) {
    ctx.tool.transform((editor) => {
      editor.add({
        name: "skynet_notify_status_change",
        description: "Notify of a project status change",
        input: {
          type: "object",
          properties: {
            projectId: { type: "string", description: "Project id" },
            phase: { type: "string", description: "Phase that changed" },
            status: { type: "string", description: "New status" },
            owner: { type: "string", description: "Department agent id" },
            message: { type: "string", description: "Human-readable status message" }
          },
          required: ["projectId", "phase", "status", "owner", "message"]
        },
        execute(input) {
          const { projectId, phase, status, owner, message } = input
          return {
            output: {
              projectId,
              phase,
              status,
              owner,
              message,
              notifiedAt: new Date().toISOString(),
              channel: "status.md + master"
            }
          }
        }
      })

      editor.add({
        name: "skynet_notify_deploy_ready",
        description: "Notify that a project passes the deploy gate",
        input: {
          type: "object",
          properties: {
            projectId: { type: "string", description: "Project id" },
            gates: {
              type: "object",
              properties: {
                qa: { type: "string" },
                security: { type: "string" },
                seo: { type: "string" },
                p0Blockers: { type: "string" }
              },
              required: ["qa", "security", "seo", "p0Blockers"]
            }
          },
          required: ["projectId", "gates"]
        },
        execute(input) {
          const { projectId, gates } = input
          return {
            output: {
              projectId,
              deployReady:
                gates.qa === "approved" &&
                gates.security === "approved" &&
                gates.seo === "approved" &&
                gates.p0Blockers === "none",
              gates,
              notifiedAt: new Date().toISOString()
            }
          }
        }
      })
    })
  }
})
