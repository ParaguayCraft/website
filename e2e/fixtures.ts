import { test as base, expect } from "@playwright/test";

// Every test that renders the homepage triggers the shared ServerStatusProvider,
// which would otherwise contact the live status API. Stub it by default so the
// suite never depends on live services; status-specific specs override the route.
const DEFAULT_STATUS = {
  ok: true,
  server: {
    online: false,
    playersOnline: 0,
    playersMax: 100,
    version: "1.21+",
    address: "play.paraguaycraft.com",
  },
};

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("**/api/status", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(DEFAULT_STATUS),
      }),
    );
    await use(page);
  },
});

export { expect };
