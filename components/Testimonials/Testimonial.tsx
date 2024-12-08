import useFont from "@/hooks/useFont";
import { TestimonialProps } from "@/types/types";
import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonial: React.FC<TestimonialProps> = ({ fullname, commentary }) => {
  return (
    <div className={`testimonial`}>
      <span className="testimonial__fullname">{fullname}</span>
      <span className={`testimonial__commentary`}>{commentary}</span>
      <FaQuoteRight />
    </div>
  );
};

export default Testimonial;
