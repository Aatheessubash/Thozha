import { chromium } from '@playwright/test';
import { preview } from 'vite';

async function run() {
  const server = await preview({ preview: { port: 4174 } });
  const browser = await chromium.launch({ channel: 'msedge' }).catch(() => chromium.launch({ channel: 'chrome' }));

  // 1. Mobile Top View (Header with Logo)
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  await mobilePage.goto('http://localhost:4174/');
  await mobilePage.waitForLoadState('networkidle');
  await mobilePage.screenshot({ path: 'C:/Users/subashaathees/.gemini/antigravity-ide/brain/88ab9314-497c-4f94-88d7-c014fcbe19fd/mobile_header_with_logo.png' });

  // 2. Mobile Footer View
  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({ path: 'C:/Users/subashaathees/.gemini/antigravity-ide/brain/88ab9314-497c-4f94-88d7-c014fcbe19fd/mobile_footer_with_logo.png' });

  // 3. Overflow check
  for (const w of [320, 360, 375, 390, 412]) {
    await mobilePage.setViewportSize({ width: w, height: 700 });
    await mobilePage.goto('http://localhost:4174/');
    await mobilePage.waitForLoadState('networkidle');
    const diff = await mobilePage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`Width ${w} overflow diff: ${diff}`);
  }

  // 4. Desktop View
  const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await desktopPage.goto('http://localhost:4174/');
  await desktopPage.waitForLoadState('networkidle');
  await desktopPage.screenshot({ path: 'C:/Users/subashaathees/.gemini/antigravity-ide/brain/88ab9314-497c-4f94-88d7-c014fcbe19fd/desktop_with_logo.png' });

  await browser.close();
  await server.close();
  console.log('All tests completed successfully');
}

run().catch(console.error);
