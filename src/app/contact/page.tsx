"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { event } from "@/lib/analytics";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  project: string;
  consent: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  project?: string;
  consent?: string;
}

export default function ContactPage() {
  // États pour le formulaire
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    project: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Classes personnalisées pour les champs de formulaire
  const inputClasses =
    "dark:bg-neutral-800 dark:border-neutral-700 dark:focus-visible:border-blue-700 dark:focus-visible:ring-blue-700/30";
  const labelClasses =
    "text-neutral-800 dark:text-neutral-300 font-medium mb-1.5 block";
  const errorClasses = "text-red-500 text-sm mt-1";

  // Gestion des changements dans les champs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Effacer l'erreur pour ce champ si elle existe
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis";
    }

    if (!formData.project.trim()) {
      newErrors.project = "La description du projet est requise";
    }

    if (!formData.consent) {
      newErrors.consent = "Vous devez accepter le traitement de vos données";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");

      // Tracking des erreurs de validation
      event({
        action: "form_validation_error",
        category: "contact",
        label: Object.keys(errors).join(","),
      });

      return;
    }

    setIsSubmitting(true);

    // Tracking du début de soumission
    event({
      action: "contact_form_submit_start",
      category: "contact",
      label: formData.subject,
    });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/contact`
        : "/api/contact";

      console.log("Envoi du formulaire à:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Tracking du succès de la soumission
        event({
          action: "contact_form_submit_success",
          category: "contact",
          label: formData.subject,
        });

        toast.success(
          "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais."
        );
        // Réinitialiser le formulaire
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          project: "",
          consent: false,
        });
      } else {
        // Tracking des erreurs d'API
        event({
          action: "contact_form_submit_api_error",
          category: "contact",
          label: data.message || "Unknown API error",
        });

        toast.error(
          data.message ||
            "Une erreur est survenue. Veuillez réessayer plus tard."
        );
      }
    } catch (error) {
      // Tracking des erreurs réseau
      event({
        action: "contact_form_submit_network_error",
        category: "contact",
        label: error instanceof Error ? error.message : "Unknown error",
      });

      toast.error(
        "Problème de connexion. Veuillez vérifier votre connexion internet et réessayer."
      );
      console.error("Erreur lors de l'envoi du formulaire:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      {/* Page Header */}
      <section className="pt-36 pb-16 bg-white dark:bg-black">
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

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 p-4 rounded-lg mb-8">
                  <p className="text-blue-800 dark:text-blue-300 font-medium flex items-start gap-2">
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
                        Réponse garantie sous 24h à 48h
                      </span>{" "}
                      - Je prends le temps de lire attentivement chaque demande
                      et d&apos;y répondre personnellement.
                    </span>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Prénom */}
                    <div>
                      <Label htmlFor="firstName" className={labelClasses}>
                        Prénom *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={cn(
                          inputClasses,
                          errors.firstName
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        )}
                        aria-invalid={!!errors.firstName}
                      />
                      {errors.firstName && (
                        <p className={errorClasses}>{errors.firstName}</p>
                      )}
                    </div>

                    {/* Nom */}
                    <div>
                      <Label htmlFor="lastName" className={labelClasses}>
                        Nom *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={cn(
                          inputClasses,
                          errors.lastName
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        )}
                        aria-invalid={!!errors.lastName}
                      />
                      {errors.lastName && (
                        <p className={errorClasses}>{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className={labelClasses}>
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          inputClasses,
                          errors.email
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        )}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className={errorClasses}>{errors.email}</p>
                      )}
                    </div>

                    {/* Téléphone */}
                    <div>
                      <Label htmlFor="phone" className={labelClasses}>
                        Téléphone (optionnel)
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Sujet */}
                  <div>
                    <Label htmlFor="subject" className={labelClasses}>
                      Sujet *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={cn(
                        inputClasses,
                        errors.subject
                          ? "border-red-500 dark:border-red-500"
                          : ""
                      )}
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                      <p className={errorClasses}>{errors.subject}</p>
                    )}
                  </div>

                  {/* Projet */}
                  <div>
                    <Label htmlFor="project" className={labelClasses}>
                      Votre projet *
                    </Label>
                    <Textarea
                      id="project"
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      className={cn(
                        "min-h-32",
                        inputClasses,
                        errors.project
                          ? "border-red-500 dark:border-red-500"
                          : ""
                      )}
                      aria-invalid={!!errors.project}
                      placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
                    />
                    {errors.project && (
                      <p className={errorClasses}>{errors.project}</p>
                    )}
                  </div>

                  {/* Consentement */}
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <div>
                      <Label
                        htmlFor="consent"
                        className="font-normal cursor-pointer"
                      >
                        J&apos;accepte que mes données soient utilisées pour me
                        recontacter concernant ma demande. *
                      </Label>
                      {errors.consent && (
                        <p className={errorClasses}>{errors.consent}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-800 hover:bg-blue-700 text-lg py-6"
                  >
                    {isSubmitting
                      ? "Envoi en cours..."
                      : "Envoyer votre message"}
                  </Button>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                    * Champs obligatoires
                  </p>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-black p-8 rounded-lg shadow-sm h-full">
                <h2 className="text-2xl font-bold mb-6">
                  Informations de contact
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-blue-800 dark:text-blue-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-1">
                        Pour toute demande :
                      </p>
                      <a
                        href="mailto:contact@kairo-digital.fr"
                        className="text-blue-700 dark:text-blue-400 hover:underline"
                      >
                        contact@kairo-digital.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-blue-800 dark:text-blue-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Site web</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-1">
                        Visitez notre site :
                      </p>
                      <a
                        href="https://www.kairo-digital.fr"
                        className="text-blue-700 dark:text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        www.kairo-digital.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-blue-800 dark:text-blue-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Horaires de disponibilité
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Du lundi au samedi
                        <br />
                        9h - 19h
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <h3 className="font-semibold text-xl mb-3">
                    Audit SEO gratuit
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Bénéficiez d&apos;une analyse gratuite de votre site web
                    d&apos;une valeur de 250€. Mentionnez le code{" "}
                    <span className="font-mono font-bold text-blue-700 dark:text-blue-400">
                      AUDIT2025
                    </span>{" "}
                    dans votre message.
                  </p>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-500"
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
                      <span>Analyse technique complète</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-500"
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
                      <span>Étude des mots-clés</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-500"
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
                      <span>Recommandations personnalisées</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">FAQ</h2>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <h3 className="text-xl font-semibold mb-2">
                  Quel est le délai moyen pour la réalisation d&apos;un site web
                  ?
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Le délai varie en fonction de la complexité du projet. Un site
                  vitrine prend généralement 2 à 4 semaines, tandis qu&apos;un
                  e-commerce ou une application web peut nécessiter 1 à 3 mois
                  de développement.
                </p>
              </div>

              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <h3 className="text-xl font-semibold mb-2">
                  Comment se déroule le processus de création ?
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Nous commençons par un briefing pour comprendre vos besoins,
                  puis créons des maquettes pour validation. Une fois
                  approuvées, nous développons le site et effectuons des tests
                  avant la mise en ligne.
                </p>
              </div>

              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <h3 className="text-xl font-semibold mb-2">
                  Proposez-vous un service de maintenance après la mise en ligne
                  ?
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Oui, nous proposons différentes formules de maintenance pour
                  assurer le bon fonctionnement, la sécurité et la mise à jour
                  de votre site web. Ces services peuvent être adaptés selon vos
                  besoins.
                </p>
              </div>

              <div className="pb-4">
                <h3 className="text-xl font-semibold mb-2">
                  Comment puis-je suivre l&apos;avancement de mon projet ?
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Nous utilisons une plateforme de gestion de projet
                  collaborative où vous pouvez suivre l&apos;avancement en temps
                  réel, communiquer avec l&apos;équipe et valider les
                  différentes étapes de développement.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Vous avez d&apos;autres questions ? N&apos;hésitez pas à me
                contacter directement.
              </p>
              <Button asChild>
                <Link href="mailto:contact@kairo-digital.fr">
                  Envoyer un email
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
