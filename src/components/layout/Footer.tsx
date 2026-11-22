import { ArrowUp } from 'lucide-react'
import { COMPANY, instagramUrl } from '../../constants/data'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-paper-2">
      <div className="section-container relative z-10 flex flex-col gap-6 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xl uppercase">
            <span className="font-extrabold">ido</span>{' '}
            <span className="font-light">arquitectura</span>
          </p>
          <p className="meta mt-2">{COMPANY.tagline}</p>
        </div>
        <ul className="meta flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a
              href={instagramUrl(COMPANY.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              @{COMPANY.instagram}
            </a>
          </li>
          <li>{COMPANY.city}</li>
          <li>© {COMPANY.year}</li>
          <li>
            <a href="#inicio" className="inline-flex items-center gap-1 hover:text-ink">
              Volver arriba <ArrowUp size={12} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
      {/* Wordmark gigante recortado por el borde (R5) */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.2em] select-none text-center font-display text-[26vw] font-extrabold leading-none text-ink/5"
      >
        ido
      </p>
    </footer>
  )
}
