"use client";

import Link from "next/link";
import { Button } from "./button";
import { useEffect, useState } from "react";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Afficher après 300px de scroll
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm py-4 z-50 border-t border-neutral-200 dark:border-neutral-800 transform transition-all duration-300 translate-y-0">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="hidden sm:block">
          <p className="font-semibold text-base">
            Prêt à développer votre présence en ligne ?
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Réponse garantie sous 24h
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="hidden sm:flex"
          >
            <Link href="/portfolio">Voir mes réalisations</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-blue-800 hover:bg-blue-700 animate-pulse"
          >
            <Link href="/contact">Obtenir mon devis gratuit →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
