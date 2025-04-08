import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialisation du client OpenAI avec la clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "proj_3YOiDV2CgQGQP7QvOkiVT6Ss",
});

export async function POST(request: NextRequest) {
  try {
    const { title, category, client, technologies } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Le titre du projet est requis" },
        { status: 400 }
      );
    }

    // Construction d'un prompt détaillé pour obtenir une description pertinente
    const prompt = `
      Génère une description professionnelle en français pour un projet de portfolio de développeur web.
      
      Informations sur le projet:
      - Titre: ${title}
      - Catégorie: ${category || "Site web"}
      - Client: ${client || "Client confidentiel"}
      - Technologies utilisées: ${
        technologies?.join(", ") || "Technologies web modernes"
      }
      
      La description doit:
      - Faire environ 2-3 phrases (maximum 150 mots)
      - Mettre en valeur l'aspect technique et le bénéfice pour le client
      - Mentionner les technologies utilisées
      - Avoir un ton professionnel et convaincant
      - Être optimisée pour le SEO avec des mots-clés pertinents
      
      Réponse (uniquement la description, sans introduction ni conclusion):
    `;

    // Appel à l'API OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Extraire la réponse générée
    const generatedDescription = completion.choices[0].message.content?.trim();

    if (!generatedDescription) {
      throw new Error("Aucune description n'a été générée");
    }

    return NextResponse.json({
      success: true,
      description: generatedDescription,
    });
  } catch (error) {
    console.error("Erreur lors de la génération de description:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la génération de description",
      },
      { status: 500 }
    );
  }
}
