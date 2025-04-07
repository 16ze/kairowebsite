"use client";

import Link from "next/link";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { X, ArrowRight, MessageCircle } from "lucide-react";

export function StickyCTA() {
  // Démarrer avec isVisible et isDismissed à false pour éviter le flash d'hydratation
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Indiquer que le composant est maintenant chargé côté client
    setIsLoaded(true);

    // Vérifier si l'utilisateur a déjà fermé le popup
    const hasUserDismissed = localStorage.getItem("sticky-cta-dismissed");
    setIsDismissed(hasUserDismissed === "true");

    const handleScroll = () => {
      // Afficher après 300px de scroll (seulement si pas fermé par l'utilisateur)
      if (hasUserDismissed !== "true") {
        setIsVisible(window.scrollY > 300);
      }
    };

    // Vérifier la position initiale du scroll
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Enregistrer la préférence de l'utilisateur
    localStorage.setItem("sticky-cta-dismissed", "true");
  };

  // Ne rien afficher avant que le code client ne soit exécuté
  if (!isLoaded || !isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-4 z-50 border-t border-blue-700 transform transition-all duration-500 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center relative">
          {/* Contenu principal */}
          <div className="flex items-center mb-3 sm:mb-0">
            <div className="hidden sm:flex mr-4 bg-blue-700/40 p-2 rounded-full">
              <MessageCircle size={24} className="text-white" />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-base sm:text-lg text-white">
                Prêt à développer votre présence en ligne ?
              </p>
              <p className="text-sm text-blue-100 mt-1">
                Réponse garantie sous 24h — Devis gratuit et sans engagement
              </p>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hidden sm:flex bg-transparent border-white/30 text-white hover:bg-blue-700/30 hover:text-white transition-all duration-200"
            >
              <Link href="/portfolio">Voir mes réalisations</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 flex items-center gap-2 font-semibold shadow-md transition-all duration-200"
            >
              <Link href="/contact">
                Obtenir mon devis gratuit <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          {/* Bouton de fermeture */}
          <button
            onClick={handleDismiss}
            className="absolute -top-10 right-0 sm:relative sm:top-0 sm:ml-4 p-2 rounded-full bg-blue-800 sm:bg-blue-700/40 hover:bg-blue-700 transition-colors shadow-md"
            aria-label="Fermer le message"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Version mobile uniquement - affichage simplifié */}
        <div className="flex justify-center mt-2 sm:hidden">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-transparent border-white/30 text-white hover:bg-blue-700/30 hover:text-white text-xs transition-all duration-200"
          >
            <Link href="/portfolio">Voir mes réalisations</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
