"use client"

import { useState } from "react"

export default function HomePage() {
  const [brief, setBrief] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!brief.trim()) return
    setSubmitting(true)
    setStatus("idle")
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to create project")
      setStatus("ok")
      setMessage(
        `Project "${data.projectId}" created. Skynet's agents will now build your site.`
      )
    } catch (err) {
      setStatus("error")
      setMessage(
        err instanceof Error ? err.message : "Something went wrong"
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">Skynet</h1>
          <p className="text-slate-300 mt-2">
            Describe your website in plain language. Our team of AI agents
            researches, plans, designs, builds, tests, secures, and deploys it
            for you — no technical skills needed.
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto px-4 py-8">
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Start your website</h2>
          <p className="text-slate-600 mb-6">
            Tell us what kind of site you want. For example: "A portfolio site
            for my photography business with a contact form and Instagram feed."
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What kind of website do you want?
              </label>
              <textarea
                className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={5}
                placeholder="e.g. A bakery website with an online ordering page, photo gallery, and location map"
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                disabled={submitting}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting || !brief.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {submitting ? "Creating your project…" : "Build my website"}
            </button>
          </form>

          {status === "ok" && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              {message}
            </div>
          )}
          {status === "error" && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {message}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6 px-4 text-center text-sm">
        Skynet &middot; Built on OpenCode V2 &middot;
        <a href="#" className="text-indigo-400 hover:text-indigo-300">
          Privacy
        </a>
      </footer>
    </div>
  )
}