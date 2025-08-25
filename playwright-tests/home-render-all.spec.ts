import { test, expect } from "@playwright/test";

test.describe("Vista principal - Renderizado inicial", () => {
  test("Render searchbar and find 50 characters", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();

    const cards = page.locator('[data-testid="card"]');
    await expect(cards).toHaveCount(50);
  });
});
