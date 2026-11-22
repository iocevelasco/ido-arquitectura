import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Base por defecto: GitHub Pages (/ido-arquitectura/). Con dominio propio se buildea con VITE_BASE=/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: env.VITE_BASE || '/ido-arquitectura/',
    server: { port: 7273, strictPort: true },
    preview: { port: 7273, strictPort: true },
  }
})
