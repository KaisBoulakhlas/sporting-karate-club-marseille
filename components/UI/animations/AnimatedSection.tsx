import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import ImageComponent from "@/components/UI/ImageComponent";
import Content from "@/components/UI/Content";
import useFadeAnimation from "@/hooks/useFadeAnimation";
import { StaticImageData } from "next/image";

type AnimatedSectionProps = {
  title: string;
  description: ReactNode;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  imageFadeDirection: "left" | "right";
  textFadeDirection: "left" | "right";
  reverse?: boolean;
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  imageFadeDirection,
  textFadeDirection,
  reverse = false,
}) => {
  const {
    ref: imageRef,
    controls: imageControls,
    variants: imageVariants,
  } = useFadeAnimation(imageFadeDirection);

  const {
    ref: textRef,
    controls: textControls,
    variants: textVariants,
  } = useFadeAnimation(textFadeDirection);

  return (
    <div
      id="presentation"
      className={`animated-section ${
        reverse ? "animated-section--reverse" : ""
      }`}>
      <motion.div
        ref={textRef}
        className="animated-section__content"
        initial="hidden"
        animate={textControls}
        variants={textVariants}>
        <Content title={title} desc={description} />
      </motion.div>

      <motion.div
        ref={imageRef}
        className="animated-section__image"
        initial="hidden"
        animate={imageControls}
        variants={imageVariants}>
        <ImageComponent
          src={imageSrc}
          loading="lazy"
          alt={imageAlt}
          hasLink={false}
          className="image"
        />
      </motion.div>
    </div>
  );
};

export default AnimatedSection;
