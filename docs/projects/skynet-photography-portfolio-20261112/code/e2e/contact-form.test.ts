import { test, expect } from "@playwright/test";

test.describe("Contact form (Flow 6, US-06 - primary conversion)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("renders form with name, email, message fields and labels", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
    await expect(page.getByLabel("Your name (required)")).toBeVisible();
    await expect(page.getByLabel("Your email address (required)")).toBeVisible();
    await expect(page.getByLabel("Your message (required)")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  });

  test("shows inline validation errors for empty required fields", async ({ page }) => {
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Name is required.")).toBeVisible();
    await expect(page.getByText("Email is required.")).toBeVisible();
    await expect(page.getByText("Message is required.")).toBeVisible();
    // Form not submitted - still on contact page
    await expect(page).toHaveURL("/contact");
  });

  test("shows inline validation error for invalid email", async ({ page }) => {
    await page.getByLabel("Your name (required)").fill("Ada");
    await page.getByLabel("Your email address (required)").fill("not-an-email");
    await page.getByLabel("Your message (required)").fill("Hello");
    // Allow React to process state updates before submitting
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(page).toHaveURL("/contact");
  });

  test("submits successfully with valid data and shows success message", async ({ page }) => {
    await page.getByLabel("Your name (required)").fill("Ada Lovelace");
    await page.getByLabel("Your email address (required)").fill("ada@example.com");
    await page.getByLabel("Your message (required)").fill("I love your mountain work.");

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("heading", { name: "Thanks — your message has been sent." })).toBeVisible();
    await expect(page.getByText("I will get back to you as soon as I can.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Return to gallery" })).toBeVisible();
  });

  test("clears form fields after successful submission", async ({ page }) => {
    await page.getByLabel("Your name (required)").fill("Ada Lovelace");
    await page.getByLabel("Your email address (required)").fill("ada@example.com");
    await page.getByLabel("Your message (required)").fill("I love your mountain work.");
    await page.getByRole("button", { name: "Send message" }).click();

    // After success, form is replaced by success message
    await expect(page.getByLabel("Your name (required)")).not.toBeVisible();
  });

  test("keyboard tab order: name → email → message → submit", async ({ page }) => {
    await page.getByLabel("Your name (required)").focus();
    await expect(page.getByLabel("Your name (required)")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Your email address (required)")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Your message (required)")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Send message" })).toBeFocused();
  });

  test("focus moves to first invalid field on failed submit", async ({ page }) => {
    // Fill email and message but leave name empty
    await page.getByLabel("Your email address (required)").fill("ada@example.com");
    await page.getByLabel("Your message (required)").fill("Hello");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByLabel("Your name (required)")).toBeFocused();
  });

  test("button shows loading state during submission", async ({ page }) => {
    await page.getByLabel("Your name (required)").fill("Ada Lovelace");
    await page.getByLabel("Your email address (required)").fill("ada@example.com");
    await page.getByLabel("Your message (required)").fill("I love your mountain work.");

    const submitButton = page.getByRole("button", { name: "Send message" });
    await submitButton.click();

    // Button should be disabled/busy during submission
    await expect(submitButton).toBeDisabled();
  });
});
