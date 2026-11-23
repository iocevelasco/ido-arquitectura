# IDO Arquitectura

Landing de IDO Arquitectura (estudio de arquitectura e interiorismo, Caracas). Tagline: "Ideas con
denominación de origen". **Solo frontend**: no hay API, base de datos ni login.
Estructura tomada de `iocevelasco/topoconcret`.

## Stack

- Vite 5 + React 18 + TypeScript (strict, `noUnusedLocals`) + Tailwind 3 + Lucide.
- Contacto: formulario que **envía por WhatsApp** (`src/components/ui/ContactForm.tsx`): arma el texto con
  `contactMessage()` y abre `wa.me` (`whatsappUrl()`). No hay backend. Sin `COMPANY.whatsapp` el formulario
  muestra un aviso y ofrece Instagram. Los chips de Tipologías marcan su opción en el formulario (`src/lib/typology.ts`).
- Deploy: GitHub Pages desde `main` (`.github/workflows/deploy.yml`) → https://iocevelasco.github.io/ido-arquitectura/.
  Base `/ido-arquitectura/` por defecto; `VITE_BASE=/` para dominio propio (Coolify).
  `npm run build` = `tsc && vite build`: **un error de tipos rompe el build, el CI y el deploy**.
  `ci.yml` compila cada PR.
- Gestor de paquetes: npm.

## Comandos

```bash
npm run dev       # http://localhost:7273/ (puerto fijo; base '/' por .env.development)
npm run build     # tsc + vite build
npx tsc --noEmit  # sólo tipos
```

## Documentos de diseño (leer antes de tocar una sección)

- `docs/guion-landing.md` — contenido extraído del Canva del cliente y pendientes.
- `docs/estructura-visual.md` — dirección visual, wireframes por sección, estados e interacción.
  Cada sección del código cita su apartado (`§5 S3`, etc.).

## Dónde vive cada cosa

- `src/constants/data.ts` — **todo el contenido** (`COMPANY`, `NAV`, `HERO`, `TEAM`, `PROCESS`,
  `TYPOLOGIES`, `PROJECTS`, `PRESS`, `CONTACT`). Los textos se editan acá, no en el JSX.
- `src/components/sections/` — una sección por archivo, en el orden de `App.tsx`. El `id` de cada
  sección es el ancla de `NAV`.
- `src/components/layout/` — Navbar (barra meta + menú + índice de celular) y Footer.
- `src/components/ui/` — piezas reutilizables: `LinkButton`, `SectionHeading`, `Dot`, `ContactForm`.
- `src/hooks/` — `useActiveSection` (el punto naranja del menú).
- `public/images/` — assets, siempre con `asset('images/...')` de `src/constants/base.ts`.
- `tailwind.config.js` — tokens: `paper`, `paper-2`, `ink`, `dot`, `sun`, `alert` (errores); fuentes `display`, `sans`, `mono`;
  duraciones `fast/base/slow/scene`.
- `src/index.css` — clases de sistema: `.section`, `.section-container`, `.meta`, `.chamfer`, `.blueprint-grid`.

## Reglas

- Tokens del tema, nunca `bg-[#hex]`. Marca: azul marino `ink`, naranja `dot`, amarillo `sun`, hueso `paper`.
- **El naranja `dot` nunca va como color de texto sobre fondo claro** (contraste 1,9:1). Sólo formas,
  o de fondo con texto `ink` encima.
- Bordes duros: `rounded-*` vale 0. `rounded-full` sólo para círculos reales (retratos, puntos, nodos, sello).
  Círculo = personas; `.chamfer` = espacios y datos.
- Titulares siempre con `SectionHeading` (barra naranja + pareja bold/light).
- Fotos del equipo y del proceso en B/N; proyectos terminados a color.
- Todo `<img>` lleva `alt` (vacío sólo si es decorativa) y `width`/`height`. Todo asset referenciado existe en `public/`.
- Nunca hardcodear `/ido-arquitectura`: usar `asset()`.
- Animaciones con las duraciones del tema; respetar `prefers-reduced-motion` (ya hay un reset global en `index.css`).
- Mobile primero; verificar a 375 px sin scroll horizontal.
- Idioma único: español (tuteo).
- Imágenes en WebP y optimizadas antes de commitear.

## Pendientes del cliente

Ver `docs/guion-landing.md` §5: WhatsApp y correo (`COMPANY.whatsapp` / `COMPANY.email` vacíos),
fotos en alta de Diasa y Vecxel (`PROJECTS.items[].images`), logo en vector, axonometría en 4 capas
(hero y proceso), lámina 13 del Canva.
