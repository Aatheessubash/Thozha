import { MessageCircle, Phone, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { formatPhoneHref } from '@/utils/helpers'

function FloatingActions({ company = {} }) {
  const { pathname } = useLocation()
  const isHome = pathname === '/' || pathname === ''
  const [formVisible, setFormVisible] = useState(false)
  const [scrolled, setScrolled] = useState(() => (typeof window !== 'undefined' ? window.scrollY > 80 : false))
  const whatsapp = (company?.whatsapp || '919843161705').replace(/\D/g, '')
  const phone = company?.phone || '+91 98431 61705'

  useEffect(() => {
    const form = document.querySelector('#quote')
    if (!form) return undefined
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.12 })
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isHome) return undefined

    const onScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const isHidden = formVisible || (isHome && !scrolled)

  return (
    <aside
      aria-label="Quick contact"
      className={`quick-actions ${isHidden ? 'is-hidden' : ''}`}
      aria-hidden={isHidden}
    >
      <a href={formatPhoneHref(phone)} aria-label="Call Thozha Associates">
        <Phone size={17} />
        <span>Call</span>
      </a>
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp Thozha Associates"
      >
        <MessageCircle size={17} />
        <span>WhatsApp</span>
      </a>
      <a href="#quote" aria-label="Open enquiry form">
        <Send size={17} />
        <span>Enquire</span>
      </a>
    </aside>
  )
}

export default FloatingActions
