---
owner: content-writer
phase: content
status: review
updated: 2026-11-12T20:00:00Z
---

# Page: /photo/[slug] — Photo detail

## Page summary

| Field | Value |
|---|---|
| Path | /photo/[slug] |
| Audience | Visitor viewing a single photograph in detail |
| Goal | View the photo enlarged, read its caption and context, navigate adjacent photos |
| Primary message | A single photograph, presented large, with its caption, location, and date |
| Primary CTA | Next / Prev photo, Close (returns focus to the triggering thumbnail) |
| Secondary CTA | None (share deferred to V1+) |
| Static / Dynamic | Dynamic (single photo) |
| SEO intent | Informational / long-tail (photo-specific title + location) |
| Status | review |

## Header

- Brand link (logo): "[Photographer name]" → /
- Nav links: Gallery, About, Contact

## Breadcrumb

- Home > Gallery > [Category] > [Photo title] (current page, not a link)

## Lightbox controls

- Close button: Close ×
- Previous button: ← Previous (disabled on first photo in sequence)
- Next button: Next → (disabled on last photo in sequence)
- Escape also closes; focus returns to the triggering thumbnail on close

## Caption

- Heading (h2): [Photo title] — descriptive title written by the photographer

## Photo metadata

- Omitted entirely when metadata is absent (no empty placeholder)
- Label / value pairs:
  - Location: [place name]
  - Date: [month year]

## Error state (adjacent photo fails to load)

- Inline message: Unable to load next photo. (Current photo remains on screen.)

## Footer

- Nav links: Home, Gallery, About, Contact
- Credit: [Photographer name] · © 2026

## SEO meta

- Title: [Photo title] — Landscape & nature photography portfolio
- Description: [Photo title]. [One-sentence description of the scene, location, and mood.] Landscape and nature photography portfolio.
- Primary keyword: [photo-specific term, e.g. mountain landscape photography]
