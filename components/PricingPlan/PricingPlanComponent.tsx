"use client";
import useFadeAnimation from "@/hooks/useFadeAnimation";
import useFont from "@/hooks/useFont";
import { PricingPlanProps } from "@/types/types";
import { useAnimation, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa";

const PricingPlanComponent: React.FC<PricingPlanProps> = ({
  price,
  title,
  summary,
  index,
}) => {
  const { oswald } = useFont();
  const direction = index % 2 === 0 ? "left" : "right";
  const summarySplitted = summary.split("-").slice(1);
  const { ref, controls, variants } = useFadeAnimation(direction);
  return (
    <motion.div
      className="pricing"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}>
      <div className="pricing__container__one">
        <span className={`pricing__price  ${oswald}`}>{price}</span>
        <span className="pricing__title">{title}</span>
        <p className="pricing__description">Facturé mensuellement</p>
      </div>
      <div className="pricing__separator"></div>
      <div className="pricing__container__two">
        <p className="pricing__libelle">
          Le plan <strong>{title}</strong> inclut:
        </p>
        {summarySplitted.map((item, index) => (
          <span className="pricing__benefit" key={index}>
            <FaCheck />
            {item}
          </span>
        ))}
        <div className="pricing__button-wrapper">
          <Link role="button" href="/contact" className="pricing__button">
            Nous contacter
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingPlanComponent;