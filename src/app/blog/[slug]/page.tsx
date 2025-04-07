import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Script from "next/script";

// Données des articles
const blogPosts = [
  {
    id: 1,
    slug: "ia-seo-2025-google-gemini",
    title:
      "IA et SEO en 2025 : Comment Google Gemini révolutionne le référencement",
    excerpt:
      "Analyse de l'impact des nouveaux algorithmes d'IA de Google sur les stratégies SEO et les méthodes pour adapter votre contenu à cette évolution majeure.",
    date: "12 février 2025",
    author: "Bryan KAIRO",
    category: "SEO",
    image: "/images/placeholder-blog.jpg",
    content: `
      <p>L'année 2025 marque un tournant décisif pour le référencement naturel avec l'intégration complète de Google Gemini dans le cœur de l'algorithme de recherche. Cette IA avancée, successeur de GPT-4, a profondément transformé la manière dont Google interprète et classe le contenu en ligne.</p>

      <h2>L'impact de Google Gemini sur le référencement</h2>
      
      <p>Depuis son déploiement complet en janvier 2025, Google Gemini analyse désormais le contenu des sites web avec une compréhension quasi-humaine du contexte et des nuances. Les conséquences pour le SEO sont majeures :</p>
      
      <ul>
        <li>La pertinence du contenu est désormais évaluée sur sa valeur informative réelle et non plus simplement sur des mots-clés</li>
        <li>L'intention de recherche est comprise avec une précision accrue, privilégiant les contenus qui répondent réellement aux besoins des utilisateurs</li>
        <li>Les contenus générés par IA sans valeur ajoutée significative sont pénalisés en faveur de contenus authentiques et originaux</li>
      </ul>

      <h2>Adapter votre stratégie SEO à l'ère de l'IA</h2>
      
      <p>Pour prospérer dans ce nouvel environnement, voici les stratégies à adopter :</p>
      
      <h3>1. Expertise, Autorité et Fiabilité (E-E-A-T)</h3>
      
      <p>Google Gemini est désormais capable d'évaluer l'expertise de l'auteur en comparant le contenu avec les connaissances de pointe dans le domaine. Pour réussir :</p>
      
      <ul>
        <li>Renforcez votre profil d'auteur avec des références vérifiables</li>
        <li>Liez votre contenu à des sources de haute autorité</li>
        <li>Partagez des expériences et études de cas uniques et vérifiables</li>
      </ul>
      
      <h3>2. Contenu conversationnel et naturel</h3>
      
      <p>L'ère du bourrage de mots-clés est définitivement révolue. Gemini privilégie les contenus qui :</p>
      
      <ul>
        <li>Répondent naturellement aux questions des utilisateurs</li>
        <li>Utilisent un langage conversationnel mais précis</li>
        <li>Couvrent les sujets en profondeur tout en restant accessibles</li>
      </ul>
      
      <h3>3. Optimisation multimodale</h3>
      
      <p>En 2025, Google analyse désormais tous les types de contenus (texte, images, vidéos, audio) de manière intégrée. Pour maximiser votre visibilité :</p>
      
      <ul>
        <li>Créez des contenus multiformats qui se renforcent mutuellement</li>
        <li>Assurez-vous que vos images et vidéos contiennent des métadonnées détaillées</li>
        <li>Utilisez la transcription pour vos contenus audio et vidéo</li>
      </ul>

      <h2>Études de cas : les gagnants de cette révolution</h2>
      
      <p>Les sites qui ont le mieux réussi cette transition sont ceux qui ont placé l'expertise réelle et la valeur utilisateur au centre de leur stratégie. Par exemple, le site médical MedInfo a vu son trafic augmenter de 112% en déployant un système de validation par des médecins certifiés pour chaque article.</p>

      <h2>Conclusion</h2>
      
      <p>L'avènement de Google Gemini marque la fin définitive du SEO "technique" au profit d'une approche centrée sur la valeur réelle apportée aux utilisateurs. Les entreprises qui comprennent et adoptent ce changement de paradigme seront les grands gagnants du référencement en 2025 et au-delà.</p>
      
      <p>Pour réussir, concentrez-vous sur l'expertise réelle, la résolution des problèmes des utilisateurs et une approche multidimensionnelle du contenu. L'ère de l'IA dans le SEO ne fait que commencer, mais elle récompense déjà ceux qui placent l'humain au centre de leur stratégie.</p>
    `,
    relatedPosts: [5, 7, 9],
  },
  // Autres articles à ajouter
];

// Générer les métadonnées dynamiques
export async function generateMetadata({ params }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: "Article non trouvé | KAIRO Digital",
      description:
        "L'article que vous recherchez n'existe pas ou a été déplacé.",
    };
  }

  return {
    title: `${post.title} | KAIRO Digital`,
    description: post.excerpt,
    keywords: [
      post.category,
      "blog",
      "développement web",
      "SEO",
      post.title.toLowerCase(),
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPost({ params }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  // Si l'article n'existe pas, retourner 404
  if (!post) {
    notFound();
  }

  // Articles liés
  const relatedPosts = post.relatedPosts
    ? blogPosts.filter((p) => post.relatedPosts.includes(p.id)).slice(0, 3)
    : [];

  return (
    <MainLayout>
      {/* Données structurées pour SEO */}
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            image: `https://www.kairo-digital.fr${post.image}`,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "KAIRO Digital",
              logo: {
                "@type": "ImageObject",
                url: "https://www.kairo-digital.fr/images/kairo-logo.png",
              },
            },
            description: post.excerpt,
          }),
        }}
      />

      {/* Header de l'article */}
      <section className="pt-36 pb-10 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal animation="fade-down">
              <div className="mb-6">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="ml-4 text-neutral-500 dark:text-neutral-400 text-sm">
                  {post.date}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                {post.excerpt}
              </p>

              <div className="mt-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-neutral-500">
                      Développeur & Consultant SEO
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contenu de l'article */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal animation="fade-up">
              <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-10 flex items-center justify-center">
                <p className="text-neutral-400">
                  Image principale de l'article
                </p>
              </div>

              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-blue"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Partage et tags */}
              <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Tags:
                    </span>
                    <Link
                      href={`/blog?category=${post.category}`}
                      className="text-sm bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                      {post.category}
                    </Link>
                    <Link
                      href="/blog?tag=2025"
                      className="text-sm bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                      2025
                    </Link>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Partager
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                      Twitter
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Articles liés */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Articles liés</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <div className="bg-white dark:bg-black rounded-lg shadow-sm overflow-hidden transition-shadow group-hover:shadow-md">
                      <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 relative flex items-center justify-center">
                        <p className="text-neutral-400 text-center text-sm">
                          Image de l'article
                        </p>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-neutral-500 mb-2">
                          {post.date}
                        </p>
                        <h3 className="font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Besoin d&apos;une stratégie SEO efficace en 2025 ?
            </h2>
            <p className="text-blue-100 mb-8">
              Prenez contact avec moi pour un audit personnalisé et des
              solutions adaptées à votre entreprise.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50"
            >
              <Link href="/contact">Discutons de votre projet</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
