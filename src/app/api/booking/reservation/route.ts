import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import {
  sendConfirmationEmail,
  sendAdminNotificationEmail,
} from "@/lib/email-service";

// Récupérer les réservations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const status = searchParams.get("status");

    // Construire les filtres
    const filters: any = {};

    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
        filters.startTime = { gte: startDateObj };
        filters.endTime = { lte: endDateObj };
      }
    }

    if (status) {
      filters.status = status;
    }

    // Récupérer les réservations
    const reservations = await prisma.reservation.findMany({
      where: filters,
      orderBy: {
        startTime: "asc",
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

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des réservations" },
      { status: 500 }
    );
  }
}

// Créer une nouvelle réservation
export async function POST(request: NextRequest) {
  console.log("=== DÉBUT CRÉATION RÉSERVATION ===");
  try {
    const body = await request.json();
    console.log("Données reçues:", JSON.stringify(body, null, 2));

    const {
      userId,
      clientName,
      clientEmail,
      clientPhone,
      reservationType,
      startTime,
      endTime,
      projectDescription,
      communicationMethod,
    } = body;

    // Vérifier les données requises
    if (
      !clientName ||
      !clientEmail ||
      !reservationType ||
      !startTime ||
      !endTime
    ) {
      console.log("Données manquantes:", {
        clientName: !!clientName,
        clientEmail: !!clientEmail,
        reservationType: !!reservationType,
        startTime: !!startTime,
        endTime: !!endTime,
      });
      return NextResponse.json(
        { error: "Données manquantes pour la réservation" },
        { status: 400 }
      );
    }

    // Convertir les dates
    const startTimeObj = new Date(startTime);
    const endTimeObj = new Date(endTime);

    // Vérifier si les dates sont valides
    if (isNaN(startTimeObj.getTime()) || isNaN(endTimeObj.getTime())) {
      console.log("Dates invalides:", { startTime, endTime });
      return NextResponse.json({ error: "Dates invalides" }, { status: 400 });
    }

    // Récupérer ou créer l'utilisateur admin
    let user;
    const defaultAdminId = "admin-user-id";

    // Si un ID utilisateur est fourni, vérifier qu'il existe
    if (userId && userId !== defaultAdminId) {
      console.log("Recherche de l'utilisateur avec ID:", userId);
      user = await prisma.user.findUnique({
        where: { id: userId },
      });
    }

    // Si aucun ID n'est fourni ou l'utilisateur n'existe pas, utiliser l'utilisateur admin par défaut
    if (!user) {
      console.log("Création ou récupération de l'utilisateur admin par défaut");
      try {
        user = await prisma.user.upsert({
          where: { id: defaultAdminId },
          update: {},
          create: {
            id: defaultAdminId,
            name: "Admin KAIRO",
            email: process.env.ADMIN_EMAIL || "contact.kairodigital@gmail.com",
          },
        });
        console.log("Utilisateur admin créé/récupéré avec succès:", user.id);
      } catch (userError) {
        console.error(
          "Erreur lors de la création de l'utilisateur admin:",
          userError
        );
        throw userError;
      }
    }

    // Vérifier si le créneau est disponible
    console.log("Vérification des conflits de réservation");
    const conflictingReservation = await prisma.reservation.findFirst({
      where: {
        status: { notIn: ["CANCELLED"] },
        OR: [
          {
            startTime: { lte: startTimeObj },
            endTime: { gt: startTimeObj },
          },
          {
            startTime: { lt: endTimeObj },
            endTime: { gte: endTimeObj },
          },
          {
            startTime: { gte: startTimeObj },
            endTime: { lte: endTimeObj },
          },
        ],
      },
    });

    if (conflictingReservation) {
      console.log(
        "Conflit trouvé avec la réservation:",
        conflictingReservation.id
      );
      return NextResponse.json(
        { error: "Ce créneau horaire est déjà réservé" },
        { status: 409 }
      );
    }

    // Vérifier s'il y a une exclusion pour cette date
    const date = new Date(startTimeObj);
    date.setHours(0, 0, 0, 0);

    console.log("Vérification des exclusions pour la date:", date);
    const exclusion = await prisma.exclusion.findFirst({
      where: {
        startDate: { lte: date },
        endDate: { gte: date },
      },
    });

    if (exclusion) {
      console.log("Exclusion trouvée:", exclusion);
      return NextResponse.json(
        { error: "Cette date n'est pas disponible pour une réservation" },
        { status: 409 }
      );
    }

    // Créer la réservation
    console.log("Création de la réservation avec les données:", {
      userId: user.id,
      clientName,
      clientEmail,
      startTime: startTimeObj,
      endTime: endTimeObj,
    });

    let reservation;
    try {
      reservation = await prisma.reservation.create({
        data: {
          userId: user.id,
          clientName,
          clientEmail,
          clientPhone,
          reservationType,
          startTime: startTimeObj,
          endTime: endTimeObj,
          projectDescription,
          communicationMethod,
          status: "PENDING",
        },
      });
      console.log("Réservation créée avec succès:", reservation.id);
    } catch (reservationError) {
      console.error(
        "Erreur lors de la création de la réservation:",
        reservationError
      );
      throw reservationError;
    }

    // Envoyer l'email de confirmation
    try {
      console.log("Envoi de l'email de confirmation au client:", clientEmail);
      await sendConfirmationEmail(
        clientEmail,
        clientName,
        reservation.id,
        startTimeObj,
        endTimeObj,
        reservationType,
        reservation.cancellationToken
      );
      console.log("Email de confirmation envoyé avec succès");
    } catch (emailError) {
      console.error(
        "Erreur lors de l'envoi de l'email de confirmation:",
        emailError
      );
      // On continue même si l'email échoue
    }

    // Envoyer une notification à l'administrateur
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      console.log("Envoi de la notification à l'administrateur:", adminEmail);
      await sendAdminNotificationEmail(
        clientName,
        clientEmail,
        clientPhone,
        reservation.id,
        startTimeObj,
        endTimeObj,
        reservationType,
        communicationMethod,
        projectDescription
      );
      console.log("Notification admin envoyée avec succès");
    } catch (adminNotificationError) {
      console.error(
        "Erreur lors de l'envoi de la notification à l'administrateur:",
        adminNotificationError
      );
      // On continue même si la notification échoue
    }

    console.log("=== FIN CRÉATION RÉSERVATION RÉUSSIE ===");
    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de la réservation:", error);
    console.log("=== FIN CRÉATION RÉSERVATION AVEC ERREUR ===");
    return NextResponse.json(
      { error: "Erreur serveur lors de la création de la réservation" },
      { status: 500 }
    );
  }
}

// Mettre à jour une réservation
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de réservation requis" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, startTime, endTime, notes, meetingLink } = body;

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

    // Construire les données de mise à jour
    const updateData: any = {};

    if (status) updateData.status = status;
    if (notes) updateData.notes = notes;
    if (meetingLink) updateData.meetingLink = meetingLink;

    if (startTime && endTime) {
      const startTimeObj = new Date(startTime);
      const endTimeObj = new Date(endTime);

      if (isNaN(startTimeObj.getTime()) || isNaN(endTimeObj.getTime())) {
        return NextResponse.json({ error: "Dates invalides" }, { status: 400 });
      }

      // Vérifier les conflits avec d'autres réservations
      const conflictingReservation = await prisma.reservation.findFirst({
        where: {
          id: { not: id },
          status: { notIn: ["CANCELLED"] },
          OR: [
            {
              startTime: { lte: startTimeObj },
              endTime: { gt: startTimeObj },
            },
            {
              startTime: { lt: endTimeObj },
              endTime: { gte: endTimeObj },
            },
            {
              startTime: { gte: startTimeObj },
              endTime: { lte: endTimeObj },
            },
          ],
        },
      });

      if (conflictingReservation) {
        return NextResponse.json(
          { error: "Ce créneau horaire est déjà réservé" },
          { status: 409 }
        );
      }

      updateData.startTime = startTimeObj;
      updateData.endTime = endTimeObj;
    }

    // Mettre à jour la réservation
    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la réservation:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour de la réservation" },
      { status: 500 }
    );
  }
}

// Annuler une réservation
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const token = searchParams.get("token");

    if (!id) {
      return NextResponse.json(
        { error: "ID de réservation requis" },
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

    // Si un token est fourni, vérifier qu'il correspond
    if (token && token !== reservation.cancellationToken) {
      return NextResponse.json(
        { error: "Token d'annulation invalide" },
        { status: 403 }
      );
    }

    // Mettre à jour le statut de la réservation comme CANCELLED
    await prisma.reservation.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'annulation de la réservation:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'annulation de la réservation" },
      { status: 500 }
    );
  }
}
