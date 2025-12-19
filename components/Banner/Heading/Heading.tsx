"use client";
import { HeadingType } from "@/types/types";
import React from "react";
import { Button } from "../../../components";
import AnimatedText from "@/components/UI/animations/AnimatedText";
import useFont from "@/hooks/useFont";

const Heading: React.FC<HeadingType> = ({ title, desc }) => {
  const { oswald } = useFont();

  return (
    <div className="heading">
      {/* Utilisation de AnimatedText pour animer le titre */}
      <AnimatedText text={title} el="h1" className={`heading__title ${oswald}`} />
      {/* Utilisation de AnimatedText pour animer la description */}
      <AnimatedText text={desc} el="span" className="heading__desc" />
      <Button size="small" />
    </div>
  );
};

export default Heading;
