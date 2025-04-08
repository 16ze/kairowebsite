"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Freelance", href: "/freelance" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "À propos", href: "/about" },
  { name: "Blog", href: "/blog" },
];

// Icônes pour le menu mobile
const navIcons: Record<string, React.ReactNode> = {
  Accueil: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  Freelance: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  Services: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
      <path d="M2 17l10 5 10-5"></path>
      <path d="M2 12l10 5 10-5"></path>
    </svg>
  ),
  Portfolio: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  ),
  "À propos": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  Blog: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  ),
};

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Référence pour le conteneur du menu mobile
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Vérifier la position initiale

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Ajouter une classe au body quand le menu est ouvert pour empêcher le défilement
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  // Fermer le menu lorsqu'on clique en dehors
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Logo component pour réutilisation
  const Logo = ({
    className = "",
    onClick = undefined,
  }: {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }) => (
    <Link href="/" className={`font-bold ${className}`} onClick={onClick}>
      <span className="text-xl font-black tracking-tighter flex items-center relative">
        <span
          className={`${
            isScrolled || !isHomePage
              ? "bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-700 dark:to-blue-500 bg-clip-text text-transparent"
              : "text-white"
          }`}
        >
          KAIRO
        </span>
        <span
          className={`text-sm font-medium ml-1.5 ${
            isScrolled || !isHomePage
              ? "text-neutral-600 dark:text-neutral-400"
              : "text-white dark:text-white"
          }`}
        >
          Digital
        </span>
        <span className="text-blue-600 dark:text-blue-400">.</span>
      </span>
    </Link>
  );

  return (
    <>
      {/* Header principal toujours visible */}
      <header
        className={`py-4 border-b ${
          isScrolled
            ? "border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-black/95"
            : isHomePage
            ? "border-transparent bg-transparent dark:bg-transparent"
            : "border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-black/95"
        } transition-all duration-300 backdrop-blur-sm fixed top-0 left-0 right-0 z-[40]`}
      >
        <div className="container mx-auto px-4 md:flex md:items-center md:justify-between">
          {/* Mobile Layout - avec z-index corrigés */}
          <div className="flex items-center justify-between md:hidden">
            {/* Hamburger Button - toujours visible et clickable */}
            <button
              className={`p-2 relative z-[9999] ${
                isScrolled || !isHomePage
                  ? "text-neutral-600 dark:text-neutral-300"
                  : "text-white dark:text-white drop-shadow-sm"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>

            {/* Logo - visible même quand le menu est ouvert */}
            <div className="flex-1 flex justify-center z-[41]">
              <Logo
                className={`${
                  isScrolled || !isHomePage
                    ? "text-neutral-900 dark:text-white"
                    : "text-white dark:text-white drop-shadow-sm"
                }`}
              />
            </div>

            {/* Boutons d'action rapide */}
            <div className="flex items-center gap-2 relative z-[41]">
              <Link
                href="/consultation"
                className={`p-2 rounded-full ${
                  isScrolled || !isHomePage
                    ? "bg-green-600 text-white"
                    : "bg-white/20 text-white backdrop-blur-sm"
                }`}
                aria-label="Réserver"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </Link>

              <Link
                href="/contact"
                className={`p-2 rounded-full ${
                  isScrolled || !isHomePage
                    ? "bg-blue-700 text-white"
                    : "bg-white/20 text-white backdrop-blur-sm"
                }`}
                aria-label="Contact"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Desktop Logo & Navigation */}
          <div className="hidden md:flex md:items-center md:justify-start">
            <Logo
              className={`${
                isScrolled || !isHomePage
                  ? "text-neutral-900 dark:text-white"
                  : "text-white dark:text-white drop-shadow-sm"
              }`}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs md:text-sm lg:text-sm font-medium ${
                  isScrolled || !isHomePage
                    ? "text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                    : "text-white hover:text-white/80 dark:text-white dark:hover:text-white/80"
                } transition-colors ${
                  !isScrolled && isHomePage ? "drop-shadow-sm" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              asChild
              variant={isScrolled || !isHomePage ? "default" : "outline"}
              className={
                !isScrolled && isHomePage
                  ? "border-white/80 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white shadow-sm backdrop-blur-sm transition-all duration-300 text-xs md:text-xs lg:text-sm py-1 md:py-1 lg:py-2 px-2 md:px-2 lg:px-4 h-auto"
                  : "bg-blue-800 hover:bg-blue-900 border-none shadow-sm text-xs md:text-xs lg:text-sm py-1 md:py-1 lg:py-2 px-2 md:px-2 lg:px-4 h-auto"
              }
            >
              <Link href="/contact">Contact</Link>
            </Button>

            <Button
              asChild
              variant="default"
              className="bg-green-700 hover:bg-green-800 border-none shadow-sm transition-all duration-300 text-xs md:text-xs lg:text-sm py-1 md:py-1 lg:py-2 px-2 md:px-2 lg:px-4 h-auto"
            >
              <Link href="/consultation">Réserver</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Overlay pour le menu mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menu Mobile - simplifié */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 h-full w-[300px] bg-white dark:bg-neutral-900 z-[9999] shadow-2xl overflow-auto transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-20">
          <div className="mb-6 pb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <Logo
              className="bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-700 dark:to-blue-500 bg-clip-text text-transparent"
              onClick={() => setIsMenuOpen(false)}
            />
            <button
              className="text-neutral-500 dark:text-neutral-400 p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`py-4 px-3 text-base font-medium border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors flex items-center justify-between ${
                  pathname === link.href
                    ? "text-blue-700 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10"
                    : "text-neutral-800 dark:text-neutral-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  {navIcons[link.name]}
                  <span>{link.name}</span>
                </div>

                {pathname === link.href ? (
                  <span className="w-2 h-2 rounded-full bg-blue-700 dark:bg-blue-400"></span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-neutral-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-6 space-y-3">
            <Button
              asChild
              variant="default"
              className="w-full bg-blue-800 hover:bg-blue-900 flex items-center gap-2"
            >
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Prendre Contact
              </Link>
            </Button>

            <Button
              asChild
              variant="default"
              className="w-full bg-green-700 hover:bg-green-800 flex items-center gap-2"
            >
              <Link href="/consultation" onClick={() => setIsMenuOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Réserver un créneau
              </Link>
            </Button>
          </div>

          <div className="mt-auto pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              © {new Date().getFullYear()} KAIRO Digital
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
