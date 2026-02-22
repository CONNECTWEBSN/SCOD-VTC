import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/typographie.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SCOD VTC — Réservez votre VTC partout au Sénégal",
  description:
    "Service de chauffeur privé premium au Sénégal. BMW, Tesla, Mercedes. Réservation en ligne, paiement Orange Money, Wave, CB. Transfert aéroport AIBD, trajets pro, événements.",
  keywords: [
    "VTC Sénégal",
    "chauffeur privé Dakar",
    "transfert aéroport AIBD",
    "location voiture avec chauffeur",
    "Orange Money",
    "Wave",
    "BMW",
    "Tesla",
    "Mercedes",
  ],
  authors: [{ name: "SCOD VTC" }],
  creator: "SCOD VTC",
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://scod-vtc.sn",
    siteName: "SCOD VTC",
    title: "SCOD VTC — Chauffeur privé premium au Sénégal",
    description:
      "Réservez votre VTC avec chauffeur professionnel. Flotte premium : BMW, Tesla, Mercedes. Paiement mobile money et CB.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SCOD VTC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SCOD VTC — Chauffeur privé premium au Sénégal",
    description:
      "Réservez votre VTC avec chauffeur professionnel. Flotte premium : BMW, Tesla, Mercedes.",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
