import { Suspense } from "react";
import Gallery from "./Gallery";
import { GalleryService } from "@/services/gallery.service";
import { Loader } from "@/components/UI/Loading/Loader";


async function GalleryContent() {
  const items = await GalleryService.getGalleryItems();
  return <Gallery items={items} />;
}

export function GalleryContainer() {
  return (
    <Suspense fallback={<Loader />}>
      <GalleryContent />
    </Suspense>
  );
}
