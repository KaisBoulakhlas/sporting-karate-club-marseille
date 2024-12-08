import { db } from "@/lib/db";
import { Post } from "@/types/types";

// Fetch le post par slug
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const post = await db.post.findUnique({
    where: { slug },
  });

  if (!post) return null;

  return post;
};
