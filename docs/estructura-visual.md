# IDO Arquitectura — Estructura visual e interacción

> Segundo documento de la propuesta. Parte del contenido de `guion-landing.md` y de 5 referencias visuales.
> Define la dirección visual, el sistema de layout, cada sección en wireframe y su comportamiento.

---

## 1. Qué tomamos de cada referencia

| # | Referencia | Qué tomamos | Qué dejamos |
|---|---|---|---|
| R1 | Pitch deck gris/naranja (8 láminas) | Grilla editorial suiza. Barra de meta-datos arriba (empresa · documento · fecha). Títulos en mayúsculas con **barra vertical de acento** antes del texto. **Tarjetas con una esquina recortada** (chaflán). Bloque de acento con número grande + flecha diagonal ↗. Índice numerado 01–04 con líneas finas. Fotos en blanco y negro; el color solo en los bloques. | El naranja saturado: se reemplaza por el naranja de la marca IDO. |
| R2 | *Exploded Axonometric* (prompt pack) | Contraste tipográfico **bold + light** en el titular. Lista numerada 01–04 con una regla corta al lado. **Líneas punteadas verticales** que conectan capas. CTA rectangular sólido. Mucho blanco. | El negro puro: usamos el azul marino de la marca. |
| R3 | Axonometría explotada sobre fondo de planos | La idea de **capas que se separan** para explicar un proceso. Textura de planos de fondo, muy tenue. | Render fotorrealista recargado: preferimos línea + sombra suave. |
| R4 | Valero, *One team handling your project* | **Grilla visible con nodos (puntos) en las intersecciones**. Piezas de construcción flotando que se ensamblan. | Fondo de cielo azul. |
| R5 | Monolit Labs, *Design the systems with intention* | Titular gigante con **palabras alternadas en dos colores**. Matriz de puntos como ornamento. Dibujo lineal con acentos de color. Tipografía mono para datos. Fondo hueso. | El azul eléctrico: el acento es el naranja IDO. |

**Síntesis:** editorial y técnico como un plano. Mucho aire y grilla visible. La marca aparece en *el punto* naranja y el azul marino como tinta.

---

## 2. Concepto rector: «El punto de origen»

El logo de IDO tiene **dos puntos naranjas**. Los convertimos en el sistema gráfico e interactivo de toda la página:

- **Nodos de la grilla** (R4): cada intersección de la grilla de fondo es un punto. Los nodos de las zonas activas se encienden en naranja.
- **Indicador de estado**: la sección activa del menú, el paso activo del proceso y el campo enfocado del formulario se marcan con un punto naranja, no con subrayados ni fondos.
- **Viñetas**: las listas usan el punto en lugar de bullets estándar.
- **Cursor de acento** (solo en escritorio y opcional): un punto naranja de 8 px acompaña al cursor sobre elementos clicables.

Así la página dice "Ideas con denominación de origen" sin explicarlo: todo nace de un punto.

---

## 3. Sistema visual

### 3.1 Color (regla 60 / 30 / 10)

| Token | Hex | Proporción | Uso |
|---|---|---|---|
| `--paper` | `#F4F4F1` | 60 % | Fondo general (hueso, como R5) |
| `--paper-2` | `#EBECEE` | | Fondo de secciones alternas (gris perla de la marca) |
| `--ink` | `#032540` | 30 % | Texto, líneas de la grilla, bloques oscuros, CTA principal |
| `--ink-60` | `#032540` al 60 % | | Texto secundario y meta-datos |
| `--line` | `#032540` al 12 % | | Grilla de fondo, separadores finos |
| `--dot` | `#FAAD43` | 10 % | Nodos, flechas ↗, estados activos, bloque de acento |
| `--sun` | `#FBDF58` | puntual | Highlights en titulares, sello "Publicado" |

**Regla de accesibilidad:** el naranja `#FAAD43` sobre fondo claro **no** sirve para texto (contraste aproximado de 1,9:1). Solo se usa para formas, o como fondo con texto `--ink` encima (contraste aproximado de 8:1, cumple AA).

**Regla fotográfica:** el proceso y el equipo se muestran **en blanco y negro** (como R1). Los proyectos terminados van **a todo color**. Mensaje implícito: *el color llega cuando la obra está lista.*

### 3.2 Tipografía

| Rol | Fuente propuesta (Google Fonts) | Estilo |
|---|---|---|
| Display | **Archivo** (variable, con ancho condensado) | Pareja bold + light en mayúsculas: `EMPECEMOS` (800) / `UNA NUEVA IDEA` (300). Hereda la condensada del Canva y suma el contraste de R2. |
| Texto | **Inter** o **Manrope** | 16–18 px, interlineado 1.6 |
| Datos / meta | **JetBrains Mono** | 12–13 px, mayúsculas, tracking +4 %. Para fichas técnicas, coordenadas, fechas y la barra superior |
| Etiquetas | Archivo Condensed 500 | Tracking +12 %, como las etiquetas de la lámina 10 |

Escala (fluida, con `clamp`): 12 · 14 · 16 · 20 · 28 · 40 · 64 · 96–128 px (este último solo para el titular del hero).

### 3.3 Formas

- **Círculo**: solo para **personas**. Es la continuidad con el Canva y con el logo.
- **Chaflán** (esquina superior derecha recortada 24 px, como en R1): para **espacios y datos**, es decir, imágenes de proyecto, bloques de acento y tarjetas. Se hace con `clip-path: polygon(...)`.
- **Regla corta + número** (`01 ——`): para listas y pasos (R2).
- **Barra vertical naranja** de 4 px antes de cada H2 (R1).
- **Flecha diagonal ↗**: cualquier elemento que lleve a otro lugar.

### 3.4 Grilla y layout

- 12 columnas, ancho máximo 1280 px, gutter de 24 px y margen lateral de 16 px en móvil, 48 px en escritorio.
- **Grilla visible** de fondo con `--line`: líneas verticales en las columnas 1, 4, 7, 10 y 13, más una línea horizontal por sección, con nodos de 6 px en los cruces (R4).
- **Barra meta** fija arriba del todo, en mono 12 px: `IDO ARQUITECTURA · CARACAS, VE · 10°30′N 66°55′O · PROPUESTA 2026`. Es un guiño al encabezado de R1 y a los rótulos de planos.

---

## 4. Arco narrativo de la página

La landing es una *concept story*. El héroe es el cliente con una idea, e IDO es la herramienta para hacerla realidad.

| Momento | Sección | Emoción buscada |
|---|---|---|
| Exposición | Hero | "Esto es un estudio serio, técnico y cercano" |
| Incidente | Hero → Nosotros | "Tengo una idea y estas personas pueden ayudarme" |
| Acción ascendente | Proceso (capas que se ensamblan) | "Entiendo cómo trabajan, cada paso tiene sentido" |
| Crisis | Paso 3: tiempos y presupuesto | La duda real del cliente, presentada con transparencia |
| **Clímax (pico)** | Paso 4: antes / durante / después, y luego los proyectos a color | "Esto fue lo que hicieron, y quedó increíble" |
| Final | Contacto con mensaje de éxito | "Ya di el primer paso" |

El esfuerzo de diseño se concentra en **el proceso en capas (S4)** y en **el estado de éxito del formulario (S8)**, por la regla del pico y el final.

---

## 5. Secciones: wireframe y comportamiento

Los wireframes son para escritorio. El comportamiento en móvil va indicado en cada sección.

### S0 · Barra meta + navegación

```
┌──────────────────────────────────────────────────────────────────────┐
│ IDO ARQUITECTURA · CARACAS, VE · 10°30′N 66°55′O       PROPUESTA 2026 │ ← mono 12px
├──────────────────────────────────────────────────────────────────────┤
│ (ido)   Nosotros  Proceso  Servicios  Proyectos       [ Empecemos ↗ ]│
│              •                                                       │ ← punto = sección activa
└──────────────────────────────────────────────────────────────────────┘
```

- **Disparador:** scroll.
  - **Regla:** se esconde al bajar y reaparece al subir.
  - **Feedback:** pasados 80 px, el fondo pasa de transparente a `--paper` con desenfoque y aparece una línea inferior.
- **Sección activa:** un punto naranja bajo el enlace, que se desliza a la siguiente sección (IntersectionObserver, 250 ms).
- **Móvil:** logo + CTA + botón de menú. El menú es una hoja a pantalla completa con el índice numerado 01–05 (como R1, "content index"). Se cierra con Esc, tocando un enlace o deslizando hacia abajo.
- **Estados del CTA:**
  - por defecto: fondo `--ink` y texto en `--paper`.
  - hover: la flecha ↗ se desplaza 2 px en diagonal.
  - foco: anillo de 2 px en `--dot`.
  - presionado: escala al 98 %.

### S1 · Hero: «Empecemos una nueva idea»

```
┌───┬──────────────────────────────┬───────────────────────────────────┐
│ • │ ▌EMPECEMOS                   │                                   │
│   │   UNA NUEVA IDEA             │      [ axonometría que se         │
│   │                              │        ensambla: piezas que       │
│   │ Ideas con denominación de    │        llegan y encajan ]         │
│   │ origen. Arquitectura e       │                                   │
│ • │ interiorismo en Caracas.     │   ┌───────────────┐               │
│   │                              │   │ 12 TIPOLOGÍAS ◢│ ← bloque      │
│   │ [ Cuéntanos tu proyecto ↗ ]  │   │ de proyectos  ↗│   naranja con │
│   │   Ver proyectos →            │   └───────────────┘   chaflán     │
│ • ┼──────────────────────────────┼───────────────────────────────────┤
│   │ 01 Nosotros  02 Proceso  03 Servicios  04 Proyectos  05 Contacto │ ← índice (R1)
└───┴──────────────────────────────┴───────────────────────────────────┘
```

- **Fondo:** grilla con nodos y una textura de plano muy tenue (R3), al 4 % de opacidad.
- **Titular:** `EMPECEMOS` en 800 y `UNA NUEVA IDEA` en 300 (R2). La palabra "IDEA" puede llevar debajo un highlight `--sun` que se dibuja de izquierda a derecha al cargar (400 ms, con 300 ms de retraso).
- **Visual:** axonometría lineal de un espacio IDO (por ejemplo, la oficina Diasa), con piezas que **llegan y encajan** al cargar, inspirado en R4. Escalonado: 8 piezas × 80 ms, 900 ms en total, easing `out-expo`. Al terminar, los dos puntos naranjas del logo "aterrizan" sobre la pieza final.
- **Bloque de acento:** naranja con chaflán y texto `--ink`, con el dato "12 tipologías" (o "Publicados en *Entre Rayas* 147"). Lleva a S5.
- **Índice inferior:** los mismos enlaces que la navegación, pero numerados. Para quien escanea, es un resumen de la página.
- **Móvil:** el titular arriba y la axonometría debajo, a ancho completo. El índice se convierte en una fila horizontal que se desliza.
- **`prefers-reduced-motion`:** la axonometría aparece ensamblada, con un solo fundido de 200 ms.

### S2 · Nosotros: «¡Hola! Bienven-IDO»

```
┌──────────────────────────────────────────────────────────────────────┐
│ ▌¡HOLA! BIENVEN-IDO                         Somos tres arquitectos   │
│  Nosotros somos:                            formados —y docentes— en │
│                                             la UCV. ↗                │
│   ( foto )          ( foto )          ( foto )                       │
│   ADRIANA RUSSIÁN   JOSÉ MARIO WONG   ALEJANDRO LUCERO               │
│   Arquitecta UCV '17 Arquitecto UCV '20 Arquitecto UCV '21  ← mono   │
│   Prof. Historia…    Asistente UD 00…   Asistente UD 00…             │
│   @adrrussian ↗      @j.mariowong ↗     @arq.alr ↗                   │
└──────────────────────────────────────────────────────────────────────┘
```

- **Fotos:** en círculo con borde de 1 px en `--ink`, usando los retratos del Canva.
  - por defecto: **blanco y negro** (como R1).
  - hover o foco en escritorio: pasan a **color** en 400 ms.
  - móvil: pasan a color cuando la tarjeta queda en el centro de la pantalla, y vuelven a B/N al salir.
- **Juego de palabras:** "BIENVEN-**IDO**" con "IDO" en `--ink` 800 y el resto en 300. El mismo recurso se usa en los demás titulares (ver §6).
- **Entrada:** las tarjetas aparecen escalonadas (3 × 100 ms), subiendo 16 px con un fundido.
- **Móvil:** carrusel horizontal con snap e indicadores de puntos, o columna simple si la pantalla mide menos de 360 px.

### S3 · Proceso: la axonometría explotada (clímax visual)

Es la sección central. Las 7 láminas de proceso del Canva se convierten en **una sola escena con scroll fijo**: cada paso es una **capa** de la axonometría, y las capas se separan a medida que se avanza (R2 + R3).

```
┌──────────────────────────────┬───────────────────────────────────────┐
│ ▌CÓMO TRABAJAMOS             │                                       │
│                              │          ┌──────────┐  ← capa 4       │
│ 01 ──── ASÍ EMPEZAMOS     •  │          │ terminado│    (techo)      │
│   • Solicitud definida       │          └────┬─────┘                 │
│   • Ideas base               │               ┊  ← línea punteada     │
│   • Alcance establecido      │          ┌────┴─────┐                 │
│   ┌ Nos permite organizar ┐  │          │ interior │  ← capa 3       │
│   │ plan · recursos · cro-│  │          └────┬─────┘                 │
│   │ nograma               │  │               ┊                       │
│   └───────────────────────┘  │          ┌────┴─────┐                 │
│ 02 ──── MANOS A LA OBRA      │          │estructura│  ← capa 2       │
│ 03 ──── LA PRIMERA ENTREGA   │          └────┬─────┘                 │
│ 04 ──── COMIENZA LO BUENO    │          ┌────┴─────┐                 │
│                              │          │ terreno •│  ← capa 1 activa│
│ │███░░░░░░░░│ 1/4             │          └──────────┘                 │
└──────────────────────────────┴───────────────────────────────────────┘
        columna que avanza                columna fija (sticky)
```

| Paso | Capa | Contenido en la columna izquierda |
|---|---|---|
| 01 Así empezamos | Terreno / planta base | Solicitud definida · Ideas base · Alcance establecido → *Nos permite organizar:* plan de trabajo sólido · recursos necesarios · cronograma de entrega |
| 02 Manos a la obra | Estructura (muros y pilares) | Medición en sitio · Modelado 3D · Diseño → *Vamos a probar ideas:* organización general · pruebas digitales · pruebas físicas → *Vamos por buen camino:* validamos · decidimos · planificamos |
| 03 Primero lo primero: la primera entrega | Interiores (mobiliario y materiales) | Diseño final · Tiempos · Presupuesto |
| 04 Luego, comienza lo bueno | Cubierta y espacio terminado | Antes / durante / después (ver abajo) |

**Comportamiento (máquina de estados):**

```
[Paso 1 activo] --scroll ↓ pasa el umbral--> [Paso 2 activo] --> [Paso 3] --> [Paso 4] --> [Liberado: termina el sticky]
        ↑                                           |
        └──────────────── scroll ↑ ─────────────────┘
[Cualquier paso] --clic en "0N" del índice--> [Paso N activo] (scroll suave hasta su umbral)
```

- **Disparador:** posición del scroll (umbral al 50 % de la pantalla) o clic en el número del paso.
- **Reglas:**
  - un solo paso activo a la vez.
  - el paso activo se **expande** y muestra viñetas y sub-etapas; los demás quedan colapsados en una sola línea (`02 ──── MANOS A LA OBRA`).
  - las capas de la derecha se **separan** de forma proporcional al avance (translateY, sincronizado con el scroll).
- **Feedback:**
  - la capa activa se dibuja con trazo `--ink` de 1,5 px y lleva un nodo naranja.
  - las capas inactivas quedan en `--ink` al 25 %.
  - las líneas punteadas entre capas se "dibujan" (`stroke-dashoffset`) al entrar cada paso.
  - una barra de progreso vertical muestra `1/4 … 4/4`.
- **Sub-etapas** ("Nos permite organizar", "Vamos a probar ideas", "Vamos por buen camino"): son tarjetas con chaflán y 3 miniaturas en círculo con las fotos del Canva en B/N. Aparecen dentro del paso activo.
- **Paso 04, el pico emocional:** un control segmentado de 3 posiciones, `AQUÍ INICIA TODO · PASAN MUCHAS COSAS · AQUÍ TERMINA TODO`, que cambia entre 3 fotos: la llave (B/N), la obra (B/N) y la oficina terminada (**a color**, el primer color fuerte de la página). Se maneja con clic o con las flechas del teclado. **No** avanza solo.
- **Móvil:** sin scroll fijo. Cada paso es un acordeón con su capa ilustrada arriba, el número grande y el contenido debajo. Solo hay un acordeón abierto a la vez, y abrir uno lleva el scroll hasta él.
- **Reduced motion:** las capas aparecen ya separadas, sin parallax, y solo cambia el resaltado de la capa activa.

> **Asset necesario:** una axonometría explotada en 4 capas, en estilo lineal y monocromo (R2), de un proyecto real de IDO. Opciones: (a) que el estudio la exporte de su modelo 3D (es lo ideal y muestra su oficio), (b) generarla con IA a partir de fotos de Diasa. Exportar las 4 capas como **SVG separados** para animarlas.

### S4 · Qué hemos hecho: tipologías

```
┌──────────────────────────────────────────────────────────────────────┐
│ ▌¿QUÉ COSAS HEMOS HECHO?                              · · · ·        │
│                                                       · · · ·  ← matriz│
│ ┆VIVIENDAS┆───┆RESTAURANTES┆───┆INDUSTRIAS┆───┆OFICINAS┆    de puntos │
│      │              │              │             │       (R5)       │
│ ┆RETAIL┆───┆ESPACIO PÚBLICO┆───┆TEMPLOS┆───┆SUPERMERCADOS┆           │
│      │              │              │             │                  │
│ ┆CO-WORKING┆───┆CAFETERÍAS┆───┆CLÍNICAS┆───┆PAISAJISMO┆              │
└──────────────────────────────────────────────────────────────────────┘
```

- **Chips** con borde punteado (como en el Canva), unidos por líneas finas que forman una red tipo plano.
- **Hover o foco:** el chip se rellena de `--ink`, las líneas que lo conectan se vuelven naranjas y aparece "→ Cotizar".
- **Clic:** lleva a S7 (Contacto) con esa tipología **ya seleccionada** en el formulario. Así no hay que repetir el dato.
- **Entrada:** las líneas de la red se dibujan primero (600 ms) y luego aparecen los chips (escalonados, 30 ms cada uno).
- **Móvil:** chips en flujo libre (`flex-wrap`), sin líneas de conexión.

### S5 · Proyectos destacados

Layout editorial, como la doble página de *Entre Rayas*. Hay un caso por bloque y se alternan izquierda y derecha.

```
┌────────────┬─────────────────────────────────────────────────────────┐
│ FICHA      │ ▌OFICINAS QUE RESPIRAN                                   │
│ TÉCNICA    │  IDENTIDAD DE MARCA                       ┌───────────┐ │
│            │                                           │ 2024     ◢│ │
│ CLIENTE    │ ┌──────────────────────────────────────┐  │ Caracas  ↗│ │
│ Diasa      │ │                                      ◢  └───────────┘ │
│ OBRA       │ │   foto principal a color (chaflán)   │                │
│ Sede La    │ │                                      │                │
│ California │ └──────────────────────────────────────┘                │
│ AÑO        │  [▢][▢][▢][▢]  ← tira de miniaturas       ‹  2/6  ›     │
│ 2024       │                                                         │
│ ARQUITECTOS│ La remodelación… (≈60 palabras)   Leer más ↓            │
│ Wong · …   │                                                         │
└────────────┴─────────────────────────────────────────────────────────┘
     mono 12px
```

- **Caso A:** *Duplicar la obra sin duplicar recursos* (Vecxel, 2023).
- **Caso B:** *Oficinas que respiran identidad de marca* (Diasa, 2024).
- **Galería:**
  - la foto principal se cambia con las miniaturas, con las flechas ‹ › o deslizando el dedo en móvil.
  - fundido cruzado de 250 ms entre fotos.
  - contador `2/6` en mono.
  - clic en la foto: visor a pantalla completa (Esc o deslizar hacia abajo para cerrar; flechas para navegar).
- **"Leer más":** el texto completo de la revista se expande **en el lugar**, sin modal, con altura animada de 300 ms. El enlace cambia a "Leer menos ↑".
- **Bloque de acento naranja** con chaflán: año + ciudad.
- **Entrada:** la imagen se revela con una máscara que se abre de izquierda a derecha (600 ms). La ficha técnica aparece línea por línea.
- **Móvil:** título → foto → miniaturas deslizables → ficha técnica en 2 columnas → texto.

### S6 · Prensa

```
┌──────────────────────────────────────────────────────────────────────┐
│  PUBLICADOS EN                 ┌─────────────────────┐               │
│  ENTRE RAYAS · VOL. 147        │ doble página pp.82–83│ ← levemente   │
│  pp. 82–83 · 2025          ↗   └─────────────────────┘    inclinada  │
└──────────────────────────────────────────────────────────────────────┘
```

- Franja corta sobre `--ink` con texto `--paper` y un sello circular `--sun` que dice "PUBLICADO".
- **Hover sobre la miniatura:** se endereza (de −3° a 0°) y sube 4 px, en 250 ms.
- Si la revista tiene versión online, la flecha ↗ abre el artículo.

### S7 · Contacto: «¿Tienes dudas? Conversemos»

```
   ▁▁▁▁▁▁▁ ▁▁▁▁▁▁▁ ▁▁▁▁▁▁▁ ▁▁▁▁▁▁▁   ← pestañas de carpeta (gris · gris · ink · sun)
┌──────────────────────────────────────────────────────────────────────┐
│ ▌¿TIENES DUDAS?                   │  Nombre        [____________]  • │
│  CONVERSEMOS.                     │  Email o WhatsApp [_________]    │
│                                   │  Tipo de proyecto                │
│  (ido) Ideas con denominación     │  [Oficinas✓][Viviendas][Retail]… │
│        de origen                  │  Cuéntanos tu idea               │
│                                   │  [____________________________]  │
│  WhatsApp ↗   Instagram ↗         │                                  │
│  Caracas, Venezuela               │  [ Enviar idea ↗ ]               │
└──────────────────────────────────────────────────────────────────────┘
```

- **Pestañas de carpeta** arriba: el recurso de la lámina de cierre del Canva. En hover, cada pestaña sube 4 px.
- **Formulario:** 4 campos, sin más.

**Estados del formulario:**

```
[Vacío] --escribe--> [Editando] --sale del campo--> [Validado ✓] | [Error en línea]
[Editando/Validado] --enviar--> [Enviando] --ok--> [Éxito] 
                                           --falla--> [Error de envío] --reintentar--> [Enviando]
```

| Estado | Feedback |
|---|---|
| Foco | Línea inferior en `--ink` de 2 px y punto naranja a la derecha del campo |
| Error en línea | Se valida **al salir del campo**, nunca mientras se escribe. Mensaje debajo, por ejemplo "Necesitamos un email o un número para responderte". Borde de color de error + ícono (no solo color) |
| Enviando | El botón muestra "Enviando…" con 3 puntos animados (los puntos del logo). Queda deshabilitado para evitar doble envío. Si tarda más de 1 s, aparece un texto de estado |
| Error de envío | Banner en línea: "No pudimos enviar tu mensaje. Reintentar ↻ o escríbenos por WhatsApp ↗". **Los datos escritos no se pierden** |
| **Éxito (final de la historia)** | El formulario se reemplaza, en el mismo lugar, por: los dos puntos naranjas que "aterrizan" (como en el hero, cerrando el ciclo), el titular "**¡RECIBIDO!** Tu idea ya tiene denominación de origen", el texto "Te escribimos en menos de 48 h", y dos salidas: "Ver proyectos" y "Escríbenos por WhatsApp ↗" |

- La **tipología llega preseleccionada** cuando se viene desde S4. Los chips permiten selección múltiple.
- **Móvil:** el formulario va primero y los datos de contacto debajo. Los campos usan `inputmode` y `autocomplete` correctos (email, tel, name).

### S8 · Footer

- Wordmark "ido" enorme, de ancho completo, recortado por el borde inferior (como R5), en `--ink` al 6 % sobre `--paper-2`.
- Encima: logo, tagline, Instagram, ciudad, © 2026, y "Volver arriba ↑".

---

## 6. Sistema de titulares con «-IDO»

Todos los H2 siguen un mismo patrón: barra naranja, dos pesos, y la marca incrustada cuando el español lo permite.

| Sección | Titular |
|---|---|
| Nosotros | ¡HOLA! BIENVEN-**IDO** |
| Proceso | CÓMO TRABAJAMOS: TODO DEFIN**IDO** |
| Tipologías | ¿QUÉ COSAS HEMOS HECHO? *(o "CONSTRU**IDO**")* |
| Proyectos | "NO ESTÁ EXHIB**IDO**: SE HABITA" (adaptado de la cita de la revista) |
| Contacto | ¿TIENES DUDAS? CONVERSEMOS |

Usarlo con moderación: 2 o 3 veces en la página como máximo, para que no pierda gracia.

---

## 7. Motion tokens

| Token | Valor | Uso |
|---|---|---|
| `--dur-fast` | 150 ms | Hover, presionado, cambios de color |
| `--dur-base` | 250 ms | Indicador del menú, cambio de foto, chips |
| `--dur-slow` | 400 ms | Expandir pasos, B/N → color, "Leer más" |
| `--dur-scene` | 800–900 ms | Ensamblaje del hero, líneas que se dibujan |
| `--ease-out` | `cubic-bezier(.2,.7,.2,1)` | Entradas |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | Cambios de estado |
| `--stagger` | 30–100 ms | Listas y tarjetas |

**Reglas:**
1. Ninguna animación bloquea la interacción: se puede hacer clic durante la animación.
2. Las animaciones de entrada ocurren **una sola vez** por sección; al volver a ella no se repiten.
3. Con `prefers-reduced-motion: reduce`, todo se reduce a fundidos de 150 ms y desaparecen el parallax, el ensamblaje y el dibujo de líneas.
4. Lo único que va sincronizado con el scroll es la separación de capas en S3. Todo lo demás se dispara al entrar en pantalla.

---

## 8. Inventario de estados por componente

| Componente | Por defecto | Hover | Foco | Activo | Deshabilitado | Otros |
|---|---|---|---|---|---|---|
| Botón primario | `--ink` / `--paper` | flecha ↗ +2 px | anillo de 2 px `--dot` | escala 98 % | opacidad 40 % | Enviando (puntos) |
| Enlace de texto | `--ink` | subrayado que crece de izquierda a derecha | anillo | — | — | — |
| Enlace del menú | `--ink-60` | `--ink` | anillo | punto naranja debajo | — | — |
| Chip de tipología | borde punteado | relleno `--ink` | anillo | ✓ + relleno `--ink` | — | — |
| Tarjeta de equipo | foto en B/N | foto a color | foto a color + anillo | — | — | — |
| Paso del proceso | colapsado | número en `--ink` | anillo | expandido + capa resaltada | — | — |
| Miniatura de galería | opacidad 60 % | 100 % | anillo | borde `--dot` de 2 px | — | Cargando: esqueleto con chaflán |
| Campo del formulario | línea al 30 % | línea al 60 % | línea de 2 px `--ink` + punto | — | — | Error · Validado |

Áreas táctiles de 44 × 44 px como mínimo. El orden de foco sigue el orden visual. Hay un enlace "Saltar al contenido" al inicio.

---

## 9. Assets a producir o pedir

1. **Axonometría explotada en 4 capas** (SVG separados): la pieza clave de S1 y S3.
2. **Logo en vector** (relleno y línea) y los dos puntos como elemento suelto.
3. **Fotos del equipo en alta**, con el mismo encuadre que en el Canva.
4. **Fotos de Vecxel y Diasa en alta** (6 por proyecto como mínimo).
5. **Fotos de proceso**: llave, obra y terminado, más las 9 miniaturas de las sub-etapas.
6. **Imagen de la doble página** de *Entre Rayas* 147.
7. **Datos de contacto** (siguen pendientes, ver `guion-landing.md` §5).

---

## 10. Siguiente paso

Con este documento aprobado, el prompt de generación se arma así: **contenido** (`guion-landing.md`) + **sistema visual** (§3) + **secciones y comportamiento** (§5–§8). También se puede construir directamente un prototipo navegable en HTML para validar el proceso con scroll fijo antes de pasar al desarrollo.
