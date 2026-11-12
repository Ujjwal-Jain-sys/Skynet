# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: about-page.test.ts >> About page (Flow 5, US-05) >> renders biography text and portrait image
- Location: e2e/about-page.test.ts:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'About' })
Expected: visible
Error: strict mode violation: getByRole('heading', { name: 'About' }) resolved to 3 elements:
    1) <h1 class="text-h2 text-text">About</h1> aka getByRole('heading', { name: 'About', exact: true })
    2) <h2 class="text-h3 text-text">About the photographer</h2> aka getByRole('heading', { name: 'About the photographer' })
    3) <h2 class="text-h2 text-text">Have a question about an image?</h2> aka getByRole('heading', { name: 'Have a question about an' })

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'About' }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'About' })

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
      - generic [ref=e13]:
        - generic:
          - img "Portrait of [Photographer name]"
        - paragraph [ref=e14]: Portrait of [Photographer name]
      - generic [ref=e15]:
        - heading "About" [level=1] [ref=e16]
        - heading "About the photographer" [level=2] [ref=e17]
        - paragraph [ref=e18]: "I make photographs in wild, quiet places — mountains, forests, water, and skies. My approach is calm and editorial: I wait for the light, I watch the weather, and I make the image when the place reveals itself."
        - paragraph [ref=e19]: This site is a showcase of that work. There is no shop and no checkout. If an image speaks to you, or you would like to discuss licensing or a commission, I would be glad to hear from you.
    - generic [ref=e21]:
      - heading "Have a question about an image?" [level=2] [ref=e22]
      - paragraph [ref=e23]: Licensing, commissions, and image questions are welcome.
      - link [ref=e24] [cursor=pointer]:
        - /url: /contact
        - button "Contact me" [ref=e25]
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
  3  | test.describe("About page (Flow 5, US-05)", () => {
  4  |   test("renders biography text and portrait image", async ({ page }) => {
  5  |     await page.goto("/about");
  6  | 
> 7  |     await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
     |                                                                ^ Error: expect(locator).toBeVisible() failed
  8  |     await expect(
  9  |       page.getByText("I make photographs in wild, quiet places")
  10 |     ).toBeVisible();
  11 |     await expect(page.getByAltText("Portrait of [Photographer name]")).toBeVisible();
  12 |   });
  13 | 
  14 |   test("contact CTA navigates to contact page", async ({ page }) => {
  15 |     await page.goto("/about");
  16 | 
  17 |     await page.getByRole("link", { name: "Contact me" }).click();
  18 |     await expect(page).toHaveURL("/contact");
  19 |   });
  20 | });
  21 | 
```