import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { GalleryItem } from "@/lib/types";
import { cx } from "@/lib/utils";

interface GalleryProps {
  items: GalleryItem[];
  emptyLabel?: string;
  className?: string;
  /** Magazine-style mosaic (see .gallery-mosaic) instead of a uniform grid. */
  editorial?: boolean;
}

export function Gallery({ items, emptyLabel, className, editorial }: GalleryProps) {
  const slots = items.length > 0 ? items : Array.from({ length: 6 });

  return (
    <div
      className={cx(
        editorial ? "gallery-mosaic" : "grid grid-cols-2 gap-3 sm:grid-cols-3",
        className
      )}
    >
      {slots.map((item, index) => {
        const galleryItem = item as GalleryItem | undefined;
        return (
          <div
            key={galleryItem?.id ?? index}
            className={cx("relative overflow-hidden rounded-sm", !editorial && "aspect-square")}
          >
            {galleryItem?.image ? (
              <Image
                src={galleryItem.image}
                alt={galleryItem.alt ?? "Junko Golf Club"}
                fill
                quality={90}
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
