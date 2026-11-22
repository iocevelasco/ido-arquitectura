import { cn } from '../../lib/cn'

/** El punto naranja del logo: indicador de estado, viñeta y nodo (concepto «El punto de origen»). */
export default function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block h-2 w-2 rounded-full bg-dot', className)}
    />
  )
}
