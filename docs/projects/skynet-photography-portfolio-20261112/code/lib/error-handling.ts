// owner: backend, phase: backend, status: review, updated: 2026-11-12T00:00:00Z

/**
 * error-handling.ts — Consistent backend error handling.
 *
 * Owned by backend. Implements the error-handling skill:
 *   - Fail fast at boundaries; fail gracefully to users.
 *   - One consistent error format across the API.
 *   - Never leak stack traces or internal details to clients.
 *   - Log unexpected errors with correlation ids for end-to-end tracing.
 *
 * Every route handler should be wrapped with `handleApiError` so all errors
 * (expected and unexpected) map to the standard API error shape.
 */

import { NextResponse } from "next/server";

/**
 * Standard API error shape returned to clients (per api-design skill):
 *   { "error": { "code": "...", "message": "...", "details": [] } }
 */
export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: Array<{ path?: string; message?: string }>;
    correlationId?: string;
  };
}

/**
 * Stable error codes clients can localize or act on without parsing messages.
 */
export const ErrorCode = {
  ValidationError: "validation_error",
  InvalidInput: "invalid_input",
  SpamDetected: "spam_detected",
  NotFound: "not_found",
  Conflict: "conflict",
  EmailProviderError: "email_provider_error",
  DatabaseError: "database_error",
  Internal: "internal_error",
  RateLimited: "rate_limited",
} as const;

/**
 * Typed application error carrying an HTTP status code and stable code.
 * Expected errors (validation, spam, not found) are AppErrors so the route
 * layer can respond precisely without exposing internals.
 */
export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: ApiErrorBody["error"]["details"];

  constructor(
    code: string,
    message: string,
    status = 400,
    details?: ApiErrorBody["error"]["details"],
  ) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Generates a correlation id for tracing a request end-to-end. Secrets and
 * tokens are never logged alongside it.
 */
export function generateCorrelationId(): string {
  return crypto.randomUUID();
}

/**
 * Logs an error with context for operators. Client-safe: stack traces are
 * only included in development, and secrets are never logged. Unexpected
 * errors are logged at error level so they can be alerted on.
 */
export function logError(
  error: unknown,
  context: { correlationId: string; path?: string; method?: string },
): void {
  const { correlationId, path, method } = context;
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  // eslint-disable-next-line no-console
  console.error(
    JSON.stringify({
      level: "error",
      correlationId,
      path,
      method,
      message,
      // Never send stack traces to clients; keep them in logs only.
      stack: process.env.NODE_ENV === "development" ? stack : undefined,
    }),
  );
}

/**
 * Maps any thrown error to the standard API error response shape.
 *   - AppError (expected): uses its status/code/message; details preserved.
 *   - Unexpected: generic 500 to the client; full detail stays in logs only.
 */
export function toApiErrorResponse(
  error: unknown,
  correlationId: string,
): NextResponse {
  if (error instanceof AppError) {
    logError(error, { correlationId });
    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
          correlationId,
        },
      },
      { status: error.status },
    );
  }

  // Unexpected error — generic message to client, detail in logs only.
  logError(error, { correlationId });
  return NextResponse.json(
    {
      error: {
        code: ErrorCode.Internal,
        message: "An unexpected error occurred. Please try again later.",
        correlationId,
      },
    },
    { status: 500 },
  );
}

/**
 * Wraps a Next.js App Router route handler so every error is converted to the
 * consistent API error shape and every response carries a correlation id.
 *
 * Usage:
 *   export const POST = handleApiError(async (req) => { ... });
 */
export function handleApiError(
  handler: (req: Request) => Promise<Response> | Response,
): (req: Request) => Promise<Response> {
  return async (req: Request) => {
    const correlationId = generateCorrelationId();
    try {
      const response = await handler(req);
      response.headers.set("X-Correlation-Id", correlationId);
      return response;
    } catch (error) {
      return toApiErrorResponse(error, correlationId);
    }
  };
}

/**
 * Validates a required environment variable is present. Fails fast at the
 * boundary (e.g. on first pool/transport creation) rather than at request
 * time, and never reveals which var is missing to the client.
 */
export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new AppError(ErrorCode.Internal, "Server is misconfigured.", 500);
  }
  return value;
}
