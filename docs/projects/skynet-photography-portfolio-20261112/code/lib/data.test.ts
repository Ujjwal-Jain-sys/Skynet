import { describe, it, expect } from "vitest";
import {
  PUBLISHED_PHOTOS,
  GALLERIES,
  photoBySlug,
  photosByGallery,
  adjacentPhotos,
  formatDateMonthYear,
} from "./data";

describe("data module (gallery data layer)", () => {
  describe("PUBLISHED_PHOTOS", () => {
    it("contains all 16 published photos", () => {
      expect(PUBLISHED_PHOTOS.length).toBe(16);
    });

    it("all photos are published", () => {
      expect(PUBLISHED_PHOTOS.every((p) => p.is_published)).toBe(true);
    });

    it("all photos have required fields", () => {
      for (const photo of PUBLISHED_PHOTOS) {
        expect(photo.id).toBeDefined();
        expect(photo.title).toBeDefined();
        expect(photo.slug).toBeDefined();
        expect(photo.image_url).toBeDefined();
        expect(photo.thumbnail_url).toBeDefined();
        expect(typeof photo.sort_order).toBe("number");
      }
    });

    it("photos are sorted by sort_order", () => {
      const orders = PUBLISHED_PHOTOS.map((p) => p.sort_order);
      const sorted = [...orders].sort((a, b) => a - b);
      expect(orders).toEqual(sorted);
    });
  });

  describe("photoBySlug", () => {
    it("returns the correct photo for a valid slug", () => {
      const photo = photoBySlug("mountain-ridge-dawn");
      expect(photo).toBeDefined();
      expect(photo?.title).toBe("Mountain Ridge at Dawn");
      expect(photo?.gallery_id).toBe("gallery-mountains");
    });

    it("returns undefined for an unknown slug", () => {
      expect(photoBySlug("does-not-exist")).toBeUndefined();
    });

    it("returns undefined for empty slug", () => {
      expect(photoBySlug("")).toBeUndefined();
    });
  });

  describe("photosByGallery", () => {
    it("returns photos for a valid gallery slug", () => {
      const mountains = photosByGallery("mountains");
      expect(mountains.length).toBe(4);
      expect(mountains.every((p) => p.gallery_id === "gallery-mountains")).toBe(
        true,
      );
    });

    it("returns photos for each gallery", () => {
      for (const gallery of GALLERIES) {
        const photos = photosByGallery(gallery.slug);
        expect(photos.length).toBeGreaterThan(0);
        expect(
          photos.every((p) => p.gallery_id === gallery.id),
        ).toBe(true);
      }
    });

    it("returns empty array for unknown gallery", () => {
      expect(photosByGallery("nonexistent")).toEqual([]);
    });
  });

  describe("adjacentPhotos", () => {
    it("returns prev and next for a middle photo", () => {
      const { prev, next } = adjacentPhotos("pine-forest-morning");
      // PUBLISHED_PHOTOS is sorted globally by sort_order; index of
      // pine-forest-morning is 5 (after alpine-lake-mirror, before river-valley).
      expect(prev?.slug).toBe("alpine-lake-mirror");
      expect(next?.slug).toBe("river-valley");
    });

    it("returns null prev for the first photo", () => {
      const { prev, next } = adjacentPhotos("mountain-ridge-dawn");
      expect(prev).toBeNull();
      expect(next?.slug).toBe("redwood-canopy");
    });

    it("returns null next for the last photo", () => {
      const { prev, next } = adjacentPhotos("dawn-mountains");
      expect(next).toBeNull();
      expect(prev?.slug).toBe("lake-morning");
    });

    it("returns null prev/next for unknown slug", () => {
      const { prev, next } = adjacentPhotos("does-not-exist");
      expect(prev).toBeNull();
      expect(next).toBeNull();
    });
  });

  describe("formatDateMonthYear", () => {
    it("formats a date string to Month Year", () => {
      expect(formatDateMonthYear("2025-09-14T06:12:00Z")).toBe("September 2025");
    });

    it("returns empty string for undefined date", () => {
      expect(formatDateMonthYear(undefined)).toBe("");
    });

    it("returns empty string for null date", () => {
      expect(formatDateMonthYear(null)).toBe("");
    });

    it("returns empty string for invalid date", () => {
      expect(formatDateMonthYear("not-a-date")).toBe("");
    });
  });
});
