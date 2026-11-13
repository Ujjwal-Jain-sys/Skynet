// lib/response.ts
// Response helpers: consistent JSON shape + X-Request-ID correlation header.
import { NextResponse } from "next/server";
import { envelope, ErrorEnvelope } from "./errors";

export function requestId(): string {
  return crypto.randomUUID();
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export function json(data: unknown, status = 200, extraHeaders: Record<string, string> = {}): NextResponse {
  return NextResponse.json(data, {
    status,
    headers: { "X-Request-ID": requestId(), ...extraHeaders },
  });
}

/** Build a 429 rate-limited response with Retry-After header. */
export function rateLimited(requestId: string, resetAfterSeconds: number): NextResponse {
  return NextResponse.json(
    envelope("rate_limited", "Too many requests. Try again later.", requestId),
    {
      status: 429,
      headers: { "X-Request-ID": requestId, "Retry-After": String(resetAfterSeconds) },
    },
  );
}

/** Build an error response using the standard envelope. */
export function fail(
  code: string,
  message: string,
  status: number,
  requestId: string,
  field?: string,
  extraHeaders: Record<string, string> = {},
): NextResponse {
  return NextResponse.json(
    envelope(code, message, requestId, field),
    { status, headers: { "X-Request-ID": requestId, ...extraHeaders } },
  );
}
