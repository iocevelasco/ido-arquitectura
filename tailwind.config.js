/** @type {import('tailwindcss').Config} */
// Tokens de docs/estructura-visual.md §3. Usar siempre estos nombres, nunca hex crudos en el JSX.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F4F4F1', 2: '#EBECEE' }, // fondo hueso / gris perla
        ink: { DEFAULT: '#032540' }, // azul marino del logo: texto, líneas, bloques
        dot: { DEFAULT: '#FAAD43' }, // naranja de los puntos del logo: sólo formas, nunca texto sobre claro
        sun: { DEFAULT: '#FBDF58' }, // amarillo de apoyo, puntual
        alert: { DEFAULT: '#B42318' }, // errores de formulario (contraste AA sobre paper)
      },
      // Bordes duros (estética de plano). `rounded-full` sólo para círculos reales: fotos, nodos, puntos.
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { site: '80rem' },
      transitionTimingFunction: {
        out: 'cubic-bezier(.2,.7,.2,1)',
        'in-out': 'cubic-bezier(.65,0,.35,1)',
      },
      transitionDuration: { fast: '150ms', base: '250ms', slow: '400ms', scene: '850ms' },
    },
  },
  plugins: [],
}
