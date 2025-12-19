import { db } from "@/lib/db";
import { GALLERY_CONFIG } from "@/config/gallery.config";
import { unstable_cache } from "next/cache";

export class GalleryService {
  static async getGalleryItems() {
    // Cache avec tag "gallery" pour revalidation on-demand
    const getCachedGallery = unstable_cache(
      async () => {
        return db.galleryItem.findMany({
          orderBy: { [GALLERY_CONFIG.orderBy]: "desc" },
        });
      },
      ["gallery-items"],
      { tags: ["gallery"], revalidate: false }
    );

    return getCachedGallery();
  }
}
