import React from "react";
import Image from "next/image";
import { ImageComponentProps } from "@/types/types";
import Link from "next/link";

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  loading,
  hasLink,
  className,
}) => {
  return (
    <>
      {hasLink ? (
        <Link href="/">
          <Image
            src={src}
            layout="responsive"
            alt={alt}
            loading={loading}
            className={className}
            width={300}
            height={300}
          />
        </Link>
      ) : (
        <Image
          src={src}
          layout="responsive"
          className={className}
          alt={alt}
          loading={loading}
          width={300}
          height={300}
        />
      )}
    </>
  );
};

export default ImageComponent;
