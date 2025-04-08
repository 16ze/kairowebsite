import { NextRequest, NextResponse } from "next/server";

// API pour vérifier si l'admin est authentifié
export async function GET(request: NextRequest) {
  try {
    // Récupérer le cookie de session admin
    const adminSessionCookie = request.cookies.get("admin_session");

    // Vérifier si le cookie existe
    if (!adminSessionCookie || !adminSessionCookie.value) {
      return NextResponse.json(
        {
          authenticated: false,
          message: "Non authentifié",
        },
        { status: 401 }
      );
    }

    // Dans une application réelle, vous devriez:
    // 1. Vérifier la validité du token/session en base de données ou via JWT
    // 2. Récupérer les informations de l'utilisateur

    // Pour cette démonstration, on suppose que le cookie est valide
    // et on retourne des informations statiques sur l'admin
    return NextResponse.json({
      authenticated: true,
      user: {
        id: "admin-1",
        name: "Admin KAIRO",
        email: process.env.ADMIN_EMAIL || "admin@kairo-digital.fr",
      },
    });
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de l'authentification:",
      error
    );
    return NextResponse.json(
      {
        authenticated: false,
        message: "Erreur serveur lors de la vérification",
      },
      { status: 500 }
    );
  }
}
