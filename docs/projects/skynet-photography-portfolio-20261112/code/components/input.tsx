// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

"use client";

import { InputHTMLAttributes, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: string;
  label?: string;
  helperText?: string;
}

export function Input({
  className,
  error,
  label,
  helperText,
  id,
  disabled,
  required,
  ...props
}: InputProps) {
  const errorId = id ? `${id}-error` : undefined;
  const helperId = id ? `${id}-helper` : undefined;

  const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    // Native focus ring handled by CSS focus-visible utilities.
  }, []);

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-label block",
            error && "text-error",
          )}
        >
          {label}
          {required && <span className="text-error" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={id}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(errorId, helperId)}
        className={cn(
          "block w-full rounded-md border border-border bg-bg text-text placeholder-text-muted/60",
          "px-4 py-3.5 min-h-[2.75rem] text-base font-normal transition-all duration-200 ease-standard",
          "focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none",
          "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
          error ? "border-error focus-visible:ring-error" : "",
          className,
        )}
        onFocus={handleFocus}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-caption text-error" role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={helperId} className="text-caption text-text-muted">
          {helperText}
        </p>
      )}
    </div>
  );
}
