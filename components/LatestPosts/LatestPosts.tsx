// app/components/LatestPosts.tsx
import React from "react";
import Title from "../UI/Title";
import { getLatestPosts } from "@/hooks/useLatestPosts";
import PostComponent from "../Post/Post";

const LatestPosts = async () => {
  const posts = await getLatestPosts();

  return (
    <div className="posts">
      <Title title="Nos derniers articles" />
      <div className="posts__container">
        {posts?.length === 0 ? (
          <div className="error-message">Aucun article trouvé.</div>
        ) : (
          posts?.map((post) => <PostComponent key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default LatestPosts;
