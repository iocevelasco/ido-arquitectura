import { TYPOLOGIES } from '../../constants/data'
import SectionHeading from '../ui/SectionHeading'

/** Chips con borde punteado (lámina 10). PENDIENTE: red de líneas entre chips y preselección en Contacto. */
export default function Typologies() {
  return (
    <section id="servicios" className="section">
      <div className="section-container">
        <SectionHeading strong={TYPOLOGIES.title} />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {TYPOLOGIES.items.map((item) => (
            <li key={item}>
              <a
                href="#contacto"
                className="group flex h-full items-center justify-between gap-2 border border-dashed border-ink/40 min-w-0 px-3 py-4 font-display text-xs uppercase tracking-[0.06em] sm:px-4 sm:text-sm sm:tracking-[0.12em] transition-colors duration-base hover:border-ink hover:bg-ink hover:text-paper"
              >
                {item}
                <span
                  aria-hidden="true"
                  className="text-dot opacity-0 transition-opacity duration-base group-hover:opacity-100"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
