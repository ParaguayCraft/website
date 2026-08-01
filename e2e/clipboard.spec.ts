import { test, expect } from "./fixtures";
import type { Page } from "@playwright/test";

const SERVER_ADDRESS = "play.paraguaycraft.com";

async function mockClipboardSuccess(page: Page) {
  await page.addInitScript(() => {
    (window as any).__clipboardWrites = [];
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          (window as any).__clipboardWrites.push(text);
        },
      },
    });
  });
}

async function mockClipboardFailure(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("clipboard denied");
        },
      },
    });
    // Legacy fallback also fails.
    document.execCommand = () => false;
  });
}

async function copiedTexts(page: Page): Promise<string[]> {
  return page.evaluate(() => (window as any).__clipboardWrites ?? []);
}

test.describe("A. JUGAR AHORA clipboard action", () => {
  test("copies the configured server address and shows success feedback", async ({ page }) => {
    await mockClipboardSuccess(page);
    await page.goto("/");

    await page.getByRole("button", { name: "JUGAR AHORA" }).click();

    await expect(page.getByRole("button", { name: "IP COPIADA" })).toBeVisible();
    expect(await copiedTexts(page)).toContain(SERVER_ADDRESS);
    await expect(page.getByText("Dirección IP copiada")).toBeVisible();
  });

  test("shows failure feedback and keeps the address available when copying fails", async ({ page }) => {
    await mockClipboardFailure(page);
    await page.goto("/");

    await page.getByRole("button", { name: "JUGAR AHORA" }).click();

    await expect(page.getByRole("button", { name: "NO SE PUDO COPIAR" })).toBeVisible();
    await expect(page.getByRole("button", { name: "IP COPIADA" })).not.toBeVisible();
    // The address stays visible for manual copying.
    await expect(page.getByText(SERVER_ADDRESS).first()).toBeVisible();
  });
});

test.describe("B. Header ENTRAR actions", () => {
  test("desktop ENTRAR copies the address without navigating to /play.paraguaycraft.com", async ({
    page,
  }) => {
    await mockClipboardSuccess(page);
    await page.goto("/");

    await page.getByRole("button", { name: "ENTRAR" }).click();

    await expect(page).toHaveURL(/\/$/);
    expect(await copiedTexts(page)).toContain(SERVER_ADDRESS);
    await expect(page.getByRole("button", { name: "IP COPIADA" })).toBeVisible();
  });

  test("desktop ENTRAR does not falsely report success when copying fails", async ({ page }) => {
    await mockClipboardFailure(page);
    await page.goto("/");

    await page.getByRole("button", { name: "ENTRAR" }).click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("button", { name: "IP COPIADA" })).not.toBeVisible();
    await expect(page.getByRole("button", { name: "NO SE PUDO COPIAR" })).toBeVisible();
    await expect(page.locator("header").getByRole("status")).toContainText(SERVER_ADDRESS);
  });

  test("mobile menu ENTRAR copies the address without navigating", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await mockClipboardSuccess(page);
    await page.goto("/");

    await page.getByLabel("Abrir menú").click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "ENTRAR" }).click();

    await expect(page).toHaveURL(/\/$/);
    expect(await copiedTexts(page)).toContain(SERVER_ADDRESS);
    await expect(dialog.getByRole("button", { name: "IP COPIADA" })).toBeVisible();
  });

  test("mobile menu ENTRAR does not falsely report success when copying fails", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await mockClipboardFailure(page);
    await page.goto("/");

    await page.getByLabel("Abrir menú").click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "ENTRAR" }).click();

    await expect(page).toHaveURL(/\/$/);
    await expect(dialog.getByRole("button", { name: "IP COPIADA" })).not.toBeVisible();
    await expect(dialog.getByRole("button", { name: "NO SE PUDO COPIAR" })).toBeVisible();
    await expect(dialog.getByRole("status")).toContainText(SERVER_ADDRESS);
  });
});
