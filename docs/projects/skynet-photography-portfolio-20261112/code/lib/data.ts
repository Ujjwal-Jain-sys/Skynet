// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

/**
 * Mock portfolio data matching the database schema (migrations 001/002).
 *
 * Frontend-only source of truth for the gallery. The backend currently
 * implements only the contact form endpoint (/api/contact); photo data is
 * served statically here for the showcase. Shapes mirror `public.galleries`
 * and `public.photos` from data/schema.sql so a future gallery API can adopt
 * the same contract without frontend changes.
 */

export interface Gallery {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Photo {
  id: string;
  gallery_id: string | null;
  title: string;
  slug: string;
  caption?: string | null;
  location?: string | null;
  date_taken?: string | null;
  image_url: string;
  thumbnail_url: string;
  width?: number | null;
  height?: number | null;
  is_published: boolean;
  sort_order: number;
}

// Landscape & nature photography categories (confirmed set per sitemap.md).
export const GALLERIES: Gallery[] = [
  {
    id: "gallery-mountains",
    name: "Mountains",
    slug: "mountains",
    description:
      "High ridges, alpine light, and quiet summits photographed at dawn and dusk.",
  },
  {
    id: "gallery-forests",
    name: "Forests",
    slug: "forests",
    description:
      "Canopy, understory, and mist — the stillness of old-growth woodland.",
  },
  {
    id: "gallery-water",
    name: "Water",
    slug: "water",
    description:
      "Ocean cliffs, rivers, lakes, and waterfalls — light on moving water.",
  },
  {
    id: "gallery-skies",
    name: "Skies",
    slug: "skies",
    description:
      "Sunset, cloud, and star — weather and atmosphere over the landscape.",
  },
];

export const PHOTOS: Photo[] = [
  // --- Mountains ---
  {
    id: "photo-mountain-ridge",
    gallery_id: "gallery-mountains",
    title: "Mountain Ridge at Dawn",
    slug: "mountain-ridge-dawn",
    caption: "First light on the ridge, before the wind rises.",
    location: "The Cascades",
    date_taken: "2025-09-14T06:12:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Mountain+Ridge+at+Dawn",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Mountain+Ridge+at+Dawn",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 1,
  },
  {
    id: "photo-alpine-lake",
    gallery_id: "gallery-mountains",
    title: "Alpine Lake Mirror",
    slug: "alpine-lake-mirror",
    caption: "A still mountain lake reflecting the morning sky.",
    location: "Glacier Basin",
    date_taken: "2025-08-22T05:48:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Alpine+Lake+Mirror",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Alpine+Lake+Mirror",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 2,
  },
  {
    id: "photo-snow-capped-peak",
    gallery_id: "gallery-mountains",
    title: "Snow-Capped Peak",
    slug: "snow-capped-peak",
    caption: "Winter light holding on the summit.",
    location: "High Sierra",
    date_taken: "2026-01-18T08:03:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Snow-Capped+Peak",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Snow-Capped+Peak",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 3,
  },
  {
    id: "photo-high-meadow",
    gallery_id: "gallery-mountains",
    title: "High Meadow",
    slug: "high-meadow",
    caption: "Summer grasses beneath a broad sky.",
    location: "Subalpine Zone",
    date_taken: "2025-07-30T10:15:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=High+Meadow",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=High+Meadow",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 4,
  },

  // --- Forests ---
  {
    id: "photo-redwood-canopy",
    gallery_id: "gallery-forests",
    title: "Redwood Canopy",
    slug: "redwood-canopy",
    caption: "Light filtering through ancient redwood.",
    location: "Coastal Range",
    date_taken: "2025-06-05T11:20:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Redwood+Canopy",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Redwood+Canopy",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 1,
  },
  {
    id: "photo-pine-forest",
    gallery_id: "gallery-forests",
    title: "Pine Forest Morning",
    slug: "pine-forest-morning",
    caption: "Mist lifting from the pine needles.",
    location: "Northern Woods",
    date_taken: "2025-10-12T07:05:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Pine+Forest+Morning",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Pine+Forest+Morning",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 2,
  },
  {
    id: "photo-autumn-woods",
    gallery_id: "gallery-forests",
    title: "Autumn Woods",
    slug: "autumn-woods",
    caption: "October light on turning leaves.",
    location: "Eastern Slope",
    date_taken: "2025-10-28T09:40:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Autumn+Woods",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Autumn+Woods",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 3,
  },
  {
    id: "photo-misty-forest",
    gallery_id: "gallery-forests",
    title: "Misty Forest",
    slug: "misty-forest",
    caption: "Fog holding low among the trunks.",
    location: "Pacific Northwest",
    date_taken: "2025-11-02T06:50:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Misty+Forest",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Misty+Forest",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 4,
  },

  // --- Water ---
  {
    id: "photo-ocean-cliff",
    gallery_id: "gallery-water",
    title: "Ocean Cliff",
    slug: "ocean-cliff",
    caption: "Wave meeting rock at the continent's edge.",
    location: "Coastal Headland",
    date_taken: "2025-05-19T17:30:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Ocean+Cliff",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Ocean+Cliff",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 1,
  },
  {
    id: "photo-river-valley",
    gallery_id: "gallery-water",
    title: "River Valley",
    slug: "river-valley",
    caption: "Current threading through the valley floor.",
    location: "River Basin",
    date_taken: "2025-06-14T16:05:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=River+Valley",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=River+Valley",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 2,
  },
  {
    id: "photo-waterfall",
    gallery_id: "gallery-water",
    title: "Waterfall",
    slug: "waterfall",
    caption: "Water falling in quiet season.",
    location: "Gorge",
    date_taken: "2025-04-10T14:15:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Waterfall",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Waterfall",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 3,
  },
  {
    id: "photo-lake-morning",
    gallery_id: "gallery-water",
    title: "Lake at Morning",
    slug: "lake-morning",
    caption: "Glass-still water beneath a pale sky.",
    location: "High Basin",
    date_taken: "2025-09-03T06:25:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Lake+at+Morning",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Lake+at+Morning",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 4,
  },

  // --- Skies ---
  {
    id: "photo-sunset-ridge",
    gallery_id: "gallery-skies",
    title: "Sunset Ridge",
    slug: "sunset-ridge",
    caption: "Daylight retreating from the western face.",
    location: "Rim Trail",
    date_taken: "2025-07-19T19:45:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Sunset+Ridge",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Sunset+Ridge",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 1,
  },
  {
    id: "photo-starry-sky",
    gallery_id: "gallery-skies",
    title: "Starry Sky",
    slug: "starry-sky",
    caption: "Stars above a dark ridge-line.",
    location: "High Desert",
    date_taken: "2025-12-12T23:10:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Starry+Sky",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Starry+Sky",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 2,
  },
  {
    id: "photo-cloud-formation",
    gallery_id: "gallery-skies",
    title: "Cloud Formation",
    slug: "cloud-formation",
    caption: "Weather building over the plateau.",
    location: "Plateau Edge",
    date_taken: "2025-08-08T15:30:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Cloud+Formation",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Cloud+Formation",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 3,
  },
  {
    id: "photo-dawn-mountains",
    gallery_id: "gallery-skies",
    title: "Dawn over Mountains",
    slug: "dawn-mountains",
    caption: "First color touching the highest peaks.",
    location: "Summit Approach",
    date_taken: "2026-02-01T05:50:00Z",
    image_url:
      "https://placehold.co/1600x1200/09090b/fafafa?text=Dawn+over+Mountains",
    thumbnail_url:
      "https://placehold.co/600x750/09090b/fafafa?text=Dawn+over+Mountains",
    width: 1600,
    height: 1200,
    is_published: true,
    sort_order: 4,
  },
];

/** Published photos, sorted by sort_order then created order. */
export const PUBLISHED_PHOTOS: Photo[] = PHOTOS.filter(
  (p) => p.is_published,
).sort((a, b) => a.sort_order - b.sort_order);

/** Photos grouped by gallery slug. */
export function photosByGallery(slug: string): Photo[] {
  const gallery = GALLERIES.find((g) => g.slug === slug);
  if (!gallery) return [];
  return PUBLISHED_PHOTOS.filter((p) => p.gallery_id === gallery.id);
}

/** A single published photo by slug. */
export function photoBySlug(slug: string): Photo | undefined {
  return PUBLISHED_PHOTOS.find((p) => p.slug === slug);
}

/** Adjacent photos in the full published sequence (for Next/Prev). */
export function adjacentPhotos(slug: string): {
  prev: Photo | null;
  next: Photo | null;
} {
  const index = PUBLISHED_PHOTOS.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: PUBLISHED_PHOTOS[index - 1] ?? null,
    next: PUBLISHED_PHOTOS[index + 1] ?? null,
  };
}

/** Format a date_taken ISO string to "Month Year". */
export function formatDateMonthYear(dateString?: string | null): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, { month: "long", year: "numeric" });
}
