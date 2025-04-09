"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, Trash2, Edit } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

interface AdminUser {
  id: string;
  name: string;
  email: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  // Vérifier l'authentification
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify");
        const data = await response.json();

        if (!response.ok || !data.authenticated) {
          router.push("/admin/login");
          return;
        }

        setAdminUser(data.user);
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
  }, [router]);

  // Charger les utilisateurs réels depuis l'API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error(
          `Erreur lors de la récupération des utilisateurs: ${response.status}`
        );
      }

      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
      setError(
        "Impossible de charger les utilisateurs. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminUser) {
      fetchUsers();
    }
  }, [adminUser]);

  // Filtrer les utilisateurs en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

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

  // Gestion de la suppression d'un utilisateur
  const handleDeleteUser = async (userId: string) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        setIsDeleting(true);
        const response = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erreur lors de la suppression");
        }

        // Recharger la liste des utilisateurs
        fetchUsers();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        setError(
          "Impossible de supprimer l'utilisateur. " +
            (error instanceof Error ? error.message : "")
        );
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Gérer la création d'un utilisateur
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);

      if (!newUser.name || !newUser.email || !newUser.password) {
        setError("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création");
      }

      // Réinitialiser le formulaire et recharger les utilisateurs
      setNewUser({ name: "", email: "", password: "" });
      setIsCreating(false);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      setError(
        "Impossible de créer l'utilisateur. " +
          (error instanceof Error ? error.message : "")
      );
    } finally {
      setIsCreating(false);
    }
  };

  // Formatage de la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      {/* Sidebar */}
      <AdminSidebar
        activePage="users"
        onLogout={handleLogout}
        user={adminUser}
      />

      {/* Contenu principal */}
      <main className="flex-1 px-3 sm:px-4 md:px-6 pt-14 pb-6 lg:pt-6 lg:ml-64 transition-all duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto">
          <header className="mb-5 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
              Gestion des utilisateurs
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Administrez les comptes utilisateurs de la plateforme
            </p>
          </header>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-4 md:mb-5 p-3 md:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Formulaire de création d'utilisateur */}
          <div className="mb-5 md:mb-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm p-4">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
              Ajouter un utilisateur
            </h2>
            <form
              onSubmit={handleCreateUser}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
            >
              <div className="sm:col-span-1">
                <Input
                  placeholder="Nom"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="sm:col-span-1">
                <Input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="sm:col-span-1">
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="sm:col-span-1">
                <Button type="submit" className="w-full" disabled={isCreating}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {isCreating ? "Création..." : "Ajouter"}
                </Button>
              </div>
            </form>
          </div>

          {/* Actions et recherche */}
          <div className="mb-4 md:mb-5">
            <div className="relative w-full sm:w-64 md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-500" />
              </div>
              <Input
                type="text"
                placeholder="Rechercher un utilisateur..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Liste des utilisateurs - avec scroll horizontal sur mobile */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                  <tr>
                    <th className="px-3 md:px-4 py-3 text-left font-medium">
                      Utilisateur
                    </th>
                    <th className="px-3 md:px-4 py-3 text-left font-medium hidden md:table-cell">
                      Date d&apos;inscription
                    </th>
                    <th className="px-3 md:px-4 py-3 text-left font-medium hidden md:table-cell">
                      Dernière mise à jour
                    </th>
                    <th className="px-3 md:px-4 py-3 text-left font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30"
                      >
                        <td className="px-3 md:px-4 py-3 md:py-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                              {user.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                                {user.name}
                              </div>
                              <div className="text-neutral-500 dark:text-neutral-400 text-xs truncate">
                                {user.email}
                              </div>
                              <div className="md:hidden text-xs text-neutral-500 mt-1">
                                Créé: {formatDate(user.createdAt)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 md:px-4 py-3 md:py-4 text-neutral-600 dark:text-neutral-400 hidden md:table-cell">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-3 md:px-4 py-3 md:py-4 text-neutral-600 dark:text-neutral-400 hidden md:table-cell">
                          {formatDate(user.updatedAt)}
                        </td>
                        <td className="px-3 md:px-4 py-3 md:py-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              title="Modifier"
                              onClick={() =>
                                router.push(`/admin/users/edit/${user.id}`)
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>

                            {/* Ne pas permettre de supprimer l'admin principal */}
                            {user.email !== adminUser?.email && (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={isDeleting}
                                className="h-8 w-8 p-0 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                title="Supprimer"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-neutral-500 dark:text-neutral-400"
                      >
                        Aucun utilisateur ne correspond à votre recherche.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
