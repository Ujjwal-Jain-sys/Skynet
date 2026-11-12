# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: photo-detail.test.ts >> Photo detail / lightbox (Flow 3 & 4, US-03 & US-04) >> Close control returns to gallery
- Location: e2e/photo-detail.test.ts:43:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:3000/gallery"
Received: "http://localhost:3000/gallery/mountains"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://localhost:3000/gallery/mountains"

```

```yaml
- link "Skip to content":
  - /url: "#main-content"
- banner:
  - link "Home":
    - /url: /
    - text: "[Photographer name]"
  - navigation "Primary navigation":
    - link "Gallery":
      - /url: /gallery
    - link "About":
      - /url: /about
    - link "Contact":
      - /url: /contact
- main:
  - navigation "Breadcrumb":
    - list:
      - listitem:
        - link "Home":
          - /url: /
      - listitem:
        - link "Gallery":
          - /url: /gallery
      - listitem: Mountains
  - heading "Mountains" [level=1]
  - paragraph: High ridges, alpine light, and quiet summits photographed at dawn and dusk.
  - text: Filter by category
  - group "Filter by category":
    - button "Show all categories": All
    - button "Filter by Mountains, active" [pressed]: Mountains
    - button "Filter by Forests": Forests
    - button "Filter by Water": Water
    - button "Filter by Skies": Skies
  - heading "Mountains" [level=2]
  - grid "Photo gallery":
    - article:
      - link "Mountain Ridge at Dawn":
        - /url: /photo/mountain-ridge-dawn
        - img "Mountain Ridge at Dawn. First light on the ridge, before the wind rises."
    - article:
      - link "Alpine Lake Mirror":
        - /url: /photo/alpine-lake-mirror
        - img "Alpine Lake Mirror. A still mountain lake reflecting the morning sky."
    - article:
      - link "Snow-Capped Peak":
        - /url: /photo/snow-capped-peak
        - img "Snow-Capped Peak. Winter light holding on the summit."
    - article:
      - link "High Meadow":
        - /url: /photo/high-meadow
        - img "High Meadow. Summer grasses beneath a broad sky."
- contentinfo:
  - navigation "Footer navigation":
    - link "Home":
      - /url: /
    - link "Gallery":
      - /url: /gallery
    - link "About":
      - /url: /about
    - link "Contact":
      - /url: /contact
  - paragraph: "[Photographer name] · © 2026"
- alert
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
> 48 |     await expect(page).toHaveURL("/gallery");
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  49 |   });
  50 | 
  51 |   test("Escape key closes photo detail and returns to gallery", async ({ page }) => {
  52 |     await page.goto("/gallery");
  53 |     await page.getByRole("link", { name: "Mountain Ridge at Dawn" }).click();
  54 |     await expect(page.url()).toContain("/photo/");
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