import { cva, type VariantProps } from 'class-variance-authority';

export const cardVariants = cva(
  // Base classes applied to all variants
  'transition-all duration-300 ease-in-out',
  {
    variants: {
      // Defines the visual style of the card
      variant: {
    primary: 'bg-card-bg-primary text-card-fg-primary border-card-border-primary',
        base: 'bg-card text-card-foreground border shadow-sm',
        elevated: 'bg-card text-card-foreground shadow-xl hover:shadow-2xl transform translate-y-0 hover:-translate-y-1 dark:shadow-[0_15px_35px_-12px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_25px_40px_-12px_rgba(255,255,255,0.1)]',
        bordered:
          'bg-card text-card-foreground border-2 border-gray-200 hover:border-teal-500 dark:border-gray-700 dark:hover:border-teal-400 transition-colors duration-300',
        gradient: 'text-white bg-gradient-to-br from-teal-500 to-green-500 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-1000',
        interactive:
          'bg-card text-card-foreground border shadow-sm cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:ring-1 hover:ring-teal-400',
      },
      // Defines the size as semantic hints for grid systems
      size: {
        sm: 'p-8 card-size-sm',
        md: 'p-8 card-size-md',
        lg: 'p-8 card-size-lg',
        xl: 'p-8 card-size-xl',
      },
      // Defines the corner radius independently
      radius: {
        none: 'rounded-none',
        sm: 'rounded',
        md: 'rounded-sm',
        lg: 'rounded-md',
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
      variant: 'base',
      size: 'md',
      radius: 'md',
      state: 'default',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

