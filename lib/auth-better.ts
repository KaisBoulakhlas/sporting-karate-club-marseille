import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
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
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const session = await db.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session || session.expires < new Date()) {
      return null;
    }

    return {
      user: session.user,
      expires: session.expires,
    };
  } catch {
    return null;
  }
}
