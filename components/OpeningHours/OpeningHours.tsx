"use client";
import React, { useState } from "react";
import { openingHoursData } from "@/constants/data";
import HoursDisplay from "./HoursDisplay";
import Title from "../UI/Title";

const OpeningHours: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "children" | "adults"
  >("children");

  const selectedHours = openingHoursData[selectedCategory];

  const animationDirection = selectedCategory === "children" ? "left" : "right";

  return (
    <div className="opening-hours">
      <Title title="Horaires d'ouverture" classModifier="light" />

      <div className="opening-hours__buttons">
        <button
          className={`opening-hours__button ${
            selectedCategory === "children" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("children")}>
          Enfants
        </button>
        <button
          className={`opening-hours__button ${
            selectedCategory === "adults" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("adults")}>
          Adultes
        </button>
      </div>

      <div className="opening-hours__container">
        {selectedHours && selectedHours.length > 0 ? (
          selectedHours.map((openingHour, index) => (
            <HoursDisplay
              key={`${selectedCategory}-${index}`}
              {...openingHour}
              animationDirection={animationDirection}
            />
          ))
        ) : (
          <p>Aucun horaire disponible</p>
        )}
      </div>
    </div>
  );
};

export default OpeningHours;
