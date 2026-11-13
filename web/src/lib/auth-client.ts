"use client";

// lib/auth-client.ts
// Better Auth client-side instance for sign-in, sign-up, sign-out, session.
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "",
});

export function useSafeAuth() {
  const session = authClient.useSession();
  return {
    isAuthenticated: Boolean(session.data?.user),
    isLoaded: !session.isPending,
  };
}

export { authClient as default };