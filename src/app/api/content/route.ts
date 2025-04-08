import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Chemin vers le fichier de contenu
const contentFilePath = path.join(process.cwd(), "config", "site-content.json");

// Fonction pour lire le fichier de contenu
const getContentData = () => {
  if (!fs.existsSync(contentFilePath)) {
    // Créer un fichier avec du contenu par défaut s'il n'existe pas
    const defaultContent = {
      home: {
        hero: {
          title: "KAIRO Digital - Agence Web",
          subtitle:
            "Votre partenaire digital pour le développement web et la stratégie digitale",
          cta: "Réserver une consultation",
        },
        sections: [
          {
            id: "services",
            title: "Nos Services",
            description:
              "Des solutions numériques sur mesure pour votre entreprise.",
            items: [
              {
                title: "Développement Web",
                description: "Sites vitrines, applications web, e-commerce",
                icon: "code",
              },
              {
                title: "Consulting Digital",
                description: "Stratégie, analyse et optimisation",
                icon: "trending-up",
              },
              {
                title: "UX/UI Design",
                description: "Interfaces modernes et ergonomiques",
                icon: "layout",
              },
            ],
          },
        ],
      },
      about: {
        hero: {
          title: "À propos de KAIRO Digital",
          subtitle: "Notre histoire, notre mission et nos valeurs",
        },
        sections: [
          {
            id: "mission",
            title: "Notre Mission",
            content:
              "Accompagner les entreprises dans leur transformation digitale avec des solutions sur mesure.",
          },
          {
            id: "team",
            title: "Notre Équipe",
            content: "Une équipe passionnée de développeurs et designers.",
          },
        ],
      },
      services: {
        hero: {
          title: "Nos Services",
          subtitle: "Des solutions adaptées à vos besoins",
        },
        servicesList: [
          {
            id: "web-dev",
            title: "Développement Web",
            description: "Sites vitrines, applications web, e-commerce",
            features: [
              "Développement sur mesure",
              "Responsive design",
              "Performance optimisée",
            ],
          },
          {
            id: "consulting",
            title: "Consulting Digital",
            description: "Stratégie, analyse et optimisation",
            features: [
              "Audit de votre présence en ligne",
              "Recommandations stratégiques",
              "Accompagnement personnalisé",
            ],
          },
          {
            id: "design",
            title: "UX/UI Design",
            description: "Interfaces modernes et ergonomiques",
            features: [
              "Design centré utilisateur",
              "Maquettes et prototypes",
              "Charte graphique",
            ],
          },
        ],
      },
    };
    fs.writeFileSync(contentFilePath, JSON.stringify(defaultContent, null, 2));
    return defaultContent;
  }
  const fileContent = fs.readFileSync(contentFilePath, "utf8");
  return JSON.parse(fileContent);
};

// Fonction pour écrire dans le fichier de contenu
const saveContentData = (data: any) => {
  fs.writeFileSync(contentFilePath, JSON.stringify(data, null, 2));
};

// GET: Récupérer tout le contenu ou une page spécifique
export async function GET(req: NextRequest) {
  try {
    const contentData = getContentData();
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");

    if (page && contentData[page as keyof typeof contentData]) {
      return NextResponse.json(contentData[page as keyof typeof contentData]);
    }

    return NextResponse.json(contentData);
  } catch (error: any) {
    console.error("Erreur lors de la récupération du contenu:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération du contenu" },
      { status: 500 }
    );
  }
}

// PUT: Mettre à jour le contenu d'une page spécifique
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { page, content } = body;

    if (!page || !content) {
      return NextResponse.json(
        { error: "Les paramètres 'page' et 'content' sont requis" },
        { status: 400 }
      );
    }

    const contentData = getContentData();
    contentData[page] = content;
    saveContentData(contentData);

    return NextResponse.json({
      success: true,
      message: "Contenu mis à jour avec succès",
    });
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du contenu:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour du contenu" },
      { status: 500 }
    );
  }
}
