import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
  [
    'group inline-flex items-center justify-center gap-2 font-display font-medium uppercase tracking-wide',
    'transition duration-fast ease-out active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-ink text-paper hover:bg-ink/90',
        accent: 'bg-dot text-ink hover:bg-dot/90',
        ghost: 'text-ink underline-offset-4 hover:underline',
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3.5 text-sm',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof buttonVariants> {
  /** Flecha diagonal ↗: el elemento lleva a otro lugar (docs/estructura-visual.md §3.3). */
  arrow?: boolean
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, arrow = true, children, ...props }, ref) => (
    <a ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
      {arrow && (
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-fast ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </a>
  )
)
LinkButton.displayName = 'LinkButton'
