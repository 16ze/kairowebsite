"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BarChart3,
  CalendarRange,
  Users,
  Settings,
  LogOut,
  Layers,
  FileText,
  Menu,
  X,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AdminSidebarProps {
  activePage: string;
  onLogout: () => void;
  user: AdminUser | null;
}

export default function AdminSidebar({
  activePage,
  onLogout,
  user,
}: AdminSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si la taille de l'écran est mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setIsMobileMenuOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Fermer le menu mobile quand on clique sur un lien
  const handleNavLinkClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Ajouter une classe au body quand le menu est ouvert pour empêcher le défilement
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Bouton hamburger pour mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`fixed top-3 left-3 p-2.5 rounded-md bg-white/95 dark:bg-neutral-900/95 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-[9999] lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-0 pointer-events-none"
            : "opacity-100 flex"
        } items-center justify-center`}
        aria-label="Menu"
      >
        <Menu size={20} className="text-neutral-800 dark:text-white" />
      </button>

      {/* Overlay pour fermer le menu sur mobile */}
      {isMobileMenuOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9990] lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Effet de flou sur le contenu principal quand le menu est ouvert */}
      {isMobileMenuOpen && isMobile && (
        <div
          className="fixed inset-0 z-[9980] backdrop-blur-md opacity-100 lg:hidden transition-opacity duration-300 ease-in-out"
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-[9995] w-[85%] max-w-[320px] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transform transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "w-64 fixed inset-y-0 left-0 z-40"
        } bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700`}
      >
        <div className="flex flex-col h-full">
          {/* Logo et bouton fermer pour mobile */}
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center bg-white dark:bg-neutral-900">
            <Link href="/admin" className="inline-block">
              <h1 className="text-xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-700 dark:to-blue-500 bg-clip-text text-transparent">
                  KAIRO
                </span>
                <span className="text-sm font-medium ml-1.5 text-neutral-600 dark:text-neutral-400">
                  Admin
                </span>
                <span className="text-blue-600 dark:text-blue-400">.</span>
              </h1>
            </Link>
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              >
                <X size={22} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1 overflow-y-auto bg-white dark:bg-neutral-900">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin/dashboard"
                  className={`flex items-center p-2 rounded-md ${
                    activePage === "dashboard"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                  }`}
                  onClick={handleNavLinkClick}
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/reservations"
                  className={`flex items-center p-2 rounded-md ${
                    activePage === "reservations"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                  }`}
                  onClick={handleNavLinkClick}
                >
                  <CalendarRange className="w-5 h-5 mr-3" />
                  Réservations
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/portfolio"
                  className={`flex items-center p-2 rounded-md ${
                    activePage === "portfolio"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                  }`}
                  onClick={handleNavLinkClick}
                >
                  <Layers className="w-5 h-5 mr-3" />
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/blog"
                  className={`flex items-center p-2 rounded-md ${
                    activePage === "blog"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                  }`}
                  onClick={handleNavLinkClick}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className={`flex items-center p-2 rounded-md ${
                    activePage === "users"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                  }`}
                  onClick={handleNavLinkClick}
                >
                  <Users className="w-5 h-5 mr-3" />
                  Utilisateurs
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className={`flex items-center p-2 rounded-md ${
                    activePage === "settings"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                  }`}
                  onClick={handleNavLinkClick}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Paramètres
                </Link>
              </li>
            </ul>
          </nav>

          {/* Profile and logout */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
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
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-start px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 rounded-md text-sm font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
