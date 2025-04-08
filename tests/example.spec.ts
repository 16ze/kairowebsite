import { test, expect } from "@playwright/test";

test.describe("Page d'accueil Kairo", () => {
  test("a le bon titre et méta description", async ({ page }) => {
    await page.goto("/");

    // Vérifier le titre de la page
    await expect(page).toHaveTitle(
      /KAIRO Digital | Développeur web freelance et consultant SEO/
    );

    // Vérifier la méta description
    const metaDescription = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(metaDescription).toContain(
      "KAIRO Digital est un développeur web freelance"
    );
  });

  test("affiche tous les éléments essentiels de la page d'accueil", async ({
    page,
  }) => {
    await page.goto("/");

    // Vérifier que le h1 est présent et correct
    const h1 = await page.locator("h1").first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Développement web & Optimisation SEO");

    // Vérifier la présence du CTA principal
    const ctaButton = await page.getByRole("link", {
      name: /Demander mon devis gratuit/i,
    });
    await expect(ctaButton).toBeVisible();

    // Vérifier que le lien vers le portfolio est présent
    const portfolioLink = await page.getByRole("link", {
      name: /Voir mes réalisations/i,
    });
    await expect(portfolioLink).toBeVisible();

    // Vérifier la présence du menu de navigation
    const navigation = await page.locator("nav");
    await expect(navigation).toBeVisible();
  });

  test("les liens de navigation fonctionnent correctement", async ({
    page,
  }) => {
    await page.goto("/");

    // Vérifier que le lien vers la page de contact fonctionne
    await page
      .getByRole("link", { name: /Demander mon devis gratuit/i })
      .click();
    await expect(page).toHaveURL(/\/contact/);

    // Retourner à la page d'accueil
    await page.goto("/");

    // Vérifier que le lien vers le portfolio fonctionne
    await page.getByRole("link", { name: /Voir mes réalisations/i }).click();
    await expect(page).toHaveURL(/\/portfolio/);
  });

  test("est responsive sur mobile", async ({ page }) => {
    // Configuration pour tester en mode mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Vérifier que les éléments sont visibles en mode mobile
    const h1 = await page.locator("h1").first();
    await expect(h1).toBeVisible();

    // Vérifier la présence du bouton hamburger en mode mobile
    const menuButton = await page.locator('button[aria-label="Menu"]');
    if (await menuButton.isVisible()) {
      // Si le menu est fermé, l'ouvrir
      await menuButton.click();

      // Vérifier que le menu s'ouvre correctement
      const navigation = await page.locator("nav > ul");
      await expect(navigation).toBeVisible();
    }
  });
});
