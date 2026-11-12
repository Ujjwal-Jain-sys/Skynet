import { test, expect } from "@playwright/test";

test.describe("404 page (Flow 7)", () => {
  test("renders error message with recovery links", async ({ page }) => {
    await page.goto("/404");

    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(page.getByText("The page you're looking for does not exist.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Return home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Go to gallery" })).toBeVisible();
  });

  test("recovery links navigate to working pages", async ({ page }) => {
    await page.goto("/404");

    await page.getByRole("link", { name: "Return home" }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Quiet light. Wide horizons." })).toBeVisible();
  });
});
