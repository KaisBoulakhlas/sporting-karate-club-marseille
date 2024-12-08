"use client";
import React from "react";
import { GalleryItemProps, isImageItem, isVideoItem } from "@/types/types";
import Image from "next/image";
import ImageComponent from "../UI/ImageComponent";

interface Props {
  item: GalleryItemProps;
  cnImage?: string;
  cnVideo?: string;
}

const GalleryItem: React.FC<Props> = ({ item, cnImage, cnVideo }) => {
  return (
    <div>
      {isImageItem(item) ? (
        <ImageComponent
          src={item.src}
          className={cnImage}
          alt={item.alt}
          loading="lazy"
          hasLink={false}
        />
      ) : isVideoItem(item) ? (
        <video className={cnVideo} controls>
          <source src={item.src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
};

export default GalleryItem;
