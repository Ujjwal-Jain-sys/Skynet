// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LightboxControls } from "./lightbox-controls";

export interface PhotoNavProps {
  gallerySlug: string | null;
  photoSlug: string;
  prevSlug: string | null;
  nextSlug: string | null;
  isFirst: boolean;
  isLast: boolean;
}

/**
 * Client navigation shell for the photo detail view.
 * - Close / Prev / Next as Links (server-side navigation, no router needed).
 * - Escape key closes (navigates back to gallery).
 * - Arrow keys navigate adjacent photos.
 */
export function PhotoNav({
  gallerySlug,
  photoSlug,
  prevSlug,
  nextSlug,
  isFirst,
  isLast,
}: PhotoNavProps) {
  const closeHref = gallerySlug ? `/gallery/${gallerySlug}` : "/gallery";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        window.location.href = closeHref;
      }
      if (event.key === "ArrowLeft" && prevSlug) {
        event.preventDefault();
        window.location.href = `/photo/${prevSlug}`;
      }
      if (event.key === "ArrowRight" && nextSlug) {
        event.preventDefault();
        window.location.href = `/photo/${nextSlug}`;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeHref, prevSlug, nextSlug]);

  return (
    <LightboxControls
      onClose={() => {
        window.location.href = closeHref;
      }}
      onPrev={() => {
        if (prevSlug) window.location.href = `/photo/${prevSlug}`;
      }}
      onNext={() => {
        if (nextSlug) window.location.href = `/photo/${nextSlug}`;
      }}
      isFirst={isFirst}
      isLast={isLast}
    />
  );
}
