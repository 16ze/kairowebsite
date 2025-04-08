import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import BookingForm from "./components/booking-form";

export const metadata: Metadata = {
  title: "Consultation Gratuite | KAIRO Digital",
  description:
    "Réservez une consultation gratuite avec KAIRO Digital pour discuter de vos besoins en développement web et obtenir des conseils personnalisés.",
  openGraph: {
    title: "Consultation Gratuite | KAIRO Digital",
    description:
      "Réservez une consultation gratuite avec KAIRO Digital pour discuter de vos besoins en développement web et obtenir des conseils personnalisés.",
    url: "https://www.kairo-digital.fr/consultation",
  },
};

export default function ConsultationPage() {
  return (
    <MainLayout>
      <div className="w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-20 text-white mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Réservez une consultation gratuite
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Discutons de votre projet web et explorons ensemble les meilleures
            solutions pour votre présence en ligne.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Découvrez comment je peux vous aider
              </h2>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5 text-blue-700 dark:text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Conseils stratégiques adaptés à votre projet</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5 text-blue-700 dark:text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Estimation budgétaire et délais</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5 text-blue-700 dark:text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Recommandations technologiques adaptées</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5 text-blue-700 dark:text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Stratégies SEO et marketing digital</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
                <p className="text-blue-900 dark:text-white font-medium">
                  Consultation 100% gratuite et sans engagement
                </p>
              </div>
            </div>
            <div className="md:w-2/3 p-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Choisissez un créneau
              </h2>

              {/* Formulaire de réservation */}
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
