"use client";

// components/FormField.tsx
// Wrapper combining label + input + inline error + ARIA wiring (§3).
// States: default, error, focus.

import * as React from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  helperText?: string;
  required?: boolean;
}

export function FormField({
  label,
  htmlFor,
  error,
  children,
  helperText,
  required = false,
}: FormFieldProps) {
  const errorId = `${htmlFor}-error`;
  const helperId = `${htmlFor}-helper`;

  return (
    <div className="space-y-1.5" aria-invalid={error ? "true" : undefined}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-text-secondary"
      >
        {label}{required ? " *" : ""}
      </label>
      {React.cloneElement(React.Children.only(children as React.ReactElement), {
        id: htmlFor,
        "aria-describedby": [error ? errorId : null, helperText ? helperId : null]
          .filter(Boolean)
          .join(" ") || undefined,
      })}
      {helperText && (
        <p id={helperId} className="text-xs text-text-muted">
          {helperText}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          className="text-xs text-danger"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
