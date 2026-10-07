import { motion } from 'framer-motion'
import { ArrowUpRight, Building2, DraftingCompass, Home, RefreshCw } from 'lucide-react'

const CORE_SERVICES = [
  {
    number: '01',
    icon: Home,
    title: 'Residential Construction',
    subtitle: 'Bespoke Turnkey Homes',
    description:
      'Complete end-to-end villa and residence construction. We oversee structural foundations, brickwork, waterproofing, electrical/plumbing, and fine architectural finishing.',
    deliverables: [
      'Custom architectural floorplans & elevations',
      'Structural design with IS-standard compliance',
      'Daily site supervision & milestone progress tracking',
      'Complete turnkey handover with warranties',
    ],
  },
  {
    number: '02',
    icon: Building2,
    title: 'Commercial Construction',
    subtitle: 'Offices, Warehouses & Retail Blocks',
    description:
      'Functional, durable commercial architecture designed for circulation, visual identity, long spans, and rapid execution timelines.',
    deliverables: [
      'Industrial warehouses & steel structural sheds',
      'Commercial retail pavilions & corporate spaces',
      'HVAC, MEP, and vehicular access planning',
      'Stringent material testing and safety compliance',
    ],
  },
  {
    number: '03',
    icon: DraftingCompass,
    title: 'Structural Design & Approvals',
    subtitle: 'Engineering Rationale & Regulatory Clearances',
    description:
      'Robust civil engineering calculations that balance aesthetic ambition with earthquake, soil, and load resistance.',
    deliverables: [
      'Soil testing & foundation recommendations',
      'AutoCAD & BIM structural working drawings',
      'Local DTCP & Municipal building plan approvals',
      'Structural stability certificates & retrofitting advice',
    ],
  },
  {
    number: '04',
    icon: RefreshCw,
    title: 'Renovation & Interior Civil',
    subtitle: 'Adaptive Reuse & Modern Refresh',
    description:
      'Transforming aging or outdated properties into bright, contemporary spaces through structural reconfiguration, lightwells, and modern civil finishes.',
    deliverables: [
      'Load-bearing wall removal & beam insertion',
      'Natural light optimization & courtyard additions',
      'Micro-cement, lime wash, and Italian marble flooring',
      'Exterior facade modernizations & weatherproofing',
    ],
  },
]

function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-28 section-space bg-stone-50/50">
      <div className="section-shell">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-inkMuted shadow-sm">
            Disciplines & Scope
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Disciplines built around precision.
          </h2>
          <p className="mt-3 text-base text-inkMuted sm:text-lg">
            From technical foundation calculations to custom residential architecture, our integrated civil engineering team delivers every phase under one roof.
          </p>
        </div>

        {/* 4-Card Architectural Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                    <span className="font-display text-sm font-bold tracking-widest text-inkMuted">
                      {service.number}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-stone-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <Icon size={18} />
                    </span>
                  </div>

                  <div className="mt-5 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                      {service.subtitle}
                    </p>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-inkMuted">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-stone-100 pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-inkMuted">
                      Key Deliverables
                    </p>
                    <ul className="mt-2.5 space-y-2 text-xs text-ink/80">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <a
                    href="#quote"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-colors group-hover:text-accentDark"
                  >
                    Discuss This Service
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
