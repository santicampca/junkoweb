export function formatDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Deterministically rotates through `items` in fixed-size windows over
 * time (server-rendered, no client JS or stored cursor needed): every
 * `periodMs`, the window advances by `size`, wrapping around the full
 * list. Within one window every item is distinct, and as more items get
 * added the rotation naturally covers all of them over successive
 * periods instead of always showing the same first few.
 */
export function rotatingSlice<T>(items: T[], size: number, periodMs = 1000 * 60 * 60 * 24): T[] {
  const n = items.length;
  if (n <= size) return items;
  const period = Math.floor(Date.now() / periodMs);
  const start = (period * size) % n;
  return Array.from({ length: size }, (_, i) => items[(start + i) % n]);
}
