import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";
import { getUserByEmail, getUserById } from "./utils";
import { LoginSchema } from '@/app/schemas/LoginSchema';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if(passwordsMatch) console.log("USSSER", user);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
})

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};