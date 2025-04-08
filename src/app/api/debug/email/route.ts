import { NextResponse } from "next/server";
import { createNodemailerTransporter } from "@/lib/nodemailer-config";

export async function GET() {
  try {
    console.log("=== DÉBUT TEST EMAIL API ===");

    // Vérifier les variables d'environnement
    const emailVars = {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD ? "***masqué***" : undefined,
      from: process.env.EMAIL_FROM,
      admin: process.env.ADMIN_EMAIL,
    };

    console.log("Variables d'environnement email:", emailVars);

    // Créer le transporteur
    const transporter = createNodemailerTransporter();

    // Vérifier la connexion SMTP
    const verifyResult = await transporter.verify();
    console.log("Vérification SMTP réussie:", verifyResult);

    // Envoyer un email de test
    const testEmail = await transporter.sendMail({
      from: `"Test API Debug" <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_FROM,
      subject: "Test d'envoi d'email - API Debug",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h1 style="color: #1e40af; font-size: 22px; margin-bottom: 20px;">Test d'email depuis l'API Debug</h1>
          <p>Ceci est un test d'envoi d'email pour vérifier que la configuration SMTP fonctionne correctement.</p>
          <ul>
            <li><strong>Date d'envoi:</strong> ${new Date().toLocaleString(
              "fr-FR"
            )}</li>
            <li><strong>Serveur:</strong> ${process.env.EMAIL_SERVER_HOST}:${
        process.env.EMAIL_SERVER_PORT
      }</li>
            <li><strong>Utilisateur:</strong> ${
              process.env.EMAIL_SERVER_USER
            }</li>
          </ul>
          <p>Si vous recevez cet email, la configuration est correcte.</p>
        </div>
      `,
    });

    console.log("Email de test envoyé avec succès:", testEmail.messageId);
    console.log("=== FIN TEST EMAIL API ===");

    return NextResponse.json({
      success: true,
      message: "Test d'email envoyé avec succès",
      emailConfig: emailVars,
      smtpVerification: verifyResult,
      emailResult: {
        messageId: testEmail.messageId,
        response: testEmail.response,
        envelope: testEmail.envelope,
      },
    });
  } catch (error) {
    console.error("Erreur lors du test d'email:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'envoi du test d'email",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
