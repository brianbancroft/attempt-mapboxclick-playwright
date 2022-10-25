// @ts-check
import { test, expect } from "@playwright/test";

test("App has title and header", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page).toHaveTitle("Mapbox + E2E");

  // Expect a title "to contain" a substring.
  await page.isVisible("text='testing environment using playwright'");

  // create a locator
  const header = page.getByText("testing environment using playwright");

  // Expect an attribute "to be strictly equal" to the value.
  await expect(header).toBeVisible();
});

test("App has a map", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const map = await page.locator('[aria-label="Map"]');

  await expect(map).toBeVisible();
});

test("Map click triggers popup", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const map = await page.locator('[aria-label="Map"]');

  await page.mouse.click(100, 100);

  await page.mouse.click(200, 200);
  await page.mouse.click(300, 300);

  await page.pause();

  const popupLabel = "summary data";
  const popup = page.getByText(popupLabel);

  await expect(popup).toBeVisible();
});
