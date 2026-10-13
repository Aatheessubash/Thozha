import { expect, test } from '@playwright/test'

test('publishes the requested routes and honest fallback labels', async ({ page }) => {
  await page.goto('./projects')
  await expect(page.getByRole('heading', { name: 'Spaces shaped with purpose.' })).toBeVisible()
  await expect(page.getByText('Illustrative concept').first()).toBeVisible()

  await page.goto('./services')
  await expect(page.getByRole('link', { name: /2D Building Plans/ })).toBeVisible()

  await page.goto('./process')
  await expect(page.getByRole('heading', { name: 'Planning & Design' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Construction & Handover' })).toBeVisible()

  await page.goto('./contact')
  await expect(page.getByRole('heading', { name: "Let's Build Something Meaningful." })).toBeVisible()
  await page.getByRole('button', { name: /Send Enquiry/ }).click()
  await expect(page.getByText('Enter your full name.')).toBeVisible()
  await expect(page.getByText('Enter a valid Indian mobile number.')).toBeVisible()
})

test('keeps the redesigned mobile pages inside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('./')
  await expect(page.locator('.cinematic-intro')).toBeVisible({ timeout: 15_000 })
  const homeOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(homeOverflow).toBeLessThanOrEqual(1)

  await page.goto('./services')
  const servicesOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(servicesOverflow).toBeLessThanOrEqual(1)
})
