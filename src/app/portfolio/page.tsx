import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";

export const metadata = {
  title:
    "Portfolio | KAIRO Digital - Développeur web freelance et consultant SEO",
  description:
    "Découvrez mes réalisations en développement web et optimisation SEO. Des sites web performants, élégants et optimisés pour les moteurs de recherche.",
  keywords:
    "portfolio, projets, développement web, optimisation SEO, site web, freelance, développeur indépendant, design",
};

// Projets réels
const realProjects = [
  {
    id: 1,
    title: "Purple Nails Studio",
    category: "Site vitrine",
    description:
      "Design moderne et élégant pour un salon de manucure haut de gamme. Le site met en valeur les services et le savoir-faire du salon tout en facilitant la prise de rendez-vous en ligne. L'optimisation SEO locale a permis d'augmenter la visibilité dans la région.",
    image: "/images/PurpleNailsStudio.png",
    client: "Purple Nails Studio",
    year: 2024,
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO Local"],
    results: [
      "Augmentation de 60% des prises de RDV en ligne",
      "Top 3 sur Google pour 'salon manucure' dans la région",
    ],
    link: "/portfolio/purple-nails-studio",
  },
  {
    id: 2,
    title: "KAIRO Digital",
    category: "Site vitrine",
    description:
      "Vitrine professionnelle mettant en avant mes services de développement web et d'optimisation SEO. Le site combine performance technique et design moderne pour démontrer mon expertise et générer des leads qualifiés.",
    image: "/images/Projet-Kairo-Digital.png",
    client: "KAIRO Digital",
    year: 2024,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "SEO Avancé"],
    results: [
      "Score PageSpeed de 98/100",
      "Taux de conversion de 15% sur les demandes de devis",
    ],
    link: "/portfolio/kairo-digital",
  },
  {
    id: 3,
    title: "HOLY Beauty",
    category: "Site vitrine",
    description:
      "Site vitrine élégant pour un institut de beauté haut de gamme. L'accent a été mis sur l'expérience utilisateur et le design pour refléter l'identité premium de l'établissement tout en optimisant les conversions.",
    image: "/images/HOLY Beauty.png",
    client: "HOLY Beauty",
    year: 2024,
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Animations avancées",
      "SEO Local",
    ],
    results: [
      "Augmentation du temps moyen passé sur le site de 45%",
      "Réduction du taux de rebond de 35%",
    ],
    link: "/portfolio/holy-beauty",
  },
];

// Types de projets que je peux réaliser
const projectTypes = [
  {
    title: "Sites E-commerce",
    description:
      "Des boutiques en ligne performantes et sécurisées pour vendre vos produits 24/7. Intégration des meilleures solutions de paiement et optimisation pour les conversions.",
    features: [
      "Paiement sécurisé",
      "Gestion des stocks",
      "Mobile-first",
      "SEO E-commerce",
    ],
    icon: "🛍️",
  },
  {
    title: "Applications Web",
    description:
      "Des applications web sur mesure pour digitaliser vos processus métier. Solutions évolutives et performantes adaptées à vos besoins spécifiques.",
    features: [
      "Interface intuitive",
      "Performance optimale",
      "Sécurité renforcée",
      "API REST",
    ],
    icon: "⚡",
  },
  {
    title: "Sites Vitrines",
    description:
      "Des sites vitrines élégants et performants pour présenter votre activité. Design moderne et optimisation SEO pour attirer plus de clients.",
    features: [
      "Design responsive",
      "SEO optimisé",
      "Performances élevées",
      "Analytics",
    ],
    icon: "🎯",
  },
  {
    title: "Blogs Professionnels",
    description:
      "Des blogs optimisés pour le référencement et la création de contenu. Solutions idéales pour votre stratégie de content marketing.",
    features: ["CMS intégré", "SEO content", "Catégorisation", "Newsletter"],
    icon: "📝",
  },
];

export default function PortfolioPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="pt-36 pb-10 bg-gradient-to-b from-blue-900/80 to-neutral-900/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-down">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mes Réalisations
            </h1>
            <p className="text-lg text-neutral-200 max-w-2xl mx-auto">
              Découvrez comment j&apos;aide mes clients à développer leur
              présence en ligne avec des solutions web performantes et
              optimisées.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Projets Réalisés */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Derniers Projets
            </h2>
          </ScrollReveal>

          <ScrollRevealGroup
            animation="fade-up"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {realProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.category}</CardDescription>
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
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {project.results.map((result, index) => (
                        <p
                          key={index}
                          className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {result}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button
                    asChild
                    className="w-full bg-blue-800 hover:bg-blue-700"
                  >
                    <Link href="/contact">Projet similaire ?</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* Types de Projets */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Mes Domaines d&apos;Expertise
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Je développe des solutions web sur mesure pour répondre à tous
                vos besoins digitaux.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealGroup
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projectTypes.map((type, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{type.icon}</span>
                    <div>
                      <CardTitle>{type.title}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {type.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        <svg
                          className="w-4 h-4 text-blue-600 dark:text-blue-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-blue-800 hover:bg-blue-700"
                  >
                    <Link href={`/contact?type=${type.title}`}>
                      Démarrer un projet
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à Concrétiser Votre Projet Web ?
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
              Que vous ayez besoin d&apos;un site vitrine, d&apos;une boutique
              en ligne ou d&apos;une application web, je vous accompagne dans la
              réalisation de votre projet digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-800 hover:bg-blue-700"
              >
                <Link href="/contact">Demander un devis gratuit</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-neutral-800 dark:border-white/80 text-neutral-800 dark:text-white hover:bg-neutral-800 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
              >
                <Link href="/freelance">En savoir plus sur mes services</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
}
