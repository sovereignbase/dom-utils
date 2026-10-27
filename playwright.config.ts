import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4173'
const webServer = process.env.PLAYWRIGHT_BASE_URL
  ? undefined
  : {
      command: 'node test/e2e/runsInBrowsers/server.mjs',
      url: baseURL,
      env: {
        ...process.env,
        PORT: new URL(baseURL).port || '4173',
      },
      reuseExistingServer: !process.env.CI,
    }

export default defineConfig({
  testDir: 'test/e2e/runsInBrowsers',
  testMatch: '**/*.spec.ts',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer,
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
})
