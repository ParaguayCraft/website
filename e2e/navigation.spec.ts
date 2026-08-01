import { test, expect } from "./fixtures";
import type { Locator, Page } from "@playwright/test";

function navLink(page: Page, label: string): Locator {
  return page
    .locator('nav[aria-label="Navegación principal"]')
    .getByRole("link", { name: label, exact: true });
}

async function expectActive(page: Page, label: string, active: boolean) {
  const link = navLink(page, label);
  if (active) {
    await expect(link).toHaveAttribute("aria-current", "page");
  } else {
    await expect(link).not.toHaveAttribute("aria-current");
  }
}

test.describe("C. Active navigation state", () => {
  test("homepage marks Inicio active and no other item", async ({ page }) => {
    await page.goto("/");
    await expectActive(page, "Inicio", true);
    await expectActive(page, "Información", false);
    await expectActive(page, "Mapa", false);
    await expectActive(page, "Discord", false);
    await expect(navLink(page, "Reglas")).toHaveCount(0);
  });

  test("Información is active on /informacion and Inicio is not permanently active", async ({
    page,
  }) => {
    await page.goto("/informacion");
    await expectActive(page, "Información", true);
    await expectActive(page, "Inicio", false);
  });

  test("Mapa is active on /mapa", async ({ page }) => {
    await page.goto("/mapa");
    await expectActive(page, "Mapa", true);
    await expectActive(page, "Inicio", false);
  });

  test("Reglas remains a valid route without a navigation entry", async ({ page }) => {
    await page.goto("/reglas");
    await expect(page).toHaveURL(/\/reglas/);
    await expect(navLink(page, "Reglas")).toHaveCount(0);
    await expectActive(page, "Inicio", false);
  });

  test("no navigation item is highlighted on /noticias", async ({ page }) => {
    await page.goto("/noticias");
    await expectActive(page, "Inicio", false);
    await expectActive(page, "Información", false);
    await expectActive(page, "Mapa", false);
    await expectActive(page, "Discord", false);
  });

  test("external Discord link never receives the internal active state", async ({ page }) => {
    await page.goto("/");
    await expectActive(page, "Discord", false);
    await page.goto("/informacion");
    await expectActive(page, "Discord", false);
  });
});

test.describe("D. Internal and external link semantics", () => {
  test("/noticias is a valid route", async ({ page }) => {
    await page.goto("/noticias");
    await expect(
      page.getByRole("heading", { level: 1, name: "Noticias" }),
    ).toBeVisible();
  });

  test("homepage news button reaches /noticias in the same tab", async ({ page }) => {
    await page.goto("/");
    const newsButton = page.getByRole("link", { name: "VER TODAS LAS NOTICIAS" });

    await expect(newsButton).not.toHaveAttribute("target", "_blank");
    await newsButton.click();

    await expect(page).toHaveURL(/\/noticias/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Noticias" }),
    ).toBeVisible();
  });

  test("internal navigation links do not open a new tab", async ({ page }) => {
    await page.goto("/");
    for (const label of ["Inicio", "Información", "Mapa"]) {
      await expect(navLink(page, label)).not.toHaveAttribute("target", "_blank");
    }
    await expect(navLink(page, "Reglas")).toHaveCount(0);
  });

  test("Discord links use a valid HTTPS URL and secure new-tab semantics", async ({ page }) => {
    await page.goto("/");

    const navDiscord = navLink(page, "Discord");
    await expect(navDiscord).toHaveAttribute("href", /^https:\/\//);
    await expect(navDiscord).toHaveAttribute("target", "_blank");
    await expect(navDiscord).not.toHaveAttribute("aria-current");
    const navRel = (await navDiscord.getAttribute("rel")) ?? "";
    expect(navRel).toContain("noopener");
    expect(navRel).toContain("noreferrer");

    const discordLinks = page.locator('a[href^="https://"]');
    const heroDiscord = page.locator("main a", { hasText: "Discord" }).first();
    await expect(heroDiscord).toHaveAttribute("href", /^https:\/\//);
    await expect(heroDiscord).toHaveAttribute("target", "_blank");
    const rel = (await heroDiscord.getAttribute("rel")) ?? "";
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
    await expect(discordLinks.first()).toBeVisible();
  });

  test("no visible user-facing link points to href=#", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
    await page.goto("/contacto");
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
  });

  test("no navigation link points to /play.paraguaycraft.com", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator('nav[aria-label="Navegación principal"]');
    await expect(nav.locator('a[href*="play.paraguaycraft.com"]')).toHaveCount(0);
  });
});
