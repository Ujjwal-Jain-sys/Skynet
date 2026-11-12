# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gallery.test.ts >> Gallery overview (Flow 2, US-02) >> renders thumbnail grid with published photos
- Location: e2e/gallery.test.ts:4:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Matcher error: received value must be a number or bigint

Received has type:  object
Received has value: Promise {}
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
          - generic [ref=e17]: Gallery
    - generic [ref=e19]:
      - heading "The gallery" [level=1] [ref=e20]
      - paragraph [ref=e21]: Browse the complete portfolio of landscape and nature photographs. Use the filters to narrow by category, or scroll through the full grid.
      - generic [ref=e22]:
        - generic [ref=e23]: Filter by category
        - group "Filter by category" [ref=e24]:
          - button "Show all categories, active" [pressed] [ref=e25] [cursor=pointer]: All
          - button "Filter by Mountains" [ref=e26] [cursor=pointer]: Mountains
          - button "Filter by Forests" [ref=e27] [cursor=pointer]: Forests
          - button "Filter by Water" [ref=e28] [cursor=pointer]: Water
          - button "Filter by Skies" [ref=e29] [cursor=pointer]: Skies
      - grid "Photo gallery" [ref=e31]:
        - article [ref=e32]:
          - link "Mountain Ridge at Dawn" [ref=e33] [cursor=pointer]:
            - /url: /photo/mountain-ridge-dawn
            - img "Mountain Ridge at Dawn. First light on the ridge, before the wind rises." [ref=e35]
        - article [ref=e36]:
          - link "Redwood Canopy" [ref=e37] [cursor=pointer]:
            - /url: /photo/redwood-canopy
            - img "Redwood Canopy. Light filtering through ancient redwood." [ref=e39]
        - article [ref=e40]:
          - link "Ocean Cliff" [ref=e41] [cursor=pointer]:
            - /url: /photo/ocean-cliff
            - img "Ocean Cliff. Wave meeting rock at the continent's edge." [ref=e43]
        - article [ref=e44]:
          - link "Sunset Ridge" [ref=e45] [cursor=pointer]:
            - /url: /photo/sunset-ridge
            - img "Sunset Ridge. Daylight retreating from the western face." [ref=e47]
        - article [ref=e48]:
          - link "Alpine Lake Mirror" [ref=e49] [cursor=pointer]:
            - /url: /photo/alpine-lake-mirror
            - img "Alpine Lake Mirror. A still mountain lake reflecting the morning sky." [ref=e51]
        - article [ref=e52]:
          - link "Pine Forest Morning" [ref=e53] [cursor=pointer]:
            - /url: /photo/pine-forest-morning
            - img "Pine Forest Morning. Mist lifting from the pine needles." [ref=e55]
        - article [ref=e56]:
          - link "River Valley" [ref=e57] [cursor=pointer]:
            - /url: /photo/river-valley
            - img "River Valley. Current threading through the valley floor." [ref=e59]
        - article [ref=e60]:
          - link "Starry Sky" [ref=e61] [cursor=pointer]:
            - /url: /photo/starry-sky
            - img "Starry Sky. Stars above a dark ridge-line." [ref=e63]
        - article [ref=e64]:
          - link "Snow-Capped Peak" [ref=e65] [cursor=pointer]:
            - /url: /photo/snow-capped-peak
            - img "Snow-Capped Peak. Winter light holding on the summit." [ref=e67]
        - article [ref=e68]:
          - link "Autumn Woods" [ref=e69] [cursor=pointer]:
            - /url: /photo/autumn-woods
            - img "Autumn Woods. October light on turning leaves." [ref=e71]
        - article [ref=e72]:
          - link "Waterfall" [ref=e73] [cursor=pointer]:
            - /url: /photo/waterfall
            - img "Waterfall. Water falling in quiet season." [ref=e75]
        - article [ref=e76]:
          - link "Cloud Formation" [ref=e77] [cursor=pointer]:
            - /url: /photo/cloud-formation
            - img "Cloud Formation. Weather building over the plateau." [ref=e79]
        - article [ref=e80]:
          - link "High Meadow" [ref=e81] [cursor=pointer]:
            - /url: /photo/high-meadow
            - img "High Meadow. Summer grasses beneath a broad sky." [ref=e83]
        - article [ref=e84]:
          - link "Misty Forest" [ref=e85] [cursor=pointer]:
            - /url: /photo/misty-forest
            - img "Misty Forest. Fog holding low among the trunks." [ref=e87]
        - article [ref=e88]:
          - link "Lake at Morning" [ref=e89] [cursor=pointer]:
            - /url: /photo/lake-morning
            - img "Lake at Morning. Glass-still water beneath a pale sky." [ref=e91]
        - article [ref=e92]:
          - link "Dawn over Mountains" [ref=e93] [cursor=pointer]:
            - /url: /photo/dawn-mountains
            - img "Dawn over Mountains. First color touching the highest peaks." [ref=e95]
  - contentinfo [ref=e96]:
    - navigation "Footer navigation" [ref=e97]:
      - link "Home" [ref=e98] [cursor=pointer]:
        - /url: /
      - link "Gallery" [ref=e99] [cursor=pointer]:
        - /url: /gallery
      - link "About" [ref=e100] [cursor=pointer]:
        - /url: /about
      - link "Contact" [ref=e101] [cursor=pointer]:
        - /url: /contact
    - paragraph [ref=e102]: "[Photographer name] · © 2026"
  - alert [ref=e103]
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
> 15 |     await expect(thumbnails.count()).toBeGreaterThan(0);
     |                                      ^ Error: expect(received).toBeGreaterThan(expected)
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
  41 |     await expect(page.getByRole("heading", { name: "Mountains" })).toBeVisible();
  42 |     // Mountains has 4 photos
  43 |     const thumbnails = page.getByRole("link").filter({ has: page.locator("img") });
  44 |     await expect(thumbnails).toHaveCount(4);
  45 |   });
  46 | });
  47 | 
```