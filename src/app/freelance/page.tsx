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
              Je suis Bryan, développeur web freelance et expert en solutions
              digitales. Mon approche personnalisée me permet d&apos;accompagner
              chaque client dans la création d&apos;une présence en ligne
              percutante et efficace. Que vous soyez une startup, une PME ou une
              organisation établie, je transforme vos idées en réalisations
              concrètes et adaptées à vos objectifs.
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
                  Je crée des sites web modernes, responsives et adaptés à vos
                  besoins. Vous avez un projet spécifique ? Je vous aide à
                  définir vos objectifs et à créer un site qui représente
                  parfaitement votre marque.
                </p>
                <div className="bg-white dark:bg-black p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 mb-4">
                  <p className="font-medium mb-2">Étude de cas :</p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    J&apos;ai créé un site vitrine pour une pâtisserie locale,
                    ce qui leur a permis de présenter leurs créations et
                    d&apos;augmenter leur visibilité. Résultat : une hausse de
                    25% des commandes et une présence en ligne qui reflète
                    parfaitement leur savoir-faire artisanal.
                  </p>
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
                  Être trouvé sur Google est essentiel pour votre entreprise. Je
                  vous aide à optimiser votre site pour améliorer votre
                  visibilité, attirer plus de visiteurs et convertir ces
                  visiteurs en clients.
                </p>
                <div className="bg-white dark:bg-black p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 mb-4">
                  <p className="font-medium mb-2">Résultat concret :</p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Après l&apos;optimisation SEO d&apos;un cabinet de conseil,
                    leur trafic organique a augmenté de 40% en 3 mois. Ils
                    apparaissent maintenant en première page pour les mots-clés
                    pertinents de leur secteur.
                  </p>
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
                  Je vous accompagne sur le long terme avec un suivi
                  personnalisé pour vous assurer que votre site reste à jour,
                  rapide et sécurisé.
                </p>
                <div className="bg-white dark:bg-black p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 mb-4">
                  <p className="font-medium mb-2">Ce que j&apos;inclus :</p>
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
                  la personne qui travaille concrètement sur votre projet.
                </p>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Structure légère et efficace
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Une structure simplifiée permet d&apos;offrir des tarifs
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
                  En limitant volontairement mon nombre de clients, je garantis
                  une attention soutenue et une réactivité maximale à chaque
                  projet.
                </p>
              </div>
            </div>

            <p className="text-center text-lg text-neutral-600 dark:text-neutral-400">
              Mon approche freelance est idéale pour les TPE, PME et startups
              cherchant un accompagnement personnalisé et direct. Selon vos
              besoins spécifiques, l&apos;ampleur de votre projet et vos
              objectifs, différentes solutions existent - parfois un freelance
              comme moi est le meilleur choix, d&apos;autres fois une agence
              peut être plus adaptée, et souvent nous pouvons collaborer
              ensemble.
            </p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Ce que disent mes clients
          </h2>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-black p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0"></div>
                <div className="ml-4">
                  <p className="font-bold">Sophie Martin</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Pâtisserie Douceurs
                  </p>
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 italic">
                &ldquo;Travailler avec Bryan a été une expérience incroyable. Il
                a compris nos besoins dès le début et a créé un site qui nous
                ressemble. Depuis la mise en ligne, nous avons reçu de nombreux
                compliments de nos clients et nos ventes en ligne ont décollé
                !&rdquo;
              </p>
            </div>

            <div className="bg-white dark:bg-black p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0"></div>
                <div className="ml-4">
                  <p className="font-bold">Thomas Dubois</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Cabinet Conseil TD
                  </p>
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 italic">
                &ldquo;J&apos;étais sceptique concernant l&apos;optimisation
                SEO, mais les résultats parlent d&apos;eux-mêmes. Bryan a su
                mettre en place une stratégie efficace qui nous a permis
                d&apos;augmenter significativement notre visibilité en ligne. Un
                vrai professionnel qui tient ses promesses.&rdquo;
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
                    On échange sur votre projet, vos objectifs et vos attentes.
                    Cette première étape est cruciale pour bien comprendre vos
                    besoins et vous proposer des solutions adaptées.
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
                    Je vous envoie une proposition détaillée incluant tarifs,
                    délais et services. Tout est transparent pour vous permettre
                    de prendre une décision éclairée.
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
                    Je développe votre site ou optimise votre SEO selon vos
                    besoins. Je vous tiens régulièrement informé de
                    l&apos;avancement et vous implique dans les décisions
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
                    Vous validez les derniers détails, et j&apos;apporte les
                    ajustements nécessaires avant de lancer le site. Votre
                    satisfaction est ma priorité.
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
                    Après la mise en ligne, je continue à vous accompagner avec
                    un suivi personnalisé. Je reste disponible pour répondre à
                    vos questions et vous aider à faire évoluer votre projet.
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
            Contactez-moi dès aujourd&apos;hui pour discuter de votre projet et
            découvrir comment je peux vous aider à développer votre présence en
            ligne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="default"
              className="bg-blue-800 hover:bg-blue-900"
            >
              <Link href="/contact">
                Contactez-moi pour un devis personnalisé
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black"
            >
              <Link href="/portfolio">Voir mes réalisations</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
