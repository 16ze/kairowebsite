import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Récupérer les paramètres de réservation
export async function GET() {
  try {
    const settings = await prisma.reservationSettings.findFirst();

    if (!settings) {
      // Si aucun paramètre n'existe, créer les paramètres par défaut
      const defaultSettings = await prisma.reservationSettings.create({
        data: {
          minNoticeTime: 1,
          maxAdvanceBookingDays: 60,
          defaultSessionDuration: 60,
          reminderHoursBeforeEvent: 24,
          discoverySessionDuration: 30,
          consultationSessionDuration: 60,
          presentationSessionDuration: 45,
          followupSessionDuration: 30,
        },
      });

      return NextResponse.json(defaultSettings);
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des paramètres" },
      { status: 500 }
    );
  }
}

// Mettre à jour les paramètres de réservation
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      minNoticeTime,
      maxAdvanceBookingDays,
      defaultSessionDuration,
      reminderHoursBeforeEvent,
      discoverySessionDuration,
      consultationSessionDuration,
      presentationSessionDuration,
      followupSessionDuration,
    } = body;

    // Récupérer les paramètres existants
    const existingSettings = await prisma.reservationSettings.findFirst();

    // Construire les données de mise à jour
    const updateData: Record<string, number> = {};

    if (minNoticeTime !== undefined) updateData.minNoticeTime = minNoticeTime;
    if (maxAdvanceBookingDays !== undefined)
      updateData.maxAdvanceBookingDays = maxAdvanceBookingDays;
    if (defaultSessionDuration !== undefined)
      updateData.defaultSessionDuration = defaultSessionDuration;
    if (reminderHoursBeforeEvent !== undefined)
      updateData.reminderHoursBeforeEvent = reminderHoursBeforeEvent;
    if (discoverySessionDuration !== undefined)
      updateData.discoverySessionDuration = discoverySessionDuration;
    if (consultationSessionDuration !== undefined)
      updateData.consultationSessionDuration = consultationSessionDuration;
    if (presentationSessionDuration !== undefined)
      updateData.presentationSessionDuration = presentationSessionDuration;
    if (followupSessionDuration !== undefined)
      updateData.followupSessionDuration = followupSessionDuration;

    // Si aucun paramètre n'existe, créer de nouveaux paramètres
    if (!existingSettings) {
      const newSettings = await prisma.reservationSettings.create({
        data: {
          minNoticeTime: minNoticeTime ?? 1,
          maxAdvanceBookingDays: maxAdvanceBookingDays ?? 60,
          defaultSessionDuration: defaultSessionDuration ?? 60,
          reminderHoursBeforeEvent: reminderHoursBeforeEvent ?? 24,
          discoverySessionDuration: discoverySessionDuration ?? 30,
          consultationSessionDuration: consultationSessionDuration ?? 60,
          presentationSessionDuration: presentationSessionDuration ?? 45,
          followupSessionDuration: followupSessionDuration ?? 30,
        },
      });

      return NextResponse.json(newSettings);
    }

    // Mettre à jour les paramètres existants
    const updatedSettings = await prisma.reservationSettings.update({
      where: { id: existingSettings.id },
      data: updateData,
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des paramètres:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour des paramètres" },
      { status: 500 }
    );
  }
}
