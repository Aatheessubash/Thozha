import { useEffect } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import AboutSection from '@/components/AboutSection'
import BeforeAfterShowcaseSection from '@/components/BeforeAfterShowcaseSection'
import FloatingActions from '@/components/FloatingActions'
import FromFirstLineToFrontDoor from '@/components/FromFirstLineToFrontDoor'
import HeroSection from '@/components/HeroSection'
import LeadFormSection from '@/components/LeadFormSection'
import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import ProjectsSection from '@/components/ProjectsSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import { useHomeData } from '@/hooks/useHomeData'
import { buildProjectHeight, formatPhoneHref } from '@/utils/helpers'

function HomePage() {
  const {
    loading,
    buildStages,
    cmsProjects,
    company,
    siteContent,
    testimonials,
  } = useHomeData()

  const managedProjects = cmsProjects.map((project, index) => ({
    id: project.id,
    title: project.title,
    category: project.category,
    location: project.location,
    areaLabel: project.area_label,
    year: project.year,
    status: project.status,
    summary: project.summary,
    image: {
      src: project.cover_image_url,
      alt: project.title,
      sourceUrl: project.cover_image_url,
    },
    beforeImage: project.before_image_url
      ? {
          src: project.before_image_url,
          alt: `${project.title} before`,
        }
      : null,
    afterImage: project.after_image_url
      ? {
          src: project.after_image_url,
          alt: `${project.title} after`,
        }
      : null,
    aspect: buildProjectHeight(index),
    source: 'Client project library',
  }))

  const liveHeroBlueprint = buildStages[0]?.image
  const liveHeroFinal = buildStages.at(-1)?.image || buildStages[0]?.image
  const heroBlueprint = company.hero_blueprint_url
    ? {
        src: company.hero_blueprint_url,
        alt: `${company.name} blueprint`,
        sourceUrl: company.hero_blueprint_url,
      }
    : liveHeroBlueprint
  const heroFinal = company.hero_final_url
    ? {
        src: company.hero_final_url,
        alt: `${company.name} completed project`,
        sourceUrl: company.hero_final_url,
      }
    : liveHeroFinal

  const brandInitials = (company.name || 'TA')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const socialLinks = Array.isArray(siteContent?.social_links)
    ? siteContent.social_links
    : []

  const getSocialUrl = (keyword, fallbackUrl) => {
    const matched = socialLinks.find((item) =>
      String(item?.label || '')
        .toLowerCase()
        .includes(keyword),
    )

    return matched?.url?.trim() || fallbackUrl
  }

  const footerSocialLinks = [
    {
      label: 'Instagram',
      href: getSocialUrl('instagram', 'https://www.instagram.com'),
      icon: FaInstagram,
    },
    {
      label: 'LinkedIn',
      href: getSocialUrl('linkedin', 'https://www.linkedin.com'),
      icon: FaLinkedinIn,
    },
    {
      label: 'Facebook',
      href: getSocialUrl('facebook', 'https://www.facebook.com'),
      icon: FaFacebookF,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/${company.whatsapp?.replace(/\D/g, '') || '919442268288'}`,
      icon: FaWhatsapp,
    },
  ]

  useEffect(() => {
    const title = `${company.name || 'Thozha Associates'} | Architecture & Civil Engineering`
    document.title = title

    const iconHref = company.logo_url || '/favicon.svg'
    const linkRels = ['icon', 'shortcut icon', 'apple-touch-icon']

    linkRels.forEach((relValue) => {
      let link = document.querySelector(`link[rel="${relValue}"]`)

      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', relValue)
        document.head.appendChild(link)
      }

      link.setAttribute('href', iconHref)
    })
  }, [company?.logo_url, company?.name])

  return (
    <div className="relative overflow-x-hidden bg-[#FAF9F6] text-ink antialiased">
      <Loader active={loading} />
      <Navbar company={company} />

      <main>
        {/* 1. Luminous Editorial Hero */}
        <HeroSection
          blueprintImage={heroBlueprint}
          finalImage={heroFinal}
          company={company}
          features={siteContent.hero_features}
        />

        {/* 2. Curated Project Showcase (Immediately Follows Hero) */}
        <ProjectsSection projects={managedProjects} />

        {/* 3. Signature Feature: From First Line to Front Door */}
        <FromFirstLineToFrontDoor />

        {/* 4. Physical Transformation: Before & After */}
        <BeforeAfterShowcaseSection company={company} projects={managedProjects} />

        {/* 5. Company Story & Engineering Philosophy */}
        <AboutSection about={siteContent.about} />

        {/* 6. Disciplines & Key Scope */}
        <ServicesSection />

        {/* 7. Client Reviews & Feedback */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 8. Dedicated Consultation & Feasibility Enquiry */}
        <LeadFormSection company={company} />
      </main>

      <FloatingActions company={company} />

      {/* Clean Architectural Footer */}
      <footer className="border-t border-stone-200 bg-white py-14">
        <div className="section-shell">
          <div className="rounded-3xl border border-stone-200 bg-[#FAF9F6] p-7 sm:p-10 shadow-sm">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.9fr]">
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  {company.logo_url ? (
                    <img
                      src={company.logo_url}
                      alt={`${company.name} logo`}
                      className="h-12 w-12 rounded-xl object-cover border border-stone-200"
                    />
                  ) : (
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent font-display text-base font-bold text-white shadow-sm">
                      {brandInitials}
                    </div>
                  )}
                  <div>
                    <p className="font-display text-xl font-bold text-ink">
                      {company.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-inkMuted">
                      Civil Engineering & Architecture • Tamil Nadu
                    </p>
                  </div>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-inkMuted">
                  {company.name} designs, engineers, and constructs bespoke residential homes, commercial facilities, and architectural renovations with uncompromising structural discipline and transparent turnkey execution.
                </p>

                <p className="text-xs text-inkMuted">
                  Serving Erode, Coimbatore, Salem, Tiruppur, and clients across South India.
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink">
                  Direct Contact
                </p>
                <div className="mt-4 space-y-2.5 text-sm text-inkMuted">
                  <a
                    href={formatPhoneHref(company.phone || '+91 94422 68288')}
                    className="block font-medium text-ink hover:text-accent"
                  >
                    {company.phone || '+91 94422 68288'}
                  </a>
                  <a
                    href={`mailto:${company.email || 'contact@thozhaassociates.com'}`}
                    className="block break-all hover:text-accent"
                  >
                    {company.email || 'contact@thozhaassociates.com'}
                  </a>
                  <p>{company.location || 'Erode & Tamil Nadu, India'}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink">
                  Connect & Social
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {footerSocialLinks.map((item) => {
                    const Icon = item.icon

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        title={item.label}
                        aria-label={item.label}
                        className="grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-white text-ink shadow-sm transition hover:border-accent hover:bg-accent hover:text-white"
                      >
                        <Icon size={15} />
                      </a>
                    )
                  })}
                </div>
                <div className="mt-6">
                  <a
                    href="#quote"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    Schedule an On-Site Consultation →
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-between gap-4 border-t border-stone-200/80 pt-6 text-xs text-inkMuted sm:flex-row sm:items-center">
              <div>
                © {new Date().getFullYear()} {company.name}. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <span>Residential & Commercial Civil Engineering</span>
                <span className="text-stone-300">•</span>
                <Link
                  to="/admin"
                  className="text-stone-400 hover:text-stone-600 transition"
                  aria-label="Admin Portal"
                >
                  Admin Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
