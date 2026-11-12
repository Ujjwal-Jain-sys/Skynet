// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SkipLink } from "./skip-link";
import { Button } from "./button";

const NAV_ITEMS = [
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export interface HeaderProps {
  brand?: string;
  currentPath?: string;
}

export function Header({ brand = "[Photographer name]", currentPath }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  // Close drawer on Escape; return focus to the hamburger when closing.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && drawerOpen) {
        closeDrawer();
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen, closeDrawer]);

  const isCurrent = (href: string) => currentPath === href;

  return (
    <>
      <SkipLink href="#main-content" />

      <header
        className={cn(
          "sticky top-0 z-sticky border-b border-border bg-bg/95 backdrop-blur-md",
          drawerOpen && "border-b-0",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 min-h-[4rem]">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 font-serif text-2xl font-semibold text-text tracking-tight no-underline hover:no-underline focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:rounded-md focus-visible:px-2 focus-visible:py-1",
              "transition-colors duration-200 ease-standard",
            )}
            aria-label="Home"
          >
            {brand}
          </Link>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 ease-standard",
                  isCurrent(item.href)
                    ? "text-text underline"
                    : "text-text-muted hover:text-text",
                )}
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={drawerOpen}
              aria-controls="nav-drawer"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-md border border-border text-text hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none",
                drawerOpen && "bg-surface-hover",
              )}
              onClick={() => setDrawerOpen((prev) => !prev)}
            >
              {drawerOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div
            id="nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="fixed inset-0 z-sticky flex flex-col bg-surface border-b border-border lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <Link
                href="/"
                className="font-serif text-2xl font-semibold text-text tracking-tight no-underline"
                onClick={closeDrawer}
              >
                {brand}
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                className="text-text-muted hover:text-text focus-visible:ring-2 focus-visible:ring-focus-ring rounded-md p-1.5"
                onClick={closeDrawer}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              <ul role="list" className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ease-standard",
                        isCurrent(item.href)
                          ? "bg-surface-hover text-text underline"
                          : "text-text-muted hover:text-text hover:bg-surface-hover",
                      )}
                      onClick={closeDrawer}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Drawer backdrop for focus containment visual separation */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[199] bg-black/40 lg:hidden"
          aria-hidden="true"
          onClick={closeDrawer}
        />
      )}
    </>
  );
}
