import { useAnimation, Variant, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Direction = 'left' | 'right';

const useFadeAnimation = (direction: Direction, amount: number = 0.5, onComplete?: () => void) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  const variants: { hidden: Variant; visible: Variant } = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible").then(() => {
        if (onComplete) {
          onComplete();
        }
      });
    }
  }, [isInView, controls, onComplete]);

  return { ref, controls, variants };
};

export default useFadeAnimation;
