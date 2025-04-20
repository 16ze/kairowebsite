"use client";

import { MainLayout } from "@/components/layout/main-layout";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";
import { Metadata } from "next";
import { CheckIcon } from "@/components/icons/check-icon";
import Image from "next/image";
import { ServiceCard } from "@/components/ui/service-card";

export const metadata: Metadata = {
  title:
    "Nos Services | KAIRO Digital - Développeur web freelance et consultant SEO",
  description:
    "Découvrez nos services de développement web et d'optimisation SEO. Des solutions sur mesure pour améliorer votre présence en ligne et générer plus de trafic qualifié.",
  keywords:
    "services, développement web, optimisation SEO, site web, freelance, développeur indépendant, design, responsive, Next.js, React, Tailwind CSS",
  alternates: {
    canonical: "https://www.kairo-digital.fr/services",
  },
  openGraph: {
    title: "Nos Services | KAIRO Digital",
    description:
      "Découvrez nos services de développement web et d'optimisation SEO",
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
                serviceType: "SEO",
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
                  Je conçois des sites web professionnels et des boutiques en
                  ligne qui reflètent l&apos;identité de votre entreprise. Des
                  solutions élégantes, fonctionnelles et optimisées pour
                  convertir vos visiteurs.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Sites vitrines modernes et adaptatifs (responsive)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Boutiques e-commerce sécurisées et performantes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Système de gestion de contenu intuitif (CMS)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Optimisation pour les conversions et le référencement
                    </span>
                  </li>
                </ul>
                <Button asChild size="lg">
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </div>
              <div className="bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 p-8 rounded-lg order-1 md:order-2">
                <div className="aspect-video bg-white dark:bg-black rounded-lg p-6">
                  <div className="w-full h-full bg-gradient-to-r from-teal-500 to-emerald-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                    Sites Web Professionnels
                  </div>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div id="audit" className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-lg">
                <div className="aspect-video bg-white dark:bg-black rounded-lg p-6">
                  <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                    Audit de Performance
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Audit de Performance
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  J&apos;analyse en profondeur les performances techniques de
                  votre site web pour identifier les points de friction et
                  proposer des solutions concrètes d&apos;amélioration.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Analyse complète des Core Web Vitals et métriques de
                      performance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Identification des problèmes techniques bloquants
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Recommandations pour optimiser la vitesse de chargement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      Plan d&apos;action détaillé avec priorisation des
                      correctifs
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

      {/* Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Processus</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Une approche structurée pour garantir le succès de chaque projet
            </p>
          </ScrollReveal>

          <ScrollRevealGroup animation="fade-up" stagger={0.1}>
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    1
                  </div>
                  <CardTitle>Découverte</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Nous échangeons sur vos besoins, objectifs et contraintes
                    pour définir précisément votre projet.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    2
                  </div>
                  <CardTitle>Proposition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Je vous présente une solution adaptée à vos besoins avec un
                    devis détaillé et un planning prévisionnel.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    3
                  </div>
                  <CardTitle>Réalisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Développement de votre projet avec des points d&apos;étape
                    réguliers pour valider les avancées.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    4
                  </div>
                  <CardTitle>Livraison</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Mise en ligne de votre projet, formation à son utilisation
                    et support post-lancement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </ScrollRevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à transformer votre présence en ligne ?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
              Contactez-moi dès aujourd&apos;hui pour discuter de votre projet
              et découvrir comment je peux vous aider à atteindre vos objectifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Demander un devis</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/portfolio">Voir mes réalisations</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
}
