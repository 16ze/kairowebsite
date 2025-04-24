import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "./seo.css";
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
    default:
      "KAIRO Digital | Développeur web freelance et expert en visibilité web à Belfort",
    template: `%s | KAIRO Digital - Développeur web freelance à Belfort`,
  },
  description:
    "KAIRO Digital est un développeur web freelance à Belfort spécialisé dans la création de sites web et l'amélioration de votre visibilité en ligne. Nous créons des sites web performants, élégants et optimisés pour les moteurs de recherche en Franche-Comté.",
  generator: "Next.js",
  applicationName: "KAIRO Digital",
  referrer: "origin-when-cross-origin",
  keywords: [
    "développeur web Belfort",
    "sites web Belfort",
    "référencement web Belfort",
    "visibilité en ligne Franche-Comté",
    "développement web Territoire de Belfort",
    "responsive design",
  ],
  authors: [
    {
      name: "KAIRO Digital",
      url: "https://www.kairo-digital.fr",
    },
  ],
  creator: "KAIRO Digital",
  publisher: "KAIRO Digital",
  category: "Web Development",
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
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.kairo-digital.fr",
    title:
      "KAIRO Digital | Développeur web freelance et expert en visibilité web à Belfort",
    description:
      "KAIRO Digital est un développeur web freelance à Belfort spécialisé dans la création de sites web et l'amélioration de votre visibilité en ligne. Nous créons des sites web performants, élégants et optimisés pour les moteurs de recherche en Franche-Comté.",
    siteName: "KAIRO Digital",
    images: ["https://www.kairo-digital.fr/images/kairo-og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "KAIRO Digital | Développeur web freelance et expert en visibilité web à Belfort",
    description:
      "KAIRO Digital est un développeur web freelance à Belfort spécialisé dans la création de sites web et l'amélioration de votre visibilité en ligne. Nous créons des sites web performants, élégants et optimisés pour les moteurs de recherche en Franche-Comté.",
    creator: "@kairodigital",
    images: ["https://www.kairo-digital.fr/images/kairo-og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.kairo-digital.fr",
    languages: {
      fr: "https://www.kairo-digital.fr",
      en: "https://www.kairo-digital.fr/en",
    },
  },
  verification: {
    google: "G-58FT91034E",
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KAIRO Digital",
              url: "https://www.kairo-digital.fr",
              logo: "https://www.kairo-digital.fr/images/logo.png",
              description:
                "KAIRO Digital est une agence à Belfort spécialisée dans le développement web et l'amélioration de la visibilité en ligne. Nous créons des sites web performants, élégants et optimisés pour les moteurs de recherche en Franche-Comté.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "29 Faubourg de Montbéliard",
                addressLocality: "Belfort",
                postalCode: "90000",
                addressCountry: "FR",
                addressRegion: "Franche-Comté",
              },
              sameAs: [
                "https://www.facebook.com/kairodigital",
                "https://www.instagram.com/kairodigital",
                "https://www.linkedin.com/company/kairodigital",
                "https://twitter.com/kairodigital",
              ],
              geo: {
                "@type": "GeoCoordinates",
                latitude: 47.6379,
                longitude: 6.8628,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "18:00",
                },
              ],
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 47.6379,
                  longitude: 6.8628,
                },
                geoRadius: "50000",
              },
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 47.6379,
                  longitude: 6.8628,
                },
                geoRadius: "50000",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33766121696",
                contactType: "customer service",
                availableLanguage: ["French", "English"],
                email: "contact.kairodigital@gmail.com",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services KAIRO Digital",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Développement Web à Belfort",
                      description:
                        "Création de sites vitrines, e-commerce et applications web sur mesure à Belfort et en Franche-Comté",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Amélioration du référencement local",
                      description:
                        "Amélioration de la visibilité en ligne et de la présence sur les moteurs de recherche pour entreprises à Belfort",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Sites Vitrines & E-commerce en Franche-Comté",
                      description:
                        "Création de sites web professionnels pour présenter votre activité ou vendre en ligne à Belfort et environs",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white min-h-screen`}
      >
        {children}
        <Toaster />
        <CookieConsent />
      </body>
    </html>
  );
}
