"use client"

import { useEffect, useState } from "react"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Array<{ id: string; status: string; updatedAt: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects?.map((id: string) => ({ id, status: "in_progress", updatedAt: "" })) ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading projects…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Projects</h1>
        {projects.length === 0 ? (
          <p className="text-slate-600">No projects yet. Create one from the homepage.</p>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-slate-900">{p.id}</div>
                  <div className="text-sm text-slate-500">Status: {p.status}</div>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View details</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}