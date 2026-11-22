import { CONTACT, COMPANY, instagramUrl, whatsappUrl } from '../../constants/data'
import { LinkButton } from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'

// Pestañas de carpeta de la lámina de cierre del Canva.
const TABS = ['bg-paper', 'bg-ink/15', 'bg-ink', 'bg-sun']

/**
 * Cierre. PENDIENTE: formulario (docs/estructura-visual.md §5 S7) cuando se decida a dónde envía
 * (servicio de formularios o WhatsApp). Por ahora, enlaces directos.
 */
export default function Contact() {
  const wa = whatsappUrl()
  return (
    <section id="contacto" className="section pt-0">
      <div className="section-container">
        <div aria-hidden="true" className="grid grid-cols-4 gap-2">
          {TABS.map((tab) => (
            <span key={tab} className={`h-3 ${tab}`} />
          ))}
        </div>
        <div className="grid gap-10 bg-paper-2 px-6 py-12 md:grid-cols-2 md:px-12 md:py-16">
          <SectionHeading strong={CONTACT.titleStrong} light={CONTACT.titleLight} />
          <div className="space-y-6">
            <p className="text-lg">{CONTACT.intro}</p>
            <div className="flex flex-wrap gap-4">
              {wa && (
                <LinkButton href={wa} target="_blank" rel="noopener noreferrer" variant="accent">
                  Escríbenos por WhatsApp
                </LinkButton>
              )}
              {COMPANY.email && (
                <LinkButton href={`mailto:${COMPANY.email}`} variant={wa ? 'ghost' : 'primary'}>
                  {COMPANY.email}
                </LinkButton>
              )}
              <LinkButton
                href={instagramUrl(COMPANY.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                variant={wa || COMPANY.email ? 'ghost' : 'primary'}
              >
                @{COMPANY.instagram}
              </LinkButton>
            </div>
            {!wa && !COMPANY.email && <p className="meta">{CONTACT.pendingNotice}</p>}
            <p className="meta">{COMPANY.city}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
