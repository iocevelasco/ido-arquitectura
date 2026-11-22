import { ArrowUpRight } from 'lucide-react'
import { CONTACT, COMPANY, instagramUrl } from '../../constants/data'
import ContactForm from '../ui/ContactForm'
import SectionHeading from '../ui/SectionHeading'

// Pestañas de carpeta de la lámina de cierre del Canva.
const TABS = ['bg-paper', 'bg-ink/15', 'bg-ink', 'bg-sun']

/** Cierre de la página: formulario que envía por WhatsApp (docs/estructura-visual.md §5 S7). */
export default function Contact() {
  return (
    <section id="contacto" className="section pt-0">
      <div className="section-container">
        <div aria-hidden="true" className="grid grid-cols-4 gap-2">
          {TABS.map((tab) => (
            <span key={tab} className={`h-3 ${tab}`} />
          ))}
        </div>
        <div className="grid gap-12 bg-paper-2 px-6 py-12 md:grid-cols-2 md:px-12 md:py-16">
          <div>
            <SectionHeading strong={CONTACT.titleStrong} light={CONTACT.titleLight} />
            <p className="mt-6 max-w-sm pl-5 text-lg">{CONTACT.intro}</p>
            <ul className="meta mt-8 space-y-2 pl-5">
              {COMPANY.email && (
                <li>
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-ink">
                    {COMPANY.email}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={instagramUrl(COMPANY.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-ink"
                >
                  @{COMPANY.instagram} <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </li>
              <li>{COMPANY.city}</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
