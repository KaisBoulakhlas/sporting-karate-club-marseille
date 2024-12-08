"use client";
import React, { Fragment } from "react";
import ImageComponent from "@/components/UI/ImageComponent";
import { images } from "@/constants/images";
import Content from "../UI/Content";
import useFadeAnimation from "@/hooks/useFadeAnimation";
import { motion } from "framer-motion";
import AnimatedSection from "../UI/animations/AnimatedSection";

const Presentation: React.FC = () => {
  return (
    <>
      <AnimatedSection
        title="NOTRE CLUB"
        reverse
        description={
          <Fragment>
            Depuis 1983, le <strong>Sporting Karaté Club</strong> développe une
            idée de la vie associative basée sur la solidarité entre ses
            membres. Résolument tournés vers la diversité des pratiques, nous
            vous proposons jusqu&apos;à trois plages horaires hebdomadaires afin
            de permettre à chacun de progresser à son rythme et selon ses
            propres motivations. Du débutant à la ceinture noire, tout le monde
            se retrouve ensemble sur le tatami. Depuis la rentrée 2019, le SKC a
            ouvert un nouveau dojo au <strong>collège Jean Giono</strong>{" "}
            (13013).
          </Fragment>
        }
        imageSrc={images.notreClub}
        imageAlt="Notre club"
        imageFadeDirection="left"
        textFadeDirection="right"
      />

      <AnimatedSection
        title="NOTRE STYLE"
        reverse={false}
        description={
          <Fragment>
            Créé par <strong>Hironori Otsuka</strong>, le{" "}
            <strong>Wado-Ryu</strong> mêle des techniques du karaté traditionnel
            et du ju-jitsu. Tourné vers le travail entre partenaires, ce style
            privilégie des techniques d&apos;esquives, de projections et de
            percussions et en fait un style particulièrement adapté à la
            self-défense moderne. Signifiant littéralement « école de la voie de
            l&apos;harmonie », le Wado-ryu est un style japonais qui
            s&apos;approprie les principes de biomécanique et de médecine
            traditionnelle orientale, ce qui le rend accessible à tous.
          </Fragment>
        }
        imageSrc={images.wadoryu}
        imageAlt="Notre style"
        imageFadeDirection="right" // L'image vient de la droite
        textFadeDirection="left" // Le texte vient de la gauche
      />
    </>
  );
};

export default Presentation;
