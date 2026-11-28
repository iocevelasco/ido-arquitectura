import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { type ProjectImage } from '../../constants/data'
import { asset } from '../../constants/base'
import { cn } from '../../lib/cn'

const SLIDE_MS = 5000
const SWIPE_PX = 40
/** Más fotos que esto y los puntos se cambian por una barra de avance. */
const MAX_DOTS = 8

interface ProjectCarouselProps {
  images: ProjectImage[]
  /** Nombre del proyecto, para las etiquetas accesibles. */
  label: string
}

const controlClass =
  'flex h-11 w-11 items-center justify-center bg-ink text-paper transition-colors duration-fast hover:bg-ink/80'

/**
 * Carrusel rotativo de fotos de un proyecto (docs/estructura-visual.md §5 S5).
 * - Avanza solo cada 5 s; se pausa con el cursor o el foco encima, fuera de pantalla, con la pestaña
 *   oculta, con el botón de pausa y con `prefers-reduced-motion`.
 * - Carga diferida: sólo monta la foto actual y sus vecinas; el resto se pide al acercarse.
 * - Flechas, puntos, teclado (← →) y deslizar en celular.
 */
export default function ProjectCarousel({ images, label }: ProjectCarouselProps) {
  const count = images.length
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [engaged, setEngaged] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  // Fotos ya montadas: una vez cargada, una foto queda en el DOM para que el fundido no parpadee.
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]))
  const rootRef = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  // Sólo rota mientras el carrusel está en pantalla.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.3,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Pestaña oculta: no avanza (evita volver y encontrar otra foto sin haberla visto pasar).
  const [pageHidden, setPageHidden] = useState(false)
  useEffect(() => {
    const onChange = () => setPageHidden(document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  const goTo = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])

  // Monta la foto actual y precarga la siguiente y la anterior.
  useEffect(() => {
    if (count === 0) return
    setMounted((prev) => {
      const wanted = [index, (index + 1) % count, (index - 1 + count) % count]
      if (wanted.every((i) => prev.has(i))) return prev
      const next = new Set(prev)
      wanted.forEach((i) => next.add(i))
      return next
    })
  }, [index, count])

  const playing = count > 1 && !userPaused && !engaged && visible && !pageHidden && !reducedMotion

  useEffect(() => {
    if (!playing) return
    const timer = setTimeout(() => goTo(index + 1), SLIDE_MS)
    return () => clearTimeout(timer)
  }, [playing, index, goTo])

  if (count === 0) return null

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') goTo(index + 1)
    else if (e.key === 'ArrowLeft') goTo(index - 1)
    else return
    e.preventDefault()
  }

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > SWIPE_PX) goTo(index + (dx < 0 ? 1 : -1))
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carrusel"
      aria-label={`Fotos de ${label}`}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setEngaged(false)
      }}
      onKeyDown={onKeyDown}
    >
      <div
        className="chamfer blueprint-grid relative aspect-[4/3] w-full overflow-hidden bg-paper-2"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {images.map((img, i) => {
          const portrait = img.height > img.width
          const current = i === index
          return (
            <figure
              key={img.base}
              role="group"
              aria-roledescription="foto"
              aria-label={`${i + 1} de ${count}`}
              aria-hidden={!current}
              className={cn(
                'absolute inset-0 m-0 transition-opacity duration-slow ease-in-out',
                current ? 'opacity-100' : 'opacity-0'
              )}
            >
              {mounted.has(i) && (
                <img
                  src={asset(`${img.base}.webp`)}
                  srcSet={`${asset(`${img.base}-800.webp`)} 800w, ${asset(`${img.base}.webp`)} 1600w`}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  width={img.width}
                  height={img.height}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  // Las fotos verticales se muestran enteras sobre la grilla; las horizontales llenan el marco.
                  className={cn('h-full w-full', portrait ? 'object-contain' : 'object-cover')}
                />
              )}
            </figure>
          )
        })}
      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? 'Reanudar el carrusel' : 'Pausar el carrusel'}
            className={controlClass}
          >
            {userPaused ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Foto anterior"
            className={controlClass}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Foto siguiente"
            className={controlClass}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>

          {count > MAX_DOTS ? (
            // Con muchas fotos los puntos no caben a 375 px: barra de avance en su lugar.
            <div className="ml-2 h-0.5 min-w-0 flex-1 bg-ink/15" aria-hidden="true">
              <div
                className="h-full bg-dot transition-[width] duration-base"
                style={{ width: `${((index + 1) / count) * 100}%` }}
              />
            </div>
          ) : (
            <div className="ml-2 flex items-center">
              {images.map((img, i) => (
                <button
                  key={img.base}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                  className="flex h-11 w-6 items-center justify-center"
                >
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full transition-colors duration-base',
                      i === index ? 'bg-dot' : 'bg-ink/25 hover:bg-ink/50'
                    )}
                  />
                </button>
              ))}
            </div>
          )}

          <span className="meta ml-auto shrink-0 pl-3" aria-live={playing ? 'off' : 'polite'}>
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  )
}
