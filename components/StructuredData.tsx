import { getSiteUrl } from "@/lib/site-url";

/**
 * GolfClub JSON-LD for the homepage. Name, founding year, and address are
 * sourced from the Federación Venezolana de Golf's own listing for the
 * club. Deliberately omits phone, coordinates, price range, opening
 * hours, and ratings, since none of those are confirmed — an unfilled
 * field is worse than an absent one.
 */
export function StructuredData() {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "GolfClub",
    name: "Junko Golf Club",
    url: siteUrl,
    description:
      "Junko Golf Club, fundado en 1948, es un club de golf en las montañas de El Junquito, estado La Guaira, Venezuela.",
    foundingDate: "1948",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carretera El Junquito, Km. 19, El Junko",
      addressLocality: "El Junquito",
      addressRegion: "La Guaira",
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
