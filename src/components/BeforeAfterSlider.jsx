import { useCallback, useEffect, useRef, useState } from 'react'
import { Sparkles, SlidersHorizontal, ArrowLeftRight, Check, Eye } from 'lucide-react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function ComparisonImage({ image, label, className = '' }) {
  const [broken, setBroken] = useState(false)

  if (!image?.src || broken) {
    return (
      <div className={`grid h-full w-full place-items-center bg-stone-100 ${className}`}>
        <div className="text-center p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
            {label}
          </p>
          <p className="mt-1 text-xs text-stone-400">Image rendering</p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={image.src}
      alt={image.alt || label}
      className={className}
      onError={() => setBroken(true)}
      loading="lazy"
      draggable={false}
    />
  )
}

function BeforeAfterSlider({ before, after, title }) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const mediaRef = useRef(null)
  const isDraggingRef = useRef(false)
  const touchStartRef = useRef({ x: 0, y: 0, isHorizontal: null })

  // Calculate and update position based on clientX
  const updatePosition = useCallback((clientX) => {
    const rect = mediaRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return
    const nextPosition = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.round(clamp(nextPosition, 0, 100)))
  }, [])

  // Window-level pointer listeners for 100% reliable tracking
  useEffect(() => {
    const handleGlobalPointerMove = (e) => {
      if (!isDraggingRef.current) return
      updatePosition(e.clientX)
    }

    const handleGlobalPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false
        setIsDragging(false)
      }
    }

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true })
    window.addEventListener('pointerup', handleGlobalPointerUp)
    window.addEventListener('pointercancel', handleGlobalPointerUp)

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove)
      window.removeEventListener('pointerup', handleGlobalPointerUp)
      window.removeEventListener('pointercancel', handleGlobalPointerUp)
    }
  }, [updatePosition])

  // Mouse & Direct Pointer Down
  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    isDraggingRef.current = true
    setIsDragging(true)
    setHasInteracted(true)
    updatePosition(event.clientX)
  }

  // Touch Gesture Handling: Arbitrates between horizontal slider scrubbing and vertical page scrolling
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      isHorizontal: null,
    }
  }

  const handleTouchMove = (e) => {
    const touch = e.touches[0]
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x)
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y)

    // Detect direction on first meaningful movement (threshold: 8px)
    if (touchStartRef.current.isHorizontal === null) {
      if (deltaX > 8 || deltaY > 8) {
        touchStartRef.current.isHorizontal = deltaX > deltaY
      }
    }

    // If gesture is horizontal: scrub slider and prevent vertical page jitter
    if (touchStartRef.current.isHorizontal === true) {
      if (e.cancelable) e.preventDefault()
      isDraggingRef.current = true
      setIsDragging(true)
      setHasInteracted(true)
      updatePosition(touch.clientX)
    }
    // If gesture is vertical: do NOT preventDefault, let the browser scroll the page freely
  }

  const handleTouchEnd = () => {
    isDraggingRef.current = false
    setIsDragging(false)
    touchStartRef.current = { x: 0, y: 0, isHorizontal: null }
  }

  // Horizontal Wheel / Trackpad Two-Finger Scrub
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault()
      setHasInteracted(true)
      setPosition((prev) => clamp(prev + (e.deltaX > 0 ? 2 : -2), 0, 100))
    }
  }

  // Keyboard accessibility
  const handleKeyDown = (event) => {
    setHasInteracted(true)
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      setPosition((val) => clamp(val - 5, 0, 100))
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      setPosition((val) => clamp(val + 5, 0, 100))
    } else if (event.key === 'Home') {
      event.preventDefault()
      setPosition(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setPosition(100)
    }
  }

  // Preset jumper with smooth Apple spring transition
  const jumpTo = (val) => {
    setHasInteracted(true)
    setPosition(val)
  }

  // Auto-demonstration on first scroll-in if user has not interacted
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasInteracted) {
          // Play a gentle 1.2s reveal sweep from 25% -> 75% -> 50%
          const timer1 = setTimeout(() => {
            if (!isDraggingRef.current) setPosition(70)
          }, 300)
          const timer2 = setTimeout(() => {
            if (!isDraggingRef.current) setPosition(50)
          }, 1100)
          return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
          }
        }
      },
      { threshold: 0.45 },
    )

    if (mediaRef.current) observer.observe(mediaRef.current)
    return () => observer.disconnect()
  }, [hasInteracted])

  return (
    <div className="overflow-hidden rounded-3xl border border-[#E8E4DC] bg-white p-3 sm:p-5 shadow-[0_12px_40px_rgba(30,25,18,0.06),inset_0_1px_0_rgba(255,255,255,0.95)]">
      {/* Header bar with title and interactive control presets */}
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B88628]">
            <Sparkles size={13} className="text-[#B88628]" />
            Physical Civil Transformation
          </div>
          <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
            {title}
          </h3>
        </div>

        {/* 0% / 50% / 100% Quick View Preset Pills */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-full border border-[#E8E4DC] shadow-2xs self-start sm:self-auto">
          {[
            { label: '0% Civil', value: 0 },
            { label: '50% Split', value: 50 },
            { label: '100% Handover', value: 100 },
          ].map((preset) => {
            const isSelected = Math.abs(position - preset.value) <= 5
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => jumpTo(preset.value)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200 cursor-pointer active:scale-[0.97] ${isSelected
                  ? 'bg-[#1E1912] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#E8E4DC]/60'
                  }`}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Interactive Comparison Viewport */}
      <div
        ref={mediaRef}
        role="slider"
        tabIndex="0"
        aria-label="Before and after image comparison slider"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={position}
        className="relative aspect-[4/3] cursor-ew-resize overflow-hidden rounded-2xl select-none sm:aspect-[16/9] border border-[#E8E4DC] focus:outline-none focus:ring-2 focus:ring-[#B88628]"
        onPointerDown={handlePointerDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
      >
        {/* Base Layer: Completed Project (Shows on the Right) */}
        <ComparisonImage
          key={after?.src || 'after-placeholder'}
          image={after}
          label="Completed Architecture"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />

        {/* Clipped Top Layer: Unfinished Site / Before (Shows on the Left) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            transition: isDragging ? 'none' : 'clip-path 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <ComparisonImage
            key={before?.src || 'before-placeholder'}
            image={before}
            label="Original Condition"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Divider Line & Circular Grab Handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-[2px] bg-white shadow-[0_0_16px_rgba(0,0,0,0.6)]"
          style={{
            left: `calc(${position}% - 1px)`,
            transition: isDragging ? 'none' : 'left 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span
            className={`absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#B88628] bg-white text-xs font-black text-[#B88628] shadow-[0_4px_20px_rgba(184,134,40,0.45)] transition-transform sm:h-12 sm:w-12 ${isDragging ? 'scale-110 ring-4 ring-[#B88628]/25' : 'hover:scale-105'
              }`}
          >
            <ArrowLeftRight size={16} className="text-[#B88628]" />
          </span>
        </div>

        {/* Verified Position Labels */}
        <div className="pointer-events-none absolute left-2.5 top-2.5 rounded-full border border-white/20 bg-stone-900/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-md backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:text-xs">
          <span>Structural Construction Phase</span>
        </div>
        <div className="pointer-events-none absolute right-2.5 top-2.5 rounded-full border border-white/25 bg-[#B88628]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-md backdrop-blur-md sm:right-5 sm:top-5 sm:px-4 sm:text-xs">
          <span>Completed Turnkey Handover</span>
        </div>

        {/* Touch & Keyboard Instruction Tooltip */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-stone-950/70 px-4 py-1 text-[10px] sm:text-[11px] font-semibold text-white/90 backdrop-blur-md shadow-lg flex items-center gap-2">
          <span>↔ Drag or swipe horizontally to compare</span>
        </div>
      </div>
    </div>
  )
}

export default BeforeAfterSlider
