import { useCallback, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function ComparisonImage({ image, label, className = '' }) {
  const [broken, setBroken] = useState(false)

  if (!image?.src || broken) {
    return (
      <div className={`grid h-full w-full place-items-center bg-stone-100 ${className}`}>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-inkMuted">
            {label}
          </p>
          <p className="mt-2 text-xs text-inkMuted">Image rendering</p>
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
    />
  )
}

function BeforeAfterSlider({ before, after, title }) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const mediaRef = useRef(null)

  const updatePositionFromClientX = useCallback((clientX) => {
    const rect = mediaRef.current?.getBoundingClientRect()

    if (!rect || rect.width === 0) {
      return
    }

    const nextPosition = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.round(clamp(nextPosition, 0, 100)))
  }, [])

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    setIsDragging(true)
    updatePositionFromClientX(event.clientX)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerMove = (event) => {
    if (!isDragging) {
      return
    }

    if (event.cancelable) {
      event.preventDefault()
    }

    updatePositionFromClientX(event.clientX)
  }

  const handlePointerEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-3 shadow-soft sm:p-5">
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            <Sparkles size={12} />
            Physical Transformation
          </div>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink sm:text-2xl">
            {title}
          </h3>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-stone-200 bg-stone-50 px-3.5 py-1 text-xs font-medium text-inkMuted sm:self-auto">
          <span>Drag slider to compare</span>
        </div>
      </div>

      <div
        ref={mediaRef}
        className="relative aspect-[4/3] cursor-col-resize overflow-hidden rounded-2xl select-none sm:aspect-[16/9]"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
      >
        {/* Base Layer: Completed Project (Shows on the Right) */}
        <ComparisonImage
          key={after?.src || 'after-placeholder'}
          image={after}
          label="Completed Architecture"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Clipped Top Layer: Unfinished Site / Before (Shows on the Left) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
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
          className="pointer-events-none absolute inset-y-0 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)]"
          style={{ left: `calc(${position}% - 1px)` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-stone-300 bg-white text-xs font-bold text-ink shadow-lg transition-transform hover:scale-105 sm:h-11 sm:w-11">
            <span aria-hidden="true">↔</span>
          </span>
        </div>

        {/* Verified Position Labels */}
        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/40 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink shadow-sm backdrop-blur-sm sm:left-5 sm:top-5">
          Initial Condition
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/40 bg-accent/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-sm backdrop-blur-sm sm:right-5 sm:top-5">
          Completed Architecture
        </div>
      </div>
    </div>
  )
}

export default BeforeAfterSlider
