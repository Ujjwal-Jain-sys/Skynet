# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home-page.test.ts >> Home page (Flow 1, US-01) >> header navigation links work
- Location: e2e/home-page.test.ts:32:3

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'About' }) resolved to 2 elements:
    1) <a href="/about" class="text-sm font-medium transition-colors duration-200 ease-standard text-text-muted hover:text-text">About</a> aka getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'About' })
    2) <a href="/about" class="transition-colors duration-200 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:rounded-sm focus-visible:px-2 focus-visible:py-1 text-text-muted hover:text-text">About</a> aka getByRole('navigation', { name: 'Footer navigation' }).getByRole('link', { name: 'About' })

Call log:
  - waiting for getByRole('link', { name: 'About' })

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
    - generic [ref=e12]:
      - heading "Landscape & nature photography" [level=6] [ref=e13]
      - heading "Quiet light. Wide horizons." [level=1] [ref=e14]
      - paragraph [ref=e15]: I photograph mountains, forests, water, and skies with a calm, editorial eye. This is a showcase of the work — not a shop. If an image speaks to you, I welcome your inquiry.
      - link [ref=e16] [cursor=pointer]:
        - /url: /gallery
        - button "Enter gallery" [ref=e17]
    - generic [ref=e21]:
      - generic:
        - img "Mountain Ridge at Dawn. First light on the ridge, before the wind rises."
    - generic [ref=e23]:
      - heading "About the work" [level=2] [ref=e24]
      - paragraph [ref=e25]: Each photograph is made in the field, waiting for light to settle on the land. The images are presented as they were seen — quiet, unhurried, and true to the place.
      - paragraph [ref=e26]: No prints are sold here. If you would like to license an image or discuss a commission, get in touch.
  - contentinfo [ref=e27]:
    - navigation "Footer navigation" [ref=e28]:
      - link "Home" [ref=e29] [cursor=pointer]:
        - /url: /
      - link "Gallery" [ref=e30] [cursor=pointer]:
        - /url: /gallery
      - link "About" [ref=e31] [cursor=pointer]:
        - /url: /about
      - link "Contact" [ref=e32] [cursor=pointer]:
        - /url: /contact
    - paragraph [ref=e33]: "[Photographer name] · © 2026"
  - alert [ref=e34]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Home page (Flow 1, US-01)", () => {
  4  |   test("renders hero with value proposition and gallery CTA", async ({ page }) => {
  5  |     await page.goto("/");
  6  | 
  7  |     // Hero section visible
  8  |     await expect(page.getByRole("heading", { name: "Quiet light. Wide horizons." })).toBeVisible();
  9  |     await expect(
  10 |       page.getByText(
  11 |         "I photograph mountains, forests, water, and skies with a calm, editorial eye.",
  12 |       )
  13 |     ).toBeVisible();
  14 | 
  15 |     // CTA button linking to gallery
  16 |     const cta = page.getByRole("link", { name: "Enter gallery" });
  17 |     await expect(cta).toBeVisible();
  18 |     await expect(cta).toHaveAttribute("href", "/gallery");
  19 |   });
  20 | 
  21 |   test("CTA navigates to gallery overview with keyboard activation", async ({ page }) => {
  22 |     await page.goto("/");
  23 | 
  24 |     const cta = page.getByRole("link", { name: "Enter gallery" });
  25 |     await cta.focus();
  26 |     await cta.press("Enter");
  27 | 
  28 |     await expect(page).toHaveURL("/gallery");
  29 |     await expect(page.getByRole("heading", { name: "The gallery" })).toBeVisible();
  30 |   });
  31 | 
  32 |   test("header navigation links work", async ({ page }) => {
  33 |     await page.goto("/");
  34 | 
> 35 |     await page.getByRole("link", { name: "About" }).click();
     |                                                     ^ Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'About' }) resolved to 2 elements:
  36 |     await expect(page).toHaveURL("/about");
  37 |     await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
  38 | 
  39 |     await page.getByRole("link", { name: "Contact" }).click();
  40 |     await expect(page).toHaveURL("/contact");
  41 |   });
  42 | });
  43 | 
```