import { NextResponse } from "next/server";
import { testEmailConfig } from "@/lib/nodemailer-config";

export async function GET() {
  try {
    const result = await testEmailConfig();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur lors du test d'email:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
