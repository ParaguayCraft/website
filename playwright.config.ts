import { defineConfig, devices } from "@playwright/test";

const DEFAULT_PORT = 3100;
const BLUEMAP_PORT = 3200;

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://localhost:${DEFAULT_PORT}`,
    timezoneId: "America/Asuncion",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${DEFAULT_PORT}` },
      testIgnore: /bluemap-configured\.spec\.ts/,
    },
    {
      name: "chromium-blumap-configured",
      use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${BLUEMAP_PORT}` },
      testMatch: /bluemap-configured\.spec\.ts/,
    },
  ],
  webServer: [
    {
      // Default instance: NEXT_PUBLIC_BLUEMAP_URL unset → config-missing BlueMap state.
      command: `npm run build && npm run start -- -p ${DEFAULT_PORT}`,
      port: DEFAULT_PORT,
      reuseExistingServer: !process.env.CI,
      timeout: 300_000,
      env: { ...process.env, NEXT_PUBLIC_BLUEMAP_URL: "" },
    },
    {
      // Configured instance: served from an isolated copy so the env var is baked in.
      command: `node e2e/scripts/bluemap-server.mjs`,
      port: BLUEMAP_PORT,
      reuseExistingServer: !process.env.CI,
      timeout: 300_000,
    },
  ],
});
