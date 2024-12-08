import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "L'adresse e-mail est invalide." }),
  password: z.string().min(1, { message: "Le mot de passe est obligatoire." }),
});

export type LoginFormSchema = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email({ message: "L'adresse e-mail est invalide." }),
  password: z.string().min(6, { message: "Il faut au minimum 6 caractères." }),
  name: z.string().min(1, { message: "Le nom est obligatoire." }),
  firstName: z.string().min(1, { message: "Le prénom est obligatoire." }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "L'adresse e-mail est invalide." }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Il faut au minimum 6 caractères." }),
});
