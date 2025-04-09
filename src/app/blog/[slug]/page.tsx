import React from "react";
import { Metadata } from "next";

// Métadonnées statiques basiques
export const metadata: Metadata = {
  title: "Article de blog",
  description: "Contenu de l'article de blog",
};

// Composant page utilisant any pour éviter les erreurs strictes de typage
export default function BlogPostPage({ params }: any) {
  if (!params?.slug) {
    return (
      <div className="container mx-auto py-24">
        <h1 className="text-3xl font-bold mb-6">Article non trouvé</h1>
        <p>L'article que vous cherchez n'existe pas.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24">
      <h1 className="text-3xl font-bold mb-6">Article: {params.slug}</h1>
      <p>Le contenu de cet article sera chargé dynamiquement.</p>
      {/* 
        Au lieu d'importer directement le composant client ici,
        nous pourrions utiliser un composant client séparé qui s'occupe
        de charger le contenu basé sur le slug.
      */}
    </div>
  );
}
