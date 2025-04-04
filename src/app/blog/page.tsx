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
    "Blog | KAIRO Digital - Agence de développement web et optimisation SEO",
  description:
    "Découvrez nos articles et conseils sur le développement web, l'optimisation SEO et les tendances du digital pour améliorer votre présence en ligne.",
  keywords:
    "blog, articles, développement web, optimisation SEO, webdesign, tendances web",
};

// Articles fictifs pour la démonstration
const articles = [
  {
    id: 1,
    title: "Comment améliorer votre référencement local en 2023",
    excerpt:
      "Le référencement local est crucial pour les entreprises ayant une présence physique. Découvrez les stratégies les plus efficaces pour améliorer votre visibilité dans les recherches locales.",
    author: "Antoine Dubois",
    category: "SEO",
    date: "15 mars 2023",
    readTime: "8 min",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 2,
    title: "Les avantages de Next.js pour votre projet web",
    excerpt:
      "Next.js s'impose comme un framework incontournable pour le développement web moderne. Découvrez pourquoi tant de développeurs et d'entreprises l'adoptent.",
    author: "Sophie Martin",
    category: "Développement",
    date: "28 avril 2023",
    readTime: "6 min",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 3,
    title: "L'importance du Core Web Vitals pour votre SEO",
    excerpt:
      "Les Core Web Vitals sont devenus un facteur de classement essentiel pour Google. Apprenez comment optimiser ces métriques pour améliorer votre référencement.",
    author: "Thomas Laurent",
    category: "Performance",
    date: "10 mai 2023",
    readTime: "7 min",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 4,
    title: "Design minimaliste : pourquoi moins c'est souvent plus",
    excerpt:
      "Le design minimaliste gagne en popularité pour sa clarté et son élégance. Découvrez comment l'adopter pour créer des interfaces utilisateur plus efficaces.",
    author: "Julie Moreau",
    category: "Design",
    date: "22 juin 2023",
    readTime: "5 min",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 5,
    title: "Sécuriser votre site WordPress : guide complet",
    excerpt:
      "WordPress est souvent la cible d'attaques en raison de sa popularité. Voici les mesures essentielles pour protéger votre site et vos données.",
    author: "Sophie Martin",
    category: "Sécurité",
    date: "7 juillet 2023",
    readTime: "9 min",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 6,
    title: "Headless CMS : l'avenir de la gestion de contenu ?",
    excerpt:
      "Les CMS headless séparent le frontend du backend, offrant plus de flexibilité aux développeurs. Découvrez si cette approche convient à votre projet.",
    author: "Thomas Laurent",
    category: "Développement",
    date: "19 août 2023",
    readTime: "7 min",
    image: "/images/placeholder-blog.jpg",
  },
];

export default function BlogPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="pt-20 pb-10 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Découvrez nos articles, conseils et analyses sur le développement
            web et l&apos;optimisation SEO.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="flex flex-col h-full">
                <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 relative flex items-center justify-center">
                  <p className="text-neutral-400 text-center">
                    Image de l&apos;article
                  </p>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {article.date}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription className="flex items-center text-xs">
                    <span>Par {article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime} de lecture</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/blog/${article.id}`}>
                      Lire l&apos;article
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Abonnez-vous à notre newsletter
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Recevez nos derniers articles et conseils directement dans votre
            boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-grow px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800"
            />
            <Button>S&apos;abonner</Button>
          </div>
          <p className="text-xs text-neutral-500 mt-4">
            En vous inscrivant, vous acceptez notre politique de
            confidentialité. Vous pouvez vous désabonner à tout moment.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
