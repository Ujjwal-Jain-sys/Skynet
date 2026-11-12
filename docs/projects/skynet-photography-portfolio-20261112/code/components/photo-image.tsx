// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

/**
 * Lazy-loaded, optimized photograph with a graceful-degradation placeholder.
 * Carries the visual weight of the gallery. Matches FeaturedPhoto / PhotoImage
 * spec: thumbnail (4/5), featured, detail variants.
 */

"use client";

import Image from "next/image";
import { useState } from "react";

export type PhotoImageVariant = "thumbnail" | "featured" | "detail";

export interface PhotoImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  variant?: PhotoImageVariant;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

const ASPECT_RATIOS: Record<PhotoImageVariant, string> = {
  thumbnail: "4/5",
  featured: "3/4",
  detail: "auto",
};

export function PhotoImage({
  src,
  alt,
  width,
  height,
  variant = "thumbnail",
  className,
  wrapperClassName,
  priority = false,
  sizes,
  quality = 90,
}: PhotoImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const aspectRatio = ASPECT_RATIOS[variant];

  // Default responsive sizes per variant.
  const defaultSizes =
    sizes ||
    (variant === "detail"
      ? "100vw"
      : variant === "featured"
        ? "100vw"
        : "(min-width: 1024px) 16vw, (min-width: 640px) 22vw, 92vw");

  if (error) {
    // Placeholder block when image fails — alt text retained, no broken icon.
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-md bg-surface border border-border shadow-sm",
          aspectRatio !== "auto" && `aspect-[${aspectRatio}]`,
          variant === "detail" && "min-h-[40vh]",
          wrapperClassName,
        )}
      >
        <span className="text-caption text-center max-w-[20ch] px-4">
          {alt || "Image unavailable"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-surface shadow-sm",
        aspectRatio !== "auto" && `aspect-[${aspectRatio}]`,
        variant === "detail" && "min-h-[56vh] lg:min-h-[70vh]",
        wrapperClassName,
      )}
    >
      {/* Skeleton while loading — no layout shift. */}
      <div
        className={cn(
          "absolute inset-0 skeleton",
          loading && "opacity-100",
          (!loading && !error) && "opacity-0 pointer-events-none transition-opacity duration-300",
        )}
        aria-hidden="true"
      />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        // Placeholder images (placehold.co) serve SVG, which Next.js cannot
        // optimize. unoptimized renders a standard  with lazy loading instead.
        unoptimized
        className={cn(
          "block transition-opacity duration-500 ease-standard",
          loading ? "opacity-0" : "opacity-100",
          (!loading && !error) && "animate-fade-in",
          className,
        )}
        onLoad={() => {
          setLoading(false);
        }}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
}

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}
