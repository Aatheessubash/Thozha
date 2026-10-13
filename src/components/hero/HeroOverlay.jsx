import { ArrowRight } from 'lucide-react'

function HeroOverlay({
  progress = 0,
  onExploreClick,
}) {
  const introOpacity = Math.max(0, 1 - progress * 4.5)

  return (
    <div className="cinematic-overlay">
      {/* Top HUD: Clean studio identifier */}
      <div className="cinematic-hud-top">
        <div className="hud-pill hud-brand-pill">
          <span className="hud-pulse" />
          <span>CIVIL ENGINEERING & ARCHITECTURE • POLLACHI</span>
        </div>
      </div>

      {/* Hero Core Editorial Lines */}
      <div
        className="cinematic-intro"
        style={{
          opacity: introOpacity,
          transform: `translateY(${progress * -30}px)`,
          pointerEvents: progress > 0.22 ? 'none' : 'auto',
        }}
      >
        <h1>
          Spaces that Build <em>Better Lives.</em>
        </h1>
        <span>
          From 2D planning approvals to final turnkey handover in Pollachi and
          the Coimbatore belt.
        </span>
        <div className="cinematic-actions">
          <a href="#projects" onClick={onExploreClick} className="hero-primary-cta">
            Explore Selected Works <ArrowRight size={14} />
          </a>
          <a href="#process" className="hero-play-cta">
            Our Approach <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeroOverlay
