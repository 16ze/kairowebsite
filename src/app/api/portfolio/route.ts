import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Types pour les projets du portfolio
interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  summary: string;
  client: string;
  year: string;
  coverImage: string;
  images: string[];
  categories: string[];
  technologies: string[];
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface PortfolioData {
  projects: PortfolioProject[];
  categories: PortfolioCategory[];
}

// Chemin vers le fichier du portfolio
const portfolioFilePath = path.join(
  process.cwd(),
  "config",
  "portfolio-data.json"
);

// Fonction pour lire le fichier du portfolio
const getPortfolioData = (): PortfolioData => {
  if (!fs.existsSync(portfolioFilePath)) {
    // Créer un fichier avec du contenu par défaut s'il n'existe pas
    const defaultPortfolioData: PortfolioData = {
      projects: [
        {
          id: "1",
          title: "Site vitrine pour une pâtisserie locale",
          slug: "patisserie-locale",
          description:
            "Création d'un site vitrine moderne et élégant pour une pâtisserie locale, avec une galerie de produits et un système de réservation.",
          summary: "Un site vitrine moderne pour une pâtisserie artisanale",
          client: "La Petite Douceur",
          year: "2023",
          coverImage: "/images/portfolio/patisserie-cover.jpg",
          images: [
            "/images/portfolio/patisserie-1.jpg",
            "/images/portfolio/patisserie-2.jpg",
          ],
          categories: ["site-vitrine", "e-commerce"],
          technologies: ["Next.js", "Tailwind CSS", "Strapi"],
          featured: true,
          published: true,
          order: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      categories: [
        {
          id: "1",
          name: "Site Vitrine",
          slug: "site-vitrine",
          order: 1,
        },
        {
          id: "2",
          name: "E-commerce",
          slug: "e-commerce",
          order: 2,
        },
        {
          id: "3",
          name: "Application Web",
          slug: "application-web",
          order: 3,
        },
        {
          id: "4",
          name: "Application Mobile",
          slug: "application-mobile",
          order: 4,
        },
      ],
    };
    fs.writeFileSync(
      portfolioFilePath,
      JSON.stringify(defaultPortfolioData, null, 2)
    );
    return defaultPortfolioData;
  }
  const fileContent = fs.readFileSync(portfolioFilePath, "utf8");
  return JSON.parse(fileContent);
};

// Fonction pour écrire dans le fichier du portfolio
const savePortfolioData = (data: PortfolioData) => {
  fs.writeFileSync(portfolioFilePath, JSON.stringify(data, null, 2));
};

// GET: Récupérer tous les projets ou un projet spécifique
export async function GET(req: NextRequest) {
  try {
    const portfolioData = getPortfolioData();
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    const categorySlug = searchParams.get("category");
    const publishedOnly = searchParams.get("publishedOnly") === "true";
    const featuredOnly = searchParams.get("featuredOnly") === "true";

    // Récupérer un projet spécifique par slug
    if (slug) {
      const project = portfolioData.projects.find(
        (project) => project.slug === slug
      );
      if (!project) {
        return NextResponse.json(
          { error: "Projet non trouvé" },
          { status: 404 }
        );
      }
      return NextResponse.json(project);
    }

    // Filtrer les projets
    let filteredProjects = [...portfolioData.projects];

    // Filtrer par catégorie
    if (categorySlug) {
      filteredProjects = filteredProjects.filter((project) =>
        project.categories.includes(categorySlug)
      );
    }

    // Filtrer les projets publiés uniquement si demandé
    if (publishedOnly) {
      filteredProjects = filteredProjects.filter(
        (project) => project.published
      );
    }

    // Filtrer les projets mis en avant uniquement si demandé
    if (featuredOnly) {
      filteredProjects = filteredProjects.filter((project) => project.featured);
    }

    // Trier les projets par ordre
    filteredProjects.sort((a, b) => a.order - b.order);

    return NextResponse.json({
      projects: filteredProjects,
      categories: portfolioData.categories,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des projets" },
      { status: 500 }
    );
  }
}

// POST: Créer un nouveau projet
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      summary,
      client,
      year,
      coverImage,
      images,
      categories,
      technologies,
      featured,
      published,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Le titre et la description sont requis" },
        { status: 400 }
      );
    }

    const portfolioData = getPortfolioData();

    // Générer un slug unique à partir du titre
    const baseSlug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

    // Vérifier si le slug existe déjà
    let slug = baseSlug;
    let counter = 1;

    while (portfolioData.projects.some((project) => project.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Déterminer l'ordre maximal actuel
    const maxOrder = portfolioData.projects.reduce(
      (max, project) => Math.max(max, project.order),
      0
    );

    // Créer le nouveau projet
    const newProject: PortfolioProject = {
      id: Date.now().toString(),
      title,
      slug,
      description,
      summary: summary || title,
      client: client || "Client confidentiel",
      year: year || new Date().getFullYear().toString(),
      coverImage: coverImage || "/images/portfolio/default.jpg",
      images: images || [],
      categories: categories || [],
      technologies: technologies || [],
      featured: featured || false,
      published: published || false,
      order: maxOrder + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    portfolioData.projects.push(newProject);
    savePortfolioData(portfolioData);

    return NextResponse.json({
      success: true,
      message: "Projet créé avec succès",
      project: newProject,
    });
  } catch (error) {
    console.error("Erreur lors de la création du projet:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création du projet" },
      { status: 500 }
    );
  }
}

// PUT: Mettre à jour un projet existant
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      description,
      summary,
      client,
      year,
      coverImage,
      images,
      categories,
      technologies,
      featured,
      published,
      order,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "L'ID du projet est requis" },
        { status: 400 }
      );
    }

    const portfolioData = getPortfolioData();
    const projectIndex = portfolioData.projects.findIndex(
      (project) => project.id === id
    );

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
    }

    const existingProject = portfolioData.projects[projectIndex];

    // Mettre à jour le projet
    portfolioData.projects[projectIndex] = {
      ...existingProject,
      title: title || existingProject.title,
      description: description || existingProject.description,
      summary: summary || existingProject.summary,
      client: client || existingProject.client,
      year: year || existingProject.year,
      coverImage: coverImage || existingProject.coverImage,
      images: images || existingProject.images,
      categories: categories || existingProject.categories,
      technologies: technologies || existingProject.technologies,
      featured: featured !== undefined ? featured : existingProject.featured,
      published:
        published !== undefined ? published : existingProject.published,
      order: order !== undefined ? order : existingProject.order,
      updatedAt: new Date().toISOString(),
    };

    savePortfolioData(portfolioData);

    return NextResponse.json({
      success: true,
      message: "Projet mis à jour avec succès",
      project: portfolioData.projects[projectIndex],
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour du projet" },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer un projet
export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "L'ID du projet est requis" },
        { status: 400 }
      );
    }

    const portfolioData = getPortfolioData();
    const projectIndex = portfolioData.projects.findIndex(
      (project) => project.id === id
    );

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
    }

    portfolioData.projects.splice(projectIndex, 1);
    savePortfolioData(portfolioData);

    return NextResponse.json({
      success: true,
      message: "Projet supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du projet:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la suppression du projet" },
      { status: 500 }
    );
  }
}

// PATCH: Gérer les catégories (ajouter, modifier, supprimer)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, category } = body;

    if (!action || !category) {
      return NextResponse.json(
        { error: "L'action et la catégorie sont requises" },
        { status: 400 }
      );
    }

    const portfolioData = getPortfolioData();

    // Actions pour les catégories
    switch (action) {
      case "add": {
        // Vérifier si le slug existe déjà
        if (portfolioData.categories.some((c) => c.slug === category.slug)) {
          return NextResponse.json(
            { error: "Une catégorie avec ce slug existe déjà" },
            { status: 400 }
          );
        }

        // Déterminer l'ordre maximal actuel
        const maxOrder = portfolioData.categories.reduce(
          (max, cat) => Math.max(max, cat.order),
          0
        );

        // Ajouter la nouvelle catégorie
        const newCategory: PortfolioCategory = {
          id: Date.now().toString(),
          name: category.name,
          slug: category.slug,
          order: maxOrder + 1,
        };

        portfolioData.categories.push(newCategory);
        savePortfolioData(portfolioData);

        return NextResponse.json({
          success: true,
          message: "Catégorie ajoutée avec succès",
          categories: portfolioData.categories,
        });
      }
      case "update": {
        if (!category.id) {
          return NextResponse.json(
            { error: "L'ID de la catégorie est requis pour la mise à jour" },
            { status: 400 }
          );
        }

        const categoryIndex = portfolioData.categories.findIndex(
          (c) => c.id === category.id
        );

        if (categoryIndex === -1) {
          return NextResponse.json(
            { error: "Catégorie non trouvée" },
            { status: 404 }
          );
        }

        // Mettre à jour la catégorie
        portfolioData.categories[categoryIndex] = {
          ...portfolioData.categories[categoryIndex],
          name: category.name || portfolioData.categories[categoryIndex].name,
          slug: category.slug || portfolioData.categories[categoryIndex].slug,
          order:
            category.order !== undefined
              ? category.order
              : portfolioData.categories[categoryIndex].order,
        };

        savePortfolioData(portfolioData);

        return NextResponse.json({
          success: true,
          message: "Catégorie mise à jour avec succès",
          categories: portfolioData.categories,
        });
      }
      case "delete": {
        if (!category.id) {
          return NextResponse.json(
            { error: "L'ID de la catégorie est requis pour la suppression" },
            { status: 400 }
          );
        }

        const categoryIndex = portfolioData.categories.findIndex(
          (c) => c.id === category.id
        );

        if (categoryIndex === -1) {
          return NextResponse.json(
            { error: "Catégorie non trouvée" },
            { status: 404 }
          );
        }

        // Vérifier si des projets utilisent cette catégorie
        const categorySlug = portfolioData.categories[categoryIndex].slug;
        const projectsUsingCategory = portfolioData.projects.filter((project) =>
          project.categories.includes(categorySlug)
        );

        if (projectsUsingCategory.length > 0) {
          return NextResponse.json(
            {
              error:
                "Cette catégorie est utilisée par des projets et ne peut pas être supprimée",
              projectsCount: projectsUsingCategory.length,
            },
            { status: 400 }
          );
        }

        // Supprimer la catégorie
        portfolioData.categories.splice(categoryIndex, 1);
        savePortfolioData(portfolioData);

        return NextResponse.json({
          success: true,
          message: "Catégorie supprimée avec succès",
          categories: portfolioData.categories,
        });
      }
      default:
        return NextResponse.json(
          { error: "Action non reconnue" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Erreur lors de la gestion des catégories:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la gestion des catégories" },
      { status: 500 }
    );
  }
}
