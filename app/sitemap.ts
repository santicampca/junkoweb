import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const routes = [
    "",
    "/club",
    "/membresias",
    "/reservas",
    "/torneos",
    "/galeria",
    "/contacto",
  ];

  const legalRoutes = ["/privacidad", "/cookies", "/terminos", "/aviso-legal"];

  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...legalRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
