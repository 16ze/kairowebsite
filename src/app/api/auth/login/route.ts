import { NextRequest, NextResponse } from "next/server";

// API de connexion admin simple
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation de base
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Dans une application réelle, vous devriez:
    // 1. Récupérer l'utilisateur depuis la base de données
    // 2. Comparer le mot de passe hashé avec bcrypt
    // 3. Générer un JWT ou un autre token d'authentification

    // Pour cette démonstration, on vérifie simplement l'email admin
    const adminEmail = process.env.ADMIN_EMAIL || "admin@kairo-digital.fr";

    // Mot de passe en dur pour la démo (à ne jamais faire en production!)
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { success: false, message: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Créer une session sécurisée (dans un cas réel, on utiliserait JWT ou autre)
    const sessionId = crypto.randomUUID();

    // Créer la réponse
    const response = NextResponse.json({
      success: true,
      user: {
        id: "admin-1",
        name: "Admin KAIRO",
        email: adminEmail,
      },
    });

    // Ajouter le cookie à la réponse
    response.cookies.set({
      name: "admin_session",
      value: sessionId,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 heures
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la connexion admin:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur lors de la connexion" },
      { status: 500 }
    );
  }
}
