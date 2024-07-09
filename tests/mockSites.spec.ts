import { test, expect, takeSnapshot } from '@chromatic-com/playwright';

test.use({ diffThreshold: 0.3, viewport: { width: 400, height: 200 } });
// Then use as normal 👇
test('Vocera Loading Screen', async ({ page }, testInfo) => {
  await page.goto('http://[::]:8000/public/baseline_image.png');
});
