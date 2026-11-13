"use client";

// components/Input.tsx
// Text/email/password input per design/component-specs.md §2.
// States: default, hover, focus, active, disabled, error, loading.
// Native <label> association handled by FormField; Input itself is the field.

import * as React from "react";

export type InputVariant = "text" | "email" | "password";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  error?: boolean;
  loading?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "text", error = false, loading = false, className, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={variant}
        disabled={disabled}
        aria-busy={loading || undefined}
        aria-invalid={error || undefined}
        readOnly={loading || undefined}
        className={[
          "flex w-full rounded-md border border-border bg-surface text-text placeholder:text-text-muted",
          "focus-visible:outline-none focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
          "hover:border-text-secondary disabled:bg-surface disabled:border-border disabled:text-text-muted disabled:cursor-not-allowed",
          error ? "border-danger focus-visible:border-danger focus-visible:ring-danger" : "",
          loading ? "opacity-80" : "",
          "px-3 py-2.5 text-base leading-base transition-colors transition-duration-base",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
export default Input;
