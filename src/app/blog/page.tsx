import { MainLayout } from "@/components/layout/main-layout";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";
import { Calendar, Clock, Tag } from "lucide-react";
import { BlogArticle } from "@/lib/store/blog-store";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Blog | KAIRO Digital - Actualités tech et conseils SEO 2025",
  description:
    "Découvrez les dernières tendances et innovations en développement web, SEO, IA et technologies numériques pour 2025. Conseils d'experts pour optimiser votre présence en ligne.",
  keywords:
    "blog tech, SEO 2025, IA web, développement web, web3, edge computing, performance web, Google Gemini, tendances numériques, PWA",
  alternates: {
    canonical: "https://www.kairo-digital.fr/blog",
  },
  openGraph: {
    title: "Blog Tech et SEO 2025 | KAIRO Digital",
    description:
      "Actualités et conseils d'experts sur les technologies web, SEO et innovation numérique en 2025",
    url: "https://www.kairo-digital.fr/blog",
    type: "website",
  },
};

// Badge component (simple version)
function Badge({
  variant = "default",
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"span"> & {
  variant?: "default" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variant === "default"
          ? "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
          : "border-neutral-200 dark:border-neutral-700 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Formater la date pour l'affichage
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Estimer le temps de lecture
function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

// Composant pour le squelette de chargement
function BlogPostSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden h-full flex flex-col animate-pulse">
      <div className="aspect-video bg-neutral-200 dark:bg-neutral-800 w-full"></div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-800 w-3/4 mb-4 rounded"></div>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-full mb-2 rounded"></div>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-full mb-2 rounded"></div>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-5/6 mb-4 rounded"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 w-16 rounded-full"></div>
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 w-20 rounded-full"></div>
        </div>
        <div className="mt-auto">
          <div className="h-9 bg-neutral-200 dark:bg-neutral-800 w-28 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

// Composant pour afficher une carte d'article
function BlogPostCard({ article }: { article: BlogArticle }) {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      <div className="aspect-video relative overflow-hidden">
        <Link href={`/blog/${article.slug}`} className="block w-full h-full">
          <Image
            src={article.image || "/images/placeholder-blog.jpg"}
            alt={article.title}
            className="object-cover hover:scale-105 transition-transform duration-500"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
          <Badge variant="outline" className="font-normal">
            {article.category}
          </Badge>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>
        <CardTitle className="text-xl mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-neutral-600 dark:text-neutral-400 line-clamp-3">
          {article.excerpt}
        </p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center text-sm text-neutral-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>{estimateReadingTime(article.content)} de lecture</span>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/blog/${article.slug}`}>Lire l&apos;article</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Composant pour la liste des articles filtrés par catégorie
function BlogPostsList({ category = "" }: { category?: string }) {
  // Version server-side avec données en dur pour éviter les erreurs de rendu
  const articles: BlogArticle[] = [
    {
      id: "1",
      title:
        "IA et SEO en 2025 : Comment Google Gemini révolutionne le référencement",
      content:
        "Analyse détaillée de l'impact des nouveaux algorithmes d'IA de Google sur les stratégies SEO et les méthodes pour adapter votre contenu à cette évolution majeure.",
      excerpt:
        "Analyse de l'impact des nouveaux algorithmes d'IA de Google sur les stratégies SEO et les méthodes pour adapter votre contenu à cette évolution majeure.",
      category: "SEO",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-02-12T10:00:00Z",
      updatedAt: "2025-02-12T10:00:00Z",
      slug: "ia-seo-2025-google-gemini",
    },
    {
      id: "2",
      title:
        "Web Components et Micro-Frontends : L'architecture frontale en 2025",
      content:
        "Comment les Web Components et l'approche Micro-Frontends transforment le développement d'applications web modernes avec une meilleure modularité et maintenabilité.",
      excerpt:
        "Comment les Web Components et l'approche Micro-Frontends transforment le développement d'applications web modernes avec une meilleure modularité et maintenabilité.",
      category: "Développement",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-03-03T14:30:00Z",
      updatedAt: "2025-03-03T14:30:00Z",
      slug: "web-components-micro-frontends-2025",
    },
    {
      id: "3",
      title:
        "Les Core Web Vitals 2.0 : Nouveaux métriques de performance pour 2025",
      content:
        "Google a mis à jour ses métriques Core Web Vitals avec de nouveaux indicateurs. Découvrez comment optimiser votre site pour ces critères qui impactent directement votre classement.",
      excerpt:
        "Google a mis à jour ses métriques Core Web Vitals avec de nouveaux indicateurs. Découvrez comment optimiser votre site pour ces critères qui impactent directement votre classement.",
      category: "Performance",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-03-27T16:45:00Z",
      updatedAt: "2025-03-27T16:45:00Z",
      slug: "core-web-vitals-2-nouveaux-metriques-2025",
    },
    {
      id: "4",
      title:
        "Edge Computing et Serverless : Optimiser les applications web en 2025",
      content:
        "Comment combiner Edge Computing et architectures Serverless pour créer des applications web ultra-performantes avec une latence minimale, même à l'échelle mondiale.",
      excerpt:
        "Comment combiner Edge Computing et architectures Serverless pour créer des applications web ultra-performantes avec une latence minimale, même à l'échelle mondiale.",
      category: "Architecture",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-04-15T13:10:00Z",
      updatedAt: "2025-04-15T13:10:00Z",
      slug: "edge-computing-serverless-2025",
    },
    {
      id: "5",
      title:
        "SEO local 2025 : Stratégies pour dominer les recherches géolocalisées",
      content:
        "Les dernières techniques pour optimiser votre présence locale, exploiter Google Business Profile 2.0 et attirer plus de clients dans votre zone géographique.",
      excerpt:
        "Les dernières techniques pour optimiser votre présence locale, exploiter Google Business Profile 2.0 et attirer plus de clients dans votre zone géographique.",
      category: "SEO Local",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-04-29T09:30:00Z",
      updatedAt: "2025-04-29T09:30:00Z",
      slug: "seo-local-2025-strategies-recherches-geolocalisees",
    },
    {
      id: "6",
      title:
        "Web3 et commerce électronique : Nouvelles possibilités pour les TPE/PME",
      content:
        "Comment les petites entreprises peuvent tirer parti des technologies Web3, comme les NFT et les smart contracts, pour créer de nouvelles opportunités commerciales.",
      excerpt:
        "Comment les petites entreprises peuvent tirer parti des technologies Web3, comme les NFT et les smart contracts, pour créer de nouvelles opportunités commerciales.",
      category: "Innovation",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-05-18T11:25:00Z",
      updatedAt: "2025-05-18T11:25:00Z",
      slug: "web3-ecommerce-tpe-pme-2025",
    },
  ];

  const filteredArticles = category
    ? articles.filter((article) => article.category === category)
    : articles;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredArticles.map((article) => (
        <BlogPostCard key={article.id} article={article} />
      ))}
    </div>
  );
}

// Composant pour le fallback de chargement
function BlogPostsListFallback() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <BlogPostSkeleton key={i} />
      ))}
    </div>
  );
}

// Composant pour le filtre de catégories
function CategoryFilter({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-12 justify-center">
      <Link href="/blog" className="no-underline">
        <Badge
          variant="outline"
          className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
        >
          Tous
        </Badge>
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/blog?category=${category}`}
          className="no-underline"
        >
          <Badge
            variant="outline"
            className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
          >
            {category}
          </Badge>
        </Link>
      ))}
    </div>
  );
}

// Page principale du blog
export default function BlogPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const selectedCategory = searchParams?.category || "";

  // Catégories de blog (en dur car c'est du SSR)
  const categories = [
    "SEO",
    "Développement",
    "Performance",
    "Architecture",
    "SEO Local",
    "Innovation",
    "IA & Design",
    "Mobile",
    "Légal & Analytics",
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-36 pb-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-down" threshold={0.2}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog Tech & SEO
            </h1>
            <div className="w-24 h-1 bg-blue-800 dark:bg-blue-700 mx-auto mb-8"></div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={1} threshold={0.2}>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Découvrez les dernières tendances et innovations en développement
              web, SEO, IA et technologies numériques pour 2025. Articles et
              conseils d&apos;experts pour optimiser votre présence en ligne.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Article mis en avant */}
      <section className="py-12 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up" threshold={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="rounded-lg overflow-hidden relative aspect-video">
                <Image
                  src="/images/placeholder-blog.jpg"
                  alt="IA et SEO en 2025 : Comment Google Gemini révolutionne le référencement"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <Badge variant="outline" className="mb-4">
                  À la une
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <Link
                    href="/blog/ia-seo-2025-google-gemini"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    IA et SEO en 2025 : Comment Google Gemini révolutionne le
                    référencement
                  </Link>
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Analyse détaillée de l&apos;impact des nouveaux algorithmes
                  d&apos;IA de Google sur les stratégies SEO et les méthodes
                  pour adapter votre contenu à cette évolution majeure.
                </p>
                <div className="flex items-center gap-4 mb-6 text-sm text-neutral-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>12 février 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>SEO</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>5 min de lecture</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/blog/ia-seo-2025-google-gemini">
                    Lire l&apos;article complet
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up" threshold={0.1} className="mb-12">
            <h2 className="text-3xl font-bold mb-3 text-center">
              {selectedCategory
                ? `Articles sur ${selectedCategory}`
                : "Tous les articles"}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-center max-w-3xl mx-auto">
              Explorez nos articles sur les dernières tendances, stratégies et
              innovations technologiques
            </p>
          </ScrollReveal>

          {/* Filtre par catégorie */}
          <ScrollReveal animation="fade-up" delay={1} threshold={0.1}>
            <CategoryFilter categories={categories} />
          </ScrollReveal>

          {/* Liste des articles */}
          <ScrollRevealGroup animation="fade-up" stagger={0.1} threshold={0.1}>
            <Suspense fallback={<BlogPostsListFallback />}>
              <BlogPostsList category={selectedCategory} />
            </Suspense>
          </ScrollRevealGroup>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-70 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal animation="fade-up" threshold={0.2}>
            <h2 className="text-3xl font-bold mb-6">
              Besoin d&apos;une stratégie web efficace ?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Contactez-moi pour discuter de votre projet et découvrir comment
              je peux vous aider à optimiser votre présence en ligne.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white hover:bg-white hover:text-blue-900 transition-all duration-300"
            >
              <Link href="/consultation">Réserver une consultation</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
}
