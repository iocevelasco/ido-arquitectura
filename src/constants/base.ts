// Prefijo para assets de public/. Sale de `base` en vite.config.ts:
// '' si el sitio vive en la raíz, '/ido-arquitectura' en GitHub Pages.
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/** Ruta completa a un asset de public/: asset('images/equipo/x.webp'). */
export const asset = (path: string) => `${BASE}/${path}`
