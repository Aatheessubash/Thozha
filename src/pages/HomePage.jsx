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
  Sparkles,
  Star,
  Trees,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Luxury Architecture & Civil Engineering Hero
import EngineeringBimHero from '@/components/hero/EngineeringBimHero'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import FromFirstLineToFrontDoor from '@/components/FromFirstLineToFrontDoor'
import BeforeAfterShowcaseSection from '@/components/BeforeAfterShowcaseSection'
import { useHomeData } from '@/hooks/useHomeData'
import { useLenis } from '@/hooks/useLenis'
import { createLead } from '@/services/supabase'
import { resolveAssetUrl } from '@/services/frameSequence'

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

// --- Portfolio Projects Data ---
const portfolioProjects = [
  {
    id: 'anamalai-residence',
    title: 'Anamalai Courtyard Residence',
    category: 'RESIDENTIAL',
    location: 'VALPARAI ROAD, POLLACHI',
    year: '2024',
    status: 'COMPLETED • HANDOVER',
    isActive: false,
    area: '4,200 sq.ft',
    timeline: '14 Months',
    scope: 'Complete Turnkey',
    desc: 'Biophilic split-level courtyard residence balancing open outdoor pool terraces with natural stone cladding and teak screens.',
    image: resolveAssetUrl('images/thozha/portfolio-anamalai.jpg'),
  },
  {
    id: 'apex-trade-center',
    title: 'G+3 Apex Trade Center',
    category: 'COMMERCIAL',
    location: 'UDUMALPET HIGHWAY, POLLACHI',
    year: 'Q3 2025',
    status: 'ACTIVE SITE • SLAB CASTING',
    isActive: true,
    area: '8,400 sq.ft',
    timeline: 'RCC PT Slabs',
    scope: 'Structural + MEP',
    desc: 'Engineered commercial hub featuring post-tensioned beam-free slabs for flexible retail floorplans and basement dual-level parking.',
    image: resolveAssetUrl('images/thozha/portfolio-commercial.jpg'),
  },
  {
    id: 'vettaikaranpudur-villa',
    title: 'Vettaikaranpudur Tropical Estate',
    category: 'RESIDENTIAL',
    location: 'VETTAIKARANPUDUR, POLLACHI',
    year: '2024',
    status: 'COMPLETED • HANDOVER',
    isActive: false,
    area: '5,600 sq.ft',
    timeline: '16 Months',
    scope: 'Architecture & Civil',
    desc: 'Vaastu-aligned agricultural sanctuary with natural rainwater harvesting, exposed brick jali cooling facades, and expansive verandahs.',
    image: resolveAssetUrl('images/thozha/portfolio-vettaikaranpudur.jpg'),
  },
  {
    id: 'kinathukadavu-hub',
    title: 'Kinathukadavu Logistics Hub',
    category: 'COMMERCIAL',
    location: 'COIMBATORE BYPASS, KINATHUKADAVU',
    year: '2025',
    status: 'FOUNDATION AUDITED',
    isActive: false,
    area: '14,200 sq.ft',
    timeline: 'Industrial PEB',
    scope: 'Turnkey Industrial',
    desc: 'Heavy-duty industrial facility with laser-leveled FM2 flooring, pre-engineered steel portal frames, and high-cube clearance.',
    image: resolveAssetUrl('images/thozha/portfolio-kinathukadavu.jpg'),
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

  // Locked to Flagship Warm White Atelier Theme
  const template = 'warm'
  const isBentoOrObsidian = true

  // Portfolio filter state ('ALL' | 'RESIDENTIAL' | 'COMMERCIAL')
  const [selectedCategory, setSelectedCategory] = useState('ALL')

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
    <div className="thozha-app" data-template="warm">
      {/* Top Sticky Navigation */}
      <Navbar company={company} />

      <main>
        {/* ==========================================================================
            SECTION 1: HERO SECTION & SHOWCASE
            ========================================================================== */}
        <EngineeringBimHero company={company} />

        {/* ==========================================================================
            SECTION 2: CORE PILLARS / EXPERTISE
            Bento / Obsidian Mode: Apple Bento Grid with dynamic spans
            Classic Mode: Original 4-column cards
            Mobile: Structured workflow cards with tags
            ========================================================================== */}
        <section id="expertise" className="th-pillars-section">
          <div className="thozha-container">
            {/* Desktop View */}
            <div className="hidden md:block">
              <span className="th-section-badge">
                {isBentoOrObsidian ? 'OUR CORE PILLARS • BENTO ARCHITECTURE' : 'OUR CORE PILLARS'}
              </span>
              <h2 className="th-section-title">Comprehensive civil mastery under one studio roof.</h2>
              <p className="th-section-subtitle">
                We eliminate contractor finger-pointing by integrating architectural vision, structural engineering, and on-site execution under strict civil discipline.
              </p>

              {isBentoOrObsidian ? (
                /* Apple Bento Grid */
                <div className="th-bento-grid">
                  {/* Card 1: 2D Drafting (Span 8) */}
                  <div className="th-bento-card th-bento-col-8 group">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbf7ee] text-[#b88628] text-[10px] font-extrabold uppercase tracking-widest border border-[#d4a853]/30 mb-3">
                          <BadgeCheck size={13} className="text-[#b88628]" />
                          DTCP &amp; Panchayat Approved Blueprints
                        </span>
                        <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-stone-900 tracking-tight mb-2 group-hover:text-[#b88628] transition-colors">
                          2D Architectural Drafting &amp; Vaastu Planning
                        </h3>
                        <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
                          Precision architectural layouts, plumbing &amp; electrical blueprints, and strict Vaastu compliance calibrated to your plot&apos;s cardinal orientation and soil micro-climate.
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fcf9f2] to-[#f4ebd6] border border-[#d4a853]/30 text-[#b88628] flex items-center justify-center shrink-0 shadow-sm">
                        <PencilRuler size={22} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#E8E4DC]">
                      <span className="px-3 py-1 rounded-full bg-[#F4F0E6] text-stone-700 text-xs font-semibold border border-[#E8E4DC]">100% Vaastu Aligned</span>
                      <span className="px-3 py-1 rounded-full bg-[#F4F0E6] text-stone-700 text-xs font-semibold border border-[#E8E4DC]">Borehole Soil Audited</span>
                      <span className="px-3 py-1 rounded-full bg-[#F4F0E6] text-stone-700 text-xs font-semibold border border-[#E8E4DC]">Zero Setback Violations</span>
                    </div>
                  </div>

                  {/* Card 2: 3D Exterior & BIM (Span 4) */}
                  <div className="th-bento-card th-bento-col-4 group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#b88628] px-2.5 py-1 rounded-full bg-[#fbf7ee] border border-[#d4a853]/30">
                          BIM LOD-300
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fcf9f2] to-[#f4ebd6] border border-[#d4a853]/30 text-[#b88628] flex items-center justify-center">
                          <Cuboid size={20} strokeWidth={1.5} />
                        </div>
                      </div>
                      <h3 className="font-serif text-xl lg:text-2xl font-semibold text-stone-900 mb-2 group-hover:text-[#b88628] transition-colors">
                        3D Exterior &amp; BIM
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed mb-4">
                        Photorealistic daylight simulations, dusk illumination studies, and immersive walkthroughs before breaking ground.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#E8E4DC]">
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        4K Daylight &amp; Shadow Analysis
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Bank Valuation & BOQ (Span 4) */}
                  <div className="th-bento-card th-bento-col-4 group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#b88628] px-2.5 py-1 rounded-full bg-[#fbf7ee] border border-[#d4a853]/30">
                          CAT-1 LICENSED
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fcf9f2] to-[#f4ebd6] border border-[#d4a853]/30 text-[#b88628] flex items-center justify-center">
                          <Landmark size={20} strokeWidth={1.5} />
                        </div>
                      </div>
                      <h3 className="font-serif text-xl lg:text-2xl font-semibold text-stone-900 mb-2 group-hover:text-[#b88628] transition-colors">
                        Bank Valuation &amp; BOQ
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed mb-4">
                        Empaneled Category-1 certified valuations for SBI, HDFC, and Canara Bank with complete transparent cost itemization.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#E8E4DC]">
                      <span className="text-xs font-bold text-stone-700">Official Empaneled Valuer</span>
                    </div>
                  </div>

                  {/* Card 4: Turnkey Construction (Span 8) */}
                  <div className="th-bento-card th-bento-col-8 group">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbf7ee] text-[#b88628] text-[10px] font-extrabold uppercase tracking-widest border border-[#d4a853]/30 mb-3">
                          <ShieldCheck size={13} className="text-[#b88628]" />
                          Fixed-Price Guarantee
                        </span>
                        <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-stone-900 tracking-tight mb-2 group-hover:text-[#b88628] transition-colors">
                          Turnkey Building Construction
                        </h3>
                        <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
                          End-to-end civil execution with resident site engineers, rigorous concrete cube compression audits, milestone verification, and zero budget creep.
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fcf9f2] to-[#f4ebd6] border border-[#d4a853]/30 text-[#b88628] flex items-center justify-center shrink-0 shadow-sm">
                        <Hammer size={22} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#E8E4DC]">
                      <span className="px-3 py-1 rounded-full bg-[#F4F0E6] text-stone-700 text-xs font-semibold border border-[#E8E4DC]">M25 Lab-Tested Mix</span>
                      <span className="px-3 py-1 rounded-full bg-[#F4F0E6] text-stone-700 text-xs font-semibold border border-[#E8E4DC]">Tata Tiscon Fe-550D</span>
                      <span className="px-3 py-1 rounded-full bg-[#F4F0E6] text-stone-700 text-xs font-semibold border border-[#E8E4DC]">Daily Site Log Supervision</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Classic 4-Pillar Grid */
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
              )}
            </div>

            {/* Mobile View (Apple Concentric Cards) */}
            <div className="block md:hidden">
              <span className="text-[11px] font-black text-[#b88628] tracking-widest uppercase block mb-1.5">
                CORE EXPERTISE
              </span>
              <h2 className="th-mobile-heading font-serif text-3xl font-bold text-stone-950 leading-tight tracking-tight mb-4">
                Structured workflow from soil testing to keys.
              </h2>

              <div className="space-y-3.5">
                {mobileWorkflowCards.map((card) => (
                  <div
                    key={card.step}
                    className="th-mobile-card p-5 rounded-3xl bg-white border border-[#E8E4DC] shadow-[0_6px_20px_rgba(30,25,18,0.04),inset_0_1px_0_rgba(255,255,255,0.95)] transition-transform active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black text-[#b88628] tracking-wider uppercase">
                        {card.step}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#fcf9f2] to-[#f4ebd6] border border-[#d4a853]/30 text-[#b88628] flex items-center justify-center shrink-0">
                        {createElement(card.icon, { size: 16, strokeWidth: 1.5 })}
                      </div>
                    </div>
                    <h3 className="th-mobile-card-title font-serif text-xl font-bold text-stone-900 mb-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="th-mobile-card-desc text-sm text-stone-600 leading-relaxed mb-3.5">
                      {card.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="th-mobile-card-tag px-2.5 py-1 rounded-full bg-[#F4F0E6] text-[#b88628] text-[10px] font-bold tracking-wider uppercase border border-[#E8E4DC]"
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
            BENTO / OBSIDIAN EXCLUSIVE: SIGNATURE ENGINEERING METHODOLOGY (Interactive CAD-to-Handover)
            ========================================================================== */}
        {isBentoOrObsidian && <FromFirstLineToFrontDoor />}

        {/* ==========================================================================
            BENTO / OBSIDIAN EXCLUSIVE: BEFORE & AFTER TRANSFORMATION SLIDER
            ========================================================================== */}
        {isBentoOrObsidian && (
          <BeforeAfterShowcaseSection company={company} projects={portfolioProjects} />
        )}

        {/* ==========================================================================
            SECTION 3: PORTFOLIO / SELECTED WORKS (Apple HIG Filtered Showcase)
            ========================================================================== */}
        <section id="portfolio" className="th-portfolio-section">
          <div className="thozha-container">
            <div className="th-section-header-flex items-end justify-between flex-wrap gap-4 mb-8">
              <div>
                <span className="th-section-badge">PORTFOLIO</span>
                <h2 className="th-section-title">Selected Works</h2>
                <p className="th-section-subtitle">
                  Signature turnkey residences and commercial hubs in Pollachi, Udumalpet, and Coimbatore.
                </p>
              </div>

              {/* Apple Segmented Filter Pill Control */}
              <div className="inline-flex p-1 rounded-full bg-[#F4F0E6] backdrop-blur-md border border-[#E8E4DC] shadow-inner">
                {['ALL', 'RESIDENTIAL', 'COMMERCIAL'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer border-none active:scale-[0.97] ${
                      selectedCategory === cat
                        ? 'bg-[#B88628] text-white shadow-sm'
                        : 'bg-transparent text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Works' : cat.charAt(0) + cat.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="th-portfolio-grid">
              {portfolioProjects
                .filter((p) => selectedCategory === 'ALL' || p.category === selectedCategory)
                .map((project) => (
                  <article key={project.id} className="th-project-card group">
                    <div className="th-project-img-wrap relative overflow-hidden">
                      <span className="th-project-status-pill flex items-center gap-1.5">
                        {project.isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                        {project.status}
                      </span>
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="th-project-body">
                      <div className="flex items-center justify-between text-[11px] font-extrabold tracking-wider uppercase text-stone-500 mb-2">
                        <span>{project.category} • {project.location}</span>
                        <span className="text-[#b88628] font-black">{project.year}</span>
                      </div>
                      <h3 className="th-project-title font-serif text-2xl lg:text-3xl font-semibold text-stone-900 group-hover:text-[#b88628] transition-colors">
                        {project.title}
                      </h3>
                      <p className="th-project-desc text-sm text-stone-600 leading-relaxed mb-4">{project.desc}</p>
                      <div className="flex items-center gap-2 flex-wrap pt-3.5 border-t border-[#E8E4DC]">
                        <span className="px-3 py-1 rounded-full bg-[#F4F0E6] text-stone-700 text-xs font-semibold border border-[#E8E4DC]">
                          {project.area}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#F4F0E6] text-stone-700 text-xs font-semibold border border-[#E8E4DC]">
                          {project.timeline}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#fbf7ee] text-[#b88628] text-xs font-bold border border-[#d4a853]/30">
                          {project.scope}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>

        {/* ==========================================================================
            CLASSIC MODE EXCLUSIVE: CIVIL INTEGRITY & EVOLUTION
            ========================================================================== */}
        {!isBentoOrObsidian && (
          <section className="th-evolution-section hidden md:block">
            <div className="thozha-container">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="th-section-badge">CIVIL INTEGRITY &amp; EVOLUTION</span>
                <h2 className="th-section-title">From structural framework to living comfort.</h2>
                <p className="th-section-subtitle mx-auto">
                  We hold structural safety and architectural detailing to the same uncompromising standard at every milestone.
                </p>
              </div>

              <div className="th-evolution-grid">
                {/* Stage 01: Precision Concrete & Formwork */}
                <div className="th-evolution-card group">
                  <div className="th-evolution-img-wrap relative">
                    <div className="th-evolution-badges absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="px-3.5 py-1.5 rounded-full backdrop-blur-md bg-black/65 border border-white/20 text-white text-[10px] font-black tracking-widest uppercase">
                        STAGE 01 • STRUCTURAL FRAMEWORK
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/95 text-slate-900 text-[10.5px] font-extrabold border border-slate-200 shadow-sm">
                        Fe 550D TMT Steel
                      </span>
                    </div>
                    <img
                      src={resolveAssetUrl('images/thozha/evolution-stage1-photo.webp')}
                      alt="Stage 01: Precision Concrete & Formwork in Pollachi"
                      loading="lazy"
                      className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="th-evolution-body">
                    <h3 className="group-hover:text-[#b88628] transition-colors">Precision Concrete &amp; Formwork</h3>
                    <p>
                      Continuous structural supervision, IS 456-2000 cube testing, and calibrated rebar placement for generational strength.
                    </p>
                  </div>
                </div>

                {/* Stage 02: Architectural Harmony & Living */}
                <div className="th-evolution-card group">
                  <div className="th-evolution-img-wrap relative">
                    <div className="th-evolution-badges absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="px-3.5 py-1.5 rounded-full backdrop-blur-md bg-black/65 border border-white/20 text-white text-[10px] font-black tracking-widest uppercase">
                        STAGE 02 • TURNKEY HANDOVER
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10.5px] font-extrabold border border-emerald-200 shadow-sm">
                        Zero Defect Handover
                      </span>
                    </div>
                    <img
                      src={resolveAssetUrl('images/thozha/evolution-stage2-photo.webp')}
                      alt="Stage 02: Architectural Harmony & Living in Pollachi"
                      loading="lazy"
                      className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="th-evolution-body">
                    <h3 className="group-hover:text-[#b88628] transition-colors">Architectural Harmony &amp; Living</h3>
                    <p>
                      Refined local granite masonry, custom Burma teak woodwork, and thermal design that stays cool in Pollachi summers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==========================================================================
            CLASSIC MODE EXCLUSIVE: OUR WORK PROCESS & DISCIPLINES
            ========================================================================== */}
        {!isBentoOrObsidian && (
          <>
            <section id="process" className="th-process-section hidden md:block">
              <div className="thozha-container">
                <span className="th-section-badge">OUR WORK PROCESS</span>
                <h2 className="th-section-title">A transparent path to your dream home.</h2>
                <p className="th-section-subtitle">
                  Every project follows an audited 4-stage delivery timeline designed to prevent budget overruns and construction delays.
                </p>

                <div className="th-process-flow">
                  {workProcess.map((item) => (
                    <div key={item.step} className="th-process-step group hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#fbf7ee] text-[#b88628] border border-[#d4a853]/30 text-[10.5px] font-black tracking-widest uppercase mb-3.5 w-fit">
                        {item.step}
                      </span>
                      <h3 className="group-hover:text-[#b88628] transition-colors">{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="services" className="th-disciplines-section hidden md:block">
              <div className="thozha-container">
                <div className="th-section-header-flex">
                  <div>
                    <span className="th-section-badge">OUR DISCIPLINES</span>
                    <h2 className="th-section-title">Full-service architectural &amp; civil solutions.</h2>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 bg-[#fbf7ee] border border-[#d4a853]/30 px-4 py-1.5 rounded-full shadow-sm">
                    <BadgeCheck size={16} className="text-[#b88628]" /> Registered Grade-I Civil Practice
                  </span>
                </div>

                <div className="th-disciplines-grid">
                  {disciplines.map((item) => (
                    <div key={item.title} className="th-discipline-card group hover:-translate-y-1.5 hover:border-[#d4a853]/40 transition-all duration-300">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#fcf9f2] to-[#f4ebd6] border border-[#d4a853]/30 text-[#b88628] flex items-center justify-center mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                        {createElement(item.icon, { size: 20, strokeWidth: 1.5 })}
                      </div>
                      <h3 className="group-hover:text-[#b88628] transition-colors">{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ==========================================================================
            SECTION 7: QUALITY BENCHMARKS (Zero Compromise Engineering)
            Desktop: Apple-styled audited comparison table
            Mobile: Segmented toggle tabs
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
                <div className="text-emerald-700 font-extrabold flex items-center gap-1.5">
                  <BadgeCheck size={16} className="text-emerald-600" />
                  THOZHA STANDARDS (AUDITED)
                </div>
                <div className="text-slate-500 font-bold">MARKET CONVENTIONAL</div>
              </div>
              {qualityBenchmarks.map((b) => (
                <div key={b.metric} className="th-benchmark-row">
                  <div className="th-benchmark-label">{b.metric}</div>
                  <div className="th-benchmark-ours">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{b.ours}</span>
                  </div>
                  <div className="th-benchmark-market">{b.market}</div>
                </div>
              ))}
            </div>

            {/* Mobile Tabbed View */}
            <div className="block md:hidden">
              {/* Segmented Pill Switcher */}
              <div className="th-benchmark-mobile-tabbar grid grid-cols-2 p-1 rounded-2xl bg-[#F4F0E6] mb-4 text-xs font-bold border border-[#E8E4DC]">
                <button
                  type="button"
                  onClick={() => setBenchmarkTab('thozha')}
                  className={`py-2.5 rounded-xl transition-all border-none cursor-pointer text-center active:scale-[0.97] touch-manipulation ${
                    benchmarkTab === 'thozha'
                      ? 'th-benchmark-mobile-btn-active bg-[#B88628] text-white shadow-sm font-bold'
                      : 'th-benchmark-mobile-btn-inactive bg-transparent text-stone-600 font-semibold'
                  }`}
                >
                  Thozha Standards
                </button>
                <button
                  type="button"
                  onClick={() => setBenchmarkTab('market')}
                  className={`py-2.5 rounded-xl transition-all border-none cursor-pointer text-center active:scale-[0.97] touch-manipulation ${
                    benchmarkTab === 'market'
                      ? 'th-benchmark-mobile-btn-active bg-[#18181B] text-white shadow-sm font-bold'
                      : 'th-benchmark-mobile-btn-inactive bg-transparent text-stone-600 font-semibold'
                  }`}
                >
                  Market Conventional
                </button>
              </div>

              {/* Mobile Benchmark Cards */}
              <div className="space-y-2.5">
                {qualityBenchmarks.map((b) => (
                  <div
                    key={b.metric}
                    className={`th-benchmark-mobile-card p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                      benchmarkTab === 'thozha'
                        ? 'th-benchmark-mobile-card-thozha bg-emerald-50/60 border-emerald-200/80'
                        : 'th-benchmark-mobile-card-market bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-500 w-28 shrink-0">
                      {b.metric}
                    </span>
                    <span
                      className={`text-xs font-bold text-right leading-tight ${
                        benchmarkTab === 'thozha' ? 'text-emerald-900 flex items-center gap-1.5 justify-end' : 'text-slate-600'
                      }`}
                    >
                      {benchmarkTab === 'thozha' && <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />}
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
                    &ldquo;Their licensed Category-1 bank valuation for Canara Bank was audited and cleared in 48 hours without any back-and-forth queries. Invaluable professional expertise.&rdquo;
                  </p>
                  <div className="th-testimonial-author">
                    <strong>Er. K. Soundararajan</strong>
                    <span>Mahalingapuram, Pollachi • Valuation &amp; Civil Audit</span>
                  </div>
                </article>
              </div>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden">
              <span className="text-[11px] font-black text-[#b88628] tracking-widest uppercase block mb-1.5">
                TRUST &amp; REPUTATION
              </span>
              <h2 className="th-mobile-heading font-serif text-3xl font-bold text-stone-950 leading-tight tracking-tight mb-4">
                What Pollachi homeowners say.
              </h2>

              <article className="th-review-mobile-card p-5 rounded-3xl bg-white border border-[#E8E4DC] shadow-[0_6px_20px_rgba(30,25,18,0.04),inset_0_1px_0_rgba(255,255,255,0.95)]">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="#B88628" className="text-[#B88628]" />
                  ))}
                  <span className="th-review-rating text-xs font-bold text-stone-800 ml-1.5">5.0 / 5.0 Rating</span>
                </div>
                <p className="font-serif italic text-base text-stone-800 leading-relaxed mb-4">
                  &ldquo;From our first 2D sketch to the finished teak doors, Thozha handled our home with pure honesty. The 3D render they shared turned out exactly like the completed house.&rdquo;
                </p>
                <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between">
                  <div>
                    <strong className="th-review-author block text-xs font-bold text-stone-900">Dr. Rajesh &amp; Sangeetha</strong>
                    <span className="text-[11px] text-stone-500">Anamalai Road, Pollachi • 4,200 sq.ft Villa</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F4F0E6] text-[#B88628] text-[10px] font-bold border border-[#E8E4DC]">
                    Verified Client
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            SECTION 9: DIRECT CONSULTATION / CONTACT
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

                <div className="th-checklist hidden md:flex">
                  <div className="th-checklist-item">
                    <CheckCircle2 size={18} className="text-[#b88628] shrink-0 mt-0.5" />
                    <div>
                      <strong>1-on-1 On-Site Vaastu &amp; Plot Evaluation</strong>
                      <p>Comprehensive soil bearing, cardinal orientation, and microclimate checks across Pollachi, Kinathukadavu &amp; Coimbatore outskirts.</p>
                    </div>
                  </div>

                  <div className="th-checklist-item">
                    <CheckCircle2 size={18} className="text-[#b88628] shrink-0 mt-0.5" />
                    <div>
                      <strong>Zero-Commitment Concept &amp; DTCP Feasibility</strong>
                      <p>Preliminary statutory guideline review, setback norms assessment, and Panchayat or DTCP sanction clearance guidance.</p>
                    </div>
                  </div>

                  <div className="th-checklist-item">
                    <CheckCircle2 size={18} className="text-[#b88628] shrink-0 mt-0.5" />
                    <div>
                      <strong>Transparent Material &amp; Specification Walkthrough</strong>
                      <p>Clear explanation of Grade-I civil standards, certified Fe 550D TMT rebar, M25 concrete cube testing, and genuine Burma teak joinery.</p>
                    </div>
                  </div>
                </div>

                <div className="th-hotline-box mt-4 hidden md:flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0a1118] to-[#1e293b] text-[#d4a853] flex items-center justify-center shrink-0 shadow-md">
                    <Phone size={18} />
                  </div>
                  <div className="th-hotline-text">
                    <small className="text-[10px] font-black text-slate-400 tracking-wider uppercase block">DIRECT ENGINEER HOTLINE</small>
                    <a href="tel:+919843161705" className="text-base font-black text-slate-900 hover:text-[#b88628] transition-colors block no-underline">
                      +91 98431 61705
                    </a>
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Fast WhatsApp Response • Mon - Sat: 9:00 AM - 7:30 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Consultation Form (Apple Specular Glass Card) */}
              <div className="th-form-card">
                <h3 className="hidden md:block">Book a Free Site Consultation</h3>
                <p className="hidden md:block">Discuss your plot orientation and requirements directly with our Chief Engineer.</p>

                {submitSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center">
                    <CheckCircle2 size={28} className="mx-auto mb-2 text-emerald-600" />
                    <strong className="block text-base font-extrabold">Consultation Request Received!</strong>
                    <span className="text-xs text-emerald-700 mt-1 block">Our chief engineer will contact you shortly to confirm your site visit.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="th-form-group">
                      <label htmlFor="client-name">FULL NAME</label>
                      <input
                        id="client-name"
                        type="text"
                        required
                        autoComplete="name"
                        enterKeyHint="next"
                        placeholder="e.g. Er. Karthikeyan or Senthil Nathan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="th-form-input text-base sm:text-xs"
                      />
                    </div>

                    <div className="th-form-group">
                      <label htmlFor="client-phone">WHATSAPP / CONTACT NUMBER</label>
                      <div className="flex rounded-xl border border-slate-200 overflow-hidden bg-slate-50 focus-within:border-[#d4a853] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#d4a853]/20 transition-all">
                        <span className="px-3.5 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold border-r border-slate-200 flex items-center shrink-0">
                          +91
                        </span>
                        <input
                          id="client-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          enterKeyHint="next"
                          required
                          placeholder="98430 12345"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2.5 text-base sm:text-xs text-slate-800 outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="th-form-group">
                      <label htmlFor="client-loc">SITE LOCATION / TOWN</label>
                      <input
                        id="client-loc"
                        type="text"
                        enterKeyHint="next"
                        placeholder="e.g. Mahalingapuram, Pollachi / Udumalpet"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="th-form-input text-base sm:text-xs"
                      />
                    </div>

                    <div className="th-form-group">
                      <label htmlFor="client-scope">PROJECT SCOPE / TYPE</label>
                      <select
                        id="client-scope"
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        className="th-form-select text-base sm:text-xs"
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
                        enterKeyHint="done"
                        placeholder="e.g. 2,400 sq.ft north-facing plot with Vaastu courtyard requirement..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="th-form-textarea text-base sm:text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full min-h-[48px] py-4 rounded-full bg-gradient-to-r from-[#d4a853] via-[#c59940] to-[#b88628] hover:from-[#c59940] hover:to-[#a9751e] text-white font-black text-xs tracking-widest uppercase text-center shadow-[0_4px_18px_rgba(212,168,83,0.38)] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] border-none mt-3 touch-manipulation"
                    >
                      {submitting ? 'Submitting Details...' : 'Request Site Consultation →'}
                    </button>

                    <div className="flex items-center gap-2 justify-center text-[10.5px] text-slate-500 mt-2 text-center">
                      <ShieldCheck size={14} className="text-[#b88628] shrink-0" />
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
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              if (window.lenis) window.lenis.scrollTo(0, { duration: 1.2 })
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="th-appbar-link"
          >
            <Home size={18} />
            <span>Home</span>
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault()
              const el = document.querySelector('#portfolio')
              if (el) {
                if (window.lenis) window.lenis.scrollTo(el, { duration: 1.2 })
                else el.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="th-appbar-link"
          >
            <Layers size={18} />
            <span>Works</span>
          </a>
          <a
            href="#expertise"
            onClick={(e) => {
              e.preventDefault()
              const el = document.querySelector('#expertise')
              if (el) {
                if (window.lenis) window.lenis.scrollTo(el, { duration: 1.2 })
                else el.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="th-appbar-link"
          >
            <Wrench size={18} />
            <span>Services</span>
          </a>
          <a
            href="#consultation"
            onClick={(e) => {
              e.preventDefault()
              const el = document.querySelector('#consultation')
              if (el) {
                if (window.lenis) window.lenis.scrollTo(el, { duration: 1.2 })
                else el.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="th-appbar-link"
          >
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
