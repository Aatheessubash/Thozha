import { MessageCircle, Phone, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { formatPhoneHref } from '@/utils/helpers'

function FloatingActions({ company }) {
  const [formVisible, setFormVisible] = useState(false)
  const whatsapp=(company.whatsapp||'919843161705').replace(/\D/g,'')
  const phone=company.phone||'+91 98431 61705'

  useEffect(() => {
    const form = document.querySelector('#quote')
    if (!form) return undefined
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.12 })
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  return <aside aria-label="Quick contact" className={`quick-actions ${formVisible ? 'is-hidden' : ''}`} aria-hidden={formVisible}>
    <a href={formatPhoneHref(phone)} aria-label="Call Thozha Associates"><Phone size={18}/><span>Call</span></a>
    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp Thozha Associates"><MessageCircle size={18}/><span>WhatsApp</span></a>
    <a href="#quote" aria-label="Open enquiry form"><Send size={18}/><span>Enquire</span></a>
  </aside>
}
export default FloatingActions
