import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { NavigationMenuContentProps } from '../../types/navigation';
import { NavigationMenuLink } from './NavigationMenuLink';
import { cn } from '../../utils/cn';

const contentVariants = cva(
  'absolute top-full left-0 mt-1 bg-background border border-border rounded-sm shadow-lg z-50 ' +
  'data-[motion=from-start]:animate-in data-[motion=from-start]:slide-in-from-left-1/2 ' +
  'data-[motion=from-end]:animate-in data-[motion=from-end]:slide-in-from-right-1/2 ' +
  'data-[motion=to-start]:animate-out data-[motion=to-start]:slide-out-to-left-1/2 ' +
  'data-[motion=to-end]:animate-out data-[motion=to-end]:slide-out-to-right-1/2 ' +
  'p-1',
  {
    variants: {
      variant: {
        simple: 'min-w-[200px]',
        grid: 'min-w-[400px]',
        custom: 'min-w-[300px]'
      }
    },
    defaultVariants: {
      variant: 'simple'
    }
  }
);

/**
 * Navigation Menu Content Component
 * Renders dropdown content with viewport positioning and content variants
 * Maximum 2 levels of nesting supported
 */
export function NavigationMenuContent({
  items,
  LinkComponent,
  level = 0,
  maxLevel = 2,
  onClose,
  className,
  variant = 'simple'
}: NavigationMenuContentProps) {
  return (
    <NavigationMenu.Content 
      className={cn(contentVariants({ variant }), className)}
      data-testid="navigation-menu-content"
    >
      <div className="max-h-[80vh] overflow-y-auto">
        {variant === 'grid' ? (
          <div className="grid grid-cols-2 gap-1">
            {items.map((item, index) => (
              <div key={item.href || index} className="min-w-0">
                <NavigationMenuLink
                  item={item}
                  LinkComponent={LinkComponent}
                  onClick={onClose}
                  className="block px-3 py-2 text-sm hover:bg-accent-3 rounded-sm transition-colors truncate"
                />
                {item.children && item.children.length > 0 && level < maxLevel && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-border/40 pl-3">
                    {item.children.map((child, childIndex) => (
                      <NavigationMenuLink
                        key={child.href || childIndex}
                        item={child}
                        LinkComponent={LinkComponent}
                        onClick={onClose}
                        className="block px-2 py-1 text-xs text-accent-11 hover:text-accent-12 hover:bg-accent-3 rounded-sm transition-colors truncate"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li key={item.href || index}>
                <NavigationMenuLink
                  item={item}
                  LinkComponent={LinkComponent}
                  onClick={onClose}
                  className="block px-3 py-2 text-sm hover:bg-accent-3 rounded-sm transition-colors"
                />
                {item.children && item.children.length > 0 && level < maxLevel && (
                  <ul className="ml-4 mt-1 space-y-1 border-l border-border/40 pl-3 bg-accent-1/30 rounded-sm p-2">
                    {item.children.map((child, childIndex) => (
                      <li key={child.href || childIndex}>
                        <NavigationMenuLink
                          item={child}
                          LinkComponent={LinkComponent}
                          onClick={onClose}
                          className="block px-2 py-1 text-sm text-accent-11 hover:text-accent-12 hover:bg-accent-3 rounded-sm transition-colors"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </NavigationMenu.Content>
  );
}