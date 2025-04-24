import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";

export const metadata = {
  title:
    "À propos | KAIRO Digital - Agence web spécialisée en développement et visibilité web à Belfort",
  description:
    "Découvrez notre parcours, nos compétences et notre philosophie de travail. Nous sommes spécialisés dans le développement web et l'amélioration de la visibilité en ligne pour maximiser votre présence web à Belfort et en Franche-Comté.",
  keywords:
    "à propos, parcours, compétences, développement web Belfort, visibilité web Belfort, site web, agence web Belfort, Franche-Comté",
};

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-36 pb-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-down" threshold={0.2}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À propos de KAIRO Digital
            </h1>
            <div className="w-24 h-1 bg-blue-800 dark:bg-blue-700 mx-auto mb-8"></div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={1} threshold={0.2}>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Nous sommes une agence web spécialisée dans la création de sites
              web performants et rentables pour les TPE, PME et startups. Notre
              objectif : vous offrir des solutions web accessibles qui
              propulsent votre entreprise, même avec un budget limité.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Notre parcours */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="fade-right" threshold={0.1}>
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Parcours</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Nous avons uni nos compétences pour créer KAIRO Digital, une
                  aventure passionnante dans le développement web. Ce projet
                  nous a permis d&apos;approfondir nos connaissances et de nous
                  engager pleinement envers nos clients.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Nous avons eu l&apos;occasion de travailler sur divers
                  projets, en nous concentrant sur l&apos;accompagnement et le
                  soutien dans les enjeux concrets que rencontrent les
                  entreprises. Nous sommes bien conscients que chaque structure
                  a des besoins spécifiques, souvent caractérisés par des
                  budgets limités et l&apos;importance de résultats rapides.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Notre approche se base sur une écoute attentive et un service
                  sur-mesure, conçu pour s&apos;aligner avec les véritables
                  besoins et contraintes de nos clients, tout en maintenant une
                  connexion humaine et accessible.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" threshold={0.1} delay={2}>
              <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg relative overflow-hidden group h-full">
                <Image
                  src="/images/bryan-photo.jpg"
                  alt="Bryan Hilaire - KAIRO Digital"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-500 mx-auto max-w-md"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 border-b border-neutral-100 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-down" threshold={0.2}>
            <h2 className="text-3xl font-bold mb-12 text-center">
              Nos Valeurs
            </h2>
          </ScrollReveal>

          <ScrollRevealGroup
            animation="fade-up"
            stagger={0.2}
            threshold={0.1}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-900 dark:bg-blue-700 text-white dark:text-white rounded-full flex items-center justify-center transform transition-transform duration-500 hover:rotate-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Nous visons l&apos;excellence dans chaque projet, sans compromis
                sur la qualité et la performance.
              </p>
            </div>
            <div className="text-center p-6 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-900 dark:bg-blue-700 text-white dark:text-white rounded-full flex items-center justify-center transform transition-transform duration-500 hover:rotate-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Nous travaillons en étroite collaboration avec nos clients pour
                comprendre leurs besoins et dépasser leurs attentes.
              </p>
            </div>
            <div className="text-center p-6 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-900 dark:bg-blue-700 text-white dark:text-white rounded-full flex items-center justify-center transform transition-transform duration-500 hover:rotate-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Nous restons à la pointe des technologies et des pratiques pour
                offrir des solutions innovantes et performantes.
              </p>
            </div>
          </ScrollRevealGroup>
        </div>
      </section>

      {/* Nos Compétences */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-down" threshold={0.2}>
            <h2 className="text-3xl font-bold mb-12 text-center">
              Nos Compétences
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollReveal animation="fade-right">
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Développement Web</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span>React, Next.js, TypeScript</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span>Tailwind CSS, Styled Components</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span>Node.js, Express</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span>Sites de réservation en ligne</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={1}>
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">SEO & Marketing</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span>Optimisation technique SEO</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span>Recherche de mots-clés & stratégie de contenu</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span>Google Analytics & Search Console</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span>Audit SEO & optimisations</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-black/60 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal animation="fade-up" threshold={0.2}>
            <h2 className="text-3xl font-bold mb-6">
              Prêt à travailler avec moi ?
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
              Contactez-moi dès aujourd&apos;hui pour discuter de votre projet
              et découvrir comment je peux vous aider à atteindre vos objectifs.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/contact">Prendre contact</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
}
