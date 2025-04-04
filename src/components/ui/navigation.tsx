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

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

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

  return (
    <header
      className={`py-4 border-b ${
        isScrolled
          ? "border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-black/95"
          : isHomePage
          ? "border-transparent bg-transparent dark:bg-transparent"
          : "border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-black/95"
      } transition-all duration-300 backdrop-blur-sm fixed top-0 left-0 right-0 z-50`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="font-bold tracking-tight transition-colors"
            aria-label="KAIRO Digital - Retour à l'accueil"
          >
            <span className="flex items-center group">
              <span className="text-xl md:text-2xl font-black tracking-tighter flex items-center relative">
                <span
                  className={`${
                    isScrolled || !isHomePage
                      ? "bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-700 dark:to-blue-500 bg-clip-text text-transparent"
                      : "text-white dark:text-white drop-shadow-md"
                  }`}
                >
                  KAIRO
                </span>
                <span className="relative">
                  <span className="bg-gradient-to-r from-gold-500 to-amber-400 dark:from-gold-400 dark:to-amber-300 h-1.5 w-16 absolute -bottom-1 left-0 transform -skew-x-12 group-hover:w-20 transition-all duration-300 rounded-full"></span>
                </span>
              </span>
              <span
                className={`text-sm md:text-base font-medium ml-1.5 ${
                  isScrolled || !isHomePage
                    ? "text-neutral-600 dark:text-neutral-400"
                    : "text-white dark:text-white"
                } group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors`}
              >
                Digital
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium ${
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

        {/* Contact Button */}
        <div className="hidden md:block">
          <Button
            asChild
            variant={isScrolled || !isHomePage ? "default" : "outline"}
            className={
              !isScrolled && isHomePage
                ? "border-white/80 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white shadow-sm backdrop-blur-sm transition-all duration-300"
                : "bg-blue-800 hover:bg-blue-900 border-none shadow-sm"
            }
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${
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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 p-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              variant="default"
              className="w-full bg-blue-800 hover:bg-blue-900"
            >
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
