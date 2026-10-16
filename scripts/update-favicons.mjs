import { chromium } from '@playwright/test';
import fs from 'fs';

async function run() {
  // 1. Copy HD logo over thozha-logo.png
  fs.copyFileSync(
    'c:/Users/subashaathees/Desktop/Projects/Thozha/Thozha/public/images/thozha/thozha-logo-hd.png',
    'c:/Users/subashaathees/Desktop/Projects/Thozha/Thozha/public/images/thozha/thozha-logo.png'
  );
  console.log('Updated public/images/thozha/thozha-logo.png');

  // 2. Generate crisp favicon PNG (128x128)
  const browser = await chromium.launch({ channel: 'msedge' }).catch(() => chromium.launch({ channel: 'chrome' }));
  const page = await browser.newPage();

  const logoBase64 = fs.readFileSync('c:/Users/subashaathees/Desktop/Projects/Thozha/Thozha/public/images/thozha/thozha-logo.png').toString('base64');

  const faviconBase64 = await page.evaluate(async (b64) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        // Center the logo in 128x128
        const scale = Math.min(128 / img.width, 128 / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (128 - w) / 2;
        const y = (128 - h) / 2;

        ctx.drawImage(img, x, y, w, h);
        resolve(canvas.toDataURL('image/png').split(',')[1]);
      };
      img.src = 'data:image/png;base64,' + b64;
    });
  }, logoBase64);

  fs.writeFileSync('c:/Users/subashaathees/Desktop/Projects/Thozha/Thozha/public/favicon.png', Buffer.from(faviconBase64, 'base64'));
  console.log('Created public/favicon.png');

  await browser.close();
}

run().catch(console.error);
