// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

"use client";

import Link from "next/link";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface SuccessMessageProps {
  heading?: string;
  body?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
}

export function SuccessMessage({
  heading = "Thanks — your message has been sent.",
  body = "I will get back to you as soon as I can.",
  ctaHref = "/gallery",
  ctaLabel = "Return to gallery",
  className,
}: SuccessMessageProps) {
  return (
    <section
      className={cn(
        "py-16 text-center",
        className,
      )}
      aria-live="polite"
    >
      <div className="max-w-content mx-auto px-6 space-y-6">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success text-text-on-primary text-success font-bold text-xs"
        >
          ✓
        </span>
        <h2 className="text-h2 text-text">{heading}</h2>
        {body && <p className="text-body text-text-muted">{body}</p>}
        {ctaHref && ctaLabel && (
          <Link href={ctaHref} passHref>
            <Button variant="primary" fullWidth={true} size="lg">
              {ctaLabel}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
