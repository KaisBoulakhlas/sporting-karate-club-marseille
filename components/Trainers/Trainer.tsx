"use client";
import { TrainerProps } from "@/types/types";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ImageComponent from "../UI/ImageComponent";
import useFadeAnimation from "@/hooks/useFadeAnimation";

const bounceAnimation = {
  y: [100, -50, 50, -135],
  transition: {
    duration: 4,
    ease: "easeInOut",
    y: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const Trainer: React.FC<TrainerProps> = ({
  fullname,
  profession,
  description,
  image,
  reversed,
  index,
}) => {
  const direction = index % 2 === 0 ? "left" : "right";

  const bounceControls = useAnimation();

  const { ref, controls, variants } = useFadeAnimation(direction, 0.5, () => {
    bounceControls.start(bounceAnimation);
  });

  return (
    <motion.div
      className={`trainer ${reversed ? "trainer--reverse" : ""}`}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}>
      <div className="trainer__containerImage">
        <motion.div
          className={`trainer__image ${
            reversed ? "trainer__image--reverse" : ""
          }`}
          animate={bounceControls}>
          <ImageComponent
            alt={fullname}
            hasLink={false}
            src={image}
            loading="lazy"
          />
        </motion.div>
      </div>
      <div className="trainer__infos">
        <h1 className="trainer__fullname">{fullname}</h1>
        <span className="trainer__profession">{profession}</span>
        <p className="trainer__description">{description}</p>
      </div>
    </motion.div>
  );
};

export default Trainer;
