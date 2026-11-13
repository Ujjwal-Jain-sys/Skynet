"use client";

// components/Card.tsx
// Generic card container (§6). Variants: default | elevated | interactive.
// Interactive variant lifts 2px on hover (respects prefers-reduced-motion).

import * as React from "react";

export type CardVariant = "default" | "elevated" | "interactive";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({ variant = "default", className, children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={[
        "rounded-lg border border-border bg-surface shadow-sm p-6 transition-colors transition-duration-base",
        variant === "elevated"
          ? "shadow-md"
          : variant === "interactive"
            ? "hover:shadow-md hover:border-border-focus"
            : "",
        "group",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
