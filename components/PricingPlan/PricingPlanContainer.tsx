import React from "react";
import Title from "../UI/Title";
import { pricingPlans } from "@/constants/data";
import PricingPlanComponent from "./PricingPlanComponent";

const PricingPlanContainer = () => {
  return (
    <div className="pricingPlans">
      <Title title="Les tarifs du club" />
      <div className="pricingPlans__container">
        {pricingPlans.map((pricingPlan, index) => (
          <PricingPlanComponent key={index} {...pricingPlan} />
        ))}
      </div>
    </div>
  );
};

export default PricingPlanContainer;
