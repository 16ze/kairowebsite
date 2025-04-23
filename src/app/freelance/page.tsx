import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";

export default function FreelancePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-36 pb-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Développement Web & Solutions Digitales Sur Mesure
          </h1>
          <div className="w-20 h-1 bg-neutral-200 dark:bg-neutral-800 mx-auto mb-12"></div>

          {/* Introduction */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Nous sommes KAIRO Digital, spécialistes en développement web et
              solutions digitales à Belfort. Notre approche personnalisée nous
              permet d&apos;accompagner chaque client dans la création
              d&apos;une présence en ligne percutante et efficace. Que vous
              soyez une startup, une PME ou une organisation établie, nous
              transformons vos idées en réalisations concrètes et adaptées à vos
              objectifs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Détaillés */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Services Détaillés
          </h2>

          <div className="grid gap-16 max-w-4xl mx-auto">
            {/* Création de sites web */}
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-2">
                <div className="aspect-square bg-white dark:bg-black rounded-lg shadow-lg flex items-center justify-center p-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-700 dark:text-neutral-300"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-bold mb-4">
                  Création de sites web sur mesure
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Nous créons des sites web modernes, responsives et adaptés à
                  vos besoins spécifiques. Notre approche se concentre sur la
                  compréhension approfondie de votre marque et de vos objectifs
                  commerciaux.
                </p>
                <div className="bg-white dark:bg-black p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 mb-4">
                  <p className="font-medium mb-2">Notre méthodologie :</p>
                  <ul className="text-neutral-600 dark:text-neutral-400 list-disc list-inside space-y-2">
                    <li>
                      Analyse approfondie de votre secteur d&apos;activité et de
                      votre cible
                    </li>
                    <li>
                      Conception d&apos;interfaces intuitives centrées sur
                      l&apos;utilisateur
                    </li>
                    <li>
                      Développement avec des technologies modernes (Next.js,
                      React)
                    </li>
                    <li>
                      Optimisation des performances et de la vitesse de
                      chargement
                    </li>
                    <li>
                      Tests rigoureux sur tous les appareils et navigateurs
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Optimisation SEO */}
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-2">
                <div className="aspect-square bg-white dark:bg-black rounded-lg shadow-lg flex items-center justify-center p-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-700 dark:text-neutral-300"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m16 10-4 4-2-2" />
                  </svg>
                </div>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-bold mb-4">Optimisation SEO</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Être trouvé sur Google est essentiel pour votre entreprise.
                  Nous appliquons une stratégie SEO complète pour améliorer
                  votre visibilité locale et attirer un trafic qualifié qui se
                  convertit en clients.
                </p>
                <div className="bg-white dark:bg-black p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 mb-4">
                  <p className="font-medium mb-2">
                    Les techniques que nous utilisons :
                  </p>
                  <ul className="text-neutral-600 dark:text-neutral-400 list-disc list-inside space-y-2">
                    <li>Audit SEO complet et analyse de la concurrence</li>
                    <li>
                      Optimisation technique (vitesse, structure, métadonnées)
                    </li>
                    <li>
                      Optimisation du contenu avec recherche de mots-clés
                      stratégiques
                    </li>
                    <li>
                      Amélioration du référencement local pour Belfort et
                      environs
                    </li>
                    <li>
                      Mise en place de mesures d&apos;analyse et suivi des
                      performances
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Maintenance et suivi */}
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-2">
                <div className="aspect-square bg-white dark:bg-black rounded-lg shadow-lg flex items-center justify-center p-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-700 dark:text-neutral-300"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-bold mb-4">
                  Maintenance et suivi personnalisé
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Nous vous accompagnons sur le long terme avec un suivi
                  personnalisé pour vous assurer que votre site reste à jour,
                  rapide et sécurisé.
                </p>
                <div className="bg-white dark:bg-black p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 mb-4">
                  <p className="font-medium mb-2">Ce que nous incluons :</p>
                  <ul className="text-neutral-600 dark:text-neutral-400 list-disc list-inside space-y-2">
                    <li>Mises à jour régulières des logiciels et plugins</li>
                    <li>Sauvegardes automatiques hebdomadaires</li>
                    <li>Surveillance continue des performances</li>
                    <li>Support technique réactif</li>
                    <li>
                      Rapport mensuel d&apos;analyse et de suggestions
                      d&apos;amélioration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mes avantages en tant que freelance */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Les atouts d&apos;une collaboration personnalisée
            </h2>

            <div className="grid gap-8 md:grid-cols-2 mb-12">
              <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Contact direct et immédiat
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Communication directe sans intermédiaire. Vous discutez avec
                  les personnes qui travaillent concrètement sur votre projet.
                </p>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Structure légère et efficace
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Une structure simplifiée nous permet d&apos;offrir des tarifs
                  adaptés aux petites entreprises tout en maintenant une qualité
                  professionnelle.
                </p>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Souplesse d&apos;intervention
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Adaptation rapide à l&apos;évolution de vos besoins et de
                  votre budget, avec des solutions ajustées en temps réel.
                </p>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Disponibilité optimisée
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  En limitant volontairement notre nombre de clients, nous
                  garantissons une attention soutenue et une réactivité maximale
                  à chaque projet.
                </p>
              </div>
            </div>

            <p className="text-center text-lg text-neutral-600 dark:text-neutral-400">
              Notre approche est idéale pour les TPE, PME et startups cherchant
              un accompagnement personnalisé et direct. Selon vos besoins
              spécifiques, l&apos;ampleur de votre projet et vos objectifs,
              différentes solutions existent - parfois une équipe restreinte
              comme la nôtre est le meilleur choix, d&apos;autres fois une
              grande agence peut être plus adaptée, et souvent nous pouvons
              collaborer ensemble.
            </p>
          </div>
        </div>
      </section>

      {/* Valeurs et engagements à la place des témoignages */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Mes valeurs et engagements
          </h2>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-black p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex-shrink-0 flex items-center justify-center">
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
                    className="text-blue-800 dark:text-blue-300"
                  >
                    <path d="M6 18h8" />
                    <path d="M3 22h18" />
                    <path d="M14 22a7 7 0 1 0 0-14h-1" />
                    <path d="M9 14h2" />
                    <path d="M9 12a2 2 0 0 1 2-2c2 0 4 1 3 4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-bold">Transparence totale</p>
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                Nous nous engageons à être totalement transparents dans notre
                communication, nos tarifs et nos délais. Vous êtes informé à
                chaque étape du processus, sans surprise ni coûts cachés. Cette
                transparence est la base d&apos;une relation de confiance
                durable.
              </p>
            </div>

            <div className="bg-white dark:bg-black p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex-shrink-0 flex items-center justify-center">
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
                    className="text-green-800 dark:text-green-300"
                  >
                    <path d="M7 11v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1z" />
                    <path d="M21 10v9a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1z" />
                    <path d="M14 15v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1z" />
                    <path d="M12 4V3" />
                    <path d="M18 8V7" />
                    <path d="M6 8V7" />
                    <path d="m19 7-3-3" />
                    <path d="m8 7-3-3" />
                    <path d="m12 4-1-1" />
                    <path d="m16 6-2-2" />
                    <path d="m8 6-2-2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-bold">Résultats mesurables</p>
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                Nous nous concentrons sur des résultats concrets et mesurables.
                Chaque projet est accompagné d&apos;objectifs clairs et de
                métriques de performance pour évaluer son succès. Nous ne nous
                contentons pas de créer un beau site, nous nous assurons
                qu&apos;il soit efficace pour votre activité.
              </p>
            </div>

            <div className="bg-white dark:bg-black p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex-shrink-0 flex items-center justify-center">
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
                    className="text-amber-800 dark:text-amber-300"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-bold">Passion et engagement</p>
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                Nous nous investissons pleinement dans chaque projet avec
                passion et dévouement. Votre réussite est notre priorité, et
                nous mettons tout en œuvre pour vous offrir un service
                d&apos;excellence qui contribue concrètement au développement de
                votre activité.
              </p>
            </div>

            <div className="bg-white dark:bg-black p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex-shrink-0 flex items-center justify-center">
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
                    className="text-purple-800 dark:text-purple-300"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-bold">Formation continue</p>
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                Le domaine du web évolue rapidement. Nous nous engageons à
                rester constamment à jour sur les dernières technologies,
                tendances et bonnes pratiques pour vous proposer des solutions
                modernes et pérennes qui anticipent les évolutions du marché.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Processus de travail */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Mon processus de travail
            </h2>

            <div className="space-y-12">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-800 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">
                    Discussion initiale
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Nous échangeons sur votre projet, vos objectifs et vos
                    attentes. Cette première étape est cruciale pour bien
                    comprendre vos besoins et vous proposer des solutions
                    adaptées.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-800 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">
                    Proposition de plan
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Nous vous envoyons une proposition détaillée incluant
                    tarifs, délais et services. Tout est transparent pour vous
                    permettre de prendre une décision éclairée.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-800 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Création</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Nous développons votre site ou optimisons votre SEO selon
                    vos besoins. Nous vous tenons régulièrement informé de
                    l&apos;avancement et vous impliquons dans les décisions
                    importantes.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-800 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">
                    Révision et finalisation
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Vous validez les derniers détails, et nous apportons les
                    ajustements nécessaires avant de lancer le site. Votre
                    satisfaction est notre priorité.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-800 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Suivi</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Après la mise en ligne, nous continuons à vous accompagner
                    avec un suivi personnalisé. Nous restons disponibles pour
                    répondre à vos questions et vous aider à faire évoluer votre
                    projet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à lancer votre projet web ?
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto mb-10">
            Contactez-nous dès aujourd&apos;hui pour discuter de votre projet et
            découvrir comment nous pouvons vous aider à développer votre
            présence en ligne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="default"
              className="bg-blue-800 hover:bg-blue-900"
            >
              <Link href="/contact">
                Contactez-nous pour un devis personnalisé
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black"
            >
              <Link href="/contact">Contactez-nous</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
