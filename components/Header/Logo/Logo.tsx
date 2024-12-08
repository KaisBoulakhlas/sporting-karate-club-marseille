import React from "react";
import { images } from "@/constants/images";
import ImageComponent from "@/components/UI/ImageComponent";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC<{ scrolled?: boolean }> = ({ scrolled }) => {
  return (
    <div className={`header__logo ${scrolled ? "header__logo--scrolled" : ""}`}>
      <div className="container__logo">
        <ImageComponent
          src={images.logo}
          alt="Sporting Karaté Club"
          loading="eager"
          className="image__logo"
          hasLink={true}
        />
      </div>
    </div>
  );
};

export default Logo;
