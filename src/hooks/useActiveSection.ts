import { useEffect, useState } from 'react'

/** Devuelve el id de la sección que cruza el 40 % superior de la pantalla (para el punto del menú). */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.4
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [ids])

  return active
}
