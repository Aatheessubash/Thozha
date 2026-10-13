import { expect, test } from '@playwright/test'

async function waitForHero(page) {
  await page.goto('./')
  await expect(page.locator('.sticky-canvas canvas')).toBeVisible()
  await expect(page.locator('.cinematic-overlay')).toBeVisible({ timeout: 15_000 })
}

async function heroState(page) {
  return page.evaluate(() => {
    const hero = document.querySelector('.architecture-scroll')
    const canvas = document.querySelector('.sticky-canvas canvas')
    const projects = document.querySelector('#projects')
    const nav = document.querySelector('.premium-nav')
    const canvasRect = canvas.getBoundingClientRect()
    return {
      scrollY: window.scrollY,
      frame: Number(canvas.dataset.frame || 0),
      frameCount: Number(hero.dataset.frameCount || 0),
      sequence: hero.dataset.sequence,
      progress: Number(hero.dataset.scrollProgress || 0),
      pinned: hero.dataset.pinActive,
      canvasTop: Math.round(canvasRect.top),
      canvasBottom: Math.round(canvasRect.bottom),
      navBottom: Math.round(nav.getBoundingClientRect().bottom),
      projectsTop: Math.round(projects.getBoundingClientRect().top),
      viewportHeight: window.innerHeight,
    }
  })
}

test.describe('architectural frame-sequence hero', () => {
  test('pins the page, advances frames, holds, releases, and reverses', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await waitForHero(page)

    const initial = await heroState(page)
    expect(initial.sequence).toBe('desktop')
    expect(initial.frameCount).toBe(262)
    expect(initial.frame).toBe(1)
    expect(initial.canvasTop).toBe(initial.navBottom)

    await page.mouse.move(720, 500)
    await page.mouse.wheel(0, 900)
    await page.waitForTimeout(900)
    const early = await heroState(page)
    expect(early.frame).toBeGreaterThan(1)
    expect(early.frame).toBeLessThan(initial.frameCount * 0.4)
    expect(early.canvasTop).toBe(early.navBottom)
    expect(early.projectsTop).toBeGreaterThan(early.viewportHeight)

    await page.mouse.wheel(0, 1300)
    await page.waitForTimeout(1000)
    const middle = await heroState(page)
    expect(middle.frame).toBeGreaterThan(early.frame)
    expect(middle.canvasTop).toBe(middle.navBottom)
    expect(middle.projectsTop).toBeGreaterThan(middle.viewportHeight)

    await page.mouse.wheel(0, 1200)
    await page.waitForTimeout(1000)
    const hold = await heroState(page)
    expect(hold.frame).toBeGreaterThanOrEqual(initial.frameCount - 5)
    expect(hold.canvasTop).toBe(hold.navBottom)
    expect(hold.projectsTop).toBeGreaterThanOrEqual(hold.viewportHeight - 5)

    await page.mouse.wheel(0, 600)
    await page.waitForTimeout(1000)
    const released = await heroState(page)
    expect(released.frame).toBe(initial.frameCount)
    expect(released.projectsTop).toBeLessThan(released.viewportHeight)

    await page.mouse.wheel(0, -1700)
    await page.waitForTimeout(1200)
    const reversed = await heroState(page)
    expect(reversed.frame).toBeLessThan(hold.frame)
    expect(reversed.canvasTop).toBe(reversed.navBottom)
  })

  test('keeps the mobile hero pinned while the frames advance', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await waitForHero(page)
    await page.mouse.move(195, 420)
    await page.mouse.wheel(0, 1000)
    await page.waitForTimeout(1000)

    const state = await heroState(page)
    expect(state.sequence).toBe('mobile')
    expect(state.frameCount).toBe(69)
    expect(state.frame).toBeGreaterThan(1)
    expect(state.canvasTop).toBe(state.navBottom)
    expect(state.projectsTop).toBeGreaterThan(state.viewportHeight)
  })

  test('advances progressively across small wheel movements', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await waitForHero(page)
    await page.mouse.move(720, 500)

    const frames = []
    for (let index = 0; index < 6; index += 1) {
      await page.mouse.wheel(0, 140)
      await page.waitForTimeout(180)
      frames.push((await heroState(page)).frame)
    }

    expect(new Set(frames).size).toBeGreaterThanOrEqual(5)
    expect(frames.every((frame, index) => index === 0 || frame >= frames[index - 1])).toBe(true)
    expect(frames.at(-1)).toBeLessThan((await heroState(page)).frameCount * 0.4)
  })
})
