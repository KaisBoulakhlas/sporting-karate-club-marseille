"use client";
import { ModalProps } from "@/types/types";
import React, { useEffect, useState } from "react";
import GalleryItem from "../Gallery/GalleryItem";

const Modal: React.FC<ModalProps> = ({ item, onClose, onNext, onPrev }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const [isSliding, setIsSliding] = useState(false);

  const handleNext = () => {
    setIsSliding(true);
    setTimeout(() => {
      onNext();
      setIsSliding(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsSliding(true);
    setTimeout(() => {
      onPrev();
      setIsSliding(false);
    }, 300);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`modal ${isOpen ? "modal--open" : ""}`}
      onClick={handleClose}>
      <span className="modal__close" onClick={handleClose}>
        &times;
      </span>
      <button
        className="modal__nav modal__nav--prev"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}>
        &#10094;
      </button>
      <div
        className={`modal__content ${
          isSliding ? "modal__content--sliding" : ""
        }`}
        onClick={(e) => e.stopPropagation()}>
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
          handleNext();
        }}>
        &#10095;
      </button>
    </div>
  );
};

export default Modal;
