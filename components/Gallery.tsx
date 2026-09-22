import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { GalleryItem } from "@/lib/types";
import { cx } from "@/lib/utils";

interface GalleryProps {
  items: GalleryItem[];
  emptyLabel?: string;
  className?: string;
  /** Varied tile sizes instead of a uniform grid — used on the full gallery page. */
  editorial?: boolean;
}

// Repeats every 6 tiles; two tall/wide tiles per cycle keep the layout from
// feeling like a uniform stock-photo grid.
const editorialSpan = (index: number) => {
  const i = index % 6;
  if (i === 0) return "sm:col-span-2 sm:row-span-2";
  if (i === 3) return "sm:row-span-2";
  return "";
};

export function Gallery({ items, emptyLabel, className, editorial }: GalleryProps) {
  const slots = items.length > 0 ? items : Array.from({ length: 6 });

  return (
    <div
      className={cx(
        "grid grid-cols-2 gap-3 sm:grid-cols-3",
        editorial && "sm:auto-rows-[140px]",
        className
      )}
    >
      {slots.map((item, index) => {
        const galleryItem = item as GalleryItem | undefined;
        return (
          <div
            key={galleryItem?.id ?? index}
            className={cx(
              "relative overflow-hidden rounded-sm",
              editorial ? cx("aspect-square sm:aspect-auto", editorialSpan(index)) : "aspect-square"
            )}
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
