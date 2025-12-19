import Title from "@/components/UI/Title";
import TableSearch from "@/components/UI/Admin/TableSearch";
import { Metadata } from "next";
import { Suspense } from "react";
import { Loader } from "@/components/UI/Loading/Loader";
import { BlogContent } from "@/components/Blog/BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notre blog contenant tous les articles du club.",
};

export const revalidate = false;

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  return (
    <main className="posts" style={{ margin: "100px auto auto auto" }}>
      <Title title="Tous les Articles" />
      <div className="blogpage__search">
        <TableSearch />
      </div>

      <Suspense fallback={<Loader />}>
        <BlogContent searchParams={params} />
      </Suspense>
    </main>
  );
}
