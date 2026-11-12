// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { PhotoImage } from "@/components/photo-image";
import { Caption } from "@/components/caption";
import { PhotoMetadata } from "@/components/photo-metadata";
import { PhotoNav } from "@/components/photo-nav";
import {
  PUBLISHED_PHOTOS,
  photoBySlug,
  adjacentPhotos,
  GALLERIES,
} from "@/lib/data";

export const generateStaticParams = () =>
  PUBLISHED_PHOTOS.map((photo) => ({ slug: photo.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const photo = photoBySlug(slug);
  if (!photo) return { title: "Photo not found" };
  return {
    title: `${photo.title} — Landscape & nature photography portfolio`,
    description: photo.caption
      ? `${photo.title}. ${photo.caption} Landscape and nature photography portfolio.`
      : `${photo.title}. Landscape and nature photography portfolio.`,
  };
};

/**
 * Photo detail (/photo/[slug]): server-rendered lightbox-style enlarged photo
 * view with caption, location/date metadata, and Next / Prev / Close controls.
 *
 * Interactive keyboard handling (Escape / arrow keys) lives in the client
 * PhotoNav component; navigation uses Next.js <Link> so no router hooks are
 * needed in the page, keeping this a Server Component compatible with
 * generateStaticParams.
 */
export default function PhotoDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const photo = photoBySlug(slug);
  if (!photo) {
    notFound();
  }

  const gallery = photo.gallery_id
    ? GALLERIES.find((g) => g.id === photo.gallery_id)
    : undefined;

  const { prev, next } = adjacentPhotos(slug);
  const alt = photo.caption
    ? `${photo.title}. ${photo.caption}`
    : photo.title;

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
  ];
  if (gallery) {
    breadcrumbItems.push({
      href: `/gallery/${gallery.slug}`,
      label: gallery.name,
    });
  }
  breadcrumbItems.push({ href: `/photo/${slug}`, label: photo.title });

  return (
    <div
      className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center bg-bg outline-none"
      tabIndex={-1}
    >
      <Breadcrumb items={breadcrumbItems} />

      <section className="w-full max-w-gallery mx-auto px-6 py-10 lg:py-16">
        <PhotoNav
          gallerySlug={gallery ? gallery.slug : null}
          photoSlug={slug}
          prevSlug={prev ? prev.slug : null}
          nextSlug={next ? next.slug : null}
          isFirst={!prev}
          isLast={!next}
        />

        <div
          className="relative aspect-[4/5] rounded-md bg-surface shadow-lg overflow-hidden lg:aspect-[3/4] lg:min-h-[70vh] mx-auto"
        >
          <PhotoImage
            src={photo.image_url}
            alt={alt}
            width={photo.width ?? undefined}
            height={photo.height ?? undefined}
            variant="detail"
            priority
            className="absolute inset-0 w-full h-full"
          />
        </div>

        <Caption
          title={photo.title}
          className="mt-6 lg:mt-8 text-left lg:text-center"
        />

        <PhotoMetadata
          location={photo.location}
          date_taken={photo.date_taken}
          className="mt-4 lg:mt-6"
        />
      </section>
    </div>
  );
}
