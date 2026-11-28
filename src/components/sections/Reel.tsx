import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { REEL } from '../../constants/data'
import { asset } from '../../constants/base'
import { LinkButton } from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import Dot from '../ui/Dot'

/**
 * Reel "del plano a la obra". Celular: texto arriba y el reel vertical completo abajo.
 * Escritorio: texto a la izquierda, video a la derecha.
 * - El video no se descarga hasta acercarse a la pantalla (`preload="none"` + IntersectionObserver).
 * - Se reproduce sólo mientras se ve; con `prefers-reduced-motion` queda en pausa con el póster.
 * - Botón de pausa (WCAG 2.2.2: animación de más de 5 s).
 */
export default function Reel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.25,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Con movimiento reducido no arranca solo, pero el botón permite verlo.
  const paused = reducedMotion ? !userPaused : userPaused
  const playing = visible && !paused

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (playing) el.play().catch(() => {})
    else el.pause()
  }, [playing])

  const { video } = REEL

  return (
    <section
      aria-label={`${REEL.titleStrong} ${REEL.titleLight}`}
      className="section bg-ink text-paper"
    >
      <div className="section-container grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <SectionHeading strong={REEL.titleStrong} light={REEL.titleLight} tone="paper" />
          <p className="mt-6 max-w-md pl-5 text-lg text-paper/80">{REEL.intro}</p>
          <ol className="meta mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 pl-5 text-paper/70">
            {REEL.stages.map((stage, i) => (
              <li key={stage} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="h-px w-6 bg-paper/30" />}
                <Dot />
                {stage}
              </li>
            ))}
          </ol>
          <LinkButton href="#contacto" variant="accent" className="ml-5 mt-10">
            {REEL.cta}
          </LinkButton>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-[min(24rem,calc(75svh*0.5625))]">
          <video
            ref={videoRef}
            src={asset(video.src)}
            poster={asset(video.poster)}
            width={video.width}
            height={video.height}
            muted
            loop
            playsInline
            preload="none"
            aria-label={video.label}
            className="chamfer block aspect-[9/16] h-auto w-full bg-ink object-cover"
          />
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={playing ? 'Pausar el video' : 'Reproducir el video'}
            className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center bg-paper text-ink transition-colors duration-fast hover:bg-paper/85"
          >
            {playing ? (
              <Pause size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
