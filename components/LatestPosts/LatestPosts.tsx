import React from "react";
import Title from "../UI/Title";
import PostComponent from "../Post/Post";
import { Post } from "@/types/types";

const LatestPosts = ({ posts }: { posts: Post[] }) => {
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
