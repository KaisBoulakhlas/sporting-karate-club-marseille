import { z } from "zod";

export const galleryItemSchema = z.object({
    src: z.string().url("Le champ src doit être une URL valide."),
    type: z.enum(["image", "video"]),
    title: z.string().optional()
  });

  export type GalleryFormSchema = z.infer<typeof galleryItemSchema>;