// app/api/auth/me/route.ts
// GET /api/auth/me — Verify session & return current user.
// Uses Better Auth session to get the user.
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { auth } from "@/lib/auth-instance";
import { headers } from "next/headers";

export async function GET() {
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
    });
  } catch (err) {
    if (err instanceof Error && err.message.includes("Unauthenticated")) {
      return NextResponse.json(
        { error: { code: "unauthenticated", message: "Sign in required", request_id: "" } },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: { code: "internal_error", message: "Something went wrong", request_id: "" } },
      { status: 500 }
    );
  }
}