// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import Link from "next/link";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export interface FooterProps {
  brand?: string;
}

export function Footer({ brand = "[Photographer name]" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border bg-bg pt-8 pb-6 min-h-[4rem] flex flex-col items-center justify-center gap-4",
        "text-text-muted text-sm",
      )}
    >
      <nav
        aria-label="Footer navigation"
        className={cn(
          "flex flex-col lg:flex-row gap-2 lg:gap-6 items-center text-sm font-medium",
        )}
      >
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "transition-colors duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:rounded-sm focus-visible:px-2 focus-visible:py-1",
              "text-text-muted hover:text-text",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <p className="text-caption">
        {brand} · © {year}
      </p>
    </footer>
  );
}
