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
    <section className="relative w-full bg-white pt-0 md:pt-6 pb-0 md:pb-12 overflow-hidden border-b border-slate-200" aria-label="Hero Showcase">
      {/* ==========================================================================
          DESKTOP HERO VIEW (hidden md:block): Matching Sample 2 (From 2D Drafting to Handover)
          ========================================================================== */}
      <div className="hidden md:block thozha-container">
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
          MOBILE FULL SCREEN HERO VIEW (block md:hidden): Full Viewport Edge-to-Edge
          ========================================================================== */}
      <div className="block md:hidden w-full">
        {/* Full Viewport Hero Canvas */}
        <div className="relative w-full h-[calc(100dvh-120px)] min-h-[520px] max-h-[740px] flex flex-col justify-between overflow-hidden bg-slate-950">
          {/* Full Screen Image */}
          <img
            src={resolveAssetUrl('images/thozha/hero-mobile-portrait.webp')}
            alt="BIM 3D to On-Site Handover - Thozha Associates Pollachi"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />

          {/* Cinematic Top and Bottom Gradient Scrims for Contrast */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none" />

          {/* Top HUD Badging & Title */}
          <div className="relative z-10 px-4 pt-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-bold tracking-wider uppercase shadow-md mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              CIVIL GRADE-I • POLLACHI
            </div>
            <h1 className="text-2xl font-black text-white leading-tight tracking-tight drop-shadow-md">
              From 2D Drafting to Handover
            </h1>
            <p className="text-xs text-slate-200 leading-relaxed max-w-xs mt-1 drop-shadow">
              BIM 3D precision, verified DTCP sanctions &amp; turnkey structural execution.
            </p>
          </div>

          {/* Bottom Card & Direct Action Buttons */}
          <div className="relative z-10 px-4 pb-3 space-y-2">
            {/* Live BIM Status Glass Card */}
            <div className="bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 shadow-lg flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white leading-tight truncate">
                    BIM TO SITE HANDOVER
                  </span>
                  <span className="text-[8.5px] font-bold uppercase tracking-widest text-slate-300 leading-tight truncate">
                    LIVE SITE PRECISION &amp; VERIFIED SPECS
                  </span>
                </div>
              </div>
              <a
                href="#portfolio"
                onClick={handleExploreClick}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center shrink-0 transition-all active:scale-95"
                aria-label="Explore works"
              >
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-1.5">
              <a
                href="#consultation"
                onClick={handleConsultClick}
                className="w-full py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase text-center shadow-lg flex items-center justify-center gap-2 no-underline active:scale-[0.99] transition-transform"
              >
                Inquire About Your Site <ArrowRight size={14} />
              </a>
              <a
                href="#portfolio"
                onClick={handleExploreClick}
                className="w-full py-2 rounded-full bg-white/95 hover:bg-white text-slate-900 backdrop-blur-md font-bold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-1.5 no-underline shadow-sm active:scale-[0.99] transition-transform"
              >
                View Selected Works ▾
              </a>
            </div>
          </div>
        </div>

        {/* Mobile 2x2 Metric Grid (matching screen 01.png) */}
        <div className="pt-5 pb-6 px-4 bg-[#eff6ff] border-t border-blue-100">
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
    </section>
  )
}
