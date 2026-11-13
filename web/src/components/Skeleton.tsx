"use client";

// components/Skeleton.tsx
// Loading shimmer placeholder (§12). Respects prefers-reduced-motion.

import * as React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      {...props}
      className={[
        "rounded-md border border-border bg-surface animate-pulse",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy="true"
    />
  );
}
