import { test, expect } from "@playwright/test";

test.describe("Keyboard navigation (FR-013, FR-014, NFR-001)", () => {
  test("skip link is first focusable on home page", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    const activeId = await page.evaluate(() => document.activeElement?.getAttribute("id"));
    expect(activeId).toBe("skip-link");
  });

  test("gallery thumbnail opens photo detail with Enter key", async ({ page }) => {
    await page.goto("/gallery");

    // Tab to first thumbnail link
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const activeHref = await page.evaluate(() => {
      const el = document.activeElement as HTMLAnchorElement | null;
      return el?.href;
    });
    expect(activeHref).toContain("/photo/");

    // Enter activates the link
    await page.keyboard.press("Enter");
    await expect(page.url()).toContain("/photo/");
  });

  test("photo detail Close button is keyboard operable", async ({ page }) => {
    await page.goto("/photo/mountain-ridge-dawn");

    await expect(page.getByRole("button", { name: "Close" })).toBeVisible();

    // Tab to focus the Close button
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const activeAriaLabel = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      return el?.getAttribute("aria-label");
    });
    expect(activeAriaLabel).toBe("Close");
  });

  test("contact form tab order: name → email → message → submit", async ({ page }) => {
    await page.goto("/contact");

    await page.getByLabel("Your name (required)").focus();
    await expect(page.getByLabel("Your name (required)")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Your email address (required)")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Your message (required)")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Send message" })).toBeFocused();
  });
});
