import { trainers } from "@/constants/data";
import React from "react";
import Trainer from "./Trainer";
import Title from "../UI/Title";

const Trainers = () => {
  const reversed = [false, true];
  return (
    <div className="trainers">
      <Title title="NOS ENTRAÎNEURS" />
      {trainers.map((trainer, index) => (
        <Trainer
          {...trainer}
          key={index}
          reversed={reversed[index]}
          index={index}
        />
      ))}
    </div>
  );
};

export default Trainers;
