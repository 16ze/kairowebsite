"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useBlogStore, BlogArticle } from "@/lib/store/blog-store";
import { notFound } from "next/navigation";

// Formatage de la date pour l'affichage
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Estimation du temps de lecture (environ 200 mots par minute)
function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min`;
}

interface BlogPostContentProps {
  params: {
    slug: string;
  };
}

export default function BlogPostContent({ params }: BlogPostContentProps) {
  const [post, setPost] = useState<BlogArticle | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogArticle[]>([]);
  const { getArticleBySlug, getPublishedArticles, articles } = useBlogStore();

  useEffect(() => {
    // Récupérer l'article par son slug
    const article = getArticleBySlug(params.slug);

    // Si l'article n'existe pas ou n'est pas publié, on s'arrête là
    if (!article || !article.published) {
      return;
    }

    setPost(article);

    // Trouver des articles connexes (même catégorie, mais pas le même article)
    const publishedArticles = getPublishedArticles();
    const related = publishedArticles
      .filter((a) => a.category === article.category && a.id !== article.id)
      .slice(0, 3); // Limiter à 3 articles connexes

    setRelatedPosts(related);
  }, [params.slug, getArticleBySlug, getPublishedArticles, articles]);

  // Si l'article n'existe pas
  if (!post) {
    // Pendant le chargement initial, afficher un indicateur de chargement
    if (articles.length === 0) {
      return (
        <div className="container mx-auto px-4 py-36">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl">Chargement de l&apos;article...</h2>
          </div>
        </div>
      );
    }

    // Si l'article n'est pas trouvé après le chargement
    return notFound();
  }

  return (
    <MainLayout>
      {/* Breadcrumb & Back link */}
      <div className="container mx-auto px-4 pt-32 pb-8">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Link>
          </Button>
          <nav className="text-sm text-neutral-600 dark:text-neutral-400">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{" "}
            /
            <Link href="/blog" className="mx-2 hover:underline">
              Blog
            </Link>{" "}
            /
            <span className="text-neutral-900 dark:text-neutral-200">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span className="mr-1">KAIRO Digital</span>
              <span className="text-neutral-500">(Expert SEO)</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{post.category}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{estimateReadingTime(post.content)} de lecture</span>
            </div>
          </div>

          {post.image && (
            <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden relative mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Articles connexes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <div
                  key={related.id}
                  className="border rounded-lg overflow-hidden"
                >
                  {related.image && (
                    <div className="aspect-video bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{related.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                      {related.excerpt}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/blog/${related.slug}`}>
                        Lire l&apos;article
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
