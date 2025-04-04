import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title:
    "Nos Services | KAIRO Digital - Agence de développement web et optimisation SEO",
  description:
    "Découvrez nos services de développement web et d'optimisation SEO. Des solutions sur mesure pour améliorer votre présence en ligne et générer plus de trafic qualifié.",
};

export default function ServicesPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="pt-36 pb-10 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Services</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Des solutions sur mesure pour répondre à vos besoins en
            développement web et référencement naturel.
          </p>
        </div>
      </section>

      {/* Services Details */}
      <section
        id="web-development"
        className="py-16 border-b border-neutral-200 dark:border-neutral-800"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Développement Web</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Nous concevons et développons des solutions web sur mesure qui
                répondent parfaitement à vos besoins et objectifs commerciaux.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Sites vitrines professionnels</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>E-commerce et boutiques en ligne</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Applications web sur mesure</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Refonte de sites existants</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Design responsive pour tous les appareils</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/contact">Demander un devis</Link>
              </Button>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg aspect-square flex items-center justify-center">
              <p className="text-neutral-400 text-center">
                Illustration du service de développement web
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="seo-optimization"
        className="py-16 border-b border-neutral-200 dark:border-neutral-800"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg aspect-square flex items-center justify-center">
              <p className="text-neutral-400 text-center">
                Illustration du service d&apos;optimisation SEO
              </p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4">Optimisation SEO</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Améliorez votre visibilité en ligne et générez plus de trafic
                qualifié grâce à nos services d&apos;optimisation pour les
                moteurs de recherche.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Audit SEO complet</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Optimisation on-page et off-page</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Recherche de mots-clés stratégiques</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Création de contenu optimisé</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Suivi et rapports de performance</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/contact">Demander un audit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="maintenance" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Maintenance & Support</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Nous assurons la maintenance technique de votre site pour
                garantir sa sécurité, sa performance et sa disponibilité en tout
                temps.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Mises à jour de sécurité régulières</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Sauvegardes automatiques</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Surveillance des performances</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Assistance technique réactive</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-black dark:text-white mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Optimisation continue</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/contact">En savoir plus</Link>
              </Button>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg aspect-square flex items-center justify-center">
              <p className="text-neutral-400 text-center">
                Illustration du service de maintenance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à améliorer votre présence en ligne ?
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
            Contactez-nous dès aujourd&apos;hui pour discuter de votre projet et
            découvrir comment nos services peuvent répondre à vos besoins.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white hover:bg-white hover:text-black"
          >
            <Link href="/contact">Prendre contact</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
