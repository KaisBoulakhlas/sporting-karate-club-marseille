import { useRef, useState } from "react";

interface UseSwipeProps {
  onNext: () => void;
  onPrev: () => void;
  threshold?: number;
}


export const useSwipe = ({ onNext, onPrev, threshold = 75 }: UseSwipeProps) => {
  const touchStartX = useRef<number | null>(null);
  const [touchMoveX, setTouchMoveX] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const getClientX = (e: React.TouchEvent | React.MouseEvent): number => {
    return "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    touchStartX.current = getClientX(e);
    setIsSwiping(true);
    setTouchMoveX(null);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStartX.current === null) return;
    const currentX = getClientX(e);
    setTouchMoveX(currentX);
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchMoveX === null) {
      setIsSwiping(false);
      return;
    }

    const distance = touchStartX.current - touchMoveX;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        onNext();
      } else {
        onPrev();
      }
    }

    setIsSwiping(false);
    touchStartX.current = null;
    setTouchMoveX(null);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isSwiping,
    touchStartX,
    touchMoveX,
  };
};
