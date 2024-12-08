import { db } from "@/lib/db";
import { Post } from "@/types/types";

export const getLatestPosts = async (): Promise<Post[] | null> => {
  return await db.post.findMany({
    where: {
      publishedAt: { lte: new Date() },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
};
