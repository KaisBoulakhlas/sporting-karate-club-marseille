import { useSwipe } from "./useSwipe";
import useSlider from "./useSlider";

interface UseCarouselProps<T> {
  items: T[];
  allowNull?: boolean;
  swipeThreshold?: number;
}

interface UseCarouselReturn<T> {
  currentIndex: number | null;
  currentItem: T | null;
  handlePrevClick: () => void;
  handleNextClick: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  setIndex: (index: number | null) => void;
  handleTouchStart: (e: React.TouchEvent | React.MouseEvent) => void;
  handleTouchMove: (e: React.TouchEvent | React.MouseEvent) => void;
  handleTouchEnd: () => void;
  isSwiping: boolean;
  touchStartX: React.MutableRefObject<number | null>;
  touchMoveX: number | null;
}


export const useCarousel = <T,>({
  items,
  allowNull = false,
  swipeThreshold = 75,
}: UseCarouselProps<T>): UseCarouselReturn<T> => {
  const slider = useSlider(items, allowNull);

  const swipe = useSwipe({
    onNext: slider.handleNextClick,
    onPrev: slider.handlePrevClick,
    threshold: swipeThreshold,
  });

  return {
    currentIndex: slider.currentIndex,
    currentItem: slider.currentItem,
    handlePrevClick: slider.handlePrevClick,
    handleNextClick: slider.handleNextClick,
    isPrevDisabled: slider.isPrevDisabled,
    isNextDisabled: slider.isNextDisabled,
    setIndex: slider.setIndex,
    handleTouchStart: swipe.handleTouchStart,
    handleTouchMove: swipe.handleTouchMove,
    handleTouchEnd: swipe.handleTouchEnd,
    isSwiping: swipe.isSwiping,
    touchStartX: swipe.touchStartX,
    touchMoveX: swipe.touchMoveX,
  };
};
