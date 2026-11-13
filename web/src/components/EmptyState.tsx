"use client";

// components/EmptyState.tsx
// Dashboard empty state (§8). Heading, description, CTA.

import * as React from "react";

interface EmptyStateProps {
  heading?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
}

export function EmptyState({
  heading = "No projects yet",
  description = "Create your first website to get started. No code required — pick a theme and publish.",
  ctaLabel = "Create your first project →",
  ctaHref,
  ctaOnClick,
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-border bg-surface shadow-sm p-12 text-center">
      <span aria-hidden="true" className="text-text-muted text-6xl">
        📄
      </span>
      <h2 className="mt-6 text-xl font-semibold text-text">{heading}</h2>
      <p className="mt-2 text-text-secondary max-w-xs mx-auto">{description}</p>
      {ctaLabel && (
        <div className="mt-8">
          {ctaHref ? (
            <a href={ctaHref} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min">
              {ctaLabel}
            </a>
          ) : (
            <button
              type="button"
              onClick={ctaOnClick}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min"
            >
              {ctaLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
