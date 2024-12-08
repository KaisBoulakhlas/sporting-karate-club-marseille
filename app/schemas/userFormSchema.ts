import { UserRole } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
    id: z.string().optional(), 
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" }),
    name: z.string().min(1, { message: "First name is required!" }),
    firstName: z.string().min(1, { message: "Last name is required!" }),
    email: z
      .string()
      .email({ message: "Invalid email address!" }),
    role: z.nativeEnum(UserRole),
    image: z.string().optional().nullable(),
  });
  
 
  export const userUpdateSchema = userSchema.omit({ password: true }).extend({
    password: z.string().optional(),
  });
  
  export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;

  export type UserSchema = z.infer<typeof userSchema>;