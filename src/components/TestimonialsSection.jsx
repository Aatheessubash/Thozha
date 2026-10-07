import { AnimatePresence, motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

import SectionHeader from '@/components/SectionHeader'

function TestimonialAvatar({ imageUrl, name }) {
  const [broken, setBroken] = useState(false)

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  if (!imageUrl || broken) {
    return (
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-stone-100 font-display text-sm font-semibold text-accent">
        {initials}
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      className="h-12 w-12 shrink-0 rounded-full border border-stone-200 object-cover"
      loading="lazy"
      onError={() => setBroken(true)}
    />
  )
}

function TestimonialsSection({ testimonials = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (testimonials.length <= 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((value) => (value + 1) % testimonials.length)
    }, 6000)

    return () => {
      window.clearInterval(timer)
    }
  }, [testimonials.length])

  if (!testimonials.length) {
    return null
  }

  const activeTestimonial = testimonials[activeIndex] || testimonials[0]

  return (
    <section id="testimonials" className="scroll-mt-28 section-space bg-stone-50/40">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Client Experiences"
          title="What clients say about our planning and execution"
          description="Direct reflections from homeowners and developers across Tamil Nadu who partnered with us for turnkey design and construction."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Main Featured Testimonial Card */}
          <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-soft sm:p-10">
            <Quote className="mb-6 text-accent/30" size={44} />

            <AnimatePresence mode="wait">
              <motion.article
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: activeTestimonial.rating || 5 }).map(
                    (_, index) => (
                      <Star key={index} size={17} fill="currentColor" />
                    ),
                  )}
                </div>

                <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
                  "{activeTestimonial.message}"
                </p>

                <div className="flex items-center gap-4 border-t border-stone-100 pt-6">
                  <TestimonialAvatar
                    imageUrl={activeTestimonial.image_url}
                    name={activeTestimonial.name}
                  />
                  <div>
                    <p className="font-display text-base font-semibold text-ink">
                      {activeTestimonial.name}
                    </p>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-inkMuted">
                      {activeTestimonial.project_type || 'Verified Homeowner'}
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Testimonial List Switcher */}
          <div className="space-y-3.5">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-full rounded-2xl border p-4 text-left transition-all sm:p-5 ${
                  activeIndex === index
                    ? 'border-accent bg-white shadow-sm ring-1 ring-accent'
                    : 'border-stone-200/90 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <TestimonialAvatar
                      imageUrl={testimonial.image_url}
                      name={testimonial.name}
                    />
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">
                        {testimonial.name}
                      </p>
                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-inkMuted">
                        {testimonial.project_type || 'Verified Client'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                    <Star size={13} fill="currentColor" />
                    <span>{testimonial.rating || 5}.0</span>
                  </div>
                </div>
                <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-inkMuted">
                  {testimonial.message}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
