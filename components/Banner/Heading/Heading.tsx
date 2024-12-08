"use client";
import { HeadingType } from "@/types/types";
import React from "react";
import { Button } from "../../../components";
import AnimatedText from "@/components/UI/animations/AnimatedText";

const Heading: React.FC<HeadingType> = ({ title, desc }) => {
  return (
    <div className="heading">
      {/* Utilisation de AnimatedText pour animer le titre */}
      <AnimatedText text={title} el="h1" className="heading__title" />
      {/* Utilisation de AnimatedText pour animer la description */}
      <AnimatedText text={desc} el="span" className="heading__desc" />
      <Button size="small" />
    </div>
  );
};

export default Heading;
