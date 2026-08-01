import { test, expect } from "@playwright/test";

// Runs only in the `chromium-blumap-configured` project where the app is served
// with NEXT_PUBLIC_BLUEMAP_URL=https://map.example.test. The map iframe request
// is intercepted so no external network is contacted.
const MAP_URL = "https://map.example.test";

// Keeps the map iframe request pending until the returned release function runs.
// Fulfilling it immediately would fire onLoad and skip the loading timeout, so
// the timeout and retry states are exercised by leaving it pending and aborting
// it afterwards so cleanup never hangs.
async function holdMapRequests(page: import("@playwright/test").Page) {
  let requests = 0;
  let releaseRequest!: () => void;
  const pending = new Promise<void>((resolve) => {
    releaseRequest = resolve;
  });

  await page.route("**map.example.test**", async (route) => {
    requests += 1;
    await pending;
    await route.abort();
  });

  return {
    releaseRequest,
    getRequestCount: () => requests,
  };
}

test.describe("I. BlueMap – configured project", () => {
  test("map page shows the initial loading state and iframe uses the configured HTTPS URL", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    let requests = 0;
    let releaseResponse!: () => void;
    const responseReady = new Promise<void>((resolve) => {
      releaseResponse = resolve;
    });
    await page.route("**map.example.test**", async (route) => {
      requests += 1;
      await responseReady;
      await route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<html><body>map stub</body></html>",
      });
    });
    await page.goto("/mapa", { waitUntil: "domcontentloaded" });

    await expect(page.getByText("Cargando mapa...")).toBeVisible();

    const iframe = page.locator('iframe[title="Mapa interactivo de ParaguayCraft"]');
    await expect(iframe).toHaveAttribute("src", MAP_URL);
    await expect(iframe).toHaveAttribute("src", /^https:\/\//);
    await expect.poll(() => requests).toBe(1);
    await page.waitForTimeout(500);
    releaseResponse();
    // Dispatch after the delayed response so React's hydrated onLoad handler
    // is exercised deterministically across browser/server timing.
    await iframe.dispatchEvent("load");
    await expect(page.getByText("Cargando mapa...")).not.toBeVisible();
    await page.waitForTimeout(500);
    expect(requests).toBe(1);

    const hydrationErrors = errors.filter((text) =>
      /hydrat|did not match|text content/i.test(text),
    );
    expect(hydrationErrors).toEqual([]);
  });

  test("timeout state offers an external fallback link with safe semantics", async ({
    page,
  }) => {
    const { releaseRequest, getRequestCount } = await holdMapRequests(page);
    try {
      await page.clock.install();
      await page.goto("/mapa", { waitUntil: "domcontentloaded" });

      await expect(page.getByText("Cargando mapa...")).toBeVisible();
      await expect.poll(getRequestCount).toBe(1);
      await page.waitForTimeout(1_000);

      // Advance past the 15s loading timeout after the client effect has
      // scheduled it, without waiting in real time.
      await page.clock.runFor(16_000);

      await expect(page.getByText("El mapa está tardando en cargar.")).toBeVisible();
      expect(getRequestCount()).toBe(1);

      const fallback = page.getByRole("link", { name: "Abrir en pestaña nueva" });
      await expect(fallback).toHaveAttribute("href", MAP_URL);
      await expect(fallback).toHaveAttribute("target", "_blank");
      const rel = (await fallback.getAttribute("rel")) ?? "";
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    } finally {
      releaseRequest();
    }
  });

  test("retry button restarts the loading state", async ({ page }) => {
    const { releaseRequest, getRequestCount } = await holdMapRequests(page);
    try {
      await page.clock.install();
      await page.goto("/mapa", { waitUntil: "domcontentloaded" });

      await expect(page.getByText("Cargando mapa...")).toBeVisible();
      await expect.poll(getRequestCount).toBe(1);
      await page.waitForTimeout(1_000);
      await page.clock.runFor(16_000);
      await expect(page.getByText("El mapa está tardando en cargar.")).toBeVisible();

      await page.getByRole("button", { name: "Reintentar" }).click();
      await expect(page.getByText("Cargando mapa...")).toBeVisible();
      await expect.poll(getRequestCount).toBe(2);
    } finally {
      releaseRequest();
    }
  });

});
