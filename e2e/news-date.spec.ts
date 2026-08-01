import { test, expect } from "./fixtures";

test.describe("E. Paraguay date rendering", () => {
  test("news date-only values render on the correct calendar day in Paraguay", async ({
    page,
  }) => {
    await page.goto("/noticias");

    const time = page.locator('time[datetime="2026-07-25"]').first();
    await expect(time).toBeVisible();

    // Locale-tolerant: the day must be 25 (July), not 24 from UTC parsing.
    const text = (await time.textContent()) ?? "";
    const dayMatch = text.match(/\d{1,2}/);
    expect(dayMatch).not.toBeNull();
    expect(Number(dayMatch![0])).toBe(25);
    expect(text.toLowerCase()).toContain("jul");
  });

  test("homepage news card also renders the date without a UTC shift", async ({ page }) => {
    await page.goto("/");

    const time = page.locator('time[datetime="2026-07-25"]').first();
    await expect(time).toBeVisible();

    const text = (await time.textContent()) ?? "";
    const dayMatch = text.match(/\d{1,2}/);
    expect(dayMatch).not.toBeNull();
    expect(Number(dayMatch![0])).toBe(25);
    expect(text.toLowerCase()).toContain("jul");
  });
});
