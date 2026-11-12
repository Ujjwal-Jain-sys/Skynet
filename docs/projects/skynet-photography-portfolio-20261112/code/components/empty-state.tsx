// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import Link from "next/link";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  variant?: "gallery" | "category";
  heading: string;
  body?: string;
  linkHref?: string;
  linkLabel?: string;
  clearHref?: string;
  clearLabel?: string;
}

export function EmptyState({
  variant = "gallery",
  heading,
  body,
  linkHref,
  linkLabel,
  clearHref,
  clearLabel,
}: EmptyStateProps) {
  return (
    <section
      className="py-16"
      aria-labelledby="empty-state-heading"
    >
      <div className="max-w-content mx-auto text-center space-y-6 px-6">
        <h2
          id="empty-state-heading"
          className="text-h2 text-text"
          tabIndex={-1}
        >
          {heading}
        </h2>
        {body && <p className="text-body text-text-muted">{body}</p>}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {linkHref && linkLabel && (
            <Link href={linkHref} passHref>
              <Button variant="primary" fullWidth={true} size="lg">
                {linkLabel}
              </Button>
            </Link>
          )}
          {clearHref && clearLabel && (
            <Link href={clearHref} passHref>
              <Button variant="secondary" fullWidth={true} size="lg">
                {clearLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
