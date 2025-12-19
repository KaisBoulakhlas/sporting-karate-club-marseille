import { Suspense } from "react";
import LatestPosts from "./LatestPosts";
import { LatestPostsService } from "@/services/latest-posts.service";
import { Loader } from "@/components/UI/Loading/Loader";

async function LatestPostsContent() {
  const posts = await LatestPostsService.getLatestPosts();
  return <LatestPosts posts={posts} />;
}

export function LatestPostsContainer() {
  return (
    <Suspense fallback={<Loader />}>
      <LatestPostsContent />
    </Suspense>
  );
}
