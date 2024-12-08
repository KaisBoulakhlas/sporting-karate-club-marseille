import { z } from "zod";

export const postSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Le titre est obligatoire."),
  summary: z.string().min(1, "La description est obligatoire."),
  content: z.string().min(1, "Le contenu est obligatoire."),
  imageUrl: z.string(),
});


export type PostFormSchema = z.infer<typeof postSchema>;
