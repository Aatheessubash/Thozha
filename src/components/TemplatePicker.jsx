import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const VARIANTS = [
  { id: 'warm', label: '🏛 Warm White Atelier' },
  { id: 'bento', label: '✦ Bento Modern' },
  { id: 'classic', label: '⊞ Classic Civil' },
  { id: 'obsidian', label: '☾ Obsidian Dark' },
]

export default function TemplatePicker({ current, onChange, onReplay }) {
  const [ready, setReady] = useState(false)
  const highlightRef = useRef(null)
  const itemRefs = useRef([])

  const currentIndex = Math.max(
    0,
    VARIANTS.findIndex((v) => v.id === current),
  )

  useLayoutEffect(() => {
    const el = itemRefs.current[currentIndex]
    if (el && highlightRef.current) {
      highlightRef.current.style.width = `${el.offsetWidth}px`
      highlightRef.current.style.transform = `translateX(${el.offsetLeft}px)`
      if (!ready) {
        requestAnimationFrame(() => setReady(true))
      }
    }
  }, [currentIndex, ready])

  useEffect(() => {
    function handleKeyDown(e) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        e.target.isContentEditable ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      ) {
        return
      }

      if (e.key >= '1' && e.key <= String(VARIANTS.length)) {
        e.preventDefault()
        const idx = Number(e.key) - 1
        onChange(VARIANTS[idx].id)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        const next = (currentIndex + 1) % VARIANTS.length
        onChange(VARIANTS[next].id)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const prev = (currentIndex - 1 + VARIANTS.length) % VARIANTS.length
        onChange(VARIANTS[prev].id)
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        onReplay?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, onChange, onReplay])

  return (
    <nav
      className="proto-picker"
      {...(ready ? { 'data-ready': '' } : {})}
      aria-label="Prototype variants"
    >
      <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true" />
      {VARIANTS.map((v, i) => {
        const isActive = current === v.id
        return (
          <button
            key={v.id}
            ref={(el) => (itemRefs.current[i] = el)}
            type="button"
            className="proto-picker-item"
            {...(isActive ? { 'data-active': '', 'aria-current': 'true' } : {})}
            onClick={() => onChange(v.id)}
          >
            {v.label}
          </button>
        )
      })}
      <span className="proto-picker-divider" aria-hidden="true" />
      <button
        type="button"
        className="proto-picker-item proto-picker-replay"
        aria-label="Replay animation (R)"
        title="Replay animation (R)"
        onClick={() => onReplay?.()}
      >
        ↻
      </button>
    </nav>
  )
}

