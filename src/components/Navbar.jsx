import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { resolveAssetUrl } from '@/services/frameSequence'
import { formatPhoneHref } from '@/utils/helpers'

const links = [
  ['Home', '/'], ['About', '/about'], ['Projects', '/projects'], ['Services', '/services'],
  ['Process', '/process'], ['Testimonials', '/#testimonials'], ['Contact', '/contact'],
]

function Navbar({ company }) {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const phone = company.phone || '+91 98431 61705'
  const logoUrl = resolveAssetUrl('images/thozha/thozha-logo.png')

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <header className={`premium-nav ${compact ? 'is-compact' : ''}`}>
    <Link to="/" className="brand-header-link" aria-label="Thozha Associates home">
      <img
        src={logoUrl}
        alt="தோழா - Thozha Associates"
        className="brand-nav-logo"
      />
      <div className="wordmark">
        <strong>THOZHA</strong>
        <span>ASSOCIATES</span>
      </div>
    </Link>
    <nav aria-label="Primary navigation">{links.map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}</nav>
    <div className="nav-contact"><a className="nav-phone" href={formatPhoneHref(phone)}><Phone size={15}/>{phone}</a><Link className="nav-cta" to="/contact">Consult Us <span>→</span></Link></div>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X/> : <Menu/>}</button>
    {open && <div id="mobile-navigation" className="mobile-menu">
      <div className="mobile-menu-brand">
        <img src={logoUrl} alt="தோழா" className="mobile-nav-logo" />
        <div className="wordmark">
          <strong>THOZHA</strong>
          <span>ASSOCIATES</span>
        </div>
      </div>
      {links.map(([label, href]) => <Link key={href} to={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>Consult Us →</Link>
    </div>}
  </header>
}

export default Navbar
