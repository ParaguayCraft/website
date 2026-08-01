import { test, expect } from "./fixtures";
import type { Page } from "@playwright/test";

const ONLINE = {
  ok: true,
  server: {
    online: true,
    playersOnline: 42,
    playersMax: 100,
    version: "1.21+",
    address: "play.paraguaycraft.com",
  },
};

const OFFLINE = {
  ok: true,
  server: {
    online: false,
    playersOnline: 0,
    playersMax: 100,
    version: "1.21+",
    address: "play.paraguaycraft.com",
  },
};

const PROVIDER_UNAVAILABLE = {
  ok: false,
  error: "provider_unavailable",
};

const UNKNOWN_MAX = {
  ok: true,
  server: {
    online: true,
    playersOnline: 12,
    playersMax: null,
    version: "1.21+",
    address: "play.paraguaycraft.com",
  },
};

const OVER_MAX = {
  ok: true,
  server: {
    online: true,
    playersOnline: 150,
    playersMax: 100,
    version: "1.21+",
    address: "play.paraguaycraft.com",
  },
};

async function mockStatus(page: Page, body: unknown, status = 200) {
  await page.route("**/api/status", (route) =>
    route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(body),
    }),
  );
}

test.describe("F. Server status states", () => {
  test("online: shows online state, player count and a valid progress bar", async ({ page }) => {
    await mockStatus(page, ONLINE);
    await page.goto("/");

    await expect(page.getByText("42 jugadores conectados")).toBeVisible();
    await expect(page.getByText("EN LÍNEA", { exact: true })).toBeVisible();

    const bar = page.getByRole("progressbar");
    await expect(bar).toHaveAttribute("aria-valuenow", "42");
    await expect(bar).toHaveAttribute("aria-valuemax", "100");
    await expect(page.getByText("42 / 100")).toBeVisible();
  });

  test("offline: shows the genuine offline state, not provider-unavailable wording", async ({
    page,
  }) => {
    await mockStatus(page, OFFLINE);
    await page.goto("/");

    await expect(page.getByText("Servidor desconectado", { exact: true })).toBeVisible();
    await expect(page.getByText("DESCONECTADO", { exact: true })).toBeVisible();
    await expect(page.getByText("No se pudo consultar")).not.toBeVisible();
  });

  test("provider unavailable: distinct from offline, uses the failure contract", async ({
    page,
  }) => {
    await mockStatus(page, PROVIDER_UNAVAILABLE, 502);
    await page.goto("/");

    await expect(page.getByText("No se pudo consultar").first()).toBeVisible();
    await expect(page.getByText("NO SE PUDO CONSULTAR", { exact: true })).toBeVisible();
    await expect(page.getByText("Servidor desconectado")).not.toBeVisible();
    await expect(page.getByText("DESCONECTADO")).not.toBeVisible();
  });

  test("player counts above the maximum are clamped to valid progress values", async ({
    page,
  }) => {
    await mockStatus(page, OVER_MAX);
    await page.goto("/");

    await expect(page.getByText("150 jugadores conectados")).toBeVisible();
    await expect(page.getByText("100 / 100", { exact: true })).toBeVisible();

    const bar = page.getByRole("progressbar");
    await expect(bar).toHaveAttribute("aria-valuenow", "100");
    await expect(bar).toHaveAttribute("aria-valuemax", "100");

    const body = await page.locator("body").innerText();
    expect(body).not.toContain("NaN");
    expect(body).not.toContain("Infinity");
  });

  test("unknown player maximum: no invalid progress values are rendered", async ({ page }) => {
    await mockStatus(page, UNKNOWN_MAX);
    await page.goto("/");

    await expect(page.getByText("12 jugadores conectados")).toBeVisible();

    const body = await page.locator("body").innerText();
    expect(body).not.toContain("NaN");
    expect(body).not.toContain("Infinity");
    expect(body).not.toContain("NaN%");

    const bars = page.locator('[role="progressbar"]');
    const count = await bars.count();
    for (let i = 0; i < count; i++) {
      const max = await bars.nth(i).getAttribute("aria-valuemax");
      expect(max).not.toMatch(/NaN|Infinity/);
    }
  });
});

test.describe("G. Shared status polling", () => {
  test("exactly one initial status request is shared by both status displays", async ({
    page,
  }) => {
    let requests = 0;
    await page.route("**/api/status", (route) => {
      requests += 1;
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(ONLINE),
      });
    });

    await page.goto("/");
    await expect(page.getByText("42 jugadores conectados")).toBeVisible();
    await expect(page.getByText("EN LÍNEA", { exact: true })).toBeVisible();

    expect(requests).toBe(1);
  });

  test("one additional request occurs after one polling interval, not doubled", async ({
    page,
  }) => {
    let requests = 0;
    await page.route("**/api/status", (route) => {
      requests += 1;
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(ONLINE),
      });
    });

    await page.clock.install();
    await page.goto("/");
    await expect(page.getByText("42 jugadores conectados")).toBeVisible();
    expect(requests).toBe(1);

    await page.clock.fastForward(31_000);
    await expect.poll(() => requests).toBe(2);
  });

  test("provider failure keeps last-known data visible and marks it stale", async ({ page }) => {
    let requests = 0;
    await page.route("**/api/status", (route) => {
      requests += 1;
      const body = requests === 1 ? ONLINE : requests === 2 ? PROVIDER_UNAVAILABLE : ONLINE;
      return route.fulfill({
        status: requests === 2 ? 502 : 200,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });

    await page.clock.install();
    await page.goto("/");
    await expect(page.getByText("42 / 100", { exact: true })).toBeVisible();
    expect(requests).toBe(1);

    await page.clock.fastForward(30_000);
    await expect.poll(() => requests).toBe(2);
    await expect(page.getByText("NO SE PUDO CONSULTAR", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Mostrando el último estado conocido; puede estar desactualizado.", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByText("42 / 100", { exact: true })).toBeVisible();
    await expect(page.getByText("DESCONECTADO", { exact: true })).not.toBeVisible();

    const announcement = page.locator('p[aria-live="polite"]').filter({
      hasText: "No se pudo actualizar el estado",
    });
    await expect(announcement).toHaveText(
      "No se pudo actualizar el estado. Mostrando el último estado conocido.",
    );

    await page.clock.fastForward(30_000);
    await expect.poll(() => requests).toBe(3);
    await expect(page.getByText("EN LÍNEA", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Mostrando el último estado conocido; puede estar desactualizado.", {
        exact: true,
      }),
    ).not.toBeVisible();
  });
});
