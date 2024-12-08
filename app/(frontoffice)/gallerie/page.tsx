import Gallery from "@/components/Gallery/Gallery";
import Title from "@/components/UI/Title";
import { db } from "@/lib/db";
import React from "react";

const GalleryPage = async () => {
  const items = await db.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="galleryContainer">
      <Title title="Notre gallerie" />
      <Gallery items={items} />
    </main>
  );
};

export default GalleryPage;
