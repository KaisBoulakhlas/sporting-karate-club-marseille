import { useState } from "react";

interface UseSliderReturn<T> {
  currentIndex: number | null;
  handlePrevClick: () => void;
  handleNextClick: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  currentItem: T | null;
  setIndex: (index: number | null) => void;
}

const useSlider = <T,>(
  items: T[],
  allowNull: boolean = false
): UseSliderReturn<T> => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(
    allowNull ? null : 0
  );

  const handlePrevClick = () => {
    if (currentIndex !== null) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        setCurrentIndex(items.length - 1);
      }
    }
  };

  const handleNextClick = () => {
    if (currentIndex !== null) {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }
  };

  const setIndex = (index: number | null) => {
    if (allowNull || index !== null) {
      setCurrentIndex(index);
    }
  };

  return {
    currentIndex,
    handlePrevClick,
    handleNextClick,
    isPrevDisabled: currentIndex === 0,
    isNextDisabled: currentIndex === items.length - 1,
    currentItem: currentIndex !== null ? items[currentIndex] : null,
    setIndex,
  };
};

export default useSlider;
