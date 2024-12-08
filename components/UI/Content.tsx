import useFont from "@/hooks/useFont";
import { HeadingType } from "@/types/types";
import React from "react";
import Title from "./Title";

const Content: React.FC<HeadingType> = ({ title, desc }) => {
  return (
    <div className="content">
      <Title title={title} />
      <p className="content__desc">{desc}</p>
    </div>
  );
};

export default Content;
