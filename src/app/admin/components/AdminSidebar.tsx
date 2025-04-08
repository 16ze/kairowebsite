"use client";

import Link from "next/link";
import {
  BarChart3,
  CalendarRange,
  Users,
  Settings,
  LogOut,
  Layers,
  FileText,
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
  return (
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
                className={`flex items-center p-2 rounded-md ${
                  activePage === "dashboard"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                }`}
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
              >
                <Settings className="w-5 h-5 mr-3" />
                Paramètres
              </Link>
            </li>
          </ul>
        </nav>

        {/* Profile and logout */}
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
  );
}
