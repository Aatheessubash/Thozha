import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'

/**
 * FrameSequenceCanvas
 * High-performance HTML5 Canvas renderer for continuous architectural walkthrough.
 * Maintains aspect ratio (cover mode), handles high-DPI crispness, and avoids React re-renders.
 */
const FrameSequenceCanvas = forwardRef(function FrameSequenceCanvas(
  { isMobile = false },
  ref,
) {
  const canvasRef = useRef(null)
  const currentImageRef = useRef(null)
  const lastIndexRef = useRef(-1)

  // Draw current image onto the canvas with cover composition
  const drawImageCover = useCallback((img) => {
    const canvas = canvasRef.current
    if (!canvas || !img) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const cw = canvas.width
    const ch = canvas.height
    if (cw <= 0 || ch <= 0) return
    const nw = img.naturalWidth || 1280
    const nh = img.naturalHeight || 720
    const imgAspect = nw / nh
    const canvasAspect = cw / ch

    let drawW, drawH, drawX, drawY

    if (canvasAspect > imgAspect) {
      drawW = cw
      drawH = cw / imgAspect
      drawX = 0
      drawY = (ch - drawH) / 2
    } else {
      drawH = ch
      drawW = ch * imgAspect
      drawY = 0
      // On mobile portrait, center the architectural focal point
      const focalPoint = isMobile ? 0.48 : 0.5
      drawX = (cw - drawW) * focalPoint
    }

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, Math.round(drawX), Math.round(drawY), Math.round(drawW), Math.round(drawH))
  }, [isMobile])

  // Resize canvas to match display size with capped devicePixelRatio
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)

    const newWidth = Math.round(rect.width * dpr)
    const newHeight = Math.round(rect.height * dpr)

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth
      canvas.height = newHeight

      if (currentImageRef.current) {
        drawImageCover(currentImageRef.current)
      }
    }
  }, [drawImageCover, isMobile])

  useEffect(() => {
    resizeCanvas()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize, { passive: true })
    const observer = new ResizeObserver(() => {
      resizeCanvas()
    })

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [resizeCanvas])

  // Expose imperative API for 60fps rendering without React reconciler overhead
  useImperativeHandle(
    ref,
    () => ({
      renderFrame: (index, image) => {
        if (!image) return
        if (lastIndexRef.current === index && currentImageRef.current === image) {
          return // Skip redundant draw call
        }
        lastIndexRef.current = index
        currentImageRef.current = image
        if (canvasRef.current) {
          canvasRef.current.dataset.frame = String(index)
        }
        drawImageCover(image)
      },
      getCurrentImage: () => currentImageRef.current,
      resize: resizeCanvas,
    }),
    [drawImageCover, resizeCanvas],
  )

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FAF9F6]">
      <canvas
        ref={canvasRef}
        data-frame="1"
        aria-hidden="true"
        className="block h-full w-full object-cover"
        style={{
          width: '100%',
          height: '100%',
          willChange: 'contents',
        }}
      />
    </div>
  )
})

export default FrameSequenceCanvas

