import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Award, Building, Compass } from 'lucide-react'
import { useState } from 'react'

function HeroSection({ blueprintImage, finalImage, company, features = [] }) {
  const [viewMode, setViewMode] = useState('finished') // 'finished' or 'blueprint'

  const heroImageSrc =
    viewMode === 'finished'
      ? finalImage?.src ||
        company.hero_final_url ||
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
      : blueprintImage?.src ||
        company.hero_blueprint_url ||
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop'

  return (
    <section
      id="home"
      className="relative scroll-mt-28 overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center xl:gap-16">
          {/* Left Column: Confident Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center space-y-6 sm:space-y-8"
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-stone-300/80 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-inkMuted shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Civil Engineering & Architecture • Tamil Nadu
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl xl:text-6xl">
                Thoughtfully designed.{' '}
                <span className="text-accent italic font-normal">Built for everyday life.</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-inkMuted sm:text-lg">
                {company.blurb ||
                  'Civil engineering, bespoke residential architecture, and turnkey construction across Tamil Nadu — from foundational planning to final handover.'}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a
                href="#projects"
                className="cta-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs tracking-[0.16em]"
              >
                Explore Selected Works
                <ArrowRight size={15} />
              </a>
              <a
                href="#quote"
                className="cta-secondary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs tracking-[0.16em]"
              >
                Discuss Your Project
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Trust Markers Bar */}
            <div className="grid grid-cols-3 gap-4 border-t border-stone-200/80 pt-6 sm:gap-6 sm:pt-8">
              <div>
                <p className="font-display text-2xl font-bold text-ink sm:text-3xl">2014</p>
                <p className="mt-1 text-xs font-medium tracking-wide text-inkMuted">Established Firm</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-ink sm:text-3xl">100+</p>
                <p className="mt-1 text-xs font-medium tracking-wide text-inkMuted">Delivered Homes</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-ink sm:text-3xl">100%</p>
                <p className="mt-1 text-xs font-medium tracking-wide text-inkMuted">On-Site Rigor</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Luminous Architectural Showcase Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-2.5 shadow-[0_20px_50px_rgba(31,36,33,0.08)] sm:p-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 sm:aspect-[16/12]">
                <img
                  key={heroImageSrc}
                  src={heroImageSrc}
                  alt={finalImage?.alt || 'Featured architectural residence by Thozha Associates'}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Floating Architectural Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/40 bg-white/90 p-3 shadow-lg backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4 sm:p-3.5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-ink">
                      Palm Courtyard Residence
                    </p>
                    <p className="text-[11px] font-medium text-inkMuted">
                      3,450 sq.ft • Turnkey Architectural Build
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Delivered
                  </span>
                </div>
              </div>

              {/* View Mode Toggle: Finished vs Technical Blueprint */}
              <div className="mt-3 flex items-center justify-between px-2 py-1 text-xs text-inkMuted">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Compass size={13} className="text-accent" />
                  Erode • Coimbatore • Tamil Nadu
                </span>
                <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setViewMode('finished')}
                    className={`rounded-full px-2.5 py-1 font-medium transition ${
                      viewMode === 'finished'
                        ? 'bg-white text-ink shadow-sm'
                        : 'text-inkMuted hover:text-ink'
                    }`}
                  >
                    Finished
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('blueprint')}
                    className={`rounded-full px-2.5 py-1 font-medium transition ${
                      viewMode === 'blueprint'
                        ? 'bg-white text-ink shadow-sm'
                        : 'text-inkMuted hover:text-ink'
                    }`}
                  >
                    Blueprint
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle decorative accent pill */}
            <div className="pointer-events-none absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
