"use client";

// app/contact/page.tsx
// /contact — Contact form (FR-06 / US-08). POST /api/contact integration.
// Client-side validation (UX only): name non-empty, email valid, message
// non-empty. Invalid email → inline error, nothing sent.

import * as React from "react";
import { skynetApi } from "@/lib/api";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Alert } from "@/components/Alert";

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [formError, setFormError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setFormError(null);

    let valid = true;
    const next: Record<string, string> = {};
    if (!name.trim()) {
      next.name = "This field is required";
      valid = false;
    }
    if (!email.trim()) {
      next.email = "This field is required";
      valid = false;
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      next.email = "Please enter a valid email";
      valid = false;
    }
    if (!message.trim()) {
      next.message = "This field is required";
      valid = false;
    }
    setFieldErrors(next);
    if (!valid) return;

    setSubmitting(true);
    try {
      await skynetApi.post<{ inquiry: { id: string }; confirmation: string }>(
        "/contact",
        { name: name.trim(), email: email.trim(), message: message.trim() },
      );
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      if (err?.status === 429) {
        setFormError("Too many requests. Please try again later.");
      } else if (err?.code === "validation_error" && err.field) {
        setFieldErrors({ [err.field]: err.message || "Invalid input" });
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-bg p-4" id="main-content">
      <div className="max-w-md mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-text mb-2">Get in touch</h1>
          <p className="text-text-secondary">
            Have a question, a suggestion, or just want to say hello? Send us
            a message and we&rsquo;ll get back to you.
          </p>
        </header>

        {submitted ? (
          <Card className="rounded-lg border border-border bg-surface shadow-sm p-6 text-center">
            <span aria-hidden="true" className="text-success text-4xl mb-2">✉️</span>
            <h2 className="text-xl font-semibold text-text mb-2">Thanks — we&rsquo;ll be in touch.</h2>
            <Button asChild variant="secondary" href="/">
              Back to home
            </Button>
          </Card>
        ) : (
          <Card className="rounded-lg border border-border bg-surface shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && <Alert variant="danger" message={formError} role="alert" />}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={[
                    "w-full rounded-md border bg-surface text-text placeholder:text-text-muted px-3 py-2.5 text-base touch-target-min",
                    fieldErrors.name
                      ? "border-danger focus-visible:border-danger focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2"
                      : "border-border focus-visible:outline-none focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-invalid={fieldErrors.name ? "true" : undefined}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                />
                {fieldErrors.name && (
                  <p id="name-error" className="mt-1 text-xs text-danger" role="alert" aria-live="polite">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={[
                    "w-full rounded-md border bg-surface text-text placeholder:text-text-muted px-3 py-2.5 text-base touch-target-min",
                    fieldErrors.email
                      ? "border-danger focus-visible:border-danger focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2"
                      : "border-border focus-visible:outline-none focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-invalid={fieldErrors.email ? "true" : undefined}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="mt-1 text-xs text-danger" role="alert" aria-live="polite">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  autoComplete="off"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={[
                    "w-full rounded-md border bg-surface text-text placeholder:text-text-muted px-3 py-2.5 text-base touch-target-min",
                    fieldErrors.message
                      ? "border-danger focus-visible:border-danger focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2"
                      : "border-border focus-visible:outline-none focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-invalid={fieldErrors.message ? "true" : undefined}
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                  placeholder="What can we help you with?"
                />
                {fieldErrors.message && (
                  <p id="message-error" className="mt-1 text-xs text-danger" role="alert" aria-live="polite">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover disabled:bg-border disabled:text-text-muted disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min transition-colors"
              >
                {submitting ? "Sending…" : "Send message"}
              </button>

              <p className="mt-4 text-center text-sm text-text-secondary">
                Back to home{" "}
                <a
                  href="/"
                  className="text-primary hover:underline focus-visible:underline focus-visible:underline-offset-4 ml-1"
                >
                  →
                </a>
              </p>
            </form>
          </Card>
        )}
      </div>
    </main>
  );
}
