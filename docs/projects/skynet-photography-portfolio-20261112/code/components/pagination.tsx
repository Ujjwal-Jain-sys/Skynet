// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

/**
 * Pagination controls. Self-contained: clicking a page navigates via the
 * browser to `baseHref?page=N`, so no event-handler prop crosses the
 * server/client boundary. Safe to render from Server Components.
 *
 * Focus returns to the top of the grid after a page change (handled by the
 * page's server render + autofocus on first thumbnail).
 */

export interface PaginationProps {
  page: number;
  pageCount: number;
  baseHref: string; // e.g. "/gallery" or "/gallery/mountains"
  className?: string;
}

export function Pagination({
  page,
  pageCount,
  baseHref,
  className,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const isFirst = page <= 1;
  const isLast = page >= pageCount;

  const hrefFor = (targetPage: number): string => {
    const next = Math.max(1, Math.min(pageCount, targetPage));
    const separator = baseHref.includes("?") ? "&" : "?";
    return `${baseHref}${separator}page=${next}`;
  };

  // Always show first, last, current, and immediate neighbors.
  const visiblePages = new Set<number>();
  visiblePages.add(1);
  visiblePages.add(pageCount);
  for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i += 1) {
    visiblePages.add(i);
  }
  const sortedPages = Array.from(visiblePages).sort((a, b) => a - b);

  return (
    <nav
      aria-label="Pagination"
      className={
        "flex flex-wrap items-center justify-between gap-3 mt-10 lg:mt-12" +
          (className ?? "")
      }
    >
      {/* Previous */}
      <a
        href={hrefFor(page - 1)}
        aria-label="Previous page"
        rel={isFirst ? undefined : "prev"}
        className={
          "inline-flex items-center justify-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none" +
          (isFirst
            ? " opacity-40 pointer-events-none cursor-not-allowed"
            : " text-text-muted hover:text-text hover:bg-surface")
        }
      >
        <span aria-hidden="true">←</span>
        Previous page
      </a>

      {/* Page numbers */}
      <div className="flex items-center gap-1.5 lg:gap-2">
        {sortedPages.map((p) => {
          const isCurrent = p === page;
          const isEllipsis =
            p > 1 &&
            p < pageCount &&
            !sortedPages.includes(p - 1) &&
            !sortedPages.includes(p + 1);

          if (isEllipsis) {
            return (
              <span
                key="ellipsis"
                className="px-2 py-2.5 text-text-muted"
                aria-hidden="true"
              >
                …
              </span>
            );
          }

          return (
            <a
              key={p}
              href={hrefFor(p)}
              aria-current={isCurrent ? "page" : undefined}
              aria-label={`Page ${p} of ${pageCount}`}
              className={
                "inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-medium transition-all duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none" +
                (isCurrent
                  ? " bg-surface text-text underline"
                  : " text-text-muted hover:text-text hover:bg-surface")
              }
            >
              {p}
            </a>
          );
        })}
      </div>

      {/* Next */}
      <a
        href={hrefFor(page + 1)}
        aria-label="Next page"
        rel={isLast ? undefined : "next"}
        className={
          "inline-flex items-center justify-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none" +
          (isLast
            ? " opacity-40 pointer-events-none cursor-not-allowed"
            : " text-text-muted hover:text-text hover:bg-surface")
        }
      >
        Next page
        <span aria-hidden="true">→</span>
      </a>
    </nav>
  );
}
