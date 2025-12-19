"use client";
import { ModalProps } from "@/types/types";
import React, { useEffect, useState } from "react";
import GalleryItem from "../Gallery/GalleryItem";
import { useSwipe } from "@/hooks/useSwipe";

const Modal: React.FC<ModalProps> = ({ item, onClose, onNext, onPrev }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  const { handleTouchStart, handleTouchMove, handleTouchEnd, isSwiping } = useSwipe({
    onNext: () => {
      setIsSliding(true);
      setTimeout(() => {
        onNext();
        setIsSliding(false);
      }, 300);
    },
    onPrev: () => {
      setIsSliding(true);
      setTimeout(() => {
        onPrev();
        setIsSliding(false);
      }, 300);
    },
    threshold: 75,
  });

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement) === e.currentTarget) {
      handleClose();
    }
  };

  const handleNextClick = () => {
    setIsSliding(true);
    setTimeout(() => {
      onNext();
      setIsSliding(false);
    }, 300);
  };

  const handlePrevClick = () => {
    setIsSliding(true);
    setTimeout(() => {
      onPrev();
      setIsSliding(false);
    }, 300);
  };

  return (
    <div
      className={`modal ${isOpen ? "modal--open" : ""}`}
      onClick={handleModalClick}>
      <span className="modal__close" onClick={handleClose}>
        &times;
      </span>
      <button
        className="modal__nav modal__nav--prev"
        onClick={(e) => {
          e.stopPropagation();
          handlePrevClick();
        }}>
        &#10094;
      </button>
      <div
        className={`modal__content ${
          isSliding ? "modal__content--sliding" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        style={{ cursor: isSwiping ? "grabbing" : "grab" }}>
        <GalleryItem
          item={item}
          cnImage="modal__image"
          cnVideo="modal__video"
          showControls={true}
        />
      </div>
      <button
        className="modal__nav modal__nav--next"
        onClick={(e) => {
          e.stopPropagation();
          handleNextClick();
        }}>
        &#10095;
      </button>
    </div>
  );
};

export default Modal;
