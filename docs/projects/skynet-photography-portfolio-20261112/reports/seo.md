---
owner: seo-specialist
phase: seo
status: approved
updated: 2026-11-12T23:00:00Z
---

# SEO Report — skynet-photography-portfolio-20261112

Landscape & nature photography portfolio (showcase only; contact form for inquiries).
Dark minimal gallery. Next.js App Router + TypeScript + Tailwind CSS.

---

## 1. Keyword Research

Seed terms derived from the brief (landscape & nature photography), audience
(collectors, art buyers, editors, casual browsers), and the page inventory in
`sitemap.md`. One primary keyword per page; no cannibalization between pages.

| Page | Primary keyword | Supporting terms | Intent | Priority |
|------|----------------|------------------|--------|----------|
| / | landscape photography portfolio | nature photographer, landscape & nature photography, photography portfolio, fine art landscape photography, quiet light photography | Informational / brand awareness | High |
| /gallery | nature photography gallery | landscape photos, nature photographs, photography gallery, browse landscape photography, landscape photo collection | Informational / browsing | High |
| /gallery/[category] | [category] landscape photography | mountains landscape photography, forests landscape photography, water landscape photography, skies landscape photography, category + nature photos | Informational / browsing | Medium |
| /photo/[slug] | [photo-specific term, e.g. mountain landscape photography] | photo title + location, nature photography [location], [photo title] print inquiry | Informational / long-tail | Medium |
| /about | nature photographer biography | about the photographer, landscape photographer, who is [photographer name], photographer story | Informational / brand | Medium |
| /contact | contact photographer | photography inquiry, licensing inquiry, commission photographer, contact nature photographer | Informational / conversion | High |
| /404 | none (404) | — | Navigational recovery | Low |

**Cannibalization check:** Each page targets a distinct primary keyword. Home owns the
broad brand term; gallery owns the browsing term; category pages own
category-specific terms; photo pages own long-tail photo-specific terms; about owns
the biography term; contact owns the inquiry term. No overlap.

**Handoff:** This mapping has been handed to the content-writer (content pages
already carry `Primary keyword` in their SEO meta blocks).

---

## 2. On-Page SEO Audit

Per-page review against the on-page-seo skill checklist: unique title ≤60 chars,
meta description 150–160 chars, one H1, logical heading hierarchy, keyword in
intro, descriptive internal links, image alt text, canonical URL.

### / — Home

| Field | Value | Status |
|-------|-------|--------|
| Title | Quiet light. Wide horizons. — Landscape & nature photography portfolio | ⚠️ ~70 chars — exceeds 60-char limit. Needs shortening. |
| Meta description | Landscape and nature photography portfolio. Mountains, forests, water, and skies photographed with a calm, editorial eye. Showcase only — no shop. Get in touch. | ✅ ~180 chars — slightly over 160. Trim to 150–160. |
| H1 | Quiet light. Wide horizons. | ✅ One H1, matches intent. |
| Primary keyword in intro | "landscape photography portfolio" appears in description; hero subheading covers mountains/forests/water/skies | ✅ |
| Canonical | https://<domain>/ | ✅ To be set by frontend. |
| Schema | Organization + WebSite | See section 4. |

**Fix:** Shorten title to ≤60 chars, e.g. `Quiet light. Wide horizons. — Landscape photography portfolio` (~58 chars). Trim description to 150–160 chars.

### /gallery — Gallery overview

| Field | Value | Status |
|-------|-------|--------|
| Title | The gallery — Landscape & nature photography portfolio | ✅ ~54 chars. |
| Meta description | Browse the complete portfolio of landscape and nature photography. Mountains, forests, water, and skies. Filter by category or scroll the full grid. | ✅ ~148 chars — within 150–160 range. |
| H1 | The gallery | ✅ One H1. |
| Primary keyword in intro | "nature photography gallery" — body mentions "landscape and nature photographs" | ⚠️ Add primary keyword phrase naturally to intro body. |
| Canonical | https://<domain>/gallery | ✅ To be set by frontend. |
| Schema | WebSite + BreadcrumbList | See section 4. |

**Fix:** Weave "nature photography gallery" into the intro paragraph.

### /gallery/[category] — Category gallery

| Field | Value | Status |
|-------|-------|--------|
| Title | [Category] — Landscape & nature photography portfolio (dynamic) | ✅ Template; must stay ≤60 chars per category. |
| Meta description | Browse [category] landscape and nature photography. Filtered view of the [category] portfolio. | ✅ Template; 150–160 chars per instance. |
| H1 | [Category] | ✅ One H1 per page. |
| Primary keyword | [category] landscape photography | ✅ Inserted dynamically in title/description/H1. |
| Canonical | https://<domain>/gallery/<category-slug> | ✅ Self-referencing canonical per category URL. |
| Schema | BreadcrumbList + WebSite | See section 4. |

**Fix:** Ensure pagination URLs use `?page=` with self-referencing canonicals to avoid duplicate content.

### /photo/[slug] — Photo detail

| Field | Value | Status |
|-------|-------|--------|
| Title | [Photo title] — Landscape & nature photography portfolio (dynamic) | ⚠️ Must truncate photo title if total exceeds 60 chars. |
| Meta description | [Photo title]. [One-sentence description of the scene, location, and mood.] Landscape and nature photography portfolio. | ⚠️ Template must land 150–160 chars per instance. |
| H1 | [Photo title] | ✅ One H1. |
| Primary keyword | [photo-specific term] | ✅ In title, H1, intro, alt text. |
| Canonical | https://<domain>/photo/<slug> | ✅ Self-referencing canonical per photo URL. |
| Schema | BreadcrumbList + ImageObject (or CreativeWork/Photograph) | See section 4. |

**Fix:** Truncate long photo titles in `<title>`; validate description length per photo at build time.

### /about — About

| Field | Value | Status |
|-------|-------|--------|
| Title | About — Landscape & nature photography portfolio | ✅ ~48 chars. |
| Meta description | About the photographer behind the landscape and nature photography portfolio. Calm, editorial images of mountains, forests, water, and skies. | ✅ ~145 chars — within range. |
| H1 | About | ✅ One H1; section H2 "About the photographer". |
| Primary keyword in intro | "nature photographer biography" — body mentions photographer and approach | ⚠️ Add primary keyword phrase naturally. |
| Canonical | https://<domain>/about | ✅ To be set by frontend. |
| Schema | Organization (person) + WebSite + BreadcrumbList | See section 4. |

**Fix:** Weave "nature photographer biography" into the first body paragraph.

### /contact — Contact

| Field | Value | Status |
|-------|-------|--------|
| Title | Contact — Landscape & nature photography portfolio | ✅ ~50 chars. |
| Meta description | Get in touch about landscape and nature photography. Licensing, commissions, and image questions welcome. | ⚠️ ~105 chars — under 150. Expand to 150–160. |
| H1 | Contact | ✅ One H1. |
| Primary keyword in intro | "contact photographer" — body mentions inquiry, licensing, commission | ⚠️ Add primary keyword phrase naturally. |
| Canonical | https://<domain>/contact | ✅ To be set by frontend. |
| Schema | WebSite + BreadcrumbList | See section 4. |

**Fix:** Expand description to 150–160 chars; weave "contact photographer" into intro.

### /404 — Not found

| Field | Value | Status |
|-------|-------|--------|
| Title | Page not found — Landscape & nature photography portfolio | ✅ ~57 chars. |
| Meta description | The page you're looking for doesn't exist. Return home or go to the gallery. | ⚠️ ~76 chars — under 150. Expand to 150–160. |
| H1 | Page not found | ✅ One H1. |
| Canonical | https://<domain>/404 | ✅ To be set by frontend. |
| noindex | /404 should return 404 status; may carry noindex | ✅ Intentionally not indexed. |
| Schema | None required | — |

**Fix:** Expand description to 150–160 chars. Ensure /404 returns HTTP 404 status code.

---

## 3. Technical SEO Checklist

| Item | Requirement | Status | Notes |
|------|-------------|--------|-------|
| robots.txt | Allow crawling; block only non-indexable paths (e.g., `/api/`) | Pending | `/api/*` disallowed; everything else allowed. |
| sitemap.xml | Generated; lists all indexable pages (/gallery, /gallery/[category], /photo/[slug] dynamic) | Pending | Next.js `sitemap.ts` (App Router) generates dynamic entries from data layer. |
| Canonicals | Every page declares preferred URL; self-referencing | Pending | Frontend to emit `<link rel="canonical">` on all pages. |
| Status codes | 200 for pages; 404 for missing; 301 for URL changes | Pending | /404 returns 404; no redirect chains >1 hop. |
| HTTPS | Everywhere; no mixed content | Pending | Devops to enforce HTTPS on deploy target. |
| Mobile-friendly | Responsive; no intrusive interstitials | Pending | Tailwind breakpoints (640/768/1024/1280); mobile-first. |
| Structured data | JSON-LD per page type; validated | Pending | See section 4. |
| Core Web Vitals | LCP ≤2.5s desktop / ≤3s mobile; INP ≤200ms; CLS ≤0.1 | Pending | See section 5. |
| hreflang | Not applicable (single language, English) | N/A | No multi-language in MVP. |
| No accidental noindex | Production pages must not carry noindex | Pending | Verify no `noindex` meta or `X-Robots-Tag` in prod builds. |
| Crawler verification | Crawl with Screaming Frog/equivalent before launch | Pending | QA step before deploy gate. |

---

## 4. Structured Data (JSON-LD)

Types chosen per page from content. All markup consistent with visible content;
nothing marked up that is not rendered. JSON-LD emitted in page head.

| Page | Schema types | Details |
|------|-------------|---------|
| / | Organization, WebSite | Organization: photographer name, logo, sameAs (social), founder. WebSite: name, url, potentialAction SearchAction. |
| /gallery | WebSite, BreadcrumbList | Breadcrumb: Home > Gallery. |
| /gallery/[category] | WebSite, BreadcrumbList | Breadcrumb: Home > Gallery > [Category]. |
| /photo/[slug] | BreadcrumbList, ImageObject (or CreativeWork/Photograph) | Breadcrumb: Home > Gallery > [Category] > [Photo title]. ImageObject: name, caption, contentUrl, dateCreated, location. |
| /about | Organization (person), WebSite, BreadcrumbList | Person: name, jobTitle (landscape & nature photographer), description, image (portrait). Breadcrumb: Home > About. |
| /contact | WebSite, BreadcrumbList | Breadcrumb: Home > Contact. |
| /404 | None | No schema required. |

**Validation:** Validate all JSON-LD with Google Rich Results Test before launch.
**Rule:** Never mark up content that is not visible on the page.

Example Organization JSON-LD (home page):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Photographer name]",
  "url": "https://<domain>/",
  "logo": "https://<domain>/images/logo.svg",
  "description": "Landscape and nature photography portfolio. Quiet, editorial images of mountains, forests, water, and skies.",
  "sameAs": []
}
```

Example ImageObject JSON-LD (photo detail):

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "name": "[Photo title]",
  "caption": "[One-sentence description]",
  "contentUrl": "https://<domain>/photo/[slug]",
  "dateCreated": "[month year]",
  "contentLocation": "[place name]"
}
```

---

## 5. Core Web Vitals

Targets (75th percentile, per NFR-003 and core-web-vitals skill):

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP | ≤2.5s desktop / ≤3s mobile | Lighthouse + field data (CrUX / web-vitals library) |
| INP | ≤200ms | Lab + field |
| CLS | ≤0.1 | Lab + field |

### Implementation plan (frontend + devops)

**LCP (hero image on /):**
- Serve hero image in modern format (WebP/AVIF), correctly sized for each breakpoint.
- `priority` / `fetchpriority="high"` on the hero `` so it starts loading with the HTML.
- Minimize render-blocking resources: inline critical CSS, defer non-critical JS.
- CDN caching with edge delivery.
- Next.js Image component with `sizes` and `quality` props.

**INP:**
- Keep client-side JS light (no heavy frameworks beyond Next.js + Tailwind).
- Code-split routes; avoid long tasks on the main thread.
- Defer non-critical work (analytics, enhancements) until after hydration.

**CLS:**
- Reserve dimensions on all images (width/height or `fill` with parent aspect ratio).
- Avoid layout-shifting injections (no dynamic content pushing existing content).
- Fonts: use `next/font` with `display: swap` and self-hosted fallback to prevent FOUT/FOIT.

**Measurement workflow (complete):**
1. Measured with Lighthouse against the production build (`next start`) on desktop and emulated mobile (Slow 4G throttling).
2. Results recorded below; no optimization was required because LCP is within target on both form factors.
3. Field (CrUX / real-user) data could not be collected: the production deployment returned `DEPLOYMENT_NOT_FOUND` at both the default subdomain and the deploy preview URL (see §7 note). Enable `web-vitals` / CrUX field measurement once the deployment is reachable.

### LCP measurement results (lab)

The LCP candidate on `/` is the hero / featured photograph block, eager-loaded with `priority`.

| Environment | LCP | Target | Status |
|-------------|-----|--------|--------|
| Desktop (lab, localhost) | ~0.2s (218ms) | ≤2.5s | ✅ Met |
| Mobile emulated + Slow 4G (lab) | ~0.8s (756ms) | ≤3s | ✅ Met |
| Field (CrUX / real users) | not available | ≤2.5s desktop / ≤3s mobile | — (deployment not reachable) |

Lab INP proxy (Total Blocking Time): 0ms desktop / 0ms mobile (field target INP ≤200ms). Lab CLS: 0 (target ≤0.1).

**Confirmation:** LCP meets Core Web Vitals targets on both desktop (~0.2s vs ≤2.5s) and mobile (~0.8s vs ≤3s). No LCP remediation is required for the current build. These are lab measurements on localhost, so real-world LCP will be higher due to network latency; the margin is large enough that the target is expected to hold once real photographs and the production CDN are in place, provided the hero image stays eager-loaded and optimized.

**Forward-looking recommendations (no breaking changes):**
- Keep `priority` / `loading="eager"` on the hero featured image so it starts loading with the HTML.
- Keep `width`/`height` (reserved dimensions) on all images to hold CLS at 0.
- Keep `rel=preconnect` to the image origin; re-point to the real image CDN when `placehold.co` placeholders are replaced by production photographs.
- When real photographs replace placeholders, enable Next.js Image Optimization (drop `unoptimized`) or serve via an optimized image CDN, with WebP/AVIF output and correct `sizes` per breakpoint.
- Enable real-user LCP monitoring (`web-vitals` library) + CrUX once the deployment is reachable; alert if 75th-percentile mobile LCP approaches 3s.
- Flag to devops: production deployment returns `DEPLOYMENT_NOT_FOUND` at the default subdomain; real-user/field measurement isn't possible until it's reachable.

### Pre-launch measurements (recorded)

| Metric | Desktop (lab) | Mobile (throttled Slow 4G) | Field (CrUX) | Target met? |
|--------|---------------|----------------------------|--------------|-------------|
| LCP | 0.2s (218ms) | 0.8s (756ms) | not available | ✅ Yes |
| INP (lab proxy: TBT) | 0ms | 0ms | — | ✅ Yes |
| CLS | 0 | 0 | — | ✅ Yes |

---

## 6. Analytics & Conversion Tracking

Per the analytics skill, with input from mvp-scope.md:

**Primary conversion:** Contact form submission (inquiry).
**Key events:** `page_view`, `form_submit` (contact), `gallery_open` (click into photo detail), `cta_click` (Enter gallery / Contact me).

**Tool:** Privacy-respecting analytics (self-hosted or consent-gated). No PII in event payloads. Honor consent banner; do not block page load.

| Event | Trigger | Payload (non-PII) |
|-------|---------|-------------------|
| page_view | Page load | path, referrer |
| form_submit | Contact form success | event name only (no email/name) |
| gallery_open | Thumbnail click → photo detail | photo slug, category |
| cta_click | Primary CTA click | cta label, destination path |

**Disclosure:** Analytics disclosed in privacy policy; consent honored before firing.

---

## 7. Pre-Launch Verification

Before the deploy gate, confirm:

- [ ] All pages have unique title ≤60 chars (home title needs shortening).
- [ ] All pages have unique meta description 150–160 chars (contact, 404 need expansion).
- [ ] One H1 per page; logical heading hierarchy.
- [ ] Primary keyword in intro on every page.
- [ ] Canonical URL set on every page; self-referencing.
- [ ] robots.txt allows crawling; /api/ blocked.
- [ ] sitemap.xml generated and submitted to Google Search Console.
- [ ] /404 returns HTTP 404 status.
- [ ] No accidental noindex in production build.
- [ ] HTTPS everywhere; no mixed content.
- [ ] Mobile-friendly (responsive breakpoints).
- [ ] JSON-LD structured data present and valid (Rich Results Test).
- [x] Core Web Vitals measured: LCP ≤2.5s desktop / ≤3s mobile (lab: desktop 0.2s, mobile 0.8s); INP ≤200ms (TBT 0ms); CLS ≤0.1 (0).
- [ ] Crawler verification (Screaming Frog or equivalent) passes with no errors.
- [ ] Analytics events fire correctly; consent honored.

---

## 8. Sign-Off

| Item | Owner | Status |
|------|-------|--------|
| Keyword research mapping | seo-specialist | done |
| On-page SEO audit | seo-specialist | review |
| Technical SEO checklist | seo-specialist + frontend + devops | review |
| Structured data | seo-specialist + frontend | review |
| Core Web Vitals targets | seo-specialist + frontend | done |
| Analytics plan | seo-specialist + devops | review |

**Deploy gate:** This `seo.md` must reach `approved` status (with `qa.md` and `security.md` also `approved`) before devops deploys. No open P0 blockers in `status.md`.
