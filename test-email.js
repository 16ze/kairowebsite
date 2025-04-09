// Script de test pour l'envoi d'email
const nodemailer = require("nodemailer");

// Configuration
const EMAIL_USER = "contact.kairodigital@gmail.com";
const EMAIL_PASSWORD = "uthyuwjwhpelwbdg"; // Mot de passe d'application sans espaces
const EMAIL_FROM = "contact.kairodigital@gmail.com";
const EMAIL_TO = "contact.kairodigital@gmail.com"; // Envoyer à vous-même pour tester

// Fonction pour tester l'envoi d'email
async function testEmailSending() {
  console.log("🧪 DÉMARRAGE DU TEST D'ENVOI D'EMAIL");

  console.log(`📧 Configuration utilisée pour le test:`);
  console.log(`- Service: Gmail`);
  console.log(`- Utilisateur: ${EMAIL_USER}`);
  console.log(`- Mot de passe: ${EMAIL_PASSWORD ? "(présent)" : "(manquant)"}`);
  console.log(`- De: ${EMAIL_FROM}`);
  console.log(`- À: ${EMAIL_TO}`);

  try {
    // Créer le transporteur avec service Gmail
    console.log("📧 Création du transporteur Gmail...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    // Vérifier la connexion
    console.log("📧 Vérification de la connexion...");
    try {
      const verifyResult = await transporter.verify();
      console.log(`✅ Connexion vérifiée avec succès: ${verifyResult}`);
    } catch (verifyError) {
      console.error("❌ Échec de vérification:", verifyError);
      return false;
    }

    // Envoyer un email de test
    console.log("📧 Envoi d'un email de test...");
    const info = await transporter.sendMail({
      from: `"Test Email" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      subject: "Test d'envoi d'email - KAIRO Digital",
      text: `Ceci est un email de test envoyé le ${new Date().toLocaleString(
        "fr-FR"
      )}.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h1 style="color: #1e40af; font-size: 22px; margin-bottom: 20px;">Test d'envoi d'email</h1>
          <p>Cet email a été envoyé automatiquement pour tester la configuration d'envoi d'emails.</p>
          <p>Date et heure: <strong>${new Date().toLocaleString(
            "fr-FR"
          )}</strong></p>
          <p>Si vous recevez cet email, cela signifie que la configuration est correcte!</p>
        </div>
      `,
    });

    console.log("✅ Email envoyé avec succès!");
    console.log(`📧 ID Message: ${info.messageId}`);
    console.log("📧 Réponse complète:", JSON.stringify(info, null, 2));
    return true;
  } catch (error) {
    console.error("❌ ERREUR LORS DE L'ENVOI EMAIL:", error);

    // Log détaillé pour les erreurs d'authentification
    if (error.message && error.message.includes("Invalid login")) {
      console.error("❌ ÉCHEC D'AUTHENTIFICATION. Vérifiez vos identifiants.");
      console.error(
        "💡 Si vous utilisez Gmail, assurez-vous d'utiliser un mot de passe d'application."
      );
    }

    // Afficher les détails complets de l'erreur
    if (error.code || error.response || error.responseCode) {
      console.error("📢 DÉTAILS DE L'ERREUR:");
      console.error("- Code:", error.code);
      console.error("- Réponse:", error.response);
      console.error("- Code de réponse:", error.responseCode);
    }

    return false;
  }
}

// Exécuter le test
testEmailSending()
  .then((success) => {
    console.log(
      `\n🧪 RÉSULTAT DU TEST: ${success ? "RÉUSSI ✅" : "ÉCHOUÉ ❌"}`
    );
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error("❌ ERREUR INATTENDUE:", error);
    process.exit(1);
  });
