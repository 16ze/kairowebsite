import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "./seo.css";
import Analytics from "@/lib/analytics";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kairo-digital.fr"),
  title: {
    default: "KAIRO Digital | Agence de développement web et optimisation SEO",
    template: "%s | KAIRO Digital",
  },
  description:
    "KAIRO Digital est une agence spécialisée dans le développement web et l'optimisation SEO. Nous créons des sites web performants, élégants et optimisés pour les moteurs de recherche.",
  generator: "Next.js",
  applicationName: "KAIRO Digital",
  referrer: "origin-when-cross-origin",
  keywords:
    "développement web, optimisation SEO, site web, agence web, design, responsive, Next.js, React, Tailwind CSS",
  authors: [{ name: "KAIRO Digital", url: "https://www.kairo-digital.fr" }],
  creator: "KAIRO Digital",
  publisher: "KAIRO Digital",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.kairo-digital.fr",
    title: "KAIRO Digital | Agence de développement web et optimisation SEO",
    description:
      "KAIRO Digital est une agence spécialisée dans le développement web et l'optimisation SEO. Nous créons des sites web performants, élégants et optimisés pour les moteurs de recherche.",
    siteName: "KAIRO Digital",
    images: [
      {
        url: "https://www.kairo-digital.fr/images/kairo-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KAIRO Digital - Agence de développement web et optimisation SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAIRO Digital | Agence de développement web et optimisation SEO",
    description:
      "KAIRO Digital est une agence spécialisée dans le développement web et l'optimisation SEO. Nous créons des sites web performants, élégants et optimisés pour les moteurs de recherche.",
    creator: "@kairodigital",
    images: ["https://www.kairo-digital.fr/images/kairo-og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.kairo-digital.fr",
    languages: {
      fr: "https://www.kairo-digital.fr",
    },
  },
  verification: {
    google: "google-site-verification=VOTRE_CODE_DE_VERIFICATION",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://www.kairo-digital.fr" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KAIRO Digital",
              url: "https://www.kairo-digital.fr",
              logo: "https://www.kairo-digital.fr/images/kairo-logo.png",
              sameAs: [
                "https://www.facebook.com/kairodigital",
                "https://www.instagram.com/kairodigital",
                "https://www.linkedin.com/company/kairodigital",
                "https://twitter.com/kairodigital",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33-123-456-789",
                contactType: "customer service",
                availableLanguage: ["French"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Rue de l'Innovation",
                addressLocality: "Paris",
                postalCode: "75000",
                addressCountry: "FR",
              },
              description:
                "KAIRO Digital est une agence spécialisée dans le développement web et l'optimisation SEO. Nous créons des sites web performants, élégants et optimisés pour les moteurs de recherche.",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white min-h-screen`}
      >
        <Analytics />
        {children}
        <Toaster />
        <CookieConsent />
      </body>
    </html>
  );
}
