// app/pricing/page.tsx
// /pricing — Pricing plans (MVP marketing only, static).
// Public, static. SEO metadata per content/pages/pricing.md.

import Link from "next/link";
import * as React from "react";

export const metadata = {
  title: "Pricing — Skynet no-code website builder",
  description:
    "Skynet pricing plans for the no-code website builder. Start free, paid plans with custom domains arriving post-MVP.",
  openGraph: {
    title: "Pricing — Skynet no-code website builder",
    description: "Start building for free. Paid plans and custom domains arrive post-MVP.",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-bg" id="main-content">
      <header className="border-b border-border bg-surface">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <a
            href="/"
            className="text-lg font-semibold text-text hover:text-primary transition-colors focus-visible:underline focus-visible:underline-offset-4"
            aria-label="Skynet"
          >
            Skynet
          </a>
        </div>
      </header>

      <section className="px-4 py-12 md:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Simple pricing, honest about what&rsquo;s here now
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            Start building for free. Paid plans and custom domains arrive
            post-MVP.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-8 py-3.5 text-lg font-semibold text-text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min transition-colors"
          >
            Get started
          </Link>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-text mb-8">Plans</h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            These tiers are marketing placeholders for MVP. Paid checkout and
            final pricing launch post-MVP. Sign up now and you&rsquo;ll be
            ready to build when the builder and paid plans go live.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card variant="default">
              <h3 className="text-lg font-semibold text-text mb-2">Free</h3>
              <ul className="space-y-2 text-text-secondary mb-6">
                <li>Build and publish websites on a Skynet subdomain</li>
                <li>No code required</li>
                <li>Light, dark, and system themes</li>
                <li>Save and return to your projects</li>
              </ul>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-text hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min transition-colors"
              >
                Get started
              </Link>
            </Card>
            <Card variant="default">
              <h3 className="text-lg font-semibold text-text mb-2">Pro (post-MVP)</h3>
              <ul className="space-y-2 text-text-secondary mb-6">
                <li>Custom domains</li>
                <li>More projects</li>
                <li>Priority support</li>
                <li>Checkout via Stripe arriving post-MVP</li>
              </ul>
              <p className="text-xs text-text-muted">Coming post-MVP</p>
            </Card>
          </div>
          <p className="mt-8 text-sm text-text-muted max-w-xl mx-auto leading-relaxed">
            No. These are marketing tiers for MVP. Final pricing and checkout
            arrive post-MVP. You only pay if and when paid plans launch
            post-MVP.
          </p>
        </div>
      </section>

      <footer className="border-t border-border bg-surface mt-auto px-4 py-8 text-text-secondary text-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <nav aria-label="footer" className="flex flex-wrap gap-6 text-sm">
            <Link
              href="/about"
              className="hover:text-text focus-visible:underline focus-visible:underline-offset-4"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-text focus-visible:underline focus-visible:underline-offset-4"
            >
              Contact
            </Link>
          </nav>
          <p className="text-text-muted">© Skynet</p>
        </div>
      </footer>
    </main>
  );
}

function Card({ children, variant }: { children?: React.ReactNode; variant?: "default" | "elevated" | "interactive" }) {
  return (
    <div className={[
      "rounded-lg border border-border bg-surface shadow-sm p-6 flex flex-col",
      variant === "elevated" ? "shadow-md" : "",
    ].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
