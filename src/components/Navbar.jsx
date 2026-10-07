import { ArrowRight, Menu, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { NAV_LINKS } from '@/utils/constants'

function NavbarLogo({ company }) {
  const [broken, setBroken] = useState(false)
  const initials = useMemo(
    () =>
      (company.name || 'TA')
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase(),
    [company.name],
  )

  if (!company.logo_url || broken) {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white shadow-sm">
        <span className="font-display text-sm font-bold tracking-wider">{initials}</span>
      </div>
    )
  }

  return (
    <img
      src={company.logo_url}
      alt={`${company.name} logo`}
      className="h-10 w-10 rounded-xl object-cover border border-stone-200"
      onError={() => setBroken(true)}
    />
  )
}

function Navbar({ company }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#FAF9F6]/90 backdrop-blur-md">
      <div className="section-shell py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <a href="#home" className="flex items-center gap-3 group">
            <NavbarLogo key={company.logo_url || company.name} company={company} />
            <div>
              <p className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl group-hover:text-accent transition-colors">
                {company.name}
              </p>
              <p className="hidden text-[10px] uppercase tracking-[0.22em] text-inkMuted sm:block">
                Civil Engineering & Architecture
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-inkMuted transition hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#quote"
              className="cta-primary px-5 py-2.5 text-[11px] tracking-[0.14em]"
            >
              Consult Our Team
              <ArrowRight size={14} />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-stone-200 bg-white text-ink lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open ? (
          <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-5 shadow-soft lg:hidden">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-inkMuted hover:bg-stone-50 hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-stone-100">
              <a
                href="#quote"
                className="cta-primary w-full justify-center text-xs tracking-[0.14em]"
                onClick={() => setOpen(false)}
              >
                Consult Our Team
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Navbar
