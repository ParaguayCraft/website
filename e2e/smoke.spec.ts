import { test, expect } from "./fixtures";

const ROUTES = ["/", "/informacion", "/mapa", "/reglas", "/contacto", "/noticias"];

test.describe("K. Page smoke coverage", () => {
  for (const route of ROUTES) {
    test(`${route} renders a usable page`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("#main-content")).toBeVisible();
      await expect(page.locator("body")).not.toContainText("Application error");
    });
  }
});
