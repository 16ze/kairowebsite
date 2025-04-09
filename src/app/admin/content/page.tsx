"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/ui/admin-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LogOut, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  name: string;
  email: string;
}

interface PageContent {
  [key: string]: any;
}

interface SiteContent {
  home: PageContent;
  about: PageContent;
  services: PageContent;
  [key: string]: PageContent;
}

interface Content {
  id: string;
  title: string;
  content: string;
  type: string;
  updatedAt: string;
}

function ContentEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [selectedPage, setSelectedPage] = useState("home");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [currentPageContent, setCurrentPageContent] =
    useState<PageContent | null>(null);

  // Vérifier l'authentification
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify");
        const data = await response.json();

        if (!response.ok || !data.authenticated) {
          // Récupérer l'URL de retour si présente
          const returnUrl = searchParams?.get("returnUrl") || "";
          router.push(
            `/admin/login${returnUrl ? `?returnUrl=${returnUrl}` : ""}`
          );
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error
        );
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, searchParams]);

  // Charger le contenu du site
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/content");

        if (!response.ok) {
          throw new Error(
            `Erreur lors de la récupération du contenu: ${response.status}`
          );
        }

        const data = await response.json();
        setContent(data);
        setCurrentPageContent(data[selectedPage]);
      } catch (error) {
        console.error("Erreur lors du chargement du contenu:", error);
        setMessage({
          type: "error",
          text: "Impossible de charger le contenu. Veuillez réessayer.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [selectedPage]);

  // Mettre à jour le contenu actuel lorsque la page sélectionnée change
  useEffect(() => {
    if (content) {
      setCurrentPageContent(content[selectedPage]);
    }
  }, [selectedPage, content]);

  const handlePageChange = (page: string) => {
    setSelectedPage(page);
  };

  const handleValueChange = (path: string, value: any) => {
    if (!currentPageContent) return;

    // Créer une copie profonde du contenu actuel
    const updatedContent = JSON.parse(JSON.stringify(currentPageContent));

    // Diviser le chemin et mettre à jour la valeur
    const keys = path.split(".");
    let current = updatedContent;

    // Parcourir le chemin jusqu'à l'avant-dernier élément
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    // Mettre à jour la valeur au dernier élément
    current[keys[keys.length - 1]] = value;
    setCurrentPageContent(updatedContent);
  };

  const handleSave = async (content: Content) => {
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde");
      }

      toast.success("Contenu sauvegardé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/admin/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Afficher un écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Chargement...
          </p>
        </div>
      </div>
    );
  }

  // Générer les champs de formulaire en fonction du contenu
  const renderFormFields = (data: any, path = "") => {
    if (!data) return null;

    return Object.entries(data).map(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;

      // Si la valeur est un objet (mais pas un tableau), rendez des champs imbriqués
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return (
          <div key={currentPath} className="mb-6">
            <h3 className="text-lg font-medium mb-4 border-b pb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </h3>
            <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
              {renderFormFields(value, currentPath)}
            </div>
          </div>
        );
      }

      // Rendu des champs de formulaire en fonction du type de valeur
      if (typeof value === "string") {
        // Pour les textes longs (plus de 100 caractères), utilisez un textarea
        if (value.length > 100) {
          return (
            <div key={currentPath} className="mb-4">
              <Label htmlFor={currentPath} className="block mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Label>
              <Textarea
                id={currentPath}
                value={value}
                onChange={(e) => handleValueChange(currentPath, e.target.value)}
                rows={4}
                className="w-full"
              />
            </div>
          );
        }
        return (
          <div key={currentPath} className="mb-4">
            <Label htmlFor={currentPath} className="block mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Label>
            <Input
              id={currentPath}
              type="text"
              value={value}
              onChange={(e) => handleValueChange(currentPath, e.target.value)}
              className="w-full"
            />
          </div>
        );
      }

      // Gérer les tableaux de façon simple (affichage uniquement pour l'instant)
      if (Array.isArray(value)) {
        return (
          <div key={currentPath} className="mb-4">
            <Label className="block mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)} (Tableau)
            </Label>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <pre className="text-sm">{JSON.stringify(value, null, 2)}</pre>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Pour modifier ce tableau, contactez l'administrateur système.
            </p>
          </div>
        );
      }

      // Pour les booléens
      if (typeof value === "boolean") {
        return (
          <div key={currentPath} className="mb-4 flex items-center">
            <input
              id={currentPath}
              type="checkbox"
              checked={value}
              onChange={(e) => handleValueChange(currentPath, e.target.checked)}
              className="mr-2"
            />
            <Label htmlFor={currentPath}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Label>
          </div>
        );
      }

      // Pour les nombres
      if (typeof value === "number") {
        return (
          <div key={currentPath} className="mb-4">
            <Label htmlFor={currentPath} className="block mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Label>
            <Input
              id={currentPath}
              type="number"
              value={value}
              onChange={(e) =>
                handleValueChange(currentPath, parseFloat(e.target.value))
              }
              className="w-full"
            />
          </div>
        );
      }

      return null;
    });
  };

  const pageOptions = content
    ? Object.keys(content).map((key) => ({
        value: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
      }))
    : [];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      {/* Sidebar */}
      <AdminSidebar user={user} onLogout={handleLogout} />

      {/* Contenu principal */}
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Gestion du contenu</h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Modifiez le contenu de votre site web
              </p>
            </div>

            <Button
              onClick={() => handleSave(currentPageContent as Content)}
              disabled={saving}
              className="flex items-center"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Enregistrer les modifications
            </Button>
          </header>

          {/* Message de confirmation ou d'erreur */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"
                  : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Sélection de page */}
          <div className="mb-6">
            <Label htmlFor="page-select" className="block mb-2">
              Sélectionnez la page à modifier
            </Label>
            <div className="flex">
              <select
                id="page-select"
                value={selectedPage}
                onChange={(e) => handlePageChange(e.target.value)}
                className="p-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 w-full"
              >
                {pageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Formulaire de modification */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
            {currentPageContent ? (
              renderFormFields(currentPageContent)
            ) : (
              <p className="text-center text-neutral-500 dark:text-neutral-400">
                Sélectionnez une page pour modifier son contenu
              </p>
            )}

            {/* Bouton d'enregistrement en bas de page */}
            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-end">
              <Button
                onClick={() => handleSave(currentPageContent as Content)}
                disabled={saving}
                className="flex items-center"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Enregistrer les modifications
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Composant principal qui utilise Suspense
export default function ContentEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Chargement...
            </p>
          </div>
        </div>
      }
    >
      <ContentEditorContent />
    </Suspense>
  );
}
