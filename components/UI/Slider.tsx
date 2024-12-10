"use client";
import React, { useRef, useState } from "react";
import Testimonial from "../Testimonials/Testimonial";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useSlider from "@/hooks/useSlider";
import { testimonials } from "@/constants/data";

const Slider: React.FC = () => {
  const {
    currentIndex,
    handlePrevClick,
    handleNextClick,
    setIndex,
    isPrevDisabled,
    isNextDisabled,
  } = useSlider(testimonials);

  const touchStartX = useRef<number | null>(null);
  const [touchMoveX, setTouchMoveX] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const intermediateThreshold = 10; // Pourcentage de largeur visible pour déclencher un changement immédiat
  const swipeThreshold = 75; // Seuil pour compléter le swipe

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if ("touches" in e) {
      touchStartX.current = e.touches[0].clientX;
    } else {
      touchStartX.current = e.clientX;
    }
    setIsSwiping(true);
    setTouchMoveX(null);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStartX.current !== null) {
      const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
      setTouchMoveX(currentX);

      // Détection d'un seuil intermédiaire
      const distance = touchStartX.current - currentX;
      const swipePercentage = (distance / window.innerWidth) * 100;

      if (swipePercentage > intermediateThreshold && !isNextDisabled) {
        handleNextClick();
        handleTouchEnd(); // Terminer le swipe
      } else if (swipePercentage < -intermediateThreshold && !isPrevDisabled) {
        handlePrevClick();
        handleTouchEnd(); // Terminer le swipe
      }
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchMoveX === null) return;

    const distance = touchStartX.current - touchMoveX;

    setIsSwiping(false);

    // Vérification du seuil pour compléter le swipe
    if (distance > swipeThreshold) {
      handleNextClick();
    } else if (distance < -swipeThreshold) {
      handlePrevClick();
    }

    touchStartX.current = null;
    setTouchMoveX(null);
  };

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
