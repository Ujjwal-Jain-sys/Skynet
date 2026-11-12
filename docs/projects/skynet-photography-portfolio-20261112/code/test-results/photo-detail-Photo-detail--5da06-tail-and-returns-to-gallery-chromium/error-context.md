# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: photo-detail.test.ts >> Photo detail / lightbox (Flow 3 & 4, US-03 & US-04) >> Escape key closes photo detail and returns to gallery
- Location: e2e/photo-detail.test.ts:51:3

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "/photo/"
Received string:    "http://localhost:3000/gallery"
```

# Page snapshot

```yaml
- generic [ref=e1]:
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
    - generic [active] [ref=e11]:
      - navigation "Breadcrumb" [ref=e12]:
        - list [ref=e13]:
          - listitem [ref=e14]:
            - link "Home" [ref=e15] [cursor=pointer]:
              - /url: /
            - generic [aria-hidden] [ref=e16]: ">"
          - listitem [ref=e17]:
            - link "Gallery" [ref=e18] [cursor=pointer]:
              - /url: /gallery
            - generic [aria-hidden] [ref=e19]: ">"
          - listitem [ref=e20]:
            - link "Mountains" [ref=e21] [cursor=pointer]:
              - /url: /gallery/mountains
            - generic [aria-hidden] [ref=e22]: ">"
          - listitem [ref=e23]:
            - generic [ref=e24]: Mountain Ridge at Dawn
      - generic [ref=e25]:
        - generic [ref=e26]:
          - button "Close" [ref=e27] [cursor=pointer]
          - generic [ref=e31]:
            - button "Previous photo" [disabled]:
              - generic [aria-hidden]: ←
              - text: Previous
            - button "Next photo" [ref=e32] [cursor=pointer]:
              - text: Next
              - generic [aria-hidden] [ref=e33]: →
        - img "Mountain Ridge at Dawn. First light on the ridge, before the wind rises." [ref=e36]
        - heading "Mountain Ridge at Dawn" [level=2] [ref=e37]
        - generic [ref=e38]:
          - generic [ref=e39]:
            - generic [ref=e40]: "Location:"
            - generic [ref=e41]: The Cascades
          - generic [ref=e42]: "|"
          - generic [ref=e43]:
            - generic [ref=e44]: "Date:"
            - generic [ref=e45]: September 2025
  - contentinfo [ref=e46]:
    - navigation "Footer navigation" [ref=e47]:
      - link "Home" [ref=e48] [cursor=pointer]:
        - /url: /
      - link "Gallery" [ref=e49] [cursor=pointer]:
        - /url: /gallery
      - link "About" [ref=e50] [cursor=pointer]:
        - /url: /about
      - link "Contact" [ref=e51] [cursor=pointer]:
        - /url: /contact
    - paragraph [ref=e52]: "[Photographer name] · © 2026"
  - alert [ref=e53]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Photo detail / lightbox (Flow 3 & 4, US-03 & US-04)", () => {
  4  |   test("displays photo enlarged with caption and metadata", async ({ page }) => {
  5  |     await page.goto("/photo/mountain-ridge-dawn");
  6  | 
  7  |     await expect(page.getByRole("heading", { name: "Mountain Ridge at Dawn" })).toBeVisible();
  8  |     await expect(
  9  |       page.getByAltText("Mountain Ridge at Dawn. First light on the ridge, before the wind rises.")
  10 |     ).toBeVisible();
  11 |     await expect(page.getByText("The Cascades")).toBeVisible();
  12 |     await expect(page.getByText("September 2025")).toBeVisible();
  13 |   });
  14 | 
  15 |   test("Next control navigates to next photo in global sort order", async ({ page }) => {
  16 |     await page.goto("/photo/mountain-ridge-dawn");
  17 | 
  18 |     // PUBLISHED_PHOTOS sorted globally by sort_order: mountain-ridge-dawn (index 0)
  19 |     // → redwood-canopy (index 1)
  20 |     await page.getByRole("button", { name: "Next photo" }).click();
  21 |     await expect(page).toHaveURL(/.*\/photo\/redwood-canopy/);
  22 |     await expect(page.getByRole("heading", { name: "Redwood Canopy" })).toBeVisible();
  23 |   });
  24 | 
  25 |   test("Previous control navigates to previous photo", async ({ page }) => {
  26 |     await page.goto("/photo/sunset-ridge");
  27 | 
  28 |     // sunset-ridge (index 3) → previous is ocean-cliff (index 2)
  29 |     await page.getByRole("button", { name: "Previous photo" }).click();
  30 |     await expect(page).toHaveURL(/.*\/photo\/ocean-cliff/);
  31 |   });
  32 | 
  33 |   test("Previous is disabled on first photo, Next disabled on last", async ({ page }) => {
  34 |     // First photo: mountain-ridge-dawn (index 0)
  35 |     await page.goto("/photo/mountain-ridge-dawn");
  36 |     await expect(page.getByRole("button", { name: "Previous photo" })).toBeDisabled();
  37 | 
  38 |     // Last photo: dawn-mountains (index 15)
  39 |     await page.goto("/photo/dawn-mountains");
  40 |     await expect(page.getByRole("button", { name: "Next photo" })).toBeDisabled();
  41 |   });
  42 | 
  43 |   test("Close control returns to gallery", async ({ page }) => {
  44 |     await page.goto("/gallery");
  45 |     await page.getByRole("link", { name: "Mountain Ridge at Dawn" }).click();
  46 | 
  47 |     await page.getByRole("button", { name: "Close" }).click();
  48 |     await expect(page).toHaveURL("/gallery");
  49 |   });
  50 | 
  51 |   test("Escape key closes photo detail and returns to gallery", async ({ page }) => {
  52 |     await page.goto("/gallery");
  53 |     await page.getByRole("link", { name: "Mountain Ridge at Dawn" }).click();
> 54 |     await expect(page.url()).toContain("/photo/");
     |                              ^ Error: expect(received).toContain(expected) // indexOf
  55 | 
  56 |     await page.keyboard.press("Escape");
  57 |     await expect(page).toHaveURL("/gallery");
  58 |   });
  59 | 
  60 |   test("arrow keys navigate adjacent photos", async ({ page }) => {
  61 |     await page.goto("/photo/mountain-ridge-dawn");
  62 | 
  63 |     // ArrowRight → redwood-canopy (index 1)
  64 |     await page.keyboard.press("ArrowRight");
  65 |     await expect(page).toHaveURL(/.*\/photo\/redwood-canopy/);
  66 | 
  67 |     // ArrowLeft → back to mountain-ridge-dawn (index 0)
  68 |     await page.keyboard.press("ArrowLeft");
  69 |     await expect(page).toHaveURL(/.*\/photo\/mountain-ridge-dawn/);
  70 |   });
  71 | });
  72 | 
```