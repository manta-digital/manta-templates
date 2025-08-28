import React from 'react';
import { cn } from '@/lib/utils';
import GridContainer from '@/components/layouts/grid-layout/grid-container';
import type { GridContainerProps } from '@/components/layouts/grid-layout/grid-container';

interface BentoLayoutProps extends Omit<GridContainerProps, 'children'> {
  children: React.ReactNode;
  className?: string;
  autoFlow?: 'row' | 'column'; // Added autoFlow prop
}

/**
 * A layout component that arranges children (expected to be GridItems)
 * in a responsive bento-style grid using GridContainer.
 */

/**
 * BentoLayout: Flexible, item-driven grid container.
 *
 * Builds on GridContainer to allow each child (e.g., cards) to control its own placement and span
 * using Tailwind utility classes (e.g., col-span-*, row-span-*).
 * Use BentoLayout when your items need to directly influence the grid structure.
 * GridLayout, in contrast, follows a strict grid pattern defined by data arrays, placing
 * children into the next available slots in order.
 *
 * @param {BentoLayoutProps} props - Configuration props for the layout.
 * @param {React.ReactNode} props.children - Elements to render in the grid; expected to be GridItems.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @param {string} [props.rowHeight] - CSS value for grid-auto-rows, e.g., 'minmax(6rem, auto)'.
 * @param {number|string} [props.gap] - Gap between items; number for Tailwind gap-{n} or CSS value string.
 * @param {string} [props.columns] - Tailwind grid-cols classes to set column count or pattern.
 * @param {'row'|'column'} [props.autoFlow] - Controls grid-auto-flow direction; 'row' (default) or 'column'.
 */
const BentoLayout: React.FC<BentoLayoutProps> = ({
  children,
  className,
  rowHeight = 'minmax(6rem, auto)',
  gap = 4,
  columns = 'grid-cols-6',
  autoFlow = 'row' // Default to row
}) => {
  return (
    <GridContainer
      rowHeight={rowHeight}
      gap={gap}
      columns={columns}
      className={cn('bento-layout', autoFlow === 'column' ? 'grid-flow-col' : 'grid-flow-row', className)}
    >
      {children}
    </GridContainer>
  );
};

export { BentoLayout };
export type { BentoLayoutProps };
