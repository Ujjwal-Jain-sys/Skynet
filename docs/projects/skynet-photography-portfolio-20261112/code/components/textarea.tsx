// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

"use client";

import {
  TextareaHTMLAttributes,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  error?: string;
  label?: string;
  helperText?: string;
}

export function Textarea({
  className,
  error,
  label,
  helperText,
  id,
  disabled,
  required,
  ...props
}: TextareaProps) {
  const errorId = id ? `${id}-error` : undefined;
  const helperId = id ? `${id}-helper` : undefined;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow within reasonable bounds while keeping a min height ≥ 44px touch target.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  }, [props.value, props.defaultValue]);

  const handleFocus = useCallback(() => {
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
      <textarea
        ref={textareaRef}
        id={id}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(errorId, helperId)}
        className={cn(
          "block w-full rounded-md border border-border bg-bg text-text placeholder-text-muted/60",
          "px-4 py-3.5 min-h-[2.75rem] min-h-[10rem] text-base font-normal resize-y transition-all duration-200 ease-standard",
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
