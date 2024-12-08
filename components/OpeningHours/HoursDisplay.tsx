import { OpeningHoursDataType } from "@/types/types";
import React from "react";
import { motion } from "framer-motion";
import useFadeAnimation from "@/hooks/useFadeAnimation";

const HoursDisplay: React.FC<
  OpeningHoursDataType & { animationDirection: "left" | "right" }
> = ({
  days,
  hourBegin,
  hourEnd,
  minutesBegin,
  minutesEnd,
  animationDirection,
}) => {
  const { ref, controls, variants } = useFadeAnimation(animationDirection);

  return (
    <motion.div
      className="hours-display"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}>
      <div className="hours-display__hours">
        <div className="hours-begin">
          <span>{hourBegin}</span>
          <span className="minutes-begin">
            H {minutesBegin ? minutesBegin : "00"}
          </span>
        </div>
        <span className="separator">-</span>
        <div className="hours-end">
          <span>{hourEnd}</span>
          <span className="minutes-end">
            H {minutesEnd ? minutesEnd : "00"}
          </span>
        </div>
      </div>
      <div className="hours-display__days">
        <span>{days}</span>
      </div>
    </motion.div>
  );
};

export default HoursDisplay;
