"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash,
  Plus,
  Search,
  Upload,
  Loader2,
  Sparkles,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  client?: string;
  year?: number;
  technologies?: string[];
  results?: string[];
  link?: string;
  createdAt: string;
  slug?: string;
  published?: boolean;
}

function PortfolioManagementContent() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(
    null
  );
  const [newProject, setNewProject] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    client: "",
    year: new Date().getFullYear(),
    technologies: [] as string[],
    results: [] as string[],
    link: "",
    published: true,
  });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const projectsPerPage = 6;
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Vérifier l'authentification de l'utilisateur
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/verify");
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          router.push("/admin/login?returnUrl=/admin/portfolio");
        }
      } catch (error) {
        console.error("Erreur d'authentification:", error);
        router.push("/admin/login?returnUrl=/admin/portfolio");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  // Récupérer les données du portfolio depuis l'API
  useEffect(() => {
    if (user) {
      fetchPortfolioData();
    }
  }, [user]);

  // Fonction pour récupérer les données du portfolio depuis l'API
  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();

        // Adapter le format des projets si nécessaire
        const adaptedProjects = data.projects.map((project: any) => ({
          id: project.id,
          title: project.title,
          description: project.description || project.summary,
          category: project.categories?.[0] || "",
          imageUrl: project.coverImage || project.imageUrl,
          client: project.client || "",
          year: project.year
            ? parseInt(project.year)
            : new Date().getFullYear(),
          technologies: project.technologies || [],
          results: project.results || [],
          link: project.link || "",
          createdAt: project.createdAt,
          slug: project.slug,
          published: project.published !== undefined ? project.published : true,
        }));

        setProjects(adaptedProjects);

        // Extraire toutes les catégories uniques des projets
        const uniqueCategories = Array.from(
          new Set(
            data.projects.map((project: any) =>
              project.categories && project.categories.length > 0
                ? project.categories[0]
                : ""
            )
          )
        ).filter(
          (category): category is string =>
            typeof category === "string" && category.trim() !== ""
        );

        setCategories(uniqueCategories);
      } else {
        console.error(
          "Erreur lors de la récupération des données du portfolio"
        );
        setError("Erreur lors de la récupération des données du portfolio");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du portfolio:",
        error
      );
      setError("Erreur lors de la récupération des données du portfolio");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      id: project.id,
      title: project.title,
      description: project.description,
      category: project.category,
      imageUrl: project.imageUrl,
      client: project.client || "",
      year: project.year || new Date().getFullYear(),
      technologies: project.technologies || [],
      results: project.results || [],
      link: project.link || "",
      published: project.published !== undefined ? project.published : true,
    });
    setNewProject(false);
    setError("");
    setSuccessMessage("");
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        setLoading(true);
        const res = await fetch(`/api/portfolio?id=${projectId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          // Actualiser les données après la suppression
          await fetchPortfolioData();
          setSuccessMessage("Projet supprimé avec succès");
          setTimeout(() => setSuccessMessage(""), 3000);
        } else {
          const errData = await res.json();
          setError(`Erreur lors de la suppression: ${errData.error}`);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du projet:", error);
        setError("Erreur lors de la suppression du projet");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setFormData({
      id: "",
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      client: "",
      year: new Date().getFullYear(),
      technologies: [],
      results: [],
      link: "",
      published: true,
    });
    setNewProject(true);
    setError("");
    setSuccessMessage("");
  };

  const handleCancel = () => {
    setEditingProject(null);
    setNewProject(false);
    setError("");
    setSuccessMessage("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleTechnologyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const techs = value.split(",").map((tech) => tech.trim());
    setFormData((prev) => ({
      ...prev,
      technologies: techs.filter((tech) => tech !== ""),
    }));
  };

  const handleResultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const results = value.split(",").map((result) => result.trim());
    setFormData((prev) => ({
      ...prev,
      results: results.filter((result) => result !== ""),
    }));
  };

  const handleSave = async () => {
    // Validation des données
    if (!formData.title || !formData.description || !formData.category) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const apiUrl = "/api/portfolio";
      let method = "POST";

      // Adapter le format des données pour l'API
      const projectData = {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        summary: formData.description.substring(0, 150) + "...",
        client: formData.client,
        year: formData.year.toString(),
        coverImage: formData.imageUrl,
        categories: [formData.category],
        technologies: formData.technologies,
        results: formData.results,
        link: formData.link,
        published: formData.published,
      };

      // Si c'est une mise à jour, utiliser PUT
      if (!newProject && editingProject) {
        method = "PUT";
      }

      const res = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (res.ok) {
        // Actualiser les données après la modification
        await fetchPortfolioData();
        setEditingProject(null);
        setNewProject(false);
        setSuccessMessage(
          newProject
            ? "Projet créé avec succès"
            : "Projet mis à jour avec succès"
        );
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const errData = await res.json();
        setError(`Erreur: ${errData.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du projet:", error);
      setError("Erreur lors de l'enregistrement");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  // Filtrer les projets en fonction de la recherche et de la catégorie
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Paginer les projets filtrés
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Fonction pour gérer l'upload d'image
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'upload");
      }

      const data = await response.json();

      // Mettre à jour l'URL de l'image dans le formulaire
      setFormData((prev) => ({
        ...prev,
        imageUrl: data.url,
      }));
    } catch (error) {
      console.error("Erreur d'upload:", error);
      setUploadError(
        error instanceof Error ? error.message : "Erreur lors de l'upload"
      );
    } finally {
      setUploadLoading(false);
      // Réinitialiser l'input file pour permettre de sélectionner à nouveau le même fichier
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Déclencher le clic sur l'input file caché
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Fonction pour générer une description avec l'IA
  const generateAIDescription = async () => {
    if (!formData.title) {
      setAiError("Le titre du projet est requis pour générer une description");
      return;
    }

    setAiGenerating(true);
    setAiError("");

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          client: formData.client,
          technologies: formData.technologies,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la génération");
      }

      const data = await response.json();

      // Mettre à jour la description dans le formulaire
      setFormData((prev) => ({
        ...prev,
        description: data.description,
      }));
    } catch (error) {
      console.error("Erreur IA:", error);
      setAiError(
        error instanceof Error ? error.message : "Erreur lors de la génération"
      );
    } finally {
      setAiGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar
        activePage="portfolio"
        onLogout={handleLogout}
        user={user}
      />
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Gestion du Portfolio</h1>
            {!editingProject && !newProject && (
              <button
                onClick={handleAddProject}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                <Plus size={18} />
                Ajouter un projet
              </button>
            )}
          </div>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          {editingProject || newProject ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-bold mb-4">
                {newProject ? "Nouveau projet" : "Modifier le projet"}
              </h2>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">
                    Titre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    Catégorie <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value="Site vitrine">Site vitrine</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Application web">Application web</option>
                    <option value="Application mobile">
                      Application mobile
                    </option>
                    <option value="Intégration">Intégration</option>
                    <option value="SEO">SEO</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium">Client</label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Année</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Image du projet <span className="text-red-500">*</span>
                  </label>

                  <div className="flex flex-col space-y-4">
                    {/* Image preview */}
                    {formData.imageUrl && (
                      <div className="relative w-full h-48 border rounded overflow-hidden">
                        <Image
                          src={formData.imageUrl}
                          alt="Aperçu de l'image"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}

                    {/* Upload controls */}
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-4">
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          disabled={uploadLoading}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                          {uploadLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Upload size={18} />
                          )}
                          {uploadLoading
                            ? "Téléchargement..."
                            : "Télécharger une image"}
                        </button>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={handleFileUpload}
                          className="hidden"
                        />

                        <input
                          type="text"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                          placeholder="ou entrez l'URL directement"
                          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>

                      {uploadError && (
                        <p className="text-red-500 text-sm">{uploadError}</p>
                      )}

                      <p className="text-xs text-gray-500">
                        Formats acceptés : JPG, PNG, WEBP, GIF. Taille maximale
                        : 5MB
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Lien du projet
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 min-h-[100px]"
                        required
                      ></textarea>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={generateAIDescription}
                        disabled={aiGenerating || !formData.title}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {aiGenerating ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Sparkles size={16} />
                        )}
                        {aiGenerating
                          ? "Génération en cours..."
                          : "Générer une description avec l'IA"}
                      </button>
                      <span className="text-xs text-gray-500">
                        Nécessite un titre et des technologies pour de meilleurs
                        résultats
                      </span>
                    </div>

                    {aiError && (
                      <p className="text-red-500 text-sm">{aiError}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    Technologies (séparées par des virgules)
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies.join(", ")}
                    onChange={handleTechnologyChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    Résultats (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    name="results"
                    value={formData.results.join(", ")}
                    onChange={handleResultChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 font-medium">
                    Publier immédiatement
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Enregistrement...
                    </span>
                  ) : (
                    "Enregistrer"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Filtres de recherche */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Rechercher un projet..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
                <div className="md:w-48">
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="all">Toutes les catégories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Liste des projets */}
              {paginatedProjects.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Aucun projet trouvé.{" "}
                    {searchQuery && "Essayez une autre recherche."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                    >
                      <div className="aspect-video relative">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        {!project.published && (
                          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                            Non publié
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold truncate">
                            {project.title}
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {project.year}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex mb-4 flex-wrap gap-1">
                          {project.technologies &&
                            project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                        </div>
                        <div className="flex justify-between">
                          <button
                            onClick={() => handleEdit(project)}
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                          >
                            <Edit size={16} />
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="flex items-center gap-1 text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 border rounded-l disabled:opacity-50"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="px-4 py-2 border-t border-b">
                    Page {currentPage} sur {totalPages}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded-r disabled:opacity-50"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPortfolioPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <PortfolioManagementContent />
    </Suspense>
  );
}
