import { test, expect } from "@playwright/test";

test.describe("Gallery overview (Flow 2, US-02)", () => {
  test("renders thumbnail grid with published photos", async ({ page }) => {
    await page.goto("/gallery");

    await expect(page.getByRole("heading", { name: "The gallery" })).toBeVisible();

    // Grid is a role="grid"
    const grid = page.getByRole("grid", { name: "Photo gallery" });
    await expect(grid).toBeVisible();

    // Thumbnails link to photo detail pages
    const thumbnails = page.getByRole("link").filter({ has: page.locator("img") });
    await expect(thumbnails.count()).toBeGreaterThan(0);
    await expect(thumbnails.count()).toBeLessThanOrEqual(24);
  });

  test("each thumbnail links to photo detail page", async ({ page }) => {
    await page.goto("/gallery");

    const firstThumbnail = page.getByRole("link", { name: "Mountain Ridge at Dawn" });
    await expect(firstThumbnail).toBeVisible();
    await firstThumbnail.click();

    await expect(page).toHaveURL(/.*\/photo\/mountain-ridge-dawn/);
    await expect(page.getByRole("heading", { name: "Mountain Ridge at Dawn" })).toBeVisible();
  });

  test("category filter pill navigates to category gallery", async ({ page }) => {
    await page.goto("/gallery");

    await page.getByRole("button", { name: /Filter by Mountains/ }).click();
    await expect(page).toHaveURL("/gallery/mountains");
    await expect(page.getByRole("heading", { name: "Mountains" })).toBeVisible();
  });

  test("category gallery shows only photos in that category", async ({ page }) => {
    await page.goto("/gallery/mountains");

    await expect(page.getByRole("heading", { name: "Mountains" })).toBeVisible();
    // Mountains has 4 photos
    const thumbnails = page.getByRole("link").filter({ has: page.locator("img") });
    await expect(thumbnails).toHaveCount(4);
  });
});
