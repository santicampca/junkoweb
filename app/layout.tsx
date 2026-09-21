import type { Metadata } from "next";
import {
  Cinzel,
  Cormorant_Garamond,
  Playfair_Display,
  Inter,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getSiteUrl } from "@/lib/site-url";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Junko Golf Club — Golf, montaña y tradición",
    template: "%s | Junko Golf Club",
  },
  description:
    "Junko Golf Club es un club de golf privado de montaña que combina naturaleza, tradición y un servicio de exclusividad discreta.",
  keywords: [
    "Junko Golf Club",
    "club de golf",
    "golf de montaña",
    "membresías de golf",
    "torneos de golf",
    "reservas de golf",
  ],
  openGraph: {
    type: "website",
    siteName: "Junko Golf Club",
    title: "Junko Golf Club — Golf, montaña y tradición",
    description:
      "Un club de golf privado de montaña que combina naturaleza, tradición y un servicio de exclusividad discreta.",
    url: siteUrl,
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Junko Golf Club",
    description:
      "Un club de golf privado de montaña que combina naturaleza, tradición y un servicio de exclusividad discreta.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cinzel.variable} ${cormorant.variable} ${playfair.variable} ${inter.variable} ${jakarta.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
