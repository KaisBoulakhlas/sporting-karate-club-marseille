"use client";
import React from "react";
import Testimonial from "../Testimonials/Testimonial";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useCarousel } from "@/hooks/useCarousel";
import { testimonials } from "@/constants/data";

const Slider: React.FC = () => {
  const {
    currentIndex,
    handlePrevClick,
    handleNextClick,
    setIndex,
    isPrevDisabled,
    isNextDisabled,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isSwiping,
    touchStartX,
    touchMoveX,
  } = useCarousel({ items: testimonials, swipeThreshold: 75 });

  const calculateTransform = () => {
    if (currentIndex === null) return "translate3d(0%, 0, 0)";
    if (touchMoveX !== null && touchStartX.current !== null) {
      const swipeDistance = touchMoveX - touchStartX.current;
      return `translate3d(${
        -currentIndex * 100 + (swipeDistance / window.innerWidth) * 100
      }%, 0, 0)`;
    }
    return `translate3d(${-currentIndex * 100}%, 0, 0)`;
  };

  return (
    <div className="slider">
      <div className="slider__container">
        <span
          className={`slider__arrow-left ${isPrevDisabled ? "disabled" : ""}`}
          onClick={handlePrevClick}>
          <FaArrowLeft />
        </span>
        <div
          className="slider__content"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}>
          <div
            className="slider__inner"
            style={{
              transform: calculateTransform(),
              transition: isSwiping ? "none" : "transform 0.5s ease-in-out",
            }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`slider__slide ${
                  index === currentIndex ? "slider__slide--active" : ""
                }`}>
                <Testimonial
                  fullname={testimonial.fullname}
                  commentary={testimonial.commentary}
                />
              </div>
            ))}
          </div>
        </div>
        <span
          className={`slider__arrow-right ${isNextDisabled ? "disabled" : ""}`}
          onClick={handleNextClick}>
          <FaArrowRight />
        </span>
      </div>
      <div className="slider__dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`slider__dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
