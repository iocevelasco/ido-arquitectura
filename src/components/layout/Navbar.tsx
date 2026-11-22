import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { COMPANY, NAV } from '../../constants/data'
import { asset } from '../../constants/base'
import { useActiveSection } from '../../hooks/useActiveSection'
import { LinkButton } from '../ui/Button'
import Dot from '../ui/Dot'
import { cn } from '../../lib/cn'

const IDS = NAV.map((item) => item.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menú de celular: se cierra con Esc y bloquea el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Barra meta, como el rótulo de un plano (R1) */}
      <div className="hidden border-b border-ink/10 bg-paper md:block">
        <div className="section-container meta flex h-8 items-center justify-between">
          <span>
            {COMPANY.name} · {COMPANY.city} · {COMPANY.coords}
          </span>
          <span>{COMPANY.tagline}</span>
        </div>
      </div>

      <nav
        aria-label="Principal"
        className={cn(
          'border-b transition-colors duration-base',
          scrolled || open
            ? 'border-ink/10 bg-paper/95 backdrop-blur'
            : 'border-transparent bg-transparent'
        )}
      >
        <div className="section-container flex h-16 items-center justify-between gap-6">
          <a href="#inicio" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img
              src={asset('images/brand/logo-ido.webp')}
              alt={COMPANY.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV.map(({ id, label }) => (
              <li key={id} className="relative">
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={cn(
                    'font-display text-sm uppercase tracking-wide transition-colors duration-fast',
                    active === id ? 'text-ink' : 'text-ink/60 hover:text-ink'
                  )}
                >
                  {label}
                </a>
                <Dot
                  className={cn(
                    'absolute -bottom-3 left-1/2 -translate-x-1/2 transition-opacity duration-base',
                    active === id ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LinkButton href="#contacto" size="sm" className="hidden sm:inline-flex">
              Empecemos
            </LinkButton>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Celular: índice numerado a pantalla completa (R1, "content index") */}
        {open && (
          <ol
            id="menu-movil"
            className="section-container h-[calc(100dvh-4rem)] border-t border-ink/10 py-6 lg:hidden"
          >
            {NAV.map(({ id, label }, i) => (
              <li key={id} className="border-b border-ink/10">
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-5 font-display text-3xl uppercase"
                >
                  <span className="meta">{String(i + 1).padStart(2, '0')}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        )}
      </nav>
    </header>
  )
}
