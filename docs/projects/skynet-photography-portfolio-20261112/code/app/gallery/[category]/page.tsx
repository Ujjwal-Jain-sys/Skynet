// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { FilterPill } from "@/components/filter-pill";
import { PhotoGrid } from "@/components/photo-grid";
import { Pagination } from "@/components/pagination";
import {
  PUBLISHED_PHOTOS,
  GALLERIES,
  photosByGallery,
} from "@/lib/data";
import type { Category } from "@/components/filter-pill";

const PAGE_SIZE = 24;

export const generateStaticParams = () =>
  GALLERIES.map((gallery) => ({ category: gallery.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const gallery = GALLERIES.find((g) => g.slug === category);
  if (!gallery) return { title: "Category not found" };
  return {
    title: `${gallery.name} — Landscape & nature photography portfolio`,
    description: gallery.description ?? `Browse ${gallery.name} photographs in the landscape and nature photography portfolio.`,
  };
};

/**
 * Category gallery (/gallery/[category]): filtered paginated thumbnail grid.
 * Page is read from the ?page= query param and paginated server-side.
 */
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: { page?: string };
}) {
  const { category } = await params;
  const gallery = GALLERIES.find((g) => g.slug === category);

  if (!gallery) {
    notFound();
  }

  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));
  const allPhotos = photosByGallery(category);
  const pageCount = Math.max(1, Math.ceil(allPhotos.length / PAGE_SIZE));
  const clampedPage = Math.min(page, pageCount);
  const paginated = allPhotos.slice(
    (clampedPage - 1) * PAGE_SIZE,
    clampedPage * PAGE_SIZE,
  );

  return (
    <>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/gallery", label: "Gallery" },
          { href: `/gallery/${gallery.slug}`, label: gallery.name },
        ]}
      />

      <section className="py-10 lg:py-14 px-6">
        <div className="max-w-content mx-auto space-y-8 px-6">
          <h1 className="text-h2 text-text">{gallery.name}</h1>
          {gallery.description && (
            <p className="text-body text-text-muted leading-relaxed">
              {gallery.description}
            </p>
          )}

          <FilterPill
            categories={[
              { slug: "all", name: "All" },
              ...GALLERIES.map((g) => ({
                slug: g.slug as unknown as Category,
                name: g.name,
              })),
            ] as { slug: Category; name: string }[]}
            current={category as Category}
          />

          <PhotoGrid photos={paginated} title={gallery.name} />

          {pageCount > 1 && (
            <Pagination
              page={clampedPage}
              pageCount={pageCount}
              baseHref={`/gallery/${gallery.slug}`}
            />
          )}
        </div>
      </section>
    </>
  );
}
