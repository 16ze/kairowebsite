import { MainLayout } from "@/components/layout/main-layout";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nos Services | KAIRO Digital - Développeur web freelance et expert en visibilité web",
  description:
    "Découvrez nos services de développement web et d'amélioration de votre visibilité en ligne. Des solutions sur mesure pour améliorer votre présence sur le web et générer plus de trafic qualifié.",
  keywords:
    "services, développement web, référencement web, visibilité en ligne, site web, freelance, développeur indépendant, design, responsive, Next.js, React, Tailwind CSS",
  alternates: {
    canonical: "https://www.kairo-digital.fr/services",
  },
  openGraph: {
    title: "Nos Services | KAIRO Digital",
    description:
      "Découvrez nos services de développement web et d'amélioration de votre visibilité en ligne",
    url: "https://www.kairo-digital.fr/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <MainLayout>
      {/* Schema.org données structurées pour les services */}
      <Script
        id="schema-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "Service",
                position: 1,
                name: "Développement d'Applications Web",
                description:
                  "Création d'applications web modernes, performantes et optimisées pour le mobile",
                provider: {
                  "@type": "Organization",
                  name: "KAIRO Digital",
                },
                serviceType: "Développement web",
                url: "https://www.kairo-digital.fr/services#dev-web",
              },
              {
                "@type": "Service",
                position: 2,
                name: "Référencement Web",
                description:
                  "Amélioration de la visibilité en ligne et de la présence sur les moteurs de recherche",
                provider: {
                  "@type": "Organization",
                  name: "KAIRO Digital",
                },
                serviceType: "Référencement",
                url: "https://www.kairo-digital.fr/services#seo",
              },
              {
                "@type": "Service",
                position: 3,
                name: "Sites Vitrines & E-commerce",
                description:
                  "Création de sites web professionnels pour présenter votre activité ou vendre en ligne",
                provider: {
                  "@type": "Organization",
                  name: "KAIRO Digital",
                },
                serviceType: "Développement web",
                url: "https://www.kairo-digital.fr/services#sites",
              },
              {
                "@type": "Service",
                position: 4,
                name: "Audit de Performance",
                description:
                  "Analyse approfondie des performances techniques de votre site web",
                provider: {
                  "@type": "Organization",
                  name: "KAIRO Digital",
                },
                serviceType: "Performance web",
                url: "https://www.kairo-digital.fr/services#audit",
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="pt-36 pb-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-down">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Services
            </h1>
            <div className="w-24 h-1 bg-blue-800 dark:bg-blue-700 mx-auto mb-8"></div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={1}>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Des solutions digitales sur mesure pour transformer votre présence
              en ligne et propulser votre business
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <ScrollRevealGroup animation="fade-up" stagger={0.1}>
            {/* Service 1 */}
            <div
              id="dev-web"
              className="grid md:grid-cols-2 gap-8 mb-20 items-center"
            >
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-4">
                  Développement d&apos;Applications Web
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Je crée des applications web modernes et performantes adaptées
                  à vos besoins spécifiques. Utilisant les technologies les plus
                  récentes comme React, Next.js et Node.js, je développe des
                  solutions sur mesure qui offrent une expérience utilisateur
                  exceptionnelle.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Applications web responsives et performantes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Interfaces modernes avec les meilleures pratiques UI/UX
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Intégration avec des API et services tiers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Applications SPA, PWA et solutions headless</span>
                  </li>
                </ul>
                <Button asChild size="lg">
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-8 rounded-lg order-1 md:order-2">
                <div className="aspect-video bg-white dark:bg-black rounded-lg p-6">
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                    Développement Web
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div
              id="seo"
              className="grid md:grid-cols-2 gap-8 mb-20 items-center"
            >
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 p-8 rounded-lg">
                <div className="aspect-video bg-white dark:bg-black rounded-lg p-6">
                  <div className="w-full h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                    Référencement Web
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Référencement Web</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  J&apos;améliore la visibilité de votre site sur les moteurs de
                  recherche pour attirer un trafic qualifié et convertir vos
                  visiteurs en clients. Mon approche du référencement combine
                  techniques avancées et stratégie de contenu.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Audit complet et optimisation technique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Stratégie de mots-clés et optimisation des pages
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Amélioration de la structure du site</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Optimisation pour vitesse de chargement et expérience
                      utilisateur
                    </span>
                  </li>
                </ul>
                <Button asChild size="lg">
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </div>
            </div>

            {/* Service 3 */}
            <div
              id="sites"
              className="grid md:grid-cols-2 gap-8 mb-20 items-center"
            >
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-4">
                  Sites Vitrines & E-commerce
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Je conçois et développe des sites web professionnels qui
                  reflètent l&apos;identité de votre entreprise et répondent à
                  vos objectifs commerciaux. De la simple vitrine à la boutique
                  en ligne complexe, chaque projet est réalisé avec soin.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Sites vitrines élégants et parfaitement responsives
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Boutiques e-commerce avec gestion des produits et paiements
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Optimisation pour les conversions et le référencement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Design sur mesure adapté à votre identité de marque
                    </span>
                  </li>
                </ul>
                <Button asChild size="lg">
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-8 rounded-lg order-1 md:order-2">
                <div className="aspect-video bg-white dark:bg-black rounded-lg p-6">
                  <div className="w-full h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                    Sites Vitrines & E-commerce
                  </div>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div
              id="audit"
              className="grid md:grid-cols-2 gap-8 mb-20 items-center"
            >
              <div className="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 p-8 rounded-lg">
                <div className="aspect-video bg-white dark:bg-black rounded-lg p-6">
                  <div className="w-full h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                    Audit de Performance
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Audit de Performance
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  J&apos;analyse en profondeur votre site web pour identifier les
                  problèmes techniques et les opportunités d&apos;amélioration.
                  Chaque audit est accompagné de recommandations concrètes et
                  priorisées.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Analyse complète des performances et de la vitesse
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Identification des problèmes de sécurité et de conformité
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Vérification de la compatibilité mobile et desktop
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Recommandations détaillées et plan d&apos;action
                    </span>
                  </li>
                </ul>
                <Button asChild size="lg">
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </div>
            </div>
          </ScrollRevealGroup>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-800 text-white dark:bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à transformer votre présence en ligne ?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Contactez-moi dès aujourd&apos;hui pour discuter de votre projet
              et obtenir un devis personnalisé gratuit.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-800 hover:bg-blue-50"
            >
              <Link href="/contact">Obtenir un devis gratuit</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
} 