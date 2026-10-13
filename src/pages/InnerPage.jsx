import { useEffect, useMemo } from 'react'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'

import FloatingActions from '@/components/FloatingActions'
import LeadFormSection from '@/components/LeadFormSection'
import Navbar from '@/components/Navbar'
import { processItems, serviceItems } from '@/data/siteData'
import { useHomeData } from '@/hooks/useHomeData'
import { resolveAssetUrl } from '@/services/frameSequence'
import { slugify } from '@/utils/helpers'

const pageCopy = {
  about: ['About Thozha', 'Local understanding. Professional discipline.', 'Thozha Associates brings architectural thinking, civil engineering and practical construction support together for homes and businesses in and around Pollachi.'],
  projects: ['Selected work', 'Spaces shaped with purpose.', 'Published projects from the studio appear here. Illustrative imagery is clearly identified whenever live project records are unavailable.'],
  services: ['Our expertise', 'Complete support for every stage.', 'Planning, visualisation, documentation, approvals, estimating, engineering and coordinated construction.'],
  process: ['Our process', 'From first line to front door.', 'A clear four-stage path keeps design intent, documentation and site execution aligned.'],
  careers: ['Careers', 'Help build thoughtful places.', 'Current openings will be published here when verified roles are available. You can still contact the studio to introduce yourself.'],
  contact: ['Contact', 'Let’s discuss your project.', 'Share the location, approximate area and the kind of support you need.'],
}

function SimpleFooter() {
  return <footer className="inner-footer"><span>THOZHA ASSOCIATES</span><p>Venkatasa Colony, Pollachi, Tamil Nadu 642001 · +91 98431 61705</p><Link to="/admin">Admin</Link></footer>
}

function InnerPage() {
  const { pathname } = useLocation()
  const { slug } = useParams()
  const { cmsProjects, company: loadedCompany } = useHomeData()
  const company = useMemo(() => ({ ...loadedCompany, phone: loadedCompany.phone || '+91 98431 61705', whatsapp: loadedCompany.whatsapp || '919843161705' }), [loadedCompany])
  const section = pathname.split('/').filter(Boolean)[0] || 'about'
  const detail = section === 'services' && slug ? serviceItems.find((item) => item.slug === slug) : null
  const project = section === 'projects' && slug ? cmsProjects.find((item) => (item.slug || slugify(item.title)) === slug) : null
  const copy = pageCopy[section] || pageCopy.about

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${detail?.title || project?.title || copy[1]} | Thozha Associates`
  }, [copy, detail, project])

  const isIllustrative = project && String(project.id).startsWith('proj-')

  return <div className="site-canvas inner-site"><Navbar company={company}/><main>
    <section className="inner-hero"><div><Link className="back-link" to="/"><ArrowLeft size={15}/> Home</Link><p className="micro-label">{detail ? 'Service' : project ? (isIllustrative ? 'Illustrative concept' : project.category) : copy[0]}</p><h1>{detail?.title || (isIllustrative ? `${project.category} design study` : project?.title) || copy[1]}</h1><p>{detail?.copy || project?.summary || copy[2]}</p></div><img src={detail?.image || project?.cover_image_url || resolveAssetUrl('frames/frame_0065.webp')} alt=""/></section>

    {section === 'about' && <section className="inner-content split-copy"><div><p className="micro-label">Our point of view</p><h2>Design should make everyday life work better.</h2></div><div><p>We combine considered layouts, clear technical documentation and practical site coordination. Every engagement begins with the people using the space, the realities of the site and an honest understanding of scope.</p><p>Professional credentials supplied by the business: Registered Engineer Grade-I and Executive Committee Member, Engineers Club Tamil Nadu. These remain subject to supporting verification before publication.</p></div></section>}

    {section === 'services' && !detail && <section className="inner-content inner-card-grid">{serviceItems.map((item) => <Link to={`/services/${item.slug}`} key={item.slug}><img src={item.image} alt=""/><span>{item.title}</span><ArrowRight size={16}/></Link>)}</section>}
    {detail && <section className="inner-content split-copy"><div><p className="micro-label">How we help</p><h2>{detail.title}</h2></div><div><p>{detail.copy} The exact scope, deliverables and applicable authority requirements are confirmed during consultation.</p><Link className="button button-primary" to="/contact">Discuss this service <ArrowRight size={15}/></Link></div></section>}

    {section === 'process' && <section className="inner-content inner-process">{processItems.map((item) => <article key={item.number}><span>{item.number}</span><img src={item.image} alt=""/><h2>{item.title}</h2><p>{item.copy}</p></article>)}</section>}

    {section === 'projects' && !project && <section className="inner-content inner-projects">{cmsProjects.map((item) => { const demo = String(item.id).startsWith('proj-'); return <Link to={`/projects/${item.slug || slugify(item.title)}`} key={item.id}><img src={item.cover_image_url} alt=""/><small>{demo ? 'Illustrative concept' : item.category}</small><h2>{demo ? `${item.category} design study` : item.title}</h2><p><MapPin size={13}/>{demo ? 'Reference imagery — not a completed Thozha project' : item.location}</p></Link> })}</section>}
    {project && <section className="inner-content project-overview"><div><p className="micro-label">Project overview</p><h2>{isIllustrative ? 'About this visual study' : 'Design approach'}</h2><p>{isIllustrative ? 'This page uses reference imagery to demonstrate the intended project presentation. It is not represented as completed work by Thozha Associates.' : project.summary}</p></div><dl><div><dt>Category</dt><dd>{project.category || '—'}</dd></div><div><dt>Location</dt><dd>{isIllustrative ? 'Not applicable' : project.location || '—'}</dd></div><div><dt>Area</dt><dd>{isIllustrative ? 'Not published' : project.area_label || '—'}</dd></div><div><dt>Year</dt><dd>{isIllustrative ? 'Not published' : project.year || '—'}</dd></div></dl></section>}

    {section === 'careers' && <section className="inner-content availability-note"><h2>No verified vacancies are currently published.</h2><p>For future opportunities, introduce yourself through the contact form and include your discipline and experience in the message.</p></section>}
    {section === 'contact' ? <LeadFormSection company={company}/> : <section className="inner-cta"><p className="micro-label">Begin your project</p><h2>Let&apos;s Build Something Meaningful.</h2><Link className="button button-primary" to="/contact">Start a conversation <ArrowRight size={15}/></Link></section>}
  </main><FloatingActions company={company}/><SimpleFooter/></div>
}

export default InnerPage
