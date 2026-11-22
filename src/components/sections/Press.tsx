import { PRESS } from '../../constants/data'

export default function Press() {
  return (
    <section aria-label="Prensa" className="bg-ink text-paper">
      <div className="section-container flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.04em] text-paper/60">
            {PRESS.label}
          </p>
          <p className="mt-2 font-display text-3xl uppercase">
            <span className="font-extrabold">{PRESS.magazine}</span>{' '}
            <span className="font-light">{PRESS.issue}</span>
          </p>
        </div>
        <span className="flex h-24 w-24 shrink-0 rotate-[-8deg] items-center justify-center rounded-full bg-sun font-display text-xs font-extrabold uppercase tracking-widest text-ink">
          Publicado
        </span>
      </div>
    </section>
  )
}
