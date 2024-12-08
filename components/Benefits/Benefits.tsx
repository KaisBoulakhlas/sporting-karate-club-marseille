"use client";
import React from "react";
import Title from "@/components/UI/Title";
import BenefitCard from "./BenefitCard";
import { benefits } from "@/constants/data";
import useFont from "@/hooks/useFont";

const Benefits: React.FC = () => {
  const { oswald } = useFont();
  return (
    <div className="benefits">
      <Title title="Les avantages du karaté" classModifier="light" />
      <div className="benefits__container">
        {benefits?.map((benefit, index) => (
          <BenefitCard
            key={index}
            desc={benefit.desc}
            icon={benefit.icon}
            iconColorClass={benefit.iconColorClass}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Benefits;
