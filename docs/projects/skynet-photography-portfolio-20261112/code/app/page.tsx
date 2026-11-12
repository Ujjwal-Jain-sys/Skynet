// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import { PhotoImage } from "@/components/photo-image";
import { PUBLISHED_PHOTOS } from "@/lib/data";
import { Hero } from "@/components/hero";

/**
 * Home page (/): hero with value proposition + CTA, featured photo block, and
 * brief intro about the work. Static page — optimized for LCP (featured image
 * loads eagerly).
 */
export default function HomePage() {
  const featured = PUBLISHED_PHOTOS[0];

  return (
    <>
      <Hero />

      {/* Featured photo block — carries the hero imagery, eager-loaded for LCP. */}
      <section className="py-20 lg:py-28 px-6">
        <div className="max-w-gallery mx-auto">
          <div className="relative aspect-[4/5] rounded-md bg-surface shadow-lg overflow-hidden lg:aspect-[3/4] lg:min-h-[60vh]">
            {featured && (
              <PhotoImage
                src={featured.image_url}
                alt={featured.caption ? `${featured.title}. ${featured.caption}` : featured.title}
                width={featured.width ?? 1600}
                height={featured.height ?? 1200}
                variant="featured"
                priority
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        </div>
      </section>

      {/* Intro about the work. */}
      <section className="py-20 lg:py-28 px-6">
        <div className="max-w-content mx-auto space-y-8 px-6">
          <h2 className="text-h2 text-text">About the work</h2>
          <p className="text-body text-text-muted leading-relaxed">
            Each photograph is made in the field, waiting for light to settle on
            the land. The images are presented as they were seen — quiet,
            unhurried, and true to the place.
          </p>
          <p className="text-body text-text-muted leading-relaxed">
            No prints are sold here. If you would like to license an image or
            discuss a commission, get in touch.
          </p>
        </div>
      </section>
    </>
  );
}
