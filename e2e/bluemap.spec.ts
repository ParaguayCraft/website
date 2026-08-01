import { test, expect } from "./fixtures";

// Runs in the default project where NEXT_PUBLIC_BLUEMAP_URL is unset,
// so the app must render the "configuration missing" BlueMap state.
test.describe("I. BlueMap – missing configuration (default project)", () => {
  test("map page shows a configuration-unavailable message", async ({ page }) => {
    await page.goto("/mapa");
    await expect(
      page.getByText("El mapa interactivo aún no está configurado."),
    ).toBeVisible();
  });

  test("no iframe points to localhost and no localhost map source exists", async ({ page }) => {
    await page.goto("/mapa");
    await expect(page.locator('iframe[src*="localhost"]')).toHaveCount(0);
    await expect(page.locator('iframe[src*=":8100"]')).toHaveCount(0);
    expect(await page.content()).not.toContain("http://localhost:8100");
  });

  test("global skip link reaches the map page main content", async ({ page }) => {
    await page.goto("/mapa");
    await page.keyboard.press("Tab");
    await expect(page.getByText("Saltar al contenido")).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
  });
});
