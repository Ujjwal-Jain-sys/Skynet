// app/about/page.tsx
// /about — About Skynet. Mission, values, human-made-not-AI-made (NFR-03).
// Public, static. SEO metadata per content/pages/about.md.

import Link from "next/link";

export const metadata = {
  title: "About Skynet — Human-made, not AI-made",
  description:
    "The story behind Skynet, the no-code website builder. Our mission, values, and why every word here is written by a person, not a prompt.",
  openGraph: {
    title: "About Skynet — Human-made, not AI-made",
    description: "A no-code website builder, made by people, for people.",
    type: "website",
  },
};

export default function AboutPage() {
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

      <section className="px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">About Skynet</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            A no-code website builder, made by people, for people.
          </p>

          <h2 className="text-xl font-semibold text-text mb-4">Why Skynet exists</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            We built Skynet so anyone can make a website without writing a
            single line of code. Not just developers. Not just designers.
            Anyone with an idea — vibe-coders, newbie-tech students, and people
            who have never touched code in their lives.
          </p>
          <p className="text-text-secondary leading-relaxed mb-8">
            Your idea shouldn&rsquo;t wait for a developer. It should wait for
            you.
          </p>

          <h2 className="text-xl font-semibold text-text mb-4">What we believe in</h2>
          <dl className="space-y-6 mb-8">
            <div>
              <dt className="font-semibold text-text mb-1">Human-made</dt>
              <dd className="text-text-secondary">
                Every word on this site was written by a person. Every
                interface was designed by hand. We do not ship AI-generated
                slop, and we never will.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-text mb-1">Plain-spoken</dt>
              <dd className="text-text-secondary">
                Clear words, no jargon. If you can&rsquo;t understand it, we
                didn&rsquo;t write it well enough.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-text mb-1">Accessible</dt>
              <dd className="text-text-secondary">
                The site works for everyone, on any device, in any theme —
                light, dark, or system.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-text mb-1">Honest</dt>
              <dd className="text-text-secondary">
                We say what the product does today, not what it might do
                someday. Features that don&rsquo;t exist yet are labeled as
                such.
              </dd>
            </div>
          </dl>

          <h2 className="text-xl font-semibold text-text mb-4">A promise, not a buzzword</h2>
          <p className="text-text-secondary leading-relaxed mb-8">
            Skynet is built for people who make things — and it is made by
            people who make things. The copy you&rsquo;re reading was written
            by a human. The design was drawn by a human. If anything here
            looks like it came from a prompt, we&rsquo;ve failed, and we want
            to hear about it.
          </p>

          <div className="text-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-8 py-3.5 text-lg font-semibold text-text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface mt-auto px-4 py-8 text-text-secondary text-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <nav aria-label="footer" className="flex flex-wrap gap-6 text-sm">
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
            <Link
              href="/sign-up"
              className="hover:text-text focus-visible:underline focus-visible:underline-offset-4"
            >
              Sign up
            </Link>
            <Link
              href="/log-in"
              className="hover:text-text focus-visible:underline focus-visible:underline-offset-4"
            >
              Log in
            </Link>
          </nav>
          <p className="text-text-muted">© Skynet</p>
        </div>
      </footer>
    </main>
  );
}
