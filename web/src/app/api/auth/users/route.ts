// app/api/auth/users/route.ts
// POST /api/auth/users — No longer needed with Better Auth.
// Better Auth creates the user row on sign-up automatically.
// This endpoint is kept for backward compatibility and returns the current session user.
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { auth } from "@/lib/auth-instance";
import { headers } from "next/headers";

export async function POST() {
  try {
    const userId = await requireAuth();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: { code: "unauthenticated", message: "Sign in required", request_id: "" } },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
        image: session.user.image,
        createdAt: session.user.createdAt,
        updatedAt: session.user.updatedAt,
      },
      created: false,
    });
  } catch {
    return NextResponse.json(
      { error: { code: "unauthenticated", message: "Sign in required", request_id: "" } },
      { status: 401 }
    );
  }
}