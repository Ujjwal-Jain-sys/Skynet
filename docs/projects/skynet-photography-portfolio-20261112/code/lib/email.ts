// owner: backend, phase: backend, status: review, updated: 2026-11-12T00:00:00Z

/**
 * email.ts — Owner email notification for contact form submissions.
 *
 * Owned by backend. Implements FR-011: on valid submission, sends an email
 * notification to the site owner containing the form data.
 *
 * Security notes (flagged for Security Auditor review per mvp-scope.md):
 *   - Credentials come from environment variables only; never hardcoded and
 *     never placed in URLs or logs.
 *   - The visitor's email is handled server-side only and is never exposed in
 *     client-side source (NFR-006).
 *   - Outgoing mail content is HTML-escaped to prevent injection.
 *
 * Provider-agnostic via an injected `EmailTransport`. Defaults to nodemailer
 * (SMTP) when SMTP_* env vars are present; otherwise falls back to a no-op
 * transport so the contact endpoint stays functional without real email
 * credentials (e.g. local dev). Flag for Security Auditor review before
 * enabling a real provider in production.
 */

import nodemailer from "nodemailer";
import { AppError, ErrorCode, requireEnv } from "./error-handling";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Transport adapter: one send operation per submission. Keeps the email layer
 * testable and provider-swappable (SMTP, SendGrid, Resend, etc.).
 */
export interface EmailTransport {
  send(data: ContactFormData): Promise<void>;
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

/**
 * Owner notification email body. The visitor's email appears only in the body
 * for the owner's reference — never in the subject/preview line where a
 * transport or mail log might surface it more broadly.
 */
function ownerEmailBody(data: ContactFormData): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `New portfolio inquiry from ${data.name}`;
  const text = `
New contact form submission

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
Sent from the photography portfolio contact form.
  `.trim();
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Message:</strong><br>${escapeHtml(
      data.message,
    ).replace(/\n/g, "<br>")}</p>
  `;
  return { subject, text, html };
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ---------------------------------------------------------------------------
// Transports
// ---------------------------------------------------------------------------

/**
 * Nodemailer SMTP transport. Reads host/port/credentials from env vars.
 */
class SmtpTransport implements EmailTransport {
  private transporter:
    | ReturnType<typeof nodemailer.createTransport>
    | null = null;

  private get instance() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: requireEnv("SMTP_USER"),
          pass: requireEnv("SMTP_PASS"),
        },
      });
    }
    return this.transporter;
  }

  async send(data: ContactFormData): Promise<void> {
    const { subject, text, html } = ownerEmailBody(data);
    const to = requireEnv("CONTACT_EMAIL_TO"); // site owner
    await this.instance.sendMail({
      from: process.env.SMTP_FROM || '"Portfolio" <noreply@example.com>',
      to,
      subject,
      text,
      html,
      // Visitor email is not logged here; only delivery outcome is traced.
    });
  }
}

/**
 * No-op transport for environments without email configured. Logs the
 * intended mail instead of sending, keeping the endpoint functional in dev.
 */
class NoopTransport implements EmailTransport {
  async send(data: ContactFormData): Promise<void> {
    // eslint-disable-next-line no-console
    console.log("[email:noop] Would send owner notification:", {
      to: process.env.CONTACT_EMAIL_TO,
      name: data.name,
      subject: `New portfolio inquiry from ${data.name}`,
    });
  }
}

// ---------------------------------------------------------------------------
// Transport selection
// ---------------------------------------------------------------------------

let transport: EmailTransport | null = null;

export function getEmailTransport(): EmailTransport {
  if (!transport) {
    const hasSmtp =
      Boolean(process.env.SMTP_HOST) &&
      Boolean(process.env.SMTP_USER) &&
      Boolean(process.env.SMTP_PASS);
    transport = hasSmtp ? new SmtpTransport() : new NoopTransport();
  }
  return transport;
}

/**
 * Sends the FR-011 owner notification for a contact form submission.
 * Throws AppError (email_provider_error, 502) on failure so the route can
 * respond consistently without leaking provider details. The inquiry is
 * already persisted before this is called, so a mail failure does not lose
 * the submission.
 */
export async function sendOwnerNotification(
  data: ContactFormData,
): Promise<void> {
  try {
    await getEmailTransport().send(data);
  } catch (error) {
    throw new AppError(
      ErrorCode.EmailProviderError,
      "Failed to send owner notification.",
      502,
    );
  }
}
