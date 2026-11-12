// owner: backend, phase: backend, status: review, updated: 2026-11-12T00:00:00Z

/**
 * validation.ts — Contact form input validation and sanitization.
 *
 * Owned by backend. Implements the input-validation skill:
 *   - Validate on the server; client validation is UX only.
 *   - Allow-list (accept known-good) over deny-list.
 *   - Validate type, format, length, and range.
 *   - Reject early with a clear, non-leaky error.
 *
 * Zod is the schema validator and the single source of truth for the contact
 * form's input shape and TypeScript type.
 */

import { z, type ZodIssue } from "zod";
import { AppError } from "./error-handling";

// ---------------------------------------------------------------------------
// Limits
// ---------------------------------------------------------------------------

export const ContactFormLimits = {
  nameMin: 1,
  nameMax: 100,
  emailMax: 254, // RFC 5321 maximum email path length
  messageMin: 1,
  messageMax: 5000,
} as const;

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

/**
 * Inbound contact form payload. Every field is validated at the boundary.
 *
 * - name/email/message are required (FR-009).
 * - email must be syntactically valid (FR-010).
 * - honeypot must be empty for a human submission; a filled honeypot signals
 *   a bot and is treated as spam (NFR-005). It is optional in the schema so
 *   the shape is accepted, but the service layer enforces emptiness.
 */
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(ContactFormLimits.nameMin, "Name is required.")
    .max(ContactFormLimits.nameMax, "Name is too long.")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required.")
    .max(ContactFormLimits.emailMax, "Email is too long.")
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),
  message: z
    .string()
    .min(ContactFormLimits.messageMin, "Message is required.")
    .max(ContactFormLimits.messageMax, "Message is too long.")
    .trim(),
  honeypot: z.string().optional().default(""),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

/**
 * Sanitized, normalized contact form data handed to the service/persistence
 * layer. Zod's .trim()/.toLowerCase() already normalize; this type is the
 * contract between validation and downstream logic.
 */
export interface SanitizedContactForm {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

/**
 * Parses and validates a raw request body against the contact form schema.
 * Throws AppError (validation_error, 400) with field-level details on
 * failure so the client can render inline errors (FR-012).
 */
export function parseContactForm(body: unknown): SanitizedContactForm {
  const result = ContactFormSchema.safeParse(body);
  if (!result.success) {
    const details = result.error.issues.map((issue: ZodIssue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    throw new AppError(
      "validation_error",
      "Invalid contact form submission.",
      400,
      details,
    );
  }
  return {
    name: result.data.name,
    email: result.data.email,
    message: result.data.message,
    honeypot: result.data.honeypot ?? "",
  };
}
