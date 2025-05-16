import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the GridContainer component.
 */
export interface GridContainerProps {
  /** The content of the grid, typically GridItem components. */
  children: React.ReactNode;

  /**
   * Defines the height of implicitly created grid rows.
   * Accepts any valid CSS value for 'grid-auto-rows'.
   * @default 'auto'
   */
  rowHeight?: string; // CSS value for grid-auto-rows (e.g., '100px', 'minmax(100px, auto)')

  /** Optional Tailwind spacing unit for the gap between grid items (e.g., 4 for gap-4). */
  gap?: number | string;

  /** Optional Tailwind class string for grid columns (e.g., 'grid-cols-6'). */
  columns?: string;

  /** Optional additional CSS classes to apply to the container. */
  className?: string;
}

const GridContainer: React.FC<GridContainerProps> = ({
  children,
  rowHeight = 'auto', // Default row height
  gap = 4, // Default gap
  columns = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6', // Default responsive columns
  className, // Ensure className is destructured
}) => {
  // Generate the grid-auto-rows style
  const gridStyle: React.CSSProperties = {
    gridAutoRows: rowHeight,
  };

  /**
   * We use an explicit if/else block to map supported numeric gap values to their Tailwind class strings.
   * This ensures Tailwind's JIT compiler will generate the correct gap classes (e.g., gap-4, gap-6).
   *
   * Why not use a dynamic `gap-${gap}`? Tailwind JIT only generates classes it can statically detect in your codebase.
   * If you use dynamic strings, you risk missing styles in production unless you safelist them in tailwind.config.js.
   *
   * To add support for a new gap value (e.g., gap-10), add another case here and ensure it's referenced somewhere in your codebase
   * or explicitly safelisted in tailwind.config.js.
   *
   * This approach provides reliability and clarity at the cost of a little verbosity.
   */
  let gapClass = '';
  if (typeof gap === 'number') {
    // Map common numeric gap values to their full Tailwind class strings.
    // This helps Tailwind's JIT compiler detect and generate these classes.
    // Add more values as needed or consider safelisting in tailwind.config.js for a broader range.
    if (gap === 0) gapClass = 'gap-0';
    else if (gap === 1) gapClass = 'gap-1';
    else if (gap === 2) gapClass = 'gap-2';
    else if (gap === 3) gapClass = 'gap-3';
    else if (gap === 4) gapClass = 'gap-4'; // Default for GridContainer & BentoLayout
    else if (gap === 5) gapClass = 'gap-5';
    else if (gap === 6) gapClass = 'gap-6'; // Used by bentogrid example
    else if (gap === 8) gapClass = 'gap-8';
    // For other numbers not listed, Tailwind might not generate the class
    // unless it's explicitly used elsewhere or safelisted.
    // Using the dynamic `gap-${gap}` as a fallback might not always work with JIT.
    else gapClass = `gap-${gap}`; 
  } else if (typeof gap === 'string') {
    // If gap is already a string, assume it's a valid Tailwind class(es) or custom value
    gapClass = gap;
  }

  return (
    <div
      className={cn(
        'grid',
        columns,
        gapClass, // Use the determined gapClass string
        className
      )}
      style={gridStyle}
    >
      {children}
    </div>
  );
};

export default GridContainer;
