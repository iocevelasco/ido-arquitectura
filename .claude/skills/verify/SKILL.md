---
name: verify
description: Corre la secuencia de cierre de un cambio en IDO Arquitectura — typecheck, build y revisión visual en el servidor local (puerto 7273) en escritorio y celular. Usalo cuando el usuario dice que terminó algo, pide verificar, o antes de commitear, pushear o abrir un PR.
---

# Verificar un cambio

Corré los pasos en orden y no sigas si uno falla.

1. **Qué cambió:** `git status --short && git diff --stat`. Si no hay diff, no hay nada que verificar.
2. **Tipos:** `npx tsc --noEmit`. Es el mismo `tsc` del build y del CI.
3. **Build:** `npm run build` (base `/ido-arquitectura/`, igual que Pages).
4. **Visual:** con `npm run dev` corriendo (http://localhost:7273/), capturá la página completa a
   1440 px y a 375 px con Playwright. Revisá:
   - sin scroll horizontal (`document.documentElement.scrollWidth === innerWidth`);
   - sin errores en consola;
   - la sección tocada respeta `docs/estructura-visual.md` (tokens, barra naranja en el H2,
     naranja nunca como texto, círculo para personas y chaflán para espacios).
5. **Reportá** cada paso como pasó o falló, con el error si falló.
