// RPC contract for skynet-notifier
export interface SkynetNotifierRPC {
  notifyStatusChange: {
    input: {
      projectId: string
      phase: string
      status: string
      owner: string
      message: string
    }
    output: {
      projectId: string
      phase: string
      status: string
      owner: string
      message: string
      notifiedAt: string
      channel: string
    }
  }
  notifyDeployReady: {
    input: {
      projectId: string
      gates: {
        qa: string
        security: string
        seo: string
        p0Blockers: string
      }
    }
    output: {
      projectId: string
      deployReady: boolean
      gates: {
        qa: string
        security: string
        seo: string
        p0Blockers: string
      }
      notifiedAt: string
    }
  }
}