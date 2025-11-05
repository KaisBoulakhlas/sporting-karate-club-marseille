import ImageComponent from "@/components/UI/ImageComponent";
import { getPostBySlug } from "@/hooks/usePost";
import { db } from "@/lib/db";
import { formatFrenchDateTime } from "@/lib/utils";
import { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await db.post.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostBySlug(slug);

  if (!postData) {
    return {
      title: "Article non trouvé",
      description: "L'article que vous cherchez est introuvable.",
    };
  }

  return {
    title: postData.title,
    description: postData.summary || "Découvrez cet article sur notre site.",
    openGraph: {
      title: postData.title,
      description: postData.summary,
      images: [
        {
          url: postData.imageUrl,
          alt: postData.title,
        },
      ],
    },
  };
}

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const postData = await getPostBySlug(slug);

  if (!postData) {
    return (
      <main className="postpage__section">
        <div className="error-message">Erreur : Article non trouvé</div>
      </main>
    );
  }

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
