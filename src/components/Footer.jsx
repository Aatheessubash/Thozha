import { ArrowRight, ArrowUp, ArrowUpRight, CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resolveAssetUrl } from '@/services/frameSequence'
import { formatPhoneHref } from '@/utils/helpers'

function Footer({ company = {} }) {
  const phone = company.phone || '+91 98431 61705'
  const whatsapp = company.whatsapp || '919843161705'

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="site-footer" aria-label="Site footer">
      {/* Top Architectural Invitation Strip */}
      <div className="footer-cta-strip">
        <div className="footer-cta-content">
          <span className="footer-kicker">ARCHITECTURAL PRACTICE & CIVIL RIGOR</span>
          <h2 className="footer-cta-title">Ready to bring your architectural vision to life?</h2>
          <span>
            Discuss your plot layout, 3D visualization, municipal sanctions, or turnkey construction with our engineering team in Pollachi.
          </span>
        </div>
        <div className="footer-cta-actions">
          <Link to="/contact" className="footer-cta-btn">
            Book Consultation <ArrowUpRight size={15} />
          </Link>
          <a href={formatPhoneHref(phone)} className="footer-call-btn">
            <Phone size={14} /> {phone}
          </a>
        </div>
      </div>

      {/* Main 4-Column Architectural Showcase Grid */}
      <div className="footer-main-grid">
        {/* Column 1: Studio Identity & Credentials */}
        <div className="footer-col footer-col-brand">
          <div className="footer-brand-wrap">
            <img
              src={resolveAssetUrl('images/thozha/thozha-logo.png')}
              alt="தோழா - Thozha Associates"
              className="footer-logo-img"
            />
            <div className="footer-brand-text">
              <strong>THOZHA</strong>
              <span>ASSOCIATES</span>
            </div>
          </div>
          <p className="footer-brand-desc">
            Integrated architecture, civil engineering, and turnkey construction practice rooted in Pollachi. Designing functional, timeless living spaces built for everyday life.
          </p>
          <div className="footer-credentials">
            <div className="footer-cred-pill">
              <CheckCircle2 size={14} />
              <span>Registered Engineer Grade-I</span>
            </div>
            <div className="footer-cred-pill">
              <CheckCircle2 size={14} />
              <span>Member, Engineers Club Tamil Nadu</span>
            </div>
            <div className="footer-cred-pill">
              <CheckCircle2 size={14} />
              <span>10+ Years of Site-Tested Rigor</span>
            </div>
          </div>
        </div>

        {/* Column 2: Studio Navigation */}
        <div className="footer-col">
          <h3 className="footer-col-title">STUDIO</h3>
          <ul className="footer-nav-list">
            <li><Link to="/about">About Studio <ArrowRight size={12} /></Link></li>
            <li><Link to="/projects">Selected Projects <ArrowRight size={12} /></Link></li>
            <li><Link to="/process">Our 4-Stage Process <ArrowRight size={12} /></Link></li>
            <li><a href="/#testimonials">Client Reviews <ArrowRight size={12} /></a ></li>
            <li><Link to="/careers">Careers & Internships <ArrowRight size={12} /></Link></li>
            <li><Link to="/contact">Contact Studio <ArrowRight size={12} /></Link></li>
          </ul>
        </div>

        {/* Column 3: Expertise & Deliverables */}
        <div className="footer-col">
          <h3 className="footer-col-title">EXPERTISE</h3>
          <ul className="footer-nav-list">
            <li><Link to="/services/2d-building-plans">2D Building Plans & Vastu</Link></li>
            <li><Link to="/services/3d-exterior-design">3D Elevation & Photorealism</Link></li>
            <li><Link to="/services/3d-interior-design">Bespoke Interior Design</Link></li>
            <li><Link to="/services/building-approval-plans">LPA & Municipal Sanctions</Link></li>
            <li><Link to="/services/dtcp-layout-approvals">DTCP Layout Approvals</Link></li>
            <li><Link to="/services/building-construction">Turnkey Building Construction</Link></li>
            <li><Link to="/services/civil-engineering-consultancy">Civil Engineering Consultancy</Link></li>
          </ul>
        </div>

        {/* Column 4: Studio Office & Contact */}
        <div className="footer-col">
          <h3 className="footer-col-title">OFFICE & DIRECT CONTACT</h3>
          <div className="footer-contact-cards">
            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <MapPin size={15} />
              </div>
              <div className="footer-contact-text">
                <strong>Studio Address</strong>
                <p>Venkatasa Colony, Pollachi,<br />Coimbatore District, Tamil Nadu 642001</p>
                <small style={{ color: '#88918c', fontSize: '11px', display: 'block', marginTop: '2px' }}>
                  Serving Pollachi, Coimbatore, Udumalpet & Tiruppur
                </small>
              </div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <Phone size={15} />
              </div>
              <div className="footer-contact-text">
                <strong>Phone & WhatsApp</strong>
                <a href={formatPhoneHref(phone)}>{phone}</a>
                <span style={{ margin: '0 6px', color: '#ccc' }}>·</span>
                <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                  WhatsApp Direct
                </a>
              </div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <Mail size={15} />
              </div>
              <div className="footer-contact-text">
                <strong>Direct Inquiries</strong>
                <a href="mailto:contact@thozhaassociates.com">contact@thozhaassociates.com</a>
              </div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <Clock size={15} />
              </div>
              <div className="footer-contact-text">
                <strong>Practice Hours</strong>
                <p>Mon – Sat: 9:00 AM – 7:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Legal & Back to Top */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Thozha Associates. All rights reserved. Registered Civil Engineers & Architectural Practice, Pollachi.
          </p>
          <div className="footer-bottom-links">
            <Link to="/about">Professional Practice</Link>
            <Link to="/contact">Consultation Scope</Link>
            <Link to="/admin">Admin Portal</Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Back to top"
            >
              Back to top <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
