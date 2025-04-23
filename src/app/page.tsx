import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainLayout } from "@/components/layout/main-layout";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";
import { StickyCTA } from "@/components/ui/sticky-cta";
import { Guarantees } from "@/components/sections/guarantees";

export const metadata = {
  title:
    "KAIRO Digital | Développeur web freelance et expert en visibilité web à Belfort",
  description:
    "KAIRO Digital est une agence web à Belfort spécialisée dans la création de sites web et l'amélioration de votre visibilité en ligne. Nous créons des sites web performants, élégants et optimisés pour les moteurs de recherche en Franche-Comté.",
  keywords:
    "développement web Belfort, référencement web Belfort, visibilité en ligne, site web Belfort, agence web Belfort, design, responsive, Next.js, React, Tailwind CSS, Franche-Comté, Territoire de Belfort",
  alternates: {
    canonical: "https://www.kairo-digital.fr",
  },
};

export default function Home() {
  return (
    <MainLayout>
      <Script id="schema-website" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: "https://www.kairo-digital.fr/",
          name: "KAIRO Digital",
          description:
            "Agence web à Belfort et experts en visibilité en ligne en Franche-Comté",
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://www.kairo-digital.fr/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}
      </Script>

      <Script id="schema-business" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "KAIRO Digital",
          image: "https://www.kairo-digital.fr/images/kairo-hero-img.webp",
          "@id": "https://www.kairo-digital.fr/#organization",
          url: "https://www.kairo-digital.fr",
          telephone: "+33766121696",
          priceRange: "€€",
          address: {
            "@type": "PostalAddress",
            streetAddress: "29 Faubourg de Montbéliard",
            addressLocality: "Belfort",
            postalCode: "90000",
            addressCountry: "FR",
            addressRegion: "Franche-Comté",
          },
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
          sameAs: [
            "https://www.facebook.com/kairodigital",
            "https://www.instagram.com/kairodigital",
            "https://www.linkedin.com/company/kairodigital",
            "https://twitter.com/kairodigital",
          ],
        })}
      </Script>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900/30 to-neutral-900/40 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Solution Video Hybride avec preload */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controlsList="nodownload"
              disablePictureInPicture
              disableRemotePlayback
              className="w-full h-full object-cover opacity-80 dark:opacity-70 mix-blend-overlay"
              style={{ visibility: "visible" }}
            >
              {/* Version locale compressée (priorité 1) */}
              <source
                src="/images/69371-533801345-compressed-720p.mp4"
                type="video/mp4"
              />
              {/* Version hébergée sur Amazon S3 (priorité 2) */}
              <source
                src="https://kairo-digital-videos.s3.amazonaws.com/69371-533801345.mp4"
                type="video/mp4"
              />
              {/* Version CDN externe (priorité 3) */}
              <source
                src="https://res.cloudinary.com/dh23iusd3/video/upload/v1684952302/kairo_hero_video_q7aszr.mp4"
                type="video/mp4"
              />
              {/* Version locale original (priorité 4) */}
              <source src="/images/69371-533801345.mp4" type="video/mp4" />
              {/* Version locale alternative (priorité 5) */}
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-neutral-900/30"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center pt-24 sm:pt-32">
          <ScrollReveal animation="fade-down">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 animate-fade-in drop-shadow-md">
              Nous développons des sites qui{" "}
              <span className="text-amber-400 dark:text-amber-300 relative inline-block animate-pulse">
                convertissent
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 dark:text-neutral-200/80 max-w-3xl mx-auto mb-8">
              Des sites web conçus pour transformer vos{" "}
              <span className="font-semibold">visiteurs en clients</span>
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg shadow-lg"
              >
                <Link href="/contact">Demander votre devis gratuit</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Nos services</h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Des solutions digitales complètes et sur mesure pour développer
                votre activité en ligne et maximiser votre présence sur le web.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealGroup
            animation="fade-up"
            stagger={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Sites vitrines</CardTitle>
                <CardDescription>
                  Présentez votre entreprise efficacement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Des sites vitrines professionnels et élégants qui reflètent
                  l&apos;identité de votre entreprise. Parfaitement adaptés aux
                  mobiles et optimisés pour la visibilité en ligne, ils mettent
                  en valeur vos produits et services pour maximiser les
                  conversions.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="default"
                  className="w-full bg-blue-800 hover:bg-blue-700 shadow-sm transition-all"
                >
                  <Link href="/services#web-development">
                    Découvrir cette offre
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sites e-commerce</CardTitle>
                <CardDescription>
                  Vendez en ligne et augmentez votre chiffre d&apos;affaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Des boutiques en ligne performantes et sécurisées qui
                  transforment les visiteurs en clients. Intégration des
                  paiements, gestion des stocks, expérience d&apos;achat fluide
                  et interface d&apos;administration intuitive pour gérer vos
                  produits.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="default"
                  className="w-full bg-blue-800 hover:bg-blue-700 shadow-sm transition-all"
                >
                  <Link href="/services#ecommerce">Découvrir cette offre</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance & Support</CardTitle>
                <CardDescription>
                  Sécurité, mises à jour et amélioration des performances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Un suivi régulier pour garantir le bon fonctionnement, la
                  sécurité et les performances de votre site. Mises à jour
                  techniques, sauvegardes, corrections de bugs et assistance
                  technique pour une tranquillité d&apos;esprit totale.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="default"
                  className="w-full bg-blue-800 hover:bg-blue-700 shadow-sm transition-all"
                >
                  <Link href="/services#maintenance">
                    Découvrir cette offre
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </ScrollRevealGroup>

          <ScrollReveal
            animation="fade-up"
            delay={2}
            className="mt-12 text-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-blue-800 hover:bg-blue-700 shadow-md transition-all"
            >
              <Link href="/contact">
                Obtenir votre devis personnalisé gratuit →
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* À propos Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal animation="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  À propos de KAIRO Digital
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                  KAIRO Digital, forte de son expertise en développement web et
                  de sa passion pour l&apos;innovation digitale, se consacre à
                  accompagner les entreprises dans leur transformation
                  numérique.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                  Notre objectif est clair : créer non seulement des sites
                  esthétiques, mais également des solutions qui génèrent des
                  résultats tangibles pour votre activité. Nous allions design
                  contemporain, performances techniques optimales et stratégies
                  de conversion efficaces pour offrir des solutions sur mesure
                  qui répondent parfaitement à vos ambitions commerciales.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button asChild className="bg-blue-800 hover:bg-blue-700">
                    <Link href="/about">En savoir plus sur nous</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal animation="fade-left" delay={1}>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-800 to-blue-300 flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">
                    KAIRO Digital
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex flex-col justify-end p-6">
                  <div className="bg-white/90 dark:bg-black/80 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-blue-800 dark:text-blue-300 font-medium">
                      &ldquo;Notre objectif est de transformer chaque visiteur
                      en client fidèle grâce à des expériences web
                      exceptionnelles.&rdquo;
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                      — Bryan Hilaire, Fondateur
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Processus de travail Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Notre processus de travail
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Une méthode structurée et transparente pour transformer votre
                vision en une solution web efficace
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Ligne de connexion verticale */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-blue-600 dark:bg-blue-500 transform md:translate-x-[-0.5px] hidden md:block"></div>

              <ScrollRevealGroup
                animation="fade-up"
                stagger={0.2}
                className="space-y-12 md:space-y-24"
              >
                {/* Étape 1 */}
                <div className="flex flex-col md:flex-row md:items-center gap-8 relative">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800 shadow-sm">
                      <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-400">
                        1. Analyse des besoins
                      </h3>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        Nous commençons par une étude approfondie de vos
                        objectifs, de votre public cible et de votre secteur
                        d&apos;activité. Cette phase nous permet de comprendre
                        parfaitement vos attentes et de définir les
                        fonctionnalités clés de votre projet.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center md:justify-start order-1 md:order-2">
                    <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full z-10 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      1
                    </div>
                  </div>
                </div>

                {/* Étape 2 */}
                <div className="flex flex-col md:flex-row md:items-center gap-8 relative">
                  <div className="md:w-1/2 md:pl-12 order-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800 shadow-sm">
                      <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-400">
                        2. Stratégie et planification
                      </h3>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        Nous élaborons une stratégie claire et un plan
                        d&apos;action détaillé pour votre projet. Cette étape
                        inclut la création de maquettes, la définition de
                        l&apos;architecture du site et l&apos;établissement
                        d&apos;un calendrier précis pour respecter vos délais.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center md:justify-end order-1">
                    <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full z-10 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      2
                    </div>
                  </div>
                </div>

                {/* Étape 3 */}
                <div className="flex flex-col md:flex-row md:items-center gap-8 relative">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800 shadow-sm">
                      <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-400">
                        3. Conception et développement
                      </h3>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        C&apos;est l&apos;étape de création concrète de votre
                        site. Nous développons une solution sur mesure,
                        responsive et optimisée, en vous tenant informé
                        régulièrement de l&apos;avancement et en intégrant vos
                        retours pour des ajustements immédiats.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center md:justify-start order-1 md:order-2">
                    <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full z-10 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      3
                    </div>
                  </div>
                </div>

                {/* Étape 4 */}
                <div className="flex flex-col md:flex-row md:items-center gap-8 relative">
                  <div className="md:w-1/2 md:pl-12 order-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800 shadow-sm">
                      <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-400">
                        4. Lancement et suivi continu
                      </h3>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        Une fois votre site mis en ligne, nous vous accompagnons
                        pour garantir des performances optimales. Nous assurons
                        un suivi régulier, des mises à jour de sécurité et vous
                        proposons des améliorations continues pour faire évoluer
                        votre présence en ligne.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center md:justify-end order-1">
                    <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full z-10 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      4
                    </div>
                  </div>
                </div>
              </ScrollRevealGroup>
            </div>
          </div>

          <ScrollReveal
            animation="fade-up"
            delay={3}
            className="text-center mt-16"
          >
            <Button
              asChild
              size="lg"
              className="bg-blue-800 hover:bg-blue-700 shadow-md transition-all"
            >
              <Link href="/contact">Discutons de votre projet →</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Guarantees Section placée en bas */}
      <Guarantees />

      {/* Sticky CTA */}
      <StickyCTA />
    </MainLayout>
  );
}
