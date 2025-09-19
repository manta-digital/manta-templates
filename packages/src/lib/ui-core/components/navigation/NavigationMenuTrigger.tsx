import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { cva, type VariantProps } from 'class-variance-authority';
import * as Icons from 'lucide-react';
import { NavigationMenuTriggerProps } from '../../types/navigation';
import { cn } from '../../utils/cn';

/**
 * CVA variants for navigation menu triggers
 */
const navigationMenuTriggerVariants = cva(
  [
    'flex items-center gap-1 px-3 py-2 rounded-md',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'group'
  ],
  {
    variants: {
      variant: {
        default: [
          'text-accent-11 hover:text-accent-12 hover:bg-accent-3',
          'data-[state=open]:text-accent-12 data-[state=open]:bg-accent-3',
          'focus:bg-accent-3'
        ],
        ghost: [
          'text-foreground hover:text-accent-foreground hover:bg-accent',
          'data-[state=open]:text-accent-foreground data-[state=open]:bg-accent',
          'focus:bg-accent'
        ],
        subtle: [
          'text-muted-foreground hover:text-foreground hover:bg-muted',
          'data-[state=open]:text-foreground data-[state=open]:bg-muted',
          'focus:bg-muted'
        ]
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        default: 'px-3 py-2',
        lg: 'px-4 py-3 text-lg'
      },
      active: {
        true: 'bg-accent text-accent-foreground',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      active: false
    }
  }
);

export type NavigationMenuTriggerVariants = VariantProps<typeof navigationMenuTriggerVariants>

/**
 * Navigation Menu Trigger Component
 * Enhanced dropdown trigger with CVA variants, proper accessibility,
 * smooth animations, and support for custom content
 */
export function NavigationMenuTrigger({
  item,
  active = false,
  onClick,
  children,
  className,
  variant = 'default',
  size = 'default',
  showIndicator = true,
  indicatorIcon = 'ChevronDown'
}: NavigationMenuTriggerProps & NavigationMenuTriggerVariants & {
  showIndicator?: boolean;
  indicatorIcon?: string;
}) {
  // Get the indicator icon component
  const IndicatorIcon = showIndicator && indicatorIcon 
    ? (Icons as any)[indicatorIcon] 
    : null;

  return (
    <NavigationMenu.Trigger
      className={cn(
        navigationMenuTriggerVariants({ variant, size, active }),
        className
      )}
      onClick={onClick}
      data-testid="navigation-menu-trigger"
      aria-expanded="false"
      aria-haspopup="true"
      aria-label={`${item.label} menu`}
    >
      {/* Icon support */}
      {item.icon && (() => {
        const IconComponent = (Icons as any)[item.icon];
        return IconComponent ? (
          <IconComponent 
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} 
            className="shrink-0"
            aria-hidden="true" 
          />
        ) : null;
      })()}
      
      {/* Label */}
      <span className="flex-1 text-left">{item.label}</span>
      
      {/* Badge support */}
      {item.badge && (
        <span 
          className={cn(
            'ml-2 px-2 py-1 text-xs rounded-full',
            'bg-accent-9 text-accent-12',
            size === 'sm' && 'px-1.5 py-0.5 text-xs',
            size === 'lg' && 'px-2.5 py-1 text-sm'
          )}
          aria-label={`Badge: ${item.badge}`}
        >
          {item.badge}
        </span>
      )}
      
      {/* Dropdown indicator */}
      {IndicatorIcon && (
        <IndicatorIcon 
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
          className={cn(
            'shrink-0 transition-transform duration-200',
            'data-[state=open]:rotate-180',
            'group-hover:scale-110'
          )}
          aria-hidden="true" 
        />
      )}
      
      {/* Custom children content */}
      {children}
    </NavigationMenu.Trigger>
  );
}