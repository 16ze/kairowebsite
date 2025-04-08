"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CalendarRange,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Edit,
  Trash2,
  PlusCircle,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 fixed inset-y-0 z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <Link href="/" className="inline-block">
              <h1 className="text-xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-700 dark:to-blue-500 bg-clip-text text-transparent">
                  KAIRO
                </span>
                <span className="text-sm font-medium ml-1.5 text-neutral-600 dark:text-neutral-400">
                  Digital
                </span>
                <span className="text-blue-600 dark:text-blue-400">.</span>
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/reservations"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <CalendarRange className="w-5 h-5 mr-3" />
                  Réservations
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center p-2 rounded-md text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                >
                  <Users className="w-5 h-5 mr-3" />
                  Utilisateurs
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Paramètres
                </Link>
              </li>
            </ul>
          </nav>

          {/* Profil et déconnexion */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                {adminUser?.name?.charAt(0) || "A"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-medium truncate text-sm">
                  {adminUser?.name || "Admin"}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  {adminUser?.email}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 border-red-200 dark:border-red-900/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              Gestion des utilisateurs
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Administrez les comptes utilisateurs de la plateforme
            </p>
          </header>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Formulaire de création d'utilisateur */}
          <div className="mb-8 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Ajouter un utilisateur
            </h2>
            <form
              onSubmit={handleCreateUser}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="md:col-span-1">
                <Input
                  placeholder="Nom"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Button type="submit" className="w-full" disabled={isCreating}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {isCreating ? "Création..." : "Ajouter"}
                </Button>
              </div>
            </form>
          </div>

          {/* Actions et recherche */}
          <div className="mb-6">
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-500" />
              </div>
              <Input
                type="text"
                placeholder="Rechercher un utilisateur..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Liste des utilisateurs */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">
                      Utilisateur
                    </th>
                    <th className="px-6 py-3 text-left font-medium">
                      Date d'inscription
                    </th>
                    <th className="px-6 py-3 text-left font-medium">
                      Dernière mise à jour
                    </th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-neutral-900 dark:text-neutral-100">
                                {user.name}
                              </div>
                              <div className="text-neutral-500 dark:text-neutral-400 text-xs">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                          {formatDate(user.updatedAt)}
                        </td>
                        <td className="px-6 py-4">
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
                        className="px-6 py-10 text-center text-neutral-500 dark:text-neutral-400"
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
