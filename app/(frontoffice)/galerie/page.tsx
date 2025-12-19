import Title from "@/components/UI/Title";
import { Metadata } from "next";
import { GalleryContainer } from "@/components/Gallery/GalleryContainer";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Notre gallerie de photos/vidéos du club.",
};

export const revalidate = false;

export default function GalleryPage() {
  return (
    <main className="galleryContainer">
      <Title title="Notre galerie" />
      <GalleryContainer />
    </main>
  );
}
