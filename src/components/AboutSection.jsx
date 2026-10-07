import { motion } from 'framer-motion'
import { CheckCircle2, Compass, ShieldCheck } from 'lucide-react'

function AboutSection({ about }) {
  const brandMeaning =
    about?.brand_meaning ||
    '"Thozha" translates to "trusted companion" in Tamil — a commitment to stand with each client from the initial sketch to the handover of keys.'

  const founderName = about?.founder_name || 'Er. Taran D V'
  const partnerName = about?.partner_lead_name || 'Er. Sampath Kumar A'

  return (
    <section id="about" className="scroll-mt-28 section-space bg-white">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center xl:gap-16">
          {/* Left: Narrative and Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-inkMuted">
              <Compass size={13} className="text-accent" />
              Our Story & Philosophy
            </div>

            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Engineering with heart.{' '}
              <span className="italic text-accent font-normal">Constructed to endure.</span>
            </h2>

            <p className="text-base leading-relaxed text-inkMuted sm:text-lg">
              {about?.story ||
                'Founded in 2014, Thozha Associates was established on a simple conviction: building a home or commercial property shouldn’t feel chaotic. It should be an orderly, transparent, and collaborative process led by experienced civil engineers.'}
            </p>

            {/* Brand Meaning Card */}
            <div className="rounded-2xl border border-stone-200/90 bg-stone-50/70 p-5 sm:p-6">
              <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
                The Origin of Thozha
              </p>
              <p className="mt-2 text-sm italic leading-relaxed text-ink">
                {brandMeaning}
              </p>
            </div>

            {/* Engineering Principles */}
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="mt-0.5 text-accent shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink">Zero Ambiguity Budgeting</p>
                  <p className="mt-0.5 text-xs text-inkMuted">Detailed material specifications and stage-wise billing with no surprises.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-accent shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink">Structural Discipline</p>
                  <p className="mt-0.5 text-xs text-inkMuted">Strict adherence to Indian Standard (IS) codes, cube testing, and soil reports.</p>
                </div>
              </div>
            </div>

            {/* Leadership mention */}
            <div className="border-t border-stone-100 pt-5 text-xs text-inkMuted">
              <p>
                Led by <strong className="text-ink">{founderName}</strong> (Civil Engineer & Founder) and{' '}
                <strong className="text-ink">{partnerName}</strong> (Project Management Lead).
              </p>
            </div>
          </motion.div>

          {/* Right: Dedicated Architectural Imagery & Metric Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white p-3 shadow-soft sm:p-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 sm:aspect-[4/4]">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop"
                  alt="Thozha Associates architectural craftsmanship and materiality"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                    Regional Craft & Construction
                  </p>
                  <p className="font-display text-lg font-semibold sm:text-xl">
                    Serving Erode, Coimbatore, Salem & Tamil Nadu
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
