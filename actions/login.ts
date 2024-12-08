"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/app/schemas/LoginSchema";
import { getUserByEmail } from "@/lib/utils";
import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { UserRole } from "@prisma/client";

export const login = async (
  values: z.infer<typeof LoginSchema>,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champs invalides !" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "L'email n'existe pas." };
  }

  try {
    const isAdherent = existingUser.role === UserRole.ADHERENT;
    console.log(existingUser.role)
    await signIn("credentials", {
      email,
      password,
      redirectTo: isAdherent ? "/" : DEFAULT_LOGIN_REDIRECT,
    }); 
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
