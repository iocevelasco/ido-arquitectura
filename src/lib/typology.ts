// Puente entre Tipologías (S4) y Contacto (S7): tocar un chip lleva al formulario con esa
// tipología ya marcada, para no pedir el dato dos veces (docs/estructura-visual.md §5 S4).
const EVENT = 'ido:select-typology'

export function selectTypology(item: string): void {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: item }))
}

export function onSelectTypology(handler: (item: string) => void): () => void {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
