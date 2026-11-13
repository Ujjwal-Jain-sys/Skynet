// lib/auth.ts
// Better Auth session verification for protected API routes.
// Backend never handles credentials; Better Auth owns passwords/sessions.
// `session.user.id` is the opaque Better Auth user id used to scope data server-side.
import { auth } from "@/lib/auth-instance";
import { headers } from "next/headers";
import { UnauthenticatedError } from "./errors";

/**
 * Require a valid Better Auth session. Returns the authenticated user id
 * (`session.user.id`) or throws UnauthenticatedError (→ 401).
 * Never trust a user_id supplied by the client.
 */
export async function requireAuth(): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new UnauthenticatedError();
  }
  return session.user.id;
}

/**
 * Return the authenticated user id, or null for unauthenticated
 * visitors (used by the public contact endpoint).
 */
export async function optionalAuth(): Promise<string | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session?.user?.id ?? null;
  } catch {
    return null;
  }
}