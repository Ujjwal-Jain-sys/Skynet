// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

"use client";

/**
 * Category filter pills. Self-contained: clicking a pill navigates to
 * /gallery or /gallery/[slug] via the browser, so no event-handler prop needs
 * to cross the server/client boundary. Works server-rendered.
 *
 * Progressive enhancement: the URL updates to /gallery/[category].
 */

export type Category = "all" | "mountains" | "forests" | "water" | "skies";

export interface FilterPillProps {
  categories: { slug: Category; name: string }[];
  current: Category;
  className?: string;
}

const CATEGORY_LABELS: Record<Category, string> = {
  all: "All",
  mountains: "Mountains",
  forests: "Forests",
  water: "Water",
  skies: "Skies",
};

function categoryHref(slug: Category): string {
  return slug === "all" ? "/gallery" : `/gallery/${slug}`;
}

export function FilterPill({
  categories,
  current,
  className,
}: FilterPillProps) {
  return (
    <div className={className}>
      <span className="sr-only">Filter by category</span>
      <div
        role="group"
        aria-label="Filter by category"
        className="flex flex-wrap gap-2 lg:gap-3"
      >
        {categories.map((category) => {
          const isActive = category.slug === current;
          return (
            <button
              key={category.slug}
              type="button"
              aria-pressed={isActive}
              aria-label={
                category.slug === "all"
                  ? `Show all categories${isActive ? ", active" : ""}`
                  : `Filter by ${category.name}${isActive ? ", active" : ""}`
              }
              onClick={() => {
                window.location.href = categoryHref(category.slug);
              }}
              className={
                "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none" +
                " border-border text-text-muted hover:text-text hover:border-border-focus" +
                (isActive ? " bg-surface text-text border-border-focus" : " bg-transparent")
              }
            >
              {CATEGORY_LABELS[category.slug]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
