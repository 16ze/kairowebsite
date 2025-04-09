import { NextResponse } from "next/server";
import { sendEmail } from "../../../lib/email-service";

interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  project: string;
  consent: boolean;
}

export async function POST(request: Request) {
  console.log("📝 API: Début de traitement POST /api/contact");

  try {
    // Extraire les données de la requête
    let data: ContactRequest;
    try {
      data = await request.json();
      console.log("📝 Données reçues:", JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.error("❌ Erreur de parsing JSON:", parseError);
      return NextResponse.json(
        { error: "Format de données invalide" },
        { status: 400 }
      );
    }

    // Valider les données reçues
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.subject ||
      !data.project ||
      !data.consent
    ) {
      console.error("❌ Données de contact incomplètes:", data);
      return NextResponse.json(
        { error: "Informations manquantes pour le contact" },
        { status: 400 }
      );
    }

    // Formatage du message pour l'email
    const fullName = `${data.firstName} ${data.lastName}`;
    const messageHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
        <h1 style="color: #1e40af; font-size: 22px; margin-bottom: 20px;">Nouvelle demande de contact</h1>
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 25px 0;">
          <h2 style="color: #1e40af; font-size: 18px; margin-top: 0;">Informations du contact</h2>
          <p><strong>Nom:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${
            data.phone ? `<p><strong>Téléphone:</strong> ${data.phone}</p>` : ""
          }
          <p><strong>Sujet:</strong> ${data.subject}</p>
        </div>
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 25px 0;">
          <h2 style="color: #1e40af; font-size: 18px; margin-top: 0;">Message</h2>
          <p style="white-space: pre-line;">${data.project}</p>
        </div>
      </div>
    `;

    const messageText = `
Nouvelle demande de contact de ${fullName} (${data.email})
${data.phone ? `Téléphone: ${data.phone}` : ""}

Sujet: ${data.subject}

Message:
${data.project}
    `;

    // Envoyer l'email de contact
    console.log("📧 Tentative d'envoi de l'email de contact...");

    // Email à l'administrateur
    const adminEmail =
      process.env.ADMIN_EMAIL ||
      process.env.EMAIL_RECIPIENT ||
      "contact.kairodigital@gmail.com";

    const emailResult = await sendEmail({
      to: adminEmail,
      subject: `Nouveau message: ${data.subject}`,
      text: messageText,
      html: messageHtml,
      replyTo: data.email,
    });

    if (emailResult) {
      console.log(`✅ Email de contact envoyé à ${adminEmail}`);

      // Envoyer un email de confirmation à l'expéditeur
      const confirmationResult = await sendEmail({
        to: data.email,
        subject: `Confirmation de réception - ${data.subject}`,
        text: `Bonjour ${fullName},\n\nNous avons bien reçu votre message concernant "${data.subject}".\n\nNotre équipe va l'examiner et vous répondra dans les meilleurs délais.\n\nCordialement,\nL'équipe KAIRO Digital`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
            <h1 style="color: #1e40af; font-size: 22px; margin-bottom: 20px;">Confirmation de réception</h1>
            <p>Bonjour ${fullName},</p>
            <p>Nous avons bien reçu votre message concernant <strong>"${data.subject}"</strong>.</p>
            <p>Notre équipe va l'examiner et vous répondra dans les meilleurs délais.</p>
            <p>Cordialement,</p>
            <p>L'équipe KAIRO Digital</p>
          </div>
        `,
      });

      console.log(
        `📧 Email de confirmation ${
          confirmationResult ? "envoyé ✅" : "échec ❌"
        } à ${data.email}`
      );

      return NextResponse.json({
        success: true,
        message: "Message envoyé avec succès",
      });
    } else {
      console.error("❌ Échec d'envoi de l'email de contact");
      return NextResponse.json(
        { error: "Problème lors de l'envoi de l'email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Erreur lors du traitement du contact:", error);
    return NextResponse.json(
      {
        error: "Erreur lors du traitement de la demande de contact",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    console.log("📝 API: Fin de traitement POST /api/contact");
  }
}
