import { useEffect, useRef, useState } from 'react'
import FrameSequenceCanvas from '@/components/hero/FrameSequenceCanvas'
import HeroLoader from '@/components/hero/HeroLoader'
import HeroOverlay from '@/components/hero/HeroOverlay'
import { ScrollFrameController } from '@/components/hero/ScrollFrameController'
import { useFrameSequence } from '@/hooks/useFrameSequence'

function ArchitectureScrollHero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const lastUiProgressRef = useRef(-1)
  const [scrollProgress, setScrollProgress] = useState(0)

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
    })

    return () => controller.destroy()
  }, [frameCount, getFrame, isMobile, isReady, prioritizeWindow, subscribeFrames])

  const handleExploreClick = (event) => {
    event?.preventDefault()
    const target = document.querySelector('#projects')
    if (window.lenis) window.lenis.scrollTo(target, { duration: 1.4 })
    else target?.scrollIntoView({ behavior: 'smooth' })
  }

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
