# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gallery.test.ts >> Gallery overview (Flow 2, US-02) >> category gallery shows only photos in that category
- Location: e2e/gallery.test.ts:38:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Mountains' })
Expected: visible
Error: strict mode violation: getByRole('heading', { name: 'Mountains' }) resolved to 2 elements:
    1) <h1 class="text-h2 text-text">Mountains</h1> aka locator('h1')
    2) <h2 class="text-h2 text-text mb-8">Mountains</h2> aka locator('h2')

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'Mountains' }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Mountains' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Home" [ref=e5] [cursor=pointer]:
        - /url: /
        - text: "[Photographer name]"
      - navigation "Primary navigation" [ref=e6]:
        - link "Gallery" [ref=e7] [cursor=pointer]:
          - /url: /gallery
        - link "About" [ref=e8] [cursor=pointer]:
          - /url: /about
        - link "Contact" [ref=e9] [cursor=pointer]:
          - /url: /contact
  - main [ref=e10]:
    - navigation "Breadcrumb" [ref=e11]:
      - list [ref=e12]:
        - listitem [ref=e13]:
          - link "Home" [ref=e14] [cursor=pointer]:
            - /url: /
          - generic [aria-hidden] [ref=e15]: ">"
        - listitem [ref=e16]:
          - link "Gallery" [ref=e17] [cursor=pointer]:
            - /url: /gallery
          - generic [aria-hidden] [ref=e18]: ">"
        - listitem [ref=e19]:
          - generic [ref=e20]: Mountains
    - generic [ref=e22]:
      - heading "Mountains" [level=1] [ref=e23]
      - paragraph [ref=e24]: High ridges, alpine light, and quiet summits photographed at dawn and dusk.
      - generic [ref=e25]:
        - generic [ref=e26]: Filter by category
        - group "Filter by category" [ref=e27]:
          - button "Show all categories" [ref=e28] [cursor=pointer]: All
          - button "Filter by Mountains, active" [pressed] [ref=e29] [cursor=pointer]: Mountains
          - button "Filter by Forests" [ref=e30] [cursor=pointer]: Forests
          - button "Filter by Water" [ref=e31] [cursor=pointer]: Water
          - button "Filter by Skies" [ref=e32] [cursor=pointer]: Skies
      - generic [ref=e33]:
        - heading "Mountains" [level=2] [ref=e34]
        - grid "Photo gallery" [ref=e35]:
          - article [ref=e36]:
            - link "Mountain Ridge at Dawn" [ref=e37] [cursor=pointer]:
              - /url: /photo/mountain-ridge-dawn
              - img "Mountain Ridge at Dawn. First light on the ridge, before the wind rises." [ref=e39]
          - article [ref=e40]:
            - link "Alpine Lake Mirror" [ref=e41] [cursor=pointer]:
              - /url: /photo/alpine-lake-mirror
              - img "Alpine Lake Mirror. A still mountain lake reflecting the morning sky." [ref=e43]
          - article [ref=e44]:
            - link "Snow-Capped Peak" [ref=e45] [cursor=pointer]:
              - /url: /photo/snow-capped-peak
              - img "Snow-Capped Peak. Winter light holding on the summit." [ref=e47]
          - article [ref=e48]:
            - link "High Meadow" [ref=e49] [cursor=pointer]:
              - /url: /photo/high-meadow
              - img "High Meadow. Summer grasses beneath a broad sky." [ref=e51]
  - contentinfo [ref=e52]:
    - navigation "Footer navigation" [ref=e53]:
      - link "Home" [ref=e54] [cursor=pointer]:
        - /url: /
      - link "Gallery" [ref=e55] [cursor=pointer]:
        - /url: /gallery
      - link "About" [ref=e56] [cursor=pointer]:
        - /url: /about
      - link "Contact" [ref=e57] [cursor=pointer]:
        - /url: /contact
    - paragraph [ref=e58]: "[Photographer name] · © 2026"
  - alert [ref=e59]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Gallery overview (Flow 2, US-02)", () => {
  4  |   test("renders thumbnail grid with published photos", async ({ page }) => {
  5  |     await page.goto("/gallery");
  6  | 
  7  |     await expect(page.getByRole("heading", { name: "The gallery" })).toBeVisible();
  8  | 
  9  |     // Grid is a role="grid"
  10 |     const grid = page.getByRole("grid", { name: "Photo gallery" });
  11 |     await expect(grid).toBeVisible();
  12 | 
  13 |     // Thumbnails link to photo detail pages
  14 |     const thumbnails = page.getByRole("link").filter({ has: page.locator("img") });
  15 |     await expect(thumbnails.count()).toBeGreaterThan(0);
  16 |     await expect(thumbnails.count()).toBeLessThanOrEqual(24);
  17 |   });
  18 | 
  19 |   test("each thumbnail links to photo detail page", async ({ page }) => {
  20 |     await page.goto("/gallery");
  21 | 
  22 |     const firstThumbnail = page.getByRole("link", { name: "Mountain Ridge at Dawn" });
  23 |     await expect(firstThumbnail).toBeVisible();
  24 |     await firstThumbnail.click();
  25 | 
  26 |     await expect(page).toHaveURL(/.*\/photo\/mountain-ridge-dawn/);
  27 |     await expect(page.getByRole("heading", { name: "Mountain Ridge at Dawn" })).toBeVisible();
  28 |   });
  29 | 
  30 |   test("category filter pill navigates to category gallery", async ({ page }) => {
  31 |     await page.goto("/gallery");
  32 | 
  33 |     await page.getByRole("button", { name: /Filter by Mountains/ }).click();
  34 |     await expect(page).toHaveURL("/gallery/mountains");
  35 |     await expect(page.getByRole("heading", { name: "Mountains" })).toBeVisible();
  36 |   });
  37 | 
  38 |   test("category gallery shows only photos in that category", async ({ page }) => {
  39 |     await page.goto("/gallery/mountains");
  40 | 
> 41 |     await expect(page.getByRole("heading", { name: "Mountains" })).toBeVisible();
     |                                                                    ^ Error: expect(locator).toBeVisible() failed
  42 |     // Mountains has 4 photos
  43 |     const thumbnails = page.getByRole("link").filter({ has: page.locator("img") });
  44 |     await expect(thumbnails).toHaveCount(4);
  45 |   });
  46 | });
  47 | 
```