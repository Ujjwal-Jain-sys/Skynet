// middleware.ts
// Better Auth session cookie check for route protection.
// Public routes are accessible without a session.
// Protected routes require a Better Auth session cookie.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/pricing",
  "/contact",
  "/sign-up",
  "/log-in",
];

const PROTECTED_PREFIXES = ["/dashboard", "/settings", "/publish"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for Better Auth session cookie
  const sessionCookie = request.cookies.get("better-auth.session_token");

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  const isAuthRoute = pathname === "/sign-up" || pathname === "/log-in";

  // Redirect unauthenticated users from protected routes to /log-in
  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  // Redirect authenticated users from auth entry points to /dashboard
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};