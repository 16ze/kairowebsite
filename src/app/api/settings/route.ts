import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Chemin vers le fichier de configuration
const configFilePath = path.join(process.cwd(), "config/site-settings.json");

// Vérifier si le répertoire config existe, sinon le créer
async function ensureConfigDirectory() {
  const configDir = path.join(process.cwd(), "config");
  try {
    await fs.access(configDir);
  } catch {
    await fs.mkdir(configDir, { recursive: true });
  }
}

// Lire les paramètres actuels
async function readSettings() {
  try {
    await ensureConfigDirectory();
    try {
      const data = await fs.readFile(configFilePath, "utf8");
      return JSON.parse(data);
    } catch {
      // Si le fichier n'existe pas, créer les paramètres par défaut
      const defaultSettings = {
        siteName: "KAIRO Digital",
        siteDescription: "Agence de développement web et consulting digital",
        contactEmail: "contact.kairodigital@gmail.com",
        phoneNumber: "06 XX XX XX XX",
        socialMedia: {
          instagram: "https://instagram.com/kairodigital",
          facebook: "https://facebook.com/kairodigital",
          linkedin: "https://linkedin.com/company/kairodigital",
          twitter: "",
        },
        bookingSettings: {
          allowWeekendBookings: false,
          minimumNoticeHours: 24,
          bookingTimeSlotMinutes: 60,
          autoConfirmBookings: false,
          sendEmailNotifications: true,
        },
        seoSettings: {
          defaultMetaTitle: "KAIRO Digital | Agence web & consulting digital",
          defaultMetaDescription:
            "KAIRO Digital vous accompagne dans vos projets web et votre transformation digitale.",
          googleAnalyticsId: "",
        },
        updatedAt: new Date().toISOString(),
      };

      await fs.writeFile(
        configFilePath,
        JSON.stringify(defaultSettings, null, 2),
        "utf8"
      );
      return defaultSettings;
    }
  } catch (error) {
    console.error("Erreur lors de la lecture des paramètres:", error);
    throw error;
  }
}

// GET - Récupérer les paramètres
export async function GET() {
  try {
    const settings = await readSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des paramètres" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour les paramètres
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const currentSettings = await readSettings();

    // Fusionner les paramètres existants avec les nouveaux
    const updatedSettings = {
      ...currentSettings,
      ...body,
      // Pour les objets imbriqués, il faut les fusionner manuellement
      socialMedia: {
        ...currentSettings.socialMedia,
        ...(body.socialMedia || {}),
      },
      bookingSettings: {
        ...currentSettings.bookingSettings,
        ...(body.bookingSettings || {}),
      },
      seoSettings: {
        ...currentSettings.seoSettings,
        ...(body.seoSettings || {}),
      },
      updatedAt: new Date().toISOString(),
    };

    // Enregistrer les paramètres mis à jour
    await fs.writeFile(
      configFilePath,
      JSON.stringify(updatedSettings, null, 2),
      "utf8"
    );

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des paramètres:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des paramètres" },
      { status: 500 }
    );
  }
}
