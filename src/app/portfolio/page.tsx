import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Portfolio | KAIRO Digital",
  description:
    "Découvrez nos réalisations récentes en développement web et design.",
  openGraph: {
    title: "Portfolio | KAIRO Digital",
    description:
      "Découvrez nos réalisations récentes en développement web et design.",
    url: "https://www.kairo-digital.fr/portfolio",
    siteName: "KAIRO Digital",
    locale: "fr_FR",
    type: "website",
  },
};

const projects = [
  {
    id: 1,
    title: "Site e-commerce Luxe",
    description:
      "Création d&apos;une boutique en ligne pour une marque de produits de luxe avec intégration de paiement sécurisé et gestion de stock.",
    image: "/images/portfolio/ecommerce-luxe.jpg",
    technologies: ["Next.js", "Tailwind CSS", "Stripe", "Prisma"],
    link: "#",
  },
  {
    id: 2,
    title: "Application SaaS",
    description:
      "Développement d&apos;une application SaaS de gestion de projet avec tableau de bord interactif et fonctionnalités collaboratives.",
    image: "/images/portfolio/saas-app.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    link: "#",
  },
  {
    id: 3,
    title: "Site vitrine Architecture",
    description:
      "Conception d&apos;un site vitrine pour un cabinet d&apos;architecture avec galerie de projets et formulaire de contact personnalisé.",
    image: "/images/portfolio/architecture.jpg",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "#",
  },
  {
    id: 4,
    title: "Blog Lifestyle",
    description:
      "Création d&apos;un blog avec système de gestion de contenu sur mesure, intégration de newsletter et monétisation.",
    image: "/images/portfolio/blog-lifestyle.jpg",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
    link: "#",
  },
];

export default function PortfolioPage() {
  return (
    <main className="container mx-auto py-16 px-4 sm:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Nos Réalisations
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Découvrez nos projets récents et comment nous aidons nos clients à
          atteindre leurs objectifs numériques.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden border border-border hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video relative">
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Image du projet</p>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default" asChild className="w-full">
                <Link href={project.link}>Voir le projet</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">
          Vous avez un projet en tête ?
        </h2>
        <Button size="lg" asChild>
          <Link href="/contact">Discutons de votre projet</Link>
        </Button>
      </div>
    </main>
  );
}
