// lib/auth-instance.ts
// Better Auth server-side instance. Self-hosted on Neon Postgres.
// Better Auth manages user, account, session, verification tables.
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
