// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

"use client";

import { ButtonHTMLAttributes, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingLabel?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "leading" | "trailing";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  loadingLabel,
  fullWidth = false,
  icon,
  iconPosition = "leading",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        event.preventDefault();
      }
    },
    [loading, disabled],
  );

  const base = "inline-flex items-center justify-center gap-2 rounded-md border-transparent transition-all duration-200 ease-standard font-button outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-focus-ring disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed active:scale-95";

  const variants = {
    primary: "bg-primary text-text-on-primary hover:bg-surface-hover",
    secondary:
      "border border-border text-text hover:bg-surface hover:text-text",
    ghost: "text-text-muted hover:text-text",
    danger: "text-error",
  };

  const sizes = {
    sm: "px-3 py-2 min-h-[2.75rem] text-xs",
    md: "px-4 py-3 min-h-[2.75rem] text-sm",
    lg: "px-6 py-4 min-h-[3rem] text-base",
  };

  const isLoadingOrDisabled = loading || disabled;

  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        isLoadingOrDisabled && "disabled",
        className,
      )}
      disabled={isLoadingOrDisabled}
      aria-busy={loading || undefined}
      onClick={handleClick}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2" aria-hidden="true">
          <svg
            className="w-4 h-4 shrink-0 animate-spin text-text-on-primary"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="font-button">{loadingLabel}</span>
        </span>
      ) : (
        <>
          {icon && iconPosition === "leading" && (
            <span className="shrink-0" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="font-button">{children}</span>
          {icon && iconPosition === "trailing" && (
            <span className="shrink-0" aria-hidden="true">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
}

Button.displayName = "Button";
