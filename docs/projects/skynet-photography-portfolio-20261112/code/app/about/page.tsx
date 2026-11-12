// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import { PhotoImage } from "@/components/photo-image";
import { Button } from "@/components/button";
import Link from "next/link";

export const metadata = {
  title: "About — Landscape & nature photography portfolio",
  description:
    "About the photographer behind the landscape and nature photography portfolio. Calm, editorial images of mountains, forests, water, and skies.",
};

/**
 * About page (/about): biography text + portrait image + contact CTA.
 */
export default function AboutPage() {
  return (
    <>
      <section className="py-10 lg:py-14 px-6">
        <div className="max-w-content mx-auto px-6 space-y-10 lg:space-y-0 lg:flex lg:items-start lg:gap-16">
          {/* Portrait */}
          <div className="lg:w-1/3 flex flex-col items-center">
            <PhotoImage
              src="https://placehold.co/600x800/09090b/fafafa?text=Portrait+of+Photographer"
              alt="Portrait of [Photographer name]"
              width={600}
              height={800}
              variant="featured"
              className="w-full max-w-[360px] rounded-md shadow-sm"
              sizes="(min-width: 1024px) 360px, 92vw"
            />
            <p className="mt-6 text-caption text-text-muted text-center max-w-[28ch]">
              Portrait of [Photographer name]
            </p>
          </div>

          {/* Biography */}
          <div className="lg:w-2/3 space-y-6">
            <h1 className="text-h2 text-text">About</h1>
            <h2 className="text-h3 text-text">About the photographer</h2>
            <p className="text-body text-text-muted leading-relaxed">
              I make photographs in wild, quiet places — mountains, forests,
              water, and skies. My approach is calm and editorial: I wait for
              the light, I watch the weather, and I make the image when the
              place reveals itself.
            </p>
            <p className="text-body text-text-muted leading-relaxed">
              This site is a showcase of that work. There is no shop and no
              checkout. If an image speaks to you, or you would like to discuss
              licensing or a commission, I would be glad to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-surface border-t border-border">
        <div className="max-w-content mx-auto text-center space-y-4 px-6">
          <h2 className="text-h2 text-text">Have a question about an image?</h2>
          <p className="text-body text-text-muted leading-relaxed">
            Licensing, commissions, and image questions are welcome.
          </p>
          <Link href="/contact" passHref>
            <Button variant="primary" size="lg" fullWidth={true}>
              Contact me
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
