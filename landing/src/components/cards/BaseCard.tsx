import React from 'react';
import { cn } from '@/lib/utils';

/**
 * BaseCard props
 * @param as       Render as this element type (e.g., 'div', 'section')
 * @param variant  Visual style variant ('default' or 'outlined')
 * @param size     Size variant ('sm', 'md', 'lg')
 */
export type BaseCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  variant?: 'default' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLElement>;

const BaseCard = React.forwardRef<HTMLElement, BaseCardProps>(
  ({ children, className, as: Component = 'article', variant = 'default', size = 'md', ...props }, ref) => {
    // Determine padding by size
    const sizeClass = size === 'sm' ? 'p-4' : size === 'lg' ? 'p-12' : 'p-8';
    // Determine variant styles
    const variantClass =
      variant === 'outlined'
        ? 'border border-teal-500 bg-transparent'
        : 'border border-teal-500 bg-card text-card-foreground';
    return (
      <Component
        ref={ref}
        className={cn(
          'rounded-lg shadow-sm',
          'flex',
          'flex-col',
          variantClass,
          sizeClass,
          'min-h-[112px] md:min-h-[144px]',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

BaseCard.displayName = 'BaseCard';

export default BaseCard;
