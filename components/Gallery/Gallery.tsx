"use client";
import React from "react";
import GalleryItem from "./GalleryItem";
import Modal from "../UI/Modal";
import { useCarousel } from "@/hooks/useCarousel";
import { GalleryItemProps } from "@/types/types";

interface GalleryProps {
  items: GalleryItemProps[];
}

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const { currentItem, setIndex, handleNextClick, handlePrevClick } =
    useCarousel({ items, allowNull: true, swipeThreshold: 75 });

  const handleOpenModal = (index: number) => {
    setIndex(index);
  };

  const handleCloseModal = () => {
    setIndex(null);
  };

  return (
    <div className="gallery">
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="gallery__item"
          onClick={() => handleOpenModal(index)}>
          <GalleryItem item={item} />
        </div>
      ))}

      {currentItem && (
        <Modal
          item={currentItem}
          onClose={handleCloseModal}
          onNext={handleNextClick}
          onPrev={handlePrevClick}
        />
      )}
    </div>
  );
};

export default Gallery;
