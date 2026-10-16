import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { resolveAssetUrl } from '@/services/frameSequence'
import ArchitectureScrollHero from '@/components/ArchitectureScrollHero'

export default function EngineeringBimHero({ company = {} }) {
  // Modes: 'bim' (3-Stage 2D to Handover Evolution) vs '3d' (Interactive 3D Walkthrough)
  const [currentMode, setCurrentMode] = useState('bim')

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

  return (
    <section className="relative w-full bg-white pt-4 md:pt-6 pb-8 md:pb-12 overflow-hidden border-b border-slate-200" aria-label="Hero Showcase">
      <div className="thozha-container">
        {/* ==========================================================================
            DESKTOP HERO VIEW (hidden md:block): Matching Sample 2 (From 2D Drafting to Handover)
            ========================================================================== */}
        <div className="hidden md:block">
          {/* Top HUD Badge & Mode Toggle */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200">
              <span className="px-1.5 py-0.5 rounded bg-blue-700 text-white font-mono text-[10px] font-bold tracking-widest">
                HUD
              </span>
              <span className="text-xs font-bold text-slate-800 tracking-wider">
                CIVIL ENGINEERING GRADE-I • POLLACHI
              </span>
            </div>

            {/* Mode Switcher: 2D to Handover vs Interactive 3D Walkthrough */}
            <div className="inline-flex items-center rounded-full bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setCurrentMode('bim')}
                className={`px-3.5 py-1.5 rounded-full transition-all border-none cursor-pointer ${
                  currentMode === 'bim'
                    ? 'bg-white text-blue-700 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 bg-transparent'
                }`}
              >
                2D to Handover
              </button>
              <button
                type="button"
                onClick={() => setCurrentMode('3d')}
                className={`px-3.5 py-1.5 rounded-full transition-all border-none cursor-pointer ${
                  currentMode === '3d'
                    ? 'bg-blue-600 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 bg-transparent'
                }`}
              >
                Interactive 3D Walkthrough
              </button>
            </div>
          </div>

          {/* Mode 1: 3-Stage Evolution Visual (From 2D Drafting to Handover) */}
          {currentMode === 'bim' && (
            <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
              <div className="relative w-full aspect-[16/8.02] bg-white overflow-hidden">
                <img
                  src={resolveAssetUrl('images/thozha/hero-section-full.webp')}
                  alt="From 2D Drafting to Handover - 3-Stage Architecture & Civil Evolution"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />

                {/* Clean, Non-overlapping Interactive Action Buttons */}
                <div className="absolute bottom-5 md:bottom-7 left-6 md:left-10 flex items-center gap-3">
                  <a
                    href="#portfolio"
                    onClick={handleExploreClick}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0056b3] text-white font-bold text-xs tracking-wider uppercase shadow-md hover:bg-blue-800 transition-all cursor-pointer no-underline active:scale-[0.98]"
                  >
                    Explore Works <ArrowRight size={14} />
                  </a>
                  <a
                    href="#consultation"
                    onClick={handleConsultClick}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-800 text-slate-800 font-bold text-xs tracking-wider uppercase shadow-xs hover:bg-slate-900 hover:text-white transition-all cursor-pointer no-underline active:scale-[0.98]"
                  >
                    Download Portfolio
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Interactive Continuous 3D Walkthrough View */}
          {currentMode === '3d' && (
            <div className="border border-slate-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-slate-50">
              <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between text-xs">
                <span className="font-semibold tracking-wider uppercase text-blue-300">
                  • Interactive Continuous 3D Architectural Scrubbing
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentMode('bim')}
                  className="text-white hover:text-blue-300 underline cursor-pointer bg-transparent border-none text-xs"
                >
                  Back to 2D to Handover View ✕
                </button>
              </div>
              <ArchitectureScrollHero company={company} />
            </div>
          )}
        </div>

        {/* ==========================================================================
            MOBILE HERO VIEW (block md:hidden): 3-Stage Evolution & Mobile Metrics
            ========================================================================== */}
        <div className="block md:hidden">
          {/* Mobile Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            ARCHITECTURE • CIVIL ENGINEERING • POLLACHI
          </div>

          {/* Mobile Headline */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight mb-2">
            Spaces crafted with quiet precision.
          </h1>

          {/* Mobile Subtitle */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Dedicated to sustainable tropical architecture, Vaastu harmony, and turnkey structural engineering across Western Tamil Nadu.
          </p>

          {/* Mobile 3-Stage Evolution Image Card (Replacing Anamalai Resort) */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[16/10] bg-slate-900 mb-4">
            <img
              src={resolveAssetUrl('images/thozha/hero-section-full.webp')}
              alt="From 2D Drafting to Handover - 3-Stage Civil Evolution"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-3 flex items-end">
              <div className="w-full flex items-center justify-between text-slate-900 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/60 shadow-md">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-800 truncate flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  2D CAD TO TURNKEY HANDOVER • CIVIL GRADE-I
                </span>
                <ArrowUpRight size={14} className="shrink-0 text-slate-800 ml-1" />
              </div>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex flex-col gap-2.5 mb-6">
            <a
              href="#consultation"
              onClick={handleConsultClick}
              className="w-full py-3.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs tracking-wider uppercase text-center shadow-md flex items-center justify-center gap-2 no-underline active:scale-[0.99] transition-transform"
            >
              Inquire About Your Site <ArrowRight size={14} />
            </a>
            <a
              href="#portfolio"
              onClick={handleExploreClick}
              className="w-full py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-1.5 no-underline shadow-xs active:scale-[0.99] transition-transform"
            >
              View Selected Works ▾
            </a>
          </div>

          {/* Mobile 2x2 Metric Grid (matching screen 01.png) */}
          <div className="pt-3">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-slate-500 mb-2.5 px-0.5">
              <span>ENGINEERING MILESTONES</span>
              <span className="text-blue-700 font-extrabold">WESTERN TN METRICS</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <span className="block text-2xl font-black text-blue-700">15+</span>
                <strong className="block text-xs font-bold text-slate-800 mt-0.5">Years Experience</strong>
                <span className="block text-[10px] text-slate-500">Pollachi &amp; Coimbatore</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <span className="block text-2xl font-black text-blue-700">180+</span>
                <strong className="block text-xs font-bold text-slate-800 mt-0.5">Custom Residences</strong>
                <span className="block text-[10px] text-slate-500">Built &amp; Delivered</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <span className="block text-2xl font-black text-blue-700">100%</span>
                <strong className="block text-xs font-bold text-slate-800 mt-0.5">DTCP Sanction</strong>
                <span className="block text-[10px] text-slate-500">Statutory Clearance</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <span className="block text-2xl font-black text-blue-700">M25+</span>
                <strong className="block text-xs font-bold text-slate-800 mt-0.5">Concrete Grade</strong>
                <span className="block text-[10px] text-slate-500">Cube Test Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
