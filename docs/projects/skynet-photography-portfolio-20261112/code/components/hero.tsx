// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import Link from "next/link";
import { Button } from "./button";

export interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section
      className={
        "flex flex-col items-center justify-center text-center py-24 lg:py-32 px-6 " +
          (className ?? "")
      }
    >
      <div className="max-w-content mx-auto space-y-6">
        <h6 className="text-h6 text-accent font-semibold">
          Landscape &amp; nature photography
        </h6>
        <h1 className="text-h1 text-text mb-4">Quiet light. Wide horizons.</h1>
        <p className="text-body text-text-muted max-w-[36ch] mx-auto leading-relaxed">
          I photograph mountains, forests, water, and skies with a calm,
          editorial eye. This is a showcase of the work — not a shop. If an
          image speaks to you, I welcome your inquiry.
        </p>
        <Link href="/gallery" passHref>
          <Button variant="primary" size="lg" fullWidth={true}>
            Enter gallery
          </Button>
        </Link>
      </div>
    </section>
  );
}
