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
  Check,
  X,
  Search,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminUser {
  id: string;
  name: string;
  email: string;
}

type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

interface Reservation {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  startTime: string;
  endTime: string;
  reservationType: "DISCOVERY" | "CONSULTATION" | "PRESENTATION" | "FOLLOWUP";
  status: ReservationStatus;
  projectDescription: string;
  communicationMethod: "VISIO" | "PHONE";
  createdAt: string;
}

// Fonctions utilitaires pour l'affichage
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getReservationTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    DISCOVERY: "Découverte",
    CONSULTATION: "Consultation",
    PRESENTATION: "Présentation",
    FOLLOWUP: "Suivi",
  };
  return types[type] || type;
};

const getStatusBadgeClasses = (status: ReservationStatus) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  const statusClasses: Record<ReservationStatus, string> = {
    PENDING: `${baseClasses} bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300`,
    CONFIRMED: `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`,
    CANCELLED: `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300`,
  };
  return statusClasses[status];
};

const getStatusLabel = (status: ReservationStatus) => {
  const labels: Record<ReservationStatus, string> = {
    PENDING: "En attente",
    CONFIRMED: "Confirmée",
    CANCELLED: "Annulée",
  };
  return labels[status];
};

// Composant pour le contenu des réservations
function ReservationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "ALL">(
    "ALL"
  );

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

  // Charger les réservations (simulées pour le moment)
  useEffect(() => {
    // Dans une implémentation réelle, cela viendrait d'une API
    const mockReservations: Reservation[] = [
      {
        id: "1",
        clientName: "Jean Dupont",
        clientEmail: "jean.dupont@example.com",
        clientPhone: "0612345678",
        startTime: "2023-05-15T14:00:00",
        endTime: "2023-05-15T15:00:00",
        reservationType: "CONSULTATION",
        status: "CONFIRMED",
        projectDescription:
          "Besoin d'aide pour la refonte de mon site e-commerce",
        communicationMethod: "VISIO",
        createdAt: "2023-05-10T09:23:45",
      },
      {
        id: "2",
        clientName: "Marie Martin",
        clientEmail: "marie.martin@example.com",
        clientPhone: "0687654321",
        startTime: "2023-05-18T10:30:00",
        endTime: "2023-05-18T11:30:00",
        reservationType: "DISCOVERY",
        status: "PENDING",
        projectDescription:
          "Création d'une application mobile pour mon entreprise",
        communicationMethod: "PHONE",
        createdAt: "2023-05-12T14:15:00",
      },
      {
        id: "3",
        clientName: "Pierre Dubois",
        clientEmail: "pierre.dubois@example.com",
        startTime: "2023-05-14T09:00:00",
        endTime: "2023-05-14T10:00:00",
        reservationType: "FOLLOWUP",
        status: "CANCELLED",
        projectDescription: "Suivi du projet de développement web",
        communicationMethod: "VISIO",
        createdAt: "2023-05-05T11:30:00",
      },
      {
        id: "4",
        clientName: "Sophie Lefèvre",
        clientEmail: "sophie.lefevre@example.com",
        clientPhone: "0698765432",
        startTime: "2023-05-20T16:00:00",
        endTime: "2023-05-20T17:00:00",
        reservationType: "PRESENTATION",
        status: "CONFIRMED",
        projectDescription: "Présentation des maquettes pour le nouveau site",
        communicationMethod: "VISIO",
        createdAt: "2023-05-13T08:45:00",
      },
      {
        id: "5",
        clientName: "Thomas Bernard",
        clientEmail: "thomas.bernard@example.com",
        startTime: "2023-05-22T11:00:00",
        endTime: "2023-05-22T12:00:00",
        reservationType: "CONSULTATION",
        status: "PENDING",
        projectDescription: "Consultation pour stratégie marketing digital",
        communicationMethod: "PHONE",
        createdAt: "2023-05-14T17:20:00",
      },
    ];

    setReservations(mockReservations);
    setFilteredReservations(mockReservations);
  }, []);

  // Filtrer les réservations en fonction des filtres
  useEffect(() => {
    let filtered = [...reservations];

    // Filtre par statut
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    // Filtre par terme de recherche
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.clientName.toLowerCase().includes(term) ||
          r.clientEmail.toLowerCase().includes(term) ||
          r.projectDescription.toLowerCase().includes(term)
      );
    }

    setFilteredReservations(filtered);
  }, [reservations, statusFilter, searchTerm]);

  // Simuler la confirmation d'une réservation
  const handleConfirmReservation = (id: string) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: "CONFIRMED" }
          : reservation
      )
    );
  };

  // Simuler l'annulation d'une réservation
  const handleCancelReservation = (id: string) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: "CANCELLED" }
          : reservation
      )
    );
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
                  className="flex items-center p-2 rounded-md text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                >
                  <CalendarRange className="w-5 h-5 mr-3" />
                  Réservations
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
            <h1 className="text-2xl font-bold mb-2">
              Gestion des réservations
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Gérez les demandes de consultation et de rendez-vous
            </p>
          </header>

          {/* Filtres et recherche */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-500" />
              </div>
              <Input
                type="text"
                placeholder="Rechercher par nom, email ou description..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={statusFilter === "ALL" ? "default" : "outline"}
                onClick={() => setStatusFilter("ALL")}
                className="whitespace-nowrap"
              >
                Toutes
              </Button>
              <Button
                variant={statusFilter === "PENDING" ? "default" : "outline"}
                onClick={() => setStatusFilter("PENDING")}
                className="whitespace-nowrap text-amber-600 dark:text-amber-400"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                En attente
              </Button>
              <Button
                variant={statusFilter === "CONFIRMED" ? "default" : "outline"}
                onClick={() => setStatusFilter("CONFIRMED")}
                className="whitespace-nowrap text-green-600 dark:text-green-400"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Confirmées
              </Button>
              <Button
                variant={statusFilter === "CANCELLED" ? "default" : "outline"}
                onClick={() => setStatusFilter("CANCELLED")}
                className="whitespace-nowrap text-red-600 dark:text-red-400"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                Annulées
              </Button>
            </div>
          </div>

          {/* Liste des réservations */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Client</th>
                    <th className="px-6 py-3 text-left font-medium">Type</th>
                    <th className="px-6 py-3 text-left font-medium">Date</th>
                    <th className="px-6 py-3 text-left font-medium">Horaire</th>
                    <th className="px-6 py-3 text-left font-medium">Statut</th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                      <tr
                        key={reservation.id}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-neutral-900 dark:text-neutral-100">
                            {reservation.clientName}
                          </div>
                          <div className="text-neutral-500 dark:text-neutral-400 text-xs">
                            {reservation.clientEmail}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getReservationTypeLabel(reservation.reservationType)}
                        </td>
                        <td className="px-6 py-4">
                          {formatDate(reservation.startTime)}
                        </td>
                        <td className="px-6 py-4">
                          {formatTime(reservation.startTime)} -{" "}
                          {formatTime(reservation.endTime)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={getStatusBadgeClasses(
                              reservation.status
                            )}
                          >
                            {getStatusLabel(reservation.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              title="Voir détails"
                              onClick={() =>
                                console.log("Voir détails", reservation.id)
                              }
                            >
                              <Eye className="h-4 w-4" />
                            </Button>

                            {reservation.status === "PENDING" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                                  title="Confirmer"
                                  onClick={() =>
                                    handleConfirmReservation(reservation.id)
                                  }
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  title="Annuler"
                                  onClick={() =>
                                    handleCancelReservation(reservation.id)
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-10 text-center text-neutral-500 dark:text-neutral-400"
                      >
                        Aucune réservation ne correspond à vos critères.
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

// Composant principal qui utilise Suspense
export default function AdminReservationsPage() {
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
      <ReservationsContent />
    </Suspense>
  );
}
