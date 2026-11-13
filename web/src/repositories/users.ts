// repositories/users.ts
// Better Auth manages the user table directly.
// This file is kept for backward compatibility but most operations
// are now handled by Better Auth's session API.
// See lib/auth.ts for session verification.
export interface UserRow {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

// Better Auth creates users on sign-up; no manual upsert needed.
// This function is a no-op kept for compatibility.
export async function upsertUser(
  _userId: string,
  _email: string
): Promise<{ user: UserRow; created: boolean }> {
  throw new Error("upsertUser is deprecated — Better Auth manages users directly");
}

export async function getUserById(userId: string): Promise<UserRow | null> {
  // Better Auth session already contains user data.
  // This is a fallback for direct DB access if needed.
  const { sql } = await import("@/lib/db");
  const rows = await sql`
    SELECT id, name, email, "emailVerified", image, "createdAt", "updatedAt"
    FROM "user"
    WHERE id = ${userId}
  `;
  if (rows.length === 0) return null;
  const r = rows[0] as Record<string, unknown>;
  return {
    id: r.id as string,
    name: r.name as string | null,
    email: r.email as string,
    emailVerified: r.emailVerified as boolean,
    image: r.image as string | null,
    createdAt: r.createdAt as string,
    updatedAt: r.updatedAt as string,
  };
}