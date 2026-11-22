import { ArrowUpRight } from 'lucide-react'
import { COMPANY, HERO, NAV } from '../../constants/data'
import { asset } from '../../constants/base'
import { LinkButton } from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'

export default function Hero() {
  return (
    <section id="inicio" className="blueprint-grid relative pt-24 md:pt-32">
      <div className="section-container grid items-center gap-12 pb-12 md:grid-cols-12 md:pb-20">
        <div className="md:col-span-7">
          <SectionHeading as="h1" strong={HERO.titleStrong} light={HERO.titleLight} />
          <p className="mt-6 max-w-md pl-5 text-lg text-ink/80">
            <strong className="font-semibold">{COMPANY.tagline}.</strong> {HERO.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 pl-5">
            <LinkButton href="#contacto">{HERO.primaryCta}</LinkButton>
            <LinkButton href="#proyectos" variant="ghost" arrow={false}>
              {HERO.secondaryCta} →
            </LinkButton>
          </div>
        </div>

        <div className="relative md:col-span-5">
          {/* PENDIENTE: axonometría que se ensambla (docs/estructura-visual.md §5 S1). Por ahora, el logo. */}
          <img
            src={asset('images/brand/logo-ido.webp')}
            alt=""
            width={256}
            height={256}
            className="mx-auto aspect-square w-3/4 max-w-sm rounded-full"
          />
          <a
            href="#servicios"
            className="chamfer group absolute -bottom-6 right-0 block w-44 bg-dot p-4 text-ink transition-transform duration-base ease-out hover:-translate-y-1"
          >
            <span className="font-display text-4xl font-extrabold">{HERO.accent.value}</span>
            <span className="meta mt-1 flex items-end justify-between text-ink">
              {HERO.accent.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>

      {/* Índice numerado (R1): resumen de la página para quien escanea */}
      <nav aria-label="Índice" className="border-t border-ink/10">
        <ol className="section-container flex gap-8 overflow-x-auto py-4">
          {NAV.map(({ id, label }, i) => (
            <li key={id} className="shrink-0">
              <a href={`#${id}`} className="meta hover:text-ink">
                {String(i + 1).padStart(2, '0')} {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  )
}
