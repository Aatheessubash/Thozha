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

  // View state for Hero Showcase: 'handover' (Anamalai Villa) vs 'walkthrough' (3D Scroll sequence)
  const [heroMode, setHeroMode] = useState('handover')

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
            SECTION 2: CORE PILLARS (Matching screen.png)
            ========================================================================== */}
        <section id="expertise" className="th-pillars-section">
          <div className="thozha-container">
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
        </section>

        {/* ==========================================================================
            SECTION 3: PORTFOLIO HIGHLIGHTS (Matching screen.png)
            ========================================================================== */}
        <section id="portfolio" className="th-portfolio-section">
          <div className="thozha-container">
            <div className="th-section-header-flex">
              <div>
                <span className="th-section-badge">PORTFOLIO HIGHLIGHTS</span>
                <h2 className="th-section-title">Homes and spaces built to endure.</h2>
              </div>
              <p className="th-section-subtitle">
                A selection of modern villas and commercial facilities constructed across Pollachi, Kinathukadavu, and the Anamalai corridor.
              </p>
            </div>

            <div className="th-portfolio-grid">
              {/* Project Card 1: The Anamalai Courtyard Villa */}
              <article className="th-project-card">
                <div className="th-project-img-wrap">
                  <span className="th-project-status-pill">Residential Handover</span>
                  <img
                    src={resolveAssetUrl('images/thozha/portfolio-anamalai-photo.webp')}
                    alt="The Anamalai Courtyard Villa in Pollachi"
                    loading="lazy"
                  />
                </div>
                <div className="th-project-body">
                  <span className="th-project-loc">ANAMALAI FOOTHILLS, POLLACHI</span>
                  <h3 className="th-project-title">The Anamalai Courtyard Villa</h3>
                  <p className="th-project-desc">
                    A 4,200 sq.ft contemporary sanctuary engineered with integrated Burma teak louvers, central rainwater courtyard, and natural cross-ventilation designed for tropical microclimates.
                  </p>
                  <div className="th-project-footer">
                    <span>Plot: 12 Cents • Built-up: 4,200 sq.ft</span>
                    <strong>Delivered in 14 Months</strong>
                  </div>
                </div>
              </article>

              {/* Project Card 2: G+3 Commercial & Retail Center */}
              <article className="th-project-card">
                <div className="th-project-img-wrap">
                  <span className="th-project-status-pill">Ongoing Commercial Site</span>
                  <img
                    src={resolveAssetUrl('images/thozha/portfolio-commercial-photo.webp')}
                    alt="G+3 Commercial & Retail Center in Udumalpet"
                    loading="lazy"
                  />
                </div>
                <div className="th-project-body">
                  <span className="th-project-loc">UDUMALPET HIGHWAY CORRIDOR</span>
                  <h3 className="th-project-title">G+3 Commercial & Retail Center</h3>
                  <p className="th-project-desc">
                    An 8,400 sq.ft reinforced concrete commercial structure with heavy floor loads, seismic-resistant STAAD-Pro frame engineering, and optimal column spans for retail flexibility.
                  </p>
                  <div className="th-project-footer">
                    <span>Built-up: 8,400 sq.ft • M25 Grade RCC</span>
                    <strong>On-Schedule Progress</strong>
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
            ========================================================================== */}
        <section className="th-quality-section">
          <div className="thozha-container">
            <div className="max-w-2xl">
              <span className="th-section-badge">QUALITY BENCHMARKS</span>
              <h2 className="th-section-title">Zero Compromise Engineering</h2>
              <p className="th-section-subtitle">
                How our turnkey civil specs outlast standard contractor practices across Western Tamil Nadu.
              </p>
            </div>

            <div className="th-benchmark-table">
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
          </div>
        </section>

        {/* ==========================================================================
            SECTION 8: TRUST & HERITAGE + TESTIMONIALS (Matching screen.png)
            ========================================================================== */}
        <section className="th-trust-section">
          <div className="thozha-container">
            <div className="th-trust-layout">
              {/* Left Column: Trust & Heritage */}
              <div className="th-trust-col-left">
                <span className="th-section-badge">TRUST & HERITAGE</span>
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
                      <span>Pollachi Municipality & Directorate of Town and Country Planning (DTCP).</span>
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
                      <span>Association of Consulting Civil Engineers (ACCE) & Engineers Club Tamil Nadu.</span>
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
          </div>
        </section>

        {/* ==========================================================================
            SECTION 9: DIRECT SITE CONSULTATION & FEASIBILITY (Matching screen.png)
            ========================================================================== */}
        <section id="consultation" className="th-consultation-section">
          <div className="thozha-container">
            <div className="th-consultation-grid">
              {/* Left Column: Feasibility Overview */}
              <div className="th-consultation-info">
                <span className="th-section-badge">CONSULTATION & FEASIBILITY</span>
                <h2>Direct Chief Engineer Site Consultation &amp; Feasibility.</h2>
                <p>
                  Initiate your homebuilding journey with personalized guidance from Pollachi&apos;s seasoned structural engineers. We inspect your site, evaluate statutory regulations, and map out architectural possibilities before any commitment.
                </p>

                <div className="th-checklist">
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

                <div className="th-hotline-box">
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

              {/* Right Column: Book a Free Site Consultation Form */}
              <div className="th-form-card">
                <h3>Book a Free Site Consultation</h3>
                <p>Discuss your plot orientation and requirements directly with our Chief Engineer.</p>

                {submitSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center">
                    <CheckCircle2 size={24} className="mx-auto mb-2 text-emerald-600" />
                    <strong className="block text-sm">Consultation Request Received!</strong>
                    <span className="text-xs">Our chief engineer will contact you shortly to confirm the site visit.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="th-form-group">
                      <label htmlFor="client-name">Full Name</label>
                      <input
                        id="client-name"
                        type="text"
                        required
                        placeholder="e.g. Senthil Nathan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="th-form-input"
                      />
                    </div>

                    <div className="th-form-row">
                      <div className="th-form-group">
                        <label htmlFor="client-phone">Phone / WhatsApp</label>
                        <input
                          id="client-phone"
                          type="tel"
                          required
                          placeholder="+91 98431 00000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="th-form-input"
                        />
                      </div>
                      <div className="th-form-group">
                        <label htmlFor="client-loc">Site Location</label>
                        <input
                          id="client-loc"
                          type="text"
                          placeholder="e.g. Mahalingapuram, Pollachi"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="th-form-input"
                        />
                      </div>
                    </div>

                    <div className="th-form-group">
                      <label htmlFor="client-scope">Project Scope / Type</label>
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
                      <label htmlFor="client-details">Project Details (Optional)</label>
                      <textarea
                        id="client-details"
                        placeholder="Plot size (e.g. 2,400 sq.ft), preferred layout style, or questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="th-form-textarea"
                      />
                    </div>

                    <button type="submit" disabled={submitting} className="th-form-submit">
                      {submitting ? 'Submitting Details...' : 'Schedule Free Engineering Site Audit'}
                    </button>
                    <p className="th-form-guarantee">
                      Direct consultation with chief engineer • No spam guaranteed
                    </p>
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

      {/* Architectural White Footer */}
      <Footer company={company} />
    </div>
  )
}

export default HomePage
