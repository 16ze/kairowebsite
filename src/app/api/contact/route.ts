import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sendContactEmail, sendAutoReplyEmail } from "@/lib/email";

// Interface pour les données du formulaire
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  project: string;
  consent: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // Extraction des données du formulaire
    const formData: ContactFormData = await request.json();

    // Validation basique côté serveur
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.subject ||
      !formData.project ||
      !formData.consent
    ) {
      return NextResponse.json(
        { message: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { message: "Adresse email invalide" },
        { status: 400 }
      );
    }

    try {
      // Envoyer l'email principal de notification à l'équipe KAIRO
      await sendContactEmail(formData);

      // Envoyer un email de confirmation à l'expéditeur (optionnel, ne bloque pas le processus)
      sendAutoReplyEmail(formData.firstName, formData.email).catch((error) =>
        console.error(
          "Erreur lors de l'envoi de l'email de confirmation:",
          error
        )
      );

      // Retourne une réponse de succès
      return NextResponse.json({
        success: true,
        message:
          "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
      });
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email:", emailError);
      return NextResponse.json(
        {
          message:
            "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer plus tard.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur lors du traitement du formulaire de contact:", error);

    // Retourne une réponse d'erreur
    return NextResponse.json(
      {
        message:
          "Une erreur est survenue lors du traitement de votre demande. Veuillez réessayer plus tard.",
      },
      { status: 500 }
    );
  }
}
