// lib/validation.ts
// Input validation at the API boundary. Nothing is trusted from the client.
// Regex matches the DB check constraints in data/schema.sql.
import { ValidationError } from "./errors";

export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const PROJECT_STATUSES = ["draft", "published", "archived"] as const;

export function requireNonEmpty(value: unknown, field: string, maxChars: number): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ValidationError(`${field} is required`, field);
  }
  const trimmed = value.trim();
  if (trimmed.length > maxChars) {
    throw new ValidationError(`${field} is too long (max ${maxChars} chars)`, field);
  }
  return trimmed;
}

export function requireEmail(value: unknown): string {
  const email = requireNonEmpty(value, "email", 254);
  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationError("email is invalid", "email");
  }
  return email;
}

export function requireProjectStatus(value: unknown): string {
  const status = typeof value === "string" && value.length > 0 ? value : "draft";
  if (!PROJECT_STATUSES.includes(status as (typeof PROJECT_STATUSES)[number])) {
    throw new ValidationError("status must be draft, published, or archived", "status");
  }
  return status;
}

export function requireLimitOffset(
  limit?: unknown,
  offset?: unknown,
): { limit: number; offset: number } {
  const lim = limit === undefined ? 20 : Number(limit);
  const off = offset === undefined ? 0 : Number(offset);
  if (!Number.isFinite(lim) || lim < 1 || lim > 100) {
    throw new ValidationError("limit must be between 1 and 100", "limit");
  }
  if (!Number.isFinite(off) || off < 0) {
    throw new ValidationError("offset must be >= 0", "offset");
  }
  return { limit: lim, offset: off };
}
