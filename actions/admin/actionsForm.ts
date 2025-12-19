"use server";
import { hashPassword } from 'better-auth/crypto';
import { userSchema, userUpdateSchema } from "@/app/schemas/userFormSchema";
import { db } from "@/lib/db";
import { getPostById, getUserByEmail, getUserById } from "@/lib/utils";
import { z } from 'zod';
import { postSchema } from '@/app/schemas/postFormSchema';
import { getServerSession } from '@/lib/auth-better';
import { slugify } from '@/lib/slugify';
import { UserRole } from '@prisma/client';
import { GalleryFormSchema, galleryItemSchema } from '@/app/schemas/galleryItemSchema';
import { cloudinaryInstance } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

export const register = async (data: z.infer<typeof userSchema>) => {
  try{
    const session = await getServerSession();

    if (!session?.user) {
      throw new Error("Accès non autorisé.");
    }

    const userRole = (session.user as any)?.role;
    if (!userRole || userRole !== UserRole.ADMIN) {
      throw new Error("Permissions insuffisantes.");
    }

    const validatedFields = userSchema.safeParse(data);
    
    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
  
    const { email, password, name, firstName, image, role } = validatedFields.data;

    if (!password) {
      return { error: "Password is required for registration!" };
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    // Hash password using Better Auth's function
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        firstName,
        image,
        role,
      },
    });

    // Create Account record with hashed password
    await db.account.create({
      data: {
        userId: user.id,
        accountId: user.id,
        providerId: "credential",
        password: hashedPassword,
      },
    });

    return { success: true, error: false };

  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const update = async (data: z.infer<typeof userUpdateSchema>) => {
  const session = await getServerSession();

  if (!session?.user.role) {
    throw new Error("Accès non autorisé.");
  }


  if (![UserRole.ADMIN].includes(session?.user.role as any)) {
    throw new Error("Permissions insuffisantes.");
  }

  const validatedFields = userUpdateSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { id, email, password, name, firstName, image, role } = validatedFields.data;

  if (!id) {
    return { error: "User ID is required for updating." };
  }

  try {
    const existingUser = await getUserById(id);

    if (!existingUser) {
      return { error: "User not found!" };
    }

    await db.user.update({
      where: { id },
      data: {
        email,
        name,
        firstName,
        image: image || null,
        role,
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const deleteUser = async (user: { id: string; image: string }) => {
 
  try {
    const session = await getServerSession();

    if (!session?.user.role) {
      throw new Error("Accès non autorisé.");
    }
  

    if (![UserRole.ADMIN].includes(session?.user.role as any)) {
      throw new Error("Permissions insuffisantes.");
    }

    const { id, image } = user;

    if (!id || !image) {
      return { error: "Données utilisateur invalides." };
    }

    const existingUser = getUserById(id);

    if (!existingUser) {
      return { error: "User not found." };
    }

    const cloudinaryResponse = await deleteFromCloudinary(image);

    if ("error" in cloudinaryResponse) {
      console.warn("Cloudinary:", cloudinaryResponse.error);
    }

    await db.user.delete({
      where: { id },
    });

    return { success: "User deleted successfully." };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "An error occurred while deleting the user." };
  }
};

export const createPost = async (data: z.infer<typeof postSchema>) => {
  try {

    const session = await getServerSession();

    if (!session || !session.user || session.user.role === UserRole.ADHERENT) {
      return { error: "Unauthorized. You must be logged in to create a post." };
    }

    const { name, firstName } = session.user;

    const validatedData = postSchema.safeParse(data);

    if (!validatedData.success) {
      return { error: "Champs invalides !" };
    }

    const { title, summary, content, imageUrl } = validatedData.data;
    console.log("validation data",validatedData.data)
    const slug = slugify(title);

    await db.post.create({
      data: {
        title,
        summary,
        content,
        imageUrl,
        slug,
        author: `${firstName} ${name}`,
      },
    });

    // Revalider le cache du blog
    revalidatePath("/blog");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la création de l'article :", error);
    return { error: "Erreur lors de la création de l'article." };
  }
};

export const updatePost = async (data: z.infer<typeof postSchema>) => {
  try {
    const session = await getServerSession();

    if (!session || !session.user || session.user.role === UserRole.ADHERENT) {
      return { error: "Unauthorized. You must be logged in to create a post." };
    }

    const validatedData = postSchema.safeParse(data);

    if (!validatedData.success) {
      return { error: "Champs invalides !" };
    }
    const { id, title, summary, content, imageUrl } = validatedData.data;

    await db.post.update({
      where: { id },
      data: {
        title,
        summary,
        content,
        imageUrl: imageUrl,
      },
    });

    // Revalider le cache du blog
    revalidatePath("/blog");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Problème pour modifier l'article." };
  }
};

export const deletePost = async (post: { id: string; imageUrl: string }) => {
  try {
    const session = await getServerSession();

    if (!session || !session.user || session.user.role === UserRole.ADHERENT) {
      return { error: "Unauthorized. You must be logged in to create a post." };
    }

    const { id, imageUrl } = post;

    if (!id || !imageUrl) {
      return { error: "Données utilisateur invalides." };
    }

    const existingPost = getPostById(id);

    if (!existingPost) {
      return { error: "Article introuvable." };
    }

    const cloudinaryResponse = await deleteFromCloudinary(imageUrl);

    if ("error" in cloudinaryResponse) {
      console.warn("Cloudinary:", cloudinaryResponse.error);
    }

    await db.post.delete({
      where: { id },
    });

    // Revalider le cache du blog
    revalidatePath("/blog");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Problème pour supprimer l'article." };
  }
};

export async function createGalleryItem(data: GalleryFormSchema) {

  const session = await getServerSession();

  if (!session?.user.role) {
    throw new Error("Accès non autorisé.");
  }

  if (![UserRole.ADMIN].includes(session?.user.role as any)) {
    throw new Error("Permissions insuffisantes.");
  }

  const validatedData = galleryItemSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: "Champs invalides !" };
  }
  const { src, type, title } = validatedData.data;

  try {
    await db.galleryItem.create({
      data: {
        src,
        type,
        title
      },
    });

    // Revalider le cache de la galerie
    revalidatePath("/galerie");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la création de l'élément :", error);
    throw new Error("Impossible de créer l'élément.");
  }
}

export async function deleteFromCloudinary(
  src: string
): Promise<{ success: boolean } | { error: string }> {
  try {
    const cloudinaryBaseUrl = "https://res.cloudinary.com/";
    const isCloudinaryUrl = src.startsWith(cloudinaryBaseUrl);

    if (!isCloudinaryUrl) {
      return { error: "URL non valide pour Cloudinary. Suppression ignorée." };
    }

    const publicIdMatch = src.match(/\/v\d+\/([^/]+\/[^.]+)\.[a-z]+$/);

    if (!publicIdMatch) {
      return { error: "Impossible d'extraire le publicId de l'URL Cloudinary." };
    }

    const publicId = publicIdMatch[1];
    console.log("PublicId extrait :", publicId);

    const response = await cloudinaryInstance.uploader.destroy(publicId);

    if (response.result !== "ok") {
      return { error: `Échec de la suppression : ${response.result}` };
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression sur Cloudinary :", error);
    return { error: "Impossible de supprimer l'élément de Cloudinary." };
  }
}


export const deleteGalleryItem = async (galleryItem: { id: string; src: string }) => {
  try {

    const session = await getServerSession();

    if (!session?.user.role) {
      throw new Error("Accès non autorisé.");
    }

    if (![UserRole.ADMIN].includes(session?.user.role as any)) {
      throw new Error("Permissions insuffisantes.");
    }

    const { id, src } = galleryItem;

    if (!id || !src) {
      return { error: "Données utilisateur invalides." };
    }

    const cloudinaryResponse = await deleteFromCloudinary(src);

    if ("error" in cloudinaryResponse) {
      console.warn("Cloudinary:", cloudinaryResponse.error);
    }

    await db.galleryItem.delete({
      where: { id },
    });

    // Revalider le cache de la galerie
    revalidatePath("/galerie");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Problème pour supprimer l'item." };
  }
};

