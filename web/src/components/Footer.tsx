"use client";

// components/Footer.tsx
// Site-wide footer (§9). Public + authenticated variant.
// Links text-muted, hover → text (not color alone).

import Link from "next/link";
import * as React from "react";
import { useSafeAuth } from "@/lib/auth-client";

const publicLinks = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Sign up", href: "/sign-up" },
  { label: "Log in", href: "/log-in" },
];

const authedLinks = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
];

export function Footer() {
  const { isAuthenticated } = useSafeAuth();
  const links = isAuthenticated ? authedLinks : publicLinks;
  return (
    <footer
      className="border-t border-border bg-surface px-4 py-8 text-text-secondary text-sm"
      aria-label="footer"
    >
      <div className="max-w-4xl mx-auto">
        <nav aria-label="footer">
          <ul className="flex flex-wrap gap-6 justify-center text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-text-secondary hover:text-text transition-colors focus-visible:underline focus-visible:underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-center text-text-muted">
          © Skynet
        </p>
      </div>
    </footer>
  );
}
