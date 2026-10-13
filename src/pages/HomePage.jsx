import { createElement, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Cuboid,
  FileCheck2,
  Hammer,
  MapPin,
  PencilRuler,
  Quote,
  Trees,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import ArchitectureScrollHero from '@/components/ArchitectureScrollHero'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import FloatingActions from '@/components/FloatingActions'
import LeadFormSection from '@/components/LeadFormSection'
import Navbar from '@/components/Navbar'
import { processItems, serviceItems } from '@/data/siteData'
import { useHomeData } from '@/hooks/useHomeData'
import { useLenis } from '@/hooks/useLenis'
import { resolveAssetUrl } from '@/services/frameSequence'
import { formatPhoneHref, slugify } from '@/utils/helpers'

const capabilities = [
  [PencilRuler, 'Planning & Design', 'Site-aware layouts and considered architecture.'],
  [Cuboid, '3D Visualization', 'See form, materials and space before construction.'],
  [FileCheck2, 'Approvals & Documentation', 'Clear technical drawings and applicable support.'],
  [Hammer, 'Construction & Handover', 'Coordinated execution through final completion.'],
]

const faqs = [
  ['When should I involve your team?', 'Ideally before finalising the plot layout or construction budget. Early coordination helps align spatial needs, applicable approvals and buildability.'],
  ['Can you support only design or documentation?', 'Yes. The engagement can be scoped around planning, 3D visualisation, approval drawings, estimates, consultancy or coordinated construction.'],
  ['What information helps start a consultation?', 'Share the project location, approximate site or built-up area, intended use, timeline and any drawings or references already available.'],
  ['Do you work beyond Pollachi?', 'Project feasibility and the right service model are confirmed during consultation based on location, scope and required site involvement.'],
]

function CapabilityStrip() {
  return <section className="capability-strip" aria-label="Core capabilities">{capabilities.map(([icon, title, copy], index) => <article key={title}><span>0{index + 1}</span>{createElement(icon, { size: 24, strokeWidth: 1.35 })}<div><h2>{title}</h2><p>{copy}</p></div></article>)}</section>
}

function Projects({ projects }) {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Residential', 'Commercial', 'Renovation', 'Interior', 'Layout', 'Ongoing']
  const filtered = filter === 'All'
    ? projects
    : filter === 'Ongoing'
      ? projects.filter((project) => /progress|ongoing/i.test(project.status || ''))
      : projects.filter((project) => project.category === filter)

  return <section id="projects" className="editorial-section projects-section">
    <div className="section-heading-row"><div><p className="micro-label">Featured projects</p><h2>Spaces We&apos;ve Shaped</h2></div><p>Explore the ideas, craftsmanship and engineering behind our work.</p></div>
    <div className="filter-row" role="group" aria-label="Filter projects">{categories.map((category) => <button key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div>
    <div className="project-grid">{filtered.slice(0, 3).map((project, index) => {
      const illustrative = String(project.id).startsWith('proj-')
      const slug = project.slug || slugify(project.title)
      return <article className={`project-card project-${index + 1}`} key={project.id}>
        <img src={project.cover_image_url} alt={illustrative ? 'Illustrative architectural concept' : project.title} loading={index ? 'lazy' : 'eager'}/>
        <div className="project-shade"/>
        <div className="project-meta"><span>{illustrative ? 'Illustrative concept' : project.category}</span><h3>{illustrative ? `${project.category} design study` : project.title}</h3><p><MapPin size={13}/> {illustrative ? 'Reference imagery — not completed Thozha work' : [project.location, project.area_label, project.year].filter(Boolean).join(' · ')}</p></div>
        <Link to={`/projects/${slug}`} aria-label={`View ${illustrative ? 'illustrative concept' : project.title}`}><ArrowRight size={18}/></Link>
      </article>
    })}</div>
    {!filtered.length && <p className="empty-note">No published projects in this category yet.</p>}
  </section>
}

function Philosophy() {
  return <section className="philosophy-section">
    <div className="philosophy-visual"><img src={resolveAssetUrl('images/thozha/planning-studio.webp')} alt="Architectural drawings, material samples and study model" loading="lazy"/><span>Ideas · spaces · people</span></div>
    <div className="material-board" aria-hidden="true"><i/><i/><i/><i/></div>
    <div className="philosophy-copy"><p className="micro-label">About Thozha Associates</p><h2>Thoughtful Design.<br/>Reliable Engineering.</h2><p>We combine design thinking with practical civil engineering to deliver spaces that work for people, today and for generations to come. Every decision is grounded in the site, the brief and a clear understanding of how the building will be made.</p><Link className="button button-outline" to="/about">Know more about us <ArrowRight size={15}/></Link></div>
  </section>
}

function Process() {
  return <section id="process" className="process-section editorial-section">
    <div className="process-intro"><p className="micro-label">Our process</p><h2>From First Line<br/>to Front Door</h2><p>A transparent, step-by-step process that turns your vision into a space you&apos;ll love living in.</p><Link className="button button-outline" to="/process">Know our process <ArrowRight size={15}/></Link></div>
    <div className="process-cards">{processItems.map((item, index) => <article key={item.number}>
      <header><span>{item.number}</span><h3>{item.title}</h3></header>
      <img src={item.image} alt="" loading="lazy"/>
      <p>{item.copy}</p>
      {index < processItems.length - 1 && <i aria-hidden="true"><ArrowRight size={15}/></i>}
    </article>)}</div>
  </section>
}

function PollachiStory() {
  return <section id="about" className="pollachi-band">
    <div className="pollachi-landscape"><img src={resolveAssetUrl('images/thozha/pollachi-landscape.webp')} alt="Coconut groves, irrigation channel and the Western Ghats near Pollachi" loading="lazy"/><div><Trees size={28}/><p className="micro-label">Local knowledge · considered design</p><h2>Rooted in Pollachi.<br/>Designed for Tomorrow.</h2><p>We understand the people, places and practical needs behind every project. Our approach brings together local knowledge, thoughtful design and reliable engineering.</p><Link className="button button-outline light" to="/about">Know more about us <ArrowRight size={15}/></Link></div></div>
    <div className="credential-paper"><p className="micro-label">Professional practice</p><h3>Credentials supplied by the business</h3><p className="credential-note">Shown subject to supporting verification before publication.</p><article><BadgeCheck/><span><small>Professional credential</small><strong>Registered Engineer Grade-I</strong></span></article><article><Building2/><span><small>Professional membership</small><strong>Executive Committee Member, Engineers Club Tamil Nadu</strong></span></article></div>
  </section>
}

function Services() {
  return <section id="services" className="editorial-section services-section">
    <div className="section-heading-row"><div><p className="micro-label">Our services</p><h2>Complete Support<br/>for Every Stage</h2></div><p>From concept to completion, practical civil engineering and architectural support under one roof.</p></div>
    <div className="service-image-grid">{serviceItems.map((service, index) => <Link to={`/services/${service.slug}`} key={service.slug} className="service-image-card">
      <div className="service-thumb"><img src={service.image} alt="" loading="lazy"/></div>
      <div className="service-card-copy"><span>0{index + 1}</span>{createElement(service.icon, { size: 21, strokeWidth: 1.4 })}<h3>{service.title}</h3><p>{service.copy}</p><i><ArrowRight size={15}/></i></div>
    </Link>)}</div>
  </section>
}

function CaseStudy({ project }) {
  if (!project) return null
  const illustrative = String(project.id).startsWith('proj-')
  return <section className="case-study-section">
    <div className="case-study-image"><img src={project.cover_image_url} alt={illustrative ? 'Illustrative residential architecture concept' : project.title} loading="lazy"/><span>{illustrative ? 'Illustrative concept' : 'Featured project'}</span></div>
    <div className="case-study-copy"><p className="micro-label">Selected study</p><h2>{illustrative ? 'Contemporary Tropical Residence' : project.title}</h2><p>{illustrative ? 'A presentation study showing how climate-responsive planning, shaded openings, natural materials and landscape can work together in a contemporary family home.' : project.summary}</p><dl><div><dt>Category</dt><dd>{project.category || '—'}</dd></div><div><dt>Location</dt><dd>{illustrative ? 'Sample presentation' : project.location || '—'}</dd></div><div><dt>Area</dt><dd>{illustrative ? 'Not published' : project.area_label || '—'}</dd></div><div><dt>Year</dt><dd>{illustrative ? 'Not published' : project.year || '—'}</dd></div></dl><div className="material-palette" aria-label="Material palette"><i/><i/><i/><i/></div></div>
  </section>
}

function Transformation({ projects }) {
  const project = projects.find((item) => !String(item.id).startsWith('proj-') && item.before_image_url && item.after_image_url)
  if (!project) return null
  return <section className="editorial-section transformation-section"><div className="section-heading-row"><div><p className="micro-label">Transformation</p><h2>See the Transformation</h2></div><p>Two real views of the same project, from original condition to completed space.</p></div><BeforeAfterSlider title={project.title} before={{ src: project.before_image_url, alt: `${project.title} before` }} after={{ src: project.after_image_url, alt: `${project.title} after` }}/></section>
}

function Reviews({ testimonials }) {
  const genuine = testimonials.filter((item) => !String(item.id).startsWith('default-'))
  return <section id="testimonials" className="editorial-section reviews-section"><div className="section-heading-row"><div><p className="micro-label">Client testimonials</p><h2>Words From Our Clients</h2></div><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Thozha+Associates+Pollachi" target="_blank" rel="noreferrer">View Google listing <ArrowRight size={16}/></a></div>{genuine.length ? <div className="review-grid">{genuine.slice(0, 3).map((item) => <article key={item.id}><Quote/><p>“{item.message}”</p><strong>{item.name}</strong><small>{item.project_type}</small></article>)}</div> : <div className="review-grid review-empty-grid">{[1, 2, 3].map((item) => <article key={item}><Quote/><p>Verified reviews appear here when connected from an approved source.</p><strong>Review content pending</strong><small>No testimonial has been invented.</small></article>)}</div>}</section>
}

function FAQ() {
  return <section className="faq-section editorial-section"><div><p className="micro-label">Frequently asked questions</p><h2>Project Planning<br/>Questions</h2><p>Useful starting points before a design or construction consultation.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span>0{index + 1}</span>{question}<i>+</i></summary><p>{answer}</p></details>)}</div></section>
}

function Footer({ company }) {
  const phone = company.phone || '+91 98431 61705'
  return <footer className="site-footer"><div className="footer-brand"><img src={resolveAssetUrl('images/thozha/thozha-logo.png')} alt="தோழா - Thozha Associates" className="footer-logo-img" /><strong>THOZHA</strong><span>ASSOCIATES</span><p>Designing Better Spaces for Everyday Life.</p></div><div><small>Visit</small><a href="https://www.google.com/maps/search/?api=1&query=Venkatasa+Colony+Pollachi+Tamil+Nadu+642001" target="_blank" rel="noreferrer">Venkatasa Colony<br/>Pollachi, Tamil Nadu 642001</a></div><div><small>Speak with us</small><a href={formatPhoneHref(phone)}>{phone}</a><a href={`https://wa.me/${(company.whatsapp || phone).replace(/\D/g, '')}`}>WhatsApp</a></div><div className="footer-links"><Link to="/about">About</Link><Link to="/projects">Projects</Link><Link to="/services">Services</Link><Link to="/process">Process</Link><Link to="/careers">Careers</Link><Link to="/contact">Contact</Link></div><p className="copyright">© {new Date().getFullYear()} Thozha Associates. All rights reserved. <Link to="/admin">Admin</Link></p></footer>
}

function HomePage() {
  useLenis()
  const { cmsProjects, company: loadedCompany, testimonials } = useHomeData()
  const company = useMemo(() => ({ ...loadedCompany, name: loadedCompany.name || 'Thozha Associates', phone: loadedCompany.phone || '+91 98431 61705', whatsapp: loadedCompany.whatsapp || '+91 98431 61705', location: loadedCompany.location || 'Venkatasa Colony, Pollachi, Tamil Nadu 642001' }), [loadedCompany])
  useEffect(() => { document.title = 'Thozha Associates | Civil Engineering, Design & Construction in Pollachi' }, [])
  return <div className="site-canvas"><Navbar company={company}/><main><ArchitectureScrollHero company={company}/><CapabilityStrip/><Projects projects={cmsProjects}/><Philosophy/><Process/><PollachiStory/><Services/><CaseStudy project={cmsProjects[0]}/><Transformation projects={cmsProjects}/><Reviews testimonials={testimonials}/><FAQ/><LeadFormSection company={company}/></main><FloatingActions company={company}/><Footer company={company}/></div>
}

export default HomePage
