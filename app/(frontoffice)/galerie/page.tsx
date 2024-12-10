import Gallery from "@/components/Gallery/Gallery";
import Title from "@/components/UI/Title";
import { db } from "@/lib/db";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Gallerie",
  description: "Notre gallerie de photos/vidéos du club.",
};

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
