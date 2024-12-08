import React, { useRef, useState } from "react";
import { GalleryItemProps, isImageItem, isVideoItem } from "@/types/types";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import Image from "next/image";

interface Props {
  item: GalleryItemProps;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const GalleryModal: React.FC<Props> = ({ item, onClose, onPrev, onNext }) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if ("touches" in e) {
      touchStartX.current = e.touches[0].clientX;
    } else {
      touchStartX.current = e.clientX;
    }
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStartX.current !== null) {
      const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
      setSwipeDistance(currentX - touchStartX.current);

      // Prevent scrolling when swiping
      if ("touches" in e) {
        e.preventDefault(); // Important to stop browser scroll on mobile
      }
    }
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 100; // Distance minimale pour déclencher un swipe
    if (swipeDistance > swipeThreshold) {
      onPrev(); // Swipe vers la gauche
    } else if (swipeDistance < -swipeThreshold) {
      onNext(); // Swipe vers la droite
    }
    setSwipeDistance(0); // Réinitialiser la distance du swipe
    setIsSwiping(false);
    touchStartX.current = null;
  };

  return (
    <div
      className="gallery-modal"
      onMouseDown={handleTouchStart}
      onMouseMove={isSwiping ? handleTouchMove : undefined}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <div className="gallery-modal__overlay" onClick={onClose}></div>
      <div className="gallery-modal__content">
        <button className="gallery-modal__close" onClick={onClose}>
          <FaTimes />
        </button>
        <button className="gallery-modal__prev" onClick={onPrev}>
          <FaArrowLeft />
        </button>
        <div
          className="gallery-modal__media"
          style={{
            transform: `translateX(${swipeDistance}px)`,
            transition: !isSwiping ? "transform 0.3s ease" : "none",
          }}>
          {isImageItem(item) ? (
            <Image
              src={item.src}
              alt="Gallery Item"
              layout="responsive"
              width={500}
              height={500}
              className="gallery-item__image"
            />
          ) : isVideoItem(item) ? (
            <video src={item.src} className="gallery-item__video" controls />
          ) : null}
        </div>
        <button className="gallery-modal__next" onClick={onNext}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default GalleryModal;
