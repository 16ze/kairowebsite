import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Blog | KAIRO Digital - Développeur web freelance et consultant SEO",
  description:
    "Découvrez nos articles et conseils sur le développement web, l'optimisation SEO et les tendances du digital pour améliorer votre présence en ligne.",
  keywords:
    "blog, articles, développement web, optimisation SEO, webdesign, tendances web",
};

// Articles fictifs pour la démonstration
const blogPosts = [
  {
    id: 1,
    title: "Comment améliorer votre référencement local en 2025",
    excerpt:
      "Découvrez les meilleures pratiques pour optimiser votre présence en ligne locale et attirer plus de clients dans votre région.",
    date: "15 mars 2025",
    category: "SEO",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 2,
    title: "Les tendances du développement web à surveiller",
    excerpt:
      "Exploration des technologies et frameworks émergents qui façonnent l'avenir du développement web moderne.",
    date: "28 avril 2025",
    category: "Développement",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 3,
    title: "Pourquoi votre entreprise a besoin d'une stratégie mobile",
    excerpt:
      "L'importance d'une approche mobile-first dans le paysage numérique actuel et comment l'implémenter efficacement.",
    date: "10 mai 2025",
    category: "Stratégie",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 4,
    title: "Optimiser la vitesse de chargement de votre site web",
    excerpt:
      "Guide complet pour améliorer les performances de votre site et offrir une meilleure expérience utilisateur.",
    date: "22 juin 2025",
    category: "Performance",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 5,
    title: "L'importance de l'accessibilité web pour votre site",
    excerpt:
      "Comment rendre votre site accessible à tous les utilisateurs et pourquoi c'est essentiel pour votre entreprise.",
    date: "7 juillet 2025",
    category: "Accessibilité",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 6,
    title: "Les avantages d'un site web sur mesure vs template",
    excerpt:
      "Analyse comparative entre les solutions personnalisées et les templates préconçus pour votre présence en ligne.",
    date: "19 août 2025",
    category: "Développement",
    image: "/images/placeholder-blog.jpg",
  },
];

export default function BlogPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="pt-36 pb-10 bg-white dark:bg-black">
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
            {blogPosts.map((article) => (
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
