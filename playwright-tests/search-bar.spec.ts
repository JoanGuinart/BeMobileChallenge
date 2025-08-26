import { test, expect } from "@playwright/test";

test.describe("Main view - Character search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("Filters characters correctly by name", async ({ page }) => {
    const searchInput = page.locator('input[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEnabled();
    await searchInput.fill("Spider");

    const cards = page.locator('[data-testid="full-card"]').first();
    await cards.first().waitFor({ state: "visible", timeout: 10000 });

    const titles = cards.locator('[data-testid="card-title"]');
    const titlesCount = await titles.count();
    expect(titlesCount).toBeGreaterThan(0);

    for (let i = 0; i < titlesCount; i++) {
      await expect(titles.nth(i)).toContainText(/Spider/i);
    }
  });
});
