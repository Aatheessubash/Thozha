import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createLead } from '@/services/supabase'
import { resolveAssetUrl } from '@/services/frameSequence'
import { LEAD_PROJECT_TYPES } from '@/utils/constants'

const quoteSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.'),
  phone: z.string().trim().refine((value) => /^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(value.replace(/[\s()-]/g, '')), 'Enter a valid Indian mobile number.'),
  project_type: z.string().min(1, 'Select a project type.'),
  area: z.string().trim().min(1, 'Enter an approximate area.'),
  location: z.string().trim().min(2, 'Enter the project location.'),
  message: z.string().trim().min(10, 'Share a short project brief.'),
  website: z.string().max(0, 'Spam check failed.'),
})

function FieldError({ error }) {
  return error ? <span className="form-error" role="alert">{error.message}</span> : null
}

function LeadFormSection() {
  const [notice, setNotice] = useState({ type: 'idle', message: '' })
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: { name: '', phone: '', project_type: 'Residential', area: '', location: '', message: '', website: '' },
  })

  async function onSubmit(values) {
    try {
      await createLead({
        name: values.name,
        phone: values.phone,
        email: '',
        project_type: values.project_type,
        message: `Approximate area: ${values.area}\nProject location: ${values.location}\n\n${values.message}`,
      })
      setNotice({ type: 'success', message: 'Thank you. Your enquiry has been received and the team will contact you shortly.' })
      reset()
    } catch {
      setNotice({ type: 'error', message: 'We could not send your enquiry. Please call or WhatsApp +91 98431 61705.' })
    }
  }

  return <section id="quote" className="consultation-section" style={{ '--consultation-image': `url(${resolveAssetUrl('images/thozha/tropical-interior.webp')})` }}>
    <div className="consultation-shell">
      <div className="consultation-copy"><p className="micro-label">Start a conversation</p><h2>Let&apos;s Build Something Meaningful.</h2><p>Tell us about your plans. Our team will help you explore the right next steps.</p><span className="consultation-index">THOZHA · PROJECT ENQUIRY</span></div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-heading"><strong>Tell us about your space</strong><small>A rough brief is enough to begin.</small></div>
        <div className="honeypot" aria-hidden="true"><label htmlFor="lead-website">Website</label><input id="lead-website" tabIndex="-1" autoComplete="off" {...register('website')}/></div>
        <label><span>Full Name</span><input {...register('name')} autoComplete="name" placeholder="Your name"/><FieldError error={errors.name}/></label>
        <label><span>Phone / WhatsApp</span><input {...register('phone')} inputMode="tel" autoComplete="tel" placeholder="+91 98431 61705"/><FieldError error={errors.phone}/></label>
        <label><span>Project Type</span><select {...register('project_type')}>{LEAD_PROJECT_TYPES.map((type) => <option key={type}>{type}</option>)}</select><FieldError error={errors.project_type}/></label>
        <label><span>Approx. Area</span><input {...register('area')} inputMode="numeric" placeholder="e.g. 2,400 sq. ft."/><FieldError error={errors.area}/></label>
        <label><span>Project Location</span><input {...register('location')} placeholder="Town / locality"/><FieldError error={errors.location}/></label>
        <label className="message-field"><span>Project Brief</span><textarea {...register('message')} placeholder="What would you like to create?"/><FieldError error={errors.message}/></label>
        <div className="form-submit-row"><p>Your details are used only to respond to this enquiry.</p><button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send Enquiry'} <ArrowRight size={16}/></button></div>
        {notice.type !== 'idle' && <div className={`form-notice ${notice.type}`} role="status"><CheckCircle2 size={17}/><span>{notice.message}</span></div>}
      </form>
    </div>
  </section>
}

export default LeadFormSection
