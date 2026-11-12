import { test, expect } from "@playwright/test";

test.describe("Photo detail / lightbox (Flow 3 & 4, US-03 & US-04)", () => {
  test("displays photo enlarged with caption and metadata", async ({ page }) => {
    await page.goto("/photo/mountain-ridge-dawn");

    await expect(page.getByRole("heading", { name: "Mountain Ridge at Dawn" })).toBeVisible();
    await expect(
      page.getByAltText("Mountain Ridge at Dawn. First light on the ridge, before the wind rises.")
    ).toBeVisible();
    await expect(page.getByText("The Cascades")).toBeVisible();
    await expect(page.getByText("September 2025")).toBeVisible();
  });

  test("Next control navigates to next photo in global sort order", async ({ page }) => {
    await page.goto("/photo/mountain-ridge-dawn");

    // PUBLISHED_PHOTOS sorted globally by sort_order: mountain-ridge-dawn (index 0)
    // → redwood-canopy (index 1)
    await page.getByRole("button", { name: "Next photo" }).click();
    await expect(page).toHaveURL(/.*\/photo\/redwood-canopy/);
    await expect(page.getByRole("heading", { name: "Redwood Canopy" })).toBeVisible();
  });

  test("Previous control navigates to previous photo", async ({ page }) => {
    await page.goto("/photo/sunset-ridge");

    // sunset-ridge (index 3) → previous is ocean-cliff (index 2)
    await page.getByRole("button", { name: "Previous photo" }).click();
    await expect(page).toHaveURL(/.*\/photo\/ocean-cliff/);
  });

  test("Previous is disabled on first photo, Next disabled on last", async ({ page }) => {
    // First photo: mountain-ridge-dawn (index 0)
    await page.goto("/photo/mountain-ridge-dawn");
    await expect(page.getByRole("button", { name: "Previous photo" })).toBeDisabled();

    // Last photo: dawn-mountains (index 15)
    await page.goto("/photo/dawn-mountains");
    await expect(page.getByRole("button", { name: "Next photo" })).toBeDisabled();
  });

  test("Close control returns to gallery", async ({ page }) => {
    await page.goto("/gallery");
    await page.getByRole("link", { name: "Mountain Ridge at Dawn" }).click();

    await page.getByRole("button", { name: "Close" }).click();
    await expect(page).toHaveURL("/gallery");
  });

  test("Escape key closes photo detail and returns to gallery", async ({ page }) => {
    await page.goto("/gallery");
    await page.getByRole("link", { name: "Mountain Ridge at Dawn" }).click();
    await expect(page.url()).toContain("/photo/");

    await page.keyboard.press("Escape");
    await expect(page).toHaveURL("/gallery");
  });

  test("arrow keys navigate adjacent photos", async ({ page }) => {
    await page.goto("/photo/mountain-ridge-dawn");

    // ArrowRight → redwood-canopy (index 1)
    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveURL(/.*\/photo\/redwood-canopy/);

    // ArrowLeft → back to mountain-ridge-dawn (index 0)
    await page.keyboard.press("ArrowLeft");
    await expect(page).toHaveURL(/.*\/photo\/mountain-ridge-dawn/);
  });
});
