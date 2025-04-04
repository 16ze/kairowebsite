import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Contact | KAIRO - Agence de développement web et optimisation SEO",
  description:
    "Contactez-nous pour discuter de votre projet de développement web ou d'optimisation SEO. Notre équipe est à votre écoute pour répondre à vos besoins.",
};

export default function ContactPage() {
  return (
    <MainLayout>
      {/* Page Header */}
      <section className="pt-24 pb-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Contactez-moi pour discuter de votre projet
          </h1>
          <div className="w-20 h-1 bg-neutral-200 dark:bg-neutral-800 mx-auto mb-8"></div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 text-center max-w-2xl mx-auto">
            Je suis disponible pour vous aider à développer votre présence en
            ligne. Remplissez le formulaire ci-dessous et je vous répondrai sous
            24h.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="md:col-span-3">
              <div className="bg-white dark:bg-black p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">
                  Envoyez-moi un message
                </h2>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 p-4 rounded-lg mb-8">
                  <p className="text-green-800 dark:text-green-300 font-medium flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-1 flex-shrink-0"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span>
                      <span className="font-bold">
                        Réponse garantie sous 24h
                      </span>{" "}
                      - Je m&apos;engage à vous répondre rapidement pour vous
                      aider à avancer dans votre projet.
                    </span>
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        placeholder="Votre prénom"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input id="lastName" placeholder="Votre nom" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        placeholder="Votre numéro de téléphone"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      placeholder="L'objet de votre message"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project">Votre projet *</Label>
                    <Textarea
                      id="project"
                      placeholder="Décrivez brièvement votre projet et vos objectifs"
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="consent"
                      className="h-4 w-4 rounded border-neutral-300 text-black focus:ring-neutral-500"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="consent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        J&apos;accepte le traitement de mes données *
                      </label>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Vos données personnelles seront utilisées uniquement
                        pour répondre à votre demande.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                    <p className="text-yellow-800 dark:text-yellow-300 font-medium text-sm">
                      <span className="font-bold">OFFRE LIMITÉE</span> :
                      Mentionnez le code &ldquo;AUDIT2023&rdquo; dans votre
                      message pour bénéficier d&apos;un audit SEO gratuit avec
                      votre projet.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Envoyer votre message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-black p-8 rounded-lg shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">Coordonnées</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:contact@kairo.fr"
                        className="text-neutral-600 dark:text-neutral-400 hover:underline"
                      >
                        contact@kairo.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <a
                        href="tel:+33123456789"
                        className="text-neutral-600 dark:text-neutral-400 hover:underline"
                      >
                        +33 1 23 45 67 89
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Adresse</p>
                      <address className="text-neutral-600 dark:text-neutral-400 not-italic">
                        123 Avenue de la Liberté
                        <br />
                        75001 Paris, France
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Heures d&apos;ouverture</p>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Lundi - Vendredi: 9h - 18h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-800 dark:bg-neutral-900 p-8 rounded-lg text-white">
                <h3 className="text-xl font-bold mb-4">
                  Satisfaction garantie
                </h3>
                <p className="mb-4">
                  Je m&apos;engage à vous fournir un service de qualité et à
                  votre entière satisfaction. Si vous n&apos;êtes pas satisfait
                  des résultats, je propose des révisions gratuites jusqu&apos;à
                  votre satisfaction complète.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-400 mt-1"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Communication transparente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-400 mt-1"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Respect des délais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-400 mt-1"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Tarifs transparents sans surprises</span>
                  </li>
                </ul>
                <div className="text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black"
                  >
                    <Link href="/freelance#reviews">
                      Voir les témoignages clients
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Suivez-moi</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    aria-label="GitHub"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10">
            Questions fréquentes
          </h2>

          <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">
                Quels sont vos délais de réalisation pour un site web ?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Les délais varient selon la complexité du projet, mais en
                général, un site vitrine peut être réalisé en 2-4 semaines,
                tandis qu&apos;un e-commerce peut prendre 4-8 semaines. Nous
                établirons ensemble un calendrier précis lors de notre première
                consultation.
              </p>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">
                Comment se déroule le processus de création ?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Le processus commence par une consultation approfondie pour
                comprendre vos besoins, suivie d&apos;une proposition détaillée.
                Après validation, je passe à la conception, au développement et
                aux tests. Vous êtes impliqué à chaque étape pour assurer que le
                résultat final correspond parfaitement à vos attentes.
              </p>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">
                Quels sont vos tarifs ?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Mes tarifs sont adaptés à chaque projet en fonction de sa
                complexité et de vos besoins spécifiques. Je propose des
                formules à partir de 1500€ pour un site vitrine. Contactez-moi
                pour obtenir un devis personnalisé gratuit et sans engagement.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Vous avez d&apos;autres questions ? N&apos;hésitez pas à me
              contacter directement.
            </p>
            <Button asChild>
              <Link href="#top">Retour en haut</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
