import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Récupérer les disponibilités
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Les paramètres startDate et endDate sont requis" },
        { status: 400 }
      );
    }

    // Convertir les dates
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Vérifier si les dates sont valides
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return NextResponse.json({ error: "Dates invalides" }, { status: 400 });
    }

    // Récupérer les disponibilités récurrentes
    const recurringAvailabilities = await prisma.availability.findMany({
      where: {
        isRecurring: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Récupérer les disponibilités spécifiques dans la plage de dates
    const specificAvailabilities = await prisma.availability.findMany({
      where: {
        isRecurring: false,
        date: {
          gte: startDateObj,
          lte: endDateObj,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Récupérer les exclusions
    const exclusions = await prisma.exclusion.findMany({
      where: {
        OR: [
          {
            startDate: { lte: endDateObj },
            endDate: { gte: startDateObj },
          },
        ],
      },
    });

    // Récupérer les réservations existantes
    const reservations = await prisma.reservation.findMany({
      where: {
        startTime: { gte: startDateObj },
        endTime: { lte: endDateObj },
        status: { notIn: ["CANCELLED"] },
      },
      select: {
        startTime: true,
        endTime: true,
        status: true,
      },
    });

    // Récupérer les paramètres de réservation
    const settings = await prisma.reservationSettings.findFirst();

    return NextResponse.json({
      recurringAvailabilities,
      specificAvailabilities,
      exclusions,
      reservations,
      settings,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des disponibilités:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des disponibilités" },
      { status: 500 }
    );
  }
}

// Créer une nouvelle disponibilité
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, dayOfWeek, startTime, endTime, isRecurring, date } = body;

    // Vérifier les données requises
    if (!userId || !startTime || !endTime) {
      return NextResponse.json(
        { error: "userId, startTime et endTime sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Créer la disponibilité
    let availability;
    if (isRecurring) {
      // Disponibilité récurrente
      if (dayOfWeek === undefined || dayOfWeek < 0 || dayOfWeek > 6) {
        return NextResponse.json(
          {
            error:
              "dayOfWeek doit être entre 0 et 6 pour les disponibilités récurrentes",
          },
          { status: 400 }
        );
      }

      availability = await prisma.availability.create({
        data: {
          userId,
          dayOfWeek,
          startTime,
          endTime,
          isRecurring: true,
        },
      });
    } else {
      // Disponibilité spécifique à une date
      if (!date) {
        return NextResponse.json(
          { error: "date est requise pour les disponibilités non récurrentes" },
          { status: 400 }
        );
      }

      availability = await prisma.availability.create({
        data: {
          userId,
          startTime,
          endTime,
          isRecurring: false,
          date: new Date(date),
        },
      });
    }

    return NextResponse.json(availability, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de la disponibilité:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création de la disponibilité" },
      { status: 500 }
    );
  }
}

// Supprimer une disponibilité
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de disponibilité requis" },
        { status: 400 }
      );
    }

    // Vérifier si la disponibilité existe
    const availability = await prisma.availability.findUnique({
      where: { id },
    });

    if (!availability) {
      return NextResponse.json(
        { error: "Disponibilité non trouvée" },
        { status: 404 }
      );
    }

    // Supprimer la disponibilité
    await prisma.availability.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de la disponibilité:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la suppression de la disponibilité" },
      { status: 500 }
    );
  }
}
