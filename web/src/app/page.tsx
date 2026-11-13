import Link from "next/link";
import { Card } from "@/components/Card";

// app/page.tsx
// / — Marketing landing page per FR-01 / US-01.
// Copy from content/pages/home.md (human-made, not AI-generated).
//
// - Brand name "Skynet" (h1)
// - Exact core promise: "build websites without writing a single line of code"
// - Target audience: vibe-coders, newbie-tech students, non-technical people
// - Primary CTA "Get started" linking to /sign-up
// - Secondary CTA "Learn more" → /about

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col" id="main-content">
      <header className="bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4 py-6 md:py-8">
            <a
              href="/"
              className="text-lg font-semibold text-text hover:text-primary transition-colors focus-visible:underline focus-visible:underline-offset-4"
              aria-label="Skynet"
            >
              Skynet
            </a>
            <nav aria-label="primary" className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/about"
                className="text-text-secondary hover:text-text focus-visible:underline focus-visible:underline-offset-4"
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="text-text-secondary hover:text-text focus-visible:underline focus-visible:underline-offset-4"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-text-secondary hover:text-text focus-visible:underline focus-visible:underline-offset-4"
              >
                Contact
              </Link>
              <Link
                href="/sign-up"
                className="text-text-secondary hover:text-text focus-visible:underline focus-visible:underline-offset-4"
              >
                Sign up
              </Link>
              <Link
                href="/log-in"
                className="text-text-secondary hover:text-text focus-visible:underline focus-visible:underline-offset-4"
              >
                Log in
              </Link>
            </nav>
            <a
              href="/sign-up"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min transition-colors"
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-12 md:py-20 bg-bg">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text tracking-tight leading-tight mb-6 text-balance">
            Build websites without writing a single line of code
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-lg mx-auto">
            Pick a theme, add your content, and publish. No code required —
            whether you&rsquo;re a vibe-coder, a newbie-tech student, or just
            not technical.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-8 py-3.5 text-lg font-semibold text-text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min transition-colors"
            >
              Get started
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-transparent px-8 py-3.5 text-lg font-semibold text-text hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-12 md:py-16 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-text mb-2">How it works</h2>
          <p className="text-text-secondary mb-10 max-w-2xl mx-auto">
            Build in three steps — no code required.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="default">
              <h3 className="text-lg font-semibold text-text mb-2">Step 1 — Choose your theme</h3>
              <p className="text-text-secondary">
                Pick light, dark, or system default. Your choice applies to your
                whole site and remembers itself when you come back.
              </p>
            </Card>
            <Card variant="default">
              <h3 className="text-lg font-semibold text-text mb-2">Step 2 — Add your content</h3>
              <p className="text-text-secondary">
                No code required. Build your pages by pointing, clicking, and
                typing — not by writing a single line of code.
              </p>
            </Card>
            <Card variant="default">
              <h3 className="text-lg font-semibold text-text mb-2">Step 3 — Publish and go live</h3>
              <p className="text-text-secondary">
                Your site goes live on Skynet. Custom domains arrive post-MVP.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="px-4 py-12 md:py-16 bg-bg">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-semibold text-text mb-4">
              Building a website shouldn&rsquo;t require a computer science degree
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Most website tools ask you to write code, wrestle with templates,
              or figure out settings you don&rsquo;t understand. If you&rsquo;re
              not technical, that wall stops you before you start. Your idea
              shouldn&rsquo;t wait for a developer.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-text mb-4">
              Skynet takes the code out of website building
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Skynet is a no-code website builder made for people who want to
              ship, not study. Pick a theme, add your content, and publish.
              Everything stays human-made — real copy, real design, no AI slop.
            </p>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="px-4 py-12 md:py-16 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-text mb-6">Built for people who make things</h2>
          <ul className="space-y-4 max-w-lg">
            <li className="flex items-start gap-3 text-text-secondary leading-relaxed">
              <span className="text-primary font-bold shrink-0">▸</span>
              <strong className="text-text">Vibe-coders</strong> who want to ship
              fast without getting bogged down.
            </li>
            <li className="flex items-start gap-3 text-text-secondary leading-relaxed">
              <span className="text-primary font-bold shrink-0">▸</span>
              <strong className="text-text">Newbie-tech students</strong>
              learning the ropes, one site at a time.
            </li>
            <li className="flex items-start gap-3 text-text-secondary leading-relaxed">
              <span className="text-primary font-bold shrink-0">▸</span>
              <strong className="text-text">Non-technical people</strong> who
              just want a website and don&rsquo;t want to learn to code.
            </li>
          </ul>
        </div>
      </section>

      {/* Themes preview */}
      <section className="px-4 py-12 md:py-16 bg-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-text mb-6">Pick your theme</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Light — clean and bright for daytime work · Dark — easy on the eyes
            for late-night building · System — follows your operating system,
            automatically.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="default">
              <h3 className="text-lg font-semibold text-text mb-2">Light</h3>
              <p className="text-text-secondary">Clean and bright for daytime work.</p>
            </Card>
            <Card variant="default">
              <h3 className="text-lg font-semibold text-text mb-2">Dark</h3>
              <p className="text-text-secondary">Easy on the eyes for late-night building.</p>
            </Card>
            <Card variant="default">
              <h3 className="text-lg font-semibold text-text mb-2">System</h3>
              <p className="text-text-secondary">Follows your operating system, automatically.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 md:py-20 bg-surface border-y border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text mb-4 tracking-tight">Ready to build?</h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            Your first website is minutes away. No code required.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-8 py-4 text-lg font-semibold text-text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min transition-colors"
          >
            Get started
          </Link>
        </div>
      </section>

      <footer className="border-t border-border bg-surface px-4 py-8 text-text-secondary text-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <nav aria-label="footer" className="flex flex-wrap gap-6 text-sm">
            <Link
              href="/about"
              className="hover:text-text focus-visible:underline focus-visible:underline-offset-4"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="hover:text-text focus-visible:underline focus-visible:underline-offset-4"
            >
              Pricing
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
