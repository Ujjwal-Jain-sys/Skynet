import { test, expect } from "@playwright/test";

test.describe("About page (Flow 5, US-05)", () => {
  test("renders biography text and portrait image", async ({ page }) => {
    await page.goto("/about");

    await expect(page.locator("h1")).toHaveText("About");
    await expect(
      page.getByText("I make photographs in wild, quiet places")
    ).toBeVisible();
    await expect(page.getByAltText("Portrait of [Photographer name]")).toBeVisible();
  });

  test("contact CTA navigates to contact page", async ({ page }) => {
    await page.goto("/about");

    await page.getByRole("link", { name: "Contact me" }).click();
    await expect(page).toHaveURL("/contact");
  });
});
