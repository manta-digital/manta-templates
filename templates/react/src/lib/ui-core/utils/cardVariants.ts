import { cva, type VariantProps } from 'class-variance-authority';

export const cardVariants = cva(
  // Base classes applied to all variants
  'transition-all duration-300 ease-in-out p-8',
  {
    variants: {
      // Defines the visual style of the card
      variant: {
        primary: 'bg-[var(--color-card-accent)] text-[var(--background)] border border-[var(--color-card-border)]',
        default: 'bg-card text-card-foreground border border-[var(--color-card-border)] shadow-sm',
        bordered:
          'bg-card text-card-foreground border-2 border-gray-200 hover:border-[var(--color-card-border-hover)] dark:border-gray-700 dark:hover:border-[var(--color-card-border-hover)] transition-colors duration-300',
        gradient: 'text-[var(--color-card-foreground,white)] bg-gradient-to-br from-[var(--color-accent-9)] to-[var(--color-accent-10)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-1000',
        interactive:
          'bg-card text-card-foreground border shadow-sm cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:ring-1 hover:ring-[var(--color-card-border-hover)]',
        elevated:
          'bg-card text-card-foreground border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.9)]',
        accent:
          'bg-[var(--color-card-accent-subtle)] text-[var(--color-accent-12)] border border-[var(--color-card-border)] hover:border-[var(--color-card-border-hover)] transition-colors duration-300',
        surface:
          'bg-[var(--card-surface-accessible)] text-[var(--card-surface-text)] border border-[var(--color-card-border)] backdrop-blur-sm',
      },
      // Removed size variant; padding is now part of base classes
      // Defines the corner radius independently
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
      // Defines programmatic states
      state: {
        default: '',
        active: 'transform scale-[0.98]',
        disabled: 'opacity-50 cursor-not-allowed',
        loading: 'animate-pulse bg-gray-200 text-transparent cursor-wait',
        success: 'border-2 border-green-500 bg-green-50',
        error: 'border-2 border-red-500 bg-red-50',
      },
    },
    defaultVariants: {
      variant: 'default',
      radius: 'md',
      state: 'default',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}