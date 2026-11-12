// owner: backend, phase: backend, status: review, updated: 2026-11-12T00:00:00Z

/**
 * route.ts — POST /api/contact contact form submission endpoint.
 *
 * Owned by backend. Implements FR-008..FR-014 and NFR-005/NFR-006:
 *   - Validates name, email, message (FR-009, FR-010).
 *   - Honeypot spam protection (NFR-005). A filled honeypot is silently
 *     discarded (success-shaped response) so bots are not tipped off.
 *   - Persists the inquiry to contact_inquiries via parameterized SQL (db).
 *   - Sends the owner email notification (FR-011).
 *   - No auth required (showcase, no user accounts).
 *   - Consistent error shape, no stack traces to clients (error-handling).
 *   - Visitor email handled server-side only; never in client source (NFR-006).
 *
 * Contract: see code/api-contract.md
 */

import { NextResponse } from "next/server";
import { handleApiError, AppError, ErrorCode } from "../../../lib/error-handling";
import { parseContactForm } from "../../../lib/validation";
import { createContactInquiry } from "../../../lib/db";
import { sendOwnerNotification } from "../../../lib/email";
import {
  contactRateLimiter,
  contactEmailRateLimiter,
  getClientIp,
} from "../../../lib/rate-limit";

// Force dynamic rendering so this endpoint is never statically optimized.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const POST = handleApiError(async (req: Request): Promise<Response> => {
  // 0. Rate limit per IP before parsing the body. Stops brute-force and
  //    malformed-body denial of service without touching untrusted input.
  const ipLimit = contactRateLimiter.check(getClientIp(req));
  if (!ipLimit.allowed) {
    throw new AppError(
      ErrorCode.RateLimited,
      "Too many contact submissions. Please try again later.",
      429,
    );
  }

  // 1. Parse body. Malformed JSON is a client error.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "invalid_input",
          message: "Request body must be valid JSON.",
        },
      },
      { status: 400 },
    );
  }

  // 2. Validate + sanitize at the boundary (FR-009, FR-010).
  const form = parseContactForm(body);

  // 3. Honeypot spam check (NFR-005). Do not tip off bots: return a generic
  //    success-shaped response and do not store or mail anything.
  if (form.honeypot && form.honeypot.length > 0) {
    // eslint-disable-next-line no-console
    console.log("[contact] honeypot triggered; submission discarded as spam.");
    return NextResponse.json(
      { ok: true, message: "Thank you for your message." },
      { status: 202 },
    );
  }

  // 4. Per-email rate limit (after validation, so a single email cannot flood
  //    the form). Skipped for honeypot/spam discards above.
  const emailLimit = contactEmailRateLimiter.check(form.email);
  if (!emailLimit.allowed) {
    throw new AppError(
      ErrorCode.RateLimited,
      "Too many contact submissions from this email. Please try again later.",
      429,
    );
  }

  // 5. Persist the inquiry (parameterized query; no user input in SQL).
  const inquiry = await createContactInquiry({
    name: form.name,
    email: form.email,
    message: form.message,
    honeypot: form.honeypot,
  });

  // 6. Send owner notification (FR-011). Mail failure is reported but the
  //    inquiry is already stored, so nothing is lost.
  await sendOwnerNotification({
    name: form.name,
    email: form.email,
    message: form.message,
  });

  return NextResponse.json(
    {
      ok: true,
      message: "Thank you for your message. I'll get back to you soon.",
      inquiryId: inquiry.id,
    },
    { status: 201 },
  );
});

export { POST };
