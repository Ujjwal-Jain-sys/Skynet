# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: not-found.test.ts >> 404 page (Flow 7) >> renders error message with recovery links
- Location: e2e/not-found.test.ts:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('The page you\'re looking for does not exist.')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('The page you\'re looking for does not exist.') with timeout 5000ms
  - waiting for getByText('The page you\'re looking for does not exist.')

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
  - heading "Page not found" [level=1]
  - paragraph: The page you are looking for does not exist.
  - link "Return home":
    - /url: /
    - button "Return home"
  - link "Go to gallery":
    - /url: /gallery
    - button "Go to gallery"
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
  3  | test.describe("404 page (Flow 7)", () => {
  4  |   test("renders error message with recovery links", async ({ page }) => {
  5  |     await page.goto("/404");
  6  | 
  7  |     await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
> 8  |     await expect(page.getByText("The page you're looking for does not exist.")).toBeVisible();
     |                                                                                 ^ Error: expect(locator).toBeVisible() failed
  9  |     await expect(page.getByRole("link", { name: "Return home" })).toBeVisible();
  10 |     await expect(page.getByRole("link", { name: "Go to gallery" })).toBeVisible();
  11 |   });
  12 | 
  13 |   test("recovery links navigate to working pages", async ({ page }) => {
  14 |     await page.goto("/404");
  15 | 
  16 |     await page.getByRole("link", { name: "Return home" }).click();
  17 |     await expect(page).toHaveURL("/");
  18 |     await expect(page.getByRole("heading", { name: "Quiet light. Wide horizons." })).toBeVisible();
  19 |   });
  20 | });
  21 | 
```