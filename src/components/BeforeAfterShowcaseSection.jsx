import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MapPin, CheckCircle2, Sliders, Layers } from 'lucide-react'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { resolveAssetUrl } from '@/services/frameSequence'

const TRANSFORMATION_PROJECTS = [
  {
    id: 'anamalai-villa',
    index: '01',
    tabLabel: 'Project 01 • Foothills Villa',
    title: 'Anamalai Foothills Villa — Structural to Sanctuary',
    category: 'Full Turnkey Villa Construction',
    location: 'Valparai Foothills, Pollachi',
    subtitle:
      'From load-bearing brick masonry, RCC lintel casting, and site excavation into a finished, dusk-calibrated tropical residence with natural teak louvers & cantilevered glass balconies.',
    specs: [
      { label: 'Structural Spec', value: 'M25 Monolithic RCC' },
      { label: 'Built Area', value: '4,850 Sq.Ft' },
      { label: 'Masonry', value: 'Class-1 Kiln Bricks' },
      { label: 'Status', value: 'Handed Over & Vaastu Verified' },
    ],
    beforeImage: {
      src: resolveAssetUrl('images/thozha/before-construction.jpg'),
      alt: 'Structural brick & concrete construction stage in Pollachi foothills',
    },
    afterImage: {
      src: resolveAssetUrl('images/thozha/after-construction.jpg'),
      alt: 'Completed luxury modern tropical residence in Pollachi at twilight',
    },
  },
  {
    id: 'pollachi-courtyard',
    index: '02',
    tabLabel: 'Project 02 • Biophilic Courtyard',
    title: 'Pollachi Townhouse — Central Courtyard & Water Pool',
    category: 'Biophilic Interior Architecture & Civil',
    location: 'Mahalingapuram, Pollachi',
    subtitle:
      'From double-height exposed red brick masonry, steel rebar reinforcement, and timber scaffolding into a tranquil water mirror sanctuary with flamed black granite & lush vertical gardens.',
    specs: [
      { label: 'Acoustic & Shading', value: 'Natural Teak Ceiling Baffles' },
      { label: 'Water Element', value: 'Shallow Reflection Pool' },
      { label: 'Biophilic Living Wall', value: '2-Story Tropical Flora' },
      { label: 'Light Calibration', value: 'Integrated Cove & Sun Skylight' },
    ],
    beforeImage: {
      src: resolveAssetUrl('images/thozha/before-courtyard.jpg'),
      alt: 'Raw interior courtyard construction with red brick masonry and RCC lintels',
    },
    afterImage: {
      src: resolveAssetUrl('images/thozha/after-courtyard.jpg'),
      alt: 'Completed luxury courtyard with water mirror reflection pool and vertical garden',
    },
  },
]

function BeforeAfterShowcaseSection({ company = {}, projects = [] }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const currentProject = TRANSFORMATION_PROJECTS[activeProjectIndex]

  return (
    <section id="transformation" className="scroll-mt-28 py-20 lg:py-28 bg-[#FAF8F5] border-t border-b border-[#E8E4DC] relative overflow-hidden">
      {/* Subtle architectural radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#B88628]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="thozha-container relative z-10">
        {/* Section Header with Big Commanding Editorial Serif */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E4DC] text-[11px] font-bold uppercase tracking-[0.2em] text-[#B88628] mb-4 shadow-2xs">
            <Sparkles size={13} className="text-[#B88628]" />
            Visible Transformation • Turnkey Civil Discipline
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-stone-900 leading-[1.08] tracking-tight">
            From raw masonry to completed sanctuary.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Slide the interactive divider to inspect the uncompromising transition: from load-bearing brickwork, RCC lintels, and site excavation into a finished, daylight-calibrated tropical residence.
          </p>

          {/* Interactive Project Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-[#E8E4DC] shadow-[0_4px_20px_rgba(30,25,18,0.04)] gap-1.5">
            {TRANSFORMATION_PROJECTS.map((proj, idx) => {
              const isActive = activeProjectIndex === idx
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectIndex(idx)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.97] flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#1E1912] text-white shadow-md'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-[#F4F0E6]'
                  }`}
                >
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-[#B88628] text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {proj.index}
                  </span>
                  <span className="hidden sm:inline">{proj.tabLabel}</span>
                  <span className="inline sm:hidden">{idx === 0 ? 'Foothills Villa' : 'Courtyard Sanctuary'}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Animated Comparison Slider Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            <BeforeAfterSlider
              before={currentProject.beforeImage}
              after={currentProject.afterImage}
              title={currentProject.title}
            />

            {/* Project Specifications & Engineering Breakdown Bar */}
            <div className="mt-6 rounded-3xl border border-[#E8E4DC] bg-white p-5 sm:p-7 shadow-[0_8px_30px_rgba(30,25,18,0.04)]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E8E4DC]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B88628] mb-1">
                    <MapPin size={13} />
                    <span>{currentProject.location}</span>
                    <span className="text-stone-300">•</span>
                    <span>{currentProject.category}</span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
                    {currentProject.title}
                  </h4>
                  <p className="mt-1 text-sm text-stone-600 max-w-3xl leading-relaxed">
                    {currentProject.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-3 self-start lg:self-auto shrink-0 w-full sm:w-auto">
                  <a
                    href="#consultation"
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.querySelector('#consultation')
                      if (el) {
                        if (window.lenis) window.lenis.scrollTo(el, { duration: 1.2 })
                        else el.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1E1912] hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md active:scale-[0.97] touch-manipulation min-h-[44px]"
                  >
                    <span>Request Site Assessment</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Verified Civil Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-5 sm:pt-6">
                {currentProject.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] transition-colors hover:bg-white"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {spec.label}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-stone-900 flex items-center gap-1.5 leading-snug">
                      <CheckCircle2 size={14} className="text-[#B88628] shrink-0" />
                      <span>{spec.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default BeforeAfterShowcaseSection
