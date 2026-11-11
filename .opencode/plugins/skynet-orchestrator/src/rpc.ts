// RPC contract for skynet-orchestrator — typed boundary between server and clients
export interface SkynetOrchestratorRPC {
  decomposeBrief: {
    input: { brief: string; projectId: string }
    output: {
      projectId: string
      workstreams: string[]
      dependencyOrder: string
    }
  }
  delegate: {
    input: { department: string; brief: string; projectId: string }
    output: {
      delegatedTo: string
      projectId: string
      status: string
      note: string
    }
  }
}