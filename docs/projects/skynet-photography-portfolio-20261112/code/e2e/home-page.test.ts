import { test, expect } from "@playwright/test";

test.describe("Home page (Flow 1, US-01)", () => {
  test("renders hero with value proposition and gallery CTA", async ({ page }) => {
    await page.goto("/");

    // Hero section visible
    await expect(page.getByRole("heading", { name: "Quiet light. Wide horizons." })).toBeVisible();
    await expect(
      page.getByText(
        "I photograph mountains, forests, water, and skies with a calm, editorial eye.",
      )
    ).toBeVisible();

    // CTA button linking to gallery
    const cta = page.getByRole("link", { name: "Enter gallery" });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/gallery");
  });

  test("CTA navigates to gallery overview with keyboard activation", async ({ page }) => {
    await page.goto("/");

    const cta = page.getByRole("link", { name: "Enter gallery" });
    await cta.focus();
    await cta.press("Enter");

    await expect(page).toHaveURL("/gallery");
    await expect(page.getByRole("heading", { name: "The gallery" })).toBeVisible();
  });

  test("header navigation links work", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();

    await page.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL("/contact");
  });
});
