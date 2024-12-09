import React from "react";
import Title from "@/components/UI/Title";
import Slider from "@/components/UI/Slider";

const Testimonials: React.FC = () => {
  return (
    <div className="testimonials">
      <Title title="Nos témoignages" />

      <p className="testimonials__description">
        Voici les témoignages de nos adhérents sur <strong>le club.</strong>
      </p>

      <div className="testimonials__container">
        <div className="testimonials__slider">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
