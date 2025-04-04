import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

    // Ici, dans un environnement de production, vous enverriez l'email
    // Par exemple avec un service comme SendGrid, Mailgun, ou l'API Mail de votre hébergeur
    // Pour l'instant, nous allons simuler un envoi réussi

    console.log("Formulaire de contact reçu:", formData);

    // Journalisation pour tests/développement
    console.log(`
      Nouveau message de contact:
      - Nom: ${formData.firstName} ${formData.lastName}
      - Email: ${formData.email}
      - Téléphone: ${formData.phone || "Non fourni"}
      - Sujet: ${formData.subject}
      - Projet: ${formData.project}
    `);

    // Pour une démo, nous simulons un délai pour imiter un traitement réel
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Retourne une réponse de succès
    return NextResponse.json({
      success: true,
      message:
        "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
    });
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
