import { test, expect, takeSnapshot } from '@chromatic-com/playwright';

test.describe('Playwright Dev Website', () => {
  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('get started link', async ({ page }, testInfo) => {
    await page.goto('https://playwright.dev/');
    // Click the get started link.
    takeSnapshot(page, testInfo);
    await page.getByRole('link', { name: 'Get started' }).click();
  });
});

test.describe('Chromatic', () => {
  test('Sign In Works', async ({ page }) => {
    await page.goto('https://www.chromatic.com/');
    await page
      .getByRole('heading', { name: 'Ship flawless UIs with less' })
      .click();
    await page
      .locator('div')
      .filter({ hasText: /^Get startedWatch demo$/ })
      .getByRole('link')
      .click();
    await page.getByRole('button', { name: 'Connect with GitHub' }).click();
  });
});
