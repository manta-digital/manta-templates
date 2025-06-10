import React from 'react';
import { cn } from '@/lib/utils';

/**
 * GridItem provides a flexible, responsive cell for grid layouts using Tailwind CSS.
 *
 * - Use the `size` prop for standard layouts (small, medium, large, extra-large).
 * - Override with `colSpan`/`rowSpan` for custom or responsive spans.
 * - Responsive props can be a string or an object mapping breakpoints to Tailwind classes.
 *
 * This pattern ensures both ease of use for common cases and full control when needed.
 */
export type GridItemSize = 'small' | 'medium' | 'large' | 'extra-large';

/**
 * Represents a responsive span value, which can be a single Tailwind class string
 * or an object mapping breakpoint prefixes (e.g., 'base', 'sm', 'md') to Tailwind class strings.
 */
export type ResponsiveSpanValue = string | Record<string, string>;

/**
 * Props for the GridItem component.
 */
export interface GridItemProps {
  /** The content to render inside the grid item. */
  children: React.ReactNode;
  /**
   * The predefined size variant of the grid item. Used if colSpan/rowSpan are not provided.
   * @default 'small'
   */
  size?: GridItemSize;
  /**
   * Custom column span. Can be a Tailwind class string (e.g., 'col-span-2')
   * or an object for responsive values (e.g., { base: 'col-span-full', md: 'col-span-3' }).
   * If provided, overrides column span from 'size' prop.
   */
  colSpan?: ResponsiveSpanValue;
  /**
   * Custom row span. Can be a Tailwind class string (e.g., 'row-span-2')
   * or an object for responsive values (e.g., { base: 'row-span-1', md: 'row-span-auto' }).
   * If provided, overrides row span from 'size' prop.
   */
  rowSpan?: ResponsiveSpanValue;
  /** Optional additional CSS classes to apply to the grid item container. */
  className?: string;
}

// Helper to map size to Tailwind classes (used if colSpan/rowSpan are not provided). 
// It is generally recommended to use colSpan/rowSpan instead of size.
// Returns a string like 'col-span-2 row-span-1 md:col-span-2 md:row-span-1'
const getSizeClasses = (size: GridItemSize): string => {
  switch (size) {
    case 'small':
      return 'col-span-2 row-span-1 md:col-span-2 md:row-span-1';
    case 'medium':
      return 'col-span-3 row-span-3 md:col-span-3 md:row-span-3';
    case 'large':
      return 'col-span-4 row-span-3 md:col-span-4 md:row-span-3';
    case 'extra-large':
      return 'col-span-6 row-span-3 md:col-span-6 md:row-span-3';
    default:
      return 'col-span-2 row-span-2 md:col-span-2 md:row-span-2';
  }
};

// Helper to process responsive span prop (string or object) into Tailwind classes
// E.g., { base: 'col-span-2', md: 'col-span-4' } => 'col-span-2 md:col-span-4'
const processResponsiveSpan = (spanProp: ResponsiveSpanValue | undefined): string => {
  if (!spanProp) return '';
  if (typeof spanProp === 'string') return spanProp;

  return Object.entries(spanProp)
    .map(([breakpoint, value]) => (breakpoint === 'base' ? value : `${breakpoint}:${value}`))
    .join(' ');
};

/**
 * Renders a grid item with appropriate Tailwind span classes.
 * - If `colSpan` or `rowSpan` are provided, they take precedence.
 * - Otherwise, falls back to the span classes for the given `size`.
 *
 * This ensures both quick usage for common patterns and flexibility for advanced layouts.
 */
const GridItem: React.FC<GridItemProps> = ({
  children,
  size = 'small', // Default to small
  colSpan,
  rowSpan,
  className,
}) => {
  const effectiveSize = size || 'small';

  const colSpanClasses = processResponsiveSpan(colSpan);
  const rowSpanClasses = processResponsiveSpan(rowSpan);

  let finalSpanClasses = '';
  if (colSpanClasses || rowSpanClasses) {
    finalSpanClasses = cn(colSpanClasses, rowSpanClasses);
  } else {
    finalSpanClasses = getSizeClasses(effectiveSize);
  }

  return (
    <div
      className={cn(
        'rounded p-0',
        // 'border border-[var(--grid-item-border-color)]', // Border removed
        finalSpanClasses, // Apply explicit or size-based span classes
        className
      )}
    >
      {children}
    </div>
  );
};

export default GridItem;
