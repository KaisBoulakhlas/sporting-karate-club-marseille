"use client";
import React, { Fragment } from "react";
import ImageComponent from "@/components/UI/ImageComponent";
import Content from "@/components/UI/Content";
import { motion } from "framer-motion";
import useFadeAnimation from "@/hooks/useFadeAnimation";
import AnimatedSection from "../UI/animations/AnimatedSection";

const Introduction: React.FC = () => {
  const {
    ref: imageRef,
    controls: controlsImage,
    variants: fadeLeftVariant,
  } = useFadeAnimation("left");
  const {
    ref: textRef,
    controls: controlsText,
    variants: fadeRightVariant,
  } = useFadeAnimation("right");

  return (
    <AnimatedSection
      title="Le karaté, c'est quoi?"
      reverse
      description={
        <Fragment>
          Karaté est un mot japonais qui signifie, dans ses termes les plus
          simples, <strong>&apos;Main vide&apos;</strong>. C&apos;est un système
          de combat conçu pour être utilisé en défense contre des adversaires
          non armés et/ou armés, dans lequel le pratiquant de karaté (karaté-ka)
          n&apos;utilise que ses propres parties du corps. Le karaté ne devrait
          jamais être utilisé en agression. Le karaté est un mode de vie ; il
          aidera ses pratiquants tout au long de leur vie, faisant ainsi de lui
          une meilleure personne. Une personnalité supérieure ainsi qu&apos;une
          grande amélioration morale et physique peuvent être accomplies par la
          pratique appropriée du Karaté. En japonais, <strong>Do</strong>{" "}
          signifie le chemin. Par conséquent, Karate-Do.
        </Fragment>
      }
      imageSrc="/images/funakoshi.webp"
      imageAlt="Le karaté, c'est quoi?"
      imageFadeDirection="left"
      textFadeDirection="right"
    />
  );
};

export default Introduction;
