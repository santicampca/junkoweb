import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { GalleryItem } from "@/lib/types";
import { cx } from "@/lib/utils";

interface GalleryProps {
  items: GalleryItem[];
  emptyLabel?: string;
  className?: string;
}

export function Gallery({ items, emptyLabel, className }: GalleryProps) {
  const slots = items.length > 0 ? items : Array.from({ length: 6 });

  return (
    <div
      className={cx(
        "grid grid-cols-2 gap-4 sm:grid-cols-3",
        className
      )}
    >
      {slots.map((item, index) => {
        const galleryItem = item as GalleryItem | undefined;
        return (
          <div
            key={galleryItem?.id ?? index}
            className="relative aspect-square overflow-hidden rounded-sm"
          >
            {galleryItem?.image ? (
              <Image
                src={galleryItem.image}
                alt={galleryItem.alt ?? "Junko Golf Club"}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <ImagePlaceholder label={emptyLabel ?? "Galería próximamente"} />
            )}
          </div>
        );
      })}
    </div>
  );
}
