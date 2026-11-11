import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "skynet-task-tracker",
  async setup(ctx) {
    // Track task and phase status across all Skynet departments.
    ctx.registerTool({
      name: "skynet_track_task",
      description: "Create or update a task status entry in status.md",
      parameters: {
        type: "object",
        properties: {
          projectId: { type: "string", description: "Project id" },
          task: { type: "string", description: "Task name" },
          owner: { type: "string", description: "Department agent id" },
          phase: { type: "string", description: "Phase name" },
          status: {
            type: "string",
            description: "todo | in_progress | review | blocked | done"
          },
          artifact: { type: "string", description: "Artifact path" },
          blocker: { type: "string", description: "Blocker description, if any" }
        },
        required: ["projectId", "task", "owner", "phase", "status"]
      },
      async execute({ projectId, task, owner, phase, status, artifact, blocker }) {
        return {
          projectId,
          task,
          owner,
          phase,
          status,
          artifact,
          blocker,
          updated: new Date().toISOString()
        }
      }
    })

    ctx.registerTool({
      name: "skynet_list_tasks",
      description: "List all task statuses for a project",
      parameters: {
        type: "object",
        properties: {
          projectId: { type: "string", description: "Project id" }
        },
        required: ["projectId"]
      },
      async execute({ projectId }) {
        return {
          projectId,
          tasks: [],
          note: "Read docs/projects/<projectId>/status.md for the full task table"
        }
      }
    })
  }
})