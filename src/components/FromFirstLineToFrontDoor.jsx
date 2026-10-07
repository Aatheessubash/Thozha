import { AnimatePresence, motion } from 'framer-motion'
import { Compass, Eye, Layers, Sparkles } from 'lucide-react'
import { useState } from 'react'

const STAGES = [
  {
    id: 'plan',
    step: '01',
    label: 'Architectural CAD & Plan',
    subtitle: 'From spatial brief to verified structural calculation',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop', // High-res blueprint/elevation
    blueprintOverlay: true,
    specs: [
      { label: 'Scope', val: 'Floor Plans, 3D Elevation, Structural Analysis' },
      { label: 'Approvals', val: 'DTCP & Local Municipal Approvals' },
      { label: 'Engineering', val: 'Soil Bearing Capacity & Footing Detailing' },
    ],
    note: 'Every millimetre is calibrated before a single shovel enters the ground.',
  },
  {
    id: 'build',
    step: '02',
    label: 'Structural RCC & Framing',
    subtitle: 'Precision formwork, reinforced concrete & disciplined masonry',
    image:
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?q=80&w=1400&auto=format&fit=crop', // Clean construction/structure
    specs: [
      { label: 'Core', val: 'Fe-550D TMT Rebar & M25 Certified Concrete' },
      { label: 'Supervision', val: 'Daily Site In-Charge & Cube Test Reports' },
      { label: 'Protection', val: 'Integral Waterproofing & Anti-Termite Layer' },
    ],
    note: 'Uncompromising structural discipline ensures generational safety and longevity.',
  },
  {
    id: 'handover',
    step: '03',
    label: 'Turnkey Handover',
    subtitle: 'Warm light, tactile materials, and a home built for everyday life',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop', // Finished sunlit villa
    specs: [
      { label: 'Finishes', val: 'Lime-Wash Rendering, Teak Joinery & Micro-Cement' },
      { label: 'Efficiency', val: 'Passive Cross-Ventilation & Rainwater Harvesting' },
      { label: 'Handover', val: 'Turnkey Key Handover with As-Built Drawings' },
    ],
    note: 'The culmination of architectural vision and civil engineering craft.',
    hotspots: [
      {
        id: 'hotspot-1',
        x: '24%',
        y: '28%',
        title: 'Passive Daylighting',
        desc: 'Strategically positioned clerestory glazing channels indirect morning light without heat radiation.',
      },
      {
        id: 'hotspot-2',
        x: '52%',
        y: '48%',
        title: 'Courtyard Micro-climate',
        desc: 'Open-to-sky central lightwell draws hot air upwards, dropping ambient temperature by 3–4°C.',
      },
      {
        id: 'hotspot-3',
        x: '78%',
        y: '72%',
        title: 'Material Honesty',
        desc: 'Local granite thresholds paired with sustainable timber louvers for thermal buffering.',
      },
    ],
  },
]

function FromFirstLineToFrontDoor() {
  const [activeStageIndex, setActiveStageIndex] = useState(2) // Default to completed
  const [activeHotspot, setActiveHotspot] = useState(null)

  const activeStage = STAGES[activeStageIndex]

  return (
    <section id="process" className="scroll-mt-28 section-space bg-stone-50/70">
      <div className="section-shell">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-inkMuted shadow-sm">
            <Layers size={13} className="text-accent" />
            Signature Engineering Methodology
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            From first line to front door.
          </h2>
          <p className="mt-3 text-base text-inkMuted sm:text-lg">
            Follow the journey of a Thozha project: from mathematical CAD precision to raw reinforced concrete, and finally into a light-filled living sanctuary.
          </p>
        </div>

        {/* Stage Selector Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {STAGES.map((stage, index) => {
            const isSelected = activeStageIndex === index
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  setActiveStageIndex(index)
                  setActiveHotspot(null)
                }}
                className={`flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  isSelected
                    ? 'border border-accent bg-accent text-white shadow-md'
                    : 'border border-stone-200 bg-white text-inkMuted hover:border-stone-300 hover:text-ink'
                }`}
              >
                <span
                  className={`text-[10px] font-bold ${
                    isSelected ? 'text-white/80' : 'text-stone-400'
                  }`}
                >
                  {stage.step}
                </span>
                <span>{stage.label}</span>
              </button>
            )
          })}
        </div>

        {/* The Interactive Visual Stage Display Frame */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-stone-200 bg-white p-3 shadow-soft sm:p-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-100 sm:aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <img
                  src={activeStage.image}
                  alt={activeStage.label}
                  className="h-full w-full object-cover"
                />

                {/* Blueprint grid effect if stage 1 */}
                {activeStage.blueprintOverlay && (
                  <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply backdrop-grayscale" />
                )}

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Interactive Hotspots for Completed Stage */}
                {activeStage.hotspots && (
                  <>
                    {activeStage.hotspots.map((spot) => {
                      const isOpen = activeHotspot?.id === spot.id
                      return (
                        <div
                          key={spot.id}
                          style={{ left: spot.x, top: spot.y }}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                        >
                          <button
                            type="button"
                            onClick={() => setActiveHotspot(isOpen ? null : spot)}
                            className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-accent shadow-lg transition-transform hover:scale-110 focus:outline-none"
                            aria-label={`View detail: ${spot.title}`}
                          >
                            <span className="absolute h-full w-full rounded-full bg-white/50 animate-ping" />
                            <Sparkles size={14} />
                          </button>

                          {/* Hotspot Popover Tooltip */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-10 left-1/2 z-30 w-64 -translate-x-1/2 rounded-xl border border-white/40 bg-white/95 p-3.5 shadow-xl backdrop-blur-md sm:w-72"
                              >
                                <p className="font-display text-xs font-bold uppercase tracking-wider text-ink">
                                  {spot.title}
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-inkMuted">
                                  {spot.desc}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </>
                )}

                {/* Stage Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col justify-between gap-2 sm:bottom-6 sm:left-6 sm:right-6 sm:flex-row sm:items-end">
                  <div className="max-w-xl text-white">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-[0.24em] text-white/80">
                      Phase {activeStage.step} • {activeStage.label}
                    </span>
                    <p className="mt-1 font-display text-xl font-semibold sm:text-2xl">
                      {activeStage.subtitle}
                    </p>
                  </div>
                  <p className="text-xs italic text-white/90 max-w-xs text-right hidden sm:block">
                    "{activeStage.note}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Specifications Bar Below Image */}
          <div className="mt-4 grid gap-4 rounded-xl border border-stone-200/90 bg-stone-50/60 p-4 sm:grid-cols-3">
            {activeStage.specs.map((spec, i) => (
              <div key={i} className="space-y-1 border-stone-200 sm:border-r sm:last:border-r-0 sm:pr-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-inkMuted">
                  {spec.label}
                </p>
                <p className="text-xs font-semibold text-ink sm:text-sm">
                  {spec.val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FromFirstLineToFrontDoor

