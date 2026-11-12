# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: keyboard-navigation.test.ts >> Keyboard navigation (FR-013, FR-014, NFR-001) >> gallery thumbnail opens photo detail with Enter key
- Location: e2e/keyboard-navigation.test.ts:12:3

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "/photo/"
Received string:    "http://localhost:3000/"
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Home" [active] [ref=e5] [cursor=pointer]:
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
  3  | test.describe("Keyboard navigation (FR-013, FR-014, NFR-001)", () => {
  4  |   test("skip link is first focusable on home page", async ({ page }) => {
  5  |     await page.goto("/");
  6  | 
  7  |     await page.keyboard.press("Tab");
  8  |     const activeId = await page.evaluate(() => document.activeElement?.getAttribute("id"));
  9  |     expect(activeId).toBe("skip-link");
  10 |   });
  11 | 
  12 |   test("gallery thumbnail opens photo detail with Enter key", async ({ page }) => {
  13 |     await page.goto("/gallery");
  14 | 
  15 |     // Tab to first thumbnail link
  16 |     await page.keyboard.press("Tab");
  17 |     await page.keyboard.press("Tab");
  18 | 
  19 |     const activeHref = await page.evaluate(() => {
  20 |       const el = document.activeElement as HTMLAnchorElement | null;
  21 |       return el?.href;
  22 |     });
> 23 |     expect(activeHref).toContain("/photo/");
     |                        ^ Error: expect(received).toContain(expected) // indexOf
  24 | 
  25 |     // Enter activates the link
  26 |     await page.keyboard.press("Enter");
  27 |     await expect(page.url()).toContain("/photo/");
  28 |   });
  29 | 
  30 |   test("photo detail Close button is keyboard operable", async ({ page }) => {
  31 |     await page.goto("/photo/mountain-ridge-dawn");
  32 | 
  33 |     await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
  34 | 
  35 |     // Tab to focus the Close button
  36 |     await page.keyboard.press("Tab");
  37 |     await page.keyboard.press("Tab");
  38 | 
  39 |     const activeAriaLabel = await page.evaluate(() => {
  40 |       const el = document.activeElement as HTMLElement | null;
  41 |       return el?.getAttribute("aria-label");
  42 |     });
  43 |     expect(activeAriaLabel).toBe("Close");
  44 |   });
  45 | 
  46 |   test("contact form tab order: name → email → message → submit", async ({ page }) => {
  47 |     await page.goto("/contact");
  48 | 
  49 |     await page.getByLabel("Your name (required)").focus();
  50 |     await expect(page.getByLabel("Your name (required)")).toBeFocused();
  51 | 
  52 |     await page.keyboard.press("Tab");
  53 |     await expect(page.getByLabel("Your email address (required)")).toBeFocused();
  54 | 
  55 |     await page.keyboard.press("Tab");
  56 |     await expect(page.getByLabel("Your message (required)")).toBeFocused();
  57 | 
  58 |     await page.keyboard.press("Tab");
  59 |     await expect(page.getByRole("button", { name: "Send message" })).toBeFocused();
  60 |   });
  61 | });
  62 | 
```