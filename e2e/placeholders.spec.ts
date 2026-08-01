import { test, expect } from "./fixtures";

test.describe("J. Public placeholder cleanup", () => {
  test("homepage does not show developer placeholders or unverified claims", async ({
    page,
  }) => {
    await page.goto("/");

    const body = await page.locator("body").innerText();
    expect(body).not.toContain("IMG");
    expect(body).not.toContain("Captura del servidor");
    expect(body).not.toContain("+500 miembros");
  });

  test("unavailable YouTube/TikTok links are omitted instead of rendered as #", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
    await expect(page.locator("footer").getByText("YouTube")).toHaveCount(0);
    await expect(page.locator("footer").getByText("TikTok")).toHaveCount(0);
  });

  test("contacto page does not render unavailable social links", async ({ page }) => {
    await page.goto("/contacto");
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
  });
});
