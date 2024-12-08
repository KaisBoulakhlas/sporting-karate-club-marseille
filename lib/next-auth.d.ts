import NextAuth from "next-auth";

import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

import { UserRole } from "@prisma/client";

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    firstName: string;
  }
}

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  firstName: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}