import { useCallback, useEffect, useRef, useState } from 'react'
import FrameSequenceCanvas from '@/components/hero/FrameSequenceCanvas'
import HeroLoader from '@/components/hero/HeroLoader'
import HeroOverlay from '@/components/hero/HeroOverlay'
import { ScrollFrameController } from '@/components/hero/ScrollFrameController'
import { useFrameSequence } from '@/hooks/useFrameSequence'

function ArchitectureScrollHero({ company = {} }) {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const lastUiProgressRef = useRef(-1)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const playRafRef = useRef(null)

  const { isReady, loadProgress, frameCount, isMobile, getFrame, prioritizeWindow, subscribeFrames } = useFrameSequence({
    defaultCount: 262,
    desktopCount: 262,
    mobileCount: 69,
    desktopPattern: 'vid/frames_desktop/frames_mobile/frame%05d.webp',
    mobilePattern: 'vid/responsive/webp/frame%05d.webp',
    fallbackPattern: 'vid/frames_desktop/frames_mobile/frame%05d.png',
    mobileFallbackPattern: 'vid/responsive/frame%05d.png',
    concurrencyLimit: 6,
  })

  useEffect(() => {
    if (!isReady || !sectionRef.current || !canvasRef.current) return undefined

    const controller = new ScrollFrameController({
      triggerElement: sectionRef.current,
      canvasApi: canvasRef.current,
      getFrame,
      prioritizeWindow,
      subscribeFrames,
      frameCount,
      smoothing: isMobile ? 18 : 15,
      onProgress: (progress) => {
        if (Math.abs(progress - lastUiProgressRef.current) >= 0.01 || progress === 1) {
          lastUiProgressRef.current = progress
          setScrollProgress(progress)
        }
      },
      onScrollStateChange: setHasScrolled,
    })

    return () => controller.destroy()
  }, [frameCount, getFrame, isMobile, isReady, prioritizeWindow, subscribeFrames])

  const handleExploreClick = (event) => {
    event?.preventDefault()
    setIsPlaying(false)
    const target = document.querySelector('#projects')
    if (window.lenis) window.lenis.scrollTo(target, { duration: 1.4 })
    else target?.scrollIntoView({ behavior: 'smooth' })
  }

  const seekToProgress = useCallback((targetProgress) => {
    setIsPlaying(false)
    if (!sectionRef.current) return
    const navOffset = window.innerWidth <= 1100 ? 66 : 78
    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = window.scrollY + rect.top - navOffset
    const scrollDistance = sectionRef.current.offsetHeight - window.innerHeight
    const targetY = sectionTop + Math.max(0, Math.min(1, targetProgress)) * scrollDistance
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }, [])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  // Auto-play through the walkthrough sequence
  useEffect(() => {
    if (!isPlaying || !sectionRef.current) return undefined

    const navOffset = window.innerWidth <= 1100 ? 66 : 78
    const rect = sectionRef.current.getBoundingClientRect()
    const currentScroll = window.scrollY
    const sectionTop = currentScroll + rect.top - navOffset
    const scrollDistance = sectionRef.current.offsetHeight - window.innerHeight

    let startTimestamp = null
    const duration = 14000 // 14s smooth cinematic journey

    const currentP = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / scrollDistance))
    const startP = currentP >= 0.96 ? 0 : currentP

    if (startP === 0) {
      window.scrollTo({ top: sectionTop })
    }

    const step = (now) => {
      if (!startTimestamp) startTimestamp = now
      const elapsed = now - startTimestamp
      const nextP = Math.min(1, startP + (elapsed / duration) * (1 - startP))
      const targetY = sectionTop + nextP * scrollDistance
      window.scrollTo({ top: targetY })

      if (nextP < 1) {
        playRafRef.current = requestAnimationFrame(step)
      } else {
        setIsPlaying(false)
      }
    }

    playRafRef.current = requestAnimationFrame(step)

    return () => {
      if (playRafRef.current) {
        cancelAnimationFrame(playRafRef.current)
      }
    }
  }, [isPlaying])

  const scrollDistance = isMobile
    ? Math.max(2800, Math.min(3800, frameCount * 11))
    : Math.max(3200, Math.min(4600, frameCount * 14))

  return <section
    id="home"
    ref={sectionRef}
    className="architecture-scroll"
    aria-label="Scroll-driven architectural walkthrough"
    data-frame-count={frameCount}
    data-sequence={isMobile ? 'mobile' : 'desktop'}
    style={{ '--sequence-distance': `${scrollDistance}px` }}
  >
    <div className="sr-only"><h1>Thozha Associates architectural walkthrough</h1><p>Scroll through a continuous journey from the residence exterior into its completed interior spaces.</p></div>
    <div className="sticky-canvas">
      <HeroLoader active={!isReady} progress={loadProgress}/>
      <FrameSequenceCanvas ref={canvasRef} isMobile={isMobile}/>
      {isReady && <HeroOverlay
        progress={scrollProgress}
        onExploreClick={handleExploreClick}
      />} 
    </div>
  </section>
}

export default ArchitectureScrollHero
