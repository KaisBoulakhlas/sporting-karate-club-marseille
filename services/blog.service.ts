import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { getPaginatedItems } from "@/hooks/admin/usePaginationItems";
import { BLOG_CONFIG } from "@/config/blog.config";
import { unstable_cache } from "next/cache";


export class BlogService {

  static async getPaginatedPosts(searchParams: {
    [key: string]: string | undefined;
  }) {
    const cacheKey = [
      "posts-pagination",
      JSON.stringify(searchParams),
    ];

    const getCachedPosts = unstable_cache(
      async () => {
        return getPaginatedItems<Prisma.PostWhereInput>({
          model: db.post,
          searchParams,
          itemsPerPage: BLOG_CONFIG.itemsPerPage,
          searchField: BLOG_CONFIG.searchField,
          orderByField: BLOG_CONFIG.orderByField,
        });
      },
      cacheKey,
      { tags: ["posts"], revalidate: false }
    );

    return getCachedPosts();
  }
}
