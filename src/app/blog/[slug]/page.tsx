import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag, User, Clock } from "lucide-react";
import { BlogArticle } from "@/lib/store/blog-store";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Métadonnées statiques
export const metadata: Metadata = {
  title: "Article de blog | KAIRO Digital",
  description:
    "Découvrez nos articles experts sur le développement web, le SEO et les technologies numériques.",
};

// Formater la date pour l'affichage
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

// Fonction pour récupérer un article par son slug (côté serveur)
function getArticleBySlug(slug: string): BlogArticle | undefined {
  // Liste des articles du blog (doit correspondre à celle dans page.tsx)
  const articles: BlogArticle[] = [
    {
      id: "1",
      title:
        "IA et SEO en 2025 : Comment Google Gemini révolutionne le référencement",
      content:
        "Les algorithmes d'intelligence artificielle de Google ont radicalement changé le paysage du référencement en 2025. Avec l'introduction de Google Gemini, l'accent est désormais mis sur la compréhension contextuelle approfondie plutôt que sur les simples mots-clés.\n\nPremièrement, Gemini analyse non seulement le texte, mais aussi les images, vidéos et la structure globale du site pour déterminer la pertinence. Les sites qui offrent une expérience multimédia cohérente et informative sont privilégiés.\n\nDeuxièmement, l'intention de recherche est analysée avec une précision sans précédent. Il ne suffit plus de répondre à une requête, il faut anticiper les questions complémentaires et y répondre de manière proactive.\n\nTroisièmement, l'expertise, l'autorité et la fiabilité (E-A-T) restent cruciales mais sont évaluées différemment. Gemini peut détecter les nuances dans le contenu qui démontrent une véritable expertise plutôt qu'un simple assemblage d'informations.\n\nPour adapter votre stratégie SEO à cette nouvelle réalité, concentrez-vous sur :\n\n1. La création de contenus approfondis qui abordent un sujet sous plusieurs angles\n2. L'optimisation de l'expérience utilisateur sur tous les appareils\n3. L'intégration cohérente des différents formats de contenu (texte, image, vidéo)\n4. La démonstration de votre expertise réelle et de votre autorité dans votre domaine\n\nLes sites qui réussiront dans ce nouvel environnement seront ceux qui privilégient l'apport de valeur réelle aux utilisateurs plutôt que les techniques d'optimisation superficielles.",
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
        "L'architecture frontale des applications web a connu une transformation majeure avec l'adoption généralisée des Web Components et l'approche Micro-Frontends en 2025.\n\nLes Web Components, avec leurs quatre technologies principales (Custom Elements, Shadow DOM, HTML Templates et HTML Imports), permettent désormais de créer des composants réutilisables qui fonctionnent de manière autonome, indépendamment des frameworks.\n\nParallèlement, l'architecture Micro-Frontends divise les applications monolithiques en parties plus petites et indépendantes qui peuvent être développées, testées et déployées par des équipes différentes. Cela résout les problèmes de coordination entre grandes équipes et permet d'adopter différentes technologies pour différentes parties de l'application.\n\nVoici les principaux avantages observés :\n\n1. Meilleure modularité et réutilisation du code à travers différents projets\n2. Équipes autonomes pouvant travailler avec différentes technologies selon les besoins spécifiques\n3. Possibilité de mettre à jour des parties de l'application sans redéployer l'ensemble\n4. Compatibilité accrue entre différents frameworks et bibliothèques\n\nCependant, cette approche présente aussi des défis, notamment en termes de cohérence de l'interface utilisateur, de performance due à la multiplication des ressources chargées, et de complexité initiale de mise en place.\n\nLes entreprises qui ont adopté ces architectures ont observé une amélioration significative de la vitesse de développement et de la maintenabilité à long terme de leurs applications, particulièrement pour les grands projets impliquant plusieurs équipes.",
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
        "Google a récemment mis à jour ses métriques Core Web Vitals, introduisant de nouvelles mesures pour mieux évaluer l'expérience utilisateur des sites web en 2025. Cette mise à jour, que nous appellerons Core Web Vitals 2.0, est une évolution majeure qui influence directement le classement des sites dans les résultats de recherche.\n\nLes métriques d'origine (LCP, FID, CLS) ont été affinées et de nouveaux indicateurs ont été ajoutés :\n\n1. Largest Contentful Paint (LCP) - Maintenant plus précis, avec un seuil réduit à 2 secondes pour être considéré comme 'bon', contre 2.5 secondes auparavant.\n\n2. Interaction to Next Paint (INP) - Remplaçant First Input Delay (FID), cette métrique mesure la réactivité globale du site à toutes les interactions utilisateur, pas seulement la première.\n\n3. Cumulative Layout Shift (CLS) - Affiné pour mieux prendre en compte les animations et transitions intentionnelles.\n\n4. Resource Load Time (RLT) - Nouveau critère qui évalue l'efficacité du chargement des ressources critiques.\n\n5. Time to First Byte Enhanced (TTFBE) - Une version améliorée du TTFB qui prend en compte non seulement la vitesse du serveur mais aussi l'optimisation de la livraison du contenu.\n\nPour optimiser votre site pour ces nouveaux critères :\n\n- Implémentez le lazy loading pour les images et vidéos non essentielles\n- Optimisez votre code JavaScript pour améliorer l'INP\n- Utilisez les nouvelles API de priorisation des ressources\n- Adoptez les Server Components pour les frameworks qui les supportent\n- Implémentez un CDN efficace pour améliorer le TTFBE\n\nLes sites qui s'adapteront rapidement à ces nouvelles métriques bénéficieront d'un avantage significatif dans les classements Google, surtout dans les secteurs compétitifs.",
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
        "L'Edge Computing et les architectures Serverless ont révolutionné la façon dont nous construisons et déployons les applications web en 2025. Ces technologies complémentaires offrent des avantages considérables en termes de performance, d'évolutivité et de coûts.\n\nL'Edge Computing déplace le traitement des données plus près des utilisateurs finaux, aux \"bords\" du réseau. Cette approche réduit considérablement la latence, un facteur crucial pour l'expérience utilisateur. En 2025, les principaux fournisseurs de cloud ont étendu leurs réseaux d'edge locations à travers le monde, permettant d'exécuter du code à quelques millisecondes de presque n'importe quel utilisateur.\n\nEn parallèle, les architectures Serverless ont mûri pour offrir une abstraction complète de l'infrastructure sous-jacente. Les développeurs peuvent désormais se concentrer uniquement sur leur code, tandis que la plateforme gère automatiquement l'allocation des ressources, la scalabilité et la haute disponibilité.\n\nLa combinaison de ces deux approches permet de créer des applications web ultra-performantes avec une latence minimale, même pour les utilisateurs internationaux. Voici les principales stratégies d'optimisation :\n\n1. Distribuer le contenu statique et dynamique via un réseau CDN et Edge Functions\n2. Utiliser des Edge Databases pour stocker et accéder aux données à faible latence\n3. Implémenter des API Serverless pour le backend, avec scaling automatique\n4. Adopter des fonctionnalités de streaming pour améliorer le rendu progressif\n\nCes approches permettent également d'optimiser les coûts, car vous ne payez que pour les ressources effectivement consommées, sans serveurs à maintenir constamment actifs.\n\nDes entreprises comme Netflix, Shopify et Airbnb ont déjà adopté ces architectures à grande échelle, reportant des améliorations significatives de la vitesse perçue par les utilisateurs et une réduction des coûts d'infrastructure.",
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
        "Le SEO local a considérablement évolué en 2025, avec l'introduction de Google Business Profile 2.0 et de nouveaux algorithmes ciblant spécifiquement les recherches géolocalisées. Pour les entreprises locales, optimiser sa présence en ligne n'a jamais été aussi crucial - et complexe.\n\nGoogle Business Profile 2.0 a introduit plusieurs fonctionnalités révolutionnaires :\n\n1. **Intégration des produits et services en temps réel** - Permettant aux utilisateurs de voir instantanément la disponibilité des produits ou des créneaux de rendez-vous\n\n2. **Évaluation de l'authenticité des avis** - Utilisant l'IA pour vérifier la légitimité des avis clients et pénaliser les faux avis\n\n3. **Intégration avancée des médias** - Permettant d'intégrer des visites virtuelles à 360° et des présentations interactives\n\n4. **Analyses prédictives des clients potentiels** - Fournissant des insights sur les périodes d'affluence futures et les tendances des recherches locales\n\nPour dominer le SEO local en 2025, voici les stratégies essentielles :\n\n- **Optimisez votre profil Google Business complet** - Remplissez chaque section, ajoutez des médias de haute qualité et maintenez les informations à jour\n\n- **Collectez des avis authentiques régulièrement** - Google favorise les établissements qui reçoivent des avis récents et détaillés\n\n- **Intégrez les données structurées locales** - Utilisez les nouvelles balises de données structurées spécifiques aux entreprises locales\n\n- **Créez du contenu hyper-local** - Développez des pages spécifiques pour chaque zone que vous servez, avec des informations utiles et pertinentes\n\n- **Exploitez le marketing local par proximité** - Utilisez les beacons et la réalité augmentée pour améliorer l'expérience des clients à proximité\n\nLes entreprises qui ont adopté ces stratégies ont vu leurs visites physiques augmenter de 40% en moyenne, montrant l'impact crucial du SEO local sur les résultats commerciaux concrets.",
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
        "Le Web3 a transformé le commerce électronique en 2025, offrant aux TPE et PME des opportunités sans précédent pour innover et se démarquer. Cette évolution va bien au-delà des cryptomonnaies pour inclure des applications concrètes qui redéfinissent l'expérience d'achat en ligne.\n\nLes technologies Web3 les plus impactantes pour le e-commerce sont :\n\n1. **Les NFT (Non-Fungible Tokens)** - Au-delà de l'art digital, les NFT sont désormais utilisés pour créer des programmes de fidélité exclusifs, des garanties digitales infalsifiables, et des produits physiques avec jumeau numérique.\n\n2. **Les Smart Contracts** - Permettant des transactions automatisées sans intermédiaires, ils réduisent les frais et simplifient les processus comme les remboursements, la vérification d'authenticité, et les programmes d'affiliation.\n\n3. **Les DAO (Organisations Autonomes Décentralisées)** - Permettant aux marques de créer des communautés où les clients peuvent voter sur les futurs produits et directions stratégiques.\n\n4. **L'identité décentralisée** - Offrant aux consommateurs un contrôle total sur leurs données personnelles tout en simplifiant les processus d'authentification et de paiement.\n\nVoici comment les petites entreprises peuvent exploiter ces technologies :\n\n- **Créez des expériences d'achat innovantes** - Utilisez les NFT pour offrir des produits physiques avec composante digitale exclusive\n\n- **Réduisez les frais de transaction** - Implémentez des paiements en cryptomonnaies et des smart contracts pour éliminer les intermédiaires\n\n- **Construisez une communauté engagée** - Transformez vos clients en membres actifs via des tokens d'utilité et de gouvernance\n\n- **Garantissez l'authenticité des produits** - Utilisez la blockchain pour créer un historique de propriété transparent et vérifiable\n\nDes TPE comme \"La Petite Épicerie Bio\" ont déjà vu leur chiffre d'affaires augmenter de 35% après avoir implémenté un programme de fidélité basé sur des NFT, montrant que ces technologies sont désormais accessibles et rentables même pour les plus petites structures.",
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

  return articles.find((article) => article.slug === slug && article.published);
}

// Fonction pour trouver des articles connexes
function getRelatedArticles(
  article: BlogArticle,
  limit: number = 3
): BlogArticle[] {
  const articles: BlogArticle[] = [
    {
      id: "1",
      title:
        "IA et SEO en 2025 : Comment Google Gemini révolutionne le référencement",
      excerpt:
        "Analyse de l'impact des nouveaux algorithmes d'IA de Google sur les stratégies SEO et les méthodes pour adapter votre contenu à cette évolution majeure.",
      category: "SEO",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-02-12T10:00:00Z",
      updatedAt: "2025-02-12T10:00:00Z",
      slug: "ia-seo-2025-google-gemini",
      content: "",
    },
    {
      id: "2",
      title:
        "Web Components et Micro-Frontends : L'architecture frontale en 2025",
      excerpt:
        "Comment les Web Components et l'approche Micro-Frontends transforment le développement d'applications web modernes avec une meilleure modularité et maintenabilité.",
      category: "Développement",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-03-03T14:30:00Z",
      updatedAt: "2025-03-03T14:30:00Z",
      slug: "web-components-micro-frontends-2025",
      content: "",
    },
    {
      id: "3",
      title:
        "Les Core Web Vitals 2.0 : Nouveaux métriques de performance pour 2025",
      excerpt:
        "Google a mis à jour ses métriques Core Web Vitals avec de nouveaux indicateurs. Découvrez comment optimiser votre site pour ces critères qui impactent directement votre classement.",
      category: "Performance",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-03-27T16:45:00Z",
      updatedAt: "2025-03-27T16:45:00Z",
      slug: "core-web-vitals-2-nouveaux-metriques-2025",
      content: "",
    },
    {
      id: "4",
      title:
        "Edge Computing et Serverless : Optimiser les applications web en 2025",
      excerpt:
        "Comment combiner Edge Computing et architectures Serverless pour créer des applications web ultra-performantes avec une latence minimale, même à l'échelle mondiale.",
      category: "Architecture",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-04-15T13:10:00Z",
      updatedAt: "2025-04-15T13:10:00Z",
      slug: "edge-computing-serverless-2025",
      content: "",
    },
    {
      id: "5",
      title:
        "SEO local 2025 : Stratégies pour dominer les recherches géolocalisées",
      excerpt:
        "Les dernières techniques pour optimiser votre présence locale, exploiter Google Business Profile 2.0 et attirer plus de clients dans votre zone géographique.",
      category: "SEO Local",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-04-29T09:30:00Z",
      updatedAt: "2025-04-29T09:30:00Z",
      slug: "seo-local-2025-strategies-recherches-geolocalisees",
      content: "",
    },
    {
      id: "6",
      title:
        "Web3 et commerce électronique : Nouvelles possibilités pour les TPE/PME",
      excerpt:
        "Comment les petites entreprises peuvent tirer parti des technologies Web3, comme les NFT et les smart contracts, pour créer de nouvelles opportunités commerciales.",
      category: "Innovation",
      image: "/images/placeholder-blog.jpg",
      published: true,
      createdAt: "2025-05-18T11:25:00Z",
      updatedAt: "2025-05-18T11:25:00Z",
      slug: "web3-ecommerce-tpe-pme-2025",
      content: "",
    },
  ];

  return articles
    .filter(
      (a) =>
        a.category === article.category && a.id !== article.id && a.published
    )
    .slice(0, limit);
}

// Composant principal pour la page d'article
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Récupérer l'article à partir du slug
  const article = getArticleBySlug(params.slug);

  // Si l'article n'existe pas ou n'est pas publié
  if (!article) {
    return notFound();
  }

  // Récupérer les articles connexes
  const relatedArticles = getRelatedArticles(article);

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
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span className="mr-1">KAIRO Digital</span>
              <span className="text-neutral-500">(Expert SEO)</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{article.category}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{estimateReadingTime(article.content)} de lecture</span>
            </div>
          </div>

          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image
              src={article.image || "/images/placeholder-blog.jpg"}
              alt={article.title}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          {article.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Articles connexes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <div
                  key={related.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={related.image || "/images/placeholder-blog.jpg"}
                      alt={related.title}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
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
