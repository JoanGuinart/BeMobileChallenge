import { test, expect } from "@playwright/test";

test("Shows only the clicked favorite character", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());

  const firstCard = page.locator('[data-testid="card"]').first();
  await expect(firstCard).toBeVisible();

  const firstTitleLocator = page.locator('[data-testid="card-title"]').first();
  await expect(firstTitleLocator).toBeVisible();

  const firstTitle = await firstTitleLocator.textContent();
  if (!firstTitle) throw new Error("First card has no title");

  const likeButton = page.locator('[data-testid="small-heart"]').first();
  await likeButton.click();

  const showFavoritesButton = page
    .locator('[data-testid="show-favorites-button"]')
    .first();
  await showFavoritesButton.click();

  const favoriteCard = page.locator('[data-testid="card"]').first();
  await favoriteCard.waitFor({ state: "visible", timeout: 10000 });

  const favoriteTitleLocator = page
    .locator('[data-testid="card-title"]')
    .first();
  await expect(favoriteTitleLocator).toHaveText(firstTitle);

  await expect(page.locator('[data-testid="card"]')).toHaveCount(1);
});
