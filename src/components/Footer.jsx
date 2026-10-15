import { ArrowUp, MapPin, Phone, Clock, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resolveAssetUrl } from '@/services/frameSequence'
import { formatPhoneHref } from '@/utils/helpers'

function Footer({ company = {} }) {
  const phone = company.phone || '+91 98431 61705'
  const logoUrl = resolveAssetUrl('images/thozha/thozha-logo.png')

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="site-footer bg-white border-t border-slate-200" aria-label="Site footer">
      <div className="thozha-container py-14">
        {/* 4-Column Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          {/* Column 1: Studio Identity & Credentials */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-3 mb-4 text-slate-900 no-underline">
              <img
                src={logoUrl}
                alt="தோழா - Thozha Associates"
                className="h-10 w-auto object-contain"
              />
              <div>
                <strong className="block text-base font-extrabold tracking-widest text-slate-900">THOZHA</strong>
                <span className="block text-[9px] font-bold tracking-widest text-slate-500">ASSOCIATES</span>
              </div>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mb-4">
              Registered Civil Engineers and Architects crafting durable, elegant turnkey residences in Pollachi and Western Tamil Nadu since 2009.
            </p>
            <div className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg w-fit">
              ISO 9001:2015 Certified Civil Practice
            </div>
          </div>

          {/* Column 2: Architecture Disciplines */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">ARCHITECTURE</h3>
            <ul className="list-none p-0 m-0 space-y-2.5 text-xs text-slate-600">
              <li><a href="#services" className="hover:text-blue-700 transition-colors">2D Municipal Blueprints</a></li>
              <li><a href="#services" className="hover:text-blue-700 transition-colors">3D Exterior Elevations</a></li>
              <li><a href="#services" className="hover:text-blue-700 transition-colors">Interior Spatial Design</a></li>
              <li><a href="#services" className="hover:text-blue-700 transition-colors">Vaastu Cardinal Layouts</a></li>
              <li><a href="#portfolio" className="hover:text-blue-700 transition-colors">Tropical Villa Concepts</a></li>
            </ul>
          </div>

          {/* Column 3: Civil Engineering Disciplines */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">CIVIL ENGINEERING</h3>
            <ul className="list-none p-0 m-0 space-y-2.5 text-xs text-slate-600">
              <li><a href="#services" className="hover:text-blue-700 transition-colors">DTCP &amp; Panchayat Sanctions</a></li>
              <li><a href="#services" className="hover:text-blue-700 transition-colors">STAAD Structural Analysis</a></li>
              <li><a href="#services" className="hover:text-blue-700 transition-colors">Approved Bank Valuation</a></li>
              <li><a href="#services" className="hover:text-blue-700 transition-colors">Turnkey Construction Handover</a></li>
              <li><a href="#services" className="hover:text-blue-700 transition-colors">M25 Concrete Cube Audits</a></li>
            </ul>
          </div>

          {/* Column 4: Pollachi Head Studio & Office */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">POLLACHI HEAD STUDIO</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-blue-700 shrink-0 mt-0.5" />
                <span>
                  Thozha Towers, Mahalingapuram Main Road,<br />
                  Pollachi, Tamil Nadu — 642002
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-blue-700 shrink-0" />
                <a href={formatPhoneHref(phone)} className="font-bold text-slate-800 hover:text-blue-700">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={15} className="text-blue-700 shrink-0" />
                <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
              </div>
              <div className="pt-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                  DTCP/LPA LICENSED #PLU/E1/2012
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="m-0">
            © {new Date().getFullYear()} Thozha Associates (தோழா). Civil Engineers &amp; Architects. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/about" className="hover:text-blue-700 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-blue-700 transition-colors">Terms of Service</Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 cursor-pointer text-[11px] font-semibold"
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
