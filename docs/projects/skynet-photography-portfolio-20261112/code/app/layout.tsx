// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    template: "%s — Landscape & nature photography portfolio",
    default:
      "Quiet light. Wide horizons. — Landscape & nature photography portfolio",
  },
  description:
    "Landscape and nature photography portfolio. Mountains, forests, water, and skies photographed with a calm, editorial eye. Showcase only — no shop. Get in touch.",
  keywords: [
    "landscape photography",
    "nature photography",
    "photography portfolio",
    "mountains",
    "forests",
    "water",
    "skies",
  ],
  authors: [{ name: "[Photographer name]" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Landscape & nature photography portfolio",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://placehold.co" />
      </head>
      <body className="font-sans antialiased">
        <Header brand="[Photographer name]" />
        <main id="main-content" className="min-h-[calc(100vh-8rem)]">
          {children}
        </main>
        <Footer brand="[Photographer name]" />
      </body>
    </html>
  );
}
