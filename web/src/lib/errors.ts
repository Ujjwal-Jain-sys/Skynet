// lib/errors.ts
// Typed application errors mapped to the consistent JSON error envelope.
// No stack traces, SQL, or secrets ever reach the client.
import { NextResponse } from "next/server";

export class AppError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly field?: string;
  constructor(code: string, status: number, message: string, field?: string) {
    super(message);
    this.code = code;
    this.status = status;
    this.field = field;
    this.name = "AppError";
  }
}

export class UnauthenticatedError extends AppError {
  constructor(message = "Sign in required") {
    super("unauthenticated", 401, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super("not_found", 404, message);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field: string) {
    super("validation_error", 400, message, field);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super("conflict", 409, message);
  }
}

export class RateLimitedError extends AppError {
  public readonly retryAfterSeconds: number;
  constructor(retryAfterSeconds: number) {
    super("rate_limited", 429, "Too many requests. Try again later.");
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export interface ErrorEnvelope {
  error: {
    code: string;
    message: string;
    field?: string;
    request_id: string;
  };
}

export function envelope(
  code: string,
  message: string,
  requestId: string,
  field?: string,
): ErrorEnvelope {
  const body: ErrorEnvelope = {
    error: { code, message, request_id: requestId },
  };
  if (field) body.error.field = field;
  return body;
}

/**
 * Map any thrown/error value to a consistent NextResponse using the API error
 * envelope. Unexpected errors are logged server-side (with correlation id)
 * and return a generic 500 — never a stack trace to the client.
 */
export function handleError(err: unknown, requestId: string): NextResponse {
  if (err instanceof AppError) {
    const headers: Record<string, string> = { "X-Request-ID": requestId };
    if (err instanceof RateLimitedError) {
      headers["Retry-After"] = String(err.retryAfterSeconds);
    }
    return NextResponse.json(envelope(err.code, err.message, requestId, err.field), {
      status: err.status,
      headers,
    });
  }

  // Unexpected: log full details server-side only, return generic to client.
  console.error(`[${requestId}] Unexpected error:`, err);
  return NextResponse.json(
    envelope("internal_error", "Something went wrong", requestId),
    { status: 500, headers: { "X-Request-ID": requestId } },
  );
}
