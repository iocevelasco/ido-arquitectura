import { useEffect, useId, useRef, useState, type FormEvent, type Ref } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import {
  COMPANY,
  CONTACT,
  TYPOLOGIES,
  contactMessage,
  instagramUrl,
  whatsappUrl,
} from '../../constants/data'
import { onSelectTypology } from '../../lib/typology'
import { cn } from '../../lib/cn'
import { LinkButton } from './Button'
import Dot from './Dot'

const COPY = CONTACT.form
const MIN_MESSAGE = 10

type Field = 'name' | 'message'
type Errors = Partial<Record<Field, string>>

function validate(field: Field, value: string): string | undefined {
  if (field === 'name') return value.trim() ? undefined : COPY.errors.name
  return value.trim().length >= MIN_MESSAGE ? undefined : COPY.errors.message
}

/**
 * Formulario que envía por WhatsApp (docs/estructura-visual.md §5 S7).
 * No hay backend: arma el texto y abre wa.me con el mensaje prellenado.
 * Estados: editando → (error en línea al salir del campo) → enviado (abre WhatsApp).
 */
export default function ContactForm() {
  const id = useId()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [types, setTypes] = useState<string[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const [sentUrl, setSentUrl] = useState<string | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const canSend = Boolean(COMPANY.whatsapp)

  // Un chip de Tipologías marca esa opción (sin desmarcar las otras).
  useEffect(
    () =>
      onSelectTypology((item) => {
        setSentUrl(null)
        setTypes((prev) => (prev.includes(item) ? prev : [...prev, item]))
      }),
    []
  )

  // Al enviar, el foco pasa al mensaje de éxito para que los lectores de pantalla lo anuncien.
  useEffect(() => {
    if (sentUrl) successRef.current?.focus()
  }, [sentUrl])

  const toggleType = (item: string) =>
    setTypes((prev) => (prev.includes(item) ? prev.filter((t) => t !== item) : [...prev, item]))

  const onBlur = (field: Field, value: string) =>
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }))

  // Un error ya mostrado se borra apenas el valor pasa a ser válido (nunca aparece mientras se escribe).
  const onChange = (field: Field, value: string) => {
    if (field === 'name') setName(value)
    else setMessage(value)
    if (errors[field] && !validate(field, value))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: Errors = { name: validate('name', name), message: validate('message', message) }
    setErrors(next)
    if (next.name) return nameRef.current?.focus()
    if (next.message) return messageRef.current?.focus()

    const url = whatsappUrl(contactMessage({ name, types, message }))
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
    setSentUrl(url)
  }

  const reset = () => {
    setName('')
    setMessage('')
    setTypes([])
    setErrors({})
    setSentUrl(null)
  }

  if (sentUrl) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="outline-none">
        <div className="flex gap-2" aria-hidden="true">
          <Dot className="h-3 w-3" />
          <Dot className="h-3 w-3" />
        </div>
        <p className="mt-4 font-display text-3xl uppercase leading-tight">
          <span className="font-extrabold">{COPY.success.titleStrong}</span>{' '}
          <span className="font-light">{COPY.success.titleLight}</span>
        </p>
        <p className="mt-4 text-ink/80">{COPY.success.body}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <LinkButton href={sentUrl} target="_blank" rel="noopener noreferrer" variant="accent">
            {COPY.success.reopen}
          </LinkButton>
          <button
            type="button"
            onClick={reset}
            className="font-display text-sm uppercase tracking-wide underline-offset-4 hover:underline"
          >
            {COPY.success.reset}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-8">
      <TextField
        id={`${id}-name`}
        inputRef={nameRef}
        label={COPY.nameLabel}
        value={name}
        error={errors.name}
        autoComplete="name"
        onChange={(v) => onChange('name', v)}
        onBlur={(v) => onBlur('name', v)}
      />

      <fieldset>
        <legend className="meta">{COPY.typesLabel}</legend>
        <p className="mt-1 text-xs text-ink/60">{COPY.typesHint}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TYPOLOGIES.items.map((item) => {
            const checked = types.includes(item)
            return (
              <label
                key={item}
                className={cn(
                  'flex cursor-pointer items-center gap-1.5 border border-dashed px-3 py-2 font-display text-xs uppercase tracking-[0.06em] transition-colors duration-fast',
                  'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-dot has-[:focus-visible]:ring-offset-2',
                  checked ? 'border-ink bg-ink text-paper' : 'border-ink/40 hover:border-ink'
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleType(item)}
                />
                {checked && <Check size={12} aria-hidden="true" />}
                {item}
              </label>
            )
          })}
        </div>
      </fieldset>

      <TextField
        id={`${id}-message`}
        textareaRef={messageRef}
        multiline
        label={COPY.messageLabel}
        placeholder={COPY.messagePlaceholder}
        value={message}
        error={errors.message}
        onChange={(v) => onChange('message', v)}
        onBlur={(v) => onBlur('message', v)}
      />

      {canSend ? (
        <div>
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 font-display text-sm font-medium uppercase tracking-wide text-paper transition duration-fast ease-out hover:bg-ink/90 active:scale-[0.98]"
          >
            {COPY.submit}
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-fast ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
          <p className="meta mt-3 normal-case tracking-normal">{COPY.submitHint}</p>
        </div>
      ) : (
        <div className="border-l-4 border-dot bg-paper p-4">
          <p className="text-sm">{COPY.pendingNumber}</p>
          <LinkButton
            href={instagramUrl(COMPANY.instagram)}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="mt-3"
          >
            @{COMPANY.instagram}
          </LinkButton>
        </div>
      )}
    </form>
  )
}

interface TextFieldProps {
  id: string
  label: string
  value: string
  error?: string
  placeholder?: string
  autoComplete?: string
  multiline?: boolean
  onChange: (value: string) => void
  onBlur: (value: string) => void
  inputRef?: Ref<HTMLInputElement>
  textareaRef?: Ref<HTMLTextAreaElement>
}

function TextField({
  inputRef,
  textareaRef,
  id,
  label,
  value,
  error,
  placeholder,
  autoComplete,
  multiline,
  onChange,
  onBlur,
}: TextFieldProps) {
  const errorId = `${id}-error`
  const fieldClass = cn(
    'peer w-full border-0 border-b bg-transparent px-0 py-2 text-lg text-ink placeholder:text-ink/40',
    'transition-colors duration-fast focus:border-b-2 focus:border-ink focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
    error ? 'border-b-2 border-alert' : 'border-ink/30 hover:border-ink/60'
  )
  const common = {
    id,
    value,
    placeholder,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: fieldClass,
  }
  return (
    <div>
      <label htmlFor={id} className="meta">
        {label}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea
            {...common}
            ref={textareaRef}
            rows={4}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => onBlur(e.target.value)}
            className={cn(fieldClass, 'resize-y')}
          />
        ) : (
          <input
            {...common}
            ref={inputRef}
            type="text"
            autoComplete={autoComplete}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => onBlur(e.target.value)}
          />
        )}
        {/* Punto naranja = campo activo (concepto «El punto de origen») */}
        <Dot className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-base peer-focus:opacity-100" />
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-alert">
          {error}
        </p>
      )}
    </div>
  )
}
