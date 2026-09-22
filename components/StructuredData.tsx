import { getSiteUrl } from "@/lib/site-url";

/**
 * GolfClub JSON-LD for the homepage. Deliberately includes only facts
 * already stated as established truth elsewhere on the site (name,
 * founding year, general location) — no phone, street address,
 * coordinates, price range, opening hours, or ratings, since none of
 * those are confirmed. An unfilled field is worse than an absent one.
 */
export function StructuredData() {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "GolfClub",
    name: "Junko Golf Club",
    url: siteUrl,
    description:
      "Junko Golf Club, fundado en 1948, es un club de golf en las montañas de El Junquito, estado Vargas, Venezuela.",
    foundingDate: "1948",
    address: {
      "@type": "PostalAddress",
      addressLocality: "El Junquito",
      addressRegion: "Vargas",
      addressCountry: "VE",
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
