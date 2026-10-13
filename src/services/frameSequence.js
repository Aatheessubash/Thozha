/**
 * Smart Frame Sequence Loader & Cache Manager
 * Handles responsive frame resolution, progressive prioritized preloading,
 * off-thread image decoding, and graceful fallbacks.
 */

export function resolveAssetUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) {
    return path
  }
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const cleanPath = path.replace(/^\//, '')
  return base ? `${base}/${cleanPath}` : `/${cleanPath}`
}

export function formatFrameUrl(pattern, frameIndex) {
  // Supports %04d, %05d, %d, {index}
  let filename = pattern
  if (/%05d/.test(pattern)) {
    filename = pattern.replace('%05d', String(frameIndex).padStart(5, '0'))
  } else if (/%04d/.test(pattern)) {
    filename = pattern.replace('%04d', String(frameIndex).padStart(4, '0'))
  } else if (/%03d/.test(pattern)) {
    filename = pattern.replace('%03d', String(frameIndex).padStart(3, '0'))
  } else if (/%d/.test(pattern)) {
    filename = pattern.replace('%d', String(frameIndex))
  } else if (/\{index\}/.test(pattern)) {
    filename = pattern.replace('{index}', String(frameIndex).padStart(4, '0'))
  }
  return resolveAssetUrl(filename)
}

export class FrameSequenceLoader {
  constructor(options = {}) {
    this.frameCount = options.frameCount || 65
    this.desktopPattern = options.desktopPattern || 'frames/frame_%04d.webp'
    this.mobilePattern = options.mobilePattern || 'frames/mobile/frame_%04d.webp'
    this.fallbackPattern = options.fallbackPattern || 'vid/frames_desktop/frame%05d.png'
    this.isMobile = options.isMobile || false

    this.cache = new Map() // index -> HTMLImageElement
    this.loading = new Set()
    this.failed = new Set()
    this.loadedEver = new Set()
    this.listeners = new Set()
    this.isDisposed = false
    this.isReady = false
    this.loadedCount = 0

    // Concurrency limit for background loading
    this.concurrencyLimit = options.concurrencyLimit || 4
    this.activeRequests = 0
    this.queue = []
    this.focusIndex = 1
    this.maxCachedFrames = this.isMobile ? 56 : 84
    this.anchorFrames = []
  }

  setMobile(isMobile) {
    if (this.isMobile !== isMobile) {
      this.isMobile = isMobile
      // Clear cache when switching media query if desired, or keep both
    }
  }

  getPrimaryPattern() {
    return this.isMobile ? this.mobilePattern : this.desktopPattern
  }

  getUrlForFrame(index, useFallback = false) {
    const pattern = useFallback ? this.fallbackPattern : this.getPrimaryPattern()
    return formatFrameUrl(pattern, index)
  }

  trimCache() {
    if (this.cache.size <= this.maxCachedFrames) return

    const protectedFrames = new Set([1, this.frameCount, ...this.anchorFrames])
    const removable = [...this.cache.keys()]
      .filter((index) => !protectedFrames.has(index))
      .sort((a, b) => Math.abs(b - this.focusIndex) - Math.abs(a - this.focusIndex))

    while (this.cache.size > this.maxCachedFrames && removable.length) {
      this.cache.delete(removable.shift())
    }
  }

  subscribe(listener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  notify(lastLoadedIndex = null) {
    if (this.isDisposed) return
    const progress = Math.round((this.loadedCount / this.frameCount) * 100)
    for (const listener of this.listeners) {
      listener({
        loadedCount: this.loadedCount,
        frameCount: this.frameCount,
        progress,
        isReady: this.isReady,
        lastLoadedIndex,
      })
    }
  }

  /**
   * Loads an individual image with off-thread decode
   */
  async loadSingleImage(index) {
    if (this.cache.has(index) || this.loading.has(index) || this.isDisposed) {
      return this.cache.get(index)
    }

    this.loading.add(index)

    const tryLoad = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.decoding = 'async'
        img.fetchPriority = index <= 12 ? 'high' : 'low'
        img.src = src

        const handleSuccess = async () => {
          try {
            if ('decode' in img) {
              await img.decode()
            }
          } catch {
            // decode error ignored if browser rendered it already
          }
          resolve(img)
        }

        if (img.complete && img.naturalWidth > 0) {
          handleSuccess()
        } else {
          img.onload = handleSuccess
          img.onerror = reject
        }
      })

    const primaryUrl = this.getUrlForFrame(index, false)
    try {
      const img = await tryLoad(primaryUrl)
      if (!this.isDisposed) {
        this.cache.set(index, img)
        this.loadedEver.add(index)
        this.loadedCount = this.loadedEver.size
        this.trimCache()
      }
      return img
    } catch {
      // Try fallback pattern (e.g. PNG original)
      try {
        const fallbackUrl = this.getUrlForFrame(index, true)
        const img = await tryLoad(fallbackUrl)
        if (!this.isDisposed) {
          this.cache.set(index, img)
          this.loadedEver.add(index)
          this.loadedCount = this.loadedEver.size
          this.trimCache()
        }
        return img
      } catch {
        this.failed.add(index)
        return null
      }
    } finally {
      this.loading.delete(index)
    }
  }

  /**
   * Process background queue with bounded concurrency
   */
  processQueue() {
    if (this.isDisposed) return

    while (this.activeRequests < this.concurrencyLimit && this.queue.length > 0) {
      const index = this.queue.shift()
      if (this.cache.has(index) || this.loading.has(index)) {
        continue
      }

      this.activeRequests++
      this.loadSingleImage(index)
        .then((image) => {
          if (image) this.notify(index)
        })
        .finally(() => {
          this.activeRequests--
          this.processQueue()
        })
    }
  }

  /**
   * Prioritized initialization:
   * 1. Loads first frame immediately (1).
   * 2. Loads key milestone anchors (e.g. 15, 30, 45, 65).
   * 3. Once first frame and critical anchors are loaded, marks as ready.
   * 4. Queues remaining frames progressively.
   */
  async start() {
    if (this.isDisposed) return

    // Critical wave 1: Frame 1 (entry view)
    const firstImg = await this.loadSingleImage(1)
    if (firstImg) {
      this.isReady = true
      this.notify(1)
    }

    // Critical wave 2: 4 evenly spaced anchors
    const anchors = [
      Math.round(this.frameCount * 0.25),
      Math.round(this.frameCount * 0.5),
      Math.round(this.frameCount * 0.75),
      this.frameCount,
    ].filter((idx) => idx > 1 && idx <= this.frameCount)
    this.anchorFrames = anchors

    const anchorResults = await Promise.allSettled(anchors.map((idx) => this.loadSingleImage(idx)))
    this.isReady = true
    anchorResults.forEach((result, resultIndex) => {
      if (result.status === 'fulfilled' && result.value) this.notify(anchors[resultIndex])
    })

    // Warm only the opening run. The remaining sequence is loaded around the
    // user's live scroll position instead of decoding every frame up front.
    const remaining = []
    const initialRunEnd = Math.min(this.frameCount, this.isMobile ? 20 : 32)
    for (let i = 2; i <= initialRunEnd; i++) {
      if (!this.cache.has(i) && !anchors.includes(i)) remaining.push(i)
    }
    this.queue = remaining
    this.processQueue()
  }

  /**
   * Prioritizes frames around the user's current scrub location
   */
  prioritizeWindow(centerIndex, radius = this.isMobile ? 18 : 24) {
    if (this.isDisposed) return
    this.focusIndex = centerIndex
    const priority = []
    const start = Math.max(1, centerIndex - radius)
    const end = Math.min(this.frameCount, centerIndex + radius)

    for (let i = start; i <= end; i++) {
      if (!this.cache.has(i) && !this.loading.has(i)) {
        priority.push(i)
      }
    }

    if (priority.length > 0) {
      // Re-order queue so these frames are next
      this.queue = [
        ...priority,
        ...this.queue.filter((idx) => !priority.includes(idx)),
      ]
      this.processQueue()
    }
  }

  /**
   * Gets image for the requested 1-based frame index.
   * If exact frame is still preloading, returns the closest loaded neighbor.
   */
  getFrame(frameIndex) {
    const target = Math.max(1, Math.min(this.frameCount, Math.round(frameIndex)))

    if (this.cache.has(target)) {
      return this.cache.get(target)
    }

    // Fallback to nearest loaded frame to prevent any blank flickering
    let closestIndex = -1
    let minDistance = Infinity

    for (const loadedIndex of this.cache.keys()) {
      const dist = Math.abs(loadedIndex - target)
      if (dist < minDistance) {
        minDistance = dist
        closestIndex = loadedIndex
      }
    }

    if (closestIndex !== -1) {
      return this.cache.get(closestIndex)
    }

    return null
  }

  dispose() {
    this.isDisposed = true
    this.queue = []
    this.listeners.clear()
    this.cache.clear()
    this.loading.clear()
    this.loadedEver.clear()
  }
}

