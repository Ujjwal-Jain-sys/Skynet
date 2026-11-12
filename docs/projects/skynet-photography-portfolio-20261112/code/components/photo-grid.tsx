// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import { EmptyState } from "./empty-state";
import { PhotoCard } from "./photo-card";
import { Photo } from "@/lib/data";
import { Skeleton } from "./skeleton";

export interface PhotoGridProps {
  photos: Photo[];
  title?: string;
  className?: string;
}

const GRID_COLS = "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6";

export function PhotoGrid({ photos, title, className }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <section className={cn("py-12", className)}>
        <EmptyState
          variant="gallery"
          heading="The gallery is empty. Check back soon."
          linkHref="/"
          linkLabel="Return home"
        />
      </section>
    );
  }

  return (
    <section className={cn("py-12", className)}>
      {title && (
        <h2 className="text-h2 text-text mb-8">{title}</h2>
      )}
      <div
        role="grid"
        aria-label="Photo gallery"
        className={cn(
          "grid gap-4 lg:gap-6",
          GRID_COLS,
        )}
      >
        {photos.map((photo) => (
          <PhotoCard key={photo.slug} photo={photo} className="row-span-1" />
        ))}
      </div>
    </section>
  );
}

/** Skeleton cards shown while a page loads (kept for future async gallery). */
export function GallerySkeleton({ count = 12 }: { count?: number }) {
  return (
    <section className="py-12">
      <div className="grid gap-4 lg:gap-6 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: count }).map((_, i) => (
          <article key={i} className="aspect-[4/5] rounded-md bg-surface-hover shadow-sm" />
        ))}
      </div>
    </section>
  );
}

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}
