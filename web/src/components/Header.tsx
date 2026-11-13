"use client";

// components/Header.tsx
// Persistent header navigation on all pages (§4).
// Public variant (visitor) and authenticated variant (logged in).
// Contains Logo, NavLink list, ThemeSelector, CTA, hamburger menu, SkipLink.

import Link from "next/link";
import * as React from "react";
import { useSafeAuth } from "@/lib/auth-client";
import { ThemeSelector } from "@/components/ThemeSelector";
import { Logo } from "@/components/Logo";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/Button";
import { SignOutButton } from "@/components/SignOutButton";

interface HeaderProps {
  className?: string;
}

const publicNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Sign up", href: "/sign-up" },
  { label: "Log in", href: "/log-in" },
];

const authedNavItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export function Header({ className }: HeaderProps) {
  const { isAuthenticated, isLoaded } = useSafeAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);

  const items = isAuthenticated ? authedNavItems : publicNavItems;
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

  React.useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (menuOpen && e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleKeydown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((o) => !o);

  return (
    <header
      ref={navRef}
      className={[
        "sticky z-sticky top-0 border-b border-border bg-bg/95 backdrop-blur-md",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-4">
          <Logo className="mr-2" />
          <nav aria-label="primary" className="hidden md:flex items-center gap-8">
            {items.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <ThemeSelector />
            {isAuthenticated ? (
              <SignOutButton />
            ) : (
              <Button asChild variant="primary" size="lg" href="/sign-up">
                Get started
              </Button>
            )}
          </div>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
            className="md:hidden rounded-md p-2 text-text hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 touch-target-min"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          ref={navRef}
          className={[
            "md:hidden rounded-lg border border-border bg-surface shadow-lg mt-2 overflow-hidden",
            menuOpen ? "max-height-96 opacity-100 transition-all duration-base" : "max-height-0 opacity-0 transition-all duration-base",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="px-4 py-4 space-y-2">
            {items.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-text hover:bg-surface hover:text-text focus-visible:underline focus-visible:underline-offset-4 touch-target-min"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <SignOutButton className="block w-full" />
            ) : (
              <Button
                asChild
                variant="primary"
                size="md"
                href="/sign-up"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                Get started
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
