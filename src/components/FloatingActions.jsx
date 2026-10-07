import { MessageCircle, Phone } from 'lucide-react'
import { formatPhoneHref } from '@/utils/helpers'

function FloatingActions({ company }) {
  const whatsappNumber = company.whatsapp?.replace(/\D/g, '') || ''
  const phoneNumber = company.phone?.trim() || ''

  if (!whatsappNumber && !phoneNumber) {
    return null
  }

  return (
    <aside aria-label="Quick contact" className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {whatsappNumber ? (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="flex h-12 items-center gap-2 rounded-full border border-emerald-500/30 bg-[#25D366] px-4 text-white shadow-lg transition-transform hover:scale-105"
          aria-label="Direct WhatsApp Enquiry"
        >
          <MessageCircle size={18} fill="currentColor" />
          <span className="hidden text-xs font-semibold sm:inline">WhatsApp Us</span>
        </a>
      ) : phoneNumber ? (
        <a
          href={formatPhoneHref(phoneNumber)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white text-ink shadow-lg transition-transform hover:scale-105"
          aria-label="Call Now"
        >
          <Phone size={18} />
        </a>
      ) : null}
    </aside>
  )
}

export default FloatingActions
