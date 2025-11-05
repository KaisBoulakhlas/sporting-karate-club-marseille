import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;

  // Check if it's an API auth route (skip middleware)
  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // Check if user has session cookie
  const sessionCookie = request.cookies.get("better-auth.session_token")?.value;
  const isLoggedIn = !!sessionCookie;

  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/posts/");
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Redirect authenticated users away from auth pages
  if (isAuthRoute) {
    if (isLoggedIn) {
      // For now, redirect all authenticated users to dashboard
      // Role-based redirects will be handled client-side
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login for protected routes
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
