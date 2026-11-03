import { useEffect, useMemo } from 'react'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'

import Footer from '@/components/Footer'
import LeadFormSection from '@/components/LeadFormSection'
import Navbar from '@/components/Navbar'
import { processItems, serviceItems } from '@/data/siteData'
import { useHomeData } from '@/hooks/useHomeData'
import { resolveAssetUrl } from '@/services/frameSequence'
import { slugify } from '@/utils/helpers'

const pageCopy = {
  about: [
    'About Thozha',
    'Local understanding. Professional discipline.',
    'Thozha Associates brings architectural thinking, civil engineering and practical construction support together for homes and businesses in and around Pollachi.',
  ],
  projects: [
    'Selected Work',
    'Spaces shaped with purpose.',
    'Explore our signature residential villas, commercial landmarks, and turnkey civil handovers across Western Tamil Nadu.',
  ],
  services: [
    'Our Expertise',
    'Complete civil support for every stage.',
    '2D municipal planning, photorealistic 3D elevations, statutory DTCP approvals, bank valuations, and turnkey living construction.',
  ],
  process: [
    'Our Process',
    'From first line to front door.',
    'A disciplined four-stage engineering roadmap keeping architectural vision, structural safety, and on-site execution perfectly aligned.',
  ],
  careers: [
    'Careers',
    'Help build thoughtful places.',
    'Current openings will be published here when verified roles are available. You can still contact the studio to introduce yourself.',
  ],
  contact: [
    'Contact',
    'Let’s discuss your project.',
    'Share your site location, approximate built area, and scope for a direct consultation with our principal civil engineer in Pollachi.',
  ],
}

export default function InnerPage() {
  const { pathname } = useLocation()
  const { slug } = useParams()
  const { cmsProjects, company: loadedCompany } = useHomeData()
  const company = useMemo(
    () => ({
      ...loadedCompany,
      phone: loadedCompany.phone || '+91 98431 61705',
      whatsapp: loadedCompany.whatsapp || '919843161705',
    }),
    [loadedCompany],
  )
  const section = pathname.split('/').filter(Boolean)[0] || 'about'
  const detail = section === 'services' && slug ? serviceItems.find((item) => item.slug === slug) : null
  const project =
    section === 'projects' && slug
      ? cmsProjects.find((item) => (item.slug || slugify(item.title)) === slug)
      : null
  const copy = pageCopy[section] || pageCopy.about

  const routeImages = {
    about: resolveAssetUrl('images/thozha/portfolio-anamalai.jpg'),
    projects: resolveAssetUrl('images/thozha/portfolio-vettaikaranpudur.jpg'),
    services: resolveAssetUrl('images/thozha/portfolio-commercial.jpg'),
    process: resolveAssetUrl('images/thozha/sample-stage1-cad.jpg'),
    careers: resolveAssetUrl('images/thozha/portfolio-kinathukadavu.jpg'),
    contact: resolveAssetUrl('images/thozha/sample-stage3-handover.jpg'),
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${detail?.title || project?.title || copy[1]} | Thozha Associates`
  }, [copy, detail, project])

  const isIllustrative = project && String(project.id).startsWith('proj-')

  return (
    <div className="thozha-app min-h-screen bg-[#FAF8F5] text-stone-900" data-template="warm">
      <Navbar company={company} />

      <main className="pt-28 sm:pt-36 pb-20">
        {/* Inner Hero Section */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <Link
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-[#B88628] mb-6 transition-colors no-underline py-1.5 min-h-[38px]"
                to="/"
              >
                <ArrowLeft size={15} /> Back to Studio
              </Link>
              <div className="mb-3">
                <span className="inline-block px-3 py-1 rounded-full bg-[#fbf7ee] text-[#b88628] text-[10px] font-extrabold uppercase tracking-widest border border-[#d4a853]/30 shadow-2xs">
                  {detail
                    ? 'Service Discipline'
                    : project
                    ? isIllustrative
                      ? 'Illustrative Concept'
                      : project.category
                    : copy[0]}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 leading-[1.08] tracking-tight">
                {detail?.title || (isIllustrative ? `${project.category} Design Study` : project?.title) || copy[1]}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
                {detail?.copy || project?.summary || copy[2]}
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[#E8E4DC] shadow-[0_16px_50px_rgba(40,30,20,0.08)] aspect-[16/11]">
              <img
                src={detail?.image || project?.cover_image_url || routeImages[section] || routeImages.about}
                alt={detail?.title || project?.title || copy[0]}
                className="w-full h-full object-cover object-center select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Section: About Thozha */}
        {section === 'about' && (
          <section className="max-w-6xl mx-auto px-6 py-12 border-t border-[#E8E4DC]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B88628]">Our Point of View</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 mt-2 leading-tight">
                  Design should make everyday life work better.
                </h2>
              </div>
              <div className="space-y-4 text-stone-600 leading-relaxed text-base">
                <p>
                  We combine considered layouts, clear technical documentation and practical site coordination. Every
                  engagement begins with the people using the space, the realities of the site and an honest
                  understanding of scope.
                </p>
                <div className="p-5 rounded-2xl bg-white border border-[#E8E4DC] shadow-xs">
                  <strong className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">
                    Institutional Registration &amp; Affiliations
                  </strong>
                  <p className="text-xs text-stone-600 m-0">
                    Registered Civil Engineer Grade-I (Pollachi Municipality / DTCP) and Executive Committee Member,
                    Engineers Club Tamil Nadu.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section: Services List */}
        {section === 'services' && !detail && (
          <section className="max-w-6xl mx-auto px-6 py-10 border-t border-[#E8E4DC]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceItems.map((item) => (
                <Link
                  to={`/services/${item.slug}`}
                  key={item.slug}
                  className="group rounded-3xl bg-white border border-[#E8E4DC] p-5 shadow-xs hover:border-[#B88628]/40 hover:-translate-y-1 transition-all no-underline block"
                >
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-[#B88628] transition-colors m-0">
                      {item.title}
                    </h3>
                    <ArrowRight size={16} className="text-[#B88628] shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Section: Service Detail */}
        {detail && (
          <section className="max-w-6xl mx-auto px-6 py-12 border-t border-[#E8E4DC]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B88628]">Service Overview</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 mt-2 leading-tight">
                  {detail.title}
                </h2>
              </div>
              <div className="space-y-5 text-stone-600 text-base leading-relaxed">
                <p>
                  {detail.copy} The exact scope, deliverables and applicable authority requirements are confirmed during
                  initial site consultation.
                </p>
                <div>
                  <Link
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1912] hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-[0.97] no-underline min-h-[44px]"
                    to="/contact"
                  >
                    <span>Discuss This Service</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section: Process Stages */}
        {section === 'process' && (
          <section className="max-w-6xl mx-auto px-6 py-10 border-t border-[#E8E4DC]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processItems.map((item) => (
                <article
                  key={item.number}
                  className="rounded-3xl bg-white border border-[#E8E4DC] p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#FAF8F5] text-[#B88628] font-mono text-xs font-bold mb-4 border border-[#E8E4DC]">
                      {item.number}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">{item.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Section: Projects Portfolio */}
        {section === 'projects' && !project && (
          <section className="max-w-6xl mx-auto px-6 py-10 border-t border-[#E8E4DC]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cmsProjects.map((item) => {
                const demo = String(item.id).startsWith('proj-')
                return (
                  <Link
                    to={`/projects/${item.slug || slugify(item.title)}`}
                    key={item.id}
                    className="group rounded-3xl bg-white border border-[#E8E4DC] p-4 shadow-xs hover:border-[#B88628]/40 hover:-translate-y-1 transition-all no-underline block"
                  >
                    <div className="aspect-[16/11] rounded-2xl overflow-hidden mb-3.5 bg-stone-100">
                      <img
                        src={item.cover_image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B88628] block mb-1">
                      {demo ? 'Illustrative Concept' : item.category}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-[#B88628] transition-colors mb-2">
                      {demo ? `${item.category} Design Study` : item.title}
                    </h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1.5 m-0">
                      <MapPin size={13} className="text-[#B88628] shrink-0" />
                      <span>{demo ? 'Reference Architecture Study' : item.location}</span>
                    </p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Section: Single Project Overview */}
        {project && (
          <section className="max-w-6xl mx-auto px-6 py-12 border-t border-[#E8E4DC]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B88628]">Project Brief</span>
                <h2 className="font-serif text-3xl font-semibold text-stone-900 mt-2 mb-4">
                  {isIllustrative ? 'About This Visual Study' : 'Design Approach'}
                </h2>
                <p className="text-stone-600 text-base leading-relaxed">
                  {isIllustrative
                    ? 'This showcase demonstrates architectural form, natural day-lighting and material specification engineered by Thozha Associates.'
                    : project.summary}
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-[#E8E4DC] p-6 shadow-xs divide-y divide-[#E8E4DC]">
                <div className="flex justify-between py-2.5 text-xs">
                  <span className="font-bold text-stone-500 uppercase tracking-wider">Category</span>
                  <span className="font-semibold text-stone-900">{project.category || '—'}</span>
                </div>
                <div className="flex justify-between py-2.5 text-xs">
                  <span className="font-bold text-stone-500 uppercase tracking-wider">Location</span>
                  <span className="font-semibold text-stone-900">{isIllustrative ? 'Western Tamil Nadu' : project.location || '—'}</span>
                </div>
                <div className="flex justify-between py-2.5 text-xs">
                  <span className="font-bold text-stone-500 uppercase tracking-wider">Built Area</span>
                  <span className="font-semibold text-stone-900">{project.area_label || '2,400 – 4,850 Sq.Ft'}</span>
                </div>
                <div className="flex justify-between py-2.5 text-xs">
                  <span className="font-bold text-stone-500 uppercase tracking-wider">Civil Spec</span>
                  <span className="font-semibold text-stone-900">M25 Monolithic RCC / DTCP Approved</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section: Careers Availability */}
        {section === 'careers' && (
          <section className="max-w-4xl mx-auto px-6 py-12 text-center border-t border-[#E8E4DC]">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mb-3">
              No Verified Vacancies are Currently Published.
            </h2>
            <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
              For future opportunities in site engineering or CAD drafting, introduce yourself through the consultation
              form and mention your discipline and years of on-site experience.
            </p>
          </section>
        )}

        {/* Contact Form or Bottom CTA */}
        {section === 'contact' ? (
          <div className="mt-8 border-t border-[#E8E4DC] pt-12">
            <LeadFormSection company={company} />
          </div>
        ) : (
          <section className="max-w-6xl mx-auto px-6 mt-16 pt-12 border-t border-[#E8E4DC]">
            <div className="rounded-3xl bg-[#1E1912] text-white p-8 sm:p-14 text-center shadow-lg relative overflow-hidden">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B88628]">Begin Your Project</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-2 mb-4 text-white">
                Let&apos;s Build Something Meaningful.
              </h2>
              <p className="text-stone-300 max-w-xl mx-auto text-sm sm:text-base mb-6 leading-relaxed">
                Consult directly with our principal civil engineer in Pollachi for site evaluations, Vaastu planning,
                and turnkey cost estimates.
              </p>
              <Link
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#B88628] via-[#C59940] to-[#A07420] text-white text-xs font-bold uppercase tracking-wider hover:brightness-105 active:scale-[0.97] transition-all no-underline shadow-md touch-manipulation min-h-[44px]"
                to="/contact"
              >
                <span>Start a Conversation</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer company={company} />
    </div>
  )
}
