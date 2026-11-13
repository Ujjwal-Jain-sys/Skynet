"use client";

// components/NavLink.tsx
// Navigation link with active/hover/focus/current states (§4).
// Active page indicated via aria-current="page" + underline (not color alone).
// Uses usePathname() to determine active state (Next.js 14 Link.className is
// string-only).

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export function NavLink({
  href,
  children,
  className,
  activeClassName,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "rounded-md text-text-secondary hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 transition-colors px-3 py-2 text-base",
        isActive ? "text-primary underline underline-offset-4" : "",
        className || "",
        activeClassName || "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}
