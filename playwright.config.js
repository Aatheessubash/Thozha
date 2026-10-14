import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 8_000 },
  use: {
    baseURL: 'http://localhost:5179/',
    browserName: 'chromium',
    channel: 'chrome',
    headless: true,
    reducedMotion: 'no-preference',
  },
  webServer: {
    command: 'npm run dev -- --port 5179',
    url: 'http://localhost:5179/',
    reuseExistingServer: true,
    timeout: 30_000,
  },
})
