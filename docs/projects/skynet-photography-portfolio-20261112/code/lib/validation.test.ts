import { describe, it, expect } from "vitest";
import { parseContactForm } from "./validation";

function parseOrThrow(body: unknown) {
  try {
    const data = parseContactForm(body);
    return { ok: true, data };
  } catch (error: any) {
    return {
      ok: false,
      error: {
        code: error?.code ?? "unknown",
        details: error?.details ?? [],
      },
    };
  }
}

describe("parseContactForm (contact form validation)", () => {
  it("parses a valid submission and normalizes fields", () => {
    const result = parseOrThrow({
      name: "  Ada Lovelace  ",
      email: "ADA@Example.COM ",
      message: "I love your mountain work.",
      honeypot: "",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("expected success");
    expect(result.data.name).toBe("Ada Lovelace");
    expect(result.data.email).toBe("ada@example.com");
    expect(result.data.message).toBe("I love your mountain work.");
    expect(result.data.honeypot).toBe("");
  });

  it("accepts optional honeypot field", () => {
    const result = parseOrThrow({
      name: "Ada",
      email: "ada@example.com",
      message: "Hello",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("expected success");
    expect(result.data.honeypot).toBe("");
  });

  it("rejects missing name", () => {
    const result = parseOrThrow({
      name: "",
      email: "ada@example.com",
      message: "Hello",
    });
    expect(result.ok).toBe(false);
    expect(result.error.code).toBe("validation_error");
    const nameErr = result.error.details?.find((d) => d.path === "name");
    expect(nameErr?.message).toBe("Name is required.");
  });

  it("rejects missing email", () => {
    const result = parseOrThrow({
      name: "Ada",
      email: "",
      message: "Hello",
    });
    expect(result.ok).toBe(false);
    const emailErr = result.error.details?.find((d) => d.path === "email");
    expect(emailErr?.message).toBe("Email is required.");
  });

  it("rejects invalid email", () => {
    const result = parseOrThrow({
      name: "Ada",
      email: "not-an-email",
      message: "Hello",
    });
    expect(result.ok).toBe(false);
    const emailErr = result.error.details?.find((d) => d.path === "email");
    expect(emailErr?.message).toBe("Please enter a valid email address.");
  });

  it("rejects missing message", () => {
    const result = parseOrThrow({
      name: "Ada",
      email: "ada@example.com",
      message: "",
    });
    expect(result.ok).toBe(false);
    const messageErr = result.error.details?.find((d) => d.path === "message");
    expect(messageErr?.message).toBe("Message is required.");
  });

  it("rejects name over 100 chars", () => {
    const longName = "a".repeat(101);
    const result = parseOrThrow({
      name: longName,
      email: "ada@example.com",
      message: "Hello",
    });
    expect(result.ok).toBe(false);
    const nameErr = result.error.details?.find((d) => d.path === "name");
    expect(nameErr?.message).toBe("Name is too long.");
  });

  it("rejects message over 5000 chars", () => {
    const longMessage = "a".repeat(5001);
    const result = parseOrThrow({
      name: "Ada",
      email: "ada@example.com",
      message: longMessage,
    });
    expect(result.ok).toBe(false);
    const messageErr = result.error.details?.find((d) => d.path === "message");
    expect(messageErr?.message).toBe("Message is too long.");
  });

  it("rejects email over 254 chars", () => {
    const longEmail = "a".repeat(250) + "@example.com";
    const result = parseOrThrow({
      name: "Ada",
      email: longEmail,
      message: "Hello",
    });
    expect(result.ok).toBe(false);
    const emailErr = result.error.details?.find((d) => d.path === "email");
    expect(emailErr?.message).toBe("Email is too long.");
  });

  it("reports multiple field errors at once", () => {
    const result = parseOrThrow({
      name: "",
      email: "bad-email",
      message: "",
    });
    expect(result.ok).toBe(false);
    const paths = result.error.details?.map((d) => d.path);
    expect(paths).toContain("name");
    expect(paths).toContain("email");
    expect(paths).toContain("message");
  });

  it("rejects non-object body", () => {
    const result = parseOrThrow("not an object");
    expect(result.ok).toBe(false);
    expect(result.error.code).toBe("validation_error");
  });

  it("rejects null body", () => {
    const result = parseOrThrow(null);
    expect(result.ok).toBe(false);
    expect(result.error.code).toBe("validation_error");
  });
});
