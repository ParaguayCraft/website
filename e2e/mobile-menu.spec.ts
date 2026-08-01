import { test, expect } from "./fixtures";

test.describe("H. Mobile menu accessibility", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("menu trigger exposes aria-expanded and opens/closes the dialog", async ({ page }) => {
    await page.goto("/");

    const trigger = page.getByLabel("Abrir menú");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toHaveAttribute("aria-controls", "mobile-nav-dialog");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await page.getByLabel("Cerrar menú").click();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(dialog).not.toBeVisible();
  });

  test("opening the menu moves focus into it", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Abrir menú").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.getAttribute("aria-label")))
      .toBe("Cerrar menú");
  });

  test("reduced motion opens the dialog and focuses the close control immediately", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await page.getByLabel("Abrir menú").click();
    const dialog = page.locator("#mobile-nav-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByLabel("Cerrar menú")).toBeFocused();
  });

  test("Tab cycles only within the dialog", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Abrir menú").click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() =>
        Boolean(document.activeElement?.closest('[role="dialog"]')),
      );
      expect(inside).toBe(true);
    }
  });

  test("Shift+Tab stays within the dialog", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Abrir menú").click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const closeButton = page.getByLabel("Cerrar menú");
    await expect(closeButton).toBeFocused();
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Shift+Tab");
      const inside = await page.evaluate(() =>
        Boolean(document.activeElement?.closest('[role="dialog"]')),
      );
      expect(inside).toBe(true);
    }
  });

  test("Escape closes the menu and focus returns to the trigger", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByLabel("Abrir menú");
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.getAttribute("aria-label")))
      .toBe("Abrir menú");
  });

  test("body scrolling is restored after closing", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Abrir menú").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe("hidden");

    await page.keyboard.press("Escape");
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe("");
  });

  test("navigating to another route restores body scrolling", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Abrir menú").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe("hidden");

    await page.getByRole("dialog").getByRole("link", { name: "Información" }).click();
    await expect(page).toHaveURL(/\/informacion/);
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe("");
  });

  test("open and close controls have usable accessible names", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Abrir menú")).toBeVisible();
    await page.getByLabel("Abrir menú").click();
    await expect(page.getByLabel("Cerrar menú")).toBeVisible();
  });
});
