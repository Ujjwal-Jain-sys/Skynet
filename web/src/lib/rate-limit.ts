// lib/rate-limit.ts
// Fixed-window rate limiter with a swappable store.
//
// Default: in-memory Map (per function instance, MVP behavior).
// Inject a shared store (Upstash Redis / Vercel KV) at runtime via
// setRateLimitStore() so limits are shared across serverless function
// instances. Redis/KV is NOT provisioned here — that is infra/devops.
// If no shared store is configured, fall back to in-memory and log a
// server-side warning once.

interface Window {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAfterSeconds: number;
}

export interface RateLimitStore {
  /** Increment the counter for `key` within a `windowMs` window. */
  increment(key: string, windowMs: number): { count: number; resetAt: number };
  /** Read the current window for `key`, or null if none/expired. */
  get(key: string): { count: number; resetAt: number } | null;
  /** Reset/remove the window for `key`. */
  reset(key: string): void;
}

const stores = new Map<string, Window>();

let customStore: RateLimitStore | null = null;
let warnedNoSharedStore = false;

/** Inject a shared store (e.g. Upstash Redis / Vercel KV). */
export function setRateLimitStore(nextStore: RateLimitStore): void {
  customStore = nextStore;
}

function resolveStore(): RateLimitStore {
  if (!customStore && !warnedNoSharedStore) {
    warnedNoSharedStore = true;
    // eslint-disable-next-line no-console
    console.warn(
      "[rate-limit] No shared store configured via setRateLimitStore(). " +
        "Falling back to in-memory Map — limits are NOT shared across serverless function instances. " +
        "Configure Upstash Redis / Vercel KV for production.",
    );
  }
  return customStore ?? memoryStore;
}

/** In-memory fallback store (per function instance, MVP). */
class MemoryStore implements RateLimitStore {
  increment(key: string, windowMs: number): { count: number; resetAt: number } {
    const now = Date.now();
    let win = stores.get(key);
    if (!win || now >= win.resetAt) {
      win = { count: 0, resetAt: now + windowMs };
      stores.set(key, win);
    }
    win.count += 1;
    return { count: win.count, resetAt: win.resetAt };
  }

  get(key: string): { count: number; resetAt: number } | null {
    const win = stores.get(key);
    if (!win) return null;
    const now = Date.now();
    if (now >= win.resetAt) return null;
    return { count: win.count, resetAt: win.resetAt };
  }

  reset(key: string): void {
    stores.delete(key);
  }
}

const memoryStore = new MemoryStore();

/**
 * Returns whether the request is allowed within `limit` requests per
 * `windowMs` for the given `key`. Callers must reject with 429 when
 * `allowed` is false, including a `Retry-After` header.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const { count, resetAt } = resolveStore().increment(key, windowMs);
  const remaining = Math.max(0, limit - count);
  const allowed = count <= limit;
  const resetAfterSeconds = Math.max(1, Math.ceil((resetAt - now) / 1000));
  return { allowed, remaining, resetAfterSeconds };
}

/** Drop expired windows to bound memory growth (in-memory store only; call periodically). */
export function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [key, win] of Array.from(stores.entries())) {
    if (now >= win.resetAt) stores.delete(key);
  }
}
