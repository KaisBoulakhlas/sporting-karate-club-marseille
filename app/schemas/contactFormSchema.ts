import { z } from 'zod';

export const contactFormSchemaClient = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("L'email est invalide"),
  phone: z.string().optional(),
  description: z.string().min(10, "La description doit comporter au moins 10 caractères"),
  agree: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les termes et conditions",
  }),
});

export type ContactFormDataClient = z.infer<typeof contactFormSchemaClient>;

export const contactFormSchemaServer = contactFormSchemaClient.omit({ agree: true });

export type ContactFormDataServer = z.infer<typeof contactFormSchemaServer>;
