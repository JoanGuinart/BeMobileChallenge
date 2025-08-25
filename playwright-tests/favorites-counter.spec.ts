import { test, expect, Locator } from "@playwright/test";

async function waitForFavoritesCount(
  locator: Locator,
  expected: string,
  timeout = 10000
) {
  await expect
    .poll(async () => await locator.textContent(), { timeout })
    .toBe(expected);
}

async function toggleHeart(heart: Locator, counter: Locator, expected: string) {
  await heart.scrollIntoViewIfNeeded();
  await heart.click({ force: true });
  await waitForFavoritesCount(counter, expected);
}

test.describe("Heart component favorites toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());

    await page
      .locator('[data-testid="favorites-count"]')
      .waitFor({ state: "visible" });
  });

  test("small-heart toggles favorites correctly", async ({ page }) => {
    const smallHeart = page.locator('[data-testid="small-heart"]').first();
    const favoritesCount = page.locator('[data-testid="favorites-count"]');

    await expect(smallHeart).toBeVisible();
    await expect(smallHeart).toBeEnabled();

    await toggleHeart(smallHeart, favoritesCount, "1");
    await toggleHeart(smallHeart, favoritesCount, "0");
  });
});
