import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollFrameController
 * Bridges GSAP ScrollTrigger, page scroll progress, and smooth frame interpolation loop.
 * Operates without React re-renders on scroll ticks.
 */
export class ScrollFrameController {
  constructor({
    triggerElement,
    pinElement,
    canvasApi,
    getFrame,
    prioritizeWindow,
    subscribeFrames,
    frameCount = 65,
    onProgress,
    onScrollStateChange,
    smoothing = 15,
  }) {
    this.triggerElement = triggerElement
    this.pinElement = pinElement
    this.canvasApi = canvasApi
    this.getFrame = getFrame
    this.prioritizeWindow = prioritizeWindow
    this.subscribeFrames = subscribeFrames
    this.frameCount = frameCount
    this.onProgress = onProgress
    this.onScrollStateChange = onScrollStateChange
    this.smoothing = smoothing

    this.currentFrame = 1
    this.targetFrame = 1
    this.lastRenderedIndex = -1
    this.isTicking = false
    this.hasScrolled = false
    this.destroyed = false
    this.scrollTrigger = null
    this.rafId = null
    this.lastTickTime = 0
    this.unsubscribeFrames = null

    this.init()
  }

  init() {
    if (!this.triggerElement || this.destroyed) return

    // Reduced motion check
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Just render first frame statically
      const initialImg = this.getFrame(1)
      if (initialImg) {
        this.canvasApi?.renderFrame(1, initialImg)
      }
      return
    }

    const navOffset = () => (window.innerWidth <= 1100 ? 66 : 78)

    // CSS sticky performs the pin; ScrollTrigger only maps the reserved distance.
    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.triggerElement,
      start: () => `top ${navOffset()}px`,
      end: 'bottom bottom',
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (this.destroyed) return

        const progress = self.progress
        const sequenceProgress = Math.min(progress / 0.9, 1)
        this.targetFrame = 1 + sequenceProgress * (this.frameCount - 1)
        this.triggerElement.dataset.scrollProgress = progress.toFixed(4)
        this.triggerElement.dataset.pinActive = self.isActive ? 'true' : 'false'

        if (!this.hasScrolled && progress > 0.015) {
          this.hasScrolled = true
          this.onScrollStateChange?.(true)
        }

        // Notify UI overlay of current scroll progress
        this.onProgress?.(progress)

        // Prioritize loading frames in vicinity
        this.prioritizeWindow?.(Math.round(this.targetFrame))

        // Start animation loop if not already running
        this.startInterpolation()
      },
    })

    this.unsubscribeFrames = this.subscribeFrames?.(({ lastLoadedIndex }) => {
      if (this.destroyed || !lastLoadedIndex) return
      const targetIndex = Math.round(this.targetFrame)
      if (Math.abs(lastLoadedIndex - targetIndex) <= 3) {
        this.tick(true)
      }
    })

    // Initial render of first frame
    this.tick(true)

    // Ensure ScrollTrigger measures accurate viewport geometry
    requestAnimationFrame(() => {
      if (!this.destroyed) {
        ScrollTrigger.refresh()
      }
    })
  }

  startInterpolation() {
    if (this.isTicking || this.destroyed) return
    this.isTicking = true
    this.loop()
  }

  loop = () => {
    if (this.destroyed) return

    const now = performance.now()
    const deltaSeconds = this.lastTickTime ? Math.min((now - this.lastTickTime) / 1000, 0.05) : 1 / 60
    this.lastTickTime = now
    this.tick(false, deltaSeconds)

    const diff = Math.abs(this.targetFrame - this.currentFrame)
    if (diff > 0.01) {
      this.rafId = requestAnimationFrame(this.loop)
    } else {
      this.currentFrame = this.targetFrame
      this.tick()
      this.isTicking = false
      this.rafId = null
      this.lastTickTime = 0
    }
  }

  tick(force = false, deltaSeconds = 1 / 60) {
    if (this.destroyed) return

    // Time-based damping stays consistent across 60/120Hz screens and busy frames.
    const blend = 1 - Math.exp(-this.smoothing * deltaSeconds)
    this.currentFrame += (this.targetFrame - this.currentFrame) * blend
    const roundedIndex = Math.max(1, Math.min(this.frameCount, Math.round(this.currentFrame)))
    const img = this.getFrame(roundedIndex)

    if (
      (roundedIndex !== this.lastRenderedIndex || force || (img && this.canvasApi?.getCurrentImage?.() !== img)) &&
      img &&
      this.canvasApi
    ) {
      this.canvasApi.renderFrame(roundedIndex, img)
      this.lastRenderedIndex = roundedIndex
    }
  }

  updateFrameCount(count) {
    this.frameCount = count
  }

  destroy() {
    this.destroyed = true
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    if (this.scrollTrigger) {
      this.scrollTrigger.kill()
      this.scrollTrigger = null
    }
    this.unsubscribeFrames?.()
    this.unsubscribeFrames = null
  }
}

