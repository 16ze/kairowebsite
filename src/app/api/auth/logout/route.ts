import { NextResponse } from "next/server";

// API de déconnexion admin
export async function POST() {
  try {
    // Créer une réponse de succès
    const response = NextResponse.json({
      success: true,
      message: "Déconnexion réussie",
    });

    // Supprimer le cookie de session en le réglant à une date passée
    response.cookies.set({
      name: "admin_session",
      value: "",
      httpOnly: true,
      path: "/",
      expires: new Date(0), // Date dans le passé pour supprimer le cookie
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur lors de la déconnexion" },
      { status: 500 }
    );
  }
}
