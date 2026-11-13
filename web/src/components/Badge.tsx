"use client";

// components/Badge.tsx
// Status pill (§11). Variants: default (Draft) | success (Published) | danger.
// Status conveyed by text label, not color alone.

import * as React from "react";

export type BadgeVariant = "default" | "success" | "danger";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={[
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium leading-tight",
        variant === "success"
          ? "border-success bg-success-soft text-success"
          : variant === "danger"
            ? "border-danger bg-danger-soft text-danger"
            : "border-border bg-surface text-text-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
