import PostComponent from "@/components/Post/Post";
import { Post } from "@/types/types";

interface PostsListProps {
  posts: Post[];
}

export function PostsList({ posts }: PostsListProps) {
  if (posts.length === 0) {
    return <p>Aucun article trouvé.</p>;
  }

  return (
    <div className="posts__container">
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}
