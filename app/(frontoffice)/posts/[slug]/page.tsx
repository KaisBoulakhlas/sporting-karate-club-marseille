import ImageComponent from "@/components/UI/ImageComponent";
import { getPostBySlug } from "@/hooks/usePost";
import { formatFrenchDateTime } from "@/lib/utils";
import Image from "next/image";

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const postData = await getPostBySlug(slug);

  if (!postData) {
    return (
      <main className="postpage__section">
        <div className="error-message">Erreur : Article non trouvé</div>
      </main>
    );
  }

  const formattedDate = postData.publishedAt
    ? new Date(postData.publishedAt).toLocaleDateString()
    : "Date inconnue";

  return (
    <main className="postpage__section">
      <span className="postpage__date">
        Publié le <strong>{formatFrenchDateTime(postData.publishedAt)}</strong>
      </span>
      <h1 className="postpage__title">{postData.title}</h1>
      <div className="postpage__containerImage">
        <ImageComponent
          src={postData.imageUrl}
          alt={postData.title}
          className="postpage__image"
          hasLink={false}
        />
      </div>
      <div className="postpage__separator"></div>
      <div
        className="postpage__content"
        dangerouslySetInnerHTML={{ __html: postData.content }}
      />
      <div className="postpage__meta">
        <span>
          Publié par <strong>{postData.author}</strong>
        </span>
      </div>
    </main>
  );
};

export default PostPage;
