import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware pour protéger les routes admin
export function middleware(request: NextRequest) {
  // Vérifier si la route est une route admin
  const isAdminRoute =
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login");

  // Ne pas appliquer le middleware pour les routes non-admin ou l'API d'auth
  if (
    !isAdminRoute ||
    request.nextUrl.pathname.startsWith("/api/auth") ||
    request.nextUrl.pathname === "/admin/login"
  ) {
    return NextResponse.next();
  }

  // Récupérer le cookie de session admin
  const adminSessionCookie = request.cookies.get("admin_session");

  // Si aucun cookie de session n'est trouvé, rediriger vers la page de connexion
  if (!adminSessionCookie || !adminSessionCookie.value) {
    const loginUrl = new URL("/admin/login", request.url);
    // Ajouter un paramètre pour le retour après connexion
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si le cookie existe, laisser passer la requête
  return NextResponse.next();
}

// Configuration pour spécifier sur quelles routes le middleware s'applique
export const config = {
  matcher: [
    // Routes admin protégées
    "/admin/:path*",
    // Exclure la page de login admin et les routes API
    "/((?!admin/login|api|_next/static|_next/image|favicon.ico).*)",
  ],
};
