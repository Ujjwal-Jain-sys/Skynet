// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import Link from "next/link";
import { Button } from "@/components/button";

export const metadata = {
  title: "Page not found — Landscape & nature photography portfolio",
  description:
    "The page you're looking for doesn't exist. Return home or go to the gallery.",
};

/**
 * 404 page (/404): gentle error message + recovery links (Return home, Go to
 * gallery). Reachable within 1 click of a working page.
 */
export default function NotFound() {
  return (
    <section className="py-20 lg:py-28 px-6 text-center">
      <div className="max-w-content mx-auto space-y-8 px-6">
        <h1 className="text-h1 text-text">Page not found</h1>
        <p className="text-body text-text-muted leading-relaxed">
          The page you are looking for does not exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" passHref>
            <Button variant="primary" size="lg" fullWidth={true}>
              Return home
            </Button>
          </Link>
          <Link href="/gallery" passHref>
            <Button variant="secondary" size="lg" fullWidth={true}>
              Go to gallery
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
