import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Contact | KAIRO - Agence de développement web et optimisation SEO",
  description:
    "Contactez-nous pour discuter de votre projet de développement web ou d'optimisation SEO. Notre équipe est à votre écoute pour répondre à vos besoins.",
};

export default function ContactPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="pt-20 pb-10 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discutons de votre projet et trouvons ensemble la solution qui
            répond à vos besoins.
          </p>
        </div>
      </section>

      {/* Contact Form and Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Envoyez-nous un message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone (optionnel)</Label>
                  <Input id="phone" placeholder="+33 6 XX XX XX XX" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" placeholder="Sujet de votre message" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Détaillez votre projet ou votre demande..."
                    className="min-h-[150px]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="consent"
                    className="h-4 w-4 rounded border-neutral-300 text-black focus:ring-neutral-500"
                  />
                  <Label
                    htmlFor="consent"
                    className="text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    J&apos;accepte que mes données soient traitées pour recevoir
                    une réponse à ma demande de contact.
                  </Label>
                </div>

                <Button type="submit" className="w-full">
                  Envoyer le message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    <a
                      href="mailto:contact@kairo.com"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      contact@kairo.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    <a
                      href="tel:+33123456789"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      +33 1 23 45 67 89
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Adresse</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Paris, France
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Horaires</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Lundi - Vendredi: 9h00 - 18h00
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Réseaux sociaux
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                      aria-label="Twitter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23z" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                      aria-label="Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Additional CTA */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Notre équipe est impatiente de travailler avec vous pour créer une
            solution web qui répond à vos besoins et dépasse vos attentes.
          </p>
          <Button asChild size="lg" className="font-medium">
            <a href="tel:+33123456789">Appelez-nous maintenant</a>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
