"use client";
import React from "react";
import { TitleProps } from "@/types/types";
import useFont from "@/hooks/useFont";
import AnimatedText from "./animations/AnimatedText";

const Title: React.FC<TitleProps> = ({ title, classModifier }) => {
  const { oswald } = useFont();
  return (
    <AnimatedText
      el="h1"
      once
      text={title}
      className={`title title--${classModifier} ${oswald}`}
    />
  );
};

export default Title;
