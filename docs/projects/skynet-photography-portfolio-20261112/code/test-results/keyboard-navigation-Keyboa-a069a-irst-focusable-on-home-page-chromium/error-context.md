# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: keyboard-navigation.test.ts >> Keyboard navigation (FR-013, FR-014, NFR-001) >> skip link is first focusable on home page
- Location: e2e/keyboard-navigation.test.ts:4:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "skip-link"
Received: null
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to content" [active] [ref=e2] [cursor=pointer]:
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
  3  | test.describe("Keyboard navigation (FR-013, FR-014, NFR-001)", () => {
  4  |   test("skip link is first focusable on home page", async ({ page }) => {
  5  |     await page.goto("/");
  6  | 
  7  |     await page.keyboard.press("Tab");
  8  |     const activeId = await page.evaluate(() => document.activeElement?.getAttribute("id"));
> 9  |     expect(activeId).toBe("skip-link");
     |                      ^ Error: expect(received).toBe(expected) // Object.is equality
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
  23 |     expect(activeHref).toContain("/photo/");
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