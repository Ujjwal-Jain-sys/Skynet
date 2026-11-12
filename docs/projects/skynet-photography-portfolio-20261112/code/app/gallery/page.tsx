// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import { Breadcrumb } from "@/components/breadcrumb";
import { FilterPill } from "@/components/filter-pill";
import { PhotoGrid } from "@/components/photo-grid";
import { Pagination } from "@/components/pagination";
import { Photo, PUBLISHED_PHOTOS, GALLERIES } from "@/lib/data";
import type { Category } from "@/components/filter-pill";

const PAGE_SIZE = 24;

/**
 * Gallery overview (/gallery): paginated thumbnail grid with category filter
 * pills. Page is read from the ?page= query param and paginated server-side.
 * Clicking a pill navigates to /gallery/[category]; clicking a page navigates
 * to /gallery?page=N.
 */
export default function GalleryPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));
  const photos = PUBLISHED_PHOTOS;
  const pageCount = Math.max(1, Math.ceil(photos.length / PAGE_SIZE));
  const clampedPage = Math.min(page, pageCount);
  const paginated = photos.slice(
    (clampedPage - 1) * PAGE_SIZE,
    clampedPage * PAGE_SIZE,
  );

  return (
    <>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/gallery", label: "Gallery" },
        ]}
      />

      <section className="py-10 lg:py-14 px-6">
        <div className="max-w-content mx-auto space-y-8 px-6">
          <h1 className="text-h2 text-text">The gallery</h1>
          <p className="text-body text-text-muted leading-relaxed">
            Browse the complete portfolio of landscape and nature photographs.
            Use the filters to narrow by category, or scroll through the full
            grid.
          </p>

          <FilterPill
            categories={[
              { slug: "all", name: "All" },
              ...GALLERIES.map((g) => ({
                slug: g.slug as unknown as Category,
                name: g.name,
              })),
            ] as { slug: Category; name: string }[]}
            current="all"
          />

          <PhotoGrid photos={paginated} />

          <Pagination
            page={clampedPage}
            pageCount={pageCount}
            baseHref="/gallery"
          />
        </div>
      </section>
    </>
  );
}
