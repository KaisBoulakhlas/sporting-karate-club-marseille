import { Prisma } from "@prisma/client";
import PostComponent from "@/components/Post/Post";
import Title from "@/components/UI/Title";
import { Post } from "@/types/types";
import { db } from "@/lib/db";
import TableSearch from "@/components/UI/Admin/TableSearch";
import Pagination from "@/components/UI/Admin/Pagination";
import { getPaginatedItems } from "@/hooks/admin/usePaginationItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notre blog contenant tous les articles du club.",
};

const BlogPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const ITEM_PER_PAGE = 4;

  const { data, count, currentPage } =
    await getPaginatedItems<Prisma.PostWhereInput>({
      model: db.post,
      searchParams,
      itemsPerPage: ITEM_PER_PAGE,
      searchField: "title",
      orderByField: "publishedAt",
    });

  return (
    <main className="posts" style={{ margin: "100px auto auto auto" }}>
      <Title title="Tous les Articles" />
      <div className="blogpage__search">
        <TableSearch />
      </div>
      <div className="posts__container">
        {data.length > 0 ? (
          data.map((post: Post) => <PostComponent key={post.id} post={post} />)
        ) : (
          <p>Aucun article trouvé.</p>
        )}
      </div>
      <Pagination page={currentPage} count={count} />
    </main>
  );
};

export default BlogPage;
