import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Types pour les articles
interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categories: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  published: boolean;
}

interface BlogData {
  posts: BlogPost[];
  categories: BlogCategory[];
}

// Chemin vers le fichier du blog
const blogFilePath = path.join(process.cwd(), "config", "blog-data.json");

// Fonction pour lire le fichier de blog
const getBlogData = (): BlogData => {
  if (!fs.existsSync(blogFilePath)) {
    // Créer un fichier avec du contenu par défaut s'il n'existe pas
    const defaultBlogData: BlogData = {
      posts: [
        {
          id: "1",
          title: "Bienvenue sur notre blog",
          slug: "bienvenue-sur-notre-blog",
          excerpt: "Premier article du blog de KAIRO Digital.",
          content:
            "# Bienvenue sur notre blog\n\nCeci est le premier article du blog de KAIRO Digital.\n\nNous partagerons régulièrement des conseils, des astuces et des nouvelles sur le développement web et la stratégie digitale.",
          coverImage: "/images/blog/welcome.jpg",
          categories: ["general"],
          author: "Admin KAIRO",
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          featured: true,
          published: true,
        },
      ],
      categories: [
        {
          id: "1",
          name: "Général",
          slug: "general",
        },
        {
          id: "2",
          name: "Développement Web",
          slug: "dev-web",
        },
        {
          id: "3",
          name: "Design",
          slug: "design",
        },
        {
          id: "4",
          name: "Marketing Digital",
          slug: "marketing",
        },
      ],
    };
    fs.writeFileSync(blogFilePath, JSON.stringify(defaultBlogData, null, 2));
    return defaultBlogData;
  }
  const fileContent = fs.readFileSync(blogFilePath, "utf8");
  return JSON.parse(fileContent);
};

// Fonction pour écrire dans le fichier de blog
const saveBlogData = (data: BlogData) => {
  fs.writeFileSync(blogFilePath, JSON.stringify(data, null, 2));
};

// GET: Récupérer tous les articles ou un article spécifique
export async function GET(req: NextRequest) {
  try {
    const blogData = getBlogData();
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    const categorySlug = searchParams.get("category");
    const publishedOnly = searchParams.get("publishedOnly") === "true";

    // Récupérer un article spécifique par slug
    if (slug) {
      const post = blogData.posts.find((post) => post.slug === slug);
      if (!post) {
        return NextResponse.json(
          { error: "Article non trouvé" },
          { status: 404 }
        );
      }
      return NextResponse.json(post);
    }

    // Filtrer les articles par catégorie
    if (categorySlug) {
      const filteredPosts = blogData.posts.filter((post) =>
        post.categories.includes(categorySlug)
      );

      // Filtrer les articles publiés uniquement si demandé
      const result = publishedOnly
        ? filteredPosts.filter((post) => post.published)
        : filteredPosts;

      return NextResponse.json({
        posts: result,
        categories: blogData.categories,
      });
    }

    // Filtrer les articles publiés uniquement si demandé
    if (publishedOnly) {
      return NextResponse.json({
        posts: blogData.posts.filter((post) => post.published),
        categories: blogData.categories,
      });
    }

    // Retourner tous les articles et catégories
    return NextResponse.json(blogData);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des articles" },
      { status: 500 }
    );
  }
}

// POST: Créer un nouvel article
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      content,
      categories,
      excerpt,
      coverImage,
      published,
      featured,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Le titre et le contenu sont requis" },
        { status: 400 }
      );
    }

    const blogData = getBlogData();

    // Générer un slug unique à partir du titre
    const baseSlug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

    // Vérifier si le slug existe déjà
    let slug = baseSlug;
    let counter = 1;

    while (blogData.posts.some((post) => post.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Créer le nouvel article
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      slug,
      excerpt: excerpt || title,
      content,
      coverImage: coverImage || "/images/blog/default.jpg",
      categories: categories || ["general"],
      author: "Admin KAIRO",
      publishedAt: published ? new Date().toISOString() : "",
      updatedAt: new Date().toISOString(),
      featured: featured || false,
      published: published || false,
    };

    blogData.posts.unshift(newPost);
    saveBlogData(blogData);

    return NextResponse.json({
      success: true,
      message: "Article créé avec succès",
      post: newPost,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'article:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création de l'article" },
      { status: 500 }
    );
  }
}

// PUT: Mettre à jour un article existant
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      content,
      categories,
      excerpt,
      coverImage,
      published,
      featured,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "L'ID de l'article est requis" },
        { status: 400 }
      );
    }

    const blogData = getBlogData();
    const postIndex = blogData.posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    const existingPost = blogData.posts[postIndex];
    const wasPublished = existingPost.published;

    // Mettre à jour l'article
    blogData.posts[postIndex] = {
      ...existingPost,
      title: title || existingPost.title,
      content: content || existingPost.content,
      excerpt: excerpt || existingPost.excerpt,
      coverImage: coverImage || existingPost.coverImage,
      categories: categories || existingPost.categories,
      updatedAt: new Date().toISOString(),
      featured: featured !== undefined ? featured : existingPost.featured,
      published: published !== undefined ? published : existingPost.published,
      publishedAt:
        published && !wasPublished
          ? new Date().toISOString()
          : existingPost.publishedAt,
    };

    saveBlogData(blogData);

    return NextResponse.json({
      success: true,
      message: "Article mis à jour avec succès",
      post: blogData.posts[postIndex],
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'article:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour de l'article" },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer un article
export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "L'ID de l'article est requis" },
        { status: 400 }
      );
    }

    const blogData = getBlogData();
    const postIndex = blogData.posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    blogData.posts.splice(postIndex, 1);
    saveBlogData(blogData);

    return NextResponse.json({
      success: true,
      message: "Article supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la suppression de l'article" },
      { status: 500 }
    );
  }
}
