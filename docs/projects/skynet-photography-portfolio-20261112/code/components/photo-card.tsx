// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

/**
 * Single gallery thumbnail: a link wrapping a lazy image, navigating to
 * /photo/[slug]. Hover scales the image; focus shows a visible ring.
 */

"use client";

import Link from "next/link";
import { PhotoImage } from "./photo-image";
import { cn } from "@/lib/utils";

export interface PhotoCardProps {
  photo: {
    slug: string;
    title: string;
    thumbnail_url: string;
    width?: number | null;
    height?: number | null;
    caption?: string | null;
  };
  className?: string;
}

export function PhotoCard({ photo, className }: PhotoCardProps) {
  const alt = photo.caption
    ? `${photo.title}. ${photo.caption}`
    : photo.title;

  return (
    <article className={cn("group", className)}>
      <Link
        href={`/photo/${photo.slug}`}
        className={cn(
          "block rounded-md border border-border transition-all duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:rounded-md",
          "hover:border-border-focus hover:shadow-lg",
          "active:scale-[0.98]",
          // Target size: ensure the card is at least 44x44 on touch via aspect container.
        )}
        aria-label={photo.title}
      >
        <PhotoImage
          src={photo.thumbnail_url}
          alt={alt}
          width={photo.width ?? undefined}
          height={photo.height ?? undefined}
          variant="thumbnail"
          className="group-hover:scale-[1.02] transition-transform duration-300 ease-standard"
        />
      </Link>
    </article>
  );
}
