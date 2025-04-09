"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";
import Link from "next/link";
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      {/* Sidebar responsive */}
      <AdminSidebar
        activePage="dashboard"
        onLogout={handleLogout}
        user={user}
      />

      {/* Contenu principal */}
      <main className="flex-1 px-3 sm:px-4 md:px-6 pt-14 pb-6 lg:pt-6 lg:ml-64 transition-all duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto">
          <header className="mb-5 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
              Tableau de bord
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Bienvenue, {user?.name || "Admin"}
            </p>
          </header>

          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-5 md:mb-6">
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <h3 className="text-base md:text-lg font-semibold mb-1">
                Réservations totales
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                12
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                +3 cette semaine
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <h3 className="text-base md:text-lg font-semibold mb-1">
                En attente
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">
                5
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                À confirmer
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm sm:col-span-2 lg:col-span-1">
              <h3 className="text-base md:text-lg font-semibold mb-1">
                Confirmées
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
                7
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Pour les 7 prochains jours
              </p>
            </div>
          </div>

          {/* Activité récente */}
          <section className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <header className="px-4 py-3 md:py-4 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="text-base md:text-lg font-semibold">
                Activité récente
              </h2>
            </header>

            <div className="p-4">
              <ul className="space-y-3 md:space-y-4">
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
