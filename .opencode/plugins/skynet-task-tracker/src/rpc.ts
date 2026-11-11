// RPC contract for skynet-task-tracker
export interface SkynetTaskTrackerRPC {
  trackTask: {
    input: {
      projectId: string
      task: string
      owner: string
      phase: string
      status: "todo" | "in_progress" | "review" | "blocked" | "done"
      artifact?: string
      blocker?: string
    }
    output: {
      projectId: string
      task: string
      owner: string
      phase: string
      status: string
      artifact?: string
      blocker?: string
      updated: string
    }
  }
  listTasks: {
    input: { projectId: string }
    output: {
      projectId: string
      tasks: Array<{
        task: string
        owner: string
        phase: string
        status: string
        artifact?: string
        blocker?: string
      }>
      note: string
    }
  }
}