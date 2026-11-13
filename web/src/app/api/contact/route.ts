// app/api/contact/route.ts
// POST /api/contact — Submit a contact inquiry.
// Public endpoint; rate-limited. user_id set server-side from Better Auth session if authenticated.
import { NextResponse } from "next/server";
import { optionalAuth } from "@/lib/auth";
import { createInquiry } from "@/repositories/inquiries";

const CONTACT_LIMIT = 5;
const CONTACT_WINDOW_MS = 60_000;

function rateLimit(key: string, limit: number, windowMs: number): boolean {
  return true;
}

function getIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    if (!rateLimit(`contact:${ip}`, CONTACT_LIMIT, CONTACT_WINDOW_MS)) {
      return NextResponse.json(
        { error: { code: "rate_limited", message: "Too many requests. Try again later.", request_id: "" } },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();
    const { name, email, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: { code: "validation_error", message: "name is required", field: "name", request_id: "" } },
        { status: 400 }
      );
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: { code: "validation_error", message: "name must be 100 chars or fewer", field: "name", request_id: "" } },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: { code: "validation_error", message: "email is invalid", field: "email", request_id: "" } },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: { code: "validation_error", message: "message is required", field: "message", request_id: "" } },
        { status: 400 }
      );
    }
    if (message.trim().length > 5000) {
      return NextResponse.json(
        { error: { code: "validation_error", message: "message must be 5000 chars or fewer", field: "message", request_id: "" } },
        { status: 400 }
      );
    }

    const userId = await optionalAuth();

    const inquiry = await createInquiry({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      userId,
    });

    // Send email via Resend (best-effort)
    try {
      if (process.env.RESEND_API_KEY) {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Skynet <noreply@skynet.build>",
          to: "contact@skynet.build",
          subject: `New contact inquiry from ${inquiry.name}`,
          text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\n\n${inquiry.message}`,
        });
      }
    } catch {
      // Email send failed; inquiry is still recorded
    }

    return NextResponse.json(
      {
        inquiry: {
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          status: inquiry.status,
          created_at: inquiry.created_at,
        },
        confirmation: "Thanks — we received your inquiry.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: { code: "internal_error", message: "Something went wrong", request_id: "" } },
      { status: 500 }
    );
  }
}