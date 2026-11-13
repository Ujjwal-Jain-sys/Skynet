"use client";

// components/Form.tsx
// Form wrapper (§10): heading, subhead, fields, submit, secondary link, errors.
// States: default, loading, error, success.

import * as React from "react";
import { Alert } from "@/components/Alert";

interface FormProps {
  heading: string;
  subhead?: string;
  children: React.ReactNode;
  submitLabel: string;
  submitDisabled?: boolean;
  submitting?: boolean | string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryLabelText?: string;
  error?: string;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export function Form({
  heading,
  subhead,
  children,
  submitLabel,
  submitDisabled,
  submitting,
  secondaryLabel,
  secondaryHref,
  secondaryLabelText,
  error,
  onSubmit,
  className,
}: FormProps) {
  return (
    <form onSubmit={onSubmit} className={["space-y-4", className].filter(Boolean).join(" ")}>
      <div>
        <h2 className="text-xl font-semibold text-text">{heading}</h2>
        {subhead && <p className="mt-1 text-text-secondary">{subhead}</p>}
      </div>

      {error && (
        <Alert variant="danger" message={error} role="alert" />
      )}

      {children}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitDisabled || submitting === true}
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover disabled:bg-border disabled:text-text-muted disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min transition-colors"
        >
          {typeof submitting === "string" ? submitting : submitLabel}
        </button>
      </div>

      {secondaryLabel && secondaryHref && (
        <p className="mt-4 text-center text-sm text-text-secondary">
          {secondaryLabel}{" "}
          <a href={secondaryHref} className="text-primary hover:underline focus-visible:underline focus-visible:underline-offset-4">
            {secondaryLabelText || secondaryHref}
          </a>
        </p>
      )}
    </form>
  );
}
