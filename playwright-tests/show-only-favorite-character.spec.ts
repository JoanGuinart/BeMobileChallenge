import { test, expect } from "@playwright/test";

test.describe("Favorites filter", () => {
  test("Shows only the clicked favorite character", async ({ page }) => {
    await page.goto("/");

    const firstCard = page.locator('[data-testid="card"]').first();
    const firstTitle = await firstCard.locator('[data-testid="card-title"]').textContent();

 
    await firstCard.click();

    const showFavoritesButton = page.locator('[data-testid="show-favorites-button"]');
    await showFavoritesButton.click();

    const cards = page.locator('[data-testid="card"]');
    await expect(cards).toHaveCount(1, { timeout: 5000 });

    const favoriteTitle = cards.locator('[data-testid="card-title"]').first();
    await expect(favoriteTitle).toHaveText(firstTitle || "");
  });
});
