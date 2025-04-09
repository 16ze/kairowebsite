import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-service";

// Types pour la réservation
type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

interface ReservationRequest {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
  communicationMethod: "VISIO" | "PHONE";
  reservationType: "DISCOVERY" | "CONSULTATION" | "PRESENTATION" | "FOLLOWUP";
  startTime: Date;
  endTime: Date;
  userId: string;
}

// Pour l'instant, nous allons stocker les réservations en mémoire
// Dans une application réelle, cela serait stocké dans une base de données
const reservations: Array<{
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
  communicationMethod: "VISIO" | "PHONE";
  reservationType: "DISCOVERY" | "CONSULTATION" | "PRESENTATION" | "FOLLOWUP";
  startTime: string;
  endTime: string;
  status: ReservationStatus;
  createdAt: string;
  userId: string;
}> = [];

export async function POST(request: Request) {
  try {
    // Extraire les données de la requête
    const data: ReservationRequest = await request.json();

    // Valider les données reçues
    if (
      !data.clientName ||
      !data.clientEmail ||
      !data.startTime ||
      !data.endTime
    ) {
      return NextResponse.json(
        { error: "Informations manquantes pour la réservation" },
        { status: 400 }
      );
    }

    // Créer un ID unique pour la réservation
    const reservationId = `res-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;

    // Créer une nouvelle réservation
    const newReservation = {
      id: reservationId,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      projectDescription: data.projectDescription,
      communicationMethod: data.communicationMethod,
      reservationType: data.reservationType,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
      status: "PENDING" as ReservationStatus,
      createdAt: new Date().toISOString(),
      userId: data.userId,
    };

    // Ajouter la réservation à notre "base de données"
    reservations.push(newReservation);

    // Envoyer un email de confirmation au client
    try {
      await sendEmail({
        to: data.clientEmail,
        subject:
          "Confirmation de votre demande de consultation avec KAIRO Digital",
        text: `Bonjour ${
          data.clientName
        },\n\nNous avons bien reçu votre demande de consultation. Un membre de notre équipe va confirmer rapidement ce rendez-vous.\n\nDate: ${new Date(
          data.startTime
        ).toLocaleDateString("fr-FR")}\nHeure: ${new Date(
          data.startTime
        ).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${new Date(data.endTime).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}\n\nMerci de votre confiance.\n\nL'équipe KAIRO Digital`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6;">Confirmation de votre demande de consultation</h2>
            <p>Bonjour ${data.clientName},</p>
            <p>Nous avons bien reçu votre demande de consultation. Un membre de notre équipe va confirmer rapidement ce rendez-vous.</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Date:</strong> ${new Date(
                data.startTime
              ).toLocaleDateString("fr-FR")}</p>
              <p><strong>Heure:</strong> ${new Date(
                data.startTime
              ).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })} - ${new Date(data.endTime).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
              <p><strong>Type de consultation:</strong> ${
                data.reservationType
              }</p>
              <p><strong>Méthode de communication:</strong> ${
                data.communicationMethod
              }</p>
            </div>
            <p>Merci de votre confiance.</p>
            <p>L'équipe KAIRO Digital</p>
          </div>
        `,
      });

      // Envoyer une notification à l'administrateur
      await sendEmail({
        to: process.env.ADMIN_EMAIL || "admin@kairo-digital.fr",
        subject: "Nouvelle demande de consultation",
        text: `Nouvelle demande de consultation de ${data.clientName} (${
          data.clientEmail
        })\n\nDate: ${new Date(data.startTime).toLocaleDateString(
          "fr-FR"
        )}\nHeure: ${new Date(data.startTime).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${new Date(data.endTime).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}\n\nDescription du projet: ${
          data.projectDescription
        }\n\nMéthode de communication: ${data.communicationMethod}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6;">Nouvelle demande de consultation</h2>
            <p><strong>Client:</strong> ${data.clientName} (${
          data.clientEmail
        })</p>
            ${
              data.clientPhone
                ? `<p><strong>Téléphone:</strong> ${data.clientPhone}</p>`
                : ""
            }
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Date:</strong> ${new Date(
                data.startTime
              ).toLocaleDateString("fr-FR")}</p>
              <p><strong>Heure:</strong> ${new Date(
                data.startTime
              ).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })} - ${new Date(data.endTime).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
              <p><strong>Type de consultation:</strong> ${
                data.reservationType
              }</p>
              <p><strong>Méthode de communication:</strong> ${
                data.communicationMethod
              }</p>
              <p><strong>Description du projet:</strong> ${
                data.projectDescription
              }</p>
            </div>
            <p>Connectez-vous au <a href="${
              process.env.NEXT_PUBLIC_SITE_URL || "https://www.kairo-digital.fr"
            }/admin/reservations">panneau d'administration</a> pour gérer cette réservation.</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Erreur lors de l'envoi des emails:", emailError);
      // Continuer même si l'envoi d'email échoue
    }

    // Retourner la réservation créée
    return NextResponse.json(
      {
        success: true,
        message: "Réservation créée avec succès",
        reservation: newReservation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de la réservation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la réservation" },
      { status: 500 }
    );
  }
}

// Endpoint pour récupérer les réservations
export async function GET() {
  try {
    // Dans une application réelle, récupérer les réservations de la base de données
    return NextResponse.json({
      success: true,
      reservations,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des réservations" },
      { status: 500 }
    );
  }
}
