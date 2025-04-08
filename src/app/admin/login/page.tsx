"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, AlertCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Composant principal qui utilise useSearchParams
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Réinitialiser les erreurs
    setError(null);

    // Validation basique côté client
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      setLoading(true);

      // Appel à l'API d'authentification
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la connexion");
      }

      // Redirection vers le dashboard ou la page demandée
      router.push(redirectTo);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la connexion";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Utilisez automatiquement ces valeurs pour remplir les champs
  const handleDemoLogin = () => {
    setEmail("contact.kairodigital@gmail.com");
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-8 border border-neutral-200 dark:border-neutral-700">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-700 dark:to-blue-500 bg-clip-text text-transparent">
                  KAIRO
                </span>
                <span className="text-sm font-medium ml-1.5 text-neutral-600 dark:text-neutral-400">
                  Digital
                </span>
                <span className="text-blue-600 dark:text-blue-400">.</span>
              </h1>
            </Link>
            <h2 className="mt-2 text-xl font-semibold text-neutral-800 dark:text-neutral-100">
              Espace Administration
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Connectez-vous pour accéder au tableau de bord
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 flex items-center text-sm">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md text-blue-600 dark:text-blue-400 flex items-start text-sm">
            <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Identifiants de démonstration</p>
              <p>Email: contact.kairodigital@gmail.com</p>
              <p>Mot de passe: admin123</p>
              <Button
                variant="link"
                className="text-blue-600 dark:text-blue-400 p-0 h-auto mt-1"
                onClick={handleDemoLogin}
              >
                Remplir automatiquement
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@kairo-digital.fr"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Retour au site
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
          KAIRO Digital &copy; {new Date().getFullYear()} - Tous droits réservés
        </p>
      </div>
    </div>
  );
}

// Composant wrapper avec Suspense
export default function AdminLoginPage() {
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
      <LoginContent />
    </Suspense>
  );
}
