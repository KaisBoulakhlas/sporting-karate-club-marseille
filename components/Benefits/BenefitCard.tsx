"use client";
import useFadeAnimation from "@/hooks/useFadeAnimation";
import { BenefitsProps } from "@/types/types";
import { motion } from "framer-motion";
import React from "react";

const BenefitCard: React.FC<BenefitsProps & { index: number }> = ({
  icon: IconComponent,
  iconColorClass,
  desc,
  index,
}) => {
  const direction = index % 2 === 0 ? "left" : "right";

  const { ref, controls, variants } = useFadeAnimation(direction);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="benefitCard">
      <div className={`benefitCard__icon ${iconColorClass}`}>
        <IconComponent />
      </div>
      <p className="benefitCard__desc">{desc}</p>
    </motion.div>
  );
};

export default BenefitCard;
