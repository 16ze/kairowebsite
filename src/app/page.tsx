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

export const metadata = {
  title: "KAIRO Digital | Agence de développement web et optimisation SEO",
  description:
    "KAIRO Digital est une agence de développement web et d'optimisation SEO qui vous aide à créer une présence en ligne puissante avec des sites web performants et optimisés.",
  keywords:
    "développement web, optimisation SEO, site web, agence web, design, responsive, Next.js, React, Tailwind CSS, Paris",
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
          description: "Agence de développement web et optimisation SEO",
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
          telephone: "+33-123-456-789",
          priceRange: "€€",
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Rue de l'Innovation",
            addressLocality: "Paris",
            postalCode: "75000",
            addressCountry: "FR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 48.8566,
            longitude: 2.3522,
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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900/80 to-neutral-900/90 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 will-change-transform perspective-1000 animate-subtle-float origin-center">
          <Image
            src="/images/kairo-hero-img.webp"
            alt="Hero background"
            fill
            className="object-cover opacity-40 dark:opacity-30 mix-blend-overlay"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center pt-24 sm:pt-32">
          <ScrollReveal animation="fade-down">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 animate-fade-in drop-shadow-md">
              Développement web &{" "}
              <span className="text-amber-400 dark:text-amber-300">
                Optimisation SEO
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={1}>
            <p className="text-lg md:text-xl text-white dark:text-neutral-200 max-w-3xl mx-auto mb-8 animate-fade-in-delay drop-shadow-sm">
              <span className="font-semibold">Propulsez votre entreprise</span>{" "}
              grâce à des sites web performants et une stratégie de
              référencement qui vous place devant vos concurrents. Artisans, PME
              ou startups :{" "}
              <span className="font-semibold">
                transformez votre présence digitale
              </span>
              .
            </p>
          </ScrollReveal>

          <ScrollReveal animation="zoom" delay={2}>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg max-w-xl mx-auto mb-8 animate-fade-in-delay-2 hover:shadow-lg transition-shadow duration-300 border border-white/20">
              <p className="text-sm font-medium text-white">
                <span className="text-amber-400 dark:text-amber-300 font-bold">
                  OFFRE LIMITÉE
                </span>{" "}
                : Les 5 prochains clients bénéficient d&apos;un{" "}
                <span className="font-bold">audit SEO gratuit</span> d&apos;une
                valeur de 250€
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
              <Button
                asChild
                size="lg"
                className="bg-blue-800 hover:bg-blue-700 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-blue-900/30 border-none"
              >
                <Link href="/contact">Demander un devis gratuit</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/80 text-white bg-white/10 hover:bg-white/20 hover:border-white hover:text-white shadow-md transform transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <Link href="/portfolio">Voir mes réalisations</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white opacity-70"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comment je peux vous aider
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Des solutions sur mesure pour développer votre activité en ligne
                et attirer plus de clients qualifiés.
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
                <CardTitle>Développement Web</CardTitle>
                <CardDescription>
                  Sites vitrines, e-commerce, applications web
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Je conçois et développe des sites web sur mesure, adaptés à
                  vos besoins spécifiques et optimisés pour tous les appareils.{" "}
                  <span className="font-semibold">
                    Résultat : une expérience utilisateur impeccable qui
                    convertit les visiteurs en clients.
                  </span>
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
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
                <CardTitle>Optimisation SEO</CardTitle>
                <CardDescription>
                  Référencement naturel, audit SEO, stratégie de contenu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Améliorez votre visibilité en ligne et générez plus de trafic
                  qualifié grâce à mes services d&apos;optimisation pour les
                  moteurs de recherche.{" "}
                  <span className="font-semibold">
                    Atteignez la première page de Google pour vos mots-clés
                    stratégiques.
                  </span>
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  asChild
                  variant="default"
                  className="w-full bg-blue-800 hover:bg-blue-700 shadow-sm transition-all"
                >
                  <Link href="/services#seo-optimization">
                    Découvrir cette offre
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance & Support</CardTitle>
                <CardDescription>
                  Mise à jour, sécurité, optimisation des performances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  J&apos;assure la maintenance technique de votre site pour
                  garantir sa sécurité, sa performance et sa disponibilité en
                  tout temps.{" "}
                  <span className="font-semibold">
                    Dormez sur vos deux oreilles pendant que je veille sur votre
                    site.
                  </span>
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
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
                Obtenir mon devis personnalisé gratuit →
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Freelance Section */}
      <section className="py-20 bg-white dark:bg-black border-t border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-10">
                <div className="w-12 h-0.5 bg-neutral-300 dark:bg-neutral-700 mx-auto mb-6"></div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Pourquoi travailler avec un freelance ?
                </h2>
                <div className="w-12 h-0.5 bg-neutral-300 dark:bg-neutral-700 mx-auto mt-6"></div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="text" delay={1}>
              <p className="text-lg text-center text-neutral-600 dark:text-neutral-400 mb-12">
                En tant que freelance, je vous offre une approche personnalisée
                et flexible pour répondre exactement à vos besoins.{" "}
                <span className="font-semibold">
                  Contrairement aux agences web, vous travaillez directement
                  avec moi
                </span>{" "}
                - le développeur qui crée votre site - pour une communication
                transparente et des résultats alignés avec vos objectifs.
              </p>
            </ScrollReveal>

            <ScrollRevealGroup
              animation="fade-left"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-700 dark:text-neutral-300"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Création de sites web sur mesure
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Designs responsives qui s&apos;adaptent parfaitement à votre
                    marque.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-700 dark:text-neutral-300"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m16 10-4 4-2-2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Optimisation SEO</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Positionnez-vous en tête des résultats Google pour vos
                    mots-clés.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-700 dark:text-neutral-300"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Maintenance et mise à jour
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Un site toujours performant, sécurisé et à jour.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-700 dark:text-neutral-300"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Accompagnement personnalisé
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Un support direct et des conseils d&apos;expert pour votre
                    réussite en ligne.
                  </p>
                </div>
              </div>
            </ScrollRevealGroup>

            <ScrollReveal animation="pulse">
              <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg text-center mb-8">
                <p className="font-semibold mb-2">
                  Garantie satisfaction 30 jours
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Si vous n&apos;êtes pas satisfait des résultats dans les 30
                  premiers jours, je vous propose des révisions gratuites
                  jusqu&apos;à votre entière satisfaction.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={2} className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-800 hover:bg-blue-700 shadow-md transition-all"
              >
                <Link href="/contact">
                  Demander mon devis personnalisé gratuit
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Mes Dernières Réalisations
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Découvrez comment j&apos;ai aidé ces entreprises à développer
                leur présence en ligne et augmenter leur chiffre
                d&apos;affaires.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealGroup
            animation="zoom"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Placeholder for portfolio items - to be replaced with real content */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden flex items-center justify-center relative group"
              >
                <p className="text-neutral-400">Projet {item}</p>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black"
                  >
                    Voir le projet
                  </Button>
                </div>
              </div>
            ))}
          </ScrollRevealGroup>

          <ScrollReveal
            animation="fade-up"
            delay={2}
            className="text-center mt-12"
          >
            <Button asChild className="bg-blue-800 hover:bg-blue-700 shadow-sm">
              <Link href="/portfolio">Voir tous mes projets</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Témoignages clients */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ce que disent mes clients
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Voici les retours de clients satisfaits qui ont vu leur activité
                se développer grâce à nos collaborations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealGroup
            animation="fade-up"
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <div className="bg-white dark:bg-black p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 italic mb-4">
                &ldquo;Bryan a transformé notre site web dépassé en une vitrine
                moderne et efficace. Notre trafic a augmenté de 40% et les
                demandes de devis ont doublé en 2 mois !&rdquo;
              </p>
              <div className="mt-auto">
                <p className="font-semibold">Sophie Martin</p>
                <p className="text-sm text-neutral-500">Pâtisserie Douceurs</p>
              </div>
            </div>

            <div className="bg-white dark:bg-black p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 italic mb-4">
                &ldquo;L&apos;optimisation SEO réalisée par Bryan a complètement
                changé notre visibilité en ligne. Nous apparaissons maintenant
                en première page pour nos mots-clés principaux.&rdquo;
              </p>
              <div className="mt-auto">
                <p className="font-semibold">Thomas Dubois</p>
                <p className="text-sm text-neutral-500">Cabinet Conseil TD</p>
              </div>
            </div>

            <div className="bg-white dark:bg-black p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 italic mb-4">
                &ldquo;Un vrai professionnel qui comprend nos besoins. La
                communication est claire et le travail de qualité. Je recommande
                sans hésiter !&rdquo;
              </p>
              <div className="mt-auto">
                <p className="font-semibold">Julie Moreau</p>
                <p className="text-sm text-neutral-500">Studio Graphique JM</p>
              </div>
            </div>
          </ScrollRevealGroup>

          <ScrollReveal
            animation="fade-up"
            delay={2}
            className="text-center mt-12"
          >
            <Link
              href="/freelance#testimonials"
              className="text-neutral-600 dark:text-neutral-400 hover:underline"
            >
              Voir tous les témoignages →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="max-w-3xl mx-auto bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Audit SEO Gratuit pour votre Site Web
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Découvrez comment améliorer votre référencement et attirer
                  plus de visiteurs qualifiés sur votre site.
                </p>
              </div>

              <ScrollRevealGroup
                animation="fade-left"
                className="mb-8 space-y-3"
              >
                {[
                  "Analyse complète de votre positionnement actuel",
                  "Identification des mots-clés stratégiques à cibler",
                  "Audit technique de votre site",
                  "Recommandations personnalisées pour améliorer vos résultats",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-amber-500 mt-1"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ScrollRevealGroup>

              <ScrollReveal
                animation="fade-up"
                delay={1}
                className="text-center"
              >
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  Valeur estimée : <span className="line-through">250€</span>{" "}
                  <span className="text-amber-500 font-bold">GRATUIT</span>{" "}
                  (offre limitée)
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-blue-800 hover:bg-blue-700 shadow-md transition-all"
                >
                  <Link href="/contact?ref=audit">
                    Obtenir mon audit SEO gratuit
                  </Link>
                </Button>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-down">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à transformer votre présence en ligne ?
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={1}>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-4">
              Ne laissez pas vos concurrents vous devancer sur internet.
              Contactez-moi dès aujourd&apos;hui pour discuter de votre projet
              et découvrir comment je peux vous aider à atteindre vos objectifs.
            </p>
            <p className="text-xl font-semibold text-amber-500 mb-8">
              Réponse garantie sous 24h !
            </p>
          </ScrollReveal>

          <ScrollReveal animation="pulse" delay={2}>
            <Button
              asChild
              size="lg"
              className="bg-blue-800 hover:bg-blue-700 shadow-lg border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-blue-900/50"
            >
              <Link href="/contact">Démarrer votre projet maintenant</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
}
