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

// Articles à jour pour 2025
const blogPosts = [
  {
    id: 1,
    slug: "ia-seo-2025-google-gemini",
    title:
      "IA et SEO en 2025 : Comment Google Gemini révolutionne le référencement",
    excerpt:
      "Analyse de l'impact des nouveaux algorithmes d'IA de Google sur les stratégies SEO et les méthodes pour adapter votre contenu à cette évolution majeure.",
    date: "12 février 2025",
    category: "SEO",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 2,
    slug: "web-components-micro-frontends-2025",
    title:
      "Web Components et Micro-Frontends : L'architecture frontale en 2025",
    excerpt:
      "Comment les Web Components et l'approche Micro-Frontends transforment le développement d'applications web modernes avec une meilleure modularité et maintenabilité.",
    date: "3 mars 2025",
    category: "Développement",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 3,
    slug: "core-web-vitals-2-nouveaux-metriques-2025",
    title:
      "Les Core Web Vitals 2.0 : Nouveaux métriques de performance pour 2025",
    excerpt:
      "Google a mis à jour ses métriques Core Web Vitals avec de nouveaux indicateurs. Découvrez comment optimiser votre site pour ces critères qui impactent directement votre classement.",
    date: "27 mars 2025",
    category: "Performance",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 4,
    slug: "edge-computing-serverless-2025",
    title:
      "Edge Computing et Serverless : Optimiser les applications web en 2025",
    excerpt:
      "Comment combiner Edge Computing et architectures Serverless pour créer des applications web ultra-performantes avec une latence minimale, même à l'échelle mondiale.",
    date: "15 avril 2025",
    category: "Architecture",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 5,
    slug: "seo-local-2025-strategies-recherches-geolocalisees",
    title:
      "SEO local 2025 : Stratégies pour dominer les recherches géolocalisées",
    excerpt:
      "Les dernières techniques pour optimiser votre présence locale, exploiter Google Business Profile 2.0 et attirer plus de clients dans votre zone géographique.",
    date: "29 avril 2025",
    category: "SEO Local",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 6,
    slug: "web3-ecommerce-tpe-pme-2025",
    title:
      "Web3 et commerce électronique : Nouvelles possibilités pour les TPE/PME",
    excerpt:
      "Comment les petites entreprises peuvent tirer parti des technologies Web3, comme les NFT et les smart contracts, pour créer de nouvelles opportunités commerciales.",
    date: "18 mai 2025",
    category: "Innovation",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 7,
    slug: "ia-generative-creation-sites-web-2025",
    title: "L'impact de l'IA générative sur la création de sites web en 2025",
    excerpt:
      "L'IA générative transforme la conception et le développement web. Découvrez comment l'utiliser efficacement tout en maintenant l'originalité et la qualité de votre présence en ligne.",
    date: "2 juin 2025",
    category: "IA & Design",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 8,
    slug: "progressive-web-apps-2025-standard-mobile",
    title:
      "Progressive Web Apps en 2025 : Le nouveau standard pour les sites mobiles",
    excerpt:
      "Les PWA sont désormais incontournables pour offrir une expérience mobile optimale. Découvrez les dernières fonctionnalités et comment les implémenter efficacement.",
    date: "24 juin 2025",
    category: "Mobile",
    image: "/images/placeholder-blog.jpg",
  },
  {
    id: 9,
    slug: "gdpr-2-cookieless-tracking-2025",
    title: "GDPR 2.0 et Cookie-less Tracking : Conformité et analytics en 2025",
    excerpt:
      "Les nouvelles régulations européennes et la fin des cookies tiers transforment l'analyse de données. Voici comment rester conforme tout en collectant des données pertinentes.",
    date: "8 juillet 2025",
    category: "Légal & Analytics",
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
                    <Link href={`/blog/${article.slug}`}>
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
