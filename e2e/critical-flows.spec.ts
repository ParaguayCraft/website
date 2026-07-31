import { test, expect } from "@playwright/test";

test.describe("ParaguayCraft website – critical user journeys", () => {
  test("homepage renders with hero and main content", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#main-content")).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "PARAGUAY" }),
    ).toBeVisible();

    await expect(
      page.locator('nav[aria-label="Navegación principal"]'),
    ).toBeVisible();
  });

  test("desktop navigation links go to existing pages", async ({ page }) => {
    await page.goto("/");

    await page
      .locator('nav[aria-label="Navegación principal"]')
      .getByRole("link", { name: "Información" })
      .click();
    await expect(page).toHaveURL(/\/informacion/);
    await expect(
      page.getByRole("heading", { name: "Información" }),
    ).toBeVisible();

    await page
      .locator('nav[aria-label="Navegación principal"]')
      .getByRole("link", { name: "Mapa" })
      .click();
    await expect(page).toHaveURL(/\/mapa/);
  });

  test("footer renders with quick links", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    await expect(footer.getByText("Información")).toBeVisible();
    await expect(footer.getByText("Mapa")).toBeVisible();
    await expect(footer.getByText("Discord")).toBeVisible();
  });

  test("mobile menu opens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await page.getByLabel("Abrir menú").click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByLabel("Cerrar menú").click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("skip-link navigates to main content", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    const main = page.locator("#main-content");
    await expect(main).toBeVisible();
  });

  test("status API route returns a JSON response", async ({ page }) => {
    const response = await page.request.get("/api/status");
    const body = await response.json();

    expect(body).toHaveProperty("online");
    expect(body).toHaveProperty("playersOnline");
    expect(body).toHaveProperty("playersMax");
    expect(body).toHaveProperty("version");
    expect(body).toHaveProperty("address");
  });

  test("informacion page shows sections", async ({ page }) => {
    await page.goto("/informacion");

    await expect(
      page.getByRole("heading", { name: "Información" }),
    ).toBeVisible();

    await expect(page.getByText("SOBRE NOSOTROS")).toBeVisible();
    await expect(page.getByText("CÓMO CONECTARSE")).toBeVisible();
  });

  test("contacto page shows Discord and server info", async ({ page }) => {
    await page.goto("/contacto");

    await expect(
      page.getByRole("heading", { name: "Contacto" }),
    ).toBeVisible();

    await expect(page.getByText("IP del servidor")).toBeVisible();
    await expect(
      page.locator("main").getByText("Discord", { exact: true }),
    ).toBeVisible();
  });
});
