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
          {/* Desktop Brand Logo & Wordmark */}
          <Link to="/" className="th-nav-brand hidden md:flex" aria-label="Thozha Associates">
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

          {/* Mobile Left: Menu Toggle Button (matching screen 01.png) */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-slate-900 border-none cursor-pointer hover:bg-slate-100 transition-colors"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle navigation menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Center: Brand Wordmark (matching screen 01.png) */}
          <Link to="/" className="flex md:hidden flex-col items-center text-center no-underline">
            <span className="text-[17px] font-black tracking-[0.16em] text-[#0b2b48] leading-tight">
              THOZHA
            </span>
            <span className="text-[8.5px] font-bold tracking-[0.22em] text-slate-500 uppercase leading-none mt-0.5">
              ARCHITECTURE &amp; CIVIL
            </span>
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

          {/* Right Actions */}
          <div className="th-nav-actions">
            {/* Desktop: Inquiries Phone + Start Your Project Button */}
            <a href={formatPhoneHref(phone)} className="th-inquiry-phone">
              <small>INQUIRIES</small>
              <strong>{phone}</strong>
            </a>
            <a
              href="#consultation"
              onClick={(e) => handleNavClick(e, '#consultation')}
              className="th-btn-primary hidden md:inline-flex"
            >
              Start Your Project
            </a>

            {/* Mobile Actions: Phone + User Profile Avatar (matching screen 01.png) */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href={formatPhoneHref(phone)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-100 transition-colors"
                aria-label="Call Thozha Associates"
              >
                <Phone size={17} />
              </a>
              <a
                href="#consultation"
                onClick={(e) => handleNavClick(e, '#consultation')}
                className="w-8 h-8 rounded-full bg-[#0b2b48] text-white flex items-center justify-center shadow-sm"
                aria-label="Consultation"
              >
                <User size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-2xl px-6 py-6 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <img src={logoUrl} alt="தோழா" className="h-8 w-auto" />
            <div>
              <strong className="block text-sm font-bold text-slate-900 tracking-wider">THOZHA ASSOCIATES</strong>
              <span className="block text-[10px] font-semibold text-slate-500 tracking-widest">CIVIL &amp; ARCHITECTURAL PRACTICE</span>
            </div>
          </div>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-base font-semibold text-slate-700 py-1.5 hover:text-blue-700 no-underline transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href="#consultation"
              onClick={(e) => handleNavClick(e, '#consultation')}
              className="w-full py-3 rounded-full bg-blue-700 text-white font-bold text-xs tracking-wider uppercase text-center shadow-md no-underline block"
            >
              Inquire About Your Site →
            </a>
            <a
              href={formatPhoneHref(phone)}
              className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700 py-2 no-underline"
            >
              <Phone size={14} className="text-blue-600" /> Direct Engineer: {phone}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
