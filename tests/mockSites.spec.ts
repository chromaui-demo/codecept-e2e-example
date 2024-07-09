import { test, expect, takeSnapshot } from '@chromatic-com/playwright';

test.use({ diffThreshold: 0.3, viewport: { width: 400, height: 200 } });
// Then use as normal 👇
test('Vocera Loading Screen', async ({ page }, testInfo) => {
  await page.goto(
    'https://www.flickr.com/photos/201004774@N05/53846566029/in/dateposted-public/lightbox/'
  );
});
