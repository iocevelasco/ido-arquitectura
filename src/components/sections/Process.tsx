import { useState } from 'react'
import { PROCESS } from '../../constants/data'
import SectionHeading from '../ui/SectionHeading'
import Dot from '../ui/Dot'
import { cn } from '../../lib/cn'

/**
 * Proceso en 4 pasos = 4 capas de una axonometría explotada (docs/estructura-visual.md §5 S3).
 * Base actual: acordeón de un solo paso abierto + diagrama de capas que resalta el activo.
 * PENDIENTE: scroll fijo con separación de capas sincronizada y el antes/durante/después del paso 04.
 */
export default function Process() {
  const [active, setActive] = useState(0)
  const steps = PROCESS.steps

  return (
    <section id="proceso" className="section bg-paper-2">
      <div className="section-container">
        <SectionHeading strong={PROCESS.title} />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <ol className="border-t border-ink/15">
            {steps.map((step, i) => {
              const open = i === active
              return (
                <li key={step.number} className="border-b border-ink/15">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`paso-${step.number}`}
                      onClick={() => setActive(i)}
                      className="flex w-full items-center gap-4 py-5 text-left"
                    >
                      <span
                        className={cn(
                          'font-display text-4xl font-extrabold',
                          open ? 'text-ink' : 'text-ink/30'
                        )}
                      >
                        {step.number}
                      </span>
                      <span aria-hidden="true" className="h-px w-8 bg-ink/30" />
                      <span className="flex-1 font-display text-lg uppercase tracking-wide">
                        {step.title}
                      </span>
                      <Dot
                        className={cn(
                          'transition-opacity duration-base',
                          open ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </button>
                  </h3>
                  <div id={`paso-${step.number}`} hidden={!open} className="pb-6 pl-[4.5rem]">
                    <ul className="space-y-1 font-display text-2xl uppercase">
                      {step.points.map((p) => (
                        <li key={p.strong} className="flex items-center gap-3">
                          <Dot />
                          <span>
                            <span className="font-extrabold">{p.strong}</span>
                            {p.light && <span className="font-light text-ink/60"> {p.light}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {step.stages?.map((stage) => (
                      <div key={stage.title} className="chamfer mt-5 bg-paper p-4">
                        <p className="meta">{stage.title}</p>
                        <p className="mt-1 text-sm">{stage.items.join(' · ')}</p>
                      </div>
                    ))}
                  </div>
                </li>
              )
            })}
          </ol>

          <LayerDiagram labels={steps.map((s) => s.layer)} active={active} />
        </div>
      </div>
    </section>
  )
}

/** Diagrama provisorio de capas apiladas; se reemplaza por los SVG de la axonometría real. */
function LayerDiagram({ labels, active }: { labels: string[]; active: number }) {
  // De arriba (capa 4) hacia abajo (capa 1)
  const order = labels.map((label, i) => ({ label, i })).reverse()
  return (
    <div className="hidden lg:block">
      <svg
        viewBox="0 0 400 420"
        className="sticky top-32 w-full"
        role="img"
        aria-label="Capas del proceso"
      >
        {order.map(({ label, i }, row) => {
          const y = 40 + row * 95
          const on = i === active
          return (
            <g key={label} className="transition-opacity duration-slow" opacity={on ? 1 : 0.3}>
              {row > 0 && (
                <line
                  x1="150"
                  y1={y - 55}
                  x2="150"
                  y2={y - 20}
                  className="stroke-ink"
                  strokeDasharray="4 4"
                />
              )}
              <polygon
                points={`150,${y - 20} 270,${y + 20} 150,${y + 60} 30,${y + 20}`}
                className={cn('fill-paper stroke-ink', on ? 'stroke-[1.5]' : 'stroke-1')}
              />
              {on && <circle cx="230" cy={y + 20} r="6" className="fill-dot" />}
              <text x="290" y={y + 24} className="fill-ink font-mono text-[11px] uppercase">
                {String(i + 1).padStart(2, '0')} {label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
