import { Post } from "@/types/types";
import React from "react";
import ImageComponent from "../UI/ImageComponent";
import Image from "next/image";
import { slugify } from "@/lib/slugify";
import Link from "next/link";
import { formatFrenchDateTime } from "@/lib/utils";

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  // const formattedDate = post.publishedAt
  //   ? new Date(post.publishedAt).toLocaleDateString()
  //   : "Date inconnue";

  return (
    <div className="post" title={post.title}>
      <Link href={`/posts/${post.slug}`}>
        <div className="container__image">
          <Image
            src={post.imageUrl}
            alt={post.title}
            loading="lazy"
            layout="fill"
            className="post__image"
          />
        </div>
        <div className="post__infos">
          <span className="post__date">
            {formatFrenchDateTime(post.publishedAt)}
          </span>
          <h2 className="post__title">{post.title}</h2>
          <p className="post__summary">{post.summary}</p>
          <span className="post__author">{post.author}</span>
        </div>
      </Link>
    </div>
  );
};

export default PostComponent;
