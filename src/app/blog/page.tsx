"use client";

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
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useBlogStore, BlogArticle } from "@/lib/store/blog-store";

// Formatage de la date pour l'affichage
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogContent() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");
  const postsPerPage = 6;

  // Récupération des articles via le store
  const { getPublishedArticles, articles } = useBlogStore();
  const [publishedPosts, setPublishedPosts] = useState<BlogArticle[]>([]);

  // Initialisation du state articles après hydration
  useEffect(() => {
    // Récupérer uniquement les articles publiés
    const published = getPublishedArticles();
    // Trier les articles par date de création (du plus récent au plus ancien)
    const sorted = [...published].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setPublishedPosts(sorted);
  }, [articles, getPublishedArticles]);

  // Pagination logic
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = publishedPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(publishedPosts.length / postsPerPage);

  return (
    <>
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
            {currentPosts.map((article) => (
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
                      {formatDate(article.createdAt)}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="flex justify-center mt-12" aria-label="Pagination">
              <ul className="flex items-center gap-1">
                {/* Previous page button */}
                <li>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    asChild={currentPage > 1}
                  >
                    {currentPage > 1 ? (
                      <Link
                        href={`/blog?page=${currentPage - 1}`}
                        aria-label="Previous page"
                      >
                        &laquo;
                      </Link>
                    ) : (
                      <span>&laquo;</span>
                    )}
                  </Button>
                </li>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li key={page}>
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        asChild={currentPage !== page}
                      >
                        {currentPage !== page ? (
                          <Link href={`/blog?page=${page}`}>{page}</Link>
                        ) : (
                          <span>{page}</span>
                        )}
                      </Button>
                    </li>
                  )
                )}

                {/* Next page button */}
                <li>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    asChild={currentPage < totalPages}
                  >
                    {currentPage < totalPages ? (
                      <Link
                        href={`/blog?page=${currentPage + 1}`}
                        aria-label="Next page"
                      >
                        &raquo;
                      </Link>
                    ) : (
                      <span>&raquo;</span>
                    )}
                  </Button>
                </li>
              </ul>
            </nav>
          )}
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
    </>
  );
}

// Séparer le composant serveur du composant client
export default function BlogPage() {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            Chargement...
          </div>
        }
      >
        <BlogContent />
      </Suspense>
    </MainLayout>
  );
}
