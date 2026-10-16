import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge' }).catch(() => chromium.launch({ channel: 'chrome' }));
  const page = await browser.newPage();

  // Load the user's uploaded JPG, make black background transparent, and save as 1024x655 PNG
  const jpgBase64 = fs.readFileSync('C:/Users/subashaathees/.gemini/antigravity-ide/brain/88ab9314-497c-4f94-88d7-c014fcbe19fd/.user_uploaded/media_1792125906437.jpg').toString('base64');

  const transparentPngBase64 = await page.evaluate(async (b64) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Process pixels: remove pure black/near black background with smooth feathering
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = Math.max(r, g, b);

          if (brightness < 12) {
            data[i + 3] = 0; // fully transparent
          } else if (brightness < 30) {
            // Smooth edge transition
            data[i + 3] = Math.round(((brightness - 12) / 18) * 255);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png').split(',')[1]);
      };
      img.src = 'data:image/jpeg;base64,' + b64;
    });
  }, jpgBase64);

  fs.writeFileSync('c:/Users/subashaathees/Desktop/Projects/Thozha/Thozha/public/images/thozha/thozha-logo-hd.png', Buffer.from(transparentPngBase64, 'base64'));
  console.log('Successfully created transparent HD logo: thozha-logo-hd.png');

  await browser.close();
}

run().catch(console.error);
