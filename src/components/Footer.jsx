import { ArrowUp, MapPin, Phone, Clock, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resolveAssetUrl } from '@/services/frameSequence'
import { formatPhoneHref } from '@/utils/helpers'

function Footer({ company = {} }) {
  const phone = company?.phone || import.meta.env.VITE_COMPANY_PHONE || '+91 98431 61705'
  const email = company?.email || import.meta.env.VITE_COMPANY_EMAIL || 'contact@thozhaassociates.com'
  const location = company?.location || import.meta.env.VITE_COMPANY_LOCATION || 'Venkatasa Colony, Pollachi, Tamil Nadu 642001'
  const logoUrl = resolveAssetUrl('images/thozha/thozha-logo.png')

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="th-footer" aria-label="Site footer">
      {/* ==========================================================================
          DESKTOP FOOTER (hidden md:block): Warm White Editorial
          ========================================================================== */}
      <div className="hidden md:block bg-[#FAF8F5] border-t border-[#E8E4DC]">
        <div className="thozha-container py-14">
          {/* 4-Column Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#E8E4DC]">
            {/* Column 1: Studio Identity & Credentials */}
            <div className="flex flex-col">
              <Link to="/" className="flex items-center gap-3 mb-4 text-stone-900 no-underline">
                <img
                  src={logoUrl}
                  alt="தோழா - Thozha Associates"
                  className="h-10 w-auto object-contain"
                />
                <div>
                  <strong className="block text-base font-extrabold tracking-widest text-stone-900">THOZHA</strong>
                  <span className="block text-[9px] font-bold tracking-widest text-stone-500">ASSOCIATES</span>
                </div>
              </Link>
              <p className="text-xs text-stone-600 leading-relaxed max-w-sm mb-4">
                Registered Civil Engineers and Architects crafting durable, elegant turnkey residences in Pollachi and Western Tamil Nadu since 2009.
              </p>
              <div className="text-[11px] font-bold text-[#b88628] bg-[#fbf7ee] border border-[#d4a853]/30 px-3.5 py-1.5 rounded-full w-fit shadow-xs">
                ISO 9001:2015 Certified Civil Practice
              </div>
            </div>

            {/* Column 2: Architecture Disciplines */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-4">ARCHITECTURE</h3>
              <ul className="list-none p-0 m-0 space-y-2.5 text-xs text-stone-600">
                <li><Link to="/services" className="hover:text-[#b88628] transition-colors">2D Municipal Blueprints</Link></li>
                <li><Link to="/services" className="hover:text-[#b88628] transition-colors">3D Exterior Elevations</Link></li>
                <li><Link to="/services" className="hover:text-[#b88628] transition-colors">Interior Spatial Design</Link></li>
                <li><Link to="/services" className="hover:text-[#b88628] transition-colors">Vaastu Cardinal Layouts</Link></li>
                <li><Link to="/projects" className="hover:text-[#b88628] transition-colors">Tropical Villa Concepts</Link></li>
              </ul>
            </div>

            {/* Column 3: Civil Engineering Disciplines */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-4">CIVIL ENGINEERING</h3>
              <ul className="list-none p-0 m-0 space-y-2.5 text-xs text-stone-600">
                <li><Link to="/services" className="hover:text-[#b88628] transition-colors">DTCP &amp; Panchayat Sanctions</Link></li>
                <li><Link to="/services" className="hover:text-[#b88628] transition-colors">STAAD Structural Analysis</Link></li>
                <li><Link to="/services" className="hover:text-[#b88628] transition-colors">Approved Bank Valuation</Link></li>
                <li><Link to="/services" className="hover:text-[#b88628] transition-colors">Turnkey Construction Handover</Link></li>
                <li><Link to="/services" className="hover:text-[#b88628] transition-colors">M25 Concrete Cube Audits</Link></li>
              </ul>
            </div>

            {/* Column 4: Pollachi Head Studio & Office */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-4">POLLACHI HEAD STUDIO</h3>
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#d4a853] shrink-0 mt-0.5" />
                  <span>
                    {location}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-[#d4a853] shrink-0" />
                  <a href={formatPhoneHref(phone)} className="font-bold text-stone-800 hover:text-[#b88628] no-underline">
                    {phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-[#d4a853] shrink-0" />
                  <a href={`mailto:${email}`} className="font-semibold text-stone-800 hover:text-[#b88628] no-underline">
                    {email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={15} className="text-[#d4a853] shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
                </div>
                <div className="pt-1">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">
                    DTCP/LPA LICENSED #PLU/E1/2012
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p className="m-0">
              © {new Date().getFullYear()} Thozha Associates (தோழா). Civil Engineers &amp; Architects. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link to="/about" className="hover:text-[#b88628] transition-colors">About Us</Link>
              <Link to="/services" className="hover:text-[#b88628] transition-colors">Services</Link>
              <Link to="/contact" className="hover:text-[#b88628] transition-colors">Contact</Link>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E8E4DC] bg-white hover:bg-stone-50 hover:border-[#b88628]/40 text-stone-700 cursor-pointer text-[11px] font-bold shadow-xs transition-all active:scale-[0.97]"
              >
                Back to top <ArrowUp size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================================
          MOBILE FOOTER (block md:hidden): Warm White Editorial
          ========================================================================== */}
      <div className="block md:hidden bg-[#FAF8F5] text-stone-900 pt-10 pb-12 px-5 border-t border-[#E8E4DC]">
        <div className="max-w-md mx-auto">
          {/* Brand & Tamil Wordmark with Logo */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white rounded-xl p-1 shadow-sm shrink-0 flex items-center justify-center border border-[#E8E4DC]">
                <img
                  src={logoUrl}
                  alt="தோழா - Thozha Associates"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-wider text-stone-900 m-0 leading-tight">
                  THOZHA ASSOCIATES
                </h2>
                <p className="text-[10.5px] font-bold text-[#b88628] tracking-wider mt-0.5 m-0 leading-tight">
                  தோழா கன்ஸ்ட்ரக்சன்ஸ் • ARCHITECTURE &amp; CIVIL
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed m-0">
              Registered Civil Structural Engineers (Grade-I) &amp; Architectural consultants specializing in turnkey residence development across Western Ghats corridor.
            </p>
          </div>

          {/* Verified Badges & Contact Info */}
          <div className="space-y-3 py-5 border-y border-[#E8E4DC] my-5 text-xs text-stone-700">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#b88628]/20 text-[#b88628] flex items-center justify-center shrink-0 font-bold text-xs">
                ✓
              </div>
              <span className="font-bold text-stone-800 text-[11px]">
                ISO 9001:2015 CERTIFIED CIVIL CONTRACTOR
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-[#b88628] shrink-0 mt-0.5" />
              <span className="text-[11px] leading-relaxed">
                {location}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={15} className="text-[#b88628] shrink-0" />
              <a href={formatPhoneHref(phone)} className="text-[11px] font-bold text-stone-900 hover:text-[#b88628] no-underline">
                {phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={15} className="text-[#b88628] shrink-0" />
              <a href={`mailto:${email}`} className="text-[11px] font-medium text-stone-700 hover:text-[#b88628] no-underline">
                {email}
              </a>
            </div>
          </div>

          {/* Licenses & Statutory Badges */}
          <div className="flex items-center justify-between text-[9px] font-bold tracking-widest text-slate-400 uppercase py-2">
            <span>DTCP/LPA LICENSED #PLU/E1/2012</span>
            <span>VASTU SHASTRA APPROVED</span>
          </div>

          {/* Mobile Copyright */}
          <div className="pt-3 text-[10px] text-slate-400 text-center">
            © {new Date().getFullYear()} Thozha Associates. Crafted with structural integrity in Pollachi.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
