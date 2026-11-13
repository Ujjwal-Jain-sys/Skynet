// lib/db.ts
// Neon Postgres connection (serverless driver) used by data-access repositories
// and Better Auth. Queries use parameterized `sql` tagged templates — no string
// interpolation, so SQL injection is impossible. Better Auth manages auth
// (user, account, session, verification tables); this DB also stores
// application data (projects, inquiries, preferences).
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const sql = neon(process.env.DATABASE_URL);
export const db = drizzle({ client: sql });