import { Menu, Phone, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { resolveAssetUrl } from '@/services/frameSequence'
import { formatPhoneHref } from '@/utils/helpers'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'Consultation', href: '#consultation' },
]

function Navbar({ company = {} }) {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const phone = company?.phone || '+91 98431 61705'
  const logoUrl = resolveAssetUrl('images/thozha/thozha-logo.png')
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        // If on inner page, let React Router navigate to /#section
        return
      }
      e.preventDefault()
      setOpen(false)
      const target = document.querySelector(href)
      if (target) {
        if (window.lenis) {
          window.lenis.scrollTo(target, { duration: 1.2 })
        } else {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      setOpen(false)
    }
  }

  return (
    <header className={`th-nav ${compact ? 'is-compact shadow-sm' : ''}`}>
      <div className="thozha-container">
        <div className="th-nav-inner">
          {/* Brand Logo & Wordmark */}
          <Link to="/" className="th-nav-brand" aria-label="Thozha Associates">
            <img
              src={logoUrl}
              alt="தோழா - Thozha Associates"
              className="th-nav-logo"
            />
            <div className="th-brand-text">
              <strong>THOZHA</strong>
              <span>ASSOCIATES • POLLACHI</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="th-nav-links" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Inquiries Phone + Start Your Project Button */}
          <div className="th-nav-actions">
            <a href={formatPhoneHref(phone)} className="th-inquiry-phone">
              <small>INQUIRIES</small>
              <strong>{phone}</strong>
            </a>
            <a
              href="#consultation"
              onClick={(e) => handleNavClick(e, '#consultation')}
              className="th-btn-primary"
            >
              Start Your Project
            </a>

            {/* Mobile Actions (Phone & Hamburger) */}
            <div className="md:hidden flex items-center gap-3">
              <a
                href={formatPhoneHref(phone)}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800"
                aria-label="Call Thozha Associates"
              >
                <Phone size={16} />
              </a>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 border-none cursor-pointer"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label="Toggle navigation"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-6 py-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <img src={logoUrl} alt="தோழா" className="h-8 w-auto" />
            <div>
              <strong className="block text-sm font-bold text-slate-900 tracking-wider">THOZHA</strong>
              <span className="block text-[9px] font-semibold text-slate-500 tracking-widest">ARCHITECTURE & CIVIL</span>
            </div>
          </div>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-base font-semibold text-slate-700 py-1"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="#consultation"
              onClick={(e) => handleNavClick(e, '#consultation')}
              className="th-btn-primary w-full text-center py-3"
            >
              Start Your Project
            </a>
            <a
              href={formatPhoneHref(phone)}
              className="flex items-center justify-center gap-2 text-sm font-bold text-slate-700 py-2"
            >
              <Phone size={15} /> Call Principal Engineer: {phone}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
