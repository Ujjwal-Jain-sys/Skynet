// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

/**
 * Skip-to-content link — first keyboard-focusable element on every page.
 * Visually hidden until it receives focus (WCAG 2.4.1, Bypass Blocks).
 */

"use client";

import { cn } from "@/lib/utils";

export function SkipLink({ href = "#main-content" }: { href?: string }) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus-visible:static focus-visible:z-[50] focus-visible:bg-primary focus-visible:text-text-on-primary focus-visible:rounded-md focus-visible:px-4 focus-visible:py-2 focus-visible:mr-2 focus-visible:mt-2 focus-visible:left-2 focus-visible:top-2",
      )}
    >
      Skip to content
    </a>
  );
}
