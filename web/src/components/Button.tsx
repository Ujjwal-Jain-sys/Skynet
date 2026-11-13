"use client";

// components/Button.tsx
// Button component per design/component-specs.md §1.
// Variants: primary | secondary | ghost | danger. Sizes: sm | md | lg.
// States: default, hover, focus, active, disabled, loading.
// All styling via design tokens — no hardcoded colors, spacing or font sizes.

import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean; // render as an <a> (nav) while keeping button semantics
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantStyles = {
  primary:
    "bg-primary text-text-on-primary hover:bg-primary-hover active:bg-primary-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:bg-border disabled:text-text-muted disabled:cursor-not-allowed disabled:hover:bg-border disabled:hover:text-text-muted",
  secondary:
    "bg-transparent text-primary border border-border hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:bg-transparent disabled:text-text-muted disabled:border-border disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-text-secondary hover:text-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:text-text-muted disabled:cursor-not-allowed disabled:hover:text-text-muted disabled:hover:no-underline",
  danger:
    "bg-danger text-text-on-primary hover:bg-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:bg-border disabled:text-text-muted disabled:cursor-not-allowed",
};

const sizeStyles = {
  sm: "h-9 px-3 text-xs font-medium rounded-md",
  md: "h-11 px-4 text-base font-medium rounded-md",
  lg: "h-13 px-6 text-lg font-semibold rounded-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      asChild = false,
      href,
      className,
      disabled,
      type = "button",
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = loading || disabled;
    const base = [
      "inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors transition-duration-base transition-easing-default font-medium",
      "active:scale-[0.98] focus-visible:ring-offset-2",
      sizeStyles[size],
      variantStyles[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ");
    const content = loading ? (
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="visually-hidden">Loading…</span>
      </span>
    ) : (
      children
    );

    if (asChild) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          aria-busy={loading || undefined}
          className={base}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={base}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

// @ts-ignore - forwardRef displayName
export default Button;
