import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 8_000 },
  use: {
    baseURL: 'http://127.0.0.1:5173/thozha/',
    browserName: 'chromium',
    channel: 'chrome',
    headless: true,
    reducedMotion: 'no-preference',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173/thozha/',
    reuseExistingServer: true,
    timeout: 30_000,
  },
})
