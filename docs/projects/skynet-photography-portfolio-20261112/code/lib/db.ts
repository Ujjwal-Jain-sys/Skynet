// owner: backend, phase: backend, status: review, updated: 2026-11-12T00:00:00Z

/**
 * db.ts — Database client and query helpers for contact inquiries.
 *
 * Owned by backend. Uses node-postgres (pg) against PostgreSQL, matching
 * migration 003 (`contact_inquiries`). All queries are parameterized — user
 * input is never interpolated into SQL (input-validation skill). No HTTP or
 * framework types live in this layer (business-logic skill).
 */

import { Pool, type QueryResult, type QueryResultRow } from "pg";
import { requireEnv } from "./error-handling";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Row shape for contact_inquiries, matching migration 003.
 */
export interface ContactInquiryRow {
  id: string;
  name: string;
  email: string;
  message: string;
  honeypot: string | null;
  status: "new" | "read" | "replied" | "archived";
  created_at: Date;
  updated_at: Date;
}

export interface CreateContactInquiryInput {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

// ---------------------------------------------------------------------------
// Connection pool
// ---------------------------------------------------------------------------

/**
 * Singleton connection pool, configured via DATABASE_URL. Lazy-initialized so
 * the module loads even when the DB is unavailable (errors surface at query
 * time). Pool size is bounded so traffic spikes cannot exhaust connections.
 */
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const databaseUrl = requireEnv("DATABASE_URL");
    pool = new Pool({
      connectionString: databaseUrl,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }
  return pool;
}

/**
 * Closes the pool. Used by tests and serverless shutdown.
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/**
 * Runs a parameterized query and returns the full result. Database errors are
 * logged and re-thrown so the route layer maps them via AppError.
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> {
  const client = await getPool().connect();
  try {
    return await client.query<T>(sql, params);
  } finally {
    client.release();
  }
}

/**
 * Inserts a contact form submission into contact_inquiries and returns the
 * created row. The database generates the UUID id and timestamps; the status
 * defaults to 'new' per the schema CHECK constraint.
 */
export async function createContactInquiry(
  input: CreateContactInquiryInput,
): Promise<ContactInquiryRow> {
  const sql = `
    INSERT INTO public.contact_inquiries (name, email, message, honeypot, status)
    VALUES ($1, $2, $3, $4, 'new')
    RETURNING id, name, email, message, honeypot, status, created_at, updated_at;
  `;
  const params: unknown[] = [
    input.name,
    input.email,
    input.message,
    input.honeypot,
  ];
  const result = await query<ContactInquiryRow>(sql, params);
  if (result.rowCount === 0 || !result.rows[0]) {
    throw new Error("Database insert returned no row.");
  }
  return result.rows[0];
}
