"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CalendarRange,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminUser {
  id: string;
  name: string;
  email: string;
}

// Composant pour le contenu du dashboard
function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérifier l'authentification
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifier l'état d'authentification
        const response = await fetch("/api/auth/verify");
        const data = await response.json();

        if (!response.ok || !data.authenticated) {
          // Non authentifié, rediriger vers la page de connexion
          const returnUrl = searchParams?.get("returnUrl") || "";
          router.push(
            `/admin/login${returnUrl ? `?returnUrl=${returnUrl}` : ""}`
          );
          return;
        }

        // Définir les informations utilisateur
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

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Rediriger vers la page de connexion après déconnexion
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
                  className="flex items-center p-2 rounded-md text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
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
                  href="/admin/content"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-3"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Contenu
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/blog"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-3"
                  >
                    <path d="M18 2h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                    <path d="M8 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                    <path d="M14 8h1"></path>
                    <path d="M14 12h1"></path>
                    <path d="M14 16h1"></path>
                    <path d="M3 8h1"></path>
                    <path d="M3 12h1"></path>
                    <path d="M3 16h1"></path>
                  </svg>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/portfolio"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-3"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
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
                {user?.name?.charAt(0) || "A"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-medium truncate text-sm">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  {user?.email}
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
            <h1 className="text-2xl font-bold mb-2">Tableau de bord</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Bienvenue, {user?.name || "Admin"}
            </p>
          </header>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <h3 className="text-lg font-semibold mb-1">
                Réservations totales
              </h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                12
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                +3 cette semaine
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <h3 className="text-lg font-semibold mb-1">En attente</h3>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                5
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                À confirmer
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <h3 className="text-lg font-semibold mb-1">Confirmées</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                7
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Pour les 7 prochains jours
              </p>
            </div>
          </div>

          {/* Activité récente */}
          <section className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <header className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="text-lg font-semibold">Activité récente</h2>
            </header>

            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></span>
                  <div>
                    <p className="text-neutral-900 dark:text-neutral-100">
                      Nouvelle réservation:{" "}
                      <span className="font-medium">Consultation</span>
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Il y a 2 heures
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3"></span>
                  <div>
                    <p className="text-neutral-900 dark:text-neutral-100">
                      Réservation confirmée:{" "}
                      <span className="font-medium">Présentation</span>
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Hier, 15:30
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  <div>
                    <p className="text-neutral-900 dark:text-neutral-100">
                      Réservation annulée:{" "}
                      <span className="font-medium">Suivi</span>
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Il y a 2 jours
                    </p>
                  </div>
                </li>
              </ul>

              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/admin/reservations">
                  Voir toutes les réservations
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Composant principal qui encapsule la logique d'authentification avec Suspense
export default function AdminDashboardPage() {
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
      <DashboardContent />
    </Suspense>
  );
}
