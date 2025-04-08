import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";
import { randomUUID } from "crypto";

// Fonction pour s'assurer que le dossier existe
async function ensureDirectoryExists(dir: string) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier n'a été envoyé" },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Type de fichier non autorisé. Utilisez JPG, PNG, WEBP ou GIF",
        },
        { status: 400 }
      );
    }

    // Vérifier la taille du fichier (limite à 20MB)
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Le fichier est trop volumineux (max 20MB)" },
        { status: 400 }
      );
    }

    // Générer un nom de fichier unique
    const extension = file.name.split(".").pop();
    const fileName = `${randomUUID()}.${extension}`;

    // Définir le chemin de destination
    const uploadDir = join(process.cwd(), "public", "uploads", "portfolio");

    // S'assurer que le dossier existe
    await ensureDirectoryExists(uploadDir);

    // Chemin complet du fichier
    const filePath = join(uploadDir, fileName);

    // Lire le contenu du fichier
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Écrire le fichier
    await writeFile(filePath, fileBuffer);

    // Construire l'URL publique
    const publicUrl = `/uploads/portfolio/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: "Fichier uploadé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de l'upload du fichier:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload du fichier" },
      { status: 500 }
    );
  }
}
