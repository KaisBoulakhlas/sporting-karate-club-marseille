import { db } from "./db";

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
    timeZone: "Europe/Paris",
  }).format(parsedDate);

  return `${formattedDate}`;
}
