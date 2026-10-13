import { useCallback, useEffect, useRef, useState } from 'react'
import { FrameSequenceLoader, resolveAssetUrl } from '@/services/frameSequence'

export function useFrameSequence(options = {}) {
  const [isReady, setIsReady] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  )
  const [frameCount, setFrameCount] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
      ? options.mobileCount || options.defaultCount || 65
      : options.desktopCount || options.defaultCount || 65,
  )

  const loaderRef = useRef(null)

  // Rebuild the loader when crossing the mobile breakpoint so each device
  // receives the sequence, frame count, and aspect ratio designed for it.
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initialize loader with dynamic manifest probing
  useEffect(() => {
    let active = true

    const init = async () => {
      let desktopCount = options.desktopCount || options.defaultCount || 65
      let mobileCount = options.mobileCount || options.defaultCount || 65
      let desktopPattern = options.desktopPattern || 'frames/frame_%04d.webp'
      let mobilePattern = options.mobilePattern || 'frames/mobile/frame_%04d.webp'
      let desktopFallbackPattern = options.fallbackPattern || 'vid/frames_desktop/frame%05d.png'
      let mobileFallbackPattern = options.mobileFallbackPattern || mobilePattern

      try {
        const manifestUrl = resolveAssetUrl('frames/manifest.json')
        const res = await fetch(manifestUrl)
        if (res.ok) {
          const manifest = await res.json()
          if (manifest.desktopCount || manifest.count) desktopCount = manifest.desktopCount || manifest.count
          if (manifest.mobileCount) mobileCount = manifest.mobileCount
          if (manifest.desktopPattern) desktopPattern = manifest.desktopPattern
          if (manifest.mobilePattern) mobilePattern = manifest.mobilePattern
          if (manifest.fallbackPattern) desktopFallbackPattern = manifest.fallbackPattern
          if (manifest.mobileFallbackPattern) mobileFallbackPattern = manifest.mobileFallbackPattern
        }
      } catch {
        // Fall back gracefully to default parameters
      }

      if (!active) return

      const detectedCount = isMobile ? mobileCount : desktopCount
      const fallbackPattern = isMobile ? mobileFallbackPattern : desktopFallbackPattern

      setIsReady(false)
      setLoadProgress(0)
      setFrameCount(detectedCount)

      const loader = new FrameSequenceLoader({
        frameCount: detectedCount,
        desktopPattern,
        mobilePattern,
        fallbackPattern,
        isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
        concurrencyLimit: options.concurrencyLimit || 4,
      })

      loaderRef.current = loader

      loader.subscribe(({ isReady: ready, progress }) => {
        if (!active) return
        setIsReady(ready)
        setLoadProgress(progress)
      })

      loader.start()
    }

    init()

    return () => {
      active = false
      if (loaderRef.current) {
        loaderRef.current.dispose()
        loaderRef.current = null
      }
    }
  }, [isMobile, options.defaultCount, options.desktopCount, options.mobileCount, options.desktopPattern, options.mobilePattern, options.fallbackPattern, options.mobileFallbackPattern, options.concurrencyLimit])

  const getFrame = useCallback((index) => {
    return loaderRef.current ? loaderRef.current.getFrame(index) : null
  }, [])

  const prioritizeWindow = useCallback((index) => {
    loaderRef.current?.prioritizeWindow(index)
  }, [])

  const subscribeFrames = useCallback((listener) => {
    if (!loaderRef.current) return () => {}
    return loaderRef.current.subscribe(listener)
  }, [])

  return {
    isReady,
    loadProgress,
    frameCount,
    isMobile,
    getFrame,
    prioritizeWindow,
    subscribeFrames,
  }
}

