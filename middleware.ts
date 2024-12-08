import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";

import { UserRole } from "@prisma/client";
import { authConfig } from "./lib/auth.config";


const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) || nextUrl.pathname.startsWith("/posts/");;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);


  if (isApiAuthRoute){
    return;
  };

  if (isAuthRoute) {
    if (isLoggedIn) {
    const redirectUrl = req.auth?.user.role === UserRole.ADHERENT ? "/" : DEFAULT_LOGIN_REDIRECT;
    return Response.redirect(new URL(redirectUrl, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
      return Response.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && req.auth?.user.role === UserRole.PUBLISHER) {
    if (nextUrl.pathname.startsWith(`${DEFAULT_LOGIN_REDIRECT}/users`) || nextUrl.pathname.startsWith(`${DEFAULT_LOGIN_REDIRECT}/gallery`)) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }

  if (isLoggedIn && nextUrl.pathname.startsWith(DEFAULT_LOGIN_REDIRECT)) {
    if (req.auth?.user.role === UserRole.ADHERENT) {
      return Response.redirect(new URL("/", nextUrl));
    }
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
