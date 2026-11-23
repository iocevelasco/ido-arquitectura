import { useState } from 'react'
import { PROJECTS, type Project } from '../../constants/data'
import { asset } from '../../constants/base'
import SectionHeading from '../ui/SectionHeading'
import { cn } from '../../lib/cn'

export default function Projects() {
  return (
    <section id="proyectos" className="section">
      <div className="section-container">
        <SectionHeading strong={PROJECTS.title} />
        <div className="mt-12 space-y-20">
          {PROJECTS.items.map((project, i) => (
            <ProjectCase key={project.id} project={project} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCase({ project, reverse }: { project: Project; reverse: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const cover = project.images[0]
  const bodyId = `proyecto-${project.id}-texto`

  return (
    <article className="grid gap-8 lg:grid-cols-12">
      {/* Ficha técnica en mono, como en la revista */}
      <dl
        className={cn(
          'meta grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-1',
          reverse && 'lg:order-last'
        )}
      >
        {[
          ['Cliente', project.client],
          ['Obra', project.work],
          ['Construcción', project.period],
          ['Ubicación', project.location],
          ['Arquitectos', project.architects],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd className="mt-1 normal-case tracking-normal text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="lg:col-span-9">
        <h3 className="font-display text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
          {project.title}
        </h3>

        <div className="relative mt-6">
          {cover ? (
            <img
              src={asset(cover.src)}
              alt={cover.alt}
              loading="lazy"
              className="chamfer aspect-[16/9] w-full object-cover"
            />
          ) : (
            // PENDIENTE: fotos originales en alta del cliente (public/images/proyectos/<id>/)
            <div className="chamfer blueprint-grid flex aspect-[16/9] w-full items-center justify-center bg-paper-2">
              <span className="meta">Foto pendiente · {project.client}</span>
            </div>
          )}
          <div className="chamfer absolute -bottom-5 right-4 bg-dot px-4 py-3 text-ink">
            <span className="font-display text-2xl font-extrabold">{project.year}</span>
            <span className="meta block text-ink">{project.location}</span>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-lg">{project.summary}</p>
        <div id={bodyId} hidden={!expanded} className="mt-4 max-w-2xl space-y-4 text-ink/80">
          {project.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={bodyId}
          onClick={() => setExpanded((e) => !e)}
          className="mt-4 font-display text-sm uppercase tracking-wide underline-offset-4 hover:underline"
        >
          {expanded ? 'Leer menos ↑' : 'Leer más ↓'}
        </button>
      </div>
    </article>
  )
}
