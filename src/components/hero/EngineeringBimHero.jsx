import {
  ArrowRight,
  ChevronDown,
} from 'lucide-react'
import { resolveAssetUrl } from '@/services/frameSequence'

const statsData = [
  { value: '15+', label: 'Years Mastery' },
  { value: '180+', label: 'Residences Delivered' },
  { value: '100%', label: 'DTCP Sanctions' },
  { value: 'M25+', label: 'Certified Strength' },
]

export default function EngineeringBimHero() {
  const desktopHeroImg = resolveAssetUrl('images/thozha/desktop-luxury-hero.jpg')
  const mobileHeroImg = resolveAssetUrl('images/thozha/mobile-luxury-hero.jpg')

  const scrollTo = (e, id) => {
    e.preventDefault()
    const el = document.querySelector(id)
    if (!el) return
    if (window.lenis) window.lenis.scrollTo(el, { duration: 1.2 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section aria-label="Hero" className="relative w-full overflow-hidden bg-[#FAF8F5] text-stone-900">

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP HERO: WARM WHITE EDITORIAL CAD BLUEPRINT CANVAS
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-col justify-between relative w-full min-h-screen pt-28 pb-10 px-6 xl:px-12 z-10">

        {/* Technical Architectural Grid Pattern in Warm Stone */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(rgba(180, 160, 130, 0.14) 1px, transparent 1px),
              linear-gradient(90deg, rgba(180, 160, 130, 0.14) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
          }}
        />

        {/* Technical Blueprint Annotations & Registration Marks in Warm Bronze */}
        <div className="absolute top-5 left-8 text-[11px] font-mono text-[#8C8273] tracking-widest pointer-events-none flex items-center gap-2">
          <span className="w-3 h-3 border-t-2 border-l-2 border-[#B88628] inline-block" />
          <span className="font-bold">CAD1+S // SITE SPEC</span>
        </div>
        <div className="absolute top-5 right-8 text-[11px] font-mono text-[#8C8273] tracking-widest pointer-events-none flex items-center gap-2">
          <span className="font-bold">0.10 21 002</span>
          <span className="w-3 h-3 border-t-2 border-r-2 border-[#B88628] inline-block" />
        </div>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 -rotate-90 text-[10px] font-mono text-[#8C8273] tracking-widest pointer-events-none font-bold">
          -18.508.0 // POLLACHI
        </div>
        <div className="absolute top-2/3 right-4 -translate-y-1/2 rotate-90 text-[10px] font-mono text-[#8C8273] tracking-widest pointer-events-none font-bold">
          0.40 35 83-1 // STRUCTURAL
        </div>
        <div className="absolute bottom-5 left-8 text-[11px] font-mono text-[#8C8273] tracking-widest pointer-events-none flex items-center gap-2">
          <span className="w-3 h-3 border-b-2 border-l-2 border-[#B88628] inline-block" />
          <span className="font-bold">GRADE-1 CIVIL DISCIPLINE</span>
        </div>
        <div className="absolute bottom-5 right-8 text-[11px] font-mono text-[#8C8273] tracking-widest pointer-events-none flex items-center gap-2">
          <span className="font-bold">ESTD 2009 // TAMIL NADU</span>
          <span className="w-3 h-3 border-b-2 border-r-2 border-[#B88628] inline-block" />
        </div>

        {/* ── Central Hero Card (Framed Dusk Villa with BIG Editorial Fonts) ── */}
        <div className="relative z-20 flex-1 w-full max-w-6xl mx-auto rounded-3xl overflow-hidden border border-[#E2DDD3] shadow-[0_24px_70px_rgba(40,30,20,0.14)] flex flex-col justify-end min-h-[500px] xl:min-h-[540px]">
          {/* High-Resolution Architecture Photograph */}
          <img
            src={desktopHeroImg}
            alt="Thozha Associates Luxury Residence"
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
            loading="eager"
          />

          {/* Cinematic Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(15, 12, 8, 0.94) 0%, rgba(15, 12, 8, 0.5) 38%, transparent 64%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(15, 12, 8, 0.78) 0%, rgba(15, 12, 8, 0.3) 48%, transparent 80%)',
            }}
          />

          {/* Hero Floating Content & Badges inside the Frame */}
          <div className="relative z-10 p-10 xl:p-14 flex items-end justify-between gap-10">
            {/* Left Column: BIG BOLD COMMANDING HEADLINE */}
            <div className="max-w-2xl">
              <h1 className="font-serif text-5xl lg:text-7xl xl:text-[84px] font-semibold text-white leading-[0.98] tracking-tight drop-shadow-md">
                Spaces Crafted with
              </h1>
              <h1 className="font-serif text-5xl lg:text-7xl xl:text-[84px] font-semibold text-[#FBF7EE] italic leading-[0.98] tracking-tight drop-shadow-md mt-1">
                Quiet Precision.
              </h1>

              <p className="mt-4 text-base lg:text-lg text-slate-100/95 leading-relaxed font-sans max-w-xl font-normal drop-shadow-sm">
                Sustainable tropical architecture meets turnkey structural engineering across Western Tamil Nadu.
              </p>
            </div>

            {/* Right Column: Floating Liquid Glass Badges */}
            <div className="flex flex-col items-end gap-3.5 pb-2">
              <div className="px-5 py-2.5 rounded-full backdrop-blur-md bg-white/20 border border-white/40 text-white text-xs font-bold tracking-wide shadow-lg hover:bg-white/30 transition-colors">
                DTCP Licensed Grade-1
              </div>
              <div className="flex items-center gap-3">
                <div className="px-5 py-2.5 rounded-full backdrop-blur-md bg-white/20 border border-white/40 text-white text-xs font-bold tracking-wide shadow-lg hover:bg-white/30 transition-colors">
                  M30 Monolithic Concrete
                </div>
                <div className="px-5 py-2.5 rounded-full backdrop-blur-md bg-white/20 border border-white/40 text-white text-xs font-bold tracking-wide shadow-lg hover:bg-white/30 transition-colors">
                  Vaastu Certified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Metrics Strip (Commanding Warm White CAD Bar) ── */}
        <div className="relative z-20 max-w-5xl mx-auto w-full mt-7 pt-5 border-t border-[#E2DDD3]">
          <div className="grid grid-cols-4 divide-x divide-[#E2DDD3]">
            {statsData.map((stat) => (
              <div key={stat.label} className="flex items-center justify-center gap-3 px-4">
                <span className="font-serif text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#B88628] tabular-nums leading-none">
                  {stat.value}
                </span>
                <span className="text-xs lg:text-sm text-stone-700 font-bold leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE HERO: WARM WHITE WITH BIG CLEAN TYPOGRAPHY
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex lg:hidden flex-col justify-between relative w-full min-h-[100svh] bg-[#FAF8F5] overflow-hidden pt-[72px]">

        {/* Background Visual Section */}
        <div className="relative w-full flex-1 flex flex-col justify-between">
          {/* Vertical Hero Photo */}
          <div className="relative w-full h-[46vh] sm:h-[50vh] overflow-hidden">
            <img
              src={mobileHeroImg}
              alt="Thozha Associates Villa in Valparai Foothills"
              className="absolute inset-0 w-full h-full object-cover object-center select-none"
              loading="eager"
            />
            {/* Top Scrim */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

            {/* Seamless Bottom Gradient Fading to Warm White */}
            <div
              className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(250, 248, 245, 0.8) 55%, #FAF8F5 100%)',
              }}
            />


          </div>

          {/* Content Layer with BIG BOLD CLEAN FONTS */}
          <div className="relative z-20 px-5 sm:px-6 pb-8 pt-0 flex flex-col items-center text-center">
            {/* BIG Editorial Headline */}
            <h1 className="font-serif text-[36px] sm:text-5xl font-bold text-stone-950 leading-[1.06] tracking-tight max-w-sm">
              Spaces crafted with
            </h1>
            <h1 className="font-serif text-[36px] sm:text-5xl font-bold italic text-[#B88628] leading-[1.06] tracking-tight max-w-sm mt-0.5">
              quiet precision.
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed font-normal">
              Sustainable tropical architecture &amp; turnkey structural engineering across Western Tamil Nadu.
            </p>

            {/* 3 Badge Pills Centered */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3.5">
              <span className="px-3.5 py-1 rounded-full bg-white border border-[#E8E4DC] text-[11px] font-semibold text-stone-800 shadow-2xs">
                DTCP Grade-1
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white border border-[#E8E4DC] text-[11px] font-semibold text-stone-800 shadow-2xs">
                M30 Concrete
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white border border-[#E8E4DC] text-[11px] font-semibold text-stone-800 shadow-2xs">
                Vaastu Certified
              </span>
            </div>

            {/* Glowing Warm Gold Primary CTA Button */}
            <div className="w-full max-w-[320px] mt-5">
              <a
                href="#consultation"
                onClick={(e) => scrollTo(e, '#consultation')}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-gradient-to-r from-[#B88628] via-[#C59940] to-[#A07420] text-white font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_6px_24px_rgba(184,134,40,0.32)] active:scale-[0.97] transition-all no-underline touch-manipulation hover:shadow-[0_8px_30px_rgba(184,134,40,0.45)]"
              >
                <span>Request Site Consultation</span>
                <ArrowRight size={14} className="text-white" />
              </a>
            </div>

            {/* Downward Indicator */}
            <a
              href="#expertise"
              onClick={(e) => scrollTo(e, '#expertise')}
              className="mt-3.5 inline-flex flex-col items-center text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors no-underline active:scale-[0.96] touch-manipulation"
            >
              <ChevronDown size={14} className="animate-bounce text-[#B88628]" />
              <span>Explore Works &amp; Disciplines ↓</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}
