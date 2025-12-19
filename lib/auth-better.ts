import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import { User as PrismaUser } from "@prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignInAfterSignUp: true,
  },
  appName: "Sporting Karate Club",
  baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  secret: process.env.NEXTAUTH_SECRET,
  trustedOrigins: [
    process.env.NEXTAUTH_URL || "http://localhost:3000",
  ],
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        default: "ADHERENT",
      },
      firstName: {
        type: "string",
        required: true,
      },
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = PrismaUser & {
  role?: string;
};

// Export auth client for use in the browser
export const authClient = auth;

// Server-side session getter for use in server actions
export async function getServerSession() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  try {
    // Get all cookies as headers format for Better Auth
    const cookiesHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    // Use Better Auth's session getter with headers
    const session = await auth.api.getSession({
      headers: {
        cookie: cookiesHeader,
      },
    });

    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}
