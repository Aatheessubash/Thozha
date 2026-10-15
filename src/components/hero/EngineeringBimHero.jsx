import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Download, Layers } from 'lucide-react'
import { useState } from 'react'
import { resolveAssetUrl } from '@/services/frameSequence'
import ArchitectureScrollHero from '@/components/ArchitectureScrollHero'

export default function EngineeringBimHero({ company = {} }) {
  // Slide modes: 'bim' (3-stage evolution), 'villa' (Anamalai Villa), '3d' (Interactive 3D Walkthrough)
  const [slide, setSlide] = useState(0)
  const slides = ['bim', 'villa', '3d']

  const nextSlide = () => setSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const handleExploreClick = (e) => {
    e.preventDefault()
    const target = document.querySelector('#portfolio')
    if (target) {
      if (window.lenis) window.lenis.scrollTo(target, { duration: 1.2 })
      else target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleConsultClick = (e) => {
    e.preventDefault()
    const target = document.querySelector('#consultation')
    if (target) {
      if (window.lenis) window.lenis.scrollTo(target, { duration: 1.2 })
      else target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentMode = slides[slide]

  return (
    <section className="relative w-full bg-white pt-6 pb-12 overflow-hidden border-b border-slate-200" aria-label="Hero Showcase">
      <div className="thozha-container">
        {/* Top HUD Badge & Slide Mode Indicators */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200">
            <span className="px-1.5 py-0.5 rounded bg-blue-700 text-white font-mono text-[10px] font-bold tracking-widest">
              HUD
            </span>
            <span className="text-xs font-bold text-slate-800 tracking-wider">
              CIVIL ENGINEERING GRADE-I • POLLACHI
            </span>
          </div>

          {/* Quick Mode Switcher Pills */}
          <div className="hidden sm:inline-flex items-center rounded-full bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSlide(0)}
              className={`px-3 py-1 rounded-full transition-all border-none cursor-pointer ${
                slide === 0 ? 'bg-white text-blue-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 bg-transparent'
              }`}
            >
              2D to Handover
            </button>
            <button
              type="button"
              onClick={() => setSlide(1)}
              className={`px-3 py-1 rounded-full transition-all border-none cursor-pointer ${
                slide === 1 ? 'bg-white text-blue-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 bg-transparent'
              }`}
            >
              Anamalai Villa
            </button>
            <button
              type="button"
              onClick={() => setSlide(2)}
              className={`px-3 py-1 rounded-full transition-all border-none cursor-pointer ${
                slide === 2 ? 'bg-blue-600 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 bg-transparent'
              }`}
            >
              Interactive 3D Walkthrough
            </button>
          </div>
        </div>

        {/* ==========================================================================
            MAIN STAGE: EXACT MATCH TO SAMPLE 2 (media_1792082049715_edebb03f.jpg)
            ========================================================================== */}
        {currentMode === 'bim' && (
          <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
            {/* High-Resolution 3-Stage Visual */}
            <div className="relative w-full aspect-[16/9] md:aspect-[16/8.2] bg-white overflow-hidden">
              <img
                src={resolveAssetUrl('images/thozha/hero-section-full.webp')}
                alt="From 2D Drafting to Handover - 3-Stage Architecture & Civil Evolution"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />

              {/* Interactive Action Hotspot Overlays */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none">
                <div className="flex items-end justify-between flex-wrap gap-4 pointer-events-auto">
                  {/* Left Side: Buttons under the headline */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <a
                      href="#portfolio"
                      onClick={handleExploreClick}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0056b3] text-white font-bold text-xs md:text-sm tracking-wide shadow-lg hover:bg-blue-800 transition-all cursor-pointer no-underline"
                    >
                      Explore Works <ArrowRight size={15} />
                    </a>
                    <a
                      href="#consultation"
                      onClick={handleConsultClick}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 border border-slate-900 text-slate-900 font-bold text-xs md:text-sm tracking-wide shadow-sm hover:bg-slate-900 hover:text-white transition-all cursor-pointer no-underline"
                    >
                      Download Portfolio
                    </a>
                  </div>

                  {/* Right Side: Carousel Arrow Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="w-10 h-10 rounded-full border border-slate-300 bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-all"
                      aria-label="Previous showcase"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      className="w-10 h-10 rounded-full border border-slate-300 bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-all"
                      aria-label="Next showcase"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mode 2: Anamalai Villa Handover View */}
        {currentMode === 'villa' && (
          <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 aspect-[16/9] md:aspect-[16/8.2]">
            <img
              src={resolveAssetUrl('images/thozha/hero-anamalai-clean.webp')}
              alt="The Anamalai Courtyard Villa in Pollachi"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent p-6 md:p-10 flex flex-col justify-end text-white">
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-blue-300 mb-1">
                FEATURED TURNKEY HANDOVER
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
                The Anamalai Courtyard Villa
              </h2>
              <p className="text-sm md:text-base text-slate-200 max-w-xl mb-6">
                4,200 sq.ft contemporary tropical sanctuary facing the Western Ghats with central rainwater court and Burma teak louvers.
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <a
                  href="#portfolio"
                  onClick={handleExploreClick}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-950 font-bold text-xs tracking-wider uppercase hover:bg-blue-50 transition-all no-underline"
                >
                  View Project Details <ArrowUpRight size={14} />
                </a>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border border-white/30 bg-black/40 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border border-white/30 bg-black/40 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mode 3: Interactive 3D Walkthrough View */}
        {currentMode === '3d' && (
          <div className="border border-slate-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-slate-50">
            <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between text-xs">
              <span className="font-semibold tracking-wider uppercase text-blue-300">
                • Interactive Continuous 3D Architectural Scrubbing
              </span>
              <button
                type="button"
                onClick={() => setSlide(0)}
                className="text-white hover:text-blue-300 underline cursor-pointer bg-transparent border-none"
              >
                Back to 2D to Handover View ✕
              </button>
            </div>
            <ArchitectureScrollHero company={company} />
          </div>
        )}
      </div>
    </section>
  )
}
