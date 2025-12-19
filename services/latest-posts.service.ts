import { db } from "@/lib/db";
import { Post } from "@/types/types";
import { LATEST_POSTS_CONFIG } from "@/config/latest-posts.config";


export class LatestPostsService {
  static async getLatestPosts(): Promise<Post[] | null> {
    return db.post.findMany({
      where: {
        publishedAt: { lte: new Date() },
      },
      orderBy: { [LATEST_POSTS_CONFIG.orderBy]: "desc" },
      take: LATEST_POSTS_CONFIG.limit,
    });
  }
}
