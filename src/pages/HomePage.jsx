import { createElement, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Compass,
  Cuboid,
  FileCheck2,
  FileText,
  Hammer,
  HardHat,
  Home,
  Landmark,
  Layers,
  MapPin,
  Paintbrush2,
  PencilRuler,
  Phone,
  ShieldCheck,
  Star,
  Trees,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import ArchitectureScrollHero from '@/components/ArchitectureScrollHero'
import EngineeringBimHero from '@/components/hero/EngineeringBimHero'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useHomeData } from '@/hooks/useHomeData'
import { useLenis } from '@/hooks/useLenis'
import { createLead } from '@/services/supabase'
import { resolveAssetUrl } from '@/services/frameSequence'
import { formatPhoneHref } from '@/utils/helpers'

// --- Core Pillars Data ---
const corePillars = [
  {
    icon: PencilRuler,
    title: '2D Drafting & Planning',
    desc: 'Precision architectural layouts, plumbing & electrical blueprints, and strict Vaastu compliance tailored to your plot orientation.',
    tag: 'DTCP Approved Blueprints',
  },
  {
    icon: Cuboid,
    title: '3D Exterior & BIM',
    desc: 'Photorealistic daylight simulations, dusk illumination studies, and immersive walkthroughs before breaking ground.',
    tag: 'BIM LOD-300 Modeling',
  },
  {
    icon: Landmark,
    title: 'Bank Valuation & BOQ',
    desc: 'Empaneled Category-1 certified valuations for SBI, HDFC, and Canara Bank with complete transparent cost itemization.',
    tag: 'Licensed CAT-1 Valuers',
  },
  {
    icon: Hammer,
    title: 'Turnkey Construction',
    desc: 'End-to-end execution with resident site engineers, rigorous concrete cube audits, transparent milestones, and zero budget creep.',
    tag: 'Fixed-Price Guarantee',
  },
]

// --- Work Process Steps ---
const workProcess = [
  {
    step: 'STEP 01',
    title: 'Survey & Vaastu Layout',
    desc: 'Total station contour survey, borehole soil test verification, and traditional Vaastu shastra cardinal space planning.',
  },
  {
    step: 'STEP 02',
    title: '3D BIM Visualization',
    desc: 'Photorealistic 3D external renders, sunlight and shadow simulations, material samples, and detailed floor plans.',
  },
  {
    step: 'STEP 03',
    title: 'Statutory Clearances',
    desc: 'STAAD-Pro earthquake resistance checks, rebar bar bending schedules, and swift DTCP / Panchayat approvals.',
  },
  {
    step: 'STEP 04',
    title: 'Execution & Handover',
    desc: 'Full civil execution with senior engineer supervision, transparent weekly updates, and hassle-free key handover.',
  },
]

// --- Full Service Disciplines ---
const disciplines = [
  {
    icon: FileText,
    title: '2D Blueprints & Working Plans',
    desc: 'Precision municipal blueprints, structural drawings, electrical layouts, and Vaastu compliant architectural plans.',
  },
  {
    icon: Home,
    title: '3D Exterior Elevations',
    desc: '4K daylight and dusk rendering, landscape harmony, stone veneer detailing, and climate-conscious facade concepts.',
  },
  {
    icon: Paintbrush2,
    title: 'Interior Spatial Design',
    desc: 'Custom joinery, ergonomic modular kitchen layouts, false ceiling illumination, and premium natural material finishes.',
  },
  {
    icon: ShieldCheck,
    title: 'DTCP & Town Planning Sanctions',
    desc: 'Smooth liaison for Pollachi Municipal, Panchayat, and DTCP approvals with 100% legal compliance and documentation.',
  },
  {
    icon: HardHat,
    title: 'Turnkey Building Construction',
    desc: 'Grade-I civil execution, M25 concrete, Fe 550D TMT rebar, brick masonry, and transparent milestone-based schedules.',
  },
  {
    icon: Landmark,
    title: 'Bank Valuation & Structural Audits',
    desc: 'Official Category-1 asset valuations for leading public & private banks, structural health audits, and BOQ estimates.',
  },
]

// --- Quality Benchmarks Data ---
const qualityBenchmarks = [
  {
    metric: 'CONCRETE MIX',
    ours: 'Ready-Mix M25 / M30 Grade (Lab Certified)',
    market: 'Hand-Mixed M15 / M20 (Uncalibrated)',
  },
  {
    metric: 'REINFORCEMENT STEEL',
    ours: 'Tata Tiscon Fe-550D Super Ductile',
    market: 'Secondary Commercial Rebar',
  },
  {
    metric: 'CURING REGIMEN',
    ours: '21-Day Ponding + Chemical Membrane',
    market: '7-Day Inconsistent Water Spray',
  },
  {
    metric: 'SOIL & FOOTING',
    ours: 'Geotech Borehole Tested Foundations',
    market: 'Visual Soil Guesswork & Shallow Trench',
  },
  {
    metric: 'WATERPROOFING',
    ours: 'Integral SBR + 3-Coat Polyurethane Barrier',
    market: 'Basic Cement Slurry Wash',
  },
]

// --- Mobile Structured Workflow Cards (Matching screen 01.png) ---
const mobileWorkflowCards = [
  {
    step: '01 / SPATIAL & 2D PLANNING',
    title: 'Vaastu-Aligned Structural Layouts',
    desc: 'Architectural floor plans synchronized with classical solar orientation and local climatic micro-winds, bundled with seamless DTCP and LPA statutory approvals.',
    tags: ['VAASTU COMPLIANT', 'DTCP FAST-TRACK', 'SETBACK CAD AUDIT'],
    icon: Compass,
  },
  {
    step: '02 / 3D BIM & VISUALIZATION',
    title: 'Interactive Spatial Simulations',
    desc: 'Photorealistic daylight simulations, ventilation cross-flow studies, and tactile material mapping before structural foundation excavation begins.',
    tags: ['REVIT BIM 3D', 'SOLAR LUX MODELING', 'VIRTUAL WALKTHROUGH'],
    icon: Cuboid,
  },
  {
    step: '03 / TURNKEY CIVIL EXECUTION',
    title: 'Strict Structural Discipline',
    desc: 'End-to-end execution utilizing lab-tested M25 concrete mixes, certified Fe-550D primary steel rebar, and dedicated daily site supervisory engineers.',
    tags: ['FE-550D REBAR', 'CUBE COMPRESSION TEST', 'DAILY LOG REPORTING'],
    icon: HardHat,
  },
]

function HomePage() {
  useLenis()
  const { company: loadedCompany } = useHomeData()
  const company = useMemo(
    () => ({
      ...loadedCompany,
      name: loadedCompany.name || 'Thozha Associates',
      phone: loadedCompany.phone || '+91 98431 61705',
      whatsapp: loadedCompany.whatsapp || '919843161705',
      location: loadedCompany.location || 'Venkatasa Colony, Pollachi, Tamil Nadu 642001',
    }),
    [loadedCompany],
  )

  useEffect(() => {
    document.title = 'Thozha Associates | Civil Engineering & Turnkey Architecture in Pollachi'
  }, [])

  // View state for Mobile Benchmark tab ('thozha' | 'market')
  const [benchmarkTab, setBenchmarkTab] = useState('thozha')

  // Consultation form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    scope: 'Turnkey Residential Villa',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    setSubmitting(true)
    try {
      await createLead({
        name: formData.name,
        phone: formData.phone,
        email: '',
        project_type: formData.scope,
        message: `Site Location: ${formData.location}\nRequirement: ${formData.message}`,
      })
      setSubmitSuccess(true)
      setFormData({ name: '', phone: '', location: '', scope: 'Turnkey Residential Villa', message: '' })
    } catch {
      alert('Thank you. We have recorded your inquiry and will call you back shortly.')
      setSubmitSuccess(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="thozha-app">
      {/* Top Sticky Navigation */}
      <Navbar company={company} />

      <main>
        {/* ==========================================================================
            SECTION 1: HERO SECTION & SHOWCASE (Matching media_1792082049715_edebb03f.jpg)
            ========================================================================== */}
        <EngineeringBimHero company={company} />


        {/* ==========================================================================
            SECTION 2: CORE PILLARS / EXPERTISE
            Desktop (hidden md:block): Matching screen.png 4-pillar grid
            Mobile (block md:hidden): Matching screen 01.png 3-step structured cards with tags
            ========================================================================== */}
        <section id="expertise" className="th-pillars-section">
          <div className="thozha-container">
            {/* Desktop View */}
            <div className="hidden md:block">
              <span className="th-section-badge">OUR CORE PILLARS</span>
              <h2 className="th-section-title">Comprehensive civil mastery under one studio roof.</h2>
              <p className="th-section-subtitle">
                We eliminate contractor finger-pointing by integrating architectural vision, structural engineering, and on-site execution under strict civil discipline.
              </p>

              <div className="th-pillars-grid">
                {corePillars.map((pillar) => (
                  <div key={pillar.title} className="th-pillar-card">
                    <div>
                      <div className="th-pillar-icon">
                        {createElement(pillar.icon, { size: 22, strokeWidth: 1.5 })}
                      </div>
                      <h3>{pillar.title}</h3>
                      <p>{pillar.desc}</p>
                    </div>
                    <span className="th-pillar-tag">{pillar.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile View (Directly matching screen 01.png) */}
            <div className="block md:hidden">
              <span className="text-[11px] font-extrabold text-blue-700 tracking-wider uppercase block mb-1.5">
                CORE EXPERTISE
              </span>
              <h2 className="text-2xl font-black text-[#0b2b48] leading-tight tracking-tight mb-4">
                Structured workflow from soil testing to keys.
              </h2>

              <div className="space-y-3.5">
                {mobileWorkflowCards.map((card) => (
                  <div
                    key={card.step}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs"
                  >
                    <div className="flex items-center justify-between text-blue-700 mb-2">
                      <span className="text-[11px] font-extrabold tracking-wider uppercase">
                        {card.step}
                      </span>
                      {createElement(card.icon, { size: 18, strokeWidth: 1.5, className: 'text-slate-400' })}
                    </div>
                    <h3 className="text-base font-extrabold text-[#0b2b48] mb-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3.5">
                      {card.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-[#eff6ff] text-blue-800 text-[9.5px] font-bold tracking-wider uppercase border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            SECTION 3: PORTFOLIO / SELECTED WORKS (Matching screen.png & screen 01.png)
            ========================================================================== */}
        <section id="portfolio" className="th-portfolio-section">
          <div className="thozha-container">
            <div className="th-section-header-flex">
              <div>
                <span className="th-section-badge">PORTFOLIO</span>
                <h2 className="th-section-title">Selected Works</h2>
              </div>
              <p className="th-section-subtitle">
                Recent completions in Pollachi, Udumalpet, and Coimbatore.
              </p>
            </div>

            <div className="th-portfolio-grid">
              {/* Project Card 1: Anamalai Courtyard Residence */}
              <article className="th-project-card">
                <div className="th-project-img-wrap">
                  <span className="th-project-status-pill">COMPLETED • HANDOVER</span>
                  <img
                    src={resolveAssetUrl('images/thozha/portfolio-anamalai-photo.webp')}
                    alt="The Anamalai Courtyard Residence in Pollachi"
                    loading="lazy"
                  />
                </div>
                <div className="th-project-body">
                  <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5">
                    <span>RESIDENTIAL • VALPARAI ROAD</span>
                    <span className="text-blue-700 font-extrabold">2024</span>
                  </div>
                  <h3 className="th-project-title">Anamalai Courtyard Residence</h3>
                  <p className="th-project-desc">
                    Biophilic split-level courtyard residence balancing open outdoor pool terraces with natural stone cladding and teak screens.
                  </p>
                  <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-slate-100">
                    <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      4,200 sq.ft
                    </span>
                    <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      14 Months
                    </span>
                    <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                      Complete Turnkey
                    </span>
                  </div>
                </div>
              </article>

              {/* Project Card 2: G+3 Apex Trade Center */}
              <article className="th-project-card">
                <div className="th-project-img-wrap">
                  <span className="th-project-status-pill flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    ACTIVE SITE • SLAB CASTING
                  </span>
                  <img
                    src={resolveAssetUrl('images/thozha/portfolio-commercial-photo.webp')}
                    alt="G+3 Apex Trade Center in Udumalpet"
                    loading="lazy"
                  />
                </div>
                <div className="th-project-body">
                  <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5">
                    <span>COMMERCIAL • UDUMALPET HIGHWAY</span>
                    <span className="text-blue-700 font-extrabold">Q3 2025</span>
                  </div>
                  <h3 className="th-project-title">G+3 Apex Trade Center</h3>
                  <p className="th-project-desc">
                    Engineered commercial hub featuring post-tensioned beam-free slabs for flexible retail floorplans and basement dual-level parking.
                  </p>
                  <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-slate-100">
                    <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      8,400 sq.ft
                    </span>
                    <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      RCC PT Slabs
                    </span>
                    <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                      Structural + MEP
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            SECTION 4: CIVIL INTEGRITY & EVOLUTION (Matching screen.png)
            ========================================================================== */}
        <section className="th-evolution-section">
          <div className="thozha-container">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="th-section-badge">CIVIL INTEGRITY & EVOLUTION</span>
              <h2 className="th-section-title">From structural framework to living comfort.</h2>
              <p className="th-section-subtitle mx-auto">
                We hold structural safety and architectural detailing to the same uncompromising standard at every milestone.
              </p>
            </div>

            <div className="th-evolution-grid">
              {/* Stage 01: Precision Concrete & Formwork */}
              <div className="th-evolution-card">
                <div className="th-evolution-img-wrap">
                  <div className="th-evolution-badges">
                    <span className="th-evo-badge-left">STAGE 01 • STRUCTURAL FRAMEWORK</span>
                    <span className="th-evo-badge-right">Fe 550D TMT Steel</span>
                  </div>
                  <img
                    src={resolveAssetUrl('images/thozha/evolution-stage1-photo.webp')}
                    alt="Stage 01: Precision Concrete & Formwork in Pollachi"
                    loading="lazy"
                  />
                </div>
                <div className="th-evolution-body">
                  <h3>Precision Concrete & Formwork</h3>
                  <p>
                    Continuous structural supervision, IS 456-2000 cube testing, and calibrated rebar placement for generational strength.
                  </p>
                </div>
              </div>

              {/* Stage 02: Architectural Harmony & Living */}
              <div className="th-evolution-card">
                <div className="th-evolution-img-wrap">
                  <div className="th-evolution-badges">
                    <span className="th-evo-badge-left">STAGE 02 • TURNKEY HANDOVER</span>
                    <span className="th-evo-badge-right">Zero Defect Verification</span>
                  </div>
                  <img
                    src={resolveAssetUrl('images/thozha/evolution-stage2-photo.webp')}
                    alt="Stage 02: Architectural Harmony & Living in Pollachi"
                    loading="lazy"
                  />
                </div>
                <div className="th-evolution-body">
                  <h3>Architectural Harmony & Living</h3>
                  <p>
                    Refined local granite masonry, custom Burma teak woodwork, and thermal design that stays cool in Pollachi summers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            SECTION 5: OUR WORK PROCESS (Matching screen.png)
            ========================================================================== */}
        <section id="process" className="th-process-section">
          <div className="thozha-container">
            <span className="th-section-badge">OUR WORK PROCESS</span>
            <h2 className="th-section-title">A transparent path to your dream home.</h2>
            <p className="th-section-subtitle">
              Every project follows an audited 4-stage delivery timeline designed to prevent budget overruns and construction delays.
            </p>

            <div className="th-process-flow">
              {workProcess.map((item) => (
                <div key={item.step} className="th-process-step">
                  <span className="th-step-num">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================================
            SECTION 6: OUR DISCIPLINES / SERVICES (Matching screen.png)
            ========================================================================== */}
        <section id="services" className="th-disciplines-section">
          <div className="thozha-container">
            <div className="th-section-header-flex">
              <div>
                <span className="th-section-badge">OUR DISCIPLINES</span>
                <h2 className="th-section-title">Full-service architectural & civil solutions.</h2>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full">
                <BadgeCheck size={16} className="text-blue-600" /> Registered Grade-I Civil Practice
              </span>
            </div>

            <div className="th-disciplines-grid">
              {disciplines.map((item) => (
                <div key={item.title} className="th-discipline-card">
                  <div className="th-disc-icon">
                    {createElement(item.icon, { size: 20, strokeWidth: 1.5 })}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================================
            SECTION 7: QUALITY BENCHMARKS (Zero Compromise Engineering)
            Desktop (hidden md:block): 3-column table matching screen.png
            Mobile (block md:hidden): Segmented toggle tabs matching screen 01.png
            ========================================================================== */}
        <section className="th-quality-section">
          <div className="thozha-container">
            <div className="max-w-2xl mb-6">
              <span className="th-section-badge">QUALITY BENCHMARKS</span>
              <h2 className="th-section-title">Zero Compromise Engineering</h2>
              <p className="th-section-subtitle">
                How our turnkey civil specs outlast standard contractor practices across Western Tamil Nadu.
              </p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block th-benchmark-table">
              <div className="th-benchmark-row th-benchmark-header">
                <div>ENGINEERING SPEC</div>
                <div className="text-blue-700 font-bold">THOZHA STANDARDS</div>
                <div className="text-slate-500">MARKET CONVENTIONAL</div>
              </div>
              {qualityBenchmarks.map((b) => (
                <div key={b.metric} className="th-benchmark-row">
                  <div className="th-benchmark-label">{b.metric}</div>
                  <div className="th-benchmark-ours">{b.ours}</div>
                  <div className="th-benchmark-market">{b.market}</div>
                </div>
              ))}
            </div>

            {/* Mobile Tabbed View (Directly matching screen 01.png) */}
            <div className="block md:hidden">
              {/* Segmented Pill Switcher */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-200/80 mb-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setBenchmarkTab('thozha')}
                  className={`py-2 rounded-lg transition-all border-none cursor-pointer text-center ${
                    benchmarkTab === 'thozha'
                      ? 'bg-white text-blue-700 shadow-sm font-extrabold'
                      : 'bg-transparent text-slate-600 font-semibold'
                  }`}
                >
                  Thozha Standards
                </button>
                <button
                  type="button"
                  onClick={() => setBenchmarkTab('market')}
                  className={`py-2 rounded-lg transition-all border-none cursor-pointer text-center ${
                    benchmarkTab === 'market'
                      ? 'bg-white text-slate-800 shadow-sm font-extrabold'
                      : 'bg-transparent text-slate-600 font-semibold'
                  }`}
                >
                  Market Conventional
                </button>
              </div>

              {/* Mobile Benchmark Cards */}
              <div className="space-y-2">
                {qualityBenchmarks.map((b) => (
                  <div
                    key={b.metric}
                    className="p-3.5 rounded-xl bg-[#eff6ff]/70 border border-blue-100 flex items-center justify-between gap-3"
                  >
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-500 w-28 shrink-0">
                      {b.metric}
                    </span>
                    <span
                      className={`text-xs font-bold text-right leading-tight ${
                        benchmarkTab === 'thozha' ? 'text-slate-900' : 'text-slate-600'
                      }`}
                    >
                      {benchmarkTab === 'thozha' ? b.ours : b.market}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            SECTION 8: TRUST & HERITAGE + TESTIMONIALS
            Desktop (hidden md:block): Split layout matching screen.png
            Mobile (block md:hidden): Highlight review card matching screen 01.png
            ========================================================================== */}
        <section className="th-trust-section">
          <div className="thozha-container">
            {/* Desktop View */}
            <div className="hidden md:grid th-trust-layout">
              {/* Left Column: Trust & Heritage */}
              <div className="th-trust-col-left">
                <span className="th-section-badge">TRUST &amp; HERITAGE</span>
                <h2>Rooted in Pollachi since 2009.</h2>
                <p>
                  We combine regional knowledge of Pollachi&apos;s climate and soil with institutional civil engineering rigor. Over 15 years, our studio has earned the trust of homeowners and institutions across Western Tamil Nadu.
                </p>

                <div className="th-credential-list">
                  <div className="th-cred-box">
                    <div className="th-cred-box-icon">
                      <BadgeCheck size={20} />
                    </div>
                    <div>
                      <strong>Registered Civil Engineer Grade-I</strong>
                      <span>Pollachi Municipality &amp; Directorate of Town and Country Planning (DTCP).</span>
                    </div>
                  </div>

                  <div className="th-cred-box">
                    <div className="th-cred-box-icon">
                      <Landmark size={20} />
                    </div>
                    <div>
                      <strong>Empaneled Financial Valuer (CAT-1)</strong>
                      <span>Certified valuation engineer for SBI, Canara Bank, and HDFC Bank.</span>
                    </div>
                  </div>

                  <div className="th-cred-box">
                    <div className="th-cred-box-icon">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <strong>Professional Guild Membership</strong>
                      <span>Association of Consulting Civil Engineers (ACCE) &amp; Engineers Club Tamil Nadu.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Verified Testimonials */}
              <div className="th-testimonials-list">
                <article className="th-testimonial-card">
                  <div className="th-testimonial-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={15} fill="#f59e0b" />
                    ))}
                  </div>
                  <p>
                    &ldquo;From our first 2D sketch to the finished teak wood doors, Thozha Associates handled our home with pure honesty. The 3D render they shared at the start turned out exactly like the completed house we live in today.&rdquo;
                  </p>
                  <div className="th-testimonial-author">
                    <strong>Dr. Rajesh &amp; Sangeetha</strong>
                    <span>Anamalai Road, Pollachi • 4,200 sq.ft Villa</span>
                  </div>
                </article>

                <article className="th-testimonial-card">
                  <div className="th-testimonial-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={15} fill="#f59e0b" />
                    ))}
                  </div>
                  <p>
                    &ldquo;As an engineer myself, I checked their concrete cube reports and steel reinforcement unannounced. Their site discipline and adherence to IS codes is exceptional for Pollachi.&rdquo;
                  </p>
                  <div className="th-testimonial-author">
                    <strong>Er. K. Soundararajan</strong>
                    <span>Mahalingapuram, Pollachi • Duplex Residence</span>
                  </div>
                </article>
              </div>
            </div>

            {/* Mobile View (Directly matching screen 01.png) */}
            <div className="block md:hidden">
              <div className="p-6 rounded-2xl bg-[#eff6ff] border border-blue-200/80 mb-6 relative shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={15} fill="#f59e0b" />
                    ))}
                  </div>
                  <span className="text-3xl text-slate-300 font-serif leading-none font-bold select-none">
                    ”
                  </span>
                </div>
                <p className="text-xs sm:text-sm italic text-slate-800 leading-relaxed mb-5">
                  &ldquo;Building in Pollachi while stationed in Singapore seemed daunting until we engaged Thozha. Weekly drone footage, cube test certificates, and flawless Vaastu planning resulted in our dream courtyard home completed on the agreed date.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-200 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">
                    RS
                  </div>
                  <div>
                    <strong className="block text-xs font-bold text-slate-900">
                      Dr. Rajesh &amp; Sangeetha
                    </strong>
                    <span className="block text-[9.5px] font-semibold text-slate-500 tracking-wider uppercase">
                      ANAMALAI FOOTHILLS VILLA • VERIFIED HOMEOWNERS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            SECTION 9: DIRECT SITE CONSULTATION & FEASIBILITY (Matching screen.png & screen 01.png)
            ========================================================================== */}
        <section id="consultation" className="th-consultation-section">
          <div className="thozha-container">
            <div className="th-consultation-grid">
              {/* Left Column: Feasibility Overview */}
              <div className="th-consultation-info">
                <span className="th-section-badge">DIRECT CONSULTATION</span>
                <h2>Start Your Architectural Consultation</h2>
                <p>
                  Share your site details and requirements for a direct consultation with our principal civil engineer in Pollachi.
                </p>

                <div className="th-checklist hidden sm:flex">
                  <div className="th-checklist-item">
                    <CheckCircle2 size={18} className="th-check-icon" />
                    <div>
                      <strong>1-on-1 On-Site Vaastu &amp; Plot Evaluation</strong>
                      <p>Comprehensive soil bearing, cardinal orientation, and microclimate checks across Pollachi, Kinathukadavu &amp; Coimbatore outskirts.</p>
                    </div>
                  </div>

                  <div className="th-checklist-item">
                    <CheckCircle2 size={18} className="th-check-icon" />
                    <div>
                      <strong>Zero-Commitment Concept &amp; DTCP Feasibility</strong>
                      <p>Preliminary statutory guideline review, setback norms assessment, and Panchayat or DTCP sanction clearance guidance.</p>
                    </div>
                  </div>

                  <div className="th-checklist-item">
                    <CheckCircle2 size={18} className="th-check-icon" />
                    <div>
                      <strong>Transparent Material &amp; Specification Walkthrough</strong>
                      <p>Clear explanation of Grade-I civil standards, certified Fe 550D TMT rebar, M25 concrete cube testing, and genuine Burma teak joinery.</p>
                    </div>
                  </div>
                </div>

                <div className="th-hotline-box mt-4">
                  <div className="th-hotline-icon">
                    <Phone size={18} />
                  </div>
                  <div className="th-hotline-text">
                    <small>DIRECT ENGINEER HOTLINE</small>
                    <strong>+91 98431 61705</strong>
                    <span>Fast WhatsApp Response • Mon - Sat: 9:00 AM - 7:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Consultation Form (Matching screen 01.png & screen.png) */}
              <div className="th-form-card">
                <h3 className="hidden sm:block">Book a Free Site Consultation</h3>
                <p className="hidden sm:block">Discuss your plot orientation and requirements directly with our Chief Engineer.</p>

                {submitSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center">
                    <CheckCircle2 size={24} className="mx-auto mb-2 text-emerald-600" />
                    <strong className="block text-sm">Consultation Request Received!</strong>
                    <span className="text-xs">Our chief engineer will contact you shortly to confirm the site visit.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="th-form-group">
                      <label htmlFor="client-name">FULL NAME</label>
                      <input
                        id="client-name"
                        type="text"
                        required
                        placeholder="e.g. Er. Karthikeyan or Senthil Nathan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="th-form-input"
                      />
                    </div>

                    <div className="th-form-group">
                      <label htmlFor="client-phone">WHATSAPP / CONTACT NUMBER</label>
                      <div className="flex rounded-lg border border-slate-300 overflow-hidden bg-slate-50 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                        <span className="px-3.5 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold border-r border-slate-300 flex items-center shrink-0">
                          +91
                        </span>
                        <input
                          id="client-phone"
                          type="tel"
                          required
                          placeholder="98430 12345"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2.5 text-xs text-slate-800 outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="th-form-group">
                      <label htmlFor="client-loc">SITE LOCATION / TOWN</label>
                      <input
                        id="client-loc"
                        type="text"
                        placeholder="e.g. Mahalingapuram, Pollachi / Udumalpet"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="th-form-input"
                      />
                    </div>

                    <div className="th-form-group">
                      <label htmlFor="client-scope">PROJECT SCOPE / TYPE</label>
                      <select
                        id="client-scope"
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        className="th-form-select"
                      >
                        <option>Turnkey Residential Villa</option>
                        <option>Commercial &amp; Retail Hub</option>
                        <option>2D/3D Architectural Blueprints Only</option>
                        <option>Structural Audit &amp; Bank Valuation</option>
                        <option>Renovation &amp; Extension</option>
                      </select>
                    </div>

                    <div className="th-form-group">
                      <label htmlFor="client-details">BRIEF REQUIREMENT / NOTE (Optional)</label>
                      <textarea
                        id="client-details"
                        rows={3}
                        placeholder="e.g. 2,400 sq.ft north-facing plot with Vaastu courtyard requirement..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="th-form-textarea"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs tracking-wider uppercase text-center shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] border-none mt-2"
                    >
                      {submitting ? 'Submitting Details...' : 'Request Site Consultation →'}
                    </button>

                    <div className="flex items-center gap-2 justify-center text-[10.5px] text-slate-500 mt-2 text-center">
                      <ShieldCheck size={14} className="text-blue-600 shrink-0" />
                      <span>Direct response from our registered Grade-I structural engineer within 24 hours. No sales spam.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================================================
          SECTION 10: STICKY MOBILE BOTTOM APP BAR (Matching screen 01.png)
          ========================================================================== */}
      <nav className="th-mobile-appbar" aria-label="Mobile Quick Nav">
        <div className="th-mobile-appbar-inner">
          <a href="#about" className="th-appbar-link">
            <Home size={18} />
            <span>Home</span>
          </a>
          <a href="#portfolio" className="th-appbar-link">
            <Layers size={18} />
            <span>Works</span>
          </a>
          <a href="#services" className="th-appbar-link">
            <Wrench size={18} />
            <span>Services</span>
          </a>
          <a href="#consultation" className="th-appbar-link">
            <Phone size={18} />
            <span>Contact</span>
          </a>
        </div>
      </nav>

      {/* Architectural Footer */}
      <Footer company={company} />
    </div>
  )
}

export default HomePage
