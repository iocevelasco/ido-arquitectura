// Contenido de la landing. Los textos se editan acá, no en el JSX.
// Fuente: docs/guion-landing.md (transcripción del Canva) y docs/estructura-visual.md.

export const COMPANY = {
  name: 'IDO Arquitectura',
  tagline: 'Ideas con denominación de origen',
  city: 'Caracas, Venezuela',
  coords: '10°30′N 66°55′O',
  instagram: 'ido.arquitectura',
  // PENDIENTE del cliente (guion §5): falta el correo.
  whatsapp: '584129176403' as string, // formato internacional sin "+"
  email: '' as string,
  year: new Date().getFullYear(),
}

export const instagramUrl = (user: string) => `https://www.instagram.com/${user}/`

/** WhatsApp con mensaje prellenado; null mientras falte el número. */
export function whatsappUrl(message = 'Hola IDO, quiero contarles una idea.'): string | null {
  if (!COMPANY.whatsapp) return null
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`
}

// ── Navegación ──────────────────────────────────────────────────────────────
// Los `id` son los anclas de cada sección (orden = orden en App.tsx).
export const NAV = [
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
] as const

export type SectionId = (typeof NAV)[number]['id']

// ── Hero ────────────────────────────────────────────────────────────────────
export const HERO = {
  titleStrong: 'Empecemos',
  titleLight: 'una nueva idea',
  intro: 'Arquitectura e interiorismo en Caracas.',
  primaryCta: 'Cuéntanos tu proyecto',
  secondaryCta: 'Ver proyectos',
  accent: { value: '12', label: 'tipologías de proyecto' },
}

// ── Equipo ──────────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string
  name: string
  degree: string
  role: string
  instagram: string
  photo: string
}

export const TEAM = {
  title: { pre: '¡Hola! Bienven-', brand: 'IDO' },
  subtitle: 'Nosotros somos:',
  intro:
    'Somos tres arquitectos formados —y docentes— en la Facultad de Arquitectura y Urbanismo de la UCV.',
  members: [
    {
      id: 'adriana-russian',
      name: 'Adriana Russián',
      degree: 'Arquitecta UCV 2017',
      role: 'Profesora de Historia de la Arquitectura en la FAU UCV y facilitadora de programas educativos en la ONG Trazando Espacios.',
      instagram: 'adrrussian',
      photo: 'images/equipo/adriana-russian.webp',
    },
    {
      id: 'jose-mario-wong',
      name: 'José Mario Wong',
      degree: 'Arquitecto UCV 2020',
      role: 'Asistente en el taller de diseño arquitectónico de la UD 00 en la FAU UCV.',
      instagram: 'j.mariowong',
      photo: 'images/equipo/jose-mario-wong.webp',
    },
    {
      id: 'alejandro-lucero',
      name: 'Alejandro Lucero',
      degree: 'Arquitecto UCV 2021',
      role: 'Asistente en el taller de diseño arquitectónico de la UD 00 en la FAU UCV.',
      instagram: 'arq.alr',
      photo: 'images/equipo/alejandro-lucero.webp',
    },
  ] satisfies TeamMember[],
}

// ── Proceso (láminas 3 a 9) ─────────────────────────────────────────────────
export interface ProcessStage {
  title: string
  items: string[]
}

export interface ProcessStep {
  number: string
  title: string
  /** Capa de la axonometría explotada que le corresponde (S3). */
  layer: string
  points: { strong: string; light?: string }[]
  stages?: ProcessStage[]
}

export const PROCESS: { title: string; steps: ProcessStep[] } = {
  title: 'Cómo trabajamos',
  steps: [
    {
      number: '01',
      title: 'Así empezamos',
      layer: 'Terreno',
      points: [
        { strong: 'Solicitud', light: 'definida' },
        { strong: 'Ideas', light: 'base' },
        { strong: 'Alcance', light: 'establecido' },
      ],
      stages: [
        {
          title: 'Nos permite organizar',
          items: ['Plan de trabajo sólido', 'Recursos necesarios', 'Cronograma de entrega'],
        },
      ],
    },
    {
      number: '02',
      title: 'Manos a la obra',
      layer: 'Estructura',
      points: [{ strong: 'Medición en sitio' }, { strong: 'Modelado 3D' }, { strong: 'Diseño' }],
      stages: [
        {
          title: 'Vamos a probar ideas',
          items: ['Organización general', 'Pruebas digitales', 'Pruebas físicas'],
        },
        { title: 'Vamos por buen camino', items: ['Validamos', 'Decidimos', 'Planificamos'] },
      ],
    },
    {
      number: '03',
      title: 'Primero lo primero: la primera entrega',
      layer: 'Interiores',
      points: [{ strong: 'Diseño final' }, { strong: 'Tiempos' }, { strong: 'Presupuesto' }],
    },
    {
      number: '04',
      title: 'Luego, comienza lo bueno',
      layer: 'Terminado',
      points: [
        { strong: 'Aquí inicia todo' },
        { strong: 'Pasan muchas cosas' },
        { strong: 'Aquí termina todo' },
      ],
    },
  ],
}

// ── Reel: del plano a la obra (entre Proceso y Tipologías) ──────────────────
export const REEL = {
  titleStrong: 'Llevamos tus ideas',
  titleLight: 'a la realidad',
  intro:
    'Del primer trazo a la obra terminada. Dibujamos, modelamos y construimos cada capa contigo, para que veas tu proyecto antes de que exista.',
  // Las tres etapas que muestra el video, en orden.
  stages: ['Plano', 'Volumen', 'Obra'],
  cta: 'Cuéntanos tu proyecto',
  video: {
    src: 'video/reel-ideas.mp4',
    poster: 'video/reel-ideas-poster.webp',
    width: 720,
    height: 1280,
    label:
      'Animación: el plano de una casa se levanta en volúmenes y se separa en capas hasta mostrar la obra terminada',
  },
}

// ── Tipologías (lámina 10) ──────────────────────────────────────────────────
export const TYPOLOGIES = {
  title: '¿Qué cosas hemos hecho?',
  items: [
    'Viviendas',
    'Restaurantes',
    'Industrias',
    'Oficinas',
    'Retail',
    'Espacio público',
    'Templos',
    'Supermercados',
    'Co-Working',
    'Cafeterías',
    'Clínicas',
    'Paisajismo',
  ],
}

// ── Proyectos (lámina 12, revista Entre Rayas vol. 147) ─────────────────────
export interface Project {
  id: string
  title: string
  client: string
  work: string
  period: string
  year: string
  location: string
  architects: string
  summary: string
  body: string[]
  /** Fotos del carrusel, en el orden en que se muestran. Vacío = recuadro "Foto pendiente". */
  images: ProjectImage[]
}

/**
 * Foto de proyecto en public/images/proyectos/<id>/. Cada foto existe en dos tamaños WebP:
 * `<nombre>.webp` (lado mayor 1600 px) y `<nombre>-800.webp` (800 px), sin EXIF.
 */
export interface ProjectImage {
  /** Ruta sin extensión ni sufijo: 'images/proyectos/diasa/obra-01'. */
  base: string
  alt: string
  /** Tamaño de la versión de 1600 px (para reservar el espacio y elegir el encuadre). */
  width: number
  height: number
}

const ARCHITECTS = 'Adriana Russián · Alejandro Lucero · José Mario Wong'

export const PROJECTS = {
  title: 'Proyectos destacados',
  // Orden pedido por el cliente: Vecxel primero.
  items: [
    {
      id: 'vecxel',
      title: 'Duplicar la obra sin duplicar recursos',
      client: 'Comercializadora Vecxel',
      work: 'Stand Expo Gráfica 2023 + sede comercial',
      period: 'Octubre – diciembre 2023',
      year: '2023',
      location: 'Caracas',
      architects: ARCHITECTS,
      summary:
        'Remodelamos las oficinas de Vecxel y, con los materiales de esa misma obra, construimos su stand para la Expo Gráfica 2023.',
      body: [
        'En 2023 asumimos el reto de remodelar las oficinas de Vecxel, empresa caraqueña especializada en acrílicos. En pleno proceso surgió un nuevo encargo: diseñar su stand para la Expo Gráfica 2023, con una condición clave: reutilizar materiales de la obra para optimizar recursos.',
        'El resultado fue una estructura expuesta, ensamblada en obra y elevada en grúas hasta la terraza del CC Líder. Perfiles, paneles, piso vinílico, luminarias, tuberías y, por supuesto, acrílico, se transformaron en un espacio que albergó maquinaria de gran formato y zonas de atención al público. El stand reinterpretó el muestrario de Vecxel a escala 1:1, convirtiéndolo en marquesina de entrada, con barandas encastradas y dos pórticos que definían el recorrido.',
        'Tanto en el stand como en las oficinas, el acrílico no está #exhibIDO: se habita. Se convierte en muros, lámparas y superficies que delimitan áreas de trabajo, atención y espera.',
      ],
      images: [
        {
          base: 'images/proyectos/vecxel/obra-15',
          alt: 'Stand de Vecxel terminado: marquesina blanca con el logo, perfiles iluminados y la zona de máquinas al fondo',
          width: 1600,
          height: 1200,
        },
        {
          base: 'images/proyectos/vecxel/obra-13',
          alt: 'Frente del stand con el letrero «Bienvenidos», techo de acrílico espejado y máquinas de corte en exhibición',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-11',
          alt: 'Pórtico de entrada al stand con el muestrario de acrílicos de colores suspendido bajo la estructura',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-10',
          alt: 'Pórtico blanco iluminado con el logo de Vecxel y el arcoíris de láminas de acrílico colgando',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-09',
          alt: 'Láminas de acrílico de todos los colores colgadas en degradado sobre la estructura del stand',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-08',
          alt: 'Recepción del stand con el lema de Vecxel en un muro espejado y una cortadora láser en exhibición',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-07',
          alt: 'Esquina del stand: columna de perfiles iluminados y panel negro con la marca Vecxel en vertical',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-16',
          alt: 'Pantalla y cortadora láser bajo un techo de acrílico espejado que refleja el video',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-17',
          alt: 'Perfiles metálicos con luz interior y el muestrario de colores al fondo del recorrido',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-18',
          alt: 'Estructura expuesta del stand, perfiles con iluminación y láminas de acrílico translúcido',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-01',
          alt: 'Montaje en la feria: pórticos de perfiles metálicos con el muestrario de acrílicos ya colgado',
          width: 1600,
          height: 900,
        },
        {
          base: 'images/proyectos/vecxel/obra-02',
          alt: 'Primera cercha de perfiles galvanizados armada en el piso del taller',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-03',
          alt: 'Estructura del stand armada en el taller, con láminas de acrílico negro en primer plano',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-04',
          alt: 'Pórtico de perfiles galvanizados en pie dentro del taller',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-05',
          alt: 'Estructura completa del stand ensamblada a prueba en el taller',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-06',
          alt: 'Recorrido interior de la estructura del stand durante el ensamblaje de prueba',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-19',
          alt: 'Oficinas de Vecxel: muros blancos facetados con repisas y plantas, bajo luminarias lineales',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-20',
          alt: 'Oficina cerrada con paneles de acrílico amarillo, del piso al techo',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/vecxel/obra-21',
          alt: 'Oficina con muros de acrílico verde translúcido y puerta blanca',
          width: 1200,
          height: 1600,
        },
      ],
    },
    {
      id: 'diasa',
      title: 'Oficinas que respiran identidad de marca',
      client: 'Diasa',
      work: 'Sede comercial La California Norte',
      period: 'Agosto – diciembre 2024',
      year: '2024',
      location: 'Caracas',
      architects: ARCHITECTS,
      summary:
        'Un interiorismo que articula coworking, oficinas, terrazas, showroom y salas de reuniones bajo una misma narrativa espacial, con el acrílico como protagonista.',
      body: [
        'La remodelación de las oficinas de Diasa en Caracas fue una oportunidad para consolidar una imagen industrial fresca, vibrante e innovadora. Luego de intervenir sus sedes en Guatire, diseñamos un interiorismo que articula coworking, oficinas privadas, terrazas de usos múltiples, cocina, comedor, showroom y salas de reuniones, todo bajo una misma narrativa espacial.',
        'El acrílico se convirtió en protagonista: murales, señalética, pizarras y detalles que exploran sus posibilidades mediante corte láser. La obra "Las Velas", suspendida con guayas y tensores, da la bienvenida en la sala de espera del primer piso. El semicuero, la iluminación neutra y cálida, y los aportes gráficos en vinil completan una atmósfera elegante y funcional.',
        'Las terrazas, rebautizadas como "Oasis", integran vegetación como parte esencial del espacio, al igual que en interiores. El resultado: oficinas que no sólo representan a la marca, sino que la habitan.',
      ],
      images: [
        {
          base: 'images/proyectos/diasa/obra-01',
          alt: 'Armado de acero de una columna nueva dentro de la excavación de la fundación',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/diasa/obra-02',
          alt: 'Obreros con casco colocan una viga de acero en una abertura de la losa',
          width: 900,
          height: 1600,
        },
        {
          base: 'images/proyectos/diasa/obra-03',
          alt: 'Electricistas instalan el tablero eléctrico en un muro de bloques de arcilla',
          width: 1200,
          height: 1600,
        },
        {
          base: 'images/proyectos/diasa/obra-04',
          alt: 'Equipo de IDO Arquitectura junto al personal de la obra, entre muros en demolición y andamios',
          width: 1600,
          height: 1200,
        },
      ],
    },
  ] satisfies Project[],
}

// ── Prensa ──────────────────────────────────────────────────────────────────
export const PRESS = {
  label: 'Publicados en',
  magazine: 'Entre Rayas',
  issue: 'Vol. 147 · pp. 82–83 · 2025',
}

// ── Contacto (lámina 11) ────────────────────────────────────────────────────
export const CONTACT = {
  titleStrong: '¿Tienes dudas?',
  titleLight: 'Conversemos.',
  intro: 'Cuéntanos qué quieres construir, remodelar o imaginar. Te respondemos personalmente.',
  form: {
    nameLabel: 'Tu nombre',
    typesLabel: 'Tipo de proyecto',
    typesHint: 'Opcional. Puedes marcar varios.',
    messageLabel: 'Cuéntanos tu idea',
    messagePlaceholder: 'Qué quieres hacer, dónde y para cuándo, más o menos.',
    submit: 'Enviar por WhatsApp',
    submitHint: 'Se abre WhatsApp con tu mensaje listo; sólo tienes que darle a enviar.',
    errors: {
      name: 'Dinos cómo te llamas para saber a quién responder.',
      message: 'Cuéntanos al menos un poco de tu idea (10 caracteres o más).',
    },
    success: {
      titleStrong: '¡Listo!',
      titleLight: 'Tu idea ya tiene denominación de origen.',
      body: 'Abrimos WhatsApp con tu mensaje. Si no se abrió, usa el botón de abajo.',
      reopen: 'Abrir WhatsApp de nuevo',
      reset: 'Escribir otro mensaje',
    },
    // Mientras falte COMPANY.whatsapp el formulario no puede enviar: se avisa y se ofrece Instagram.
    pendingNumber:
      'Estamos configurando nuestro WhatsApp. Mientras tanto, escríbenos por Instagram.',
  },
}

/** Texto que llega al WhatsApp del estudio. */
export function contactMessage({
  name,
  types,
  message,
}: {
  name: string
  types: string[]
  message: string
}): string {
  const lines = [`Hola IDO, soy ${name.trim()}.`]
  if (types.length) lines.push(`Proyecto: ${types.join(', ')}.`)
  lines.push('', message.trim())
  return lines.join('\n')
}
