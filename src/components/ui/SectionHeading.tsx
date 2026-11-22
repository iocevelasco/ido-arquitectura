import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  /** Parte en peso 800. */
  strong: ReactNode
  /** Parte en peso 300 (opcional). */
  light?: ReactNode
  /** Si el bold va después del light (p. ej. "Bienven-" + "IDO"). */
  lightFirst?: boolean
  subtitle?: string
  as?: 'h1' | 'h2'
  tone?: 'ink' | 'paper'
  className?: string
}

/** Titular único del sitio: barra vertical naranja + pareja bold/light en mayúsculas (§3.2, §6). */
export default function SectionHeading({
  strong,
  light,
  lightFirst = false,
  subtitle,
  as: Tag = 'h2',
  tone = 'ink',
  className,
}: SectionHeadingProps) {
  const big = Tag === 'h1'
  const strongEl = <span className="font-extrabold">{strong}</span>
  const lightEl = light ? <span className="font-light">{light}</span> : null
  return (
    <div className={cn('max-w-3xl', className)}>
      <Tag
        className={cn(
          'flex gap-4 font-display uppercase leading-[0.95] tracking-tight [font-stretch:85%]',
          big ? 'text-5xl sm:text-7xl lg:text-8xl' : 'text-3xl sm:text-4xl lg:text-5xl',
          tone === 'paper' ? 'text-paper' : 'text-ink'
        )}
      >
        <span aria-hidden="true" className="mt-[0.1em] w-1 shrink-0 self-stretch bg-dot" />
        <span>
          {lightFirst ? (
            <>
              {lightEl}
              {strongEl}
            </>
          ) : (
            <>
              {strongEl}
              {lightEl && <span className="block">{lightEl}</span>}
            </>
          )}
        </span>
      </Tag>
      {subtitle && (
        <p className={cn('mt-5 pl-5 text-lg', tone === 'paper' ? 'text-paper/70' : 'text-ink/70')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
