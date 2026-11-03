import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { resolveAssetUrl } from '@/services/frameSequence'
import { formatPhoneHref } from '@/utils/helpers'

const navLinks = [
  { label: 'Studio', path: '/', hash: '#top', exact: true },
  { label: 'Portfolio', path: '/projects', hash: '#portfolio' },
  { label: 'Engineering', path: '/services', hash: '#expertise' },
  { label: 'Vaastu & BIM', path: '/process', hash: '#process' },
  { label: 'About', path: '/about', hash: '#about' },
]

export default function Navbar({ company = {} }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const phone = company?.phone || import.meta.env.VITE_COMPANY_PHONE || '+91 98431 61705'
  const logoUrl = resolveAssetUrl('images/thozha/thozha-logo-hd.png')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const handleNavClick = (e, item) => {
    setOpen(false)
    if (item.exact) {
      if (location.pathname === '/') {
        e.preventDefault()
        if (window.lenis) window.lenis.scrollTo(0, { duration: 1.0 })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/')
      }
      return
    }

    if (location.pathname === '/' && item.hash) {
      const el = document.querySelector(item.hash)
      if (el) {
        e.preventDefault()
        if (window.lenis) window.lenis.scrollTo(el, { duration: 1.2 })
        else el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    if (location.pathname !== item.path) {
      navigate(item.path)
    }
  }

  const isItemActive = (item) => {
    if (item.exact) return location.pathname === '/' && !location.hash
    return location.pathname === item.path
  }

  return (
    <header className="fixed top-3 lg:top-5 inset-x-0 z-50 pointer-events-none">
      {/* ── DESKTOP FLOATING LIQUID GLASS CAPSULE (WARM WHITE THEME) ── */}
      <div className="hidden lg:block max-w-5xl mx-auto px-4 pointer-events-auto">
        <nav
          aria-label="Main Navigation"
          className={`flex items-center justify-between px-7 py-3 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-[#FAF8F5]/92 backdrop-blur-2xl border border-[#E8E4DC] shadow-[0_16px_40px_rgba(24,24,27,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]'
              : 'bg-[#FAF8F5]/85 backdrop-blur-2xl border border-[#E8E4DC]/80 shadow-[0_12px_36px_rgba(24,24,27,0.05),inset_0_1px_0_rgba(255,255,255,0.85)]'
          }`}
        >
          {/* Brand Name */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, navLinks[0])}
            className="flex items-center gap-2.5 text-xs font-black tracking-[0.18em] text-[#18181B] uppercase no-underline hover:text-[#B88628] transition-colors"
          >
            <img src={logoUrl} alt="தோழா" className="h-6 w-auto object-contain" />
            <span>THOZHA ASSOCIATES</span>
          </Link>

          {/* Centered Nav Links */}
          <div className="flex items-center gap-7">
            {navLinks.map((item) => {
              const active = isItemActive(item)
              return (
                <a
                  key={item.label}
                  href={item.hash || item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative inline-flex items-center py-2 px-1 text-xs tracking-wide transition-colors no-underline cursor-pointer focus-visible:outline-none focus-visible:text-[#B88628] ${
                    active
                      ? 'text-[#18181B] font-bold after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-[2px] after:bg-[#B88628] after:rounded-full'
                      : 'text-stone-600 hover:text-[#18181B] font-medium'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          {/* Right Action: Warm Gold Capsule CTA */}
          <Link
            to="/contact"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault()
                const el = document.querySelector('#consultation')
                if (el) {
                  if (window.lenis) window.lenis.scrollTo(el, { duration: 1.2 })
                  else el.scrollIntoView({ behavior: 'smooth' })
                }
              }
            }}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B88628] via-[#A87920] to-[#8C6215] text-white hover:brightness-105 hover:shadow-[0_4px_20px_rgba(184,134,40,0.3)] active:scale-[0.97] transition-all duration-200 text-xs font-bold tracking-wide no-underline cursor-pointer shadow-[0_2px_10px_rgba(184,134,40,0.2)]"
          >
            Inquire Site / Consult Engineer
          </Link>
        </nav>
      </div>

      {/* ── MOBILE FLOATING CAPSULE (WARM WHITE THEME) ── */}
      <div className="block lg:hidden px-3 pointer-events-auto">
        <nav
          aria-label="Mobile Navigation"
          className={`flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-[#FAF8F5]/96 backdrop-blur-2xl border border-[#E8E4DC] shadow-lg'
              : 'bg-[#FAF8F5]/90 backdrop-blur-2xl border border-[#E8E4DC] shadow-md'
          }`}
        >
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, navLinks[0])}
            className="flex items-center gap-2 text-xs font-black tracking-wider text-[#18181B] uppercase truncate no-underline"
          >
            <img src={logoUrl} alt="தோழா" className="h-5 w-auto object-contain shrink-0" />
            <span className="font-extrabold text-[11px] sm:text-xs tracking-wider truncate">THOZHA ASSOCIATES</span>
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={formatPhoneHref(phone)}
              className="w-9 h-9 rounded-full bg-white hover:bg-stone-50 border border-[#E8E4DC] text-stone-800 flex items-center justify-center active:scale-[0.93] transition-transform no-underline shadow-2xs touch-manipulation"
              aria-label="Call engineer"
            >
              <Phone size={14} className="text-[#B88628]" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full bg-white hover:bg-stone-50 border border-[#E8E4DC] text-stone-800 flex items-center justify-center active:scale-[0.93] transition-transform cursor-pointer shadow-2xs touch-manipulation"
              aria-label="Toggle menu"
            >
              {open ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </nav>

        {/* Mobile Liquid Glass Drawer */}
        {open && (
          <div className="mt-2 p-5 rounded-3xl bg-[#FAF8F5]/98 backdrop-blur-2xl border border-[#E8E4DC] shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.hash || item.path}
                onClick={(e) => handleNavClick(e, item)}
                className="py-3 px-3 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors flex items-center justify-between no-underline min-h-[44px] touch-manipulation"
              >
                <span>{item.label}</span>
                <span className="text-[#B88628] text-xs">→</span>
              </a>
            ))}
            <div className="pt-2 border-t border-[#E8E4DC]">
              <Link
                to="/contact"
                onClick={(e) => {
                  setOpen(false)
                  if (location.pathname === '/') {
                    e.preventDefault()
                    const el = document.querySelector('#consultation')
                    if (el) {
                      if (window.lenis) window.lenis.scrollTo(el, { duration: 1.2 })
                      else el.scrollIntoView({ behavior: 'smooth' })
                    }
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#B88628] via-[#A87920] to-[#8C6215] text-white font-black text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 no-underline shadow-md active:scale-[0.97] min-h-[44px] touch-manipulation"
              >
                <span>Book Site Consultation</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
