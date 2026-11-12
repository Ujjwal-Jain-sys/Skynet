// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

"use client";

import { cn } from "@/lib/utils";

export interface LightboxControlsProps {
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  className?: string;
}

export function LightboxControls({
  onClose,
  onPrev,
  onNext,
  isFirst,
  isLast,
  className,
}: LightboxControlsProps) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row gap-2 lg:gap-3 items-start lg:items-center w-full px-6",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={cn(
          "inline-flex items-center justify-center w-10 h-10 rounded-md border border-border text-text hover:bg-surface-hover transition-all duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none active:scale-95",
        )}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        className="flex flex-col lg:flex-row gap-2 lg:gap-3 w-full lg:w-auto mt-4 lg:mt-0"
      >
        <button
          type="button"
          disabled={isFirst}
          aria-disabled={isFirst}
          aria-label="Previous photo"
          onClick={onPrev}
          className={cn(
            "flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-border text-text hover:bg-surface-hover transition-all duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none active:scale-95",
            "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
            "px-4 py-2.5 text-sm font-medium",
          )}
        >
          <span aria-hidden="true">←</span>
          Previous
        </button>
        <button
          type="button"
          disabled={isLast}
          aria-disabled={isLast}
          aria-label="Next photo"
          onClick={onNext}
          className={cn(
            "flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-border text-text hover:bg-surface-hover transition-all duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none active:scale-95",
            "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
            "px-4 py-2.5 text-sm font-medium",
          )}
        >
          Next
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
