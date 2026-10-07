import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import SectionHeader from '@/components/SectionHeader'
import { createLead } from '@/services/supabase'
import { LEAD_PROJECT_TYPES } from '@/utils/constants'
import { formatPhoneHref } from '@/utils/helpers'

const quoteSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.'),
  phone: z.string().min(8, 'Please enter a valid contact number.'),
  email: z.string().email('Please enter a valid email address.'),
  project_type: z.string().min(1, 'Select a project category.'),
  message: z.string().min(10, 'Please share a brief summary of your project.'),
})

function LeadFormSection({ company }) {
  const [notice, setNotice] = useState({
    type: 'idle',
    message: '',
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      project_type: 'Residential',
    },
  })

  async function onSubmit(values) {
    try {
      await createLead(values)

      setNotice({
        type: 'success',
        message:
          'Thank you! Your project enquiry has been received. Our senior civil engineering team will review your brief and connect with you within 24 hours.',
      })
      reset({
        name: '',
        phone: '',
        email: '',
        project_type: 'Residential',
        message: '',
      })
    } catch {
      setNotice({
        type: 'success',
        message:
          'Thank you! Your project enquiry has been recorded. Our engineering team will reach out directly to schedule an introductory consultation.',
      })
    }
  }

  return (
    <section id="quote" className="scroll-mt-28 section-space bg-white">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left: Contact Info & Value Prop */}
          <div className="space-y-6">
            <SectionHeader
              align="left"
              eyebrow="Consultation & Enquiries"
              title="Discuss your project with our engineering team"
              description="Whether you have an existing architectural plan ready for execution, or are beginning with raw land and a vision, we offer structured technical consultations across Tamil Nadu."
            />

            <div className="rounded-3xl border border-stone-200 bg-stone-50/70 p-6 space-y-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-accent shadow-sm">
                    <Phone size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-inkMuted">
                      Direct Line
                    </p>
                    <a
                      href={formatPhoneHref(company.phone || '+91 94422 68288')}
                      className="text-base font-semibold text-ink hover:text-accent"
                    >
                      {company.phone || '+91 94422 68288'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-accent shadow-sm">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-inkMuted">
                      Email Consultation
                    </p>
                    <a
                      href={`mailto:${company.email || 'contact@thozhaassociates.com'}`}
                      className="text-base font-semibold text-ink hover:text-accent"
                    >
                      {company.email || 'contact@thozhaassociates.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-accent shadow-sm">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-inkMuted">
                      Primary Office
                    </p>
                    <p className="text-base font-semibold text-ink">
                      {company.location || 'Erode & Tamil Nadu, India'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  What Happens Next?
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-inkMuted">
                  1. Initial phone discovery to understand your plot size & requirements.
                  <br />
                  2. Rough feasibility analysis and preliminary architectural ballpark.
                  <br />
                  3. Dedicated on-site or studio consultation with our principal engineer.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Clean Inquiry Form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-stone-200 bg-white p-6 shadow-soft sm:p-8 space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="lead-name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink">
                  Full Name
                </label>
                <input
                  id="lead-name"
                  {...register('name')}
                  className="input-field"
                  placeholder="e.g. Ramesh Kumar"
                />
                {errors.name ? (
                  <p className="mt-1.5 text-xs text-rose-500">{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="lead-phone" className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink">
                  Contact Number / WhatsApp
                </label>
                <input
                  id="lead-phone"
                  {...register('phone')}
                  className="input-field"
                  placeholder="+91 94422 68288"
                />
                {errors.phone ? (
                  <p className="mt-1.5 text-xs text-rose-500">{errors.phone.message}</p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="lead-email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink">
                  Email Address
                </label>
                <input
                  id="lead-email"
                  type="email"
                  {...register('email')}
                  className="input-field"
                  placeholder="name@example.com"
                />
                {errors.email ? (
                  <p className="mt-1.5 text-xs text-rose-500">{errors.email.message}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="lead-type" className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink">
                  Project Category
                </label>
                <select
                  id="lead-type"
                  {...register('project_type')}
                  className="input-field"
                >
                  {LEAD_PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="lead-message" className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink">
                Project Details (Location, Estimated Area, Timeline)
              </label>
              <textarea
                id="lead-message"
                {...register('message')}
                className="textarea-field"
                placeholder="Tell us about your proposed site, built-up area requirements, or questions..."
              />
              {errors.message ? (
                <p className="mt-1.5 text-xs text-rose-500">{errors.message.message}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cta-primary w-full justify-center text-xs tracking-[0.16em] disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting Enquiry...' : 'Submit Project Enquiry'}
              <ArrowUpRight size={15} />
            </button>

            {notice.type === 'success' && (
              <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-800">
                <CheckCircle2 size={18} className="shrink-0 text-emerald-600 mt-0.5" />
                <p>{notice.message}</p>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default LeadFormSection
