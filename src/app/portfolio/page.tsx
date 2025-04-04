import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title:
    "Portfolio | KAIRO Digital - Agence de développement web et optimisation SEO",
  description:
    "Découvrez notre portfolio de projets de développement web et d'optimisation SEO. Des solutions sur mesure pour répondre à vos besoins spécifiques.",
  keywords:
    "portfolio, projets, développement web, optimisation SEO, site web, agence web, design",
};

// Projets fictifs pour la démonstration
const projects = [
  {
    id: 1,
    title: "Rénovation du site e-commerce Luxea",
    client: "Luxea",
    description:
      "Refonte complète du site e-commerce avec amélioration des performances et de l'expérience utilisateur. Implémentation d'une nouvelle stratégie SEO qui a permis d'augmenter le trafic organique de 65%.",
    technologies: ["Next.js", "Tailwind CSS", "Sanity CMS", "Stripe"],
    category: "ecommerce",
    year: 2023,
    image: "/images/placeholder-project.jpg",
  },
  {
    id: 2,
    title: "Application web pour Finovo",
    client: "Finovo",
    description:
      "Développement d'une plateforme de gestion financière permettant aux utilisateurs de suivre leurs investissements et de gérer leur portefeuille en temps réel.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    category: "application",
    year: 2023,
    image: "/images/placeholder-project.jpg",
  },
  {
    id: 3,
    title: "Site vitrine pour le cabinet d'architectes Arkiteo",
    client: "Arkiteo",
    description:
      "Création d'un site vitrine élégant mettant en valeur les projets architecturaux du cabinet. Optimisation SEO locale qui a permis d'améliorer le positionnement sur les recherches locales.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "vitrine",
    year: 2022,
    image: "/images/placeholder-project.jpg",
  },
  {
    id: 4,
    title: "Plateforme éducative pour EduLearn",
    client: "EduLearn",
    description:
      "Développement d'une plateforme d'apprentissage en ligne permettant aux éducateurs de créer des cours interactifs et aux étudiants de suivre leur progression.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "AWS S3"],
    category: "application",
    year: 2022,
    image: "/images/placeholder-project.jpg",
  },
  {
    id: 5,
    title: "Refonte du blog NutriSanté",
    client: "NutriSanté",
    description:
      "Optimisation SEO et refonte du blog avec un design responsive. Mise en place d'une stratégie de contenu qui a permis de doubler le trafic en 6 mois.",
    technologies: ["Next.js", "Tailwind CSS", "Contentful"],
    category: "blog",
    year: 2023,
    image: "/images/placeholder-project.jpg",
  },
  {
    id: 6,
    title: "Application mobile Sportify",
    client: "Sportify",
    description:
      "Développement d'une application mobile permettant aux utilisateurs de suivre leurs activités sportives et de se connecter avec d'autres sportifs.",
    technologies: ["React Native", "Node.js", "Firebase"],
    category: "application",
    year: 2022,
    image: "/images/placeholder-project.jpg",
  },
];

// Catégories pour le filtre
const categories = [
  { id: "all", name: "Tous" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "application", name: "Applications" },
  { id: "vitrine", name: "Sites vitrines" },
  { id: "blog", name: "Blogs" },
];

export default function PortfolioPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="pt-36 pb-10 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Notre Portfolio
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Découvrez nos projets récents et comment nous avons aidé nos clients
            à atteindre leurs objectifs numériques.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filtres - À implémenter avec useState dans une future mise à jour */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 relative flex items-center justify-center">
                  <p className="text-neutral-400">Image du projet</p>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>
                        Client: {project.client}
                      </CardDescription>
                    </div>
                    <span className="text-sm text-neutral-500">
                      {project.year}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/portfolio/${project.id}`}>
                      Voir les détails
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vous souhaitez rejoindre notre portfolio ?
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
            Contactez-nous dès aujourd&apos;hui pour discuter de votre projet et
            découvrir comment nous pouvons vous aider à atteindre vos objectifs
            numériques.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white hover:bg-white hover:text-black"
          >
            <Link href="/contact">Discuter de votre projet</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
