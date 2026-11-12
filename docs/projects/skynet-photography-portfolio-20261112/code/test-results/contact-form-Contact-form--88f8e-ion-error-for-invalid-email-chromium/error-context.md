# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-form.test.ts >> Contact form (Flow 6, US-06 - primary conversion) >> shows inline validation error for invalid email
- Location: e2e/contact-form.test.ts:26:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Your email address (required)')

```

# Page snapshot

```yaml
- dialog "Unhandled Runtime Error" [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - navigation [ref=e7]:
          - button "previous" [disabled] [ref=e8]:
            - img "previous" [ref=e9]
          - button "next" [disabled] [ref=e11]:
            - img "next" [ref=e12]
          - generic [ref=e14]: 1 of 1 error
          - generic [ref=e15]:
            - text: Next.js (14.2.20) is outdated
            - link "(learn more)" [ref=e17] [cursor=pointer]:
              - /url: https://nextjs.org/docs/messages/version-staleness
        - button "Close" [ref=e18] [cursor=pointer]
      - heading "Unhandled Runtime Error" [level=1] [ref=e23]
      - paragraph [ref=e24]: "TypeError: Cannot read properties of null (reading 'value')"
    - generic [ref=e25]:
      - heading "Source" [level=2] [ref=e26]
      - generic [ref=e27]:
        - link "components/contact-form.tsx (56:66) @ value" [ref=e29] [cursor=pointer]
        - generic [ref=e35]: "54 | event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 55 | ) => { > 56 | setValues((prev) => ({ ...prev, [key]: event.currentTarget.value })); | ^ 57 | // Clear inline error when the user starts correcting a field. 58 | if (fieldErrors[key]) { 59 | setFieldErrors((prev) => {"
      - heading "Call Stack" [level=2] [ref=e36]
      - button "Show collapsed frames" [ref=e37] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Contact form (Flow 6, US-06 - primary conversion)", () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto("/contact");
  6  |   });
  7  | 
  8  |   test("renders form with name, email, message fields and labels", async ({ page }) => {
  9  |     await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
  10 |     await expect(page.getByLabel("Your name (required)")).toBeVisible();
  11 |     await expect(page.getByLabel("Your email address (required)")).toBeVisible();
  12 |     await expect(page.getByLabel("Your message (required)")).toBeVisible();
  13 |     await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  14 |   });
  15 | 
  16 |   test("shows inline validation errors for empty required fields", async ({ page }) => {
  17 |     await page.getByRole("button", { name: "Send message" }).click();
  18 | 
  19 |     await expect(page.getByText("Name is required.")).toBeVisible();
  20 |     await expect(page.getByText("Email is required.")).toBeVisible();
  21 |     await expect(page.getByText("Message is required.")).toBeVisible();
  22 |     // Form not submitted - still on contact page
  23 |     await expect(page).toHaveURL("/contact");
  24 |   });
  25 | 
  26 |   test("shows inline validation error for invalid email", async ({ page }) => {
  27 |     await page.getByLabel("Your name (required)").fill("Ada");
> 28 |     await page.getByLabel("Your email address (required)").fill("not-an-email");
     |                                                            ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  29 |     await page.getByLabel("Your message (required)").fill("Hello");
  30 |     // Allow React to process state updates before submitting
  31 |     await page.waitForTimeout(500);
  32 |     await page.getByRole("button", { name: "Send message" }).click();
  33 | 
  34 |     await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  35 |     await expect(page).toHaveURL("/contact");
  36 |   });
  37 | 
  38 |   test("submits successfully with valid data and shows success message", async ({ page }) => {
  39 |     await page.getByLabel("Your name (required)").fill("Ada Lovelace");
  40 |     await page.getByLabel("Your email address (required)").fill("ada@example.com");
  41 |     await page.getByLabel("Your message (required)").fill("I love your mountain work.");
  42 | 
  43 |     await page.getByRole("button", { name: "Send message" }).click();
  44 | 
  45 |     await expect(page.getByRole("heading", { name: "Thanks — your message has been sent." })).toBeVisible();
  46 |     await expect(page.getByText("I will get back to you as soon as I can.")).toBeVisible();
  47 |     await expect(page.getByRole("link", { name: "Return to gallery" })).toBeVisible();
  48 |   });
  49 | 
  50 |   test("clears form fields after successful submission", async ({ page }) => {
  51 |     await page.getByLabel("Your name (required)").fill("Ada Lovelace");
  52 |     await page.getByLabel("Your email address (required)").fill("ada@example.com");
  53 |     await page.getByLabel("Your message (required)").fill("I love your mountain work.");
  54 |     await page.getByRole("button", { name: "Send message" }).click();
  55 | 
  56 |     // After success, form is replaced by success message
  57 |     await expect(page.getByLabel("Your name (required)")).not.toBeVisible();
  58 |   });
  59 | 
  60 |   test("keyboard tab order: name → email → message → submit", async ({ page }) => {
  61 |     await page.getByLabel("Your name (required)").focus();
  62 |     await expect(page.getByLabel("Your name (required)")).toBeFocused();
  63 | 
  64 |     await page.keyboard.press("Tab");
  65 |     await expect(page.getByLabel("Your email address (required)")).toBeFocused();
  66 | 
  67 |     await page.keyboard.press("Tab");
  68 |     await expect(page.getByLabel("Your message (required)")).toBeFocused();
  69 | 
  70 |     await page.keyboard.press("Tab");
  71 |     await expect(page.getByRole("button", { name: "Send message" })).toBeFocused();
  72 |   });
  73 | 
  74 |   test("focus moves to first invalid field on failed submit", async ({ page }) => {
  75 |     // Fill email and message but leave name empty
  76 |     await page.getByLabel("Your email address (required)").fill("ada@example.com");
  77 |     await page.getByLabel("Your message (required)").fill("Hello");
  78 |     await page.getByRole("button", { name: "Send message" }).click();
  79 | 
  80 |     await expect(page.getByLabel("Your name (required)")).toBeFocused();
  81 |   });
  82 | 
  83 |   test("button shows loading state during submission", async ({ page }) => {
  84 |     await page.getByLabel("Your name (required)").fill("Ada Lovelace");
  85 |     await page.getByLabel("Your email address (required)").fill("ada@example.com");
  86 |     await page.getByLabel("Your message (required)").fill("I love your mountain work.");
  87 | 
  88 |     const submitButton = page.getByRole("button", { name: "Send message" });
  89 |     await submitButton.click();
  90 | 
  91 |     // Button should be disabled/busy during submission
  92 |     await expect(submitButton).toBeDisabled();
  93 |   });
  94 | });
  95 | 
```