"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, Plus, Edit, Trash2, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminSidebar from "../components/AdminSidebar";
import {
  useBlogStore,
  BlogArticle,
  generateSlug,
} from "@/lib/store/blog-store";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminBlogPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<BlogArticle | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    image: "",
    published: true,
  });
  const [formError, setFormError] = useState("");

  // Utilisez le store Zustand pour synchroniser les données
  const { articles, categories, addArticle, updateArticle, deleteArticle } =
    useBlogStore();

  const itemsPerPage = 5;

  // Vérification authentification
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/verify");
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        console.error("Erreur d'authentification:", err);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? "" : value);
    setCurrentPage(1);
  };

  const filteredArticles = articles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((article) =>
      selectedCategory ? article.category === selectedCategory : true
    );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePublished = () => {
    setFormData({
      ...formData,
      published: !formData.published,
    });
  };

  const openNewArticleForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: categories[0] || "",
      image: "/images/placeholder-blog.jpg",
      published: true,
    });
    setIsEditing(false);
    setCurrentArticle(null);
    setIsFormOpen(true);
    setFormError("");
  };

  const openEditForm = (article: BlogArticle) => {
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      category: article.category,
      image: article.image,
      published: article.published,
    });
    setIsEditing(true);
    setCurrentArticle(article);
    setIsFormOpen(true);
    setFormError("");
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (!formData.title || !formData.content || !formData.category) {
      setFormError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      if (isEditing && currentArticle) {
        // Mettre à jour l'article existant
        updateArticle(currentArticle.id, formData);
      } else {
        // Créer un nouvel article
        addArticle(formData);
      }

      closeForm();
    } catch (error) {
      setFormError("Une erreur est survenue lors de la sauvegarde");
      console.error("Erreur lors de la sauvegarde:", error);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        deleteArticle(id);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  // Affichage loading
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-400" />
          <p className="mt-4 text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      <AdminSidebar activePage="blog" onLogout={handleLogout} user={user} />

      <main className="flex-1 px-3 sm:px-4 md:px-6 pt-14 pb-6 lg:pt-6 lg:ml-64 transition-all duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto">
          <div className="mb-5 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h1 className="text-xl md:text-2xl font-bold">Gestion du Blog</h1>
            <Button onClick={openNewArticleForm}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvel article
            </Button>
          </div>

          <div className="mb-5 md:mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 w-full"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentArticles.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 md:p-8 text-center">
              <Info className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              <h2 className="mb-1 text-lg font-medium">Aucun article trouvé</h2>
              <p className="text-sm text-gray-500">
                {filteredArticles.length === 0 && articles.length > 0
                  ? "Aucun article ne correspond à votre recherche"
                  : "Commencez par créer votre premier article de blog"}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 overflow-hidden rounded-lg border bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead className="bg-neutral-50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                      <tr>
                        <th className="px-3 md:px-4 py-3 text-left text-sm font-medium">
                          Titre
                        </th>
                        <th className="px-3 md:px-4 py-3 text-left text-sm font-medium hidden md:table-cell">
                          Catégorie
                        </th>
                        <th className="px-3 md:px-4 py-3 text-left text-sm font-medium hidden md:table-cell">
                          Date
                        </th>
                        <th className="px-3 md:px-4 py-3 text-left text-sm font-medium">
                          Statut
                        </th>
                        <th className="px-3 md:px-4 py-3 text-left text-sm font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                      {currentArticles.map((article) => (
                        <tr
                          key={article.id}
                          className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30"
                        >
                          <td className="px-3 md:px-4 py-3 md:py-4 text-sm">
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">
                              {article.title}
                            </span>
                            <div className="md:hidden text-xs text-neutral-500 mt-1">
                              {article.category}
                            </div>
                          </td>
                          <td className="px-3 md:px-4 py-3 md:py-4 text-sm hidden md:table-cell">
                            {article.category}
                          </td>
                          <td className="px-3 md:px-4 py-3 md:py-4 text-sm hidden md:table-cell">
                            {new Date(article.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-3 md:px-4 py-3 md:py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                article.published
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                              }`}
                            >
                              {article.published ? "Publié" : "Brouillon"}
                            </span>
                          </td>
                          <td className="px-3 md:px-4 py-3 md:py-4 text-sm">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditForm(article)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteArticle(article.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </Button>
                  <span className="flex items-center px-2 text-sm">
                    Page {currentPage} sur {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          )}

          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {isEditing ? "Modifier l&apos;article" : "Nouvel article"}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={closeForm}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit}>
                  {formError && (
                    <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
                      {formError}
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">
                      Titre <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                    {formData.title && (
                      <p className="mt-1 text-xs text-gray-500">
                        Slug: {generateSlug(formData.title)}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">
                      Contenu <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      className="min-h-[200px]"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">
                      Extrait
                    </label>
                    <Textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      className="min-h-[80px]"
                      placeholder="Laissez vide pour utiliser le début du contenu"
                    />
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Catégorie <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleSelectChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        URL de l&apos;image
                      </label>
                      <Input
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="/images/blog/image.jpg"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-1 flex items-center space-x-2 text-sm font-medium">
                      <button
                        type="button"
                        className={`flex h-5 w-10 items-center rounded-full ${
                          formData.published ? "bg-primary" : "bg-gray-200"
                        } p-1 transition-colors duration-200 focus:outline-none`}
                        onClick={handleTogglePublished}
                      >
                        <span
                          className={`h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            formData.published
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span>Publier immédiatement</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={closeForm}>
                      Annuler
                    </Button>
                    <Button type="submit">
                      {isEditing ? "Mettre à jour" : "Créer"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
