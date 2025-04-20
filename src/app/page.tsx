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
                <Link href="/contact">Demander mon devis gratuit</Link>
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
