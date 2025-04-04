import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KAIRO Digital | Agence de développement web et optimisation SEO",
  description:
    "KAIRO Digital est une agence spécialisée dans le développement web et l'optimisation SEO. Nous créons des sites web performants, élégants et optimisés pour les moteurs de recherche.",
  generator: "Next.js",
  category: "technology",
  authors: [{ name: "KAIRO Digital" }],
  keywords:
    "développement web, optimisation SEO, site web, agence web, design, responsive",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
