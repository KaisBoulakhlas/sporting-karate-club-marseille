// import { configureCloudinary } from "./cloudinary";
import { db } from "./db";
//import {  } from "next-cloudinary";

export const getUserByEmail = async (email: string) => {
    try {
      const user = await db.user.findUnique({ where: { email } });
      return user;
    } catch {
      return null;
    }
  };
  
export const getUserById = async (id: string) => {
    try {
      const user = await db.user.findUnique({ where: { id } });

      return user;
    } catch {
      return null;
    }
};

export const getPostById = async (id: string) => {
  try {
    const user = await db.post.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getGalleryItemById = async (id: string) => {
  try {
    const user = await db.galleryItem.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export function formatFrenchDateTime(date:Date | undefined): string {
  if (!date) return "Date inconnue";

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) return "Date inconnue";

  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);

  return `${formattedDate}`;
}

// export async function deleteFromCloudinary(src: string): Promise<{ success: boolean } | { error: string }> {
//   try {
//     const cloudinary = configureCloudinary();
//     const cloudinaryBaseUrl = "https://res.cloudinary.com/";
//     const isCloudinaryUrl = src.startsWith(cloudinaryBaseUrl);

//     if (!isCloudinaryUrl) {
//       return { error: "URL non valide pour Cloudinary. Suppression ignorée." };
//     }

//     const publicIdMatch = src.match(/\/v\d+\/(.+)\.[a-z]+$/);
    
//     if (!publicIdMatch) {
//       return { error: "Impossible d'extraire le publicId de l'URL Cloudinary." };
//     }

//     const publicId = publicIdMatch[1];

//     const response = await cloudinary.uploader.destroy(publicId);

//     if (response.result !== "ok") {
//       return { error: `Échec de la suppression : ${response.result}` };
//     }

//     return { success: true };
//   } catch (error) {
//     console.error("Erreur lors de la suppression sur Cloudinary :", error);
//     return { error: "Impossible de supprimer l'élément de Cloudinary." };
//   }
// }
