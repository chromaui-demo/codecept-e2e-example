import { test, expect, takeSnapshot } from '@chromatic-com/playwright';

test.use({ diffThreshold: 0.5, viewport: { width: 240, height: 320 } });
// Then use as normal 👇
test('Vocera Loading Screen', async ({ page }, testInfo) => {
  await page.goto(
    'https://www.flickr.com/photos/201080411@N02/53864021312/in/dateposted-public/lightbox/'
  );
});
