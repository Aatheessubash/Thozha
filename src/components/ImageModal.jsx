import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MapPin, X } from 'lucide-react'

import BeforeAfterSlider from '@/components/BeforeAfterSlider'

function ImageModal({ project, onClose }) {
  const detailCards = [
    {
      label: 'Location',
      value: project?.location,
    },
    {
      label: 'Status',
      value: project?.status,
    },
    {
      label: 'Built-up area',
      value: project?.areaLabel,
    },
    {
      label: 'Year',
      value: project?.year,
    },
  ].filter((detail) => detail.value)

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="custom-scrollbar relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-stone-200 bg-white p-4 shadow-2xl sm:p-6"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-6 top-6 z-10 grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-white/90 text-ink shadow-sm transition hover:bg-stone-100"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              {/* Image Frame */}
              <div className="overflow-hidden rounded-2xl bg-stone-100">
                <img
                  src={project.image?.src}
                  alt={project.image?.alt || project.title}
                  className="aspect-[4/3] w-full object-cover lg:aspect-[1/1]"
                />
              </div>

              {/* Project Information */}
              <div className="space-y-6 pt-2">
                <div className="space-y-3">
                  <span className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-inkMuted">
                    {project.summary}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {detailCards.map((detail) => (
                    <div
                      key={detail.label}
                      className="rounded-xl border border-stone-200/80 bg-stone-50/70 p-3.5"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-inkMuted">
                        {detail.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-ink">
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Direct Action Link */}
                <div className="border-t border-stone-100 pt-4">
                  <a
                    href="#quote"
                    onClick={onClose}
                    className="cta-primary w-full justify-center text-xs tracking-[0.16em]"
                  >
                    Discuss a Similar Project
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>

            {/* Before / After comparison if present */}
            {project.beforeImage && project.afterImage ? (
              <div className="mt-8 border-t border-stone-100 pt-6">
                <BeforeAfterSlider
                  before={project.beforeImage}
                  after={project.afterImage}
                  title={`${project.title} Transformation`}
                />
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ImageModal
