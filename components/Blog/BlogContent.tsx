import Pagination from "@/components/UI/Admin/Pagination";
import { PostsList } from "./PostsList";
import { BlogService } from "@/services/blog.service";
import { BLOG_CONFIG } from "@/config/blog.config";

interface BlogContentProps {
  searchParams: { [key: string]: string | undefined };
}

export async function BlogContent({ searchParams }: BlogContentProps) {
  const { data, count, currentPage } =  await BlogService.getPaginatedPosts(searchParams);

  return (
    <>
      <PostsList posts={data} />
      <Pagination page={currentPage} count={count} itemsPerPage={BLOG_CONFIG.itemsPerPage} />
    </>
  );
}