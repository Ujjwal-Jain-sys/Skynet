// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  href: string;
  label: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex flex-wrap items-center gap-1 text-caption", className)}
    >
      <ol role="list" className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-text font-medium"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-colors duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:rounded-sm focus-visible:px-1",
                      "text-text-muted hover:text-text",
                    )}
                  >
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="text-text-muted">
                    &gt;
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
