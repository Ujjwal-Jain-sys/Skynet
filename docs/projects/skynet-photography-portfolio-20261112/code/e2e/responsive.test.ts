import { test, expect } from "@playwright/test";

test.describe("Responsive breakpoints", () => {
  test("mobile viewport renders gallery grid", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/gallery");

    await expect(page.getByRole("heading", { name: "The gallery" })).toBeVisible();
    const thumbnails = page.getByRole("link").filter({ has: page.locator("img") });
    await expect(thumbnails.count()).toBeGreaterThan(0);
  });

  test("mobile viewport renders contact form", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/contact");

    await expect(page.getByLabel("Your name (required)")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  });

  test("mobile viewport renders home page hero", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Quiet light. Wide horizons." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Enter gallery" })).toBeVisible();
  });

  test("tablet viewport renders gallery and photo detail", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/gallery");
    await expect(page.getByRole("grid", { name: "Photo gallery" })).toBeVisible();

    await page.getByRole("link", { name: "Mountain Ridge at Dawn" }).click();
    await expect(page.getByRole("heading", { name: "Mountain Ridge at Dawn" })).toBeVisible();
  });
});
