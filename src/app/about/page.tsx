import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";

export const metadata = {
  title:
    "À propos | KAIRO Digital - Agence de développement web et optimisation SEO",
  description:
    "Découvrez l'histoire de KAIRO Digital, notre équipe passionnée et nos valeurs. Nous sommes spécialisés dans le développement web et l'optimisation SEO pour maximiser votre présence en ligne.",
  keywords:
    "à propos, équipe, histoire, valeurs, développement web, optimisation SEO, site web, agence web",
};

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-36 pb-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-down">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À propos de KAIRO Digital
            </h1>
            <div className="w-24 h-1 bg-blue-800 dark:bg-blue-700 mx-auto mb-8"></div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={1}>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Nous sommes une agence spécialisée dans le développement web et
              l&apos;optimisation pour les moteurs de recherche, dédiée à
              propulser votre entreprise vers de nouveaux sommets.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Fondée en 2020, KAIRO Digital est née de la passion commune de ses
              fondateurs pour le développement web et le marketing digital.
              Notre mission est simple : aider les entreprises à se démarquer en
              ligne grâce à des solutions web performantes et durables.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16 border-b border-neutral-100 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="fade-right">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Fondée en 2020, KAIRO Digital est née de la passion commune de
                  ses fondateurs pour le développement web et le marketing
                  digital. Notre mission est simple : aider les entreprises à se
                  démarquer en ligne grâce à des solutions web performantes et
                  durables.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Depuis nos débuts, nous avons accompagné plus de 50
                  entreprises dans leur transformation numérique, en créant des
                  sites web performants et optimisés pour les moteurs de
                  recherche.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Notre expertise s&apos;est construite progressivement, en
                  restant toujours à la pointe des dernières technologies et des
                  meilleures pratiques du web.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={1}>
              <div className="bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg aspect-square flex items-center justify-center">
                <p className="text-neutral-400 text-center">
                  Illustration historique de l&apos;agence
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 border-b border-neutral-100 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-down">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Nos Valeurs
            </h2>
          </ScrollReveal>

          <ScrollRevealGroup
            animation="fade-up"
            stagger={0.2}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center">
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
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center">
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
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center">
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

      {/* Notre Équipe */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-down">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Notre Équipe
            </h2>
          </ScrollReveal>

          <ScrollRevealGroup
            animation="zoom"
            stagger={0.15}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Membre 1 */}
            <div className="text-center">
              <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-full w-40 h-40 mx-auto mb-4 flex items-center justify-center">
                <p className="text-neutral-400">Photo</p>
              </div>
              <h3 className="text-xl font-bold">Thomas Laurent</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                Fondateur & CEO
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Expert en stratégie digitale avec plus de 10 ans
                d&apos;expérience dans le développement web.
              </p>
            </div>
            {/* Membre 2 */}
            <div className="text-center">
              <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-full w-40 h-40 mx-auto mb-4 flex items-center justify-center">
                <p className="text-neutral-400">Photo</p>
              </div>
              <h3 className="text-xl font-bold">Sophie Martin</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                Directrice Technique
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Développeuse full-stack spécialisée dans les technologies React
                et Node.js.
              </p>
            </div>
            {/* Membre 3 */}
            <div className="text-center">
              <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-full w-40 h-40 mx-auto mb-4 flex items-center justify-center">
                <p className="text-neutral-400">Photo</p>
              </div>
              <h3 className="text-xl font-bold">Antoine Dubois</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                Expert SEO
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Consultant SEO avec une expertise particulière en référencement
                local et e-commerce.
              </p>
            </div>
            {/* Membre 4 */}
            <div className="text-center">
              <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-full w-40 h-40 mx-auto mb-4 flex items-center justify-center">
                <p className="text-neutral-400">Photo</p>
              </div>
              <h3 className="text-xl font-bold">Julie Moreau</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                UI/UX Designer
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Designer créative spécialisée dans la création d&apos;interfaces
                utilisateur intuitives et élégantes.
              </p>
            </div>
          </ScrollRevealGroup>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à travailler avec nous ?
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
              Contactez-nous dès aujourd&apos;hui pour discuter de votre projet
              et découvrir comment notre équipe peut vous aider à atteindre vos
              objectifs.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white hover:bg-white hover:text-black"
            >
              <Link href="/contact">Prendre contact</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
}
