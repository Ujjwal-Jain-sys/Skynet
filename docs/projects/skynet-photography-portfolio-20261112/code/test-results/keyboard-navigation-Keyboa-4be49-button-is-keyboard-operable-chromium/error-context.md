# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: keyboard-navigation.test.ts >> Keyboard navigation (FR-013, FR-014, NFR-001) >> photo detail Close button is keyboard operable
- Location: e2e/keyboard-navigation.test.ts:30:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Close"
Received: "Home"
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
    - generic [ref=e11]:
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
> 43 |     expect(activeAriaLabel).toBe("Close");
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
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