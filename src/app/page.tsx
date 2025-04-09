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
  title: "KAIRO Digital | Développeur web freelance et consultant SEO",
  description:
    "KAIRO Digital est un développeur web freelance spécialisé dans la création de sites web et l'optimisation SEO. Je crée des sites web performants, élégants et optimisés pour les moteurs de recherche.",
  keywords:
    "développement web, optimisation SEO, site web, freelance, développeur indépendant, design, responsive, Next.js, React, Tailwind CSS, Paris",
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
          description: "Développeur web freelance et consultant SEO",
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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900/30 to-neutral-900/40 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80 dark:opacity-70 mix-blend-overlay"
          >
            <source
              src="https://res.cloudinary.com/demo/video/upload/v1425762047/cool-car.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-neutral-900/30"></div>
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
              référencement qui vous place devant vos concurrents.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={2}>
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg mb-8 max-w-2xl mx-auto">
              <p className="text-sm md:text-base font-medium flex items-center gap-2 justify-center text-amber-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 8v4l3 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>
                  <span className="font-bold">Places limitées</span> : Je ne
                  prends que 3 nouveaux clients par mois pour garantir un suivi
                  optimal
                </span>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="zoom" delay={3}>
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

          <ScrollReveal animation="fade-up" delay={4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
              <Button
                asChild
                size="lg"
                className="bg-blue-800 hover:bg-blue-700 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-blue-900/30 border-none group"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Demander mon devis gratuit
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
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
      <section id="services" className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Solutions web adaptées aux petites entreprises
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Des services pensés pour les TPE, PME et startups avec un
                rapport qualité-prix imbattable et des résultats concrets pour
                votre activité.
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
                <p className="text-sm text-neutral-500 dark:text-neutral-400 italic mb-2">
                  &ldquo;Notre site responsive a augmenté nos conversions
                  mobiles de 45%&rdquo; - Marie L.
                </p>
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
                <p className="text-sm text-neutral-500 dark:text-neutral-400 italic mb-2">
                  &ldquo;Trafic organique augmenté de 73% en 3 mois&rdquo; -
                  Thomas D.
                </p>
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
                <p className="text-sm text-neutral-500 dark:text-neutral-400 italic mb-2">
                  &ldquo;Temps de chargement réduit de 65%, merci Bryan !&rdquo;
                  - Sophie M.
                </p>
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

      {/* Guarantees Section */}
      <Guarantees />

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
            <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
              <Image
                src="/images/PurpleNailsStudio.png"
                alt="Purple Nails Studio - Design moderne pour salon de manucure"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-semibold mb-1">Purple Nails Studio</h3>
                  <p className="text-sm text-white/80">Site vitrine</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
              <Image
                src="/images/Projet-Kairo-Digital.png"
                alt="KAIRO Digital - Site vitrine de développeur web freelance"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-semibold mb-1">KAIRO Digital</h3>
                  <p className="text-sm text-white/80">Site vitrine</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
              <Image
                src="/images/HOLY Beauty.png"
                alt="HOLY Beauty - Site vitrine pour prestations beauté haut de gamme"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-semibold mb-1">HOLY Beauty</h3>
                  <p className="text-sm text-white/80">
                    Institut de beauté haut de gamme
                  </p>
                </div>
              </div>
            </div>
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

      {/* Sticky CTA */}
      <StickyCTA />
    </MainLayout>
  );
}
