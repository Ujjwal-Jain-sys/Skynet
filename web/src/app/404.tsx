// app/404.tsx
// /404 — Keyboard-navigable not-found page (NFR-02).
// Error conveyed by text, not color alone. "Back to home" CTA.

import Link from "next/link";

export const metadata = {
  title: "Page not found — Skynet",
  description: "The page you're looking for doesn't exist. Return to the Skynet homepage.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg p-4" id="main-content">
      <div className="rounded-lg border border-border bg-surface shadow-sm p-12 text-center max-w-md w-full">
        <span aria-hidden="true" className="text-text-muted text-6xl mb-4">
          404
        </span>
        <h1 className="text-2xl font-bold text-text mb-2">Page not found</h1>
        <p className="text-text-secondary mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist. It may have
          moved or never existed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
