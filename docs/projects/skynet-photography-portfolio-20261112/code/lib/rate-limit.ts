// owner: security-auditor, phase: security, status: implemented, updated: 2026-11-12
/**
 * rate-limit.ts — In-memory sliding-window rate limiter for public endpoints.
 *
 * Owned by security-auditor. Protects POST /api/contact against spam and
 * brute-force submission (OWASP A04 Insecure Design; finding V-02).
 *
 * Deployment note: this runs per function instance (Vercel serverless), so
 * the counter is not shared across instances/regions. It is an effective
 * baseline for a low-traffic showcase contact form. For cross-instance or
 * high-scale distributed rate limiting, move this check to the edge (Vercel
 * Firewall rate limiting) or back it with a shared store (Vercel KV / Redis).
 *
 * Design:
 *   - Sliding window of request timestamps per key.
 *   - Per-IP limit applied before body parsing: stops brute-force and
 *     malformed-body denial of service without parsing untrusted input.
 *   - Per-email limit applied after validation: stops email-based spam.
 *   - Expired entries are pruned on each check to bound memory.
 */

import { AppError } from "./error-handling";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Sliding-window rate limiter. `max` requests per `windowMs` per key.
 */
export class RateLimiter {
  private hits = new Map<string, number[]>();

  constructor(
    private readonly windowMs: number,
    private readonly max: number,
  ) {}

  check(key: string): RateLimitResult {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const timestamps = (this.hits.get(key) ?? []).filter((t: number) => t > windowStart);

    if (timestamps.length >= this.max) {
      const oldest = Math.min(...timestamps);
      const retryAfter = Math.max(
        Math.ceil((oldest + this.windowMs - now) / 1000),
        1,
      );
      return { allowed: false, remaining: 0, retryAfterSeconds: retryAfter };
    }

    timestamps.push(now);
    this.hits.set(key, timestamps);
    return {
      allowed: true,
      remaining: this.max - timestamps.length,
      retryAfterSeconds: 0,
    };
  }

  /** Drop expired windows to bound memory. Call periodically (e.g. on a timer). */
  prune(): void {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    this.hits.forEach((timestamps, key) => {
      const valid = timestamps.filter((t: number) => t > windowStart);
      if (valid.length === 0) {
        this.hits.delete(key);
      } else {
        this.hits.set(key, valid);
      }
    });
  }
}

// ---------------------------------------------------------------------------
// Contact form rate limiters (singletons, one per function instance).
// ---------------------------------------------------------------------------

/**
 * Per-IP limit: 5 submissions per minute. Applied before parsing the body so
 * malformed/oversized payloads are rejected without touching the JSON parser.
 */
export const contactRateLimiter = new RateLimiter(60_000, 5);

/**
 * Per-email limit: 3 submissions per minute. Applied after validation so a
 * single email address cannot flood the form.
 */
export const contactEmailRateLimiter = new RateLimiter(60_000, 3);

/**
 * Extracts the client IP from Vercel forwarding headers. Takes the leftmost
 * entry of `x-forwarded-for` (the original client) when a chain is present.
 */
export function getClientIp(req: Request): string {
  const forwarded =
    req.headers.get("x-vercel-forwarded-for") ??
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip");
  if (forwarded) {
    return forwarded.split(",")[0].trim() || "unknown";
  }
  return "unknown";
}
