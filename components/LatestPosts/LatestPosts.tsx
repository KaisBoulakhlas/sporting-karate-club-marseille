import { Post } from "@/types/types";
import Title from "../UI/Title";
import PostComponent from "../Post/Post";

const LatestPosts = ({ posts }: { posts: Post[] | null }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="posts">
        <Title title="Nos derniers articles" />
        <div className="error-message">Aucun article trouvé.</div>
      </div>
    );
  }

  return (
    <div className="posts">
      <Title title="Nos derniers articles" />
      <div className="posts__container">
        {posts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
