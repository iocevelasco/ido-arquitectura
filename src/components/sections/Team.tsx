import { ArrowUpRight } from 'lucide-react'
import { TEAM, instagramUrl } from '../../constants/data'
import { asset } from '../../constants/base'
import SectionHeading from '../ui/SectionHeading'

export default function Team() {
  return (
    <section id="nosotros" className="section">
      <div className="section-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            strong={TEAM.title.brand}
            light={TEAM.title.pre}
            lightFirst
            subtitle={TEAM.subtitle}
          />
          <p className="max-w-sm text-ink/70">{TEAM.intro}</p>
        </div>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.members.map((m) => (
            <li key={m.id} className="group">
              {/* B/N por defecto, color al pasar o enfocar (§5 S2) */}
              <img
                src={asset(m.photo)}
                alt={`Retrato de ${m.name}`}
                width={356}
                height={356}
                loading="lazy"
                className="aspect-square w-56 rounded-full border border-ink object-cover grayscale transition duration-slow ease-out group-hover:grayscale-0 group-focus-within:grayscale-0"
              />
              <h3 className="mt-6 font-display text-xl font-extrabold uppercase">{m.name}</h3>
              <p className="meta mt-1">{m.degree}</p>
              <p className="mt-3 text-sm text-ink/70">{m.role}</p>
              <a
                href={instagramUrl(m.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                className="meta mt-3 inline-flex items-center gap-1 hover:text-ink"
              >
                @{m.instagram} <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
