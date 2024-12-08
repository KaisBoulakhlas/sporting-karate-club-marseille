import { NextAuthConfig } from "next-auth"
import { getUserById } from "./utils";

export const authConfig = {
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    async jwt({ token }) {

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.name = existingUser.name;
      token.firstName = existingUser.firstName;
      token.email = existingUser.email;

      return token;
    },

    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.role) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.firstName = token.firstName;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig