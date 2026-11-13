"use client";

// components/Logo.tsx
// "Skynet" wordmark — link to home (§13).

import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={[
        "text-lg font-semibold text-text hover:text-primary transition-colors",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Skynet"
    >
      Skynet
    </Link>
  );
}
