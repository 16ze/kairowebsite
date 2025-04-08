import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Annuler une réservation avec un token
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, token } = body;

    if (!id || !token) {
      return NextResponse.json(
        { error: "ID de réservation et token sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si la réservation existe
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Réservation non trouvée" },
        { status: 404 }
      );
    }

    // Vérifier que le token correspond
    if (token !== reservation.cancellationToken) {
      return NextResponse.json(
        { error: "Token d'annulation invalide" },
        { status: 403 }
      );
    }

    // Vérifier que la réservation n'est pas déjà annulée
    if (reservation.status === "CANCELLED") {
      return NextResponse.json(
        { error: "Cette réservation a déjà été annulée" },
        { status: 400 }
      );
    }

    // Vérifier que la réservation n'est pas déjà terminée
    if (reservation.status === "COMPLETED") {
      return NextResponse.json(
        {
          error:
            "Cette réservation est déjà terminée et ne peut pas être annulée",
        },
        { status: 400 }
      );
    }

    // Annuler la réservation
    const cancelledReservation = await prisma.reservation.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    // Envoyer un email de confirmation d'annulation (à implémenter)

    return NextResponse.json({
      success: true,
      message: "Réservation annulée avec succès",
      reservation: cancelledReservation,
    });
  } catch (error) {
    console.error("Erreur lors de l'annulation de la réservation:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'annulation de la réservation" },
      { status: 500 }
    );
  }
}
